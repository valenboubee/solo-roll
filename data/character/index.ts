import type { RollTable } from "@/lib/types";
import { characterRace } from "./race";
import { characterClass } from "./class";
import { characterBackground } from "./background";
import { characterMotivation } from "./motivation";
import { characterTrait } from "./trait";
import { characterIdeal } from "./ideal";
import { characterBond } from "./bond";
import { characterFlaw } from "./flaw";
import { characterQuirk } from "./quirk";
import { characterPossession } from "./possession";

export const characterTables: RollTable[] = [
  characterRace,
  characterClass,
  characterBackground,
  characterMotivation,
  characterTrait,
  characterIdeal,
  characterBond,
  characterFlaw,
  characterQuirk,
  characterPossession,
];
