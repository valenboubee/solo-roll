import { makeTable } from "@/lib/tableBuilder";

export const characterQuirk = makeTable({
  id: "character.quirk",
  name: "Quirks & Features",
  category: "character",
  slug: "quirk",
  description:
    "The small, memorable detail that makes you you at the table — a habit, tic, or mark others remember. Roll a d20.",
  die: "d20",
  results: [
    "You hum an old tune under your breath when you are thinking, or afraid.",
    "A pale scar crosses your face, and you tell a different story about it each time.",
    "You keep a tally of something private — days, debts, kills — in a battered little book.",
    "You never sit with your back to a door, and you notice everyone who does.",
    "You collect small tokens from every place you visit, none of them worth a coin.",
    "You speak to animals as if they will answer, and sometimes it seems they do.",
    "One eye is a different colour, and superstitious folk make signs when they notice.",
    "You always know the time, the direction of north, and the nearest way out.",
    "You quote a mentor, a scripture, or a poem so often your friends can finish the lines.",
    "You cannot abide a mess and will tidy a room mid-conversation.",
    "You laugh at the wrong moments, especially when things are grim.",
    "You have a tell when you lie, and you have never figured out what it is.",
    "You give everyone a nickname within a day of meeting them.",
    "Your hands are never still — a coin, a knife, a bit of string always in motion.",
    "You mark your prayers, meals, or milestones with a small, precise ritual.",
    "You have an accent or turn of phrase from somewhere no one can quite place.",
    "You remember faces perfectly and names not at all, and it gets you in trouble.",
    "A tattoo, brand, or birthmark marks you as belonging to something you rarely explain.",
    "You test the weight and worth of everything you pick up, out of old habit.",
    "You always share your food, even when there is barely enough for you.",
  ],
  relatedTableIds: ["character.trait", "character.possession", "character.flaw"],
});
