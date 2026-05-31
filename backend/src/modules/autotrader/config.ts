import { ApiError } from "../../app/errors";

export type AutotraderEnv = "sandbox" | "production";

export type AutotraderConfig = {
	env: AutotraderEnv;
	key: string;
	secret: string;
	advertiserId: string;
	apiBaseUrl: string;
};

export function getAutotraderConfig(
	env: NodeJS.ProcessEnv = process.env,
): AutotraderConfig {
	const key = env.AUTOTRADER_KEY?.trim();
	const secret = env.AUTOTRADER_SECRET?.trim();
	const advertiserId = env.AUTOTRADER_ADVERTISER_ID?.trim();
	const rawEnv = (env.AUTOTRADER_ENV?.trim() || "sandbox").toLowerCase();

	const missing = [
		!key && "AUTOTRADER_KEY",
		!secret && "AUTOTRADER_SECRET",
		!advertiserId && "AUTOTRADER_ADVERTISER_ID",
	].filter(Boolean);

	if (missing.length > 0) {
		throw new ApiError(
			"autotrader_not_configured",
			`Auto Trader API is not configured. Missing in backend/.env: ${missing.join(", ")}. Restart the backend after editing .env.`,
			503,
		);
	}

	const atEnv: AutotraderEnv = rawEnv === "production" ? "production" : "sandbox";
	const apiBaseUrl =
		atEnv === "production"
			? "https://api.autotrader.co.uk"
			: "https://api-sandbox.autotrader.co.uk";

	return { env: atEnv, key, secret, advertiserId, apiBaseUrl };
}
