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
