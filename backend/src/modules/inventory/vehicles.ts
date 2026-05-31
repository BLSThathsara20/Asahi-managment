import type { Request, Response } from "express";
import { pool } from "../../db/pool";
import { ApiError } from "../../app/errors";

export async function listVehicles(req: Request, res: Response) {
	const limitRaw = Number(req.query.limit ?? 25);
	const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 50) : 25;

	const cursor = typeof req.query.cursor === "string" ? req.query.cursor : null;
	let cursorCreatedAt: string | null = null;
	let cursorId: string | null = null;

	if (cursor) {
		try {
			const decoded = JSON.parse(
				Buffer.from(cursor, "base64url").toString("utf8"),
			) as { created_at?: string; id?: string };
			cursorCreatedAt = decoded.created_at ?? null;
			cursorId = decoded.id ?? null;
		} catch {
			throw new ApiError("invalid_payload", "Invalid cursor.", 400);
		}
	}

	const params: unknown[] = [];
	let where = "";
	if (cursorCreatedAt && cursorId) {
		params.push(cursorCreatedAt, cursorId);
		where =
			"where (created_at, id) < ($1::timestamptz, $2::uuid)";
	}
	params.push(limit + 1);

	const { rows } = await pool.query(
		`select id, stock_code, registration, vin, make, model, trim, year,
		        mileage_miles, fuel_type, transmission, body_type, colour_exterior,
		        colour_interior, price_gbp, status, notes, created_at, updated_at
		   from public.vehicles
		   ${where}
		  order by created_at desc, id desc
		  limit $${params.length}`,
		params,
	);

	const hasMore = rows.length > limit;
	const page = rows.slice(0, limit);
	const last = page[page.length - 1];
	const nextCursor =
		hasMore && last
			? Buffer.from(
					JSON.stringify({ created_at: last.created_at, id: last.id }),
				).toString("base64url")
			: null;

	return res.json({ vehicles: page, nextCursor });
}

export async function createVehicle(req: Request, res: Response) {
	const b = req.body ?? {};
	const make = String(b.make || "").trim();
	const model = String(b.model || "").trim();
	const year = Number(b.year);

	if (!make || !model || !Number.isFinite(year)) {
		throw new ApiError(
			"invalid_payload",
			"Please provide make, model, and year.",
			400,
		);
	}

	const fields = {
		stock_code: b.stock_code ?? null,
		registration: b.registration ?? null,
		vin: b.vin ?? null,
		make,
		model,
		trim: b.trim ?? null,
		year,
		mileage_miles: Number(b.mileage_miles ?? 0),
		fuel_type: b.fuel_type ?? null,
		transmission: b.transmission ?? null,
		body_type: b.body_type ?? null,
		colour_exterior: b.colour_exterior ?? null,
		colour_interior: b.colour_interior ?? null,
		price_gbp: b.price_gbp ?? null,
		status: b.status ?? "in_stock",
		notes: b.notes ?? null,
	};

	const { rows } = await pool.query(
		`insert into public.vehicles
		 (stock_code, registration, vin, make, model, trim, year, mileage_miles,
		  fuel_type, transmission, body_type, colour_exterior, colour_interior,
		  price_gbp, status, notes)
		 values
		 ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
		 returning id`,
		[
			fields.stock_code,
			fields.registration,
			fields.vin,
			fields.make,
			fields.model,
			fields.trim,
			fields.year,
			fields.mileage_miles,
			fields.fuel_type,
			fields.transmission,
			fields.body_type,
			fields.colour_exterior,
			fields.colour_interior,
			fields.price_gbp,
			fields.status,
			fields.notes,
		],
	);

	return res.status(201).json({ id: rows[0].id });
}

export async function updateVehicle(req: Request, res: Response) {
	const id = String(req.params.id || "");
	if (!id) throw new ApiError("missing_id", "Missing vehicle id.", 400);

	const b = req.body ?? {};
	const make = b.make != null ? String(b.make).trim() : undefined;
	const model = b.model != null ? String(b.model).trim() : undefined;
	const year = b.year != null ? Number(b.year) : undefined;

	if (make !== undefined && !make)
		throw new ApiError("invalid_payload", "Invalid make.", 400);
	if (model !== undefined && !model)
		throw new ApiError("invalid_payload", "Invalid model.", 400);
	if (year !== undefined && !Number.isFinite(year))
		throw new ApiError("invalid_payload", "Invalid year.", 400);

	const patch = {
		stock_code: b.stock_code,
		registration: b.registration,
		vin: b.vin,
		make,
		model,
		trim: b.trim,
		year,
		mileage_miles: b.mileage_miles != null ? Number(b.mileage_miles) : undefined,
		fuel_type: b.fuel_type,
		transmission: b.transmission,
		body_type: b.body_type,
		colour_exterior: b.colour_exterior,
		colour_interior: b.colour_interior,
		price_gbp: b.price_gbp,
		status: b.status,
		notes: b.notes,
	};

	const columns = Object.entries(patch).filter(([, v]) => v !== undefined);
	if (columns.length === 0)
		throw new ApiError("invalid_payload", "No fields to update.", 400);

	const sets: string[] = [];
	const values: unknown[] = [id];
	for (let i = 0; i < columns.length; i++) {
		sets.push(`${columns[i][0]} = $${i + 2}`);
		values.push(columns[i][1]);
	}

	const { rowCount } = await pool.query(
		`update public.vehicles set ${sets.join(", ")}, updated_at = now() where id = $1`,
		values,
	);

	if (!rowCount) throw new ApiError("not_found", "Vehicle not found.", 404);
	return res.json({ ok: true });
}

export async function deleteVehicle(req: Request, res: Response) {
	const id = String(req.params.id || "");
	if (!id) throw new ApiError("missing_id", "Missing vehicle id.", 400);

	const { rowCount } = await pool.query(`delete from public.vehicles where id = $1`, [
		id,
	]);
	if (!rowCount) throw new ApiError("not_found", "Vehicle not found.", 404);
	return res.json({ ok: true });
}

