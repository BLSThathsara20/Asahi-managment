-- Asahi car stock (UK dealership). Run via Supabase SQL Editor or `supabase db push`.
-- DEV NOTE: anon policies are permissive for prototyping. Replace with auth-scoped
-- policies (e.g. authenticated staff only) before production.

create extension if not exists "pgcrypto";

-- Structured inventory (separate from CRM "vehicle interest" free-text on leads).

create type public.vehicle_stock_status as enum (
	'in_stock',
	'reserved',
	'sold',
	'withdrawn'
);

create table public.vehicles (
	id uuid primary key default gen_random_uuid(),
	stock_code text unique,
	registration text,
	vin text unique,
	make text not null,
	model text not null,
	trim text,
	year int not null check (year >= 1900 and year <= 2100),
	mileage_miles int not null default 0 check (mileage_miles >= 0),
	fuel_type text,
	transmission text,
	body_type text,
	colour_exterior text,
	colour_interior text,
	price_gbp numeric(12, 2) check (price_gbp is null or price_gbp >= 0),
	status public.vehicle_stock_status not null default 'in_stock',
	notes text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create index vehicles_registration_idx on public.vehicles (registration)
	where registration is not null;
create index vehicles_make_model_idx on public.vehicles (make, model);
create index vehicles_status_idx on public.vehicles (status);

create or replace function public.set_updated_at()
returns trigger as $$
begin
	new.updated_at = now();
	return new;
end;
$$ language plpgsql;

create trigger vehicles_updated_at
	before update on public.vehicles
	for each row
	execute procedure public.set_updated_at();

alter table public.vehicles enable row level security;

-- Prototype: allow anon CRUD so the Vite app can use the public anon key without auth.
-- Remove these and use signed-in users + tighter policies when you add authentication.

create policy "vehicles_select_anon"
	on public.vehicles for select
	to anon
	using (true);

create policy "vehicles_insert_anon"
	on public.vehicles for insert
	to anon
	with check (true);

create policy "vehicles_update_anon"
	on public.vehicles for update
	to anon
	using (true)
	with check (true);

create policy "vehicles_delete_anon"
	on public.vehicles for delete
	to anon
	using (true);

create policy "vehicles_select_authenticated"
	on public.vehicles for select
	to authenticated
	using (true);

create policy "vehicles_write_authenticated"
	on public.vehicles for insert
	to authenticated
	with check (true);

create policy "vehicles_update_authenticated"
	on public.vehicles for update
	to authenticated
	using (true)
	with check (true);

create policy "vehicles_delete_authenticated"
	on public.vehicles for delete
	to authenticated
	using (true);
