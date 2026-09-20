import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-parchment)]">
      {items.map((it, i) => (
        <span key={i}>
          {it.href ? (
            <Link href={it.href} className="hover:text-[var(--color-gold)]">
              {it.label}
            </Link>
          ) : (
            <span>{it.label}</span>
          )}
          {i < items.length - 1 ? (
            <span className="px-2 text-[var(--color-bronze)]">›</span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}
