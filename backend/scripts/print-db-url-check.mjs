/**
 * Prints DATABASE_URL parts (no password) and common misconfiguration hints.
 * Run: node scripts/print-db-url-check.mjs
 */
import "dotenv/config";

const raw = process.env.DATABASE_URL?.trim();
if (!raw) {
	console.error("DATABASE_URL is missing in backend/.env");
	process.exit(1);
}

let url;
try {
	url = new URL(raw);
} catch {
	console.error("DATABASE_URL is not a valid URL. Paste the full URI from Supabase → Connect → Session pooler.");
	process.exit(1);
}

const user = decodeURIComponent(url.username);
const host = url.hostname;
const port = url.port || "5432";
const db = url.pathname.replace(/^\//, "") || "postgres";

console.log("DATABASE_URL check (password hidden):");
console.log("  host:", host);
console.log("  port:", port);
console.log("  user:", user);
console.log("  database:", db);

const hints = [];

if (!user.includes(".")) {
	hints.push(
		'Username should be "postgres.YOUR_PROJECT_REF" for the shared Session pooler, not plain "postgres".',
	);
}

if (host.startsWith("db.") && host.endsWith(".supabase.co")) {
	hints.push(
		"Direct host (db.*.supabase.co) often fails on IPv4-only networks. Use Session pooler from the dashboard instead.",
	);
}

if (host.includes("pooler.supabase.com") && !user.startsWith("postgres.")) {
	hints.push("Pooler host requires username postgres.<project-ref>.");
}

if (url.password.includes("&") && !raw.includes("%26")) {
	hints.push('Password contains "&" — encode it as %26 in the connection string.');
}

if (hints.length) {
	console.log("\nPossible configuration issues:");
	for (const h of hints) console.log("  -", h);
} else {
	console.log("\nURL shape looks OK. If ping still fails, the Supabase project is likely paused or the host/region/ref is outdated.");
}

console.log("\nDashboard: https://supabase.com/dashboard/project/_/settings/database");
console.log("Click Connect → Session pooler → copy URI → set backend/.env DATABASE_URL");
