import type { Metadata } from "next";
import Link from "next/link";
import { SiteBackground } from "@/components/SiteBackground";
import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow, Divider, PillLink } from "@/components/ornaments";

const GROUPS: { title: string; blurb: string; items: { label: string; href: string }[] }[] = [
  {
    title: "The Oracle",
    blurb: "Ask the world a question and let your dice answer.",
    items: [
      { label: "Yes / No Oracle", href: "/investigation/oracle" },
      { label: "Likelihood & Modifiers", href: "/investigation/likelihood" },
      { label: "Oracle Twists", href: "/investigation/twists" },
    ],
  },
  {
    title: "Difficulty",
    blurb: "Judge how hard a task or encounter should be.",
    items: [
      { label: "Difficulty Reference", href: "/investigation/dc-reference" },
      { label: "Encounter Difficulty", href: "/encounters/difficulty" },
      { label: "Skill Challenges", href: "/investigation/skill-challenges" },
    ],
  },
  {
    title: "Adventure Presence",
    blurb: "Find out what a new place holds with six dice.",
    items: [{ label: "6d12 Adventure Presence", href: "/6d12" }],
  },
];

export const metadata: Metadata = {
  title: "Reference — The Solo Adventurer's Toolbox",
  description: "The oracle, difficulty guides, and the 6d12 adventure-presence method.",
};

export default function ReferencePage() {
  return (
    <>
      <SiteBackground theme="reference" />
      <Header>
        <SearchBox />
      </Header>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={[{ href: "/", label: "Toolbox" }, { label: "Reference" }]} />
        <Eyebrow>Chapter</Eyebrow>
        <h1 className="display text-4xl text-[var(--color-ivory)]">Reference</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-parchment)]">
          The tools that hold a solo game together: an oracle to answer your questions, a scale for
          difficulty, and the 6d12 method for filling a place with life. You bring the dice.
        </p>
        <Divider />
        <div className="grid gap-6 sm:grid-cols-2">
          {GROUPS.map((g) => (
            <section key={g.title} className="panel p-5">
              <div className="display text-xl text-[var(--color-ivory)]">{g.title}</div>
              <p className="mt-1 mb-3 text-sm text-[var(--color-parchment)]">{g.blurb}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <PillLink key={it.href} href={it.href}>
                    {it.label}
                  </PillLink>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-10 text-sm">
          <Link href="/" className="text-[var(--color-gold)]">⌂ Back to Toolbox</Link>
        </div>
      </main>
    </>
  );
}
