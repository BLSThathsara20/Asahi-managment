# Asahi — Car stock management (UK)

This repo has:

- `frontend/`: React + Vite + Tailwind (light/dark theme) + Google Sign-In (Firebase)
- `backend/`: Node.js (Express) API + Firebase Admin token verification + Postgres (Supabase)
- `supabase/migrations/`: SQL to create tables (vehicles + users) and lock down anon access

## Prerequisites

- Node.js 20+ (you have Node 22)
- A Supabase project
- A Firebase project (for Google Sign-In)

## 1) Supabase setup (database)

1. Supabase Dashboard → **SQL Editor**
2. Run these files, in order:

- `supabase/migrations/20250421120000_init_stock.sql`
- `supabase/migrations/20260423140000_users_and_lockdown.sql`

Notes:
- The second migration removes anon policies from `vehicles` (browser should not talk to DB).
- Backend connects to Postgres using the **Pooler** host for IPv4 networks.

## 2) Firebase setup (Google login)

### Client (frontend)

1. Firebase Console → **Authentication → Sign-in method**
2. Enable **Google**
3. Firebase Console → **Project settings → Your apps → Web app**
4. Copy the web config values into `frontend/.env.local` (see below)

### Server (backend)

1. Firebase Console → **Project settings → Service accounts**
2. Create a **new private key** (JSON) and save it locally (do not commit it)
3. Point `FIREBASE_SERVICE_ACCOUNT_PATH` to the JSON file

## 3) Configure environment files

### Backend

Copy example:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
- Set `DATABASE_URL` to the Supabase **Shared Pooler / Session pooler** connection string
  - URL-encode special characters in the password (`&` → `%26`)
- Set `FIREBASE_SERVICE_ACCOUNT_PATH` to your downloaded Firebase service account JSON

### Frontend

Copy example:

```bash
cp frontend/.env.example frontend/.env.local
```

Edit `frontend/.env.local`:
- Set `VITE_API_URL=http://localhost:8080`
- Set `VITE_FIREBASE_*` values from Firebase web config

## 4) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

## 5) Run (dev)

### Start backend

```bash
cd backend
npm run dev
```

Backend endpoints:
- `GET /health`
- `POST /api/me` (requires `Authorization: Bearer <Firebase ID token>`)
- `GET /api/vehicles` (requires auth)

### Start frontend

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`.

## User management rules

- On first successful sign-in, the backend creates the first row in `public.app_users` with role **`super_admin`**.
- Every later sign-in is created as **`staff`** by default.

You can change roles directly in the DB for now (until we build an admin UI).

## Security notes (important)

- Do not commit `backend/.env`, `frontend/.env.local`, or Firebase service-account JSON.
- Rotate any secrets that were pasted into chat earlier.
- Browser does **not** connect to Supabase DB directly; all DB access goes through backend.

