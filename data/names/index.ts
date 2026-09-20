import type { RollTable } from "@/lib/types";
import { givenNames } from "./given";
import { familyNames } from "./family";
import { settlementNames } from "./settlements";
import { tavernNames } from "./taverns";
import { placeNames } from "./places";
import { relicNames } from "./relics";
import { keywords } from "./keywords";
import { descriptors } from "./descriptors";
import { actions } from "./actions";

export const namesTables: RollTable[] = [
  givenNames,
  familyNames,
  settlementNames,
  tavernNames,
  placeNames,
  relicNames,
  keywords,
  descriptors,
  actions,
];
