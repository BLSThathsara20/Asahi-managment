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

	const [advertisers, stock, leadsApiAccessible] = await Promise.all([
		autotraderFetch<AdvertisersResponse>("/advertisers", { page: 1, pageSize: 5 }),
		autotraderFetch<StockListResponse>("/stock", {
			advertiserId,
			page: 1,
			pageSize: 1,
		}),
		probeLeadsApi(),
	]);

	const row =
		advertisers.results?.find((a) => a.advertiserId === advertiserId) ??
		advertisers.results?.[0];
	const atConnect = row?.capabilities?.atConnect;

	const dealSyncEligible = capabilityEligible(atConnect, "Deal Sync");
	const dealUpdatesEligible = capabilityEligible(atConnect, "Deal Updates");
	const messageUpdatesEligible = capabilityEligible(
		atConnect,
		"Message Updates",
	);

	let whyEmpty: string | null = null;
	if (dealsInConnectApi === 0) {
		const parts: string[] = [
			"Per Auto Trader docs: list threads via Deals API (messagesId on each deal), then GET /messages/{messagesId} — Deal Sync capability. Read and replied messages are included.",
			"The Connect API currently returns 0 deals, so there is nothing to fetch — portal inbox may not be synced yet.",
		];
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
		advertiserName: row?.name ?? null,
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
