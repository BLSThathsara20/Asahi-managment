export type AutotraderMoney = {
	amountGBP?: number | null;
	amountGBX?: number | null;
};

export type AutotraderVehicle = {
	registration?: string | null;
	vin?: string | null;
	make?: string | null;
	model?: string | null;
	derivative?: string | null;
	yearOfManufacture?: string | number | null;
	odometerReadingMiles?: number | null;
	colour?: string | null;
	fuelType?: string | null;
	transmissionType?: string | null;
	bodyType?: string | null;
	ownershipCondition?: string | null;
};

export type AutotraderMetadata = {
	stockId?: string;
	searchId?: string;
	lifecycleState?: string;
	lastUpdated?: string;
	dateOnForecourt?: string | null;
};

export type AutotraderStockItem = {
	vehicle?: AutotraderVehicle;
	metadata?: AutotraderMetadata;
	adverts?: {
		forecourtPrice?: { amountGBP?: number | null };
		retailAdverts?: {
			suppliedPrice?: AutotraderMoney;
			totalPrice?: AutotraderMoney;
			priceIndicatorRating?: string | null;
			autotraderAdvert?: { status?: string };
			advertiserAdvert?: { status?: string };
		};
	};
	media?: {
		images?: { href?: string; imageId?: string }[];
	};
	advertiser?: {
		advertiserId?: string;
		name?: string;
	};
};

export type AutotraderStockListResponse = {
	results: AutotraderStockItem[];
	totalResults: number;
	page: number;
	pageSize: number;
};

export function stockListPrice(item: AutotraderStockItem): number | null {
	const forecourt = item.adverts?.forecourtPrice?.amountGBP;
	if (forecourt != null) return forecourt;
	return item.adverts?.retailAdverts?.suppliedPrice?.amountGBP ?? null;
}

export function stockTitle(item: AutotraderStockItem): string {
	const v = item.vehicle;
	if (!v) return "Vehicle";
	const parts = [v.make, v.model].filter(Boolean);
	return parts.length ? parts.join(" ") : "Vehicle";
}
