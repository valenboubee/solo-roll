import { makeTable } from "@/lib/tableBuilder";

export const characterTrait = makeTable({
  id: "character.trait",
  name: "Defining Trait",
  category: "character",
  slug: "trait",
  description:
    "The first thing people notice about who you are — the temperament that colours how you meet the world. Roll a d20.",
  die: "d20",
  results: [
    "You meet trouble with dry humour, especially when it is least welcome.",
    "You are relentlessly loyal, and slow to believe a friend could let you down.",
    "You weigh every word before you speak, so people mistake your caution for depth.",
    "You are brave to the point of foolishness and hate to admit fear.",
    "You are generous with strangers and stingy only with your own secrets.",
    "You question everything, including orders, omens, and your own good sense.",
    "You are calm in a crisis and useless once the danger has passed.",
    "You collect facts, names, and grudges, and you forget none of them.",
    "You are warm and open, and it costs you more than you let on.",
    "You are proud, and you would rather bleed than be pitied.",
    "You are patient as stone, and terrible to cross once that patience ends.",
    "You are restless and easily bored, always looking toward the next thing.",
    "You are honest to a fault, even when a kind lie would serve everyone better.",
    "You are cautious with coin, quick with a plan, and slow with your trust.",
    "You are gentle with the weak and merciless with those who prey on them.",
    "You are quick to anger and quicker to regret it.",
    "You keep your promises, all of them, even the ones you should never have made.",
    "You are curious about people the way others are curious about maps.",
    "You wear confidence like armour, and it fits better every year.",
    "You are quiet and watchful, and you see far more than you ever say.",
  ],
  relatedTableIds: ["character.ideal", "character.flaw", "character.quirk"],
});
