import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableCard } from "@/components/TableCard";
import { Eyebrow, Divider } from "@/components/ornaments";
import { categoriesWithContent, getCategory, tablesByCategory } from "@/lib/registry";

export function generateStaticParams() {
  return categoriesWithContent().map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat || cat.tableIds.length === 0) notFound();
  const tables = tablesByCategory(category);
  return (
    <>
      <Header>
        <SearchBox />
      </Header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs items={[{ href: "/", label: "Toolbox" }, { label: cat.name }]} />
        <Eyebrow>Chapter</Eyebrow>
        <h1 className="display text-4xl text-[var(--color-ivory)]">{cat.name}</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-parchment)]">{cat.blurb}</p>
        <Divider />
        <div className="grid gap-4 sm:grid-cols-2">
          {tables.map((t) => (
            <TableCard key={t.id} table={t} />
          ))}
        </div>
      </main>
    </>
  );
}
