# Solo Adventurer's Toolbox — Design Spec

**Date:** 2026-09-19
**Status:** Draft for review

## 1. Overview

A **static digital sourcebook** of prewritten tabletop-RPG tables for solo play. The app is a beautifully designed, searchable reference library. All table content is authored during development and bundled into the site as static data. The player navigates to a table, rolls their own **physical** dice, finds the matching range, and reads the entry.

### Core mental model (settles every ambiguity)

> The app is a beautiful digital book of prewritten tables. The user navigates to a table, rolls their own physical dice, and reads the corresponding entry — **not** "the user clicks a button and the app generates a result."

### Non-negotiable product rules

- Every table is **fully populated** before the app is complete. No empty shells, placeholders, TODOs, or sample-only tables.
- **No runtime randomization or generation of any kind.** Specifically forbidden anywhere in the app:
  - `Math.random()` for game content, random-number helpers, random table selection, automatic result selection
  - dice rolling, dice animations, dice physics, 3D dice, clickable dice, roll history, "roll again"
  - "Roll" / "Generate" / "Generate Quest/NPC/Encounter/Settlement/Dungeon" buttons
  - runtime AI/LLM/API calls or server-side content generation
- Navigation buttons/cards are **bookmarks only** — they take the user to an existing table. They never create, calculate, randomize, combine, or reveal a result.
- The player supplies **all** randomness with physical dice. The app only displays complete tables and tells the user which die/range each row corresponds to.

## 2. Visual direction

Reinterpret (do **not** clone) the reference screenshot's design language for a digital reference book. Reference cues to carry through:

- Full-bleed fantasy character/scene art behind a **dark, desaturated, blurred** background.
- A strong **dark translucent overlay** so text is always readable; the image stays subordinate to content.
- Centered panels with **ornate gold/bronze corner brackets** and **Celtic-knotwork divider bars**.
- Deep **purple/plum → near-black** translucent panel surfaces, optional subtle arcane-sigil texture.
- **Serif display headings** in warm ivory/cream; **muted-gold small-caps** section labels/eyebrows.
- Restrained gold accents; gold-rimmed **emblem/badge** tiles for cards.
- Ornate **pill buttons** with a small cross/star flourish.
- Strong hierarchy, depth, subtle glow.

**Readability beats decoration.** Important text never sits directly on a bright image — always on an opaque/translucent dark surface. All colors and typography defined as **CSS variables** so the theme can change later.

Palette direction: dark blue-green / charcoal / plum backgrounds; near-black translucent panels; warm ivory primary text; muted gray-beige secondary text; antique gold / bronze accents; elegant serif headings; extremely readable body.

## 3. Technology

- **Next.js (App Router) + TypeScript + React + Tailwind CSS.**
- Static local data files (TypeScript). **No database, no auth, no backend.**
- **No runtime AI/API calls.** No image-provider proxy in v1.
- `localStorage` only, for: favorites, recently-viewed, (future) collapse/expand prefs.
- Deployable to **Vercel**; static-export-friendly.
- Minimal dependencies; easy for one person to maintain.

## 4. Data architecture

Content is pure static data with **no selection method** attached to any type.

```ts
export type TableEntry = {
  id: string;
  range?: string;      // e.g. "01–05"
  result: string;
  notes?: string;
  tags?: string[];
};

export type RollTable = {
  id: string;          // globally unique, e.g. "quests.complications"
  name: string;
  category: string;    // category slug, e.g. "quests"
  slug: string;        // table slug within category, e.g. "complications"
  description: string; // what the table is for
  die: string;         // e.g. "d100", "d20", "d12"
  entries: TableEntry[];
  relatedTableIds?: string[];
};

export type Category = {
  slug: string;        // e.g. "quests"
  name: string;        // e.g. "Quests & Story"
  blurb: string;
  theme: string;       // background/theme key
  tableIds: string[];  // order of tables in this category
};
```

Layout:

```
/data
  /quests   /wilderness   /settlements   /dungeons   /encounters
  /combat   /investigation /npcs         /treasure    /events
  /villains /names        /start         /reference
  categories.ts          // Category[] metadata + order
  registry.ts            // aggregates every RollTable; lookup by id / (category,slug); powers search + routing
```

One file per table (or small grouped files) under each category folder. No table rows live inside React components. The **registry** is the single source of truth for routing and search.

## 5. Routing (data-driven)

App Router, dynamic routes generated from the registry so adding a table = adding data (no per-table route files):

```
/                         Home — table of contents
/[category]               Section landing (cards → tables)
/[category]/[table]       Table page
/6d12                     6d12 Adventure Presence reference (built in scale phase)
/reference                Reference hub (oracle/DC/etc.)
```

`generateStaticParams` reads the registry for `[category]` and `[category]/[table]`. Unknown slugs → `notFound()`.

Every table page has: breadcrumbs, section title, short purpose description, the complete table, related-table links, "Back to Section", "Back to Toolbox".

## 6. Components

- `SiteLayout` — per-category atmospheric background (CSS variable + strong dark gradient overlay), ornate framing.
- `Header` — app title + live **search**.
- `CategoryCard` / `TableCard` — navigation bookmarks only (gold-rimmed emblem-tile styling).
- `RollTable` — the reusable book-style table: clear die/range column, alternating subtle row backgrounds, sticky header where helpful, title + purpose, optional tags, responsive with horizontal scroll on mobile. Shows the **entire** table (no "Generate" gate).
- `Breadcrumbs`, `RelatedTables` (hyperlinks, never generation), `FavoriteButton` (bookmark/star → localStorage).
- Home strips: `Favorites` and `RecentlyViewed` (navigation aids only).
- Ornate primitives: corner-bracket frame, knotwork divider, small-caps gold eyebrow, pill button.

