import { createContext, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";
import { createNotifyApi, type NotifyApi } from "../lib/notifications";

type ToastKind = "success" | "error" | "info";

type Toast = {
	id: string;
	kind: ToastKind;
	title: string;
	description?: string;
};

type ToastContextValue = {
	push: (t: Omit<Toast, "id">) => void;
	notify: NotifyApi;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function uid() {
	return Math.random().toString(16).slice(2);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const push = (t: Omit<Toast, "id">) => {
		const toast: Toast = { id: uid(), ...t };
		setToasts((prev) => [toast, ...prev].slice(0, 5));
		window.setTimeout(() => {
			setToasts((prev) => prev.filter((x) => x.id !== toast.id));
		}, 4500);
	};

	const notify = useMemo(() => createNotifyApi(push), []);

	const value = useMemo(() => ({ push, notify }), [notify]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div
				className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2"
				aria-live="polite"
				aria-relevant="additions"
			>
				{toasts.map((t) => (
					<div
						key={t.id}
						role="status"
						className={`pointer-events-auto rounded-2xl border bg-white p-4 text-slate-900 shadow-lg dark:bg-slate-900 dark:text-slate-100 ${
							t.kind === "error"
								? "border-rose-200 dark:border-rose-900"
								: t.kind === "success"
									? "border-emerald-200 dark:border-emerald-900"
									: "border-slate-200 dark:border-slate-800"
						}`}
					>
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-sm font-semibold">{t.title}</p>
								{t.description && (
									<p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
										{t.description}
									</p>
								)}
							</div>
							<button
								type="button"
								className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
								onClick={() =>
									setToasts((prev) => prev.filter((x) => x.id !== t.id))
								}
								aria-label="Dismiss notification"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}

/** Shorthand for toast notifications (success / error / info / fromError). */
export function useNotify() {
	return useToast().notify;
}
