import { z } from "zod";

const schema = z.object({
	VITE_API_URL: z.string().min(1).default("http://localhost:8080"),
	VITE_FIREBASE_API_KEY: z.string().min(1),
	VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
	VITE_FIREBASE_PROJECT_ID: z.string().min(1),
	VITE_FIREBASE_APP_ID: z.string().min(1),
});

export type FrontendEnv = z.infer<typeof schema>;

export function getEnv(): FrontendEnv {
	const parsed = schema.safeParse(import.meta.env);
	if (!parsed.success) {
		const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
		throw new Error(`Invalid environment: ${msg}`);
	}
	return parsed.data;
}

