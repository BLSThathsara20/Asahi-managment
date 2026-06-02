import { Link } from "react-router-dom";
import { ExternalLink, RefreshCw, Search } from "lucide-react";
import AppShell from "../../app/layouts/AppShell";
import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import Button from "../../shared/ui/Button";
import Skeleton from "../../shared/ui/Skeleton";
import { useErrorNotification } from "../../shared/hooks/useErrorNotification";
import { useAutotraderStockList } from "./useAutotraderStockList";
import {
	stockListPrice,
	stockTitle,
	type AutotraderStockItem,
} from "./types";

function StockRow({ item }: { item: AutotraderStockItem }) {
	const stockId = item.metadata?.stockId;
	const price = stockListPrice(item);
	const reg = item.vehicle?.registration ?? "—";
	const miles = item.vehicle?.odometerReadingMiles;

	if (!stockId) return null;

	return (
		<Link
			to={`/autotrader/${stockId}`}
			className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:bg-sky-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700 dark:hover:bg-sky-950/30 sm:flex-row sm:items-center sm:justify-between"
		>
			<div>
				<p className="font-medium text-slate-900 dark:text-slate-100">
					{stockTitle(item)}
				</p>
				<p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
					{reg}
					{miles != null ? ` · ${miles.toLocaleString()} mi` : ""}
					{item.vehicle?.yearOfManufacture
						? ` · ${item.vehicle.yearOfManufacture}`
						: ""}
				</p>
				{item.vehicle?.derivative && (
					<p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-500">
						{item.vehicle.derivative}
					</p>
				)}
			</div>
			<div className="flex shrink-0 flex-wrap items-center gap-2">
				{item.metadata?.lifecycleState && (
					<Badge variant="neutral">{item.metadata.lifecycleState}</Badge>
				)}
				<span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
					{price != null ? `£${price.toLocaleString()}` : "POA"}
				</span>
				<ExternalLink className="h-4 w-4 text-slate-400" />
			</div>
		</Link>
	);
}

export default function AutotraderStockListPage() {
	const {
		items,
		totalResults,
		page,
		totalPages,
		loading,
		refreshing,
		error,
		reload,
		goToPage,
	} = useAutotraderStockList();

	useErrorNotification(error, "Couldn’t load Auto Trader stock");

	return (
		<AppShell title="Auto Trader stock">
			<Card title="Forecourt listings (sandbox)">
				<p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
					Live stock from your Auto Trader advertiser account. Select a vehicle
					to view full details.
				</p>

				<div className="mb-4 flex flex-wrap items-center gap-2">
					<Button
						variant="secondary"
						size="sm"
						leftIcon={<RefreshCw className="h-4 w-4" />}
						isLoading={loading || refreshing}
						onClick={() => void reload(true)}
					>
						Refresh
					</Button>
					{refreshing && !loading && (
						<span className="text-xs text-slate-500 dark:text-slate-400">
							Updating…
						</span>
					)}
					{!loading && (
						<span className="text-sm text-slate-600 dark:text-slate-400">
							{totalResults} vehicle{totalResults === 1 ? "" : "s"}
						</span>
					)}
				</div>

				{loading && items.length === 0 && (
					<div className="space-y-3">
						{Array.from({ length: 5 }).map((_, i) => (
							<Skeleton key={i} className="h-20 w-full rounded-xl" />
						))}
					</div>
				)}

				{error && (
					<div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
						<p className="font-medium">Could not load Auto Trader stock</p>
						<p className="mt-1 opacity-90">{error}</p>
						<p className="mt-2 text-xs opacity-80">
							Check backend/.env: AUTOTRADER_KEY, AUTOTRADER_SECRET,
							AUTOTRADER_ADVERTISER_ID (sandbox credentials).
						</p>
					</div>
				)}

				{!loading && !error && items.length === 0 && (
					<div className="flex flex-col items-center gap-2 py-12 text-center text-sm text-slate-600 dark:text-slate-400">
						<Search className="h-8 w-8 opacity-40" />
						<p>No stock returned for your advertiser ID.</p>
					</div>
				)}

				{!error && items.length > 0 && (
					<div className="space-y-3">
						{items.map((item) => (
							<StockRow
								key={item.metadata?.stockId ?? Math.random()}
								item={item}
							/>
						))}
					</div>
				)}

				{totalPages > 1 && (
					<div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
						<Button
							variant="secondary"
							size="sm"
							disabled={page <= 1 || loading}
							onClick={() => goToPage(page - 1)}
						>
							Previous
						</Button>
						<span className="text-sm text-slate-600 dark:text-slate-400">
							Page {page} of {totalPages}
						</span>
						<Button
							variant="secondary"
							size="sm"
							disabled={page >= totalPages || loading}
							onClick={() => goToPage(page + 1)}
						>
							Next
						</Button>
					</div>
				)}
			</Card>
		</AppShell>
	);
}
