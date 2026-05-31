import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import type { AutotraderStockListResponse } from "./types";

export function useAutotraderStockList() {
	const [page, setPage] = useState(1);
	const [data, setData] = useState<AutotraderStockListResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const pageSize = 20;

	const load = useCallback(async (targetPage: number) => {
		setLoading(true);
		setError(null);
		try {
			const res = await apiFetch<AutotraderStockListResponse>(
				`/api/autotrader/stock?page=${targetPage}&pageSize=${pageSize}`,
			);
			setData(res);
			setPage(targetPage);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void load(1);
	}, [load]);

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
		error,
		reload: () => load(page),
		goToPage: load,
	};
}
