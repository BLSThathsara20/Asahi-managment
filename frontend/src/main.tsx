import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./app/ErrorBoundary";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { AuthProvider } from "./app/providers/AuthProvider";
import { ToastProvider } from "./shared/ui/ToastProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary>
			<ThemeProvider>
				<ToastProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</ToastProvider>
			</ThemeProvider>
		</ErrorBoundary>
	</StrictMode>,
);
