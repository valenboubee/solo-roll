import type { RollTable } from "@/lib/types";
import { questTypes } from "./types";
import { questGoals } from "./goals";
import { questSources } from "./sources";
import { questLocations } from "./locations";
import { questComplications } from "./complications";
import { questRewards } from "./rewards";
import { questTwists } from "./twists";
import { storyEvents } from "./story-events";
import { majorEvents } from "./major-events";
import { unresolvedThreads } from "./threads";
import { questNames } from "./names";
import { rumours } from "./rumours";
import { cluesLeads } from "./clues";

export const questTables: RollTable[] = [
  questTypes,
  questGoals,
  questSources,
  questLocations,
  questComplications,
  questRewards,
  questTwists,
  storyEvents,
  majorEvents,
  unresolvedThreads,
  questNames,
  rumours,
  cluesLeads,
];
