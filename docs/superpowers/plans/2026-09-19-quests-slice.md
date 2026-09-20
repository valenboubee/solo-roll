# Solo Adventurer's Toolbox — Quests Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete, deployable app skeleton (theme, navigation, book-style table component, search, favorites) plus a fully-populated **Quests & Story** section, so the real look/feel and system can be reviewed before mass-producing the remaining ~2,500 content entries.

**Architecture:** Next.js App Router with static TypeScript data. All tables live in `/data`; a central `registry` aggregates them and powers data-driven dynamic routes (`/[category]`, `/[category]/[table]`) and client-side search. No runtime randomization/generation of any kind — the app only displays complete tables; the player rolls physical dice. `localStorage` holds favorites/recent only.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Vitest 3 (unit/data tests), next/font (Cinzel display + EB Garamond body).

**Spec:** `docs/superpowers/specs/2026-09-19-solo-adventurers-toolbox-design.md`

## Global Constraints

- **No runtime randomization/generation anywhere.** Forbidden in source: `Math.random`, random-number helpers, dice rolling/animation/physics/3D dice, roll history, "Roll"/"Generate"/"Roll again" buttons, random/automatic table selection, runtime AI/LLM/API calls. (Next's `generateStaticParams`/`generateMetadata` are allowed — they are build-time route helpers, not content generation.)
- **No placeholders in content.** Every table ships fully populated to its stated count. No empty shells, TODOs, or sample-only tables.
- **Navigation is bookmarks only.** Cards/buttons/related links navigate; they never create, calculate, randomize, combine, or reveal a result.
- **No database, no auth, no backend.** Static data only. App must build and run with **zero API keys**.
- **Readability first.** Important text always on an opaque/translucent dark surface, never directly on bright imagery. Colors + typography defined as **CSS variables**.
- **Original content only.** No copyrighted D&D item text/lists; no line-by-line paraphrase of source material.
- **Table IDs** are `"<category>.<table>"` (e.g. `quests.complications`), globally unique.
- **Range format:** ranges use an en dash `–` and zero-padded to the die's width for d100 (e.g. `01–05`, `96–100`); single values allowed (`07`). List-format tables (names) carry no ranges.

---

## File Structure

**Config / tooling**
- `package.json` — scripts (`dev`, `build`, `start`, `test`, `typecheck`), deps.
- `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`, `.eslintrc` (Next default).

**App shell**
- `app/layout.tsx` — root layout: fonts, `globals.css`, `SiteBackground`, `Header`.
- `app/globals.css` — Tailwind import + `@theme` tokens (colors/fonts) + base styles + ornament utilities.
- `app/page.tsx` — Home (table of contents + shelves).
- `app/[category]/page.tsx` — section landing.
- `app/[category]/[table]/page.tsx` — table page.
- `app/not-found.tsx` — 404.

**Library (pure, testable)**
- `lib/types.ts` — `TableEntry`, `RollTable`, `Category`.
- `lib/ranges.ts` — `dieSides`, `parseRange`, `validateCoverage`.
- `lib/registry.ts` — aggregate tables; `allTables`, `getTable`, `getCategory`, `tablesByCategory`.
- `lib/search.ts` — `searchTables(query)`.
- `lib/storage.ts` — pure list helpers (`toggleId`, `addRecent`) + guarded localStorage read/write.

**Components**
- `components/SiteBackground.tsx` — per-category gradient + overlay.
- `components/Header.tsx`, `components/SearchBox.tsx` (client).
- `components/CategoryCard.tsx`, `components/TableCard.tsx`.
- `components/RollTableView.tsx` — the book-style table.
- `components/Breadcrumbs.tsx`, `components/RelatedTables.tsx`.
- `components/FavoriteButton.tsx` (client), `components/RecentTracker.tsx` (client), `components/HomeShelves.tsx` (client).
- `components/ornaments.tsx` — `Frame`, `Divider`, `Eyebrow`, `PillLink`.

**Data**
- `data/categories.ts` — `Category[]` (all 14 categories declared; only Quests has tables in this slice).
- `data/quests/index.ts` — exports the Quests `RollTable[]`.
- `data/quests/*.ts` — one file per table (13 tables).

**Tests**
- `test/guards/no-randomization.test.ts`
- `test/data/integrity.test.ts`
- `test/lib/ranges.test.ts`, `test/lib/search.test.ts`, `test/lib/registry.test.ts`, `test/lib/storage.test.ts`

---

### Task 1: Project scaffold + tooling + no-randomization guard

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`
- Create: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Test: `test/guards/no-randomization.test.ts`

**Interfaces:**
- Produces: runnable `npm run dev`/`build`/`test`/`typecheck`; a working Vitest setup other tasks extend.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "solo-adventurers-toolbox",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Install deps**

Run: `npm install`
Expected: completes; `node_modules` present (already gitignored).

- [ ] **Step 3: Create configs**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
```

`postcss.config.mjs`:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: { environment: "node", include: ["test/**/*.test.ts"] },
  resolve: { alias: { "@": resolve(__dirname, ".") } },
});
```

- [ ] **Step 4: Create minimal `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-ink: #0e0b14;
  --color-panel: #171226;
  --color-plum: #241a3a;
  --color-ivory: #f3e9d6;
  --color-parchment: #cdbfa6;
  --color-gold: #c9a24a;
  --color-bronze: #8a6a2f;
  --font-display: "Cinzel", Georgia, serif;
  --font-body: "EB Garamond", Georgia, serif;
}

body { background: var(--color-ink); color: var(--color-ivory); }
```

- [ ] **Step 5: Create minimal `app/layout.tsx` and `app/page.tsx`**

`app/layout.tsx`:
```tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Solo Adventurer's Toolbox",
  description: "A digital book of adventure tables.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
export default function Home() {
  return <main><h1>The Solo Adventurer's Toolbox</h1></main>;
}
```

- [ ] **Step 6: Write the no-randomization guard test**

`test/guards/no-randomization.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["app", "components", "lib", "data"];
const EXT = new Set([".ts", ".tsx", ".css"]);

// Truly forbidden runtime-randomization / generation patterns.
// NOTE: Next's generateStaticParams/generateMetadata are build-time and allowed,
// so we do NOT match a bare "generate".
const FORBIDDEN: RegExp[] = [
  /Math\.random/,
  /\bcrypto\.getRandomValues/,
  /\brollDice\b/i,
  /\brollTable\b/i,
  /\bgenerateResult\b/i,
  /\bgenerateQuest\b/i,
  /\bgenerateNpc\b/i,
  /\bgenerateEncounter\b/i,
  /\buseRandom\b/i,
  /\bdice-?box\b/i,
];

