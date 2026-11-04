# KubeTEE

KubeTEE is Bittensor subnet 90 (SN90): a confidential AI factory that runs inference and AI workloads inside hardware-secured Trusted Execution Environments. This repository is the KubeTEE website: the public landing page and the SN28 → SN90 alpha recycle dashboard.

## Pages

- `/` — landing page: what KubeTEE is, how it is built, how a request reaches an attested guest, live services, roadmap, and FAQ.
- `/dashboard` — evidence-first SN28 → SN90 recycle ledger: lifetime metrics, a 30-day chart, every fill with its extrinsic, and the SN28 operator panel.
- `/dashboard.json` — the same committed snapshot the dashboard renders, served as JSON.
- `/manifest.webmanifest` — app manifest; install is offered in the footer when the browser supports it.

## Stack

- Next.js 16.4.3 (App Router, Turbopack, Cache Components)
- React 19.3 and React Compiler
- Tailwind CSS 4 via `@tailwindcss/turbopack`
- Anime.js 4.5 for the hero cube and pipeline motion
- Biome for linting and formatting
- pnpm 12

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint       # biome check
pnpm format     # biome format --write
```

## Environment

Copy `.env.example` to `.env.local` and set the public origin:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

`NEXT_PUBLIC_SITE_URL` drives metadata base, canonical URLs, Open Graph URLs, JSON-LD IDs, and the sitemap. Use the final HTTPS origin for production.

Add the TaoStats key for dashboard refreshes:

```bash
TAOSTATS_API_KEY=...
```

`pnpm dashboard:data` reads `.env.local` and then `.env`, without overriding values already set in the shell. Never commit either file; `.env*` is ignored except `.env.example`.

## Scripts

```bash
pnpm dashboard:data    # fetch a fresh snapshot from TaoStats
pnpm dashboard:check   # validate the snapshot, windows, totals, and public copy
pnpm build             # production build
pnpm start             # serve the production build
```

`dashboard:data` writes both `src/data/dashboard.json` (build input) and `public/dashboard.json` (the public `/dashboard.json` copy). The script refuses to publish a malformed or unreconciled snapshot.

## Dashboard data

The dashboard is statically rendered; it imports the committed JSON at build time and never calls the API at request time.

- The 30-day window is 30 UTC calendar days ending on the latest fill day. The KPI and chart use the same window; the comparison is the immediately preceding 30 days.
- USD values are TaoStats market estimates for the swaps, not audited fiat revenue. Recycling is periodic, not necessarily daily.
- Every fill links to its extrinsic. Totals are recomputed from the fills.
- The public JSON is site-owned and matches the rendered snapshot; `dashboard:check` fails if the two files drift.

To refresh before deploying:

```bash
pnpm dashboard:data
pnpm dashboard:check
```

## Structure

```text
src/app/                 routes, metadata routes, manifest, 404
src/app/dashboard/       SN28 → SN90 recycle dashboard
src/components/dashboard/ metrics, chart, daily values, ledger, operator
src/components/layout/   header, footer, mobile navigation
src/components/motion/   hero and architecture timelines
src/components/pwa/      install control and service-worker registration
src/components/sections/ landing sections
src/components/seo/      JSON-LD wrapper
src/components/ui/       shared primitives
src/components/visuals/  inline SVG visuals
src/content/             site and dashboard copy, links, labels
src/data/                committed dashboard snapshot
src/lib/                 dashboard derivations, metadata, structured data
scripts/                 fetch and validation scripts
public/                  icons, OG images, manifest assets, sw.js, llms.txt
```

## SEO and app metadata

- Per-route canonicals, Open Graph, and Twitter metadata.
- JSON-LD: Organization, WebSite, Service, and WebPage on `/`; Organization, WebSite, WebPage, BreadcrumbList, and Dataset on `/dashboard`. No FAQPage markup.
- `robots.txt` allows crawling; `sitemap.xml` lists both pages; the 404 is `noindex`.
- `public/llms.txt` summarizes the entity, pages, docs, and machine-readable data.
- Security headers and a report-only CSP are set in `next.config.ts`.
- The PWA manifest uses the KubeTEE stage color (`#27282a`) and the icons in `public/brand/`. A minimal service worker keeps the app installable without caching app data. The footer exposes “Install app” only when the browser reports installability.

## Deploy

The app targets a Node/Vercel deployment. Do not add `output: "export"`; Next 16.4.3 rejects static export with `cacheComponents`.

Before the production build:

1. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
2. Run `pnpm dashboard:data` and commit both JSON copies.
3. Run `pnpm lint`, `pnpm build`, and `pnpm dashboard:check`.

A production Vercel build rejects a non-HTTPS or tunnel origin for `NEXT_PUBLIC_SITE_URL`.

## Verification

```bash
pnpm lint
pnpm build
pnpm dashboard:check
```

Manual checks:

- `/` and `/dashboard` render at 1440, 1024, 768, 390, and 320px without horizontal overflow.
- The 30-day KPI, chart summary, chart bars, and daily-values table reconcile.
- The mobile menu is opaque, scrolls in landscape, and preserves the scroll position.
- The footer install control appears only when `beforeinstallprompt` is available.
- The manifest, icons, `/dashboard.json`, `/llms.txt`, and `/sw.js` return 200.
