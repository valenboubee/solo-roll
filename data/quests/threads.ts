import type { RollTable } from "@/lib/types";

export const unresolvedThreads: RollTable = {
  id: "quests.threads",
  name: "Unresolved Threads",
  category: "quests",
  slug: "threads",
  description:
    "A dangling hook to leave behind after a quest, ready to pull on later. Roll a d20 to plant the seed of the next adventure.",
  die: "d20",
  entries: [
    { id: "quests.threads.1", range: "1", result: "Someone escaped, and they know your faces now." },
    { id: "quests.threads.2", range: "2", result: "A promise you made is still unpaid, and remembered." },
    { id: "quests.threads.3", range: "3", result: "An item you took is wanted back by someone patient." },
    { id: "quests.threads.4", range: "4", result: "A question was answered in a way that raised three more." },
    { id: "quests.threads.5", range: "5", result: "You spared someone who will not extend the same mercy." },
    { id: "quests.threads.6", range: "6", result: "A rescued person now depends on you more than you'd like." },
    { id: "quests.threads.7", range: "7", result: "A rival watched you win and learned from your methods." },
    { id: "quests.threads.8", range: "8", result: "A door was opened that cannot easily be closed again." },
    { id: "quests.threads.9", range: "9", result: "A debt was settled, but the ledger has other entries." },
    { id: "quests.threads.10", range: "10", result: "A witness survived to tell a version of events that isn't yours." },
    { id: "quests.threads.11", range: "11", result: "A faction now considers you an asset — or a loose end." },
    { id: "quests.threads.12", range: "12", result: "Something you buried, hid, or sealed will not stay so forever." },
    { id: "quests.threads.13", range: "13", result: "A letter you never sent still needs answering." },
    { id: "quests.threads.14", range: "14", result: "A place you saved expects you to return when it's threatened again." },
    { id: "quests.threads.15", range: "15", result: "A lie you told to smooth things over is starting to fray." },
    { id: "quests.threads.16", range: "16", result: "A child, apprentice, or heir remembers what you did here." },
    { id: "quests.threads.17", range: "17", result: "A reward you refused is still on the table, gathering interest." },
    { id: "quests.threads.18", range: "18", result: "An enemy's ally slipped away to warn the rest." },
    { id: "quests.threads.19", range: "19", result: "A clue you set aside as irrelevant was not." },
    { id: "quests.threads.20", range: "20", result: "Someone swore an oath of vengeance, and they meant it." },
  ],
  relatedTableIds: ["quests.twists", "quests.major-events", "quests.clues"],
};
