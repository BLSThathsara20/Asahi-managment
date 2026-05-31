import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../app/errors";
import { getUserByFirebaseUid } from "../users/repo";
import { assertPermission, type PermissionKey } from "./permissions";

export function requirePermission(permission: PermissionKey) {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			if (!req.user)
				return next(new ApiError("unauthorized", "Please sign in.", 401));

			const appUser = await getUserByFirebaseUid(req.user.uid);
			if (!appUser) return next(new ApiError("forbidden", "Access denied.", 403));

			await assertPermission(appUser.role, permission);
			return next();
		} catch (e) {
			return next(e);
		}
	};
}

