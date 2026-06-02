import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../app/errors";
import { getAutotraderConfig } from "./config";
import { autotraderFetch } from "./client";
import {
	AUTOTRADER_RESPONSE_TTL_MS,
	cacheKey,
	getCachedResponse,
	setCachedResponse,
} from "./responseCache";

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
		const forceRefresh = req.query.refresh === "1";
		const key = cacheKey([
			"stock",
			"list",
			advertiserId,
			String(page),
			String(pageSize),
			lifecycleState ?? "",
		]);

		if (!forceRefresh) {
			const cached = getCachedResponse<{
				results: unknown[];
				totalResults: number;
				page: number;
				pageSize: number;
			}>(key);
			if (cached) return res.json(cached);
		}

		const data = await autotraderFetch<AutotraderStockListResponse>("/stock", {
			advertiserId,
			page,
			pageSize,
			lifecycleState,
		});

		const payload = {
			results: data.results ?? [],
			totalResults: data.totalResults ?? data.results?.length ?? 0,
			page,
			pageSize,
		};
		setCachedResponse(key, payload, AUTOTRADER_RESPONSE_TTL_MS.stockList);
		return res.json(payload);
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
		const forceRefresh = req.query.refresh === "1";
		const key = cacheKey(["stock", "detail", advertiserId, stockId]);

		if (!forceRefresh) {
			const cached = getCachedResponse<{ stock: unknown }>(key);
			if (cached) return res.json(cached);
		}

		const data = await autotraderFetch<AutotraderStockListResponse>("/stock", {
			advertiserId,
			stockId,
		});

		const item = data.results?.[0];
		if (!item) {
			throw new ApiError("not_found", "Auto Trader stock item not found.", 404);
		}

		const payload = { stock: item };
		setCachedResponse(key, payload, AUTOTRADER_RESPONSE_TTL_MS.stockDetail);
		return res.json(payload);
	} catch (e) {
		return next(e);
	}
}
