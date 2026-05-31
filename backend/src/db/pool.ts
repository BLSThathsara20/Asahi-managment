import "../app/loadEnv.js";
import pg from "pg";
import { getConfig } from "../app/config";

const { DATABASE_URL: connectionString } = getConfig();

export const pool = new pg.Pool({
	connectionString,
	ssl: { rejectUnauthorized: false },
});

