import type { RollTable } from "@/lib/types";
import { boons } from "./boons";
import { banes } from "./banes";
import { fortune } from "./fortune";
import { misfortune } from "./misfortune";
import { randomEvents } from "./random";
import { opportunities } from "./opportunities";
import { omens } from "./omens";
import { crisis } from "./crisis";

export const eventsTables: RollTable[] = [
  boons,
  banes,
  fortune,
  misfortune,
  randomEvents,
  opportunities,
  omens,
  crisis,
];
