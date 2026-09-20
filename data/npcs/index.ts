import type { RollTable } from "@/lib/types";
import { npcOccupations } from "./occupations";
import { npcPersonalities } from "./personalities";
import { npcEmotions } from "./emotions";
import { npcMotivations } from "./motivations";
import { npcGoals } from "./goals";
import { npcSecrets } from "./secrets";
import { npcBonds } from "./bonds";
import { npcFlaws } from "./flaws";
import { npcMannerisms } from "./mannerisms";
import { npcRelationships } from "./relationships";

export const npcsTables: RollTable[] = [
  npcOccupations,
  npcPersonalities,
  npcEmotions,
  npcMotivations,
  npcGoals,
  npcSecrets,
  npcBonds,
  npcFlaws,
  npcMannerisms,
  npcRelationships,
];
