import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppShell from "../../app/layouts/AppShell";
import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import Button from "../../shared/ui/Button";
import Skeleton from "../../shared/ui/Skeleton";
import { useErrorNotification } from "../../shared/hooks/useErrorNotification";
import { useNotify } from "../../shared/ui/ToastProvider";
import { useAutotraderMessageDetail } from "./useAutotraderMessageDetail";
import type { AutotraderMessageLine } from "./messageTypes";

const MAX_CHARS = 1500;

function formatWhen(iso: string | undefined) {
	if (!iso) return "";
	try {
		return new Date(iso).toLocaleString("en-GB", {
			dateStyle: "medium",
			timeStyle: "short",
		});
	} catch {
		return iso;
	}
}

function MessageBubble({ line }: { line: AutotraderMessageLine }) {
	const fromConsumer = line.from === "Consumer";
	return (
		<div
			className={
				fromConsumer
					? "mr-8 rounded-xl rounded-tl-sm border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
					: "ml-8 rounded-xl rounded-tr-sm border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/50"
			}
		>
			<div className="mb-1 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
				<span className="font-medium">{line.from ?? "Unknown"}</span>
				<span>{formatWhen(line.at)}</span>
			</div>
			<p className="whitespace-pre-wrap text-sm text-slate-900 dark:text-slate-100">
				{line.message}
			</p>
		</div>
	);
}

export default function AutotraderMessagesDetailPage() {
	const { messagesId } = useParams<{ messagesId: string }>();
	const { thread, loading, error, saving, markRead, sendReply } =
		useAutotraderMessageDetail(messagesId);
	const notify = useNotify();
	const [reply, setReply] = useState("");

	useErrorNotification(error, "Message thread error");

	const unread = thread?.advertiserLastReadStatus === "Unread";

	async function handleMarkRead() {
		try {
			await markRead();
			notify.success({ title: "Marked as read" });
		} catch (e) {
			notify.fromError(e, "Couldn’t mark as read");
		}
	}

	async function handleSend(e: React.FormEvent) {
		e.preventDefault();
		const text = reply.trim();
		if (!text) return;
		try {
			await sendReply(text);
			setReply("");
			notify.success({ title: "Reply sent" });
		} catch (e) {
			notify.fromError(e, "Couldn’t send reply");
		}
	}

	return (
		<AppShell title="Message thread">
			<div className="mb-4">
				<Link to="/autotrader/messages">
					<Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
						Back to all messages
					</Button>
				</Link>
			</div>

			{loading && (
				<div className="space-y-3">
					<Skeleton className="h-8 w-1/3" />
					<Skeleton className="h-32 w-full rounded-xl" />
				</div>
			)}

			{error && (
				<div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
					<p className="font-medium">Could not complete request</p>
					<p className="mt-1 opacity-90">{error}</p>
					<p className="mt-2 text-xs opacity-80">
						Marking read and sending replies need Auto Trader{" "}
						<strong>Message Updates</strong> on your API key (separate from Deal
						Sync for viewing).
					</p>
				</div>
			)}

			{!loading && !error && thread && (
				<div className="space-y-6">
					<Card title="Thread info">
						<div className="flex flex-wrap items-center gap-2">
							{thread.advertiserLastReadStatus && (
								<Badge
									variant={
										thread.advertiserLastReadStatus === "Unread"
											? "warning"
											: "neutral"
									}
								>
									Advertiser: {thread.advertiserLastReadStatus}
								</Badge>
							)}
							{thread.consumerLastReadStatus && (
								<Badge variant="neutral">
									Consumer: {thread.consumerLastReadStatus}
								</Badge>
							)}
							{unread && (
								<Button
									variant="secondary"
									size="sm"
									isLoading={saving}
									onClick={() => void handleMarkRead()}
								>
									Mark as read
								</Button>
							)}
						</div>
						<p className="mt-3 font-mono text-xs text-slate-500 dark:text-slate-400">
							Messages ID: {thread.messagesId}
						</p>
					</Card>

					<Card title={`Conversation (${thread.messages.length})`}>
						<div className="space-y-3">
							{thread.messages.map((line, i) => (
								<MessageBubble key={`${line.at}-${line.from}-${i}`} line={line} />
							))}
						</div>
					</Card>

					<Card title="Reply">
						<form onSubmit={(e) => void handleSend(e)} className="space-y-3">
							<textarea
								value={reply}
								onChange={(e) => setReply(e.target.value.slice(0, MAX_CHARS))}
								rows={4}
								maxLength={MAX_CHARS}
								placeholder="Type your reply (max 1500 characters)…"
								className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
							/>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<span className="text-xs text-slate-500">
									{reply.length}/{MAX_CHARS}
								</span>
								<Button
									type="submit"
									isLoading={saving}
									disabled={!reply.trim()}
								>
									Send reply
								</Button>
							</div>
						</form>
					</Card>
				</div>
			)}
		</AppShell>
	);
}