function walk(dir: string, acc: string[] = []): string[] {
  let entries: string[] = [];
  try { entries = readdirSync(dir); } catch { return acc; }
  for (const name of entries) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (EXT.has(extname(p))) acc.push(p);
  }
  return acc;
}

describe("no runtime randomization or generation", () => {
  it("source contains no forbidden patterns", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(root)) {
        const text = readFileSync(file, "utf8");
        for (const re of FORBIDDEN) {
          if (re.test(text)) offenders.push(`${file} :: ${re}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 7: Run tests + typecheck + build**

Run: `npm test`
Expected: PASS (guard finds nothing).
Run: `npm run typecheck`
Expected: PASS.
Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind v4 + Vitest with no-randomization guard"
```

---

### Task 2: Core types + range utilities (TDD)

**Files:**
- Create: `lib/types.ts`, `lib/ranges.ts`
- Test: `test/lib/ranges.test.ts`

**Interfaces:**
- Produces:
  - `type TableEntry = { id: string; range?: string; result: string; notes?: string; tags?: string[] }`
  - `type RollTable = { id: string; name: string; category: string; slug: string; description: string; die: string; format?: "ranges" | "list"; entries: TableEntry[]; relatedTableIds?: string[] }`
  - `type Category = { slug: string; name: string; blurb: string; theme: string; tableIds: string[] }`
  - `dieSides(die: string): number` — `"d100"→100`, `"d20"→20`, `"d12"→12`, `"d10"→10`, `"d8"→8`, `"d6"→6`, `"d4"→4`; throws on unknown.
  - `parseRange(range: string): { min: number; max: number }` — accepts `"05"`, `"01–05"`, `"01-05"` (en dash or hyphen); throws on malformed.
  - `validateCoverage(entries: TableEntry[], sides: number): { ok: boolean; error?: string }` — ranges parse, within `1..sides`, sorted, contiguous (no gaps/overlaps), covering exactly `1..sides`.

- [ ] **Step 1: Write the failing test**

`test/lib/ranges.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { dieSides, parseRange, validateCoverage } from "@/lib/ranges";
import type { TableEntry } from "@/lib/types";

describe("dieSides", () => {
  it("maps known dice", () => {
    expect(dieSides("d100")).toBe(100);
    expect(dieSides("d12")).toBe(12);
    expect(dieSides("d6")).toBe(6);
  });
  it("throws on unknown die", () => {
    expect(() => dieSides("d7")).toThrow();
  });
});

describe("parseRange", () => {
  it("parses single value", () => {
    expect(parseRange("07")).toEqual({ min: 7, max: 7 });
  });
  it("parses en-dash range", () => {
    expect(parseRange("01–05")).toEqual({ min: 1, max: 5 });
  });
  it("parses hyphen range", () => {
    expect(parseRange("96-100")).toEqual({ min: 96, max: 100 });
  });
  it("throws on malformed", () => {
    expect(() => parseRange("abc")).toThrow();
  });
});

describe("validateCoverage", () => {
  const mk = (ranges: string[]): TableEntry[] =>
    ranges.map((r, i) => ({ id: `e${i}`, range: r, result: "x" }));

  it("accepts contiguous full coverage", () => {
    expect(validateCoverage(mk(["1", "2", "3"]), 3).ok).toBe(true);
  });
  it("rejects a gap", () => {
    expect(validateCoverage(mk(["1", "3"]), 3).ok).toBe(false);
  });
  it("rejects overlap", () => {
    expect(validateCoverage(mk(["1–2", "2–3"]), 3).ok).toBe(false);
  });
  it("rejects not reaching sides", () => {
    expect(validateCoverage(mk(["1", "2"]), 3).ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ranges`
Expected: FAIL (module not found).

- [ ] **Step 3: Write `lib/types.ts`**

```ts
export type TableEntry = {
  id: string;
  range?: string;
  result: string;
  notes?: string;
  tags?: string[];
};

export type RollTable = {
  id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  die: string;
  format?: "ranges" | "list";
  entries: TableEntry[];
  relatedTableIds?: string[];
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  theme: string;
  tableIds: string[];
};
```

- [ ] **Step 4: Write `lib/ranges.ts`**

```ts
import type { TableEntry } from "./types";

const SIDES: Record<string, number> = {
  d4: 4, d6: 6, d8: 8, d10: 10, d12: 12, d20: 20, d100: 100,
};

export function dieSides(die: string): number {
  const n = SIDES[die];
  if (!n) throw new Error(`Unknown die: ${die}`);
  return n;
}

export function parseRange(range: string): { min: number; max: number } {
  const cleaned = range.trim().replace(/–|—/g, "-");
  const m = cleaned.match(/^(\d+)(?:-(\d+))?$/);
  if (!m) throw new Error(`Malformed range: ${range}`);
  const min = Number(m[1]);
  const max = m[2] ? Number(m[2]) : min;
  if (max < min) throw new Error(`Descending range: ${range}`);
  return { min, max };
}

export function validateCoverage(
  entries: TableEntry[],
  sides: number
): { ok: boolean; error?: string } {
  const parsed: { min: number; max: number }[] = [];
  for (const e of entries) {
    if (!e.range) return { ok: false, error: `Entry ${e.id} missing range` };
    let r;
    try { r = parseRange(e.range); }
    catch (err) { return { ok: false, error: String(err) }; }
    if (r.min < 1 || r.max > sides)
      return { ok: false, error: `Entry ${e.id} out of 1..${sides}` };
    parsed.push(r);
  }
  parsed.sort((a, b) => a.min - b.min);
  let expected = 1;
  for (const r of parsed) {
    if (r.min !== expected)
      return { ok: false, error: `Gap/overlap at ${r.min}, expected ${expected}` };
    expected = r.max + 1;
  }
  if (expected !== sides + 1)
    return { ok: false, error: `Coverage ends at ${expected - 1}, expected ${sides}` };
  return { ok: true };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- ranges`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/types.ts lib/ranges.ts test/lib/ranges.test.ts
git commit -m "feat: add core types and die-range utilities"
```

---

### Task 3: Categories + registry + first Quests table + data-integrity test

**Files:**
- Create: `data/categories.ts`, `data/quests/types.ts`, `data/quests/index.ts`, `lib/registry.ts`
- Test: `test/lib/registry.test.ts`, `test/data/integrity.test.ts`

**Interfaces:**
- Consumes: `RollTable`, `Category` (Task 2); `dieSides`, `validateCoverage` (Task 2).
- Produces:
  - `data/categories.ts`: `export const categories: Category[]` — 14 categories: `start, quests, wilderness, settlements, dungeons, encounters, combat, investigation, npcs, treasure, events, villains, names, reference`. In this slice only `quests` has non-empty `tableIds`; the rest have `tableIds: []` and are marked for the scale phase.
  - `data/quests/index.ts`: `export const questTables: RollTable[]`.
  - `lib/registry.ts`:
    - `allTables: RollTable[]`
    - `getTable(id: string): RollTable | undefined`
    - `getTableBySlug(category: string, slug: string): RollTable | undefined`
    - `getCategory(slug: string): Category | undefined`
    - `tablesByCategory(slug: string): RollTable[]` (ordered by the category's `tableIds`)
    - `categoriesWithContent(): Category[]` (categories whose `tableIds.length > 0`)

- [ ] **Step 1: Write `data/quests/types.ts` (first real, fully-populated table)**

Quest Types — `die: "d12"`, 12 entries, ranges `1`..`12`. Example shape (author all 12 with coherent, varied, original quest archetypes):
```ts
import type { RollTable } from "@/lib/types";

export const questTypes: RollTable = {
  id: "quests.types",
  name: "Quest Types",
  category: "quests",
  slug: "types",
  description: "The broad shape of the adventure ahead. Roll a d12 to frame the quest before detailing its goal and complications.",
  die: "d12",
  entries: [
    { id: "quests.types.1", range: "1", result: "Retrieval — recover a specific object from a dangerous place." },
    { id: "quests.types.2", range: "2", result: "Escort — guide a person or cargo safely across hostile ground." },
    // ... author entries 3–12 (rescue, hunt, delivery, investigation, sabotage, negotiation, defense, exploration, cleansing, heist)
  ],
  relatedTableIds: ["quests.goals", "quests.complications", "quests.rewards"],
};
```

- [ ] **Step 2: Write `data/quests/index.ts`**

```ts
import type { RollTable } from "@/lib/types";
import { questTypes } from "./types";

export const questTables: RollTable[] = [questTypes];
```

- [ ] **Step 3: Write `data/categories.ts`**

```ts
import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { slug: "start", name: "Start Adventure", blurb: "Begin a freeform solo adventure fast.", theme: "start", tableIds: [] },
  { slug: "quests", name: "Quests & Story", blurb: "Goals, patrons, complications, twists, and the threads that tie them together.", theme: "quests", tableIds: ["quests.types"] },
  { slug: "wilderness", name: "World & Wilderness", blurb: "Terrain, features, travel, and wilderness encounters.", theme: "wilderness", tableIds: [] },
  { slug: "settlements", name: "Settlements", blurb: "Build towns and cities district by district.", theme: "settlements", tableIds: [] },
  { slug: "dungeons", name: "Dungeons", blurb: "Rooms, passages, traps, and the dark between them.", theme: "dungeons", tableIds: [] },
  { slug: "encounters", name: "Encounters", blurb: "Seeds and complications for any meeting.", theme: "encounters", tableIds: [] },
  { slug: "combat", name: "Combat", blurb: "In-session prompts for intent, tactics, and morale.", theme: "combat", tableIds: [] },
  { slug: "investigation", name: "Investigation & Oracle", blurb: "Yes/no oracle, clues, keywords, and leads.", theme: "investigation", tableIds: [] },
  { slug: "npcs", name: "NPCs", blurb: "Names, motives, secrets, and mannerisms.", theme: "npcs", tableIds: [] },
  { slug: "treasure", name: "Treasure & Magic", blurb: "Loot, relics, and strange magical effects.", theme: "treasure", tableIds: [] },
  { slug: "events", name: "Boons, Banes & Events", blurb: "Fortune, misfortune, and the turns of fate.", theme: "events", tableIds: [] },
  { slug: "villains", name: "Villains & Lairs", blurb: "Motives, methods, weaknesses, and lairs.", theme: "villains", tableIds: [] },
  { slug: "names", name: "Names & Keywords", blurb: "Names and evocative keywords for the table.", theme: "names", tableIds: [] },
  { slug: "reference", name: "Reference", blurb: "Oracle, DCs, and the 6d12 method.", theme: "reference", tableIds: [] },
];
```

- [ ] **Step 4: Write `lib/registry.ts`**

```ts
import type { Category, RollTable } from "./types";
import { categories } from "@/data/categories";
import { questTables } from "@/data/quests";

export const allTables: RollTable[] = [...questTables];

const byId = new Map(allTables.map((t) => [t.id, t]));

export function getTable(id: string): RollTable | undefined {
  return byId.get(id);
}

export function getTableBySlug(category: string, slug: string): RollTable | undefined {
  return allTables.find((t) => t.category === category && t.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function tablesByCategory(slug: string): RollTable[] {
  const cat = getCategory(slug);
  if (!cat) return [];
  return cat.tableIds
    .map((id) => byId.get(id))
    .filter((t): t is RollTable => Boolean(t));
}

export function categoriesWithContent(): Category[] {
  return categories.filter((c) => c.tableIds.length > 0);
}

export { categories };
```

- [ ] **Step 5: Write `test/lib/registry.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import {
  allTables, getTable, getTableBySlug, getCategory, tablesByCategory, categoriesWithContent,
} from "@/lib/registry";

describe("registry", () => {
  it("aggregates tables", () => {
    expect(allTables.length).toBeGreaterThan(0);
  });
  it("gets a table by id", () => {
    expect(getTable("quests.types")?.name).toBe("Quest Types");
  });
  it("gets a table by category+slug", () => {
    expect(getTableBySlug("quests", "types")?.id).toBe("quests.types");
  });
  it("returns category by slug", () => {
    expect(getCategory("quests")?.name).toBe("Quests & Story");
  });
  it("orders tables by category tableIds", () => {
    expect(tablesByCategory("quests").map((t) => t.id)).toEqual(getCategory("quests")!.tableIds);
  });
  it("lists only categories with content", () => {
    expect(categoriesWithContent().every((c) => c.tableIds.length > 0)).toBe(true);
  });
});
```

- [ ] **Step 6: Write `test/data/integrity.test.ts` (guards all future content)**

```ts
import { describe, it, expect } from "vitest";
import { allTables, getCategory, categories } from "@/lib/registry";
import { dieSides, validateCoverage } from "@/lib/ranges";

describe("data integrity", () => {
  it("every table id is unique", () => {
    const ids = allTables.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every table has at least one entry", () => {
    for (const t of allTables) expect(t.entries.length).toBeGreaterThan(0);
  });

  it("every entry id is unique within its table", () => {
    for (const t of allTables) {
      const ids = t.entries.map((e) => e.id);
      expect(new Set(ids).size, t.id).toBe(ids.length);
    }
  });

  it("every table belongs to a real category that lists it", () => {
    for (const t of allTables) {
      const cat = getCategory(t.category);
      expect(cat, t.id).toBeDefined();
      expect(cat!.tableIds, t.id).toContain(t.id);
    }
  });

  it("every category tableId resolves to a real table", () => {
    const ids = new Set(allTables.map((t) => t.id));
    for (const c of categories)
      for (const id of c.tableIds) expect(ids.has(id), id).toBe(true);
  });

  it("range-format tables fully cover their die", () => {
    for (const t of allTables) {
      if (t.format === "list") continue;
      const res = validateCoverage(t.entries, dieSides(t.die));
      expect(res.ok, `${t.id}: ${res.error ?? ""}`).toBe(true);
    }
  });

  it("every relatedTableId resolves to a real table", () => {
    const ids = new Set(allTables.map((t) => t.id));
    for (const t of allTables)
      for (const rel of t.relatedTableIds ?? [])
        expect(ids.has(rel), `${t.id} -> ${rel}`).toBe(true);
  });
});
```

- [ ] **Step 7: Run tests**

Run: `npm test`
Expected: PASS (author all 12 Quest Types entries so coverage of d12 is exact; ensure `relatedTableIds` for `quests.types` are trimmed to only IDs that exist right now — i.e. remove `quests.goals`/`quests.rewards`/`quests.complications` until Task 8's content lands, OR complete this task's related IDs pointing only to `quests.types` and re-add in Task 8).

> **Note for executor:** to keep the integrity test green between tasks, only reference `relatedTableIds` that already exist. Task 8 re-adds the full cross-links once all Quests tables exist.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add categories, registry, first Quests table, and data-integrity test"
```

---

### Task 4: Client-side search (TDD)

**Files:**
- Create: `lib/search.ts`
- Test: `test/lib/search.test.ts`

**Interfaces:**
- Consumes: `allTables` (Task 3), `getCategory` (Task 3).
- Produces: `searchTables(query: string): RollTable[]` — case-insensitive match over table `name`, `description`, `tags` (from entries), and the category's display `name`; empty/whitespace query returns `[]`; results de-duplicated, capped at 50, name-matches ranked first.

- [ ] **Step 1: Write the failing test**

`test/lib/search.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { searchTables } from "@/lib/search";

describe("searchTables", () => {
  it("returns nothing for empty query", () => {
    expect(searchTables("   ")).toEqual([]);
  });
  it("finds a table by name (case-insensitive)", () => {
    expect(searchTables("quest types").some((t) => t.id === "quests.types")).toBe(true);
  });
  it("finds a table by category name", () => {
    expect(searchTables("story").some((t) => t.category === "quests")).toBe(true);
  });
  it("does not return duplicates", () => {
    const ids = searchTables("quest").map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- search`
Expected: FAIL (module not found).

- [ ] **Step 3: Write `lib/search.ts`**

```ts
import type { RollTable } from "./types";
import { allTables, getCategory } from "./registry";

export function searchTables(query: string): RollTable[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored: { t: RollTable; score: number }[] = [];
  for (const t of allTables) {
    const catName = getCategory(t.category)?.name ?? "";
    const tags = t.entries.flatMap((e) => e.tags ?? []).join(" ");
    const name = t.name.toLowerCase();
    const haystacks: [string, number][] = [
      [name, 3],
      [t.description.toLowerCase(), 1],
      [catName.toLowerCase(), 2],
      [tags.toLowerCase(), 1],
    ];
    let score = 0;
    for (const [text, weight] of haystacks) if (text.includes(q)) score += weight;
    if (score > 0) scored.push({ t, score });
  }
  scored.sort((a, b) => b.score - a.score || a.t.name.localeCompare(b.t.name));
  return scored.slice(0, 50).map((s) => s.t);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- search`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/search.ts test/lib/search.test.ts
git commit -m "feat: add client-side table search"
```

---

### Task 5: Storage helpers (TDD)

**Files:**
- Create: `lib/storage.ts`
- Test: `test/lib/storage.test.ts`

**Interfaces:**
- Produces (pure, no browser needed):
  - `toggleId(ids: string[], id: string): string[]` — add if absent, remove if present.
  - `addRecent(ids: string[], id: string, max = 12): string[]` — move-to-front, de-duplicated, capped.
- Also (browser-guarded, not unit-tested): `loadFavorites()`, `saveFavorites(ids)`, `loadRecent()`, `pushRecent(id)` using `localStorage` keys `sat.favorites` / `sat.recent`, each wrapped in `try/catch` and guarded by `typeof window !== "undefined"`.

- [ ] **Step 1: Write the failing test**

`test/lib/storage.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { toggleId, addRecent } from "@/lib/storage";

describe("toggleId", () => {
  it("adds when absent", () => { expect(toggleId(["a"], "b")).toEqual(["a", "b"]); });
  it("removes when present", () => { expect(toggleId(["a", "b"], "a")).toEqual(["b"]); });
});

describe("addRecent", () => {
  it("moves to front and de-dupes", () => {
    expect(addRecent(["b", "a"], "a")).toEqual(["a", "b"]);
  });
  it("caps length", () => {
    expect(addRecent(["1","2","3"], "4", 3)).toEqual(["4","1","2"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- storage`
Expected: FAIL.

- [ ] **Step 3: Write `lib/storage.ts`**

```ts
const FAV = "sat.favorites";
const REC = "sat.recent";

export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

export function addRecent(ids: string[], id: string, max = 12): string[] {
  return [id, ...ids.filter((x) => x !== id)].slice(0, max);
}

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(key) ?? "[]"); }
  catch { return []; }
}
function write(key: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, JSON.stringify(ids)); } catch { /* ignore */ }
}

export const loadFavorites = () => read(FAV);
export const saveFavorites = (ids: string[]) => write(FAV, ids);
export const loadRecent = () => read(REC);
export const pushRecent = (id: string) => write(REC, addRecent(loadRecent(), id));
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- storage`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/storage.ts test/lib/storage.test.ts
git commit -m "feat: add localStorage favorites/recent helpers"
```

---

### Task 6: Global theme, layout, ornaments, background

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`
- Create: `components/ornaments.tsx`, `components/SiteBackground.tsx`, `components/Header.tsx`

**Interfaces:**
- Consumes: fonts via `next/font/google`.
- Produces:
  - `SiteBackground({ theme }: { theme?: string })` — fixed full-bleed per-theme CSS gradient + strong dark overlay; no remote fetch.
  - `Header()` — app wordmark link + a slot for search (search wired in Task 8).
  - Ornaments: `Frame`, `Divider`, `Eyebrow({children})`, `PillLink({href, children})`.
- Deliverable: build renders home with atmospheric background + ivory serif type; text on dark translucent surfaces.

- [ ] **Step 1: Expand `app/globals.css`**

Add (below the `@theme` block from Task 1) base + ornament utilities. Full file:
```css
@import "tailwindcss";

@theme {
  --color-ink: #0e0b14;
  --color-panel: #171226;
  --color-plum: #241a3a;
  --color-ivory: #f3e9d6;
  --color-parchment: #cdbfa6;
  --color-gold: #c9a24a;
  --color-bronze: #8a6a2f;
  --font-display: "Cinzel", Georgia, serif;
  --font-body: "EB Garamond", Georgia, serif;
}

:root { color-scheme: dark; }

body {
  background: var(--color-ink);
  color: var(--color-ivory);
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.65;
}

h1, h2, h3, .display { font-family: var(--font-display); letter-spacing: 0.02em; }

/* translucent reading surface */
.panel {
  background: color-mix(in oklab, var(--color-panel) 88%, transparent);
  border: 1px solid color-mix(in oklab, var(--color-gold) 30%, transparent);
  border-radius: 0.5rem;
  backdrop-filter: blur(6px);
}

/* muted-gold small-caps eyebrow */
.eyebrow {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.72rem;
  color: var(--color-gold);
}

/* knotwork-style divider */
.rule {
  height: 1px;
  background: linear-gradient(90deg, transparent,
    color-mix(in oklab, var(--color-gold) 60%, transparent), transparent);
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

- [ ] **Step 2: Write `components/ornaments.tsx`**

```tsx
import Link from "next/link";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function Divider() {
  return <div className="rule my-6" role="presentation" />;
}

export function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`panel p-6 md:p-8 ${className}`}>{children}</div>;
}

export function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-gold)_45%,transparent)] px-5 py-2 text-[var(--color-ivory)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Write `components/SiteBackground.tsx`**

```tsx
const THEMES: Record<string, string> = {
  home: "radial-gradient(1200px 800px at 50% -10%, #2a2140 0%, #120e1e 55%, #0b0812 100%)",
  quests: "radial-gradient(1000px 700px at 70% 0%, #2b2036 0%, #14101f 60%, #0b0812 100%)",
  start: "radial-gradient(1000px 700px at 30% 0%, #21283a 0%, #121722 60%, #0b0d12 100%)",
  wilderness: "radial-gradient(1000px 700px at 50% 0%, #1c2a23 0%, #101a15 60%, #0a0f0c 100%)",
  settlements: "radial-gradient(1000px 700px at 50% 0%, #2c2536 0%, #171320 60%, #0b0812 100%)",
  dungeons: "radial-gradient(1000px 700px at 50% 0%, #221f26 0%, #131117 60%, #090809 100%)",
  reference: "radial-gradient(1000px 700px at 50% 0%, #242038 0%, #14111f 60%, #0b0812 100%)",
};

export function SiteBackground({ theme = "home" }: { theme?: string }) {
  const bg = THEMES[theme] ?? THEMES.home;
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <div className="absolute inset-0" style={{ background: bg }} />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(8,6,12,0.35), rgba(8,6,12,0.75))",
      }} />
    </div>
  );
}
```

- [ ] **Step 4: Write `components/Header.tsx`**

```tsx
import Link from "next/link";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[color-mix(in_oklab,var(--color-gold)_20%,transparent)] bg-[color-mix(in_oklab,var(--color-ink)_82%,transparent)] backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="display text-lg text-[var(--color-ivory)] hover:text-[var(--color-gold)]">
          The Solo Adventurer&apos;s Toolbox
        </Link>
        <div className="flex-1 max-w-xs">{children}</div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Wire fonts + background + header into `app/layout.tsx`**

```tsx
import "./globals.css";
import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import { SiteBackground } from "@/components/SiteBackground";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "The Solo Adventurer's Toolbox",
  description: "A digital book of adventure tables.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${garamond.variable}`}>
      <body>
        <SiteBackground theme="home" />
        {children}
      </body>
    </html>
  );
}
```

> Note: `next/font` overrides the `@theme` font values by supplying the same CSS variable names (`--font-display`, `--font-body`). Keep the `@theme` fallbacks for tests/build without network fonts.

- [ ] **Step 6: Build + typecheck + test**

Run: `npm run build && npm run typecheck && npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add global theme, fonts, background, header, and ornaments"
```

---

### Task 7: Table + navigation components

**Files:**
- Create: `components/RollTableView.tsx`, `components/Breadcrumbs.tsx`, `components/RelatedTables.tsx`, `components/CategoryCard.tsx`, `components/TableCard.tsx`, `components/FavoriteButton.tsx`, `components/RecentTracker.tsx`

**Interfaces:**
- Consumes: `RollTable`, `Category`; registry lookups; storage helpers (`loadFavorites`, `saveFavorites`, `toggleId`, `pushRecent`).
- Produces:
  - `RollTableView({ table }: { table: RollTable })` — renders die/range column + result; alternating rows; horizontal scroll wrapper; list-format tables render as a responsive grid of results (no range column).
  - `Breadcrumbs({ items }: { items: { href?: string; label: string }[] })`.
  - `RelatedTables({ ids }: { ids: string[] })` — resolves via registry, renders `PillLink`s; renders nothing if empty.
  - `CategoryCard({ category })`, `TableCard({ table })` — navigation links.
  - `FavoriteButton({ tableId })` (client) — star toggle backed by localStorage.
  - `RecentTracker({ tableId })` (client) — records a recent view on mount; renders nothing.

- [ ] **Step 1: Write `components/RollTableView.tsx`**

```tsx
import type { RollTable } from "@/lib/types";

export function RollTableView({ table }: { table: RollTable }) {
  if (table.format === "list") {
    return (
      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 md:grid-cols-4">
        {table.entries.map((e) => (
          <li key={e.id} className="text-[var(--color-parchment)]">{e.result}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="eyebrow">
            <th className="w-24 border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2 pr-4">{table.die}</th>
            <th className="border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2">Result</th>
          </tr>
        </thead>
        <tbody>
          {table.entries.map((e, i) => (
            <tr key={e.id} className={i % 2 ? "bg-[color-mix(in_oklab,var(--color-plum)_35%,transparent)]" : ""}>
              <td className="whitespace-nowrap py-2 pr-4 align-top font-[var(--font-display)] text-[var(--color-gold)]">{e.range}</td>
              <td className="py-2 align-top text-[var(--color-ivory)]">
                {e.result}
                {e.notes ? <span className="block text-sm text-[var(--color-parchment)]">{e.notes}</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/Breadcrumbs.tsx`**

```tsx
import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-parchment)]">
      {items.map((it, i) => (
        <span key={i}>
          {it.href ? <Link href={it.href} className="hover:text-[var(--color-gold)]">{it.label}</Link> : <span>{it.label}</span>}
          {i < items.length - 1 ? <span className="px-2 text-[var(--color-bronze)]">›</span> : null}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Write `components/RelatedTables.tsx`**

```tsx
import { getTable } from "@/lib/registry";
import { PillLink } from "./ornaments";

export function RelatedTables({ ids }: { ids: string[] }) {
  const tables = ids.map(getTable).filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (tables.length === 0) return null;
  return (
    <section className="mt-8">
      <div className="eyebrow mb-3">Related Tables</div>
      <div className="flex flex-wrap gap-3">
        {tables.map((t) => (
          <PillLink key={t.id} href={`/${t.category}/${t.slug}`}>{t.name}</PillLink>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `components/CategoryCard.tsx` and `components/TableCard.tsx`**

```tsx
// CategoryCard.tsx
import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/${category.slug}`} className="panel block p-5 transition-colors hover:border-[var(--color-gold)]">
      <div className="display text-xl text-[var(--color-ivory)]">{category.name}</div>
      <p className="mt-1 text-sm text-[var(--color-parchment)]">{category.blurb}</p>
    </Link>
  );
}
```

```tsx
// TableCard.tsx
import Link from "next/link";
import type { RollTable } from "@/lib/types";

export function TableCard({ table }: { table: RollTable }) {
  return (
    <Link href={`/${table.category}/${table.slug}`} className="panel block p-4 transition-colors hover:border-[var(--color-gold)]">
      <div className="flex items-baseline justify-between gap-3">
        <span className="display text-lg text-[var(--color-ivory)]">{table.name}</span>
        <span className="eyebrow">{table.die}</span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-parchment)]">{table.description}</p>
    </Link>
  );
}
```

- [ ] **Step 5: Write `components/FavoriteButton.tsx` (client)**

```tsx
"use client";
import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites, toggleId } from "@/lib/storage";

export function FavoriteButton({ tableId }: { tableId: string }) {
  const [fav, setFav] = useState(false);
  useEffect(() => { setFav(loadFavorites().includes(tableId)); }, [tableId]);
  function onToggle() {
    const next = toggleId(loadFavorites(), tableId);
    saveFavorites(next);
    setFav(next.includes(tableId));
  }
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={fav}
      aria-label={fav ? "Remove bookmark" : "Bookmark this table"}
      className="rounded-full border border-[color-mix(in_oklab,var(--color-gold)_45%,transparent)] px-3 py-1 text-sm hover:border-[var(--color-gold)]"
    >
      {fav ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
}
```

- [ ] **Step 6: Write `components/RecentTracker.tsx` (client)**

```tsx
"use client";
import { useEffect } from "react";
import { pushRecent } from "@/lib/storage";

export function RecentTracker({ tableId }: { tableId: string }) {
  useEffect(() => { pushRecent(tableId); }, [tableId]);
  return null;
}
```

- [ ] **Step 7: Build + typecheck + test**

Run: `npm run build && npm run typecheck && npm test`
Expected: all pass (guard still green — `onToggle`/no `Math.random`).

- [ ] **Step 8: Commit**

```bash
git add components
git commit -m "feat: add table view, breadcrumbs, related links, cards, favorite/recent"
```

---

### Task 8: Routing pages + search UI + home shelves + remaining Quests content

This task delivers the full navigable app AND completes the Quests section to spec counts.

**Files:**
- Create: `app/[category]/page.tsx`, `app/[category]/[table]/page.tsx`, `app/not-found.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx` (pass per-route theme is optional; home theme is fine)
- Create: `components/SearchBox.tsx` (client), `components/HomeShelves.tsx` (client)
- Create: `data/quests/goals.ts`, `sources.ts`, `locations.ts`, `complications.ts`, `rewards.ts`, `twists.ts`, `story-events.ts`, `major-events.ts`, `threads.ts`, `names.ts`, `rumours.ts`, `clues.ts`
- Modify: `data/quests/index.ts`, `data/quests/types.ts` (restore full `relatedTableIds`), `data/categories.ts` (list all Quests tableIds)

**Interfaces:**
- Consumes: registry, search, components from Tasks 3–7.
- Produces: static routes for every category-with-content and every table; `SearchBox` (filters via `searchTables`), `HomeShelves` (favorites + recent from localStorage).

- [ ] **Step 1: Author the remaining Quests tables (fully populated, original)**

Create one file per table with the exact ID/slug/die/count below. Choose ranges that **contiguously cover the die** (integrity test enforces this). Guidance for non-even counts on d100: assign near-even contiguous ranges (e.g. 30 entries → twenty ranges of 3 then ten of 4 = 100). All content original, coherent, varied, concise, interpretable in play; no copyrighted item lists.

| File | id | slug | name | die | count | format |
|---|---|---|---|---|---|---|
| `goals.ts` | `quests.goals` | `goals` | Quest Goals | d100 | 30 | ranges |
| `sources.ts` | `quests.sources` | `sources` | Quest Sources & Patrons | d100 | 30 | ranges |
| `locations.ts` | `quests.locations` | `locations` | Quest Locations | d100 | 30 | ranges |
| `complications.ts` | `quests.complications` | `complications` | Quest Complications | d100 | 30 | ranges |
| `rewards.ts` | `quests.rewards` | `rewards` | Quest Rewards | d100 | 30 | ranges |
| `twists.ts` | `quests.twists` | `twists` | Quest Twists | d100 | 40 | ranges |
| `story-events.ts` | `quests.story-events` | `story-events` | Story Events | d20 | 20 | ranges |
| `major-events.ts` | `quests.major-events` | `major-events` | Major Events | d20 | 20 | ranges |
| `threads.ts` | `quests.threads` | `threads` | Unresolved Threads | d20 | 20 | ranges |
| `names.ts` | `quests.names` | `names` | Quest Names | d100 | 100 | list |
| `rumours.ts` | `quests.rumours` | `rumours` | Rumours | d100 | 40 | ranges |
| `clues.ts` | `quests.clues` | `clues` | Clues & Leads | d100 | 40 | ranges |

Each file exports one `RollTable` (pattern identical to `types.ts` from Task 3). `names.ts` uses `format: "list"`, `die: "d100"`, 100 entries with no `range`. Set sensible `relatedTableIds` (in-section links, e.g. goals↔sources↔complications↔rewards; twists↔major-events↔threads; rumours↔clues↔story-events).

- [ ] **Step 2: Update `data/quests/index.ts` and `data/categories.ts`**

`data/quests/index.ts`:
```ts
import type { RollTable } from "@/lib/types";
import { questTypes } from "./types";
import { questGoals } from "./goals";
import { questSources } from "./sources";
import { questLocations } from "./locations";
import { questComplications } from "./complications";
import { questRewards } from "./rewards";
import { questTwists } from "./twists";
import { storyEvents } from "./story-events";
import { majorEvents } from "./major-events";
import { unresolvedThreads } from "./threads";
import { questNames } from "./names";
import { rumours } from "./rumours";
import { cluesLeads } from "./clues";

export const questTables: RollTable[] = [
  questTypes, questGoals, questSources, questLocations, questComplications,
  questRewards, questTwists, storyEvents, majorEvents, unresolvedThreads,
  questNames, rumours, cluesLeads,
];
```

In `data/categories.ts`, set the `quests` category's `tableIds` to the full ordered list of the 13 IDs above. Restore `quests.types` `relatedTableIds` to real IDs.

- [ ] **Step 3: Write `app/not-found.tsx`**

```tsx
import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="display text-3xl">Page not found</h1>
        <p className="mt-3 text-[var(--color-parchment)]">This page isn&apos;t in the book.</p>
        <p className="mt-6"><Link href="/" className="text-[var(--color-gold)]">← Back to Toolbox</Link></p>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Write `app/[category]/page.tsx` (section landing)**

```tsx
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableCard } from "@/components/TableCard";
import { Eyebrow, Divider } from "@/components/ornaments";
import { categoriesWithContent, getCategory, tablesByCategory } from "@/lib/registry";

export function generateStaticParams() {
  return categoriesWithContent().map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat || cat.tableIds.length === 0) notFound();
  const tables = tablesByCategory(category);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs items={[{ href: "/", label: "Toolbox" }, { label: cat.name }]} />
        <Eyebrow>Chapter</Eyebrow>
        <h1 className="display text-4xl text-[var(--color-ivory)]">{cat.name}</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-parchment)]">{cat.blurb}</p>
        <Divider />
        <div className="grid gap-4 sm:grid-cols-2">
          {tables.map((t) => <TableCard key={t.id} table={t} />)}
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 5: Write `app/[category]/[table]/page.tsx` (table page)**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RollTableView } from "@/components/RollTableView";
import { RelatedTables } from "@/components/RelatedTables";
import { FavoriteButton } from "@/components/FavoriteButton";
import { RecentTracker } from "@/components/RecentTracker";
import { Eyebrow, Divider, Frame } from "@/components/ornaments";
import { allTables, getCategory, getTableBySlug } from "@/lib/registry";

export function generateStaticParams() {
  return allTables.map((t) => ({ category: t.category, table: t.slug }));
}

export default async function TablePage({ params }: { params: Promise<{ category: string; table: string }> }) {
  const { category, table } = await params;
  const t = getTableBySlug(category, table);
  const cat = getCategory(category);
  if (!t || !cat) notFound();
  return (
    <>
      <Header />
      <RecentTracker tableId={t.id} />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={[{ href: "/", label: "Toolbox" }, { href: `/${cat.slug}`, label: cat.name }, { label: t.name }]} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>{cat.name}</Eyebrow>
            <h1 className="display text-4xl text-[var(--color-ivory)]">{t.name}</h1>
          </div>
          <FavoriteButton tableId={t.id} />
        </div>
        <p className="mt-2 max-w-2xl text-[var(--color-parchment)]">{t.description}</p>
        <Divider />
        <Frame><RollTableView table={t} /></Frame>
        <RelatedTables ids={t.relatedTableIds ?? []} />
        <div className="mt-10 flex gap-4 text-sm">
          <Link href={`/${cat.slug}`} className="text-[var(--color-gold)]">← {cat.name}</Link>
          <Link href="/" className="text-[var(--color-gold)]">⌂ Toolbox</Link>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 6: Write `components/SearchBox.tsx` (client)**

```tsx
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { searchTables } from "@/lib/search";

export function SearchBox() {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchTables(q), [q]);
  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tables…"
        aria-label="Search tables"
        className="w-full rounded-full border border-[color-mix(in_oklab,var(--color-gold)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-ink)_70%,transparent)] px-4 py-1.5 text-sm text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)]"
      />
      {q.trim() && (
        <ul className="panel absolute right-0 z-30 mt-2 max-h-80 w-80 overflow-auto p-2">
          {results.length === 0 ? (
            <li className="px-2 py-1 text-sm text-[var(--color-parchment)]">No tables found.</li>
          ) : results.map((t) => (
            <li key={t.id}>
              <Link href={`/${t.category}/${t.slug}`} className="block rounded px-2 py-1 text-sm hover:bg-[color-mix(in_oklab,var(--color-plum)_50%,transparent)]" onClick={() => setQ("")}>
                {t.name} <span className="eyebrow ml-1">{t.die}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

Wire `<SearchBox />` into `Header` children where the header is used (pass as child), e.g. update the section/table/home pages to render `<Header><SearchBox /></Header>`.

- [ ] **Step 7: Write `components/HomeShelves.tsx` (client)**

```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadFavorites, loadRecent } from "@/lib/storage";
import { getTable } from "@/lib/registry";

function Shelf({ title, ids }: { title: string; ids: string[] }) {
  const tables = ids.map(getTable).filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (tables.length === 0) return null;
  return (
    <section className="mb-8">
      <div className="eyebrow mb-3">{title}</div>
      <div className="flex flex-wrap gap-3">
        {tables.map((t) => (
          <Link key={t.id} href={`/${t.category}/${t.slug}`} className="panel px-4 py-2 text-sm hover:border-[var(--color-gold)]">{t.name}</Link>
        ))}
      </div>
    </section>
  );
}

export function HomeShelves() {
  const [fav, setFav] = useState<string[]>([]);
  const [rec, setRec] = useState<string[]>([]);
  useEffect(() => { setFav(loadFavorites()); setRec(loadRecent()); }, []);
  return (
    <>
      <Shelf title="My Favorites" ids={fav} />
      <Shelf title="Recently Viewed" ids={rec} />
    </>
  );
}
```

- [ ] **Step 8: Write the home page `app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { HomeShelves } from "@/components/HomeShelves";
import { CategoryCard } from "@/components/CategoryCard";
import { Eyebrow, Divider } from "@/components/ornaments";
import { categories } from "@/lib/registry";

export default function Home() {
  return (
    <>
      <Header><SearchBox /></Header>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <Eyebrow>A digital book of adventure tables</Eyebrow>
          <h1 className="display mt-2 text-5xl text-[var(--color-ivory)]">The Solo Adventurer&apos;s Toolbox</h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-parchment)]">Browse the chapters, open a table, roll your own dice, and read the result.</p>
        </div>
        <Divider />
        <HomeShelves />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
        </div>
      </main>
    </>
  );
}
```

> Category cards for chapters without content yet still navigate to a section page that shows a short "coming soon in this edition" state — since `[category]/page.tsx` calls `notFound()` for empty categories, instead render empty categories as **non-linking** cards on the home page in this slice: give `CategoryCard` an optional `disabled` prop (when `category.tableIds.length === 0`, render a dimmed `div` instead of a `Link`). Update `CategoryCard` accordingly.

- [ ] **Step 9: Update `CategoryCard` to handle empty chapters**

```tsx
import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  const empty = category.tableIds.length === 0;
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="display text-xl text-[var(--color-ivory)]">{category.name}</span>
        {empty ? <span className="eyebrow">Soon</span> : null}
      </div>
      <p className="mt-1 text-sm text-[var(--color-parchment)]">{category.blurb}</p>
    </>
  );
  if (empty) return <div className="panel block cursor-default p-5 opacity-55">{inner}</div>;
  return <Link href={`/${category.slug}`} className="panel block p-5 transition-colors hover:border-[var(--color-gold)]">{inner}</Link>;
}
```

- [ ] **Step 10: Build + typecheck + test**

Run: `npm run build && npm run typecheck && npm test`
Expected: all pass. Integrity test now validates all 13 Quests tables (coverage, related IDs, uniqueness). Fix any coverage errors it reports (they name the offending table + position).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add routes, search UI, home shelves, and full Quests content"
```

---

### Task 9: Slice verification + Vercel readiness

**Files:**
- Create: `README.md` (run/deploy notes)

- [ ] **Step 1: Full verification sweep**

Run: `npm run build && npm run typecheck && npm test`
Expected: all green. Confirm the guard, integrity, ranges, search, storage, registry suites all pass.

- [ ] **Step 2: Manual smoke check**

Run: `npm run dev`, then verify in the browser:
- Home shows title + 14 chapter cards (Quests active, others dimmed "Soon").
- Search "quest" / "rumour" / "story" surfaces matching tables and navigates.
- Quests landing lists 13 tables; each opens; ranges display; related links navigate; back links work.
- Bookmark a table → appears under "My Favorites" after reload; visiting tables fills "Recently Viewed".
- App runs with no `.env` / no API keys.

- [ ] **Step 3: Write `README.md`**

Short: what it is, `npm run dev/build/test`, "works with zero API keys", deploy to Vercel (import repo, framework auto-detected Next.js, no env vars required), and the golden rule (no in-app dice/generation; player rolls physical dice).

- [ ] **Step 4: Commit + tag the slice**

```bash
git add -A
git commit -m "docs: add README; Quests slice complete and verified"
```

- [ ] **Step 5: Report for review**

Summarize what's built, share a screenshot of the home + a Quests table page, and confirm the design/look is approved before starting the scale phase (remaining 13 categories to spec minimums), which will be a separate plan.

---

## Self-Review

**1. Spec coverage:**
- No-randomization rules → Global Constraints + Task 1 guard test. ✓
- Static data architecture / types → Task 2 + Task 3. ✓
- Data-driven routing (`/`, `/[category]`, `/[category]/[table]`, `not-found`) → Task 8. ✓ (`/6d12`, `/reference` deferred to scale phase per spec — noted.)
- Table presentation (die/range column, alternating rows, horizontal scroll, list format) → Task 7 `RollTableView`. ✓
- Search → Task 4 + Task 8 `SearchBox`. ✓
- Favorites + recently viewed → Task 5 + Task 7 + Task 8 `HomeShelves`. ✓
- Cross-referencing (related links as navigation) → Task 7 `RelatedTables`. ✓
- Visual direction (panels, gold brackets, knotwork dividers, small-caps eyebrows, serif display, pill buttons) → Task 6 ornaments/theme. ✓
- Backgrounds self-contained, no keys → Task 6 `SiteBackground`. ✓
- Accessibility/reduced-motion/keyboard → Task 6 CSS + semantic components. ✓
- Quests content to spec minimums → Task 3 + Task 8. ✓
- Verification (build, typecheck, guard, integrity) → Task 9. ✓

**2. Placeholder scan:** Content tasks specify exact IDs/dice/counts + integrity enforcement; example entries shown; test code is complete. Creative entry text is authored at execution (that IS the deliverable), not left as "TODO" in code. ✓

**3. Type consistency:** `RollTable`/`TableEntry`/`Category` fields, registry function names (`getTable`, `getTableBySlug`, `getCategory`, `tablesByCategory`, `categoriesWithContent`, `allTables`), storage (`toggleId`, `addRecent`, `loadFavorites`, `saveFavorites`, `loadRecent`, `pushRecent`), and `searchTables` are used consistently across tasks. Next 15 async `params` (`Promise<...>`) used in both dynamic routes. ✓

## Scale Phase (separate plan, after slice approval)

One plan (or one per category) to author the remaining chapters to spec minimums — Start, Wilderness, Settlements, Dungeons, Encounters, Combat, Investigation, NPCs, Treasure, Events, Villains, Names, Reference — plus the `/6d12` reference page and `/reference` hub, wiring cross-links across sections. Each new table is automatically covered by the existing integrity + no-randomization guards.
