import { describe, expect, it } from "vitest";

describe("getEnv", () => {
	it("parses when env is present", async () => {
		const { getEnv } = await import("./env");
		const env = getEnv();
		expect(env.VITE_API_URL).toBeTruthy();
		expect(env.VITE_FIREBASE_PROJECT_ID).toBeTruthy();
	});
});

