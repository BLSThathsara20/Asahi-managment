import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useLocation } from "react-router-dom";
import { getErrorMessage } from "../../shared/api/errors";
import {
	fetchAutotraderMessagesList,
	invalidateAutotraderMessagesListCache,
} from "../../features/autotrader/fetchMessagesList";
import type { AutotraderMessageThreadSummary } from "../../features/autotrader/messageTypes";
import {
	buildMessageNotifications,
	filterVisibleNotifications,
	isUnreadThread,
	loadDismissedNotificationIds,
	loadToastedAlertKeys,
	saveDismissedNotificationIds,
	saveToastedAlertKeys,
	threadAlertKey,
	type MessageNotificationItem,
} from "../../shared/notifications/messageAlerts";
import { useNotify } from "../../shared/ui/ToastProvider";

const POLL_MS = 60_000;

type NotificationContextValue = {
	unreadCount: number;
	items: MessageNotificationItem[];
	loading: boolean;
	error: string | null;
	lastCheckedAt: string | null;
	refresh: (force?: boolean) => Promise<void>;
	dismiss: (id: string) => void;
	dismissAll: () => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
	null,
);

function formatToastTime(iso: string | null) {
	if (!iso) return undefined;
	try {
		return new Date(iso).toLocaleString("en-GB", {
			dateStyle: "short",
			timeStyle: "short",
		});
	} catch {
		return undefined;
	}
}

export function NotificationProvider({
	enabled,
	children,
}: {
	enabled: boolean;
	children: React.ReactNode;
}) {
	const notify = useNotify();
	const location = useLocation();
	const [threads, setThreads] = useState<AutotraderMessageThreadSummary[]>(
		[],
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [lastCheckedAt, setLastCheckedAt] = useState<string | null>(null);
	const [dismissed, setDismissed] = useState(() =>
		loadDismissedNotificationIds(),
	);
	const toastedRef = useRef(loadToastedAlertKeys());
	const prevUnreadKeysRef = useRef<Set<string>>(new Set());
	const pathnameRef = useRef(location.pathname);

	useEffect(() => {
		pathnameRef.current = location.pathname;
	}, [location.pathname]);

	const allUnread = useMemo(
		() => buildMessageNotifications(threads),
		[threads],
	);
	const unreadCount = allUnread.length;
	const items = useMemo(
		() => filterVisibleNotifications(allUnread, dismissed),
		[allUnread, dismissed],
	);

	const notifyNewUnread = useCallback(
		(current: AutotraderMessageThreadSummary[]) => {
			const onMessages = pathnameRef.current.startsWith(
				"/autotrader/messages",
			);
			const unread = current.filter(isUnreadThread);
			const keys = new Set(unread.map(threadAlertKey));

			for (const thread of unread) {
				const key = threadAlertKey(thread);
				if (toastedRef.current.has(key)) continue;
				if (prevUnreadKeysRef.current.has(key)) continue;
				if (onMessages) continue;

				const name = thread.consumerName ?? "Customer";
				const preview =
					thread.lastMessage?.message?.trim() ||
					"New Auto Trader message";
				const when = formatToastTime(
					thread.lastMessage?.at ?? thread.lastActivityAt ?? null,
				);

				notify.info({
					title: `New message from ${name}`,
					description: when ? `${preview} · ${when}` : preview,
				});
				toastedRef.current.add(key);
			}

			prevUnreadKeysRef.current = keys;
			saveToastedAlertKeys(toastedRef.current);
		},
		[notify],
	);

	const refresh = useCallback(
		async (force = false) => {
			if (!enabled) return;
			setLoading(true);
			setError(null);
			try {
				const res = await fetchAutotraderMessagesList({ force });
				setThreads(res.threads);
				setLastCheckedAt(new Date().toISOString());
				notifyNewUnread(res.threads);

				const unreadIds = new Set(
					res.threads.filter(isUnreadThread).map((t) => t.messagesId),
				);
				setDismissed((prev) => {
					const next = new Set(prev);
					for (const id of next) {
						if (!unreadIds.has(id)) next.delete(id);
					}
					if (next.size !== prev.size) saveDismissedNotificationIds(next);
					return next;
				});
			} catch (e) {
				setError(getErrorMessage(e));
			} finally {
				setLoading(false);
			}
		},
		[enabled, notifyNewUnread],
	);

	useEffect(() => {
		if (!enabled) {
			setThreads([]);
			setError(null);
			prevUnreadKeysRef.current = new Set();
			return;
		}
		void refresh(false);
	}, [enabled, refresh]);

	useEffect(() => {
		if (!enabled) return;
		const id = window.setInterval(() => {
			if (document.visibilityState === "hidden") return;
			void refresh(false);
		}, POLL_MS);
		return () => window.clearInterval(id);
	}, [enabled, refresh]);

	useEffect(() => {
		if (!enabled) return;
		const onVisible = () => {
			if (document.visibilityState === "visible") void refresh(false);
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, [enabled, refresh]);

	useEffect(() => {
		if (!enabled || unreadCount === 0) {
			document.title = "Asahi Stock";
			return;
		}
		document.title = `(${unreadCount}) Asahi Stock`;
	}, [enabled, unreadCount]);

	const dismiss = useCallback((id: string) => {
		setDismissed((prev) => {
			const next = new Set(prev);
			next.add(id);
			saveDismissedNotificationIds(next);
			return next;
		});
	}, []);

	const dismissAll = useCallback(() => {
		setDismissed((prev) => {
			const next = new Set(prev);
			for (const item of allUnread) next.add(item.id);
			saveDismissedNotificationIds(next);
			return next;
		});
	}, [allUnread]);

	const value = useMemo(
		() => ({
			unreadCount,
			items,
			loading,
			error,
			lastCheckedAt,
			refresh: async (force?: boolean) => {
				if (force) invalidateAutotraderMessagesListCache();
				await refresh(force);
			},
			dismiss,
			dismissAll,
		}),
		[
			unreadCount,
			items,
			loading,
			error,
			lastCheckedAt,
			refresh,
			dismiss,
			dismissAll,
		],
	);

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotifications() {
	const ctx = useContext(NotificationContext);
	if (!ctx) {
		throw new Error(
			"useNotifications must be used within NotificationProvider",
		);
	}
	return ctx;
}

/** Safe when provider is not mounted (e.g. login page). */
export function useNotificationsOptional() {
	return useContext(NotificationContext);
}
