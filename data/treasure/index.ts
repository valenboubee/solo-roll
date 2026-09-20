import type { RollTable } from "@/lib/types";
import { treasureMundane } from "./mundane";
import { treasureValuables } from "./valuables";
import { treasureLoot } from "./loot";
import { treasureMagicConcepts } from "./magic-concepts";
import { treasureMagicProperties } from "./magic-properties";
import { treasureRelics } from "./relics";
import { treasureConsumables } from "./consumables";
import { treasureEffects } from "./effects";

export const treasureTables: RollTable[] = [
  treasureMundane,
  treasureValuables,
  treasureLoot,
  treasureMagicConcepts,
  treasureMagicProperties,
  treasureRelics,
  treasureConsumables,
  treasureEffects,
];
