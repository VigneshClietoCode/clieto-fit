# Clieto Fit

A responsive gym-training portal with a Next.js web app and a separately deployable REST API service, plus tenant-scoped Super Admin, Gym Admin/Trainer, and Member experiences. The API is the authority for authentication, permissions, and gym ownership; clients never access Prisma or the database directly.

## Local setup

Requirements: npm and a Node.js version supported by Expo, as listed in
`apps/mobile/package.json`.

The repository is an npm workspace: the web app is in `apps/web`, the Expo
mobile app is in `apps/mobile`, the existing Next.js API is in `services/api`,
and shared auth contracts are in `packages/shared`.

1. Copy `.env.example` to `.env`. Set `SUPABASE_URL` to your Supabase PostgreSQL connection string, a random `SESSION_SECRET` of at least 32 characters, and a Super Admin email, name, and password (at least 12 characters). Configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (a sender verified in Resend), and `APP_URL` for Gym Admin welcome emails. Keep `.env` private.
2. From the project directory, run:

   ```powershell
   npm install
   npm run db:generate
   npm run db:deploy
   npm run db:seed
   ```

3. Start both the web app and API together:

   ```powershell
   npm run dev
   ```

   The web app runs at `http://localhost:3000` and the API at `http://localhost:3001`. Start `npm run dev:api` in one terminal first, then `npm run dev:web` in a second terminal; the web app requires the API to be ready. Alternatively, `npm run dev` starts both services together.

4. Visit `http://localhost:3000/login` and sign in to the **Super Admin** portal using the seed values from `.env`.
5. Create a gym in **Gyms & accounts**, then create its Admin account. Admins can add members, assign fees, and manage gym operations.

`npm run db:deploy` applies the committed PostgreSQL migrations; `npm run db:seed` is safe to repeat and sets the account password to the current environment value. Use a Supabase direct or session-pooler connection for migrations; transaction-pooler connections are not suitable for Prisma Migrate. Logo uploads are stored privately under `storage/logos`, which is excluded from Git.

## Mobile app

The separate Android and iOS Expo / React Native project is in [`apps/mobile`](./apps/mobile/README.md). Configure `EXPO_PUBLIC_API_URL` in `apps/mobile/.env` for the device or simulator, then run `npm run dev:mobile` from the repository root to start Expo on the LAN and generate an Expo Go QR code. The app uses the existing API and stores mobile bearer sessions with Expo SecureStore.

## Portals and capabilities

- **Super Admin:** create and suspend gyms and gym accounts, configure the allow-listed platform settings, review an audit trail for platform mutations, and manage support tickets from every gym.
- **Admin / Trainer:** manage members and fee assignments, training and diet plans, daily attendance, fee structures, manual payment records, offers, equipment, gym timezone, and a validated gym logo; submit and track their own support tickets.
- **Member:** view only their assigned plans, own attendance and payment history, assigned fee, enabled/in-date gym offers, and gym equipment; check in once per local gym day; update their own name and password; submit and track their own support tickets.

All data-bearing APIs enforce role, gym, and (for members) record ownership on the server. Login checks the selected portal against the stored role. Sessions use random opaque tokens stored as HMAC digests; web sessions use HTTP-only cookies and mobile sessions use bearer tokens. Cookie-authenticated mutations check the configured web origin. Passwords are bcrypt-hashed. Admin and Super Admin account creation requires a 12-character minimum password; the Super Admin bootstrap values are supplied only through environment variables.

Gym and member accounts can save an optional contact number when created, and members can manage it in their profile. A saved number is automatically attached to support tickets; if it is missing, the ticket form requires a number and saves it to the account.

Support tickets receive a reference number and are assigned to an active Super Admin. Requesters choose from Account & access, Billing & payments, Attendance, Training & diet, Equipment & facilities, App/technical, and Other categories; an optional subcategory; and Low/Medium/High priority. The ticket uses the contact number saved on the account; if none is saved, the requester must provide one when submitting, and it is saved to their account for future tickets. The number is included on the ticket for Super Admin follow-up. Requesters can describe the issue and follow its public updates. Super Admins can reprioritize tickets, move them through New, In Progress, On Hold, Resolved, and Closed, and record resolution notes. Ticket menu badges show the number of tickets updated since that user last opened the menu, and clear when the user opens it. Only the requester and Super Admins can view a ticket and its conversation.

## Explicit initial policies

- Attendance is unique per member, gym, and calendar date in the gym's configured IANA timezone. The database constraint prevents duplicate same-day check-ins even under concurrent requests.
- The payment dashboard counts active members with an active fee assignment. A member is paid for a `YYYY-MM` billing month only when the authoritative payment record is `PAID` and its amount covers the fee snapshot. Partial, refunded, overdue, and missing records count as unpaid. Members without an active fee are reported separately and excluded from paid/unpaid totals.
- Payment records are manually maintained; no payment gateway, collection, or settlement integration is included. Member reminders are in-app only.
- Offers apply to all members in a gym when enabled and within their configured date range.
- Ticket status transitions are controlled: New can move to In Progress, On Hold, or Resolved; active tickets can move between In Progress and On Hold before resolution; Resolved can be reopened or Closed; Closed is terminal. Resolution notes are required before resolving or closing.

