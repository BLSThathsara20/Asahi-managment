import type { AutotraderMessageThreadSummary } from "../../features/autotrader/messageTypes";

export type MessageNotificationItem = {
	id: string;
	messagesId: string;
	dealId: string;
	title: string;
	body: string;
	href: string;
	at: string | null;
};

const DISMISSED_KEY = "asahi:notifications:dismissed";
const TOASTED_KEY = "asahi:notifications:toasted";

export function isUnreadThread(thread: AutotraderMessageThreadSummary): boolean {
	return thread.advertiserLastReadStatus === "Unread";
}

/** Stable key for deduping toasts when activity changes on the same thread. */
export function threadAlertKey(thread: AutotraderMessageThreadSummary): string {
	const at =
		thread.lastMessage?.at ??
		thread.lastActivityAt ??
		thread.messagesId;
	return `${thread.messagesId}:${at}`;
}

export function buildMessageNotifications(
	threads: AutotraderMessageThreadSummary[],
): MessageNotificationItem[] {
	return threads.filter(isUnreadThread).map((thread) => {
		const dealQ = thread.dealId
			? `?dealId=${encodeURIComponent(thread.dealId)}`
			: "";
		const preview =
			thread.lastMessage?.message?.trim() || "New message — open to view";
		const at =
			thread.lastMessage?.at ?? thread.lastActivityAt ?? null;

		return {
			id: thread.messagesId,
			messagesId: thread.messagesId,
			dealId: thread.dealId,
			title: thread.consumerName ?? "Auto Trader enquiry",
			body: preview,
			href: `/autotrader/messages/${encodeURIComponent(thread.messagesId)}${dealQ}`,
			at,
		};
	});
}

function readJsonSet(key: string): Set<string> {
	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return new Set();
		const arr = JSON.parse(raw) as unknown;
		if (!Array.isArray(arr)) return new Set();
		return new Set(arr.filter((x) => typeof x === "string"));
	} catch {
		return new Set();
	}
}

function writeJsonSet(key: string, set: Set<string>) {
	window.localStorage.setItem(key, JSON.stringify([...set].slice(-200)));
}

export function loadDismissedNotificationIds(): Set<string> {
	return readJsonSet(DISMISSED_KEY);
}

export function saveDismissedNotificationIds(ids: Set<string>) {
	writeJsonSet(DISMISSED_KEY, ids);
}

export function loadToastedAlertKeys(): Set<string> {
	try {
		const raw = window.sessionStorage.getItem(TOASTED_KEY);
		if (!raw) return new Set();
		const arr = JSON.parse(raw) as unknown;
		if (!Array.isArray(arr)) return new Set();
		return new Set(arr.filter((x) => typeof x === "string"));
	} catch {
		return new Set();
	}
}

export function saveToastedAlertKeys(keys: Set<string>) {
	window.sessionStorage.setItem(TOASTED_KEY, JSON.stringify([...keys].slice(-100)));
}

export function filterVisibleNotifications(
	items: MessageNotificationItem[],
	dismissed: Set<string>,
): MessageNotificationItem[] {
	return items.filter((n) => !dismissed.has(n.id));
}
