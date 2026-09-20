import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { HomeShelves } from "@/components/HomeShelves";
import { CategoryCard } from "@/components/CategoryCard";
import { Eyebrow, Divider } from "@/components/ornaments";
import { categories } from "@/lib/registry";

export default function Home() {
  return (
    <>
      <Header>
        <SearchBox />
      </Header>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <Eyebrow>A digital book of adventure tables</Eyebrow>
          <h1 className="display mt-2 text-5xl text-[var(--color-ivory)]">
            The Solo Adventurer&apos;s Toolbox
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-parchment)]">
            Browse the chapters, open a table, roll your own dice, and read the result.
          </p>
        </div>
        <Divider />
        <HomeShelves />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </main>
    </>
  );
}
