"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { searchTables } from "@/lib/search";

export function SearchBox() {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchTables(q), [q]);
  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tables…"
        aria-label="Search tables"
        className="w-full rounded-full border border-[color-mix(in_oklab,var(--color-gold)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-ink)_70%,transparent)] px-4 py-1.5 text-sm text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)]"
      />
      {q.trim() && (
        <ul className="panel absolute right-0 z-30 mt-2 max-h-80 w-80 overflow-auto p-2">
          {results.length === 0 ? (
            <li className="px-2 py-1 text-sm text-[var(--color-parchment)]">No tables found.</li>
          ) : (
            results.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/${t.category}/${t.slug}`}
                  className="block rounded px-2 py-1 text-sm hover:bg-[color-mix(in_oklab,var(--color-plum)_50%,transparent)]"
                  onClick={() => setQ("")}
                >
                  {t.name} <span className="eyebrow ml-1">{t.die}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
