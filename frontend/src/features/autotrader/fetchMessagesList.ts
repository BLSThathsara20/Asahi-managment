import { apiFetch } from "../../shared/api/client";
import {
	AUTOTRADER_CACHE_TTL,
	getCached,
	invalidateCached,
	isCacheFresh,
	setCached,
} from "../../shared/lib/resourceCache";
import type { AutotraderMessagesListResponse } from "./messageTypes";

const CACHE_KEY = "autotrader:messages:list:v1";

export function getMessagesListCacheKey() {
	return CACHE_KEY;
}

export async function fetchAutotraderMessagesList(options?: {
	force?: boolean;
}): Promise<AutotraderMessagesListResponse> {
	const entry = getCached<AutotraderMessagesListResponse>(CACHE_KEY);
	const emptyList =
		entry?.data?.totalDeals === 0 && (entry?.data?.threads?.length ?? 0) === 0;
	const cacheTtl = emptyList
		? AUTOTRADER_CACHE_TTL.emptyMessagesListMs
		: AUTOTRADER_CACHE_TTL.messagesListMs;

	if (!options?.force && entry && isCacheFresh(entry, cacheTtl)) {
		return entry.data;
	}

	const refresh = options?.force ? "?refresh=1" : "";
	const res = await apiFetch<AutotraderMessagesListResponse>(
		`/api/autotrader/messages${refresh}`,
	);

	if (res.totalDeals > 0 || res.threads.length > 0) {
		setCached(CACHE_KEY, res);
	} else {
		invalidateCached(CACHE_KEY);
	}

	return res;
}

export function invalidateAutotraderMessagesListCache() {
	invalidateCached(CACHE_KEY);
}
