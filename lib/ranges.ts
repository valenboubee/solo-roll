import type { TableEntry } from "./types";

const SIDES: Record<string, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
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
  sides: number,
): { ok: boolean; error?: string } {
  const parsed: { min: number; max: number }[] = [];
  for (const e of entries) {
    if (!e.range) return { ok: false, error: `Entry ${e.id} missing range` };
    let r;
    try {
      r = parseRange(e.range);
    } catch (err) {
      return { ok: false, error: String(err) };
    }
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
