import { pool } from "../../db/pool";
import { ApiError } from "../../app/errors";
import type { AppUserRole } from "../users/repo";

export type PermissionKey =
	| "vehicles:read"
	| "vehicles:write"
	| "vehicles:delete"
	| "users:manage"
	| "permissions:manage";

type PermissionsRow = { role: AppUserRole; permissions: Record<string, unknown> };

let cache:
	| { loadedAtMs: number; byRole: Record<AppUserRole, Record<string, unknown>> }
	| null = null;

async function loadPermissions(): Promise<Record<AppUserRole, Record<string, unknown>>> {
	const now = Date.now();
	if (cache && now - cache.loadedAtMs < 30_000) return cache.byRole;

	const { rows } = await pool.query<PermissionsRow>(
		`select role, permissions from public.role_permissions`,
	);

	const byRole: Record<AppUserRole, Record<string, unknown>> = {
		guest: {},
		staff: {},
		admin: {},
		super_admin: {},
	};

	for (const r of rows) {
		if (r && r.role in byRole) byRole[r.role] = r.permissions ?? {};
	}

	cache = { loadedAtMs: now, byRole };
	return byRole;
}

export async function hasPermission(role: AppUserRole, permission: PermissionKey) {
	const byRole = await loadPermissions();
	return byRole[role]?.[permission] === true;
}

export async function assertPermission(role: AppUserRole, permission: PermissionKey) {
	const ok = await hasPermission(role, permission);
	if (!ok) throw new ApiError("forbidden", "Access denied.", 403);
}

