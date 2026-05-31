import type { Request, Response } from "express";
import { pool } from "../../db/pool";
import { dbUnavailableMessage, isDbConnectionError } from "../../app/errors";
import { ensureGuestAndPermissionsSchema } from "./ensureGuestSchema";

async function ensureTables() {
	// Idempotent safety for local dev; in Supabase run migrations instead.
	await pool.query(`
		create table if not exists public.app_users (
			id uuid primary key default gen_random_uuid(),
			firebase_uid text not null unique,
			email text,
			display_name text,
			role text not null check (role in ('super_admin','admin','staff','guest')) default 'guest',
			created_at timestamptz not null default now(),
			updated_at timestamptz not null default now()
		);
	`);
}

export async function upsertMe(req: Request, res: Response) {
	const { uid, email, name } = req.user!;

	try {
		await ensureTables();
		await ensureGuestAndPermissionsSchema();
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error("upsertMe schema failed:", e);
		if (isDbConnectionError(e)) {
			return res.status(503).json({
				error: { code: "db_unavailable", message: dbUnavailableMessage() },
			});
		}
		return res.status(500).json({ error: "upsert_failed" });
	}

	// First login becomes super_admin (transaction + table lock prevents races).
	const client = await pool.connect();
	try {
		await client.query("begin");
		await client.query("lock table public.app_users in exclusive mode");
		const { rows: countRows } = await client.query(
			"select count(*)::int as c from public.app_users",
		);
		const isFirst = countRows[0]?.c === 0;
		const role = isFirst ? "super_admin" : "guest";

		const { rows } = await client.query(
			`
			insert into public.app_users (firebase_uid, email, display_name, role)
			values ($1, $2, $3, $4)
			on conflict (firebase_uid) do update set
				email = excluded.email,
				display_name = excluded.display_name,
				updated_at = now()
			returning id, firebase_uid, email, display_name, role, created_at, updated_at
			`,
			[uid, email, name, role],
		);
		await client.query("commit");
		return res.json({ user: rows[0], firstLogin: isFirst });
	} catch (e) {
		await client.query("rollback").catch(() => {});
		// eslint-disable-next-line no-console
		console.error("upsertMe failed:", e);
		if (isDbConnectionError(e)) {
			return res.status(503).json({
				error: { code: "db_unavailable", message: dbUnavailableMessage() },
			});
		}
		return res.status(500).json({ error: "upsert_failed" });
	} finally {
		client.release();
	}
}

