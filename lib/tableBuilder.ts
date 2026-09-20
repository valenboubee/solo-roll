import type { RollTable, TableEntry } from "./types";
import { dieSides } from "./ranges";

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function fmt(min: number, max: number): string {
  return min === max ? pad(min) : `${pad(min)}–${pad(max)}`;
}

type TableInput = {
  id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  die: string;
  results: string[];
  relatedTableIds?: string[];
};

/**
 * Build a ranged RollTable from a plain list of result strings. Ranges are
 * assigned deterministically as contiguous, near-even bands that fully cover
 * the die (larger bands first). This is static layout, not randomization.
 */
export function makeTable(input: TableInput): RollTable {
  const sides = dieSides(input.die);
  const n = input.results.length;
  if (n === 0) throw new Error(`${input.id}: no results`);
  if (n > sides) throw new Error(`${input.id}: ${n} results exceed ${input.die} (${sides})`);

  const base = Math.floor(sides / n);
  const remainder = sides - base * n;
  const entries: TableEntry[] = [];
  let cursor = 1;
  for (let i = 0; i < n; i++) {
    const size = base + (i < remainder ? 1 : 0);
    const min = cursor;
    const max = cursor + size - 1;
    cursor = max + 1;
    entries.push({ id: `${input.id}.${i + 1}`, range: fmt(min, max), result: input.results[i] });
  }

  return {
    id: input.id,
    name: input.name,
    category: input.category,
    slug: input.slug,
    description: input.description,
    die: input.die,
    entries,
    relatedTableIds: input.relatedTableIds,
  };
}

/** Build a list-format RollTable (no ranges) — for name/keyword lists. */
export function makeListTable(input: TableInput): RollTable {
  return {
    id: input.id,
    name: input.name,
    category: input.category,
    slug: input.slug,
    description: input.description,
    die: input.die,
    format: "list",
    entries: input.results.map((r, i) => ({ id: `${input.id}.${i + 1}`, result: r })),
    relatedTableIds: input.relatedTableIds,
  };
}
