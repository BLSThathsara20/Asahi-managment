/**
 * [NEW] AT Connect — Messages Updates (Capabilities collection + Deal Management paths).
 * @see https://www.postman.com/auto-trader-tam/partner-starter-collections
 */
import { ApiError } from "../../app/errors";
import { getAutotraderConfig } from "./config";
import { autotraderFetch } from "./client";
import { getAdvertiserCapabilities } from "./diagnostics";

export type MessageLine = {
	from?: string;
	at?: string;
	message?: string;
};

export type MessagesResource = {
	messagesId?: string;
	messagesComponentId?: string;
	consumerLastRead?: string;
	consumerLastReadStatus?: string;
	advertiserLastRead?: string;
	advertiserLastReadStatus?: string;
	messages?: MessageLine[];
};

function normalizeLine(raw: unknown): MessageLine | null {
	if (!raw || typeof raw !== "object") return null;
	const o = raw as Record<string, unknown>;
	const body =
		typeof o.message === "string"
			? o.message
			: typeof o.text === "string"
				? o.text
				: undefined;
	return {
		from: typeof o.from === "string" ? o.from : undefined,
		at: typeof o.at === "string" ? o.at : undefined,
		message: body,
	};
}

export function normalizeMessagesResource(raw: unknown): MessagesResource {
	if (!raw || typeof raw !== "object") return {};
	const o = raw as Record<string, unknown>;
	const componentId =
		typeof o.messagesComponentId === "string"
			? o.messagesComponentId
			: typeof o.messagesId === "string"
				? o.messagesId
				: undefined;

	const lines = Array.isArray(o.messages)
		? o.messages.map(normalizeLine).filter((x): x is MessageLine => x != null)
		: [];

	return {
		messagesId: componentId,
		messagesComponentId: componentId,
		consumerLastRead:
			typeof o.consumerLastRead === "string" ? o.consumerLastRead : undefined,
		consumerLastReadStatus:
			typeof o.consumerLastReadStatus === "string"
				? o.consumerLastReadStatus
				: undefined,
		advertiserLastRead:
			typeof o.advertiserLastRead === "string" ? o.advertiserLastRead : undefined,
		advertiserLastReadStatus:
			typeof o.advertiserLastReadStatus === "string"
				? o.advertiserLastReadStatus
				: undefined,
		messages: lines,
	};
}

export async function assertMessageUpdatesCapability(): Promise<void> {
	const caps = await getAdvertiserCapabilities();
	if (!caps.messageUpdatesEligible) {
		throw new ApiError(
			"autotrader_capability_disabled",
			"Message Updates is not enabled on your Auto Trader API key. " +
				"Send, reply, and mark-as-read will not work until Auto Trader enables it " +
				"(partner.support@autotrader.co.uk). Listing messages also needs deals in the Deals API.",
			503,
		);
	}
}

const MAX_MESSAGE_PAGES = 20;

/** GET /messages/{messageId}?advertiserId=…&page=… */
export async function getMessagesComponent(
	messagesComponentId: string,
	page = 1,
): Promise<MessagesResource> {
	const { advertiserId } = getAutotraderConfig();
	const raw = await autotraderFetch<unknown>(
		`/messages/${encodeURIComponent(messagesComponentId)}`,
		{ advertiserId, page },
	);
	return normalizeMessagesResource(raw);
}

/** Load thread history across pages (Postman: …/messages/:messageId?page=1). */
export async function getMessagesComponentAllPages(
	messagesComponentId: string,
	maxPages = MAX_MESSAGE_PAGES,
): Promise<MessagesResource & { pagesLoaded: number }> {
	let merged: MessagesResource = {};
	const allLines: MessageLine[] = [];
	const seen = new Set<string>();
	let pagesLoaded = 0;

	for (let page = 1; page <= maxPages; page++) {
		const resource = await getMessagesComponent(messagesComponentId, page);
		pagesLoaded = page;
		if (page === 1) merged = { ...resource };

		const lines = resource.messages ?? [];
		if (lines.length === 0) break;

		let added = 0;
		for (const line of lines) {
			const key = `${line.at ?? ""}|${line.from ?? ""}|${line.message ?? ""}`;
			if (seen.has(key)) continue;
			seen.add(key);
			allLines.push(line);
			added++;
		}
		if (page > 1 && added === 0) break;
	}

	merged.messages = allLines;
	return { ...merged, pagesLoaded };
}

/** PATCH mark read — Capabilities collection often returns 200 with empty body. */
export async function markMessagesComponentRead(
	messagesComponentId: string,
): Promise<void> {
	await assertMessageUpdatesCapability();
	const { advertiserId } = getAutotraderConfig();
	const path = `/messages/${encodeURIComponent(messagesComponentId)}`;
	const attempts: unknown[] = [
		{},
		{ advertiserLastReadStatus: "Read" },
		{ status: "Read" },
	];

	let lastError: unknown;
	for (const body of attempts) {
		try {
			await autotraderFetch(path, { advertiserId }, { method: "PATCH", body });
			return;
		} catch (e) {
			lastError = e;
		}
	}
	throw lastError;
}

type PostMessagesBody = {
	dealId?: string;
	messagesId?: string;
	messagesComponentId?: string;
	text: string;
};

/** POST /messages/?advertiserId=… — new thread or reply (Capabilities Send Messages). */
export async function postMessagesComponent(
	input:
		| { dealId: string; text: string }
		| { messagesId: string; text: string },
): Promise<{ messagesId?: string; text?: string; message?: string }> {
	await assertMessageUpdatesCapability();
	const { advertiserId } = getAutotraderConfig();

	const body: PostMessagesBody =
		"dealId" in input
			? { dealId: input.dealId, text: input.text }
			: {
					messagesId: input.messagesId,
					messagesComponentId: input.messagesId,
					text: input.text,
				};

	return autotraderFetch("/messages/", { advertiserId }, {
		method: "POST",
		body,
	});
}
