import cors from "cors";
import express from "express";
import { pool } from "../db/pool";
import { requireUser } from "../modules/auth/requireUser";
import { requireRole } from "../modules/auth/requireRole";
import { requirePermission } from "../modules/auth/requirePermission";
import { upsertMe } from "../modules/users/me";
import {
	createVehicle,
	deleteVehicle,
	listVehicles,
	updateVehicle,
} from "../modules/inventory/vehicles";
import { adminListUsers, adminUpdateUserRole } from "../modules/users/admin";
import {
	adminGetRolePermissions,
	adminSetRolePermissions,
} from "../modules/admin/permissions";
import {
	getAutotraderDealById,
	getAutotraderMessagesById,
	listAutotraderMessages,
	lookupAutotraderMessages,
	markAutotraderMessagesRead,
	sendAutotraderMessage,
} from "../modules/autotrader/messages";
import {
	getAutotraderStockById,
	listAutotraderStock,
} from "../modules/autotrader/stock";
import { asyncHandler } from "./asyncHandler";
import { getConfig } from "./config";
import { ApiError, dbUnavailableMessage, isDbConnectionError, isPgError } from "./errors";

export function createApp(env: NodeJS.ProcessEnv = process.env) {
	const app = express();
	const config = getConfig(env);
	const corsOrigin = config.CORS_ORIGIN;

	app.use(
		cors({
			origin: corsOrigin,
			credentials: false,
		}),
	);
	app.use(express.json({ limit: "1mb" }));

	app.use((req, _res, next) => {
		// eslint-disable-next-line no-console
		console.log(`${req.method} ${req.url}`);
		next();
	});

	app.get("/health", async (req, res) => {
		try {
			const { rows } = await pool.query("select 1 as ok");
			return res.json({ ok: rows[0].ok === 1 });
		} catch (e) {
			return res.status(500).json({ ok: false });
		}
	});

	app.post("/api/me", requireUser, asyncHandler(upsertMe));
	app.get(
		"/api/vehicles",
		requireUser,
		requirePermission("vehicles:read"),
		asyncHandler(listVehicles),
	);
	app.post(
		"/api/vehicles",
		requireUser,
		requirePermission("vehicles:write"),
		asyncHandler(createVehicle),
	);
	app.patch(
		"/api/vehicles/:id",
		requireUser,
		requirePermission("vehicles:write"),
		asyncHandler(updateVehicle),
	);
	app.delete(
		"/api/vehicles/:id",
		requireUser,
		requirePermission("vehicles:delete"),
		asyncHandler(deleteVehicle),
	);

	app.get(
		"/api/admin/users",
		requireUser,
		requirePermission("users:manage"),
		asyncHandler(adminListUsers),
	);
	app.patch(
		"/api/admin/users/:id",
		requireUser,
		requirePermission("users:manage"),
		asyncHandler(adminUpdateUserRole),
	);

	app.get(
		"/api/admin/role-permissions",
		requireUser,
		requirePermission("permissions:manage"),
		asyncHandler(adminGetRolePermissions),
	);
	app.put(
		"/api/admin/role-permissions",
		requireUser,
		requirePermission("permissions:manage"),
		asyncHandler(adminSetRolePermissions),
	);

	app.get(
		"/api/autotrader/stock",
		requireUser,
		requirePermission("vehicles:read"),
		asyncHandler(listAutotraderStock),
	);
	app.get(
		"/api/autotrader/stock/:stockId",
		requireUser,
		requirePermission("vehicles:read"),
		asyncHandler(getAutotraderStockById),
	);

	app.get(
		"/api/autotrader/messages/lookup",
		requireUser,
		requirePermission("vehicles:read"),
		asyncHandler(lookupAutotraderMessages),
	);
	app.get(
		"/api/autotrader/messages",
		requireUser,
		requirePermission("vehicles:read"),
		asyncHandler(listAutotraderMessages),
	);
	app.get(
		"/api/autotrader/deals/:dealId",
		requireUser,
		requirePermission("vehicles:read"),
		asyncHandler(getAutotraderDealById),
	);
	app.get(
		"/api/autotrader/messages/:messagesId",
		requireUser,
		requirePermission("vehicles:read"),
		asyncHandler(getAutotraderMessagesById),
	);
	app.patch(
		"/api/autotrader/messages/:messagesId/read",
		requireUser,
		requirePermission("vehicles:write"),
		asyncHandler(markAutotraderMessagesRead),
	);
	app.post(
		"/api/autotrader/messages/send",
		requireUser,
		requirePermission("vehicles:write"),
		asyncHandler(sendAutotraderMessage),
	);

	app.use((_req, res) => {
		res.status(404).json({
			error: { code: "not_found", message: "Route not found." },
		});
	});

	app.use(
		(
			err: unknown,
			_req: express.Request,
			res: express.Response,
			_next: express.NextFunction,
		) => {
			if (err instanceof ApiError) {
				return res.status(err.status).json({
					error: { code: err.code, message: err.message },
				});
			}

			// eslint-disable-next-line no-console
			console.error("Unhandled error:", err);

			if (isDbConnectionError(err)) {
				return res.status(503).json({
					error: { code: "db_unavailable", message: dbUnavailableMessage() },
				});
			}

			if (isPgError(err) && err.code === "42P01") {
				return res.status(503).json({
					error: {
						code: "db_not_ready",
						message:
							"Database tables are not ready yet. Run Supabase migrations, then retry.",
					},
				});
			}

			return res.status(500).json({
				error: {
					code: "internal_error",
					message: "Something went wrong. Please try again.",
				},
			});
		},
	);

	return app;
}

export function startServer() {
	const config = getConfig();
	const app = createApp(process.env);
	app.listen(config.PORT, () => {
		// eslint-disable-next-line no-console
		console.log(`Backend running on http://localhost:${config.PORT}`);
	});
}

