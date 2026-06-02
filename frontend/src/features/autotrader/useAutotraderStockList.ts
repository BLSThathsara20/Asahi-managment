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
import type { AutotraderStockListResponse } from "./types";

const pageSize = 20;

function stockListCacheKey(page: number) {
	return `autotrader:stock:list:p${page}:s${pageSize}`;
}

export function useAutotraderStockList() {
	const initialPage = 1;
	const initialCache = useMemo(
		() => getCached<AutotraderStockListResponse>(stockListCacheKey(initialPage)),
		[],
	);

	const [page, setPage] = useState(initialPage);
	const [data, setData] = useState<AutotraderStockListResponse | null>(
		initialCache?.data ?? null,
	);
	const [loading, setLoading] = useState(!initialCache?.data);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async (targetPage: number, options?: { force?: boolean }) => {
		const key = stockListCacheKey(targetPage);
		const cached = getCached<AutotraderStockListResponse>(key);

		if (
			!options?.force &&
			cached &&
			isCacheFresh(cached, AUTOTRADER_CACHE_TTL.stockListMs)
		) {
			setData(cached.data);
			setPage(targetPage);
			setError(null);
			setLoading(false);
			setRefreshing(false);
			return;
		}

		const hasData = Boolean(cached?.data ?? data);
		if (hasData && !options?.force) setRefreshing(true);
		else setLoading(true);
		setError(null);

		try {
			const refresh = options?.force ? "&refresh=1" : "";
			const res = await apiFetch<AutotraderStockListResponse>(
				`/api/autotrader/stock?page=${targetPage}&pageSize=${pageSize}${refresh}`,
			);
			setData(res);
			setPage(targetPage);
			setCached(key, res);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		void load(initialPage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const totalPages = data
		? Math.max(1, Math.ceil(data.totalResults / pageSize))
		: 1;

	return {
		items: data?.results ?? [],
		totalResults: data?.totalResults ?? 0,
		page,
		pageSize,
		totalPages,
		loading,
		refreshing,
		error,
		reload: (force = false) => {
			if (force) invalidateCached(stockListCacheKey(page));
			return load(page, { force });
		},
		goToPage: (p: number) => load(p),
	};
}
