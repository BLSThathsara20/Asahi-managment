import { z } from "zod";

const schema = z.object({
	PORT: z.coerce.number().int().positive().default(8080),
	CORS_ORIGIN: z.string().min(1).default("http://localhost:5173"),
	DATABASE_URL: z.string().min(1),
	FIREBASE_SERVICE_ACCOUNT_PATH: z.string().min(1).optional(),
	FIREBASE_SERVICE_ACCOUNT_JSON: z.string().min(1).optional(),
});

export type AppConfig = z.infer<typeof schema>;

export function getConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
	const parsed = schema.safeParse(env);
	if (!parsed.success) {
		const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
		throw new Error(`Invalid environment: ${msg}`);
	}
	if (!parsed.data.FIREBASE_SERVICE_ACCOUNT_PATH && !parsed.data.FIREBASE_SERVICE_ACCOUNT_JSON) {
		throw new Error(
			"Invalid environment: set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON",
		);
	}
	return parsed.data;
}

