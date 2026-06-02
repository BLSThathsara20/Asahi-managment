import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../app/errors";
import { getAutotraderConfig } from "./config";
import { autotraderFetch } from "./client";
import { getAutotraderConnectStatus } from "./diagnostics";
import { getDealById, type DealRecord } from "./dealsApi";
import {
	getMessagesComponentAllPages,
	markMessagesComponentRead,
	postMessagesComponent,
	type MessageLine,
	type MessagesResource,
} from "./messagesApi";
import {
	AUTOTRADER_RESPONSE_TTL_MS,
	cacheKey,
	getCachedResponse,
	invalidateAutotraderCache,
	setCachedResponse,
} from "./responseCache";
import { throwMessageThreadNotFound } from "./messagesErrors";

type DealRow = DealRecord;

type DealsListResponse = {
	results?: DealRow[];
	totalResults?: number;
};

export type MessageThread = {
	messagesId: string;
	dealId: string;
	consumerName: string | null;
	consumerEmail: string | null;
	advertiserDealStatus: string | null;
	stockId: string | null;
	consumerLastReadStatus: string | null;
	advertiserLastReadStatus: string | null;
	messageCount: number;
	lastMessage: MessageLine | null;
	lastActivityAt: string | null;
	messages: MessageLine[];
};

const DEALS_PAGE_SIZE = 50;
const MAX_DEAL_PAGES = 20;

async function fetchDealsPage(page: number) {
	const { advertiserId } = getAutotraderConfig();
	return autotraderFetch<DealsListResponse>("/deals", {
		advertiserId,
		page,
	});
}

async function fetchAllDeals(maxPages = MAX_DEAL_PAGES): Promise<{
	deals: DealRow[];
	totalResults: number;
	pagesFetched: number;
}> {
	const first = await fetchDealsPage(1);
	const totalResults = first.totalResults ?? first.results?.length ?? 0;
	const totalPages = Math.min(
		Math.max(1, Math.ceil(totalResults / DEALS_PAGE_SIZE)),
		maxPages,
	);

	const deals = [...(first.results ?? [])];
	for (let p = 2; p <= totalPages; p++) {
		const data = await fetchDealsPage(p);
		deals.push(...(data.results ?? []));
	}

	return { deals, totalResults, pagesFetched: totalPages };
}

async function fetchMessageThread(
	messagesComponentId: string,
): Promise<MessagesResource & { pagesLoaded?: number }> {
	return getMessagesComponentAllPages(messagesComponentId);
}

function resolveComponentId(deal: DealRow, explicitMessageId?: string): string | null {
	if (explicitMessageId?.trim()) return explicitMessageId.trim();
	return deal.messages?.id ?? deal.dealId ?? null;
}

function sortMessagesNewestFirst(lines: MessageLine[]): MessageLine[] {
	return [...lines].sort((a, b) => (b.at ?? "").localeCompare(a.at ?? ""));
}

function sortMessagesChronological(lines: MessageLine[]): MessageLine[] {
	return [...lines].sort((a, b) => (a.at ?? "").localeCompare(b.at ?? ""));
}

function messagesIdsToTry(deal: DealRow): string[] {
	const ids = [deal.messages?.id, deal.dealId].filter(Boolean) as string[];
	return [...new Set(ids)];
}

function buildThread(deal: DealRow, resource: MessagesResource): MessageThread {
	const lines = sortMessagesNewestFirst(resource.messages ?? []);
	const last = lines[0] ?? null;
	const consumer = deal.consumer;
	const name = [consumer?.firstName, consumer?.lastName].filter(Boolean).join(" ") || null;

	const lastActivityAt =
		last?.at ??
		deal.messages?.lastUpdated ??
		deal.lastUpdated ??
		resource.advertiserLastRead ??
		null;

	return {
		messagesId: resource.messagesId ?? deal.messages?.id ?? deal.dealId ?? "",
		dealId: deal.dealId ?? "",
		consumerName: name,
		consumerEmail: consumer?.email ?? null,
		advertiserDealStatus: deal.advertiserDealStatus ?? null,
		stockId: deal.stock?.stockId ?? null,
		consumerLastReadStatus: resource.consumerLastReadStatus ?? null,
		advertiserLastReadStatus: resource.advertiserLastReadStatus ?? null,
		messageCount: lines.length,
		lastMessage: last,
		lastActivityAt,
		messages: lines,
	};
}

