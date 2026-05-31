import { Link } from "react-router-dom";
import { MessageSquare, RefreshCw } from "lucide-react";
import AppShell from "../../app/layouts/AppShell";
import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import Button from "../../shared/ui/Button";
import Skeleton from "../../shared/ui/Skeleton";
import { useErrorNotification } from "../../shared/hooks/useErrorNotification";
import { useAutotraderMessages } from "./useAutotraderMessages";
import type { AutotraderMessageThreadSummary } from "./messageTypes";

function formatWhen(iso: string | undefined) {
	if (!iso) return "—";
	try {
		return new Date(iso).toLocaleString("en-GB", {
			dateStyle: "medium",
			timeStyle: "short",
		});
	} catch {
		return iso;
	}
}

function ThreadRow({ thread }: { thread: AutotraderMessageThreadSummary }) {
	const unread = thread.advertiserLastReadStatus === "Unread";
	const read = thread.advertiserLastReadStatus === "Read";
	const preview = thread.lastMessage?.message ?? "Open to view conversation";
	const when = thread.lastMessage?.at ?? thread.lastActivityAt;

	return (
		<Link
			to={`/autotrader/messages/${thread.messagesId}`}
			className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:bg-sky-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700 dark:hover:bg-sky-950/30"
		>
			<div className="flex flex-wrap items-start justify-between gap-2">
				<div>
					<p className="font-medium text-slate-900 dark:text-slate-100">
						{thread.consumerName ?? "Unknown customer"}
					</p>
					<p className="text-sm text-slate-600 dark:text-slate-400">
						{thread.consumerEmail ?? "No email"}
					</p>
				</div>
				<div className="flex flex-wrap gap-2">
					{unread && <Badge variant="warning">Unread</Badge>}
					{read && <Badge variant="neutral">Read</Badge>}
					<Badge variant="neutral">{thread.messageCount} messages</Badge>
					{thread.advertiserDealStatus && (
						<Badge variant="info">{thread.advertiserDealStatus}</Badge>
					)}
				</div>
			</div>
			<p className="mt-3 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">
				<span className="font-medium text-slate-500 dark:text-slate-400">
					{thread.lastMessage?.from ?? "—"}:
				</span>{" "}
				{preview}
			</p>
			<p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
				Latest: {formatWhen(when)}
				{thread.dealId ? ` · Deal ${thread.dealId.slice(0, 8)}…` : ""}
			</p>
		</Link>
	);
}

export default function AutotraderMessagesListPage() {
	const {
		threads,
		totalDeals,
		dealsScanned,
		pagesFetched,
		threadsWithMessages,
		connectStatus,
		loading,
		error,
		reload,
	} = useAutotraderMessages();

	useErrorNotification(error, "Couldn’t load messages");

	return (
		<AppShell title="Auto Trader messages">
			<Card title="All deal messages">
				<p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
					Per Auto Trader Messages API: we load deals, then fetch each thread by
					messagesId (read, unread, and your replies). Newest first. Scanned{" "}
					{dealsScanned} deals ({totalDeals} in Connect API).
				</p>

				<div className="mb-4 flex flex-wrap items-center gap-2">
					<Button
						variant="secondary"
						size="sm"
						leftIcon={<RefreshCw className="h-4 w-4" />}
						isLoading={loading}
						onClick={() => reload()}
					>
						Refresh
					</Button>
					{!loading && (
						<span className="text-sm text-slate-600 dark:text-slate-400">
							{threadsWithMessages} thread
							{threadsWithMessages === 1 ? "" : "s"} with messages
						</span>
					)}
				</div>

				{loading && threads.length === 0 && (
					<div className="space-y-3">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-24 w-full rounded-xl" />
						))}
					</div>
				)}

				{error && (
					<div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
						<p className="font-medium">Could not load messages</p>
						<p className="mt-1 opacity-90">{error}</p>
					</div>
				)}

				{!loading && !error && threads.length === 0 && (
					<div className="flex flex-col items-center gap-3 py-12 text-center text-sm text-slate-600 dark:text-slate-400">
						<MessageSquare className="h-8 w-8 opacity-40" />
						{totalDeals === 0 ? (
							<>
								<p className="font-medium text-slate-800 dark:text-slate-200">
									No messages in Connect API yet (portal inbox may still have
									them)
								</p>
								{connectStatus && (
									<ul className="max-w-lg list-inside list-disc text-left text-xs">
										<li>
											Environment: {connectStatus.environment} · Advertiser{" "}
											{connectStatus.advertiserId}
											{connectStatus.advertiserName
												? ` (${connectStatus.advertiserName})`
												: ""}
										</li>
										<li>
											Stock in API: {connectStatus.stockInConnectApi} · Deals in
											API: {connectStatus.dealsInConnectApi}
										</li>
										<li>
											Deal Sync:{" "}
											{connectStatus.dealSyncEligible ? "yes" : "no"} · Deal
											Updates:{" "}
											{connectStatus.dealUpdatesEligible ? "yes" : "no"} ·
											Message Updates:{" "}
											{connectStatus.messageUpdatesEligible ? "yes" : "no"}
										</li>
										<li>
											Legacy Leads inbox API:{" "}
											{connectStatus.leadsApiAccessible
												? "available"
												: "not on this API key"}
										</li>
									</ul>
								)}
								{connectStatus?.whyEmpty && (
									<p className="max-w-xl text-left text-xs leading-relaxed">
										{connectStatus.whyEmpty}
									</p>
								)}
							</>
						) : (
							<>
								<p>No message threads found across {dealsScanned} deals.</p>
								<p className="text-xs">
									Deals exist in Connect but none returned message history yet.
								</p>
							</>
						)}
					</div>
				)}

				{!error && threads.length > 0 && (
					<div className="space-y-3">
						{threads.map((t) => (
							<ThreadRow key={t.messagesId} thread={t} />
						))}
					</div>
				)}

			</Card>
		</AppShell>
	);
}
