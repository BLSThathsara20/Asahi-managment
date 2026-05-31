import { useState } from "react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import AppShell from "../../app/layouts/AppShell";
import { apiFetch } from "../../shared/api/client";
import { useAuth, type AppUserRole } from "../../app/providers/AuthProvider";
import Badge from "../../shared/ui/Badge";
import { Shield, UserRound, Users } from "lucide-react";
import Skeleton from "../../shared/ui/Skeleton";
import { useNotify } from "../../shared/ui/ToastProvider";
import { useErrorNotification } from "../../shared/hooks/useErrorNotification";
import { useUsers } from "./useUsers";
import { MoreVertical } from "lucide-react";

export default function UsersAdminPage() {
	const { appUser } = useAuth();
	const notify = useNotify();
	const [savingId, setSavingId] = useState<string | null>(null);
	const [openId, setOpenId] = useState<string | null>(null);

	const canAdmin = appUser?.role === "admin" || appUser?.role === "super_admin";
	const { users, setUsers, loading, error, refreshing } = useUsers(Boolean(canAdmin));

	useErrorNotification(error, "Couldn’t load users");

	async function setRole(userId: string, role: AppUserRole) {
		try {
			setSavingId(userId);
			const data = await apiFetch<{ user: (typeof users)[number] }>(`/api/admin/users/${userId}`, {
				method: "PATCH",
				body: { role },
			});
			setUsers((prev) => prev.map((u) => (u.id === userId ? data.user : u)));
			notify.success({
				title: "Role updated",
				description: `Set role to ${role}.`,
			});
		} catch (e) {
			notify.fromError(e, "Couldn’t update role");
		} finally {
			setSavingId(null);
		}
	}

	return (
		<AppShell title="User management">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card title="Roles">
					<div className="flex items-start gap-3">
						<div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-200">
							<Shield className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium">Access levels</p>
							<p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
								Super admin, admin, and staff.
							</p>
						</div>
					</div>
				</Card>
				<Card title="Users">
					<div className="flex items-start gap-3">
						<div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
							<Users className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium">{users.length}</p>
							<p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
								Accounts in system
							</p>
						</div>
					</div>
				</Card>
				<Card title="You">
					<div className="flex items-start gap-3">
						<div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
							<UserRound className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium">{appUser?.email ?? "—"}</p>
							<div className="mt-1">
								<Badge variant="info">{appUser?.role ?? "unknown"}</Badge>
							</div>
						</div>
					</div>
				</Card>
			</div>

			<Card title="All users">
				{refreshing && (
					<p className="text-xs text-slate-500 dark:text-slate-400">
						Refreshing…
					</p>
				)}
				{!canAdmin && (
					<p className="text-sm text-red-700 dark:text-red-300">
						You don’t have permission to manage users.
					</p>
				)}

				{loading && (
					<div className="space-y-3">
						<p className="text-sm text-slate-600 dark:text-slate-400">
							Loading user directory and roles…
						</p>
						<div className="space-y-2">
							{Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
								>
									<div className="flex-1 space-y-2">
										<Skeleton className="h-4 w-1/3" />
										<Skeleton className="h-3 w-1/2" />
									</div>
									<Skeleton className="h-6 w-20 rounded-full" />
								</div>
							))}
						</div>
					</div>
				)}
				{error && (
					<p className="text-sm text-red-700 dark:text-red-300">{error}</p>
				)}

				{!loading && canAdmin && (
					<div className="mt-3 overflow-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
						<table className="min-w-full text-sm">
							<thead className="bg-slate-50 text-slate-700 dark:bg-slate-950/30 dark:text-slate-200">
								<tr>
									<th className="px-4 py-3 text-left font-medium">User</th>
									<th className="px-4 py-3 text-left font-medium">Role</th>
									<th className="px-4 py-3 text-left font-medium">Actions</th>
								</tr>
							</thead>
							<tbody>
								{users.map((u) => (
									<tr
										key={u.id}
										className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/30"
									>
										<td className="px-4 py-3">
											<div className="font-medium">{u.display_name ?? "—"}</div>
											<div className="text-xs text-slate-500 dark:text-slate-400">
												{u.email ?? "—"}
											</div>
										</td>
										<td className="px-4 py-3">
											<Badge
												variant={
													u.role === "super_admin"
														? "info"
														: u.role === "admin"
															? "warning"
															: "neutral"
												}
											>
												{u.role}
											</Badge>
										</td>
										<td className="px-4 py-3">
											<div className="relative inline-block text-left">
												<Button
													variant="ghost"
													size="sm"
													disabled={savingId === u.id}
													leftIcon={<MoreVertical className="h-4 w-4" />}
													onClick={() =>
														setOpenId((prev) => (prev === u.id ? null : u.id))
													}
												>
													Actions
												</Button>
												{openId === u.id && (
													<div
														className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
														onMouseLeave={() => setOpenId(null)}
													>
														<button
															type="button"
															className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
															disabled={savingId === u.id}
															onClick={async () => {
																setOpenId(null);
																await setRole(u.id, "staff");
															}}
														>
															Set as Staff
														</button>
														<button
															type="button"
															className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
															disabled={savingId === u.id}
															onClick={async () => {
																setOpenId(null);
																await setRole(u.id, "admin");
															}}
														>
															Set as Admin
														</button>
														<button
															type="button"
															className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
															disabled={savingId === u.id}
															onClick={async () => {
																setOpenId(null);
																await setRole(u.id, "super_admin");
															}}
														>
															Set as Super admin
														</button>
													</div>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Card>
		</AppShell>
	);
}

