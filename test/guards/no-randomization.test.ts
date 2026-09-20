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
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
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
