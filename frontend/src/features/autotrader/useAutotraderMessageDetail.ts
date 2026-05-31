import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../../shared/api/client";
import { getErrorMessage } from "../../shared/api/errors";
import type { AutotraderMessageThreadDetail } from "./messageTypes";

export function useAutotraderMessageDetail(messagesId: string | undefined) {
	const [thread, setThread] = useState<AutotraderMessageThreadDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);

	const load = useCallback(async () => {
		if (!messagesId) {
			setLoading(false);
			setError("missing_id");
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const res = await apiFetch<{ thread: AutotraderMessageThreadDetail }>(
				`/api/autotrader/messages/${encodeURIComponent(messagesId)}`,
			);
			setThread(res.thread);
		} catch (e) {
			setError(getErrorMessage(e));
			setThread(null);
		} finally {
			setLoading(false);
		}
	}, [messagesId]);

	useEffect(() => {
		void load();
	}, [load]);

	const markRead = useCallback(async () => {
		if (!messagesId) return;
		setSaving(true);
		setError(null);
		try {
			const res = await apiFetch<{ thread: AutotraderMessageThreadDetail }>(
				`/api/autotrader/messages/${encodeURIComponent(messagesId)}/read`,
				{ method: "PATCH" },
			);
			setThread(res.thread);
		} catch (e) {
			setError(getErrorMessage(e));
			throw e;
		} finally {
			setSaving(false);
		}
	}, [messagesId]);

	const sendReply = useCallback(
		async (message: string) => {
			if (!messagesId) return;
			setSaving(true);
			setError(null);
			try {
				const res = await apiFetch<{ thread: AutotraderMessageThreadDetail }>(
					"/api/autotrader/messages/send",
					{
						method: "POST",
						body: { messagesId, message },
					},
				);
				setThread(res.thread);
			} catch (e) {
				setError(getErrorMessage(e));
				throw e;
			} finally {
				setSaving(false);
			}
		},
		[messagesId],
	);

	return { thread, loading, error, saving, reload: load, markRead, sendReply };
}
