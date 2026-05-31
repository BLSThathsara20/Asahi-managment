import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import type { AutotraderMessagesListResponse } from "./messageTypes";

export function useAutotraderMessages() {
	const [data, setData] = useState<AutotraderMessagesListResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			// No page param — backend loads all deal pages and returns every thread (read + unread).
			const res = await apiFetch<AutotraderMessagesListResponse>(
				"/api/autotrader/messages",
			);
			setData(res);
		} catch (e) {
			setError(getErrorMessage(e));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void load();
	}, [load]);

	return {
		threads: data?.threads ?? [],
		totalDeals: data?.totalDeals ?? 0,
		dealsScanned: data?.dealsScanned ?? 0,
		pagesFetched: data?.pagesFetched ?? 0,
		threadsWithMessages: data?.threadsWithMessages ?? 0,
		connectStatus: data?.connectStatus ?? null,
		loading,
		error,
		reload: load,
	};
}
