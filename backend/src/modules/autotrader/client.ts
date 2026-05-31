import { ApiError } from "../../app/errors";
import { getAutotraderConfig } from "./config";

type TokenCache = {
	accessToken: string;
	expiresAtMs: number;
};

let tokenCache: TokenCache | null = null;

async function fetchAccessToken(): Promise<string> {
	const { key, secret, apiBaseUrl } = getAutotraderConfig();
	const body = new URLSearchParams({ key, secret });

	const res = await fetch(`${apiBaseUrl}/authenticate`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: body.toString(),
	});

	const data = (await res.json().catch(() => ({}))) as {
		access_token?: string;
		expires_at?: string;
		error?: string;
		message?: string;
	};

	if (!res.ok || !data.access_token) {
		const msg =
			typeof data.message === "string"
				? data.message
				: typeof data.error === "string"
					? data.error
					: `Auto Trader authentication failed (${res.status})`;
		throw new ApiError("autotrader_auth_failed", msg, 502);
	}

	const expiresAtMs = data.expires_at
		? new Date(data.expires_at).getTime()
		: Date.now() + 55 * 60 * 1000;

	tokenCache = {
		accessToken: data.access_token,
		expiresAtMs,
	};

	return data.access_token;
}

export async function getAutotraderAccessToken(): Promise<string> {
	if (tokenCache && Date.now() < tokenCache.expiresAtMs - 60_000) {
		return tokenCache.accessToken;
	}
	return fetchAccessToken();
}

export type AutotraderFetchInit = {
	method?: "GET" | "PATCH" | "POST";
	body?: unknown;
};

export async function autotraderFetch<T = unknown>(
	path: string,
	query?: Record<string, string | number | undefined>,
	init?: AutotraderFetchInit,
): Promise<T> {
	const { apiBaseUrl, advertiserId } = getAutotraderConfig();
	const token = await getAutotraderAccessToken();
	const method = init?.method ?? "GET";

	const url = new URL(path, `${apiBaseUrl}/`);
	if (query) {
		for (const [k, v] of Object.entries(query)) {
			if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
		}
	}

	const res = await fetch(url.toString(), {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json",
			"advertiser-id": advertiserId,
		},
		body:
			init?.body !== undefined ? JSON.stringify(init.body) : undefined,
	});

	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const payload = data as { message?: string; error?: string };
		const msg =
			payload.message ||
			payload.error ||
			`Auto Trader request failed (${res.status})`;
		const status = res.status === 401 ? 502 : res.status >= 500 ? 502 : 400;
		throw new ApiError("autotrader_api_error", msg, status);
	}

	return data as T;
}
