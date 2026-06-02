type Entry = { data: unknown; expiresAtMs: number };

const store = new Map<string, Entry>();

export const AUTOTRADER_RESPONSE_TTL_MS = {
	stockList: 3 * 60 * 1000,
	stockDetail: 10 * 60 * 1000,
	messagesList: 5 * 60 * 1000,
	messageDetail: 2 * 60 * 1000,
} as const;

export function cacheKey(parts: string[]): string {
	return parts.join(":");
}

export function getCachedResponse<T>(key: string): T | null {
	const entry = store.get(key);
	if (!entry) return null;
	if (Date.now() >= entry.expiresAtMs) {
		store.delete(key);
		return null;
	}
	return entry.data as T;
}

export function setCachedResponse(key: string, data: unknown, ttlMs: number) {
	store.set(key, { data, expiresAtMs: Date.now() + ttlMs });
}

export function invalidateAutotraderCache(prefix: string) {
	for (const key of store.keys()) {
		if (key.startsWith(prefix)) store.delete(key);
	}
}
