import type { Request, Response, NextFunction, RequestHandler } from "express";

/** Forwards rejected promises from async route handlers to Express error middleware. */
export function asyncHandler(fn: RequestHandler): RequestHandler {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}
