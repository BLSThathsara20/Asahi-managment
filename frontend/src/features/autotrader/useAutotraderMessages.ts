import { useCallback, useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "../../shared/api/errors";
import {
	getCached,
	AUTOTRADER_CACHE_TTL,
} from "../../shared/lib/resourceCache";
import {
	fetchAutotraderMessagesList,
	getMessagesListCacheKey,
	invalidateAutotraderMessagesListCache,
} from "./fetchMessagesList";
import type { AutotraderMessagesListResponse } from "./messageTypes";

export function useAutotraderMessages() {
	const cacheKey = getMessagesListCacheKey();
	const cached = useMemo(
		() => getCached<AutotraderMessagesListResponse>(cacheKey),
		[cacheKey],
	);

	const [data, setData] = useState<AutotraderMessagesListResponse | null>(
		cached?.data ?? null,
	);
	const [loading, setLoading] = useState(!cached?.data);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async (options?: { force?: boolean }) => {
		const entry = getCached<AutotraderMessagesListResponse>(cacheKey);
		const hasData = Boolean(entry?.data ?? data);

		if (hasData && !options?.force) setRefreshing(true);
		else setLoading(true);
		setError(null);

		try {
			const res = await fetchAutotraderMessagesList({
				force: options?.force,
			});
			setData(res);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, [cacheKey, data]);

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
			if (force) invalidateAutotraderMessagesListCache();
			return load({ force });
		},
	};
}
