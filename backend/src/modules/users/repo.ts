import { pool } from "../../db/pool";

export type AppUserRole = "super_admin" | "admin" | "staff" | "guest";

export type AppUserRow = {
	id: string;
	firebase_uid: string;
	email: string | null;
	display_name: string | null;
	role: AppUserRole;
	created_at: string;
	updated_at: string;
};

export async function getUserByFirebaseUid(uid: string): Promise<AppUserRow | null> {
	const { rows } = await pool.query<AppUserRow>(
		`select id, firebase_uid, email, display_name, role, created_at, updated_at
		   from public.app_users
		  where firebase_uid = $1
		  limit 1`,
		[uid],
	);
	return rows[0] ?? null;
}

export async function listUsers(): Promise<AppUserRow[]> {
	const { rows } = await pool.query<AppUserRow>(
		`select id, firebase_uid, email, display_name, role, created_at, updated_at
		   from public.app_users
		  order by created_at asc`,
	);
	return rows;
}

export async function updateUserRole(
	id: string,
	role: AppUserRole,
): Promise<AppUserRow | null> {
	const { rows } = await pool.query<AppUserRow>(
		`update public.app_users
		    set role = $2,
		        updated_at = now()
		  where id = $1
		  returning id, firebase_uid, email, display_name, role, created_at, updated_at`,
		[id, role],
	);
	return rows[0] ?? null;
}

