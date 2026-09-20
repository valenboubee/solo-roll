import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow, Divider, Frame } from "@/components/ornaments";

export const metadata: Metadata = {
  title: "6d12 Adventure Presence — The Solo Adventurer's Toolbox",
  description:
    "A reference for the six-dice method: what each d12 checks for, the trigger thresholds by context, and which table to consult.",
};

type Element = {
  die: number;
  name: string;
  checks: string;
  consult: { label: string; href: string }[];
};

const ELEMENTS: Element[] = [
  {
    die: 1,
    name: "Monsters",
    checks: "Is something dangerous present, watching, or nearby?",
    consult: [
      { label: "Combat Seeds", href: "/encounters/combat-seeds" },
      { label: "Wilderness Encounters", href: "/wilderness/encounters" },
      { label: "Dungeon Encounters", href: "/dungeons/encounters" },
    ],
  },
  {
    die: 2,
    name: "Clues",
    checks: "Is there a sign, trail, or piece of evidence to be found?",
    consult: [
      { label: "Wilderness Clues", href: "/wilderness/clues" },
      { label: "Dungeon Clues", href: "/dungeons/clues" },
      { label: "Clues & Evidence", href: "/investigation/clues" },
    ],
  },
  {
    die: 3,
    name: "Environment Feature",
    checks: "Is there something notable about the place itself?",
    consult: [
      { label: "Wilderness Features", href: "/wilderness/features" },
      { label: "Dungeon Features", href: "/dungeons/features" },
      { label: "Encounter Terrain", href: "/encounters/terrain" },
    ],
  },
  {
    die: 4,
    name: "NPC",
    checks: "Is there a person here to meet, watch, or avoid?",
    consult: [
      { label: "Quick Citizens", href: "/settlements/citizens" },
      { label: "Social Encounters", href: "/encounters/social" },
      { label: "NPC Occupations", href: "/npcs/occupations" },
    ],
  },
  {
    die: 5,
    name: "Treasure",
    checks: "Is there something of value to be found or won?",
    consult: [
      { label: "Loot & Hoard", href: "/treasure/loot" },
      { label: "Dungeon Treasure", href: "/dungeons/treasure" },
      { label: "Unusual Valuables", href: "/treasure/valuables" },
    ],
  },
  {
    die: 6,
    name: "Random Event",
    checks: "Does something simply happen — a turn of fortune or fate?",
    consult: [
      { label: "Random Events", href: "/events/random" },
      { label: "Story Events", href: "/quests/story-events" },
      { label: "Boons & Banes", href: "/events/boons" },
    ],
  },
];

// Trigger thresholds by context. An element is PRESENT when its d12 shows
// a value at or below the listed number. Higher numbers = a busier scene.
const CONTEXTS: { name: string; thresholds: number[] }[] = [
  { name: "Standard Wilderness", thresholds: [3, 3, 4, 2, 2, 3] },
  { name: "Special Wilderness", thresholds: [5, 4, 6, 3, 3, 4] },
  { name: "Standard Room", thresholds: [3, 4, 5, 2, 3, 2] },
  { name: "Special Room", thresholds: [5, 5, 7, 3, 5, 3] },
  { name: "Passage", thresholds: [2, 2, 4, 1, 1, 2] },
];

export default function SixD12Page() {
  return (
    <>
      <Header>
        <SearchBox />
      </Header>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={[{ href: "/", label: "Toolbox" }, { label: "6d12 Adventure Presence" }]} />
        <Eyebrow>Reference</Eyebrow>
        <h1 className="display text-4xl text-[var(--color-ivory)]">6d12 Adventure Presence</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-parchment)]">
          A fast way to find out what is present in a new place. Take{" "}
          <strong className="text-[var(--color-ivory)]">six twelve-sided dice</strong>, one for each
          kind of adventure element, and roll them together. For the context you are in, any die that
          shows a value <em>at or below</em> its threshold means that element is{" "}
          <strong className="text-[var(--color-ivory)]">present</strong> — turn to the matching table
          and read a result. Roll your own dice; this page only tells you what they mean.
        </p>

        <Divider />

        <Eyebrow>The Six Dice</Eyebrow>
        <Frame className="mt-3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="eyebrow">
                  <th className="w-14 border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2 pr-3">d12</th>
                  <th className="border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2 pr-3">Element</th>
                  <th className="border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2 pr-3">What it checks</th>
                  <th className="border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2">Consult</th>
                </tr>
              </thead>
              <tbody>
                {ELEMENTS.map((el, i) => (
                  <tr key={el.die} className={i % 2 ? "bg-[color-mix(in_oklab,var(--color-plum)_35%,transparent)]" : ""}>
                    <td className="py-2 pr-3 align-top font-[family-name:var(--font-display)] text-[var(--color-gold)]">{el.die}</td>
                    <td className="py-2 pr-3 align-top font-[family-name:var(--font-display)] text-[var(--color-ivory)] whitespace-nowrap">{el.name}</td>
                    <td className="py-2 pr-3 align-top text-[var(--color-parchment)]">{el.checks}</td>
                    <td className="py-2 align-top">
                      <span className="flex flex-wrap gap-x-3 gap-y-1">
                        {el.consult.map((c) => (
                          <Link key={c.href} href={c.href} className="text-[var(--color-gold)] hover:underline whitespace-nowrap">
                            {c.label}
                          </Link>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        <Divider />

        <Eyebrow>Trigger Thresholds by Context</Eyebrow>
        <p className="mt-2 mb-3 max-w-2xl text-[var(--color-parchment)]">
          Choose the row that matches where the party is. An element is present when its die shows a
          number at or below the value in that column.
        </p>
        <Frame>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="eyebrow">
                  <th className="border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2 pr-3">Context</th>
                  {ELEMENTS.map((el) => (
                    <th key={el.die} className="border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2 pr-3 text-center">
                      {el.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONTEXTS.map((ctx, i) => (
                  <tr key={ctx.name} className={i % 2 ? "bg-[color-mix(in_oklab,var(--color-plum)_35%,transparent)]" : ""}>
                    <td className="py-2 pr-3 align-top font-[family-name:var(--font-display)] text-[var(--color-ivory)] whitespace-nowrap">{ctx.name}</td>
                    {ctx.thresholds.map((t, j) => (
                      <td key={j} className="py-2 pr-3 text-center align-top text-[var(--color-gold)]">
                        {t}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        <p className="mt-6 max-w-2xl text-sm text-[var(--color-parchment)]">
          These thresholds are a starting point — raise them for tense, crowded, or story-rich places
          and lower them for quiet, empty ones. When several elements trigger at once, weave the
          results together: a monster guarding treasure beside a clue is a scene, not a list.
        </p>

        <div className="mt-10 flex gap-4 text-sm">
          <Link href="/reference" className="text-[var(--color-gold)]">← Reference</Link>
          <Link href="/" className="text-[var(--color-gold)]">⌂ Toolbox</Link>
        </div>
      </main>
    </>
  );
}
