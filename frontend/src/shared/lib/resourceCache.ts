type CacheEntry<T> = {
	data: T;
	timestamp: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): CacheEntry<T> | null {
	return (cache.get(key) as CacheEntry<T> | undefined) ?? null;
}

export function setCached<T>(key: string, data: T) {
	cache.set(key, { data, timestamp: Date.now() });
}

export function invalidateCached(key: string) {
	cache.delete(key);
}

export function isCacheFresh(
	entry: CacheEntry<unknown> | null,
	ttlMs: number,
): boolean {
	if (!entry) return false;
	return Date.now() - entry.timestamp < ttlMs;
}

/** How long to reuse Auto Trader list/detail data when navigating between pages. */
export const AUTOTRADER_CACHE_TTL = {
	stockListMs: 3 * 60 * 1000,
	messagesListMs: 5 * 60 * 1000,
	/** When Connect returns zero deals, re-fetch often — portal may have new messages we cannot see yet. */
	emptyMessagesListMs: 30 * 1000,
	stockDetailMs: 10 * 60 * 1000,
	messageDetailMs: 2 * 60 * 1000,
} as const;
