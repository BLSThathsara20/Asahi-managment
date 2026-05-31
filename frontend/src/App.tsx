import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import InventoryDashboardPage from "./features/inventory/InventoryDashboardPage";
import AutotraderStockListPage from "./features/autotrader/AutotraderStockListPage";
import AutotraderStockDetailPage from "./features/autotrader/AutotraderStockDetailPage";
import AutotraderMessagesListPage from "./features/autotrader/AutotraderMessagesListPage";
import AutotraderMessagesDetailPage from "./features/autotrader/AutotraderMessagesDetailPage";
import UsersAdminPage from "./features/users/UsersAdminPage";
import { useAuth } from "./app/providers/AuthProvider";

function App() {
	const { loading, firebaseUser, appUser } = useAuth();

	if (loading) return null;

	const authed = Boolean(firebaseUser && appUser);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={authed ? <Navigate to="/" replace /> : <LoginPage />}
				/>
				<Route
					path="/"
					element={
						authed ? (
							<InventoryDashboardPage />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/autotrader/messages/:messagesId"
					element={
						authed ? (
							<AutotraderMessagesDetailPage />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/autotrader/messages"
					element={
						authed ? (
							<AutotraderMessagesListPage />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/autotrader"
					element={
						authed ? (
							<AutotraderStockListPage />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/autotrader/:stockId"
					element={
						authed ? (
							<AutotraderStockDetailPage />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/admin/users"
					element={authed ? <UsersAdminPage /> : <Navigate to="/login" replace />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
