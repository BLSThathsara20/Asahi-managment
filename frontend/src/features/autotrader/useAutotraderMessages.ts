import { useCallback, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import {
	AUTOTRADER_CACHE_TTL,
	getCached,
	invalidateCached,
	isCacheFresh,
	setCached,
} from "../../shared/lib/resourceCache";
import type { AutotraderMessagesListResponse } from "./messageTypes";

const CACHE_KEY = "autotrader:messages:list:v1";

export function useAutotraderMessages() {
	const cached = useMemo(() => getCached<AutotraderMessagesListResponse>(CACHE_KEY), []);

	const [data, setData] = useState<AutotraderMessagesListResponse | null>(
		cached?.data ?? null,
	);
	const [loading, setLoading] = useState(!cached?.data);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async (options?: { force?: boolean }) => {
		const entry = getCached<AutotraderMessagesListResponse>(CACHE_KEY);
		const emptyList =
			entry?.data?.totalDeals === 0 && (entry?.data?.threads?.length ?? 0) === 0;
		const cacheTtl = emptyList
			? AUTOTRADER_CACHE_TTL.emptyMessagesListMs
			: AUTOTRADER_CACHE_TTL.messagesListMs;

		if (!options?.force && entry && isCacheFresh(entry, cacheTtl)) {
			setData(entry.data);
			setError(null);
			setLoading(false);
			setRefreshing(false);
			return;
		}

		const hasData = Boolean(entry?.data ?? data);
		if (hasData && !options?.force) setRefreshing(true);
		else setLoading(true);
		setError(null);

		try {
			const refresh = options?.force ? "?refresh=1" : "";
			const res = await apiFetch<AutotraderMessagesListResponse>(
				`/api/autotrader/messages${refresh}`,
			);
			setData(res);
			if (res.totalDeals > 0 || res.threads.length > 0) {
				setCached(CACHE_KEY, res);
			} else {
				invalidateCached(CACHE_KEY);
			}
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		void load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		threads: data?.threads ?? [],
		totalDeals: data?.totalDeals ?? 0,
		dealsScanned: data?.dealsScanned ?? 0,
		pagesFetched: data?.pagesFetched ?? 0,
		threadsWithMessages: data?.threadsWithMessages ?? 0,
		connectStatus: data?.connectStatus ?? null,
		loading,
		refreshing,
		error,
		reload: (force = false) => {
			if (force) invalidateCached(CACHE_KEY);
			return load({ force });
		},
	};
}
