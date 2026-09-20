import type { RollTable } from "@/lib/types";

export const encounterDifficulty: RollTable = {
  id: "encounters.difficulty",
  name: "Encounter Difficulty Reference",
  category: "encounters",
  slug: "difficulty",
  description:
    "A system-agnostic gauge for pitching an encounter, and for reading the fiction when you improvise one solo. Match the situation to a rung.",
  die: "—",
  format: "list",
  entries: [
    { id: "encounters.difficulty.1", result: "Trivial — a speed bump; interesting only for colour or resources spent." },
    { id: "encounters.difficulty.2", result: "Easy — the party should win or pass without real risk." },
    { id: "encounters.difficulty.3", result: "Fair — a genuine test that a prepared party handles well." },
    { id: "encounters.difficulty.4", result: "Hard — costs something: wounds, resources, or a difficult choice." },
    { id: "encounters.difficulty.5", result: "Severe — the party should consider avoiding, negotiating, or fleeing." },
    { id: "encounters.difficulty.6", result: "Deadly — a straight fight is likely to kill someone; win by cleverness." },
    { id: "encounters.difficulty.7", result: "Numbers — many weak foes threaten through position and attrition, not strength." },
    { id: "encounters.difficulty.8", result: "Single threat — one dangerous foe rewards focus, terrain, and teamwork." },
    { id: "encounters.difficulty.9", result: "Solo scaling — for one character, halve the opposition and add an escape route." },
    { id: "encounters.difficulty.10", result: "The real cost — ask what failure loses, not just who survives; that sets the true stakes." },
  ],
  relatedTableIds: ["encounters.combat-seeds", "encounters.complications"],
};
