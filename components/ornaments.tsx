import Link from "next/link";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function Divider() {
  return <div className="rule my-6" role="presentation" />;
}

export function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`panel p-6 md:p-8 ${className}`}>{children}</div>;
}

export function PillLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-gold)_45%,transparent)] px-5 py-2 text-[var(--color-ivory)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
    >
      {children}
    </Link>
  );
}
