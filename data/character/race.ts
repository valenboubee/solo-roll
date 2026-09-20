import { makeTable } from "@/lib/tableBuilder";

// Ordered common → rare so the earliest entries claim the slightly larger
// d100 bands. Roll, or simply choose the heritage that calls to you.
export const characterRace = makeTable({
  id: "character.race",
  name: "Race & Ancestry",
  category: "character",
  slug: "race",
  description:
    "Where your blood comes from, and what the world assumes when it sees you. Roll a d100 — the common heritages hold the wider bands — or pick the one that fits the hero in your head.",
  die: "d100",
  results: [
    "Human — you belong everywhere and nowhere, driven by a short life to make it count.",
    "Half-Elf — you carry two heritages and a lifelong knack for not quite fitting either.",
    "Dwarf — you are stone-steady and long-memoried, loyal to kin, craft, and grudge.",
    "Elf — you have watched empires rise and fall, and you are in no hurry to be hurried.",
    "Halfling — you are small, brave, and blessed with the luck of the overlooked.",
    "Gnome — you are quick-witted and endlessly curious, in love with clever, tiny things.",
    "Half-Orc — you are strong and steady-nerved, tired of being feared before you speak.",
    "Tiefling — infernal blood marks you, and you have learned to answer the stares with a smile.",
    "Dragonborn — draconic pride runs in your scales, along with an ancestor's fierce breath.",
    "Orc — you come of a strong, warlike people, and you decide for yourself what that means.",
    "Goblin — you survived where the world wanted you gone, and you are cleverer for it.",
    "Hobgoblin — you were raised to discipline and rank, and old habits die hard.",
    "Kobold — you are small, loyal to your own, and craftier than anyone gives you credit for.",
    "Goliath — mountain-born and giant-blooded, you measure a person by what they can carry.",
    "Aasimar — celestial light lives in you, a gift and a burden you did not ask to bear.",
    "Firbolg — gentle and fey-touched, you would rather walk away from a fight than win it.",
    "Tabaxi — curiosity pulls you down every road; you collect stories and shiny things alike.",
    "Lizardfolk — you think in cold, clear logic, and warm sentiment puzzles you a little.",
    "Tortle — you carry your home on your back and meet the world at your own patient pace.",
    "Triton — you are sea-born and proud, far from the deeps you still call home.",
    "Genasi — an elemental ancestor lingers in you as fire, wave, wind, or unyielding stone.",
    "Bugbear — you are big and quiet, and people are always surprised how quietly you move.",
    "Kenku — raven-kin, you speak in borrowed voices and dream of a song that is your own.",
    "Changeling — you can wear any face; the hard part is remembering which one is yours.",
  ],
  relatedTableIds: ["character.class", "character.background", "names.given"],
});
