import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import { getCached, setCached } from "../../shared/lib/resourceCache";

export type Vehicle = {
  id: string;
  stock_code: string | null;
  registration: string | null;
  vin: string | null;
  make: string;
  model: string;
  trim: string | null;
  year: number;
  mileage_miles: number;
  price_gbp: number | null;
  status: string;
};

type Page = { vehicles: Vehicle[]; nextCursor: string | null };

const CACHE_KEY = "vehicles:firstPage:v1";

export function useVehicles() {
  const cached = useMemo(() => getCached<Page>(CACHE_KEY), []);
  const [vehicles, setVehicles] = useState<Vehicle[]>(
    cached?.data.vehicles ?? [],
  );
  const [nextCursor, setNextCursor] = useState<string | null>(
    cached?.data.nextCursor ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(vehicles.length === 0);
  const [refreshing, setRefreshing] = useState(vehicles.length > 0);
  const [loadingMore, setLoadingMore] = useState(false);

  async function loadFirstPage({ showSkeleton }: { showSkeleton: boolean }) {
    if (showSkeleton) setLoading(true);
    else setRefreshing(true);
    try {
      const data = await apiFetch<Page>("/api/vehicles?limit=25");
      setVehicles(data.vehicles ?? []);
      setNextCursor(data.nextCursor ?? null);
      setCached(CACHE_KEY, data);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    // Stale-while-revalidate: if we have cached rows, render immediately and refresh silently.
    void loadFirstPage({ showSkeleton: vehicles.length === 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await apiFetch<Page>(
        `/api/vehicles?limit=25&cursor=${encodeURIComponent(nextCursor)}`,
      );
      setVehicles((prev) => [...prev, ...(data.vehicles ?? [])]);
      setNextCursor(data.nextCursor ?? null);
    } catch (e) {
      throw e;
    } finally {
      setLoadingMore(false);
    }
  }

  return {
    vehicles,
    nextCursor,
    error,
    loading,
    refreshing,
    loadingMore,
    reload: () => loadFirstPage({ showSkeleton: vehicles.length === 0 }),
    loadMore,
    setVehicles,
  };
}

