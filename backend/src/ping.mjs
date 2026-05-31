import "dotenv/config";
import pg from "pg";

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
	console.error("Missing DATABASE_URL. Copy backend/.env.example to backend/.env and fill it in.");
	process.exit(1);
}

try {
	const u = new URL(connectionString);
	console.log(
		`Connecting as ${decodeURIComponent(u.username)} @ ${u.hostname}:${u.port || "5432"}/${u.pathname.replace(/^\//, "") || "postgres"} …`,
	);
} catch {
	console.error("DATABASE_URL is not a valid URL.");
	process.exit(1);
}

const pool = new pg.Pool({
	connectionString,
	ssl: { rejectUnauthorized: false },
});

try {
	const { rows } = await pool.query(
		"select now() as server_time, current_database() as database_name",
	);
	console.log("Database connection OK:", rows[0]);
} catch (err) {
	console.error("Connection failed:", err.message);
	if (
		err.message.includes("tenant/user") ||
		err.message.includes("Tenant or user not found") ||
		err.message.includes("getaddrinfo ENOTFOUND")
	) {
		console.error(
			"\nFix: Supabase dashboard → your project → Settings → Database.\n" +
				"  1) Ensure the project is active (unpause if paused).\n" +
				"  2) Copy the Session pooler URI (port 5432, user postgres.YOUR_PROJECT_REF).\n" +
				"  3) Paste into backend/.env as DATABASE_URL (URL-encode & in password as %26).\n" +
				"  4) Run: npm run db:ping\n",
		);
	}
	process.exitCode = 1;
} finally {
	await pool.end();
}
