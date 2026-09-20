import { makeTable } from "@/lib/tableBuilder";

// A clean d12 — one class to a face, the classic way to roll a calling.
export const npcClass = makeTable({
  id: "npcs.class",
  name: "Class & Vocation",
  category: "npcs",
  slug: "class",
  description:
    "If this person can hold their own, this is the training behind it. Roll a d12. For ordinary folk with no martial or arcane craft, treat a result as merely the path they once dreamed of.",
  die: "d12",
  results: [
    "Fighter — a soldier's schooling in steel, shield, and staying alive.",
    "Wizard — years of study bent into spells drawn from an inked book.",
    "Rogue — light fingers, lighter footsteps, and a knack for the unseen.",
    "Cleric — a servant of some power, healing and smiting in its name.",
    "Ranger — a tracker and hunter who reads the wild like a page.",
    "Bard — a performer whose music, wit, and rumour open every door.",
    "Barbarian — a warrior who fights on fury and refuses to fall.",
    "Druid — a keeper of the old balance, at home in fur, feather, or leaf.",
    "Monk — a disciple of body and breath, weapon and armour in one.",
    "Paladin — an oath made flesh, righteous or terrible in equal measure.",
    "Sorcerer — magic in the blood, unbidden and not always obedient.",
    "Warlock — power on loan from a patron whose price is never fully known.",
  ],
  relatedTableIds: ["npcs.race", "npcs.occupations", "character.class"],
});
