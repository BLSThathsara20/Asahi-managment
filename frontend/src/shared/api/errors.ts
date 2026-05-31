export type ApiErrorCode =
	| "internal_error"
	| "db_not_ready"
	| "db_unavailable"
	| "autotrader_not_configured"
	| "autotrader_auth_failed"
	| "autotrader_api_error"
	| "invalid_payload"
	| "missing_id"
	| "not_found"
	| "unauthorized"
	| "forbidden"
	| string;

export type ApiErrorPayload = {
	code?: ApiErrorCode;
	message?: string;
};

export class ApiClientError extends Error {
	code: ApiErrorCode | null;
	status: number;

	constructor(message: string, status: number, code: ApiErrorCode | null = null) {
		super(message);
		this.name = "ApiClientError";
		this.status = status;
		this.code = code;
	}
}

const FRIENDLY: Record<string, string> = {
	not_authenticated: "Please sign in again.",
	unauthorized: "Your session expired. Please sign in again.",
	forbidden: "You do not have permission to do that.",
	not_found: "That item was not found.",
	db_unavailable:
		"Cannot reach the database. Check Supabase is active and DATABASE_URL in backend/.env.",
	db_not_ready: "Database tables are not ready. Run Supabase migrations.",
	autotrader_not_configured:
		"Auto Trader is not configured. Add AUTOTRADER_* to backend/.env and restart the server.",
	autotrader_auth_failed: "Auto Trader authentication failed. Check your API key and secret.",
	autotrader_api_error: "Auto Trader request failed.",
	internal_error: "Something went wrong. Please try again.",
	invalid_payload: "Invalid request. Check your input and try again.",
	missing_id: "Missing required id.",
	upsert_failed: "Could not sync your account. Try again or check the database.",
	load_failed: "Could not load data. Please try again.",
	http_401: "Please sign in again.",
	http_403: "You do not have permission.",
	http_404: "Not found.",
	http_503: "Service temporarily unavailable.",
};

export function parseApiErrorBody(data: unknown): ApiErrorPayload | null {
	if (!data || typeof data !== "object") return null;
	const root = data as { error?: unknown };
	const err = root.error;
	if (typeof err === "string") {
		return { code: err, message: FRIENDLY[err] ?? err };
	}
	if (err && typeof err === "object") {
		const o = err as ApiErrorPayload;
		return {
			code: o.code,
			message: o.message,
		};
	}
	return null;
}

export function friendlyMessage(
	code: string | null | undefined,
	fallback: string,
): string {
	if (code && FRIENDLY[code]) return FRIENDLY[code];
	return fallback;
}

export function getErrorMessage(err: unknown): string {
	if (err instanceof ApiClientError) {
		return friendlyMessage(err.code, err.message);
	}
	if (err instanceof Error) {
		return friendlyMessage(
			"code" in err ? String((err as Error & { code?: string }).code) : null,
			err.message,
		);
	}
	return "Something went wrong.";
}