async function loadThreadForDeal(deal: DealRow): Promise<MessageThread | null> {
	for (const id of messagesIdsToTry(deal)) {
		try {
			const resource = await fetchMessageThread(id);
			const lines = resource.messages ?? [];
			// Include read and unread threads whenever the API returns message history.
			if (lines.length > 0) {
				return buildThread(deal, resource);
			}
			// Thread exists but empty payload — still surface if deal has message activity.
			if (resource.messagesId || deal.messages?.lastUpdated) {
				return buildThread(deal, resource);
			}
		} catch {
			// Try alternate id (messages.id vs dealId).
		}
	}
	return null;
}

async function mapWithConcurrency<T, R>(
	items: T[],
	limit: number,
	fn: (item: T) => Promise<R>,
): Promise<R[]> {
	const results: R[] = new Array(items.length);
	let nextIndex = 0;

	async function worker() {
		while (true) {
			const i = nextIndex++;
			if (i >= items.length) break;
			results[i] = await fn(items[i]);
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(limit, items.length) }, () => worker()),
	);
	return results;
}

export async function lookupAutotraderMessages(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const dealId =
			typeof req.query.dealId === "string" ? req.query.dealId.trim() : "";
		const messageId =
			typeof req.query.messageId === "string" ? req.query.messageId.trim() : "";

		const probe: Record<string, unknown> = {
			endpoints: {
				listMessages: {
					url: "GET /messages?advertiserId=…",
					note: "Returns 405 on sandbox — listing is via GET /deals then GET /messages/:id",
				},
				messageThread: "GET /messages/:messageId?advertiserId=…&page=1",
				dealDetail: "GET /deals/:dealId?advertiserId=…",
			},
		};

		if (dealId) {
			try {
				const deal = await getDealById(dealId);
				probe.deal = deal;
				const componentId = resolveComponentId(deal, messageId);
				if (componentId) {
					probe.messages = await fetchMessageThread(componentId);
					probe.messagesComponentId = componentId;
				}
			} catch (e) {
				probe.dealError = e instanceof Error ? e.message : String(e);
			}
		} else if (messageId) {
			try {
				probe.messages = await fetchMessageThread(messageId);
				probe.messagesComponentId = messageId;
			} catch (e) {
				probe.messagesError = e instanceof Error ? e.message : String(e);
			}
		} else {
			throw new ApiError(
				"invalid_payload",
				"Provide dealId and/or messageId query parameter.",
				400,
			);
		}

		const connectStatus = await getAutotraderConnectStatus(
			typeof probe.deal === "object" && probe.deal ? 1 : 0,
		);

		return res.json({ probe, connectStatus });
	} catch (e) {
		return next(e);
	}
}

