import Link from "next/link";
import type { RollTable } from "@/lib/types";

export function TableCard({ table }: { table: RollTable }) {
  return (
    <Link
      href={`/${table.category}/${table.slug}`}
      className="panel block p-4 transition-colors hover:border-[var(--color-gold)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="display text-lg text-[var(--color-ivory)]">{table.name}</span>
        <span className="eyebrow">{table.die}</span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-parchment)]">{table.description}</p>
    </Link>
  );
}
