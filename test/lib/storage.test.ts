import { describe, it, expect } from "vitest";
import { toggleId, addRecent } from "@/lib/storage";

describe("toggleId", () => {
  it("adds when absent", () => {
    expect(toggleId(["a"], "b")).toEqual(["a", "b"]);
  });
  it("removes when present", () => {
    expect(toggleId(["a", "b"], "a")).toEqual(["b"]);
  });
});

describe("addRecent", () => {
  it("moves to front and de-dupes", () => {
    expect(addRecent(["b", "a"], "a")).toEqual(["a", "b"]);
  });
  it("caps length", () => {
    expect(addRecent(["1", "2", "3"], "4", 3)).toEqual(["4", "1", "2"]);
  });
});
