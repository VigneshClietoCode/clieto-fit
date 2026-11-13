# Clieto Fit

A responsive gym-training portal with a shared Next.js API, tenant-scoped Super Admin, Gym Admin/Trainer, and Member experiences. The API is the authority for authentication, permissions, and gym ownership; clients never access Prisma or the database directly.

## Local setup

Requirements: Node.js 20.9 or newer and npm.

1. Copy `.env.example` to `.env`. Set a random `SESSION_SECRET` of at least 32 characters and choose a Super Admin email, name, and password (at least 12 characters). Keep `.env` private.
2. From the project directory, run:

   ```powershell
   npm install
   npm run db:generate
   npm run db:migrate -- --name init
   npm run db:seed
   npm run dev
   ```

3. Visit `http://localhost:3000/login` and sign in to the **Super Admin** portal using the seed values from `.env`.
4. Create a gym in **Gyms & accounts**, then create its Admin account. Admins can add members, assign fees, and manage gym operations.

`prisma migrate dev` may run the configured Super Admin seed after applying migrations; `npm run db:seed` is safe to repeat and sets the account password to the current environment value. The initial database is SQLite at `prisma/dev.db`. Logo uploads are stored privately under `storage/logos`; both locations are excluded from Git. Back up these files together for a local backup.

## Portals and capabilities

- **Super Admin:** create and suspend gyms and gym accounts, configure the allow-listed platform settings, and review an audit trail for platform mutations. Member health plans and payment records are not included in platform summaries.
- **Admin / Trainer:** manage members and fee assignments, training and diet plans, daily attendance, fee structures, manual payment records, offers, equipment, gym timezone, and a validated gym logo.
- **Member:** view only their assigned plans, own attendance and payment history, assigned fee, enabled/in-date gym offers, and gym equipment; check in once per local gym day; update their own name and password.

All data-bearing APIs enforce role, gym, and (for members) record ownership on the server. Login checks the selected portal against the stored role. Sessions use random opaque tokens stored as HMAC digests, HTTP-only cookies, and same-origin checks for mutations. Passwords are bcrypt-hashed. Admin and Super Admin account creation requires a 12-character minimum password; the Super Admin bootstrap values are supplied only through environment variables.

## Explicit initial policies

- Attendance is unique per member, gym, and calendar date in the gym's configured IANA timezone. The database constraint prevents duplicate same-day check-ins even under concurrent requests.
- The payment dashboard counts active members with an active fee assignment. A member is paid for a `YYYY-MM` billing month only when the authoritative payment record is `PAID` and its amount covers the fee snapshot. Partial, refunded, overdue, and missing records count as unpaid. Members without an active fee are reported separately and excluded from paid/unpaid totals.
- Payment records are manually maintained; no payment gateway, collection, or settlement integration is included. Member reminders are in-app only.
- Offers apply to all members in a gym when enabled and within their configured date range.

## API outline

- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/portal`
- `GET /api/records/{members|training|diets|attendance|fees|payments|offers|equipment}`
- `POST /api/records/{resource}`, `PATCH|DELETE /api/records/{resource}/{id}`
- `GET|POST|PATCH /api/platform` (Super Admin only)
- `GET|PATCH /api/gym` (Admin only)
- `PUT|DELETE /api/branding`, `GET /api/branding/{gymId}`
- `PATCH /api/account` (the signed-in account only)

Every mutating route validates its input, checks the request origin, and uses the authenticated principal's role and gym rather than trusting client-supplied ownership. Logo uploads accept PNG/JPEG/WebP content up to 2 MB, derive the extension from file bytes, and are served through an authenticated, tenant-checked endpoint.

## Supabase PostgreSQL migration path

The Prisma models use portable scalar types, string-backed role/status values, and Prisma-managed IDs. For a new PostgreSQL environment, change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`, set `DATABASE_URL` to the Supabase PostgreSQL connection string, generate a PostgreSQL migration with Prisma, and deploy it using `npm run db:deploy`. Move existing SQLite data with a deliberate export/import and reconciliation plan; changing the provider does not transfer local data. Keep Supabase credentials on the server and use a least-privilege database role.

## Verification

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm audit
```

The focused automated tests cover gym-timezone day/month boundaries and the full-payment rule. They are not a substitute for end-to-end testing against a production deployment. The login rate limiter is process-local and intended for this local-first baseline; use a shared rate-limit store for multi-instance deployment. Production also requires HTTPS, managed secrets, durable private logo storage, backups, monitoring, Super Admin MFA, and a deployment-specific review of proxy/origin configuration and access policy.
