import { makeTable } from "@/lib/tableBuilder";

export const startingSituations = makeTable({
  id: "start.situations",
  name: "Starting Situation",
  category: "start",
  slug: "situations",
  description:
    "The trouble already in motion as your adventure opens. Roll a d20 for what greets you.",
  die: "d20",
  results: [
    "Someone nearby is about to be robbed, cheated, or worse.",
    "A stranger presses an urgent errand on you and then vanishes.",
    "You witness something you were not meant to see.",
    "A debt, old promise, or old enemy has caught up with you.",
    "A cry for help rises from somewhere close.",
    "A local dispute threatens to boil over into violence.",
    "You are mistaken for someone important, guilty, or expected.",
    "A body, a fire, or an alarm changes the mood in an instant.",
    "A messenger arrives with news that concerns you directly.",
    "A valuable item falls, quite literally, into your hands.",
    "A person you trusted has disappeared, taking something with them.",
    "You wake with no memory of the last day and night.",
    "A patron approaches you openly with a proposition.",
    "A storm, flood, or collapse traps you with strangers.",
    "A rumour points to danger, treasure, or both, close by.",
    "You are given until nightfall to leave, pay, or explain.",
    "A child, animal, or elder is in immediate danger.",
    "A crime is being pinned on the wrong person before your eyes.",
    "An old ally arrives, wounded, with a warning half-spoken.",
    "The thing you came here for is already gone.",
  ],
  relatedTableIds: ["start.locations", "start.hooks", "quests.complications"],
});
