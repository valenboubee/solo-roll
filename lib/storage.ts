const FAV = "sat.favorites";
const REC = "sat.recent";

export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

export function addRecent(ids: string[], id: string, max = 12): string[] {
  return [id, ...ids.filter((x) => x !== id)].slice(0, max);
}

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function write(key: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export const loadFavorites = () => read(FAV);
export const saveFavorites = (ids: string[]) => write(FAV, ids);
export const loadRecent = () => read(REC);
export const pushRecent = (id: string) => write(REC, addRecent(loadRecent(), id));
