"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadFavorites, loadRecent } from "@/lib/storage";
import { getTable } from "@/lib/registry";

function Shelf({ title, ids }: { title: string; ids: string[] }) {
  const tables = ids.map(getTable).filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (tables.length === 0) return null;
  return (
    <section className="mb-8">
      <div className="eyebrow mb-3">{title}</div>
      <div className="flex flex-wrap gap-3">
        {tables.map((t) => (
          <Link
            key={t.id}
            href={`/${t.category}/${t.slug}`}
            className="panel px-4 py-2 text-sm hover:border-[var(--color-gold)]"
          >
            {t.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomeShelves() {
  const [fav, setFav] = useState<string[]>([]);
  const [rec, setRec] = useState<string[]>([]);
  useEffect(() => {
    setFav(loadFavorites());
    setRec(loadRecent());
  }, []);
  return (
    <>
      <Shelf title="My Favorites" ids={fav} />
      <Shelf title="Recently Viewed" ids={rec} />
    </>
  );
}
