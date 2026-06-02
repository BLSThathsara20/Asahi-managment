export type AutotraderMessageLine = {
	from?: string;
	at?: string;
	message?: string;
};

export type AutotraderMessageThreadSummary = {
	messagesId: string;
	dealId: string;
	consumerName: string | null;
	consumerEmail: string | null;
	advertiserDealStatus: string | null;
	stockId: string | null;
	consumerLastReadStatus: string | null;
	advertiserLastReadStatus: string | null;
	messageCount: number;
	lastMessage: AutotraderMessageLine | null;
	lastActivityAt: string | null;
	messages: AutotraderMessageLine[];
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
	includesReadAndReplied: true;
	whyEmpty: string | null;
};

export type AutotraderMessagesListResponse = {
	threads: AutotraderMessageThreadSummary[];
	totalDeals: number;
	dealsScanned: number;
	pagesFetched: number;
	threadsWithMessages: number;
	connectStatus?: AutotraderConnectStatus;
};

export type AutotraderMessageThreadDetail = {
	messagesId: string;
	dealId: string;
	consumerName?: string | null;
	consumerEmail?: string | null;
	consumerLastRead: string | null;
	consumerLastReadStatus: string | null;
	advertiserLastRead: string | null;
	advertiserLastReadStatus: string | null;
	messages: AutotraderMessageLine[];
	pagesLoaded?: number;
};
