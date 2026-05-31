import { auth } from "../config/firebase";
import { getEnv } from "../config/env";
import { ApiClientError, parseApiErrorBody, friendlyMessage } from "./errors";

const baseUrl = getEnv().VITE_API_URL.trim();

export async function apiFetch<TResponse = unknown>(
	path: string,
	{ method = "GET", body }: { method?: string; body?: unknown } = {},
): Promise<TResponse> {
	const user = auth.currentUser;
	if (!user) {
		throw new ApiClientError("Please sign in again.", 401, "not_authenticated");
	}

	const token = await user.getIdToken();
	const res = await fetch(`${baseUrl}${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: body ? JSON.stringify(body) : undefined,
	});

	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const parsed = parseApiErrorBody(data);
		const code = parsed?.code ?? `http_${res.status}`;
		const msg = friendlyMessage(
			parsed?.code ?? null,
			parsed?.message ?? `Request failed (${res.status})`,
		);
		throw new ApiClientError(msg, res.status, code);
	}
	return data as TResponse;
}
