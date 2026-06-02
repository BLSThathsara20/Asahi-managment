import { getAutotraderConfig } from "./config";
import { autotraderFetch } from "./client";

export type DealRecord = {
	dealId?: string;
	advertiserId?: string;
	created?: string;
	lastUpdated?: string;
	advertiserDealStatus?: string;
	consumer?: {
		firstName?: string | null;
		lastName?: string | null;
		email?: string | null;
		phone?: string | null;
	};
	stock?: { stockId?: string | null; searchId?: string | null };
	messages?: { id?: string | null; lastUpdated?: string | null };
};

function normalizeDeal(raw: unknown): DealRecord | null {
	if (!raw || typeof raw !== "object") return null;
	const o = raw as Record<string, unknown>;
	if (typeof o.dealId === "string") return o as DealRecord;
	const results = o.results;
	if (Array.isArray(results) && results[0] && typeof results[0] === "object") {
		return results[0] as DealRecord;
	}
	return o as DealRecord;
}

/** GET /deals/{dealId}?advertiserId=… */
export async function getDealById(dealId: string): Promise<DealRecord> {
	const { advertiserId } = getAutotraderConfig();
	const raw = await autotraderFetch<unknown>(
		`/deals/${encodeURIComponent(dealId)}`,
		{ advertiserId },
	);
	const deal = normalizeDeal(raw);
	if (!deal?.dealId && !deal?.messages?.id) {
		return { ...deal, dealId: deal?.dealId ?? dealId };
	}
	return deal ?? { dealId };
}
