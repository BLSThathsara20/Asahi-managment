import { useEffect, useRef } from "react";
import { useNotify } from "../ui/ToastProvider";

/** Shows a toast when `error` becomes a new non-empty string. */
export function useErrorNotification(
	error: string | null | undefined,
	title = "Something went wrong",
) {
	const notify = useNotify();
	const last = useRef<string | null>(null);

	useEffect(() => {
		if (!error) {
			last.current = null;
			return;
		}
		if (error === last.current) return;
		last.current = error;
		notify.error({ title, description: error });
	}, [error, title, notify]);
}
