export type ApiErrorCode =
	| "internal_error"
	| "db_not_ready"
	| "db_unavailable"
	| "autotrader_not_configured"
	| "autotrader_auth_failed"
	| "autotrader_api_error"
	| "autotrader_capability_disabled"
	| "invalid_payload"
	| "missing_id"
	| "not_found"
	| "unauthorized"
	| "forbidden";

export class ApiError extends Error {
	code: ApiErrorCode;
	status: number;

	constructor(code: ApiErrorCode, message: string, status: number) {
		super(message);
		this.code = code;
		this.status = status;
	}
}

export function isPgError(err: unknown): err is { code?: string; message?: string } {
	return typeof err === "object" && err !== null && "code" in err;
}

/** Supabase pooler / DNS / paused project — not an app logic bug. */
export function isDbConnectionError(err: unknown): boolean {
	const msg =
		err instanceof Error
			? err.message
			: typeof err === "object" && err !== null && "message" in err
				? String((err as { message?: unknown }).message)
				: String(err);
	return (
		msg.includes("tenant/user") ||
		msg.includes("Tenant or user not found") ||
		msg.includes("getaddrinfo ENOTFOUND") ||
		msg.includes("ECONNREFUSED")
	);
}

export function dbUnavailableMessage(): string {
	return (
		"Cannot reach the Supabase database. In the Supabase dashboard, open your project, " +
		"confirm it is active (not paused), then copy a fresh Session pooler connection string " +
		"into backend/.env as DATABASE_URL (user must be postgres.YOUR_PROJECT_REF, password URL-encoded)."
	);
}

