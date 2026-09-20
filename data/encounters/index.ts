import type { RollTable } from "@/lib/types";
import { genericEncounters } from "./generic";
import { socialEncounters } from "./social";
import { combatSeeds } from "./combat-seeds";
import { nonCombatSeeds } from "./noncombat-seeds";
import { encounterComplications } from "./complications";
import { escalation } from "./escalation";
import { encounterTerrain } from "./terrain";
import { encounterDifficulty } from "./difficulty";

export const encountersTables: RollTable[] = [
  genericEncounters,
  socialEncounters,
  combatSeeds,
  nonCombatSeeds,
  encounterComplications,
  escalation,
  encounterTerrain,
  encounterDifficulty,
];
