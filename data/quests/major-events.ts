import type { RollTable } from "@/lib/types";

export const majorEvents: RollTable = {
  id: "quests.major-events",
  name: "Major Events",
  category: "quests",
  slug: "major-events",
  description:
    "A larger development that reshapes the region or the campaign. Roll a d20 between chapters or when a quest resolves.",
  die: "d20",
  entries: [
    { id: "quests.major-events.1", range: "1", result: "A ruler dies, abdicates, or is overthrown." },
    { id: "quests.major-events.2", range: "2", result: "War is declared, or a long war suddenly ends." },
    { id: "quests.major-events.3", range: "3", result: "A plague, blight, or famine takes hold across the land." },
    { id: "quests.major-events.4", range: "4", result: "A great fire, flood, or quake remakes a familiar place." },
    { id: "quests.major-events.5", range: "5", result: "A powerful faction fractures into rival successors." },
    { id: "quests.major-events.6", range: "6", result: "A long-sealed border, road, or gate is opened." },
    { id: "quests.major-events.7", range: "7", result: "A discovery upends what everyone believed to be true." },
    { id: "quests.major-events.8", range: "8", result: "A hero falls, and a vacuum forms where they stood." },
    { id: "quests.major-events.9", range: "9", result: "A new power rises quickly and without clear origin." },
    { id: "quests.major-events.10", range: "10", result: "A treaty, marriage, or alliance redraws old loyalties." },
    { id: "quests.major-events.11", range: "11", result: "A great debt is called in across an entire region." },
    { id: "quests.major-events.12", range: "12", result: "A holy site, relic, or tradition is desecrated or lost." },
    { id: "quests.major-events.13", range: "13", result: "A migration or exodus floods the roads with newcomers." },
    { id: "quests.major-events.14", range: "14", result: "A conspiracy is exposed, toppling the trusted and the guilty alike." },
    { id: "quests.major-events.15", range: "15", result: "A market collapses, and fortunes change hands overnight." },
    { id: "quests.major-events.16", range: "16", result: "An omen or celestial event throws the land into unease." },
    { id: "quests.major-events.17", range: "17", result: "A monster or army is loosed that no one can quickly stop." },
    { id: "quests.major-events.18", range: "18", result: "A lost heir returns to claim what was thought settled." },
    { id: "quests.major-events.19", range: "19", result: "A festival or reckoning gathers everyone who matters in one place." },
    { id: "quests.major-events.20", range: "20", result: "A secret you helped keep or reveal becomes common knowledge." },
  ],
  relatedTableIds: ["quests.story-events", "quests.threads", "quests.twists"],
};
