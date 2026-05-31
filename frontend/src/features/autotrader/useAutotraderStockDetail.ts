import { useEffect, useState } from "react";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import type { AutotraderStockItem } from "./types";

export function useAutotraderStockDetail(stockId: string | undefined) {
	const [stock, setStock] = useState<AutotraderStockItem | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!stockId) {
			setLoading(false);
			setError("missing_id");
			return;
		}

		let cancelled = false;
		(async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await apiFetch<{ stock: AutotraderStockItem }>(
					`/api/autotrader/stock/${encodeURIComponent(stockId)}`,
				);
				if (!cancelled) setStock(res.stock);
			} catch (e) {
				if (!cancelled) {
					setError(getErrorMessage(e));
					setStock(null);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [stockId]);

	return { stock, loading, error };
}
