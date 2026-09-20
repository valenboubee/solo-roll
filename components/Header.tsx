import Link from "next/link";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[color-mix(in_oklab,var(--color-gold)_20%,transparent)] bg-[color-mix(in_oklab,var(--color-ink)_82%,transparent)] backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="display text-lg text-[var(--color-ivory)] hover:text-[var(--color-gold)]"
        >
          The Solo Adventurer&apos;s Toolbox
        </Link>
        <div className="max-w-xs flex-1">{children}</div>
      </div>
    </header>
  );
}
