# The Solo Adventurer's Toolbox

A **static digital sourcebook** of prewritten tabletop-RPG tables for solo play. It is a beautiful, searchable reference library — not a generator. You navigate to a table, **roll your own physical dice**, find the matching range, and read the entry.

## The golden rule

The app **never** rolls dice, generates content, or randomizes anything. Every table is authored ahead of time and bundled as static data. Navigation cards and related-table links are bookmarks only — they take you to an existing table, they never produce a result. Your physical dice are the randomizer.

## Tech

- Next.js (App Router) + TypeScript + React + Tailwind CSS v4
- Static local data in `/data`, aggregated by `lib/registry.ts`
- `localStorage` only, for favorites and recently-viewed
- No database, no auth, no backend, **no runtime AI/API calls**

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm test           # Vitest: guards + data-integrity + unit tests
```

The app builds and runs with **zero API keys** — no environment variables are required.

## Tests / guards

- **No-randomization guard** (`test/guards`) — fails the build if forbidden runtime-randomization patterns (e.g. `Math.random`) appear in source.
- **Data-integrity** (`test/data`) — every table has entries, unique IDs, valid contiguous die coverage, and resolvable related-table links.
- **Unit** (`test/lib`) — die-range utilities, registry lookups, search, and storage helpers.

## Deploy to Vercel

Import the repository in Vercel. The framework is auto-detected (Next.js); no environment variables are needed. The build command (`next build`) and output are standard.

## Content

This edition ships the complete **Quests & Story** chapter (13 tables). The remaining chapters (Wilderness, Settlements, Dungeons, and so on) are declared in the table of contents and populated in later editions; each new table is automatically covered by the existing guards.

## Structure

```
app/            routes: home, /[category], /[category]/[table], not-found
components/      table view, cards, search, breadcrumbs, ornaments
lib/             types, registry, ranges, search, storage
data/            static content by category (categories.ts + per-table files)
test/            guards, data-integrity, unit tests
```
