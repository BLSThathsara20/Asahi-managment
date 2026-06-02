import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, RefreshCw, Search } from "lucide-react";
import AppShell from "../../app/layouts/AppShell";
import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import Button from "../../shared/ui/Button";
import Skeleton from "../../shared/ui/Skeleton";
import { apiFetch } from "../../shared/api/client";
import { useErrorNotification } from "../../shared/hooks/useErrorNotification";
import { useNotify } from "../../shared/ui/ToastProvider";
import { getErrorMessage } from "../../shared/api/errors";
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
	const dealQ = thread.dealId
		? `?dealId=${encodeURIComponent(thread.dealId)}`
		: "";

	return (
		<Link
			to={`/autotrader/messages/${encodeURIComponent(thread.messagesId)}${dealQ}`}
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
	const navigate = useNavigate();
	const notify = useNotify();
	const [dealIdInput, setDealIdInput] = useState("");
	const [messageIdInput, setMessageIdInput] = useState("");
	const [lookupLoading, setLookupLoading] = useState(false);
	const [lookupNote, setLookupNote] = useState<string | null>(null);

	const {
		threads,
		totalDeals,
		dealsScanned,
		threadsWithMessages,
		connectStatus,
		loading,
		refreshing,
		error,
		reload,
	} = useAutotraderMessages();

	useErrorNotification(error, "Couldn’t load messages");

	async function runLookup(openThread: boolean) {
		const dealId = dealIdInput.trim();
		const messageId = messageIdInput.trim();
		if (!dealId && !messageId) {
			notify.error({
				title: "Enter IDs",
				description: "Paste a deal ID and/or message component ID from Auto Trader.",
			});
			return;
		}

		setLookupLoading(true);
		setLookupNote(null);
		try {
			const qs = new URLSearchParams();
			if (dealId) qs.set("dealId", dealId);
			if (messageId) qs.set("messageId", messageId);
			const res = await apiFetch<{
				probe: {
					deal?: { dealId?: string; messages?: { id?: string } };
					messages?: { messages?: unknown[]; pagesLoaded?: number };
					messagesComponentId?: string;
					dealError?: string;
					messagesError?: string;
					endpoints?: Record<string, string>;
				};
			}>(`/api/autotrader/messages/lookup?${qs}`);

			const p = res.probe;
			if (p.dealError) setLookupNote(`Deal: ${p.dealError}`);
			else if (p.messagesError) setLookupNote(`Messages: ${p.messagesError}`);
			else if (p.messages?.messages?.length) {
				const count = p.messages.messages.length;
				const pages = p.messages.pagesLoaded ?? 1;
				setLookupNote(`Found ${count} message(s) across ${pages} page(s).`);
			} else if (p.deal) {
				setLookupNote(
					`Deal loaded. Messages component: ${p.deal.messages?.id ?? "—"}`,
				);
			}

			const componentId =
				p.messagesComponentId ?? p.deal?.messages?.id ?? messageId;
			const resolvedDealId = p.deal?.dealId ?? dealId;
			if (openThread && componentId) {
				const dealQ = resolvedDealId
					? `?dealId=${encodeURIComponent(resolvedDealId)}`
					: "";
				navigate(`/autotrader/messages/${encodeURIComponent(componentId)}${dealQ}`);
			} else if (openThread) {
				notify.error({
					title: "No thread to open",
					description: p.dealError ?? p.messagesError ?? "ID not found in Connect API.",
				});
			}
		} catch (e) {
			notify.fromError(e, "Lookup failed");
			setLookupNote(getErrorMessage(e));
		} finally {
			setLookupLoading(false);
		}
	}

	const showLivePortalWarning =
		connectStatus &&
		connectStatus.dealsInConnectApi === 0 &&
		connectStatus.environment === "sandbox";

	return (
		<AppShell title="Auto Trader messages">
			{showLivePortalWarning && !loading && (
				<div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
					<p className="font-semibold">New portal messages will not show here yet</p>
					<p className="mt-2 leading-relaxed">
						Connect API reports <strong>0 deals</strong> on{" "}
						<strong>{connectStatus.environment}</strong> (advertiser{" "}
						{connectStatus.advertiserId}). Messages you see on{" "}
						<strong>portal.autotrader.co.uk</strong> are on live Auto Trader; your
						app is calling the sandbox API. Use production keys +{" "}
						<code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
							AUTOTRADER_ENV=production
						</code>
						, or load a thread by deal ID below after Auto Trader enables Deal Sync.
					</p>
				</div>
			)}

			<Card title="Load by deal or message ID">
				<p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
					Uses{" "}
					<code className="text-xs">GET /deals/:dealId</code> then{" "}
					<code className="text-xs">GET /messages/:messageId?page=1…</code> for
					full history.{" "}
					<code className="text-xs">GET /messages?advertiserId=</code> returns
					405 — there is no inbox list at that URL.
				</p>
				<div className="grid gap-3 sm:grid-cols-2">
					<input
						value={dealIdInput}
						onChange={(e) => setDealIdInput(e.target.value)}
						placeholder="Deal ID (from portal / deal URL)"
						className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
					/>
					<input
						value={messageIdInput}
						onChange={(e) => setMessageIdInput(e.target.value)}
						placeholder="Message component ID (optional)"
						className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
					/>
				</div>
				<div className="mt-3 flex flex-wrap gap-2">
					<Button
						variant="secondary"
						size="sm"
						leftIcon={<Search className="h-4 w-4" />}
						isLoading={lookupLoading}
						onClick={() => void runLookup(false)}
					>
						Test API
					</Button>
					<Button
						size="sm"
						isLoading={lookupLoading}
						onClick={() => void runLookup(true)}
					>
						Load & open thread
					</Button>
				</div>
				{lookupNote && (
					<p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{lookupNote}</p>
				)}
			</Card>

			<Card title="All deal messages" className="mt-6">
				<p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
					Lists threads from <code className="text-xs">GET /deals</code> then each{" "}
					<code className="text-xs">GET /messages/:id</code> (all pages). Scanned{" "}
					{dealsScanned} deals ({totalDeals} in API).
				</p>

				<div className="mb-4 flex flex-wrap items-center gap-2">
					<Button
						variant="secondary"
						size="sm"
						leftIcon={<RefreshCw className="h-4 w-4" />}
						isLoading={loading || refreshing}
						onClick={() => void reload(true)}
					>
						Refresh all deals
					</Button>
					{refreshing && !loading && (
						<span className="text-xs text-slate-500 dark:text-slate-400">
							Updating…
						</span>
					)}
					{!loading && !refreshing && (
						<span className="text-sm text-slate-600 dark:text-slate-400">
							{threadsWithMessages} thread
							{threadsWithMessages === 1 ? "" : "s"}
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
					<div className="flex flex-col items-center gap-3 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
						<MessageSquare className="h-8 w-8 opacity-40" />
						<p>
							No threads from <code className="text-xs">GET /deals</code> ({" "}
							{totalDeals} deals). Use the form above with IDs from the Auto Trader
							portal.
						</p>
						{connectStatus && (
							<ul className="max-w-lg list-inside list-disc text-left text-xs">
								<li>
									{connectStatus.environment} · Deals in API:{" "}
									{connectStatus.dealsInConnectApi} · Message Updates:{" "}
									{connectStatus.messageUpdatesEligible ? "on" : "off"}
								</li>
							</ul>
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