export async function listAutotraderMessages(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { advertiserId } = getAutotraderConfig();
		const forceRefresh = req.query.refresh === "1";
		const lookupDealId =
			typeof req.query.dealId === "string" ? req.query.dealId.trim() : "";
		const listKey = lookupDealId
			? cacheKey(["messages", "list", advertiserId, lookupDealId])
			: cacheKey(["messages", "list", advertiserId]);

		if (!forceRefresh && req.query.page == null && !lookupDealId) {
			const cached = getCachedResponse<Record<string, unknown>>(listKey);
			if (cached) return res.json(cached);
		}

		if (lookupDealId) {
			const deal = await getDealById(lookupDealId);
			const componentId = resolveComponentId(deal, "");
			let thread: MessageThread | null = null;
			if (componentId) {
				try {
					const resource = await fetchMessageThread(componentId);
					thread = buildThread(deal, resource);
				} catch {
					thread = null;
				}
			}
			const connectStatus = await getAutotraderConnectStatus(1);
			return res.json({
				threads: thread ? [thread] : [],
				totalDeals: 1,
				dealsScanned: 1,
				pagesFetched: 1,
				threadsWithMessages: thread ? 1 : 0,
				connectStatus,
				loadedVia: "deals/:dealId",
			});
		}

		const singlePage = req.query.page != null;
		let deals: DealRow[] = [];
		let totalResults = 0;
		let pagesFetched = 1;

		if (singlePage) {
			const page = Math.max(1, Number(req.query.page) || 1);
			const data = await fetchDealsPage(page);
			deals = data.results ?? [];
			totalResults = data.totalResults ?? deals.length;
			pagesFetched = 1;
		} else {
			const all = await fetchAllDeals();
			deals = all.deals;
			totalResults = all.totalResults;
			pagesFetched = all.pagesFetched;
		}

		// Any deal may have messages; messagesId usually equals dealId per Auto Trader docs.
		const candidates = deals.filter((d) => d.dealId);

		const loaded = await mapWithConcurrency(candidates, 6, loadThreadForDeal);
		const threads = loaded
			.filter((t): t is MessageThread => t != null)
			.sort((a, b) => (b.lastActivityAt ?? "").localeCompare(a.lastActivityAt ?? ""));

		const connectStatus = await getAutotraderConnectStatus(totalResults);

		const payload = {
			threads,
			totalDeals: totalResults,
			dealsScanned: candidates.length,
			pagesFetched,
			threadsWithMessages: threads.length,
			connectStatus,
		};

		if (!singlePage) {
			const listTtl =
				totalResults > 0 || threads.length > 0
					? AUTOTRADER_RESPONSE_TTL_MS.messagesList
					: 30_000;
			setCachedResponse(listKey, payload, listTtl);
		}

		return res.json(payload);
	} catch (e) {
		return next(e);
	}
}

export async function getAutotraderMessagesById(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const messagesId = req.params.messagesId?.trim();
		if (!messagesId) {
			throw new ApiError("invalid_payload", "messagesId is required.", 400);
		}

		const dealIdQuery =
			typeof req.query.dealId === "string" ? req.query.dealId.trim() : "";

		const { advertiserId } = getAutotraderConfig();
		const forceRefresh = req.query.refresh === "1";
		const detailKey = cacheKey([
			"messages",
			"detail",
			advertiserId,
			messagesId,
			dealIdQuery,
		]);

		if (!forceRefresh) {
			const cached = getCachedResponse<{ thread: unknown }>(detailKey);
			if (cached) return res.json(cached);
		}

		// Portal URLs use deal id in the path — try it as dealId even without ?dealId=
		const dealIdToLoad = dealIdQuery || messagesId;
		let deal: DealRow | null = null;
		let dealLookupFailed = true;
		try {
			deal = await getDealById(dealIdToLoad);
			dealLookupFailed = false;
		} catch {
			deal = null;
		}

		const componentId = deal
			? (resolveComponentId(deal, messagesId) ?? messagesId)
			: messagesId;

		let resource: (MessagesResource & { pagesLoaded?: number }) | null = null;
		let messagesLookupFailed = true;
		try {
			resource = await fetchMessageThread(componentId);
			if (resource.messages?.length) messagesLookupFailed = false;
		} catch {
			resource = null;
		}

		if (!resource?.messages?.length) {
			throwMessageThreadNotFound(messagesId, dealLookupFailed, messagesLookupFailed);
		}

		const lines = sortMessagesChronological(resource.messages ?? []);

		const payload = {
			thread: {
				messagesId: resource.messagesId ?? componentId,
				dealId: deal?.dealId ?? (dealIdQuery || messagesId),
				consumerName: deal
					? [deal.consumer?.firstName, deal.consumer?.lastName]
							.filter(Boolean)
							.join(" ") || null
					: null,
				consumerEmail: deal?.consumer?.email ?? null,
				consumerLastRead: resource.consumerLastRead ?? null,
				consumerLastReadStatus: resource.consumerLastReadStatus ?? null,
				advertiserLastRead: resource.advertiserLastRead ?? null,
				advertiserLastReadStatus: resource.advertiserLastReadStatus ?? null,
				messages: lines,
				pagesLoaded: resource.pagesLoaded ?? 1,
			},
		};
		setCachedResponse(detailKey, payload, AUTOTRADER_RESPONSE_TTL_MS.messageDetail);
		return res.json(payload);
	} catch (e) {
		return next(e);
	}
}

