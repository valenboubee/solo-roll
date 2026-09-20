import Link from "next/link";
import { SiteBackground } from "@/components/SiteBackground";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <SiteBackground theme="home" />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="display text-3xl">Page not found</h1>
        <p className="mt-3 text-[var(--color-parchment)]">This page isn&apos;t in the book.</p>
        <p className="mt-6">
          <Link href="/" className="text-[var(--color-gold)]">
            ← Back to Toolbox
          </Link>
        </p>
      </main>
    </>
  );
}
