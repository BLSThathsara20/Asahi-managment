import type { Request, Response, NextFunction } from "express";
import { getUserByFirebaseUid, type AppUserRole } from "../users/repo";
import { ApiError } from "../../app/errors";

const roleRank: Record<AppUserRole, number> = {
	guest: 0,
	staff: 1,
	admin: 2,
	super_admin: 3,
};

export function requireRole(minRole: AppUserRole) {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user)
			return next(new ApiError("unauthorized", "Please sign in.", 401));

		const appUser = await getUserByFirebaseUid(req.user.uid);
		if (!appUser)
			return next(new ApiError("forbidden", "Access denied.", 403));

		if (roleRank[appUser.role] < roleRank[minRole]) {
			return next(new ApiError("forbidden", "Access denied.", 403));
		}

		return next();
	};
}

