import { makeTable } from "@/lib/tableBuilder";

export const characterMotivation = makeTable({
  id: "character.motivation",
  name: "Why You Adventure",
  category: "character",
  slug: "motivation",
  description:
    "The reason you left safety behind and took up a dangerous road. Roll a d20 for the spark that drives you on.",
  die: "d20",
  results: [
    "To repay a debt you can never fully settle to someone who saved you.",
    "To find a person who vanished, and refuse to believe they are gone.",
    "To prove wrong everyone who said you would amount to nothing.",
    "To earn enough coin to buy back a home, a name, or a freedom you lost.",
    "To answer a question that has gnawed at you since childhood.",
    "To outrun a past that keeps finding you no matter how far you go.",
    "To live up to an oath, a bloodline, or a legend you were raised on.",
    "To take revenge on the one who ruined everything you loved.",
    "Because staying still feels like slowly dying, and the road feels like breathing.",
    "To atone for a wrong you did, quietly, before anyone can forgive you for it.",
    "To see the world's far corners before your short years run out.",
    "Because a prophecy, dream, or omen named you, and you cannot shake it.",
    "To protect the few people left who still matter to you.",
    "To recover something stolen — an heirloom, a memory, a piece of yourself.",
    "For the thrill of it, plainly; danger is the only thing that makes you feel awake.",
    "To become powerful enough that no one can ever hurt you again.",
    "Because a mentor's dying wish set you on this path and you mean to finish it.",
    "To break a curse, a bargain, or a sickness before it claims you.",
    "To find out who you really are, since no one ever told you.",
    "Because someone has to do the hard, ugly work, and you decided it would be you.",
  ],
  relatedTableIds: ["character.background", "character.ideal", "character.flaw"],
});
