import { makeTable } from "@/lib/tableBuilder";

// Ordered common → rare so the earliest entries claim the slightly larger
// d100 bands — a gentle weighting toward the folk you meet most often.
export const npcRace = makeTable({
  id: "npcs.race",
  name: "Race & Ancestry",
  category: "npcs",
  slug: "race",
  description:
    "The lineage this person was born into, and the reputation it carries in most towns. Roll a d100; common folk fill the wider bands near the top. Swap freely to fit your own world.",
  die: "d100",
  results: [
    "Human — the restless many, found in every trade, faith, and quarrel.",
    "Half-Elf — at ease in two worlds and quite at home in neither.",
    "Dwarf — stout and stubborn, keeper of grudges and good stonework.",
    "Elf — long-lived and unhurried, measuring years the way others count days.",
    "Halfling — small, sensible, and harder to unsettle than they look.",
    "Gnome — bright-eyed tinkerer or scholar, delighted by small clever things.",
    "Half-Orc — powerfully built, forever proving they are more than a rumour.",
    "Tiefling — fiend-marked by blood, watched with suspicion they did not earn.",
    "Dragonborn — scaled and proud, carrying an ancestor's draconic temper.",
    "Orc — strong and direct, from a people the settled lands still fear.",
    "Goblin — quick, wary survivor who has learned to be underestimated.",
    "Hobgoblin — disciplined and rank-minded, raised to war and order.",
    "Kobold — small and clannish, cunning far beyond their reputation.",
    "Goliath — giant-blooded and mountain-bred, plain-spoken about strength.",
    "Aasimar — celestial-touched, uneasy under the light people expect of them.",
    "Firbolg — gentle fey-giant of deep woods, slow to speak and slower to anger.",
    "Tabaxi — curious cat-folk wanderer, collector of tales and shining trinkets.",
    "Lizardfolk — cold-logical scale-kin who weigh worth by usefulness.",
    "Tortle — patient turtle-folk who carry home, shell and all, on their backs.",
    "Triton — sea-born and haughty, far from the tides they were made for.",
    "Genasi — elemental-touched, trailing a whisper of fire, wave, wind, or stone.",
    "Bugbear — hulking and stealthy, unsettlingly quiet for their size.",
    "Kenku — raven-folk who speak only in borrowed voices and stolen sounds.",
    "Changeling — shape-shifter who wears a hundred faces and trusts none of them.",
  ],
  relatedTableIds: ["npcs.class", "npcs.occupations", "character.race"],
});
