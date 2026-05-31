-- Add staff user management + remove anon access to vehicles.
-- Run in Supabase SQL editor.

create extension if not exists "pgcrypto";

-- Users (created/updated by backend after Firebase Google sign-in)
create table if not exists public.app_users (
	id uuid primary key default gen_random_uuid(),
	firebase_uid text not null unique,
	email text,
	display_name text,
	role text not null check (role in ('super_admin','admin','staff')) default 'staff',
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

-- Keep updated_at consistent
create or replace function public.set_updated_at()
returns trigger as $$
begin
	new.updated_at = now();
	return new;
end;
$$ language plpgsql;

drop trigger if exists app_users_updated_at on public.app_users;
create trigger app_users_updated_at
	before update on public.app_users
	for each row
	execute procedure public.set_updated_at();

alter table public.app_users enable row level security;

-- Lock down vehicles: remove anon policies created by initial migration (if present)
drop policy if exists "vehicles_select_anon" on public.vehicles;
drop policy if exists "vehicles_insert_anon" on public.vehicles;
drop policy if exists "vehicles_update_anon" on public.vehicles;
drop policy if exists "vehicles_delete_anon" on public.vehicles;

-- Optional: keep authenticated policies (if you later use Supabase auth)
-- (Backend connects as postgres and bypasses RLS anyway.)
