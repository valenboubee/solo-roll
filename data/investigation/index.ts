import type { RollTable } from "@/lib/types";
import { yesNoOracle } from "./oracle";
import { likelihoodModifiers } from "./likelihood";
import { oracleTwists } from "./twists";
import { investigationClues } from "./clues";
import { investigationLeads } from "./leads";
import { falseLeads } from "./false-leads";
import { hiddenTruths } from "./hidden-truths";
import { investigationEvents } from "./events";
import { skillChallenges } from "./skill-challenges";
import { dcReference } from "./dc-reference";

export const investigationTables: RollTable[] = [
  yesNoOracle,
  likelihoodModifiers,
  oracleTwists,
  investigationClues,
  investigationLeads,
  falseLeads,
  hiddenTruths,
  investigationEvents,
  skillChallenges,
  dcReference,
];
