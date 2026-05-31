import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "../shared/ui/Button";

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		// eslint-disable-next-line no-console
		console.error("UI error:", error, info.componentStack);
	}

	render() {
		if (this.state.error) {
			return (
				<div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
					<div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-lg dark:border-rose-900 dark:bg-slate-900">
						<h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
							Something went wrong
						</h1>
						<p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
							{this.state.error.message || "An unexpected error occurred."}
						</p>
						<Button
							className="mt-4"
							variant="secondary"
							onClick={() => {
								this.setState({ error: null });
								window.location.reload();
							}}
						>
							Reload page
						</Button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}