## API outline

The standalone API service lives in `services/api`; run it with `npm run dev:api` and build it with `npm run api:build`. Interactive Swagger UI is available at `http://localhost:3001/`, with the OpenAPI document at `http://localhost:3001/openapi.json`. Its Prisma schema and migrations live under `services/api/prisma`. Browser requests use same-origin `/api/*` routes in the web app, which forward to the API origin configured by `API_INTERNAL_URL` (production: `https://api.clietofit.clietocode.com`). This keeps browser requests and session cookies on the web origin and avoids browser CORS failures. The API also allows credentialed cross-origin requests from `https://clietofit.clietocode.com` and `http://localhost:3000`; other origins receive no CORS permission. API responses are marked `no-store`. `SESSION_COOKIE_DOMAIN` is only needed if a session cookie must be shared across hostnames outside the web proxy flow.

For the Cloudflare web Worker, set the root directory to `apps/web`, the build command to `npx opennextjs-cloudflare build`, and the deploy command to `npx wrangler deploy`. Set `API_INTERNAL_URL` to the deployed API origin in the web app's Cloudflare environment.

The API also has a Cloudflare build configuration. Set its project root directory to `services/api`, build command to `npm run build:cloudflare`, and deploy command to `npm run deploy:cloudflare`. For production database access, create a Cloudflare Hyperdrive configuration for Supabase and bind it as `HYPERDRIVE` in `services/api/wrangler.jsonc`; keep the connection credentials inside Hyperdrive and never put them in Wrangler configuration or source control. The API uses that binding in Cloudflare Workers and uses local `SUPABASE_URL` for development and Prisma migrations. Set `SESSION_SECRET` as a Worker secret with `npx wrangler secret put SESSION_SECRET`. The API uses Prisma's JavaScript engine and PostgreSQL driver adapter for Cloudflare Workers. Before serving production traffic, migrate logo storage from the local filesystem to durable object storage.

For production Gym Admin email, set `RESEND_API_KEY` as an API Worker secret with `npx wrangler secret put RESEND_API_KEY`, and set `RESEND_FROM_EMAIL` as a Worker variable to an address verified in Resend. The API Worker uses `APP_URL` from `services/api/wrangler.jsonc` to build the `/login` link.

- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- Mobile clients can send `"client": "mobile"` to the login endpoint to receive a bearer session token; include it as `Authorization: Bearer <token>` on subsequent requests and call logout to revoke it. Keep tokens in the platform's secure storage.
- `GET /api/health` (service and database readiness)
- `GET /api/portal`
- `GET /api/records/{members|training|diets|attendance|fees|payments|offers|equipment}`
- `POST /api/records/{resource}`, `PATCH|DELETE /api/records/{resource}/{id}`
- `GET|POST|PATCH /api/platform` (Super Admin only)
- `GET|POST /api/tickets`, `GET /api/tickets/notifications`, `PATCH /api/tickets/{id}` (Gym Admins and members can create and comment on their own tickets; Super Admins can manage all tickets)
- `GET|PATCH /api/gym` (Admin only)
- `PUT|DELETE /api/branding`, `GET /api/branding/{gymId}`
- `PATCH /api/account` (the signed-in account only)

Every mutating route validates its input, checks the configured web origin for cookie-authenticated requests, and uses the authenticated principal's role and gym rather than trusting client-supplied ownership. Logo uploads accept PNG/JPEG/WebP content up to 2 MB, derive the extension from file bytes, and are served through an authenticated, tenant-checked endpoint. Configure persistent `LOGO_STORAGE_DIR` storage for deployed API instances.

For Cloudflare requests, every database-backed API route uses a request-scoped Prisma client and closes it before returning. Do not move the Worker database client to a module-level singleton; the web app remains database-free and communicates with the API over HTTP.

## Supabase PostgreSQL

Prisma connects to Supabase PostgreSQL using `SUPABASE_URL` from the root `.env`. Run `npm run db:deploy` to create the tables in a new, empty Supabase database, then run `npm run db:seed` to create the Super Admin. Configure `API_INTERNAL_URL` on the web app at build time, and configure `SESSION_SECRET` and `SUPABASE_URL` on the API. For custom web and API subdomains on the same domain, set `SESSION_COOKIE_DOMAIN` to their shared parent domain. Changing the provider does not transfer data from an existing SQLite database; move any data you need with a deliberate export/import and reconciliation plan. Keep Supabase credentials on the server and use a least-privilege database role.

## Verification

```powershell
npm run typecheck
npm run api:typecheck
npm run lint
npm test
npm run build
npm run api:build
npm audit
```

The focused automated tests cover gym-timezone day/month boundaries and the full-payment rule. They are not a substitute for end-to-end testing against a production deployment. The login rate limiter is process-local and intended for this local-first baseline; use a shared rate-limit store for multi-instance deployment. Production also requires HTTPS, managed secrets, durable private logo storage, backups, monitoring, Super Admin MFA, and a deployment-specific review of proxy/origin configuration and access policy.
