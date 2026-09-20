import { makeTable } from "@/lib/tableBuilder";

export const characterBond = makeTable({
  id: "character.bond",
  name: "Bonds",
  category: "character",
  slug: "bond",
  description:
    "The person, place, or promise that ties you to the world and gives your story stakes. Roll a d20 for the thread you cannot cut.",
  die: "d20",
  results: [
    "A mentor who made you who you are, and whom you would cross any distance to repay.",
    "A sibling you swore to protect, wherever they have wandered.",
    "A home village you mean to return to, richer or not at all.",
    "A rival you respect too much to let anyone else defeat.",
    "A debt of honour to a stranger who once saved your life.",
    "A lost love whose memory you carry like a compass.",
    "A child, yours or fostered, whose future you are fighting for.",
    "An heirloom that is all that remains of your family.",
    "A friend from the old days who knows every one of your secrets.",
    "A shrine, grave, or holy place you have vowed to keep or to restore.",
    "A company of comrades, living or fallen, whose oath still binds you.",
    "A creature — a mount, a familiar, a beast — that trusts only you.",
    "A city whose streets raised you, for all its cruelty.",
    "A patron who believed in you when no one else would.",
    "A promise made to the dying, which you will keep or break yourself trying.",
    "A book, song, or craft you mean to finish before the end.",
    "An enemy of your family whose downfall you were born to see.",
    "A secret shared with one other soul, and the ruin that would follow if it broke.",
    "A cause larger than yourself that you gave your name and your years to.",
    "A stretch of wild country that is the only place you have ever felt whole.",
  ],
  relatedTableIds: ["character.background", "character.ideal", "character.flaw"],
});
