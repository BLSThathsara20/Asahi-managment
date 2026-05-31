import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
	Car,
	ChevronRight,
	LayoutDashboard,
	Menu,
	Shield,
	MessageSquare,
	Store,
	Users,
	X,
} from "lucide-react";
import ThemeToggle from "../../shared/ui/ThemeToggle";
import Button from "../../shared/ui/Button";
import { useAuth } from "../providers/AuthProvider";
import { cn } from "../../shared/lib/cn";

export default function AppShell({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	const { appUser, firebaseUser, logout } = useAuth();
	const location = useLocation();
	const isAdmin =
		appUser?.role === "admin" || appUser?.role === "super_admin";
	const autotraderActive =
		location.pathname.startsWith("/autotrader") &&
		!location.pathname.startsWith("/autotrader/messages");
	const messagesActive = location.pathname.startsWith("/autotrader/messages");
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<>
			<div className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
				<div className="grid w-full grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="hidden min-h-screen border-r border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 lg:block">
					<div className="px-5 py-5">
						<div className="flex items-center gap-3">
							<div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-600 text-white shadow-sm dark:bg-sky-500">
								<Car className="h-5 w-5" />
							</div>
							<div>
								<p className="text-sm font-semibold leading-4">Asahi</p>
								<p className="text-xs text-slate-600 dark:text-slate-400">
									Stock platform
								</p>
							</div>
						</div>
					</div>

					<nav className="px-3">
						<NavLink
							to="/"
							className={({ isActive }) =>
								cn(
									"group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
									isActive
										? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
										: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
								)
							}
						>
							<span className="flex items-center gap-2">
								<LayoutDashboard className="h-4 w-4" />
								Dashboard
							</span>
							<ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
						</NavLink>

						<NavLink
							to="/autotrader"
							className={cn(
								"group mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
								autotraderActive
									? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
									: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
							)}
						>
							<span className="flex items-center gap-2">
								<Store className="h-4 w-4" />
								Auto Trader
							</span>
							<ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
						</NavLink>

						<NavLink
							to="/autotrader/messages"
							className={cn(
								"group mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
								messagesActive
									? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
									: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
							)}
						>
							<span className="flex items-center gap-2">
								<MessageSquare className="h-4 w-4" />
								Messages
							</span>
							<ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
						</NavLink>

						{isAdmin && (
							<NavLink
								to="/admin/users"
								className={({ isActive }) =>
									cn(
										"group mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
										isActive
											? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
											: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
									)
								}
							>
								<span className="flex items-center gap-2">
									<Users className="h-4 w-4" />
									Users
								</span>
								<ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
							</NavLink>
						)}
					</nav>

					<div className="mt-auto px-5 pb-6 pt-8">
						<div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
							<div className="flex items-center gap-2 font-medium">
								<Shield className="h-4 w-4 text-sky-600 dark:text-sky-400" />
								Security
							</div>
							<p className="mt-1 text-slate-600 dark:text-slate-400">
								Access controlled via Google Sign-In + backend RBAC.
							</p>
						</div>
					</div>
				</aside>

					<div className="min-h-screen">
					<header className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
						<div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
							<div>
								<div className="mb-2 flex items-center gap-2 lg:hidden">
									<Button
										variant="ghost"
										onClick={() => setMobileNavOpen(true)}
										aria-label="Open menu"
										leftIcon={<Menu className="h-4 w-4" />}
									>
										Menu
									</Button>
								</div>
								<p className="text-xs font-medium uppercase tracking-wide text-sky-700 dark:text-sky-400">
									Asahi — UK dealership
								</p>
								<h1 className="text-xl font-semibold">{title}</h1>
								{firebaseUser?.email && (
									<p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
										{firebaseUser.email} · role:{" "}
										<span className="font-medium">
											{appUser?.role ?? "unknown"}
										</span>
									</p>
								)}
							</div>
							<div className="flex items-center gap-2">
								<ThemeToggle />
								<Button variant="secondary" onClick={() => logout()}>
									Log out
								</Button>
							</div>
						</div>
					</header>

					<main className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
						{children}
					</main>
					</div>
				</div>
			</div>

			{mobileNavOpen && (
			<div className="fixed inset-0 z-50 lg:hidden">
				<div
					className="absolute inset-0 bg-slate-950/40"
					onClick={() => setMobileNavOpen(false)}
				/>
				<div className="absolute left-0 top-0 h-full w-[280px] border-r border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-600 text-white shadow-sm dark:bg-sky-500">
								<Car className="h-5 w-5" />
							</div>
							<div>
								<p className="text-sm font-semibold leading-4">Asahi</p>
								<p className="text-xs text-slate-600 dark:text-slate-400">
									Stock platform
								</p>
							</div>
						</div>
						<button
							type="button"
							className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
							onClick={() => setMobileNavOpen(false)}
							aria-label="Close menu"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					<nav className="mt-4 space-y-1">
						<NavLink
							to="/"
							onClick={() => setMobileNavOpen(false)}
							className={({ isActive }) =>
								cn(
									"flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
									isActive
										? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
										: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
								)
							}
						>
							<span className="flex items-center gap-2">
								<LayoutDashboard className="h-4 w-4" />
								Dashboard
							</span>
							<ChevronRight className="h-4 w-4 opacity-60" />
						</NavLink>

						<NavLink
							to="/autotrader"
							onClick={() => setMobileNavOpen(false)}
							className={cn(
								"flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
								autotraderActive
									? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
									: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
							)}
						>
							<span className="flex items-center gap-2">
								<Store className="h-4 w-4" />
								Auto Trader
							</span>
							<ChevronRight className="h-4 w-4 opacity-60" />
						</NavLink>

						<NavLink
							to="/autotrader/messages"
							onClick={() => setMobileNavOpen(false)}
							className={cn(
								"flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
								messagesActive
									? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
									: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
							)}
						>
							<span className="flex items-center gap-2">
								<MessageSquare className="h-4 w-4" />
								Messages
							</span>
							<ChevronRight className="h-4 w-4 opacity-60" />
						</NavLink>

						{isAdmin && (
							<NavLink
								to="/admin/users"
								onClick={() => setMobileNavOpen(false)}
								className={({ isActive }) =>
									cn(
										"flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
										isActive
											? "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200"
											: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
									)
								}
							>
								<span className="flex items-center gap-2">
									<Users className="h-4 w-4" />
									Users
								</span>
								<ChevronRight className="h-4 w-4 opacity-60" />
							</NavLink>
						)}
					</nav>

					<div className="mt-6 flex items-center gap-2">
						<ThemeToggle />
						<Button variant="secondary" onClick={() => logout()}>
							Log out
						</Button>
					</div>

					<div className="mt-6 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
						<div className="flex items-center gap-2 font-medium">
							<Shield className="h-4 w-4 text-sky-600 dark:text-sky-400" />
							Security
						</div>
						<p className="mt-1 text-slate-600 dark:text-slate-400">
							Google Sign-In + backend RBAC.
						</p>
					</div>
				</div>
			</div>
			)}
		</>
	);
}

