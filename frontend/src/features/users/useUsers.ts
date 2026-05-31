import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import { getCached, setCached } from "../../shared/lib/resourceCache";
import type { AppUserRole } from "../../app/providers/AuthProvider";

export type UserRow = {
  id: string;
  firebase_uid: string;
  email: string | null;
  display_name: string | null;
  role: AppUserRole;
  created_at: string;
  updated_at: string;
};

type Payload = { users: UserRow[] };
const CACHE_KEY = "admin:users:v1";

export function useUsers(enabled: boolean) {
  const cached = useMemo(() => getCached<Payload>(CACHE_KEY), []);
  const [users, setUsers] = useState<UserRow[]>(cached?.data.users ?? []);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(enabled && users.length === 0);
  const [refreshing, setRefreshing] = useState(enabled && users.length > 0);

  async function fetchUsers({ showSkeleton }: { showSkeleton: boolean }) {
    if (!enabled) return;
    if (showSkeleton) setLoading(true);
    else setRefreshing(true);
    try {
      const data = await apiFetch<Payload>("/api/admin/users");
      setUsers(data.users ?? []);
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
    void fetchUsers({ showSkeleton: users.length === 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return {
    users,
    setUsers,
    error,
    loading,
    refreshing,
    reload: () => fetchUsers({ showSkeleton: users.length === 0 }),
  };
}

