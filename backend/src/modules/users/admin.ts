import type { Request, Response } from "express";
import { ApiError } from "../../app/errors";
import { listUsers, updateUserRole, type AppUserRole } from "./repo";

export async function adminListUsers(req: Request, res: Response) {
	const users = await listUsers();
	return res.json({ users });
}

export async function adminUpdateUserRole(req: Request, res: Response) {
	const id = String(req.params.id || "");
	const role = String(req.body?.role || "") as AppUserRole;

	if (!id) throw new ApiError("missing_id", "User id is required.", 400);
	if (!["super_admin", "admin", "staff", "guest"].includes(role)) {
		throw new ApiError("invalid_payload", "Invalid role.", 400);
	}

	const updated = await updateUserRole(id, role);
	if (!updated) throw new ApiError("not_found", "User not found.", 404);
	return res.json({ user: updated });
}

