import type { RollTable } from "@/lib/types";
import { wildernessTerrain } from "./terrain";
import { wildernessFeatures } from "./features";
import { wildernessLandmarks } from "./landmarks";
import { wildernessStructures } from "./structures";
import { wildernessTravelEvents } from "./travel-events";
import { wildernessEncounters } from "./encounters";
import { wildernessClues } from "./clues";
import { wildernessWeather } from "./weather";
import { wildernessCampsites } from "./campsites";
import { wildernessTraps } from "./traps";

export const wildernessTables: RollTable[] = [
  wildernessTerrain,
  wildernessFeatures,
  wildernessLandmarks,
  wildernessStructures,
  wildernessTravelEvents,
  wildernessEncounters,
  wildernessClues,
  wildernessWeather,
  wildernessCampsites,
  wildernessTraps,
];
