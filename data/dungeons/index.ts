import type { RollTable } from "@/lib/types";
import { dungeonTypes } from "./types";
import { dungeonThemes } from "./themes";
import { dungeonStartingAreas } from "./starting-areas";
import { dungeonRooms } from "./rooms";
import { dungeonRoomContents } from "./room-contents";
import { dungeonPassages } from "./passages";
import { dungeonFeatures } from "./features";
import { dungeonTraps } from "./traps";
import { dungeonSecretDoors } from "./secret-doors";
import { dungeonClues } from "./clues";
import { dungeonEncounters } from "./encounters";
import { dungeonTreasure } from "./treasure";
import { dungeonEvents } from "./events";

export const dungeonsTables: RollTable[] = [
  dungeonTypes,
  dungeonThemes,
  dungeonStartingAreas,
  dungeonRooms,
  dungeonRoomContents,
  dungeonPassages,
  dungeonFeatures,
  dungeonTraps,
  dungeonSecretDoors,
  dungeonClues,
  dungeonEncounters,
  dungeonTreasure,
  dungeonEvents,
];
