import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RollTableView } from "@/components/RollTableView";
import { RelatedTables } from "@/components/RelatedTables";
import { FavoriteButton } from "@/components/FavoriteButton";
import { RecentTracker } from "@/components/RecentTracker";
import { Eyebrow, Divider, Frame } from "@/components/ornaments";
import { allTables, getCategory, getTableBySlug } from "@/lib/registry";

export function generateStaticParams() {
  return allTables.map((t) => ({ category: t.category, table: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; table: string }>;
}): Promise<Metadata> {
  const { category, table } = await params;
  const t = getTableBySlug(category, table);
  if (!t) return { title: "Not found — The Solo Adventurer's Toolbox" };
  return { title: `${t.name} — The Solo Adventurer's Toolbox`, description: t.description };
}

export default async function TablePage({
  params,
}: {
  params: Promise<{ category: string; table: string }>;
}) {
  const { category, table } = await params;
  const t = getTableBySlug(category, table);
  const cat = getCategory(category);
  if (!t || !cat) notFound();
  return (
    <>
      <Header>
        <SearchBox />
      </Header>
      <RecentTracker tableId={t.id} />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs
          items={[
            { href: "/", label: "Toolbox" },
            { href: `/${cat.slug}`, label: cat.name },
            { label: t.name },
          ]}
        />
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>{cat.name}</Eyebrow>
            <h1 className="display text-4xl text-[var(--color-ivory)]">{t.name}</h1>
          </div>
          <FavoriteButton tableId={t.id} />
        </div>
        <p className="mt-2 max-w-2xl text-[var(--color-parchment)]">{t.description}</p>
        <Divider />
        <Frame>
          <RollTableView table={t} />
        </Frame>
        <RelatedTables ids={t.relatedTableIds ?? []} />
        <div className="mt-10 flex gap-4 text-sm">
          <Link href={`/${cat.slug}`} className="text-[var(--color-gold)]">
            ← {cat.name}
          </Link>
          <Link href="/" className="text-[var(--color-gold)]">
            ⌂ Toolbox
          </Link>
        </div>
      </main>
    </>
  );
}
