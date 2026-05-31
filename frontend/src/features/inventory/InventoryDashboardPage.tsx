import { useState } from "react";
import Card from "../../shared/ui/Card";
import AppShell from "../../app/layouts/AppShell";
import { apiFetch } from "../../shared/api/client";
import Button from "../../shared/ui/Button";
import Badge from "../../shared/ui/Badge";
import { Plus, Search } from "lucide-react";
import { useNotify } from "../../shared/ui/ToastProvider";
import { useErrorNotification } from "../../shared/hooks/useErrorNotification";
import Skeleton from "../../shared/ui/Skeleton";
import { useVehicles, type Vehicle } from "./useVehicles";
import { useAuth } from "../../app/providers/AuthProvider";

export default function InventoryDashboardPage() {
	const notify = useNotify();
	const { appUser } = useAuth();
	const {
		vehicles,
		setVehicles,
		nextCursor,
		error,
		loading,
		refreshing,
		loadingMore,
		loadMore,
		reload,
	} = useVehicles();
	const [query, setQuery] = useState("");
	const [adding, setAdding] = useState(false);
	const isGuest = appUser?.role === "guest";

	return (
		<AppShell title="Dashboard">
			<Card title="Vehicles">
				<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="relative w-full max-w-sm">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search make, model, reg…"
							className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900"
						/>
					</div>

					<div className="flex items-center gap-2">
						{refreshing && (
							<span className="text-xs text-slate-500 dark:text-slate-400">
								Refreshing…
							</span>
						)}
						{isGuest && (
							<span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200">
								View only
							</span>
						)}
						<Button
							variant="secondary"
							size="md"
							leftIcon={<Plus className="h-4 w-4" />}
							isLoading={adding}
							loadingText="Adding…"
							disabled={isGuest}
							onClick={async () => {
								setAdding(true);
								try {
									await apiFetch<{ id: string }>("/api/vehicles", {
										method: "POST",
										body: {
											make: "Ford",
											model: "Focus",
											year: 2018,
											mileage_miles: 0,
										},
									});
									notify.success({
										title: "Vehicle added",
										description: "Sample vehicle created.",
									});
									// Refresh first page after adding.
									await reload();
								} catch (e) {
									notify.fromError(e, "Couldn’t add vehicle");
								} finally {
									setAdding(false);
								}
							}}
						>
							Add vehicle
						</Button>
					</div>
				</div>

				{loading && vehicles.length === 0 && (
					<div className="space-y-3">
						<p className="text-sm text-slate-600 dark:text-slate-400">
							Loading vehicles from the database…
						</p>
						<div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
							<div className="space-y-2 p-4">
								<Skeleton className="h-4 w-2/3" />
								<Skeleton className="h-4 w-1/2" />
								<div className="mt-3 grid grid-cols-1 gap-2">
									{Array.from({ length: 6 }).map((_, i) => (
										<div key={i} className="flex items-center gap-3">
											<Skeleton className="h-10 w-10 rounded-xl" />
											<div className="flex-1 space-y-2">
												<Skeleton className="h-4 w-1/2" />
												<Skeleton className="h-3 w-1/3" />
											</div>
											<Skeleton className="h-6 w-20 rounded-full" />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
				{error && (
					<div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
						<p className="font-medium">We can’t load vehicles yet.</p>
						<p className="mt-1 text-sm opacity-90">{error}</p>
						<p className="mt-2 text-xs text-rose-700/80 dark:text-rose-200/80">
							If this is a new project, run the Supabase migrations to create
							<code className="mx-1 rounded bg-rose-100 px-1 dark:bg-rose-900/40">
								public.vehicles
							</code>
							.
						</p>
					</div>
				)}

				{!loading && !error && (
					<div className="overflow-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
						<table className="min-w-full text-sm">
							<thead className="bg-slate-50 text-slate-700 dark:bg-slate-950/30 dark:text-slate-200">
								<tr>
									<th className="px-4 py-3 text-left font-medium">Vehicle</th>
									<th className="px-4 py-3 text-left font-medium">Reg</th>
									<th className="px-4 py-3 text-left font-medium">Year</th>
									<th className="px-4 py-3 text-left font-medium">Miles</th>
									<th className="px-4 py-3 text-left font-medium">Price</th>
									<th className="px-4 py-3 text-left font-medium">Status</th>
								</tr>
							</thead>
							<tbody>
								{vehicles
									.filter((v) => {
										const hay = `${v.make} ${v.model} ${v.registration ?? ""}`.toLowerCase();
										return hay.includes(query.toLowerCase().trim());
									})
									.map((v) => (
										<tr
											key={v.id}
											className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/30"
										>
											<td className="px-4 py-3">
												<div className="font-medium">
													{v.make} {v.model}
													{v.trim ? ` ${v.trim}` : ""}
												</div>
												<div className="text-xs text-slate-500 dark:text-slate-400">
													Stock: {v.stock_code ?? "—"} · VIN:{" "}
													{v.vin ? `${v.vin.slice(0, 6)}…` : "—"}
												</div>
											</td>
											<td className="px-4 py-3">{v.registration ?? "—"}</td>
											<td className="px-4 py-3 tabular-nums">{v.year}</td>
											<td className="px-4 py-3 tabular-nums">
												{v.mileage_miles.toLocaleString()}
											</td>
											<td className="px-4 py-3 tabular-nums">
												{v.price_gbp != null
													? `£${Number(v.price_gbp).toLocaleString()}`
													: "—"}
											</td>
											<td className="px-4 py-3">
												<Badge
													variant={
														v.status === "in_stock"
															? "success"
															: v.status === "reserved"
																? "warning"
																: v.status === "sold"
																	? "info"
																	: "neutral"
													}
												>
													{v.status}
												</Badge>
											</td>
										</tr>
									))}
							</tbody>
						</table>
						{vehicles.length === 0 && (
							<div className="px-4 py-10 text-center text-sm text-slate-600 dark:text-slate-400">
								No vehicles yet. Click <span className="font-medium">Add vehicle</span>.
							</div>
						)}

						{vehicles.length > 0 && (
							<div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
								<p className="text-slate-600 dark:text-slate-400">
									Showing <span className="font-medium text-slate-900 dark:text-slate-100">{vehicles.length}</span>
									{nextCursor ? " vehicles (more available)" : " vehicles"}
								</p>
								{nextCursor && (
									<Button
										variant="secondary"
										size="sm"
										isLoading={loadingMore}
										loadingText="Loading more…"
										onClick={async () => {
											try {
												await loadMore();
											} catch (e) {
												notify.fromError(e, "Couldn’t load more");
											}
										}}
									>
										Load more
									</Button>
								)}
							</div>
						)}
					</div>
				)}
			</Card>
		</AppShell>
	);
}

