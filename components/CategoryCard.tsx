import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  const empty = category.tableIds.length === 0;
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="display text-xl text-[var(--color-ivory)]">{category.name}</span>
        {empty ? <span className="eyebrow">Soon</span> : null}
      </div>
      <p className="mt-1 text-sm text-[var(--color-parchment)]">{category.blurb}</p>
    </>
  );
  if (empty) {
    return <div className="panel block cursor-default p-5 opacity-55">{inner}</div>;
  }
  return (
    <Link
      href={`/${category.slug}`}
      className="panel block p-5 transition-colors hover:border-[var(--color-gold)]"
    >
      {inner}
    </Link>
  );
}
