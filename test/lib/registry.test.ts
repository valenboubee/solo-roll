import { describe, it, expect } from "vitest";
import {
  allTables,
  getTable,
  getTableBySlug,
  getCategory,
  tablesByCategory,
  categoriesWithContent,
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
