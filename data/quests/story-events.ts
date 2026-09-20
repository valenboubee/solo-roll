import type { RollTable } from "@/lib/types";

export const storyEvents: RollTable = {
  id: "quests.story-events",
  name: "Story Events",
  category: "quests",
  slug: "story-events",
  description:
    "A scene-level development to keep the story moving between beats. Roll a d20 when the pace needs a push.",
  die: "d20",
  entries: [
    { id: "quests.story-events.1", range: "1", result: "An old ally arrives with news that changes the stakes." },
    { id: "quests.story-events.2", range: "2", result: "A message reaches you, late and by an unexpected hand." },
    { id: "quests.story-events.3", range: "3", result: "Someone offers help — at a price you must decide on now." },
    { id: "quests.story-events.4", range: "4", result: "A rival makes their move openly for the first time." },
    { id: "quests.story-events.5", range: "5", result: "An accident forces a choice no one had planned for." },
    { id: "quests.story-events.6", range: "6", result: "A secret is spoken aloud in front of the wrong person." },
    { id: "quests.story-events.7", range: "7", result: "A debt or promise comes due at the worst moment." },
    { id: "quests.story-events.8", range: "8", result: "The weather, a festival, or a crowd complicates the plan." },
    { id: "quests.story-events.9", range: "9", result: "A character reveals a loyalty you did not expect." },
    { id: "quests.story-events.10", range: "10", result: "Something you were carrying is lost, stolen, or damaged." },
    { id: "quests.story-events.11", range: "11", result: "A brief window of opportunity opens and starts to close." },
    { id: "quests.story-events.12", range: "12", result: "An authority takes an interest in your business." },
    { id: "quests.story-events.13", range: "13", result: "A bystander is hurt, and someone must answer for it." },
    { id: "quests.story-events.14", range: "14", result: "New information contradicts what you were told." },
    { id: "quests.story-events.15", range: "15", result: "An enemy proposes a truce, or a trade." },
    { id: "quests.story-events.16", range: "16", result: "A place you counted on is suddenly closed to you." },
    { id: "quests.story-events.17", range: "17", result: "A face from your past appears in the crowd." },
    { id: "quests.story-events.18", range: "18", result: "A small kindness now will matter greatly later." },
    { id: "quests.story-events.19", range: "19", result: "The ground shifts: a death, a departure, or a betrayal." },
    { id: "quests.story-events.20", range: "20", result: "You are handed a chance to end this early — if you dare take it." },
  ],
  relatedTableIds: ["quests.complications", "quests.major-events", "quests.rumours"],
};
