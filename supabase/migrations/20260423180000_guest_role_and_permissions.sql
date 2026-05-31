-- Add guest role + role-based permissions config.

-- Postgres may normalize CHECK (role in (...)) to "= ANY (ARRAY[...])", so do not match on "role in".
do $$
declare r record;
begin
	for r in
		select c.conname
		from pg_constraint c
		join pg_class t on t.oid = c.conrelid
		join pg_namespace n on n.oid = t.relnamespace
		where n.nspname = 'public'
		  and t.relname = 'app_users'
		  and c.contype = 'c'
	loop
		execute format('alter table public.app_users drop constraint %I', r.conname);
	end loop;
end $$;

alter table public.app_users
	add constraint app_users_role_check
	check (role in ('super_admin','admin','staff','guest'));

-- Default new users should be guest (backend provisions roles).
alter table public.app_users alter column role set default 'guest';

create table if not exists public.role_permissions (
	role text primary key,
	permissions jsonb not null,
	updated_at timestamptz not null default now()
);

insert into public.role_permissions (role, permissions)
values
	('guest', jsonb_build_object('vehicles:read', true)),
	('staff', jsonb_build_object('vehicles:read', true, 'vehicles:write', true)),
	('admin', jsonb_build_object('vehicles:read', true, 'vehicles:write', true, 'vehicles:delete', true, 'users:manage', true)),
	('super_admin', jsonb_build_object('vehicles:read', true, 'vehicles:write', true, 'vehicles:delete', true, 'users:manage', true, 'permissions:manage', true))
on conflict (role) do update set permissions = excluded.permissions, updated_at = now();
