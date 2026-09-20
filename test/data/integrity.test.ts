import { describe, it, expect } from "vitest";
import { allTables, getCategory, categories } from "@/lib/registry";
import { dieSides, validateCoverage } from "@/lib/ranges";

describe("data integrity", () => {
  it("every table id is unique", () => {
    const ids = allTables.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every table has at least one entry", () => {
    for (const t of allTables) expect(t.entries.length, t.id).toBeGreaterThan(0);
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