## 7. Search

Client-side filter over the registry (table `name`, `description`, `tags`, category name). Instant, no backend, no AI. Example: `trap` → dungeon/wilderness trap + secret door + related; `merchant` → merchant types/quality + shops + settlement merchant tables.

## 8. Favorites & recently viewed

`localStorage` stores favorite table IDs and a recent-views list. Home surfaces **MY FAVORITES** and **RECENTLY VIEWED**. Navigation aids only.

## 9. Backgrounds (self-contained v1)

- Per-category **CSS gradient themes** by default — the app works with **zero API keys** and performs **no per-navigation remote fetch**.
- Strong dark gradient overlay + optional backdrop blur behind UI surfaces.
- `ImageProvider` abstraction kept as a **documented extension point** (env-var driven: `UNSPLASH_ACCESS_KEY`, `FREEPIK_API_KEY`), but not wired in v1. No invented credentials; app must run without keys.

## 10. 6d12 Adventure Presence (reference only)

Dedicated `/6d12` page (built during scale, after its target tables exist). Explains the six element types (Monsters, Clues, Environment Features, NPCs, Treasure, Random Events), the per-context trigger thresholds, and which table to consult when a physical d12 triggers — with cross-links. Reference tables for contexts: Standard Wilderness, Special Wilderness, Standard Room, Special Room, Passage. Reproduce the conceptual structure/rules **originally** — no source-book prose verbatim. **No button rolls the six dice.**

## 11. Cross-referencing

Every table lists useful next tables via `relatedTableIds`, rendered as navigation links (never generation actions).

## 12. Content plan

### Slice (build + review before mass content)

Foundation + **Quests & Story** section, fully populated, plus Home ToC, Quests category landing, search, and favorites. Quests proves the whole system: big d100 tables, a 100-row name table, in-section cross-linking (Complication ↔ Twist ↔ Story Event ↔ Rumour), breadcrumbs, and the book-page table styling. **Ship reviewable, then scale.**

Quests slice tables (to spec minimums): Quest Types, Quest Goals (30), Quest Sources/Patrons (30), Quest Locations (30), Quest Complications (30), Quest Rewards (30), Quest Twists (30), Story Events, Major Events, Unresolved Threads, Quest Names (100), Rumours (40), Clues/Leads.

### Full content roadmap (spec minimums, scale phase)

- **Start/Quest:** 20 starting situations, 30 quest goals, 30 sources/patrons, 30 complications, 30 locations, 30 rewards, 100 quest names, 40 rumours, 40 twists.
- **Wilderness:** 50 terrain details, 60 features, 40 landmarks, 40 natural structures, 40 travel events, 100 encounters, 50 clues, 30 weather, 30 campsite, 30 traps.
- **Settlements:** 30 concepts, 20 quirks, 30 district types, 80 street details, 60 street activities, 60 street events, 80 buildings, 50 merchant/shop types, 40 taverns, 30 urban landmarks, 60 district disturbances, 100 urban encounters, 50 town rumours, 50 quick citizens.
- **Dungeons:** 25 types, 25 themes, 50 starting areas, 60 room types, 80 room contents, 60 passages, 80 features, 60 traps, 40 secret-door situations, 50 clues, 100 encounters, 60 treasures, 50 events.
- **NPCs:** 150 names, 60 occupations, 80 personality traits, 50 motivations, 50 goals, 50 secrets, 50 flaws, 50 mannerisms, 60 relationships, 40 emotions.
- **Combat/Encounters:** 80 encounter seeds, 60 complications, 60 battlefield features, 50 environmental hazards, 50 monster intentions, 50 tactics, 40 reactions, 40 morale, 40 retreat/reinforcement.
- **Investigation:** 150 keywords, 150 descriptive keywords, 80 clues, 60 evidence types, 50 false leads, 50 hidden truths, 60 events, 60 skill-challenge prompts, complete oracle reference.
- **Treasure/Magic:** 100 mundane valuables, 80 unusual valuables, 80 magic-item concepts, 80 relic concepts, 60 strange effects, 50 boons, 50 banes, 80 random events.
- **Villains:** 50 motivations, 50 methods, 50 traits, 50 weaknesses, 50 secrets, 40 clues, 40 lair concepts, 60 lair features.

All content **original** (fresh fantasy inspired by categories/functions, not paraphrased line-by-line). No copyrighted D&D item text/lists. Quality bar: coherent, varied, mix of mundane/unusual, interpretable in play, concise, minimal repetition.

## 13. Accessibility & responsive

Strong contrast; important text never on a bright image; opaque/translucent dark surfaces behind table text; keyboard navigation; visible focus states; semantic headings; accessible buttons/links; respects reduced-motion; readable on tablet/phone; no tiny text. Desktop primary (tables benefit from width); long tables scroll horizontally on small screens; nav collapses to a vertical card list on mobile.

## 14. Verification

- `next build` and `tsc` pass clean.
- **No-randomization guard:** an automated check greps source for forbidden patterns (`Math.random`, roll/generate handlers, dice animation code) so the rule can't regress.
- **Data-integrity test:** every table has ≥1 entry; every `range` is valid for the table's `die` and ranges are contiguous/non-overlapping where applicable; every `relatedTableIds` resolves to a real registry table; every table ID is unique.
- Manual: each home category navigates correctly; every table route works; related links navigate; search finds tables; favorites persist across reload; app runs with no API keys.

## 15. Out of scope (YAGNI)

No AI/LLM/chat, no automatic generation of anything, no dice/roll UI, no database, no auth, no multiplayer, no VTT/battlemap, no 3D dice/physics, no campaign manager, no elaborate character sheet. Trimmed from v1 (clean extension points left): notes/journal, theme-switcher UI (CSS-variable theming only), remote image providers.
