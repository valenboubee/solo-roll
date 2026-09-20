import { makeTable } from "@/lib/tableBuilder";

// The classic d12 of callings — one to a face. Roll it, or choose your path.
export const characterClass = makeTable({
  id: "character.class",
  name: "Class & Calling",
  category: "character",
  slug: "class",
  description:
    "How you meet trouble when it finds you — the craft, discipline, or gift you lean on. Roll a d12, or choose the calling you want to play. Pair it with a background and a reason to leave home.",
  die: "d12",
  results: [
    "Fighter — steel is your answer, and you have trained until it never wavers.",
    "Wizard — you wrested magic from study and ink, and you hunger to learn more.",
    "Rogue — you rely on quick hands, quicker wits, and never being where they swing.",
    "Cleric — a higher power works through you, to mend the faithful and break the wicked.",
    "Ranger — the wild is your ally; you hunt, track, and strike from where none expect.",
    "Bard — your song, story, and silver tongue open doors that swords never could.",
    "Barbarian — you fight on raw fury, and you simply refuse to stay down.",
    "Druid — you keep the old balance and can shed your shape for fur, feather, or fang.",
    "Monk — you have honed body and breath into a single disciplined weapon.",
    "Paladin — you swore an oath, and its power is as unbending as your will.",
    "Sorcerer — magic surges in your blood, wild and yours before you knew its name.",
    "Warlock — you struck a bargain for power, and one day the bill will come due.",
  ],
  relatedTableIds: ["character.race", "character.motivation", "character.possession"],
});
