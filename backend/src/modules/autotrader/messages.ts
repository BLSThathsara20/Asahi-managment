import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../app/errors";
import { getAutotraderConfig } from "./config";
import { autotraderFetch } from "./client";
import { getAutotraderConnectStatus } from "./diagnostics";

type DealRow = {
	dealId?: string;
	advertiserId?: string;
	created?: string;
	lastUpdated?: string;
	advertiserDealStatus?: string;
	consumer?: {
		firstName?: string | null;
		lastName?: string | null;
		email?: string | null;
		phone?: string | null;
	};
	stock?: { stockId?: string | null; searchId?: string | null };
	messages?: { id?: string | null; lastUpdated?: string | null };
};

type DealsListResponse = {
	results?: DealRow[];
	totalResults?: number;
};

type MessageLine = {
	from?: string;
	at?: string;
	message?: string;
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

type MessagesResource = {
	messagesId?: string;
	consumerLastRead?: string;
	consumerLastReadStatus?: string;
	advertiserLastRead?: string;
	advertiserLastReadStatus?: string;
	messages?: MessageLine[];
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

async function fetchMessageThread(messagesId: string): Promise<MessagesResource> {
	const { advertiserId } = getAutotraderConfig();
	return autotraderFetch<MessagesResource>(
		`/messages/${encodeURIComponent(messagesId)}`,
		{ advertiserId },
	);
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

export async function listAutotraderMessages(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
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

		return res.json({
			threads,
			totalDeals: totalResults,
			dealsScanned: candidates.length,
			pagesFetched,
			threadsWithMessages: threads.length,
			connectStatus,
		});
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

		let resource: MessagesResource | null = null;
		try {
			resource = await fetchMessageThread(messagesId);
		} catch {
			resource = null;
		}

		if (!resource?.messages?.length) {
			throw new ApiError("not_found", "Message thread not found.", 404);
		}

		const lines = sortMessagesChronological(resource.messages ?? []);

		return res.json({
			thread: {
				messagesId: resource.messagesId ?? messagesId,
				dealId: messagesId,
				consumerLastRead: resource.consumerLastRead ?? null,
				consumerLastReadStatus: resource.consumerLastReadStatus ?? null,
				advertiserLastRead: resource.advertiserLastRead ?? null,
				advertiserLastReadStatus: resource.advertiserLastReadStatus ?? null,
				messages: lines,
			},
		});
	} catch (e) {
		return next(e);
	}
}

/** PATCH /messages/{messagesId} — requires Message Updates capability. */
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
		await autotraderFetch(
			`/messages/${encodeURIComponent(messagesId)}`,
			{ advertiserId },
			{
				method: "PATCH",
				body: { advertiserLastReadStatus: "Read" },
			},
		);

		const resource = await fetchMessageThread(messagesId);
		return res.json({
			thread: {
				messagesId: resource.messagesId ?? messagesId,
				dealId: messagesId,
				consumerLastRead: resource.consumerLastRead ?? null,
				consumerLastReadStatus: resource.consumerLastReadStatus ?? null,
				advertiserLastRead: resource.advertiserLastRead ?? null,
				advertiserLastReadStatus: resource.advertiserLastReadStatus ?? null,
				messages: sortMessagesChronological(resource.messages ?? []),
			},
		});
	} catch (e) {
		return next(e);
	}
}

const MAX_MESSAGE_CHARS = 1500;

/** POST /messages — requires Message Updates capability. */
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
		const message =
			typeof req.body?.message === "string" ? req.body.message.trim() : "";

		if (!message) {
			throw new ApiError("invalid_payload", "message is required.", 400);
		}
		if (message.length > MAX_MESSAGE_CHARS) {
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
		const body: { message: string; dealId?: string; messagesId?: string } = {
			message,
		};
		if (messagesId) body.messagesId = messagesId;
		else body.dealId = dealId;

		const created = await autotraderFetch<{
			messagesId?: string;
			message?: string;
		}>("/messages", { advertiserId }, { method: "POST", body });

		const threadId = created.messagesId ?? messagesId ?? dealId;
		const resource = await fetchMessageThread(threadId);

		return res.json({
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
		});
	} catch (e) {
		return next(e);
	}
}