export async function getAutotraderDealById(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const dealId = req.params.dealId?.trim();
		if (!dealId) {
			throw new ApiError("invalid_payload", "dealId is required.", 400);
		}
		const deal = await getDealById(dealId);
		return res.json({ deal });
	} catch (e) {
		return next(e);
	}
}

/** PATCH /messages/{messagesComponentId} — requires Message Updates capability. */
export async function markAutotraderMessagesRead(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const messagesId = req.params.messagesId?.trim();
		if (!messagesId) {
			throw new ApiError("invalid_payload", "messagesId is required.", 400);
		}

		const { advertiserId } = getAutotraderConfig();
		await markMessagesComponentRead(messagesId);

		invalidateAutotraderCache(cacheKey(["messages", "list", advertiserId]));
		invalidateAutotraderCache(
			cacheKey(["messages", "detail", advertiserId, messagesId]),
		);

		const resource = await fetchMessageThread(messagesId);
		const payload = {
			thread: {
				messagesId: resource.messagesId ?? messagesId,
				dealId: messagesId,
				consumerLastRead: resource.consumerLastRead ?? null,
				consumerLastReadStatus: resource.consumerLastReadStatus ?? null,
				advertiserLastRead: resource.advertiserLastRead ?? null,
				advertiserLastReadStatus: resource.advertiserLastReadStatus ?? null,
				messages: sortMessagesChronological(resource.messages ?? []),
			},
		};
		setCachedResponse(
			cacheKey(["messages", "detail", advertiserId, messagesId]),
			payload,
			AUTOTRADER_RESPONSE_TTL_MS.messageDetail,
		);
		return res.json(payload);
	} catch (e) {
		return next(e);
	}
}

const MAX_MESSAGE_CHARS = 1500;

/**
 * POST /messages/?advertiserId=… — Deal Management Messages API.
 * Reply: { messagesId, text }. New thread: { dealId, text }.
 */
export async function sendAutotraderMessage(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const dealId =
			typeof req.body?.dealId === "string" ? req.body.dealId.trim() : "";
		const messagesId =
			typeof req.body?.messagesId === "string"
				? req.body.messagesId.trim()
				: "";
		const text = (
			typeof req.body?.text === "string"
				? req.body.text
				: typeof req.body?.message === "string"
					? req.body.message
					: ""
		).trim();

		if (!text) {
			throw new ApiError("invalid_payload", "text is required.", 400);
		}
		if (text.length > MAX_MESSAGE_CHARS) {
			throw new ApiError(
				"invalid_payload",
				`Message must be at most ${MAX_MESSAGE_CHARS} characters.`,
				400,
			);
		}
		if (!dealId && !messagesId) {
			throw new ApiError(
				"invalid_payload",
				"dealId or messagesId is required.",
				400,
			);
		}

		const { advertiserId } = getAutotraderConfig();

		const created = messagesId
			? await postMessagesComponent({ messagesId, text })
			: await postMessagesComponent({ dealId, text });

		const threadId = created.messagesId ?? messagesId ?? dealId;
		invalidateAutotraderCache(cacheKey(["messages", "list", advertiserId]));
		invalidateAutotraderCache(
			cacheKey(["messages", "detail", advertiserId, threadId]),
		);

		const resource = await fetchMessageThread(threadId);
		const payload = {
			created,
			thread: {
				messagesId: resource.messagesId ?? threadId,
				dealId: dealId || messagesId || threadId,
				consumerLastRead: resource.consumerLastRead ?? null,
				consumerLastReadStatus: resource.consumerLastReadStatus ?? null,
				advertiserLastRead: resource.advertiserLastRead ?? null,
				advertiserLastReadStatus: resource.advertiserLastReadStatus ?? null,
				messages: sortMessagesChronological(resource.messages ?? []),
			},
		};
		setCachedResponse(
			cacheKey(["messages", "detail", advertiserId, threadId]),
			{ thread: payload.thread },
			AUTOTRADER_RESPONSE_TTL_MS.messageDetail,
		);
		return res.json(payload);
	} catch (e) {
		return next(e);
	}
}
