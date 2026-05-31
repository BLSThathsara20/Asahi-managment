import "dotenv/config";
import admin, { type ServiceAccount } from "firebase-admin";
import fs from "node:fs";

let app: admin.app.App | null = null;

function init() {
	if (app) return app;

	const jsonFromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
	const pathFromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();

	if (jsonFromEnv) {
		const creds = JSON.parse(jsonFromEnv) as ServiceAccount;
		app = admin.initializeApp({
			credential: admin.credential.cert(creds),
		});
		return app;
	}

	if (pathFromEnv) {
		const raw = fs.readFileSync(pathFromEnv, "utf8");
		const creds = JSON.parse(raw) as ServiceAccount;
		app = admin.initializeApp({
			credential: admin.credential.cert(creds),
		});
		return app;
	}

	throw new Error(
		"Missing Firebase admin credentials. Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON in backend/.env.",
	);
}

export function getFirebaseAdminApp() {
	return init();
}

export async function verifyIdToken(idToken: string) {
	const firebaseApp = init();
	const auth = admin.auth(firebaseApp);
	return await auth.verifyIdToken(idToken);
}

