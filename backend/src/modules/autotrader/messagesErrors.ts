import { ApiError } from "../../app/errors";
import { getAutotraderConfig } from "./config";

export function throwMessageThreadNotFound(
	id: string,
	dealLookupFailed: boolean,
	messagesLookupFailed: boolean,
): never {
	const { env, advertiserId } = getAutotraderConfig();

	let message = `Deal/message "${id}" was not found for advertiser ${advertiserId} in the ${env} Connect API.`;

	if (env === "sandbox") {
		message +=
			" This deal appears on the live Auto Trader portal (portal.autotrader.co.uk) but sandbox Connect has 0 deals and does not return live portal deals. " +
			"To load Annabelle's enquiry and similar threads, ask Auto Trader for production API credentials, then set AUTOTRADER_ENV=production in backend/.env and restart the server.";
	} else if (dealLookupFailed && messagesLookupFailed) {
		message +=
			" Check that the deal ID and advertiser ID match production, and that Deal Sync / Message Updates are enabled.";
	}

	throw new ApiError("not_found", message, 404);
}
