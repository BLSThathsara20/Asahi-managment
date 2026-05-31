import type { Request, Response, NextFunction } from "express";
import { verifyIdToken } from "./firebaseAdmin";
import { ApiError } from "../../app/errors";

export type AuthedUser = {
	uid: string;
	email: string | null;
	name: string | null;
	picture: string | null;
};

declare global {
	// eslint-disable-next-line no-var
	var __asahiTypes: true | undefined;
}

declare module "express-serve-static-core" {
	interface Request {
		user?: AuthedUser;
	}
}

export async function requireUser(req: Request, res: Response, next: NextFunction) {
	try {
		const header = req.headers.authorization || "";
		const m = header.match(/^Bearer\s+(.+)$/i);
		if (!m) {
			throw new ApiError(
				"unauthorized",
				"Missing Authorization header.",
				401,
			);
		}

		const decoded = await verifyIdToken(m[1]);
		req.user = {
			uid: decoded.uid,
			email: decoded.email ?? null,
			name: decoded.name ?? decoded.displayName ?? null,
			picture: decoded.picture ?? null,
		};
		return next();
	} catch (err) {
		if (err instanceof ApiError) return next(err);
		return next(new ApiError("unauthorized", "Invalid or expired token.", 401));
	}
}

