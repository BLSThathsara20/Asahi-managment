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
import type { AutotraderStockItem } from "./types";

function detailCacheKey(stockId: string) {
	return `autotrader:stock:detail:${stockId}`;
}

export function useAutotraderStockDetail(stockId: string | undefined) {
	const cacheKey = stockId ? detailCacheKey(stockId) : null;
	const cached = useMemo(
		() => (cacheKey ? getCached<AutotraderStockItem>(cacheKey) : null),
		[cacheKey],
	);

	const [stock, setStock] = useState<AutotraderStockItem | null>(
		cached?.data ?? null,
	);
	const [loading, setLoading] = useState(Boolean(stockId) && !cached?.data);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(
		async (options?: { force?: boolean }) => {
			if (!stockId || !cacheKey) {
				setLoading(false);
				setError("missing_id");
				return;
			}

			const entry = getCached<AutotraderStockItem>(cacheKey);
			if (
				!options?.force &&
				entry &&
				isCacheFresh(entry, AUTOTRADER_CACHE_TTL.stockDetailMs)
			) {
				setStock(entry.data);
				setError(null);
				setLoading(false);
				setRefreshing(false);
				return;
			}

			if (entry?.data && !options?.force) setRefreshing(true);
			else setLoading(true);
			setError(null);

			try {
				const refresh = options?.force ? "?refresh=1" : "";
				const res = await apiFetch<{ stock: AutotraderStockItem }>(
					`/api/autotrader/stock/${encodeURIComponent(stockId)}${refresh}`,
				);
				setStock(res.stock);
				setCached(cacheKey, res.stock);
			} catch (e) {
				setError(getErrorMessage(e));
				setStock(null);
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		},
		[stockId, cacheKey],
	);

	useEffect(() => {
		void load();
	}, [load]);

	return {
		stock,
		loading,
		refreshing,
		error,
		reload: (force = false) => {
			if (cacheKey && force) invalidateCached(cacheKey);
			return load({ force });
		},
	};
}
