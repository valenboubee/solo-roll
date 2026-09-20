import { describe, it, expect } from "vitest";
import { makeTable, makeListTable } from "@/lib/tableBuilder";
import { dieSides, validateCoverage } from "@/lib/ranges";

describe("makeTable", () => {
  it("assigns contiguous full coverage for an even split", () => {
    const t = makeTable({
      id: "x.a",
      name: "A",
      category: "x",
      slug: "a",
      description: "d",
      die: "d100",
      results: Array.from({ length: 50 }, (_, i) => `r${i}`),
    });
    expect(t.entries.length).toBe(50);
    expect(validateCoverage(t.entries, dieSides("d100")).ok).toBe(true);
    expect(t.entries[0].range).toBe("01–02");
    expect(t.entries[49].range).toBe("99–100");
  });

  it("handles an uneven split with full coverage", () => {
    const t = makeTable({
      id: "x.b",
      name: "B",
      category: "x",
      slug: "b",
      description: "d",
      die: "d100",
      results: Array.from({ length: 30 }, (_, i) => `r${i}`),
    });
    expect(t.entries.length).toBe(30);
    expect(validateCoverage(t.entries, dieSides("d100")).ok).toBe(true);
  });

  it("uses single values when count equals sides", () => {
    const t = makeTable({
      id: "x.c",
      name: "C",
      category: "x",
      slug: "c",
      description: "d",
      die: "d20",
      results: Array.from({ length: 20 }, (_, i) => `r${i}`),
    });
    expect(t.entries[0].range).toBe("01");
    expect(t.entries[19].range).toBe("20");
    expect(validateCoverage(t.entries, 20).ok).toBe(true);
  });

  it("assigns unique sequential ids", () => {
    const t = makeTable({
      id: "x.d", name: "D", category: "x", slug: "d", description: "d",
      die: "d6", results: ["a", "b", "c", "d", "e", "f"],
    });
    expect(t.entries.map((e) => e.id)).toEqual([
      "x.d.1", "x.d.2", "x.d.3", "x.d.4", "x.d.5", "x.d.6",
    ]);
  });

  it("throws when results exceed die sides", () => {
    expect(() =>
      makeTable({ id: "x.e", name: "E", category: "x", slug: "e", description: "d", die: "d6", results: Array(7).fill("r") }),
    ).toThrow();
  });
});

describe("makeListTable", () => {
  it("produces a list-format table with no ranges", () => {
    const t = makeListTable({
      id: "x.n", name: "N", category: "x", slug: "n", description: "d",
      die: "d100", results: ["one", "two"],
    });
    expect(t.format).toBe("list");
    expect(t.entries[0].range).toBeUndefined();
    expect(t.entries.map((e) => e.id)).toEqual(["x.n.1", "x.n.2"]);
  });
});
