# Hallowed Grounds Coffee Co. — Website

A custom, design-forward site for Hallowed Grounds Coffee Co. — South Jersey's
farm-to-table coffee company. Built to replace their Wix site with a cinematic,
"Sacred & Editorial" brand experience.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** — design tokens in `app/globals.css`
- **Framer Motion** — scroll reveals, parallax, hero text animation
- **Lenis** — smooth scrolling (auto-disabled for `prefers-reduced-motion`)
- **Resend + Zod** — form handling (catering, careers, newsletter)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Resend keys (optional in dev)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

In dev with no `RESEND_API_KEY`, form submissions are validated and **logged to
the console** instead of emailed — so everything is testable without secrets.

## Structure

- `app/` — routes (home, locations, menu, story, catering, shop, careers) + `api/` handlers
- `components/` — `layout/`, `ui/` primitives, `home/` sections, `forms/`
- `content/` — **all editable content** lives here as typed TS modules
  (locations, menu, story, catering, reviews, press, difference, site, nav)
- `lib/` — `validation.ts` (zod), `mailer.ts` (Resend), `schema.tsx` (JSON-LD)

To update menus, hours, reviews, or copy, edit the relevant file in `content/` —
no component changes needed. (Designed so a headless CMS can be layered on later.)

## ⚠ Before launch — confirm with client

Search the codebase for `⚠ CLIENT TO CONFIRM` for the full list. Key items:

- **Phone / email** — not published anywhere publicly (`content/site.ts`)
- **Menu items & prices** — current values are representative placeholders;
  extract real ones from their PDF menus (`content/menu.ts`)
- **Merchantville hours** — reconcile 6:30 vs 7:00 discrepancy (`content/locations.ts`)
- **Joe Coffee order URLs** + **gift-card provider URL** (`content/locations.ts`, `app/shop/page.tsx`)
- **Review quotes** — replace with verbatim Google/Yelp quotes (`content/reviews.ts`)
- **Catering packages / pricing** (`content/catering.ts`)
- **Photography** — replace Unsplash placeholders with real hi-res brand/location/food/team photos
- **Best of the Best 2025** — add the award link/source when available (`content/press.ts`)

## Deploy

Optimized for **Vercel**. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and
`CONTACT_FROM_EMAIL` env vars in the project settings. Update `site.url` in
`content/site.ts` to the final domain for correct sitemap/OG/schema URLs.
# HallowedGrounds
