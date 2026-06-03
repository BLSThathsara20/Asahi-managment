import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCheck, MessageSquare, RefreshCw } from "lucide-react";
import { useNotificationsOptional } from "../../app/providers/NotificationProvider";
import { cn } from "../lib/cn";
import Button from "./Button";

function formatWhen(iso: string | null) {
	if (!iso) return "";
	try {
		return new Date(iso).toLocaleString("en-GB", {
			dateStyle: "short",
			timeStyle: "short",
		});
	} catch {
		return iso;
	}
}

export default function NotificationBell() {
	const notifications = useNotificationsOptional();
	const [open, setOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onDoc = (e: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [open]);

	if (!notifications) return null;

	const {
		unreadCount,
		items,
		loading,
		error,
		lastCheckedAt,
		refresh,
		dismiss,
		dismissAll,
	} = notifications;

	return (
		<div className="relative" ref={panelRef}>
			<button
				type="button"
				className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
				onClick={() => setOpen((v) => !v)}
				aria-label={
					unreadCount > 0
						? `${unreadCount} unread notifications`
						: "Notifications"
				}
				aria-expanded={open}
			>
				<Bell className="h-4 w-4" />
				{unreadCount > 0 && (
					<span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
						{unreadCount > 99 ? "99+" : unreadCount}
					</span>
				)}
			</button>

			{open && (
				<div
					className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
					role="dialog"
					aria-label="Notifications"
				>
					<div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
						<div>
							<p className="text-sm font-semibold">Notifications</p>
							<p className="text-xs text-slate-500 dark:text-slate-400">
								Auto Trader messages
								{lastCheckedAt && (
									<>
										{" "}
										· checked{" "}
										{formatWhen(lastCheckedAt)}
									</>
								)}
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => void refresh(true)}
							isLoading={loading}
							aria-label="Refresh notifications"
						>
							<RefreshCw className="h-4 w-4" />
						</Button>
					</div>

					{error && (
						<p className="border-b border-rose-100 bg-rose-50 px-4 py-2 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
							{error}
						</p>
					)}

					<div className="max-h-80 overflow-y-auto">
						{items.length === 0 ? (
							<div className="px-4 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
								<MessageSquare className="mx-auto mb-2 h-8 w-8 opacity-40" />
								{unreadCount > 0
									? "Unread messages are hidden — open Messages."
									: "No unread Auto Trader messages."}
							</div>
						) : (
							<ul className="divide-y divide-slate-100 dark:divide-slate-800">
								{items.map((item) => (
									<li key={item.id}>
										<Link
											to={item.href}
											onClick={() => {
												dismiss(item.id);
												setOpen(false);
											}}
											className="block px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/80"
										>
											<p className="text-sm font-medium text-slate-900 dark:text-slate-100">
												{item.title}
											</p>
											<p className="mt-0.5 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
												{item.body}
											</p>
											{item.at && (
												<p className="mt-1 text-[10px] text-slate-500">
													{formatWhen(item.at)}
												</p>
											)}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>

					<div className="flex items-center justify-between gap-2 border-t border-slate-200 px-3 py-2 dark:border-slate-800">
						<Link
							to="/autotrader/messages"
							onClick={() => setOpen(false)}
							className={cn(
								"text-xs font-medium text-sky-700 hover:underline dark:text-sky-400",
							)}
						>
							View all messages
						</Link>
						{items.length > 0 && (
							<button
								type="button"
								className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
								onClick={() => dismissAll()}
							>
								<CheckCheck className="h-3.5 w-3.5" />
								Clear list
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
