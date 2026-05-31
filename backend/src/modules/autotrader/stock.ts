import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../app/errors";
import { getAutotraderConfig } from "./config";
import { autotraderFetch } from "./client";

export type AutotraderStockListQuery = {
	page?: string;
	pageSize?: string;
	lifecycleState?: string;
};

export type AutotraderStockListResponse = {
	results: unknown[];
	totalResults?: number;
};

export async function listAutotraderStock(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { advertiserId } = getAutotraderConfig();
		const page = Math.max(1, Number(req.query.page) || 1);
		const pageSize = Math.min(200, Math.max(1, Number(req.query.pageSize) || 20));
		const lifecycleState =
			typeof req.query.lifecycleState === "string"
				? req.query.lifecycleState
				: undefined;

		const data = await autotraderFetch<AutotraderStockListResponse>("/stock", {
			advertiserId,
			page,
			pageSize,
			lifecycleState,
		});

		return res.json({
			results: data.results ?? [],
			totalResults: data.totalResults ?? data.results?.length ?? 0,
			page,
			pageSize,
		});
	} catch (e) {
		return next(e);
	}
}

export async function getAutotraderStockById(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const stockId = req.params.stockId?.trim();
		if (!stockId) {
			throw new ApiError("invalid_payload", "stockId is required.", 400);
		}

		const { advertiserId } = getAutotraderConfig();
		const data = await autotraderFetch<AutotraderStockListResponse>("/stock", {
			advertiserId,
			stockId,
		});

		const item = data.results?.[0];
		if (!item) {
			throw new ApiError("not_found", "Auto Trader stock item not found.", 404);
		}

		return res.json({ stock: item });
	} catch (e) {
		return next(e);
	}
}
