import { describe, expect, it, vi } from "vitest";
import request from "supertest";

// Mock auth middleware so we can test routes without Firebase.
vi.mock("../modules/auth/requireUser", () => ({
	requireUser: (req: any, _res: any, next: any) => {
		req.user = { uid: "test", email: "t@example.com", name: "T", picture: null };
		next();
	},
}));

vi.mock("../modules/auth/requireRole", () => ({
	requireRole: () => (_req: any, _res: any, next: any) => next(),
}));

// Mock DB pool used by /health.
vi.mock("../db/pool", () => ({
	pool: { query: async () => ({ rows: [{ ok: 1 }] }) },
}));

// Mock route handlers we don't care about here.
vi.mock("../modules/users/me", () => ({ upsertMe: (_r: any, res: any) => res.json({ ok: true }) }));
vi.mock("../modules/inventory/vehicles", () => ({
	listVehicles: (_r: any, res: any) => res.json({ vehicles: [] }),
	createVehicle: (_r: any, res: any) => res.status(201).json({ id: "v1" }),
	updateVehicle: (_r: any, res: any) => res.json({ ok: true }),
	deleteVehicle: (_r: any, res: any) => res.json({ ok: true }),
}));
vi.mock("../modules/users/admin", () => ({
	adminListUsers: (_r: any, res: any) => res.json({ users: [] }),
	adminUpdateUserRole: (_r: any, res: any) => res.json({ user: { id: "u1" } }),
}));

import { createApp } from "./server";

describe("backend routes", () => {
	it("GET /health returns ok", async () => {
		const app = createApp({
			PORT: "8080",
			CORS_ORIGIN: "http://localhost:5173",
			DATABASE_URL: "postgresql://example",
			FIREBASE_SERVICE_ACCOUNT_PATH: "/tmp/sa.json",
		} as any);
		const res = await request(app).get("/health");
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ ok: true });
	});
});

