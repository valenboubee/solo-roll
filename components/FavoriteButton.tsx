"use client";
import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites, toggleId } from "@/lib/storage";

export function FavoriteButton({ tableId }: { tableId: string }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    setFav(loadFavorites().includes(tableId));
  }, [tableId]);

  function onToggle() {
    const next = toggleId(loadFavorites(), tableId);
    saveFavorites(next);
    setFav(next.includes(tableId));
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={fav}
      aria-label={fav ? "Remove bookmark" : "Bookmark this table"}
      className="rounded-full border border-[color-mix(in_oklab,var(--color-gold)_45%,transparent)] px-3 py-1 text-sm whitespace-nowrap transition-colors hover:border-[var(--color-gold)]"
    >
      {fav ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
}
