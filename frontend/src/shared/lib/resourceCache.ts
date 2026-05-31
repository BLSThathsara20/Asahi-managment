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

