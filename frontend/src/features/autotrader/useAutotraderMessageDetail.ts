import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import {
	AUTOTRADER_CACHE_TTL,
	getCached,
	invalidateCached,
	isCacheFresh,
	setCached,
} from "../../shared/lib/resourceCache";
import type { AutotraderMessageThreadDetail } from "./messageTypes";

const MESSAGES_LIST_KEY = "autotrader:messages:list:v1";

function detailCacheKey(messagesId: string) {
	return `autotrader:messages:detail:${messagesId}`;
}

export function useAutotraderMessageDetail(messagesId: string | undefined) {
	const [searchParams] = useSearchParams();
	const dealIdFromUrl = searchParams.get("dealId")?.trim() || "";
	const cacheKey = messagesId ? detailCacheKey(messagesId) : null;
	const cached = useMemo(
		() => (cacheKey ? getCached<AutotraderMessageThreadDetail>(cacheKey) : null),
		[cacheKey],
	);

	const [thread, setThread] = useState<AutotraderMessageThreadDetail | null>(
		cached?.data ?? null,
	);
	const [loading, setLoading] = useState(Boolean(messagesId) && !cached?.data);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);

	const load = useCallback(
		async (options?: { force?: boolean }) => {
			if (!messagesId || !cacheKey) {
				setLoading(false);
				setError("missing_id");
				return;
			}

			const entry = getCached<AutotraderMessageThreadDetail>(cacheKey);
			if (
				!options?.force &&
				entry &&
				isCacheFresh(entry, AUTOTRADER_CACHE_TTL.messageDetailMs)
			) {
				setThread(entry.data);
				setError(null);
				setLoading(false);
				setRefreshing(false);
				return;
			}

			if (entry?.data && !options?.force) setRefreshing(true);
			else setLoading(true);
			setError(null);

			try {
				const qs = new URLSearchParams();
				if (options?.force) qs.set("refresh", "1");
				if (dealIdFromUrl) qs.set("dealId", dealIdFromUrl);
				const q = qs.toString() ? `?${qs}` : "";
				const res = await apiFetch<{ thread: AutotraderMessageThreadDetail }>(
					`/api/autotrader/messages/${encodeURIComponent(messagesId)}${q}`,
				);
				setThread(res.thread);
				setCached(cacheKey, res.thread);
			} catch (e) {
				setError(getErrorMessage(e));
				setThread(null);
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		},
		[messagesId, cacheKey, dealIdFromUrl],
	);

	useEffect(() => {
		void load();
	}, [load]);

	const markRead = useCallback(async () => {
		if (!messagesId || !cacheKey) return;
		setSaving(true);
		setError(null);
		try {
			const res = await apiFetch<{ thread: AutotraderMessageThreadDetail }>(
				`/api/autotrader/messages/${encodeURIComponent(messagesId)}/read`,
				{ method: "PATCH" },
			);
			setThread(res.thread);
			setCached(cacheKey, res.thread);
			invalidateCached(MESSAGES_LIST_KEY);
		} catch (e) {
			setError(getErrorMessage(e));
			throw e;
		} finally {
			setSaving(false);
		}
	}, [messagesId, cacheKey]);

	const sendReply = useCallback(
		async (message: string) => {
			if (!messagesId || !cacheKey) return;
			setSaving(true);
			setError(null);
			try {
				const res = await apiFetch<{ thread: AutotraderMessageThreadDetail }>(
					"/api/autotrader/messages/send",
					{
						method: "POST",
						body: { messagesId, text: message },
					},
				);
				setThread(res.thread);
				setCached(cacheKey, res.thread);
				invalidateCached(MESSAGES_LIST_KEY);
			} catch (e) {
				setError(getErrorMessage(e));
				throw e;
			} finally {
				setSaving(false);
			}
		},
		[messagesId, cacheKey],
	);

	return {
		thread,
		loading,
		refreshing,
		error,
		saving,
		reload: (force = false) => {
			if (cacheKey && force) invalidateCached(cacheKey);
			return load({ force });
		},
		markRead,
		sendReply,
	};
}
