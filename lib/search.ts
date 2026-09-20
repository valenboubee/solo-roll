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
