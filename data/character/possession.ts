import { makeTable } from "@/lib/tableBuilder";

export const characterPossession = makeTable({
  id: "character.possession",
  name: "Signature Possession",
  category: "character",
  slug: "possession",
  description:
    "The one thing you would run back into a burning house to save — the object that carries your story. Roll a d20.",
  die: "d20",
  results: [
    "A worn weapon handed down through your family, more heirloom than blade.",
    "A locket holding a portrait of someone you have lost, or hope to find.",
    "A journal half-full of maps, secrets, and pages you dare not reread.",
    "A holy symbol, plain and much-handled, that has seen you through the dark.",
    "A ring, seal, or signet that proves a claim you cannot yet make openly.",
    "A musical instrument you have carried farther than it has any right to survive.",
    "A cloak or coat that has kept out more than weather over the years.",
    "A single coin from a place that no longer exists, never to be spent.",
    "A letter you were given to deliver and have never quite managed to hand over.",
    "A set of tools — thieves', healer's, tinker's — that are extensions of your hands.",
    "A charm you were told would keep you safe, and so far, it has.",
    "A key to a lock you have not yet found.",
    "A pressed flower, feather, or lock of hair, kept for a reason you keep to yourself.",
    "A worn deck of cards or set of dice that has decided more than one fate.",
    "A book of lore, half-understood, that you are slowly reading to pieces.",
    "A trophy from your first real victory, or your worst mistake.",
    "A pet or familiar that goes everywhere with you and answers to you alone.",
    "A map to somewhere you have promised yourself you will one day reach.",
    "A trinket a stranger pressed on you with a warning you did not understand.",
    "A scar-bright memento of the day your old life ended and this one began.",
  ],
  relatedTableIds: ["character.class", "character.bond", "character.quirk"],
});
