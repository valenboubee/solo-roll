import type { RollTable } from "@/lib/types";
import { villainMotivations } from "./motivations";
import { villainMethods } from "./methods";
import { villainTraits } from "./traits";
import { villainWeaknesses } from "./weaknesses";
import { villainSecrets } from "./secrets";
import { villainClues } from "./clues";
import { villainConcepts } from "./concepts";
import { villainLairs } from "./lairs";
import { villainLairFeatures } from "./lair-features";
import { villainFinalEncounter } from "./final-encounter";

export const villainsTables: RollTable[] = [
  villainMotivations,
  villainMethods,
  villainTraits,
  villainWeaknesses,
  villainSecrets,
  villainClues,
  villainConcepts,
  villainLairs,
  villainLairFeatures,
  villainFinalEncounter,
];
