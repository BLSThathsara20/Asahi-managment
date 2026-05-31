import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppShell from "../../app/layouts/AppShell";
import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import Button from "../../shared/ui/Button";
import Skeleton from "../../shared/ui/Skeleton";
import { useErrorNotification } from "../../shared/hooks/useErrorNotification";
import { useAutotraderStockDetail } from "./useAutotraderStockDetail";
import { stockListPrice, stockTitle } from "./types";

function DetailRow({
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
}) {
	if (value == null || value === "") return null;
	return (
		<div className="flex flex-col gap-0.5 border-b border-slate-100 py-3 last:border-0 dark:border-slate-800 sm:flex-row sm:justify-between">
			<dt className="text-sm text-slate-500 dark:text-slate-400">{label}</dt>
			<dd className="text-sm font-medium text-slate-900 dark:text-slate-100">
				{value}
			</dd>
		</div>
	);
}

export default function AutotraderStockDetailPage() {
	const { stockId } = useParams<{ stockId: string }>();
	const { stock, loading, error } = useAutotraderStockDetail(stockId);

	useErrorNotification(error, "Couldn’t load vehicle");

	const v = stock?.vehicle;
	const m = stock?.metadata;
	const price = stock ? stockListPrice(stock) : null;
	const images = stock?.media?.images ?? [];

	return (
		<AppShell title={stock ? stockTitle(stock) : "Auto Trader vehicle"}>
			<div className="mb-4">
				<Link to="/autotrader">
					<Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
						Back to Auto Trader stock
					</Button>
				</Link>
			</div>

			{loading && (
				<div className="space-y-4">
					<Skeleton className="h-8 w-1/2" />
					<Skeleton className="h-40 w-full rounded-xl" />
					<Skeleton className="h-64 w-full rounded-xl" />
				</div>
			)}

			{error && (
				<div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
					<p className="font-medium">Could not load this vehicle</p>
					<p className="mt-1 opacity-90">{error}</p>
				</div>
			)}

			{!loading && !error && stock && (
				<div className="space-y-6">
					<div className="flex flex-wrap items-start justify-between gap-3">
						<div>
							<h2 className="text-2xl font-semibold">{stockTitle(stock)}</h2>
							<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
								Stock ID: <span className="font-mono text-xs">{m?.stockId}</span>
								{m?.searchId ? ` · Search ${m.searchId}` : ""}
							</p>
						</div>
						<div className="flex flex-wrap gap-2">
							{m?.lifecycleState && (
								<Badge variant="info">{m.lifecycleState}</Badge>
							)}
							<span className="rounded-xl bg-sky-50 px-3 py-1 text-lg font-semibold text-sky-900 dark:bg-sky-950 dark:text-sky-100">
								{price != null ? `£${price.toLocaleString()}` : "POA"}
							</span>
						</div>
					</div>

					{images.length > 0 && (
						<Card title="Images">
							<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
								{images.slice(0, 8).map((img, i) =>
									img.href ? (
										<a
											key={img.imageId ?? i}
											href={img.href}
											target="_blank"
											rel="noreferrer"
											className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800"
										>
											<img
												src={img.href}
												alt=""
												className="aspect-[4/3] w-full object-cover"
											/>
										</a>
									) : null,
								)}
							</div>
						</Card>
					)}

					<Card title="Vehicle">
						<dl>
							<DetailRow label="Registration" value={v?.registration} />
							<DetailRow label="VIN" value={v?.vin} />
							<DetailRow label="Make / model" value={[v?.make, v?.model].filter(Boolean).join(" ")} />
							<DetailRow label="Derivative" value={v?.derivative} />
							<DetailRow label="Year" value={v?.yearOfManufacture} />
							<DetailRow label="Mileage" value={v?.odometerReadingMiles != null ? `${v.odometerReadingMiles.toLocaleString()} miles` : null} />
							<DetailRow label="Colour" value={v?.colour} />
							<DetailRow label="Fuel" value={v?.fuelType} />
							<DetailRow label="Transmission" value={v?.transmissionType} />
							<DetailRow label="Body" value={v?.bodyType} />
							<DetailRow label="Condition" value={v?.ownershipCondition} />
						</dl>
					</Card>

					<Card title="Listing & adverts">
						<dl>
							<DetailRow label="Last updated" value={m?.lastUpdated} />
							<DetailRow label="On forecourt" value={m?.dateOnForecourt} />
							<DetailRow
								label="Auto Trader advert"
								value={stock.adverts?.retailAdverts?.autotraderAdvert?.status}
							/>
							<DetailRow
								label="Advertiser advert"
								value={stock.adverts?.retailAdverts?.advertiserAdvert?.status}
							/>
							<DetailRow
								label="Price indicator"
								value={stock.adverts?.retailAdverts?.priceIndicatorRating}
							/>
							<DetailRow label="Advertiser" value={stock.advertiser?.name} />
						</dl>
					</Card>
				</div>
			)}
		</AppShell>
	);
}
