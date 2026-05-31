import type { Response } from "express";
import { ApiError, type ApiErrorCode } from "./errors";

export function sendApiError(
	res: Response,
	status: number,
	code: ApiErrorCode,
	message: string,
) {
	return res.status(status).json({ error: { code, message } });
}

/** @deprecated Prefer `throw new ApiError(...)` inside async handlers. */
export function legacyError(
	res: Response,
	status: number,
	code: ApiErrorCode,
	message: string,
) {
	return sendApiError(res, status, code, message);
}

export function notFound(res: Response, message = "Not found.") {
	return sendApiError(res, 404, "not_found", message);
}

export function badRequest(res: Response, code: ApiErrorCode, message: string) {
	return sendApiError(res, 400, code, message);
}
