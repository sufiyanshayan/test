# SHIKHA — Kebab chain platform (Phase 1)

Scope of this pass: **Home page** (fully built, localized, themed) and the **Admin panel foundation** (auth-gated layout, sidebar, dashboard). This is the base the rest of the platform (menu, orders, branches CMS, etc.) gets built on top of next.

## What's included

- Next.js 15 / React 19 / TypeScript / Tailwind app router project
- Locale routing for `en`, `pl`, `bn` with cookie-persisted preference (`middleware.ts`)
- Light / dark / system theme, persisted (`next-themes`)
- Full home page: hero, featured foods, branches preview, why-choose-us, testimonials, FAQ
- Admin foundation: `/admin/login`, session + role guard (`app/admin/(protected)/layout.tsx`), sidebar scoped by role, dashboard with live order/revenue queries (falls back to placeholder data until the schema is seeded)
- `supabase/schema.sql` — the minimum tables (`staff`, `branches`, `orders`) with RLS needed for the above to run

## What's intentionally not built yet

Menu page, branches directory, about/contact pages, cart & checkout, reservations, order tracking, the remaining ~25 admin management screens, full DB schema (categories, foods, coupons, reviews, reservations, delivery zones), PWA/push notifications, and SEO/sitemap wiring. Nav links to these routes exist and 404 until built — that's expected at this stage.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + keys
# in the Supabase SQL editor, run supabase/schema.sql
npm run dev
```

To create your first admin user: sign the user up via Supabase Auth (dashboard or `supabase.auth.admin.createUser`), then insert a matching row into `staff` with `role = 'admin'`.

## Design system

- **Palette**: charcoal `#17140F` (dark base), bone `#F3EEE2` (light base), saffron `#E3A21A` (primary accent), ember `#C4341F` (CTAs/prices), teal `#0F3D3E` (status/tags)
- **Type**: Fraunces (display), Public Sans (body, full Polish diacritic support), IBM Plex Mono (prices, calories, timestamps — the "ticket" voice)
- **Signature motif**: the diagonal "cut" — section dividers and headline reveals use a shave-line clip-path instead of straight or wave edges, echoing meat cut fresh from the spit
