import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import ThemeToggle from "../../shared/ui/ThemeToggle";
import { useAuth } from "../../app/providers/AuthProvider";
import { Car, KeyRound, Link2, LogIn, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
	const {
		signInWithGoogle,
		signInWithEmailPassword,
		signUpWithEmailPassword,
		sendMagicLink,
		loading,
		error,
	} = useAuth();

	const [mode, setMode] = useState<"google" | "password" | "magic">("google");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [localMsg, setLocalMsg] = useState<string | null>(null);
	const [localErr, setLocalErr] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
			<header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
				<div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
					<div>
						<div className="flex items-center gap-2">
							<div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-600 text-white shadow-sm dark:bg-sky-500">
								<Car className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs font-medium uppercase tracking-wide text-sky-700 dark:text-sky-400">
									Asahi — UK dealership
								</p>
								<h1 className="text-lg font-semibold leading-5">
									Car stock management
								</h1>
							</div>
						</div>
					</div>
					<ThemeToggle />
				</div>
			</header>

			<main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:items-center">
				<div>
					<p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
						<ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
						Secure staff access
					</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-tight">
						Modern stock platform for your dealership.
					</h2>
					<p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
						Manage inventory, assign roles, and keep customer data protected.
						Sign in using Google. The first account to sign in becomes{" "}
						<strong className="font-medium">super admin</strong>.
					</p>

					<div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-200">
						<div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
							<p className="font-medium">Inventory</p>
							<p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
								Vehicles, pricing, status
							</p>
						</div>
						<div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
							<p className="font-medium">Users</p>
							<p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
								Admin, staff permissions
							</p>
						</div>
					</div>
				</div>

				<Card title="Sign in">
					<div className="flex flex-wrap gap-2">
						<button
							type="button"
							onClick={() => {
								setMode("google");
								setLocalErr(null);
								setLocalMsg(null);
							}}
							className={`rounded-full border px-3 py-1 text-xs font-medium ${
								mode === "google"
									? "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200"
									: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
							}`}
						>
							Google
						</button>
						<button
							type="button"
							onClick={() => {
								setMode("password");
								setLocalErr(null);
								setLocalMsg(null);
							}}
							className={`rounded-full border px-3 py-1 text-xs font-medium ${
								mode === "password"
									? "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200"
									: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
							}`}
						>
							Email + password
						</button>
						<button
							type="button"
							onClick={() => {
								setMode("magic");
								setLocalErr(null);
								setLocalMsg(null);
							}}
							className={`rounded-full border px-3 py-1 text-xs font-medium ${
								mode === "magic"
									? "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200"
									: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
							}`}
						>
							Magic link
						</button>
					</div>

					{mode === "google" && (
						<>
							<p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
								Continue with Google to access the dashboard.
							</p>

							<div className="mt-5">
								<Button
									onClick={() => signInWithGoogle()}
									disabled={loading || submitting}
									className="w-full"
									leftIcon={<LogIn className="h-4 w-4" />}
								>
									Continue with Google
								</Button>
							</div>
						</>
					)}

					{mode !== "google" && (
						<div className="mt-4 space-y-3">
							<div>
								<label className="text-xs font-medium text-slate-700 dark:text-slate-300">
									Email
								</label>
								<div className="relative mt-1">
									<Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
									<input
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										type="email"
										placeholder="you@company.com"
										className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900"
									/>
								</div>
							</div>

							{mode === "password" && (
								<div>
									<label className="text-xs font-medium text-slate-700 dark:text-slate-300">
										Password
									</label>
									<div className="relative mt-1">
										<KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
										<input
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type="password"
											placeholder="••••••••"
											className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900"
										/>
									</div>
								</div>
							)}
						</div>
					)}

					{mode === "password" && (
						<div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
							<Button
								variant="primary"
								disabled={submitting || loading}
								leftIcon={<LogIn className="h-4 w-4" />}
								onClick={async () => {
									setLocalErr(null);
									setLocalMsg(null);
									setSubmitting(true);
									try {
										await signInWithEmailPassword(email.trim(), password);
									} catch (e) {
										setLocalErr(e instanceof Error ? e.message : "signin_failed");
									} finally {
										setSubmitting(false);
									}
								}}
							>
								Sign in
							</Button>
							<Button
								variant="secondary"
								disabled={submitting || loading}
								leftIcon={<KeyRound className="h-4 w-4" />}
								onClick={async () => {
									setLocalErr(null);
									setLocalMsg(null);
									setSubmitting(true);
									try {
										await signUpWithEmailPassword(email.trim(), password);
									} catch (e) {
										setLocalErr(e instanceof Error ? e.message : "signup_failed");
									} finally {
										setSubmitting(false);
									}
								}}
							>
								Create account
							</Button>
						</div>
					)}

					{mode === "magic" && (
						<div className="mt-5">
							<Button
								variant="primary"
								className="w-full"
								disabled={submitting || loading}
								leftIcon={<Link2 className="h-4 w-4" />}
								onClick={async () => {
									setLocalErr(null);
									setLocalMsg(null);
									setSubmitting(true);
									try {
										await sendMagicLink(email.trim());
										setLocalMsg("Magic link sent. Check your email.");
									} catch (e) {
										setLocalErr(e instanceof Error ? e.message : "magic_failed");
									} finally {
										setSubmitting(false);
									}
								}}
							>
								Send magic link
							</Button>
							<p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
								We’ll email you a sign-in link. Open it on this device/browser.
							</p>
						</div>
					)}

					{localMsg && (
						<p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300">
							{localMsg}
						</p>
					)}
					{(localErr || error) && (
						<p className="mt-3 text-sm text-rose-700 dark:text-rose-300">
							{localErr ?? error}
						</p>
					)}
				</Card>
			</main>
		</div>
	);
}

