import type { RollTable } from "@/lib/types";
import { startingLocations } from "./locations";
import { startingSituations } from "./situations";
import { firstQuestHooks } from "./hooks";
import { quickAdventureSeeds } from "./seeds";
import { backstoryPrompts } from "./backstory";
import { personalGoals } from "./goals";

export const startTables: RollTable[] = [
  startingLocations,
  startingSituations,
  firstQuestHooks,
  quickAdventureSeeds,
  backstoryPrompts,
  personalGoals,
];
