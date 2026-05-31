import type { Request, Response, NextFunction } from "express";
import { pool } from "../../db/pool";
import { ApiError } from "../../app/errors";
import type { AppUserRole } from "../users/repo";
import type { PermissionKey } from "../auth/permissions";

type PermissionsPayload = Partial<Record<PermissionKey, boolean>>;

const ROLES: AppUserRole[] = ["guest", "staff", "admin", "super_admin"];

export async function adminGetRolePermissions(
	_req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { rows } = await pool.query<{
			role: AppUserRole;
			permissions: Record<string, unknown>;
			updated_at: string;
		}>(`select role, permissions, updated_at from public.role_permissions`);

		const byRole: Record<string, Record<string, unknown>> = {};
		for (const r of rows) byRole[r.role] = r.permissions ?? {};

		return res.json({ roles: ROLES, permissionsByRole: byRole });
	} catch (e) {
		return next(e);
	}
}

export async function adminSetRolePermissions(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { role, permissions } = (req.body ?? {}) as {
			role?: AppUserRole;
			permissions?: PermissionsPayload;
		};

		if (!role || !ROLES.includes(role))
			throw new ApiError("invalid_payload", "Invalid role.", 400);
		if (!permissions || typeof permissions !== "object")
			throw new ApiError("invalid_payload", "Invalid permissions.", 400);

		await pool.query(
			`insert into public.role_permissions (role, permissions, updated_at)
			 values ($1, $2::jsonb, now())
			 on conflict (role) do update set permissions = excluded.permissions, updated_at = now()`,
			[role, JSON.stringify(permissions)],
		);

		return res.json({ ok: true });
	} catch (e) {
		return next(e);
	}
}

