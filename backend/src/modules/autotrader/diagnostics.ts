import { getAutotraderConfig } from "./config";
import { autotraderFetch } from "./client";

type Capability = { name?: string; eligible?: boolean };

type AdvertiserRow = {
	advertiserId?: string;
	name?: string;
	capabilities?: { atConnect?: Capability[] };
};

type AdvertisersResponse = {
	results?: AdvertiserRow[];
};

type StockListResponse = {
	totalResults?: number;
};

export type AutotraderConnectStatus = {
	environment: "sandbox" | "production";
	advertiserId: string;
	advertiserName: string | null;
	stockInConnectApi: number;
	dealSyncEligible: boolean;
	dealUpdatesEligible: boolean;
	messageUpdatesEligible: boolean;
	dealsInConnectApi: number;
	leadsApiAccessible: boolean;
	/** App does not hide read or replied threads — only Connect API data is shown. */
	includesReadAndReplied: true;
	whyEmpty: string | null;
};

function capabilityEligible(
	capabilities: Capability[] | undefined,
	name: string,
): boolean {
	return (
		capabilities?.find((c) => c.name === name)?.eligible === true
	);
}

let capabilitiesCache: {
	at: number;
	dealSyncEligible: boolean;
	dealUpdatesEligible: boolean;
	messageUpdatesEligible: boolean;
	advertiserName: string | null;
} | null = null;

const CAPABILITIES_CACHE_MS = 5 * 60 * 1000;

export async function getAdvertiserCapabilities() {
	if (
		capabilitiesCache &&
		Date.now() - capabilitiesCache.at < CAPABILITIES_CACHE_MS
	) {
		return capabilitiesCache;
	}

	const { advertiserId } = getAutotraderConfig();
	const advertisers = await autotraderFetch<AdvertisersResponse>(
		"/advertisers",
		{ page: 1, pageSize: 5 },
	);
	const row =
		advertisers.results?.find((a) => a.advertiserId === advertiserId) ??
		advertisers.results?.[0];
	const atConnect = row?.capabilities?.atConnect;

	capabilitiesCache = {
		at: Date.now(),
		dealSyncEligible: capabilityEligible(atConnect, "Deal Sync"),
		dealUpdatesEligible: capabilityEligible(atConnect, "Deal Updates"),
		messageUpdatesEligible: capabilityEligible(atConnect, "Message Updates"),
		advertiserName: row?.name ?? null,
	};
	return capabilitiesCache;
}

async function probeLeadsApi(): Promise<boolean> {
	try {
		await autotraderFetch("/service/leads-v1/leads/summary", {
			page: 1,
			pageSize: 1,
		});
		return true;
	} catch {
		return false;
	}
}

export async function getAutotraderConnectStatus(
	dealsInConnectApi: number,
): Promise<AutotraderConnectStatus> {
	const { env, advertiserId } = getAutotraderConfig();

	const [caps, stock, leadsApiAccessible] = await Promise.all([
		getAdvertiserCapabilities(),
		autotraderFetch<StockListResponse>("/stock", {
			advertiserId,
			page: 1,
			pageSize: 1,
		}),
		probeLeadsApi(),
	]);

	const dealSyncEligible = caps.dealSyncEligible;
	const dealUpdatesEligible = caps.dealUpdatesEligible;
	const messageUpdatesEligible = caps.messageUpdatesEligible;

	let whyEmpty: string | null = null;
	if (dealsInConnectApi === 0) {
		const parts: string[] = [
			"Asahi uses the [NEW] Capabilities Messages API (GET/PATCH /messages/{messagesComponentId}, POST /messages/ with text) — not the deprecated Leads inbox API.",
			"To list threads we need deals from GET /deals; your Connect API currently returns 0 deals, so new messages on the portal will not appear here until deals sync into Connect.",
		];
		if (env === "sandbox") {
			parts.push(
				"You are on AUTOTRADER_ENV=sandbox. Live portal messages (portal.autotrader.co.uk) usually require production API keys — sandbox and live are separate.",
			);
		}
		if (!dealUpdatesEligible || !messageUpdatesEligible) {
			parts.push(
				`Your sandbox advertiser has Deal Updates: ${dealUpdatesEligible ? "yes" : "no"}, Message Updates: ${messageUpdatesEligible ? "yes" : "no"}. Ask Auto Trader (partner.support@autotrader.co.uk) to enable these for Connect if portal inbox messages should sync.`,
			);
		}
		if (!leadsApiAccessible) {
			parts.push(
				"The older Leads inbox API is not available on this API key (stock-only integration). Portal messages may live there until deals sync via Connect.",
			);
		}
		if (dealSyncEligible) {
			parts.push(
				"Deal Sync is enabled — new or existing portal deals may take time to appear in Connect, or may only exist in production while this key uses sandbox.",
			);
		}
		whyEmpty = parts.join(" ");
	}

	return {
		environment: env,
		advertiserId,
		advertiserName: caps.advertiserName,
		stockInConnectApi: stock.totalResults ?? 0,
		dealSyncEligible,
		dealUpdatesEligible,
		messageUpdatesEligible,
		dealsInConnectApi,
		leadsApiAccessible,
		includesReadAndReplied: true,
		whyEmpty,
	};
}
