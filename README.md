# Uniblox Store UI

Vue 3 storefront for the Uniblox ecommerce API.

## Tech Stack

- **Framework:** Vue 3 + TypeScript + Vite
- **UI:** Tailwind CSS 4 + shadcn-vue components
- **State:** Pinia (auth only) + persisted state
- **HTTP:** Axios (Bearer token)

## Setup

```bash
bun install
```

## Environment

Create `.env` in the project root:

```
VITE_API_BASE_URL=https://uniblox-341902256486.asia-south1.run.app
```

If not set, it defaults to the above URL.

## Dev

```bash
bun run dev
```

## Build

```bash
bun run build
```

## Pages

| Path             | View                                | Auth   |
| ---------------- | ----------------------------------- | ------ |
| `/`              | Products — browse and add to cart   | Public |
| `/login`         | Sign in                             | Public |
| `/signup`        | Create account                      | Public |
| `/cart`          | View cart, apply coupon, checkout   | User   |
| `/orders`        | Order history                       | User   |
| `/admin`         | Analytics dashboard                 | Admin  |
| `/admin/orders`  | All orders (paginated)              | Admin  |
| `/admin/rewards` | Reward candidates, generate coupons | Admin  |
| `/admin/coupons` | All generated coupons               | Admin  |

## Pre-seeded Accounts

| Role  | Email                | Password   |
| ----- | -------------------- | ---------- |
| User  | `test@test.com`      | `Test@123` |
| Admin | `admintest@test.com` | `Test@123` |
