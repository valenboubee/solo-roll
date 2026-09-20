import type { Category, RollTable } from "./types";
import { categories } from "@/data/categories";
import { questTables } from "@/data/quests";
import { wildernessTables } from "@/data/wilderness";
import { investigationTables } from "@/data/investigation";
import { npcsTables } from "@/data/npcs";
import { dungeonsTables } from "@/data/dungeons";
import { combatTables } from "@/data/combat";
import { settlementsTables } from "@/data/settlements";
import { encountersTables } from "@/data/encounters";
import { eventsTables } from "@/data/events";
import { treasureTables } from "@/data/treasure";
import { villainsTables } from "@/data/villains";
import { startTables } from "@/data/start";
import { namesTables } from "@/data/names";
import { characterTables } from "@/data/character";

export const allTables: RollTable[] = [
  ...startTables,
  ...characterTables,
  ...questTables,
  ...wildernessTables,
  ...investigationTables,
  ...npcsTables,
  ...dungeonsTables,
  ...combatTables,
  ...settlementsTables,
  ...encountersTables,
  ...eventsTables,
  ...treasureTables,
  ...villainsTables,
  ...namesTables,
];

const byId = new Map(allTables.map((t) => [t.id, t]));

export function getTable(id: string): RollTable | undefined {
  return byId.get(id);
}

export function getTableBySlug(category: string, slug: string): RollTable | undefined {
  return allTables.find((t) => t.category === category && t.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function tablesByCategory(slug: string): RollTable[] {
  const cat = getCategory(slug);
  if (!cat) return [];
  return cat.tableIds
    .map((id) => byId.get(id))
    .filter((t): t is RollTable => Boolean(t));
}

export function categoriesWithContent(): Category[] {
  return categories.filter((c) => c.tableIds.length > 0);
}

export { categories };
