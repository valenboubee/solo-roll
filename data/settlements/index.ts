import type { RollTable } from "@/lib/types";
import { settlementSize } from "./size";
import { settlementPopulation } from "./population";
import { settlementGovernance } from "./governance";
import { settlementDistricts } from "./districts";
import { settlementDistrictDisturbances } from "./district-disturbances";
import { settlementStreets } from "./streets";
import { settlementStreetActivity } from "./street-activity";
import { settlementStreetEvents } from "./street-events";
import { settlementBuildings } from "./buildings";
import { settlementShops } from "./shops";
import { settlementTaverns } from "./taverns";
import { settlementLandmarks } from "./landmarks";
import { settlementUrbanEncounters } from "./urban-encounters";
import { settlementRumours } from "./rumours";
import { quickCitizens } from "./citizens";

export const settlementsTables: RollTable[] = [
  settlementSize,
  settlementPopulation,
  settlementGovernance,
  settlementDistricts,
  settlementDistrictDisturbances,
  settlementStreets,
  settlementStreetActivity,
  settlementStreetEvents,
  settlementBuildings,
  settlementShops,
  settlementTaverns,
  settlementLandmarks,
  settlementUrbanEncounters,
  settlementRumours,
  quickCitizens,
];
