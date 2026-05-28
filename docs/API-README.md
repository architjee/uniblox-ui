# Uniblox Assignment — Ecommerce API

A TypeScript ecommerce backend with cart, checkout, coupon discounts, and admin analytics. Built with Hono, Drizzle ORM, SQLite, and Better Auth.

## Tech Stack

- **Framework:** [Hono](https://hono.dev) + [zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- **Database:** SQLite via [libSQL/Turso](https://turso.tech) + [Drizzle ORM](https://orm.drizzle.team)
- **Auth:** [Better Auth](https://www.better-auth.com) with drizzle adapter
- **API Docs:** [Scalar](https://scalar.com) at `/reference`
- **Tests:** [Vitest](https://vitest.dev)

## Quick Start

```bash
# 1. Clone and enter
git clone <repo-url>
cd uniblox-assignment

# 2. Environment
cp .env.example .env
# Edit .env if needed (defaults work out of the box)

# 3. Install
npm install

# 4. Create database and push schema
npm run db:push

# 5. Start dev server
npm run dev
```

Open `http://localhost:8080/reference` for the interactive API reference.

## Testing

```bash
npm test
```

Uses an ephemeral SQLite database at `/tmp/uniblox-test.sqlite` — automatically created, migrated, and discarded. Your development `mydb.sqlite` is never touched.

## Pre-seeded Accounts

On startup, the server creates two test accounts:

| Role  | Email              | Password   |
|-------|--------------------|------------|
| User  | `test@test.com`    | `Test@123` |
| Admin | `admintest@test.com` | `Test@123` |

Use these payloads directly in the Scalar UI at `/reference` → Auth module → `POST /api/auth/sign-in/email`:

**User login:**
```json
{
  "email": "test@test.com",
  "password": "Test@123",
  "callbackURL": "",
  "rememberMe": true
}
```

**Admin login:**
```json
{
  "email": "admintest@test.com",
  "password": "Test@123",
  "callbackURL": "",
  "rememberMe": true
}
```

## Available Scripts

| Command                | Description                              |
|------------------------|------------------------------------------|
| `npm run dev`          | Start dev server with hot reload         |
| `npm test`             | Run all tests (ephemeral DB)             |
| `npm run build`        | TypeScript compile + path aliases        |
| `npm run db:push`      | Push schema to database          |
| `npm run db:generate`  | Generate SQL migration files             |
| `npm run db:migrate`   | Run pending migrations                   |

## Project Structure

```
src/
├── db/
│   ├── schema/          # table definitions
│   │   ├── auth-schema.ts
│   │   ├── carts.ts, orders.ts, coupons.ts, rewards.ts, inventory.ts
│   │   ├── _timestamps.ts  # Reusable timestamp columns
│   │   └── index.ts
│   ├── index.ts         # DB client singleton
│   └── seed.ts          # Inventory + user seeding
├── routes/
│   ├── cart/
│   │   ├── get.ts       # GET /cart
│   │   ├── add.ts       # POST /cart/add
│   │   ├── checkout.ts  # POST /cart/checkout (transaction)
│   │   ├── types.ts
│   │   └── test-helpers.ts
│   ├── user/
│   │   └── orders.ts    # GET /user/orders
│   ├── admin/
│   │   ├── orders.ts    # GET /admin/orders (cursor pagination)
│   │   ├── rewards.ts   # GET /admin/rewards
│   │   ├── coupons.ts   # GET /admin/coupons, POST /admin/rewards/:id/generate
│   │   └── analytics.ts # GET /admin/analytics
│   ├── products.ts      # GET /products
│   ├── cart.test.ts
│   ├── admin.test.ts
│   └── products.test.ts
├── middleware/
│   └── auth.ts
├── lib/
│   └── auth.ts          # Better Auth config
├── index.ts             # App entry, route mounting, seed
├── env.ts               # Env validation
└── config.ts            # App constants (REWARDS_PER_ORDER, etc.)
test/
└── globalSetup.ts       # Ephemeral DB setup for tests
```

## Design Decisions

See [`docs/DECISIONS.md`](./docs/DECISIONS.md) for detailed rationale on stack choices, transaction strategy, coupon flow, and more.

## API Overview

- **`GET /cart`** — Fetch current user's cart
- **`POST /cart/add`** — Add item to cart (upserts by user)
- **`POST /cart/checkout`** — Place order with optional coupon code
- **`GET /products`** — List available products
- **`GET /user/orders`** — Current user's order history
- **Admin** (requires admin cookie):
  - `GET /admin/orders` — Paginated orders
  - `GET /admin/coupons` — All coupons
  - `GET /admin/rewards` — All reward candidates
  - `POST /admin/rewards/:id/generate` — Approve reward, create coupon
  - `GET /admin/analytics` — Items sold, revenue, discounts given

Full interactive docs at `http://localhost:8080/reference`.
Similar to swagger, use top left dropdown to switch between Auth and API modules.
Generate toekn via /sign-in/email​, use it for rest of store APIs


**Hosted versions:**
- UI: https://uniblox-store.web.app

- API: https://uniblox-341902256486.asia-south1.run.app
- API reference: https://uniblox-341902256486.asia-south1.run.app/reference

- UI Github - https://github.com/architjee/uniblox-ui