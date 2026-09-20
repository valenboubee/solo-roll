"use client";
import { useEffect } from "react";
import { pushRecent } from "@/lib/storage";

export function RecentTracker({ tableId }: { tableId: string }) {
  useEffect(() => {
    pushRecent(tableId);
  }, [tableId]);
  return null;
}
