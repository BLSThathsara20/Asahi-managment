import "dotenv/config";
import fs from "node:fs";
import pg from "pg";
import { fileURLToPath } from "node:url";
import path from "node:path";

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error("DATABASE_URL missing in backend/.env");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });

const migrationsDir = fileURLToPath(
  new URL("../../../supabase/migrations", import.meta.url),
);
const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort()
  .map((f) => path.join(migrationsDir, f));

for (const f of files) {
  const sql = fs.readFileSync(f, "utf8");
  console.log("Applying", f);
  await pool.query(sql);
}

const { rows } = await pool.query(
  "select to_regclass('public.vehicles') as vehicles, to_regclass('public.app_users') as app_users",
);
console.log("Tables:", rows[0]);

await pool.end();
console.log("Done.");

