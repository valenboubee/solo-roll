import type { RollTable } from "@/lib/types";
import { monsterIntentions } from "./intentions";
import { monsterTactics } from "./tactics";
import { monsterReactions } from "./reactions";
import { morale } from "./morale";
import { retreat } from "./retreat";
import { combatEvents } from "./events";
import { battlefieldFeatures } from "./battlefield";
import { environmentalHazards } from "./hazards";
import { combatComplications } from "./complications";
import { postCombat } from "./aftermath";

export const combatTables: RollTable[] = [
  monsterIntentions,
  monsterTactics,
  monsterReactions,
  morale,
  retreat,
  combatEvents,
  battlefieldFeatures,
  environmentalHazards,
  combatComplications,
  postCombat,
];
