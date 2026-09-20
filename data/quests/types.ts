import type { RollTable } from "@/lib/types";

export const questTypes: RollTable = {
  id: "quests.types",
  name: "Quest Types",
  category: "quests",
  slug: "types",
  description:
    "The broad shape of the adventure ahead. Roll a d12 to frame the quest before detailing its goal, patron, and complications.",
  die: "d12",
  entries: [
    { id: "quests.types.1", range: "1", result: "Retrieval — recover a specific object from a dangerous or well-guarded place." },
    { id: "quests.types.2", range: "2", result: "Escort — guide a person, caravan, or fragile cargo safely across hostile ground." },
    { id: "quests.types.3", range: "3", result: "Rescue — free a captive before a deadline, or before harm becomes permanent." },
    { id: "quests.types.4", range: "4", result: "Hunt — track and confront a creature or fugitive that does not wish to be found." },
    { id: "quests.types.5", range: "5", result: "Delivery — carry a message or item to a distant destination, discreetly and intact." },
    { id: "quests.types.6", range: "6", result: "Investigation — uncover the truth behind a crime, disappearance, or strange event." },
    { id: "quests.types.7", range: "7", result: "Sabotage — disrupt, disable, or destroy an enemy's plan, device, or supply line." },
    { id: "quests.types.8", range: "8", result: "Negotiation — broker a bargain, truce, or alliance between wary or hostile parties." },
    { id: "quests.types.9", range: "9", result: "Defense — hold a place, person, or event against an approaching threat." },
    { id: "quests.types.10", range: "10", result: "Exploration — map, survey, or scout an unknown region and return with what you learn." },
    { id: "quests.types.11", range: "11", result: "Cleansing — end a curse, haunting, blight, or infestation at its source." },
    { id: "quests.types.12", range: "12", result: "Heist — infiltrate a stronghold and leave with something that was never meant to leave." },
  ],
};
