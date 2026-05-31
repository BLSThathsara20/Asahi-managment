import { getErrorMessage } from "../api/errors";

export type NotifyInput = {
	title: string;
	description?: string;
};

export type NotifyApi = {
	success: (input: NotifyInput) => void;
	error: (input: NotifyInput) => void;
	info: (input: NotifyInput) => void;
	fromError: (err: unknown, title?: string) => void;
};

export function createNotifyApi(push: (t: {
	kind: "success" | "error" | "info";
	title: string;
	description?: string;
}) => void): NotifyApi {
	return {
		success: (input) => push({ kind: "success", ...input }),
		error: (input) => push({ kind: "error", ...input }),
		info: (input) => push({ kind: "info", ...input }),
		fromError: (err, title = "Something went wrong") => {
			push({
				kind: "error",
				title,
				description: getErrorMessage(err),
			});
		},
	};
}
