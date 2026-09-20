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
