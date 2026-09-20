import { makeTable } from "@/lib/tableBuilder";

export const characterBackground = makeTable({
  id: "character.background",
  name: "Background & Upbringing",
  category: "character",
  slug: "background",
  description:
    "The life you led before adventure came calling — the skills, contacts, and scars you carry out of it. Roll a d20.",
  die: "d20",
  results: [
    "Raised in a temple, torn between the faith you were given and the questions it never answered.",
    "A soldier discharged from a war no one thanks you for, still marching in your sleep.",
    "Born to a merchant house and taught that everything, and everyone, has a price.",
    "A street orphan who learned trust is a luxury and a locked door is only a suggestion.",
    "Apprenticed to a craftsman until the day you walked out with the tools and none of the patience.",
    "A sailor put ashore for good, with a hundred ports behind you and none to call home.",
    "The disappointing heir of a noble line, running from a title you never wanted.",
    "A scholar's assistant who read one forbidden page too many and had to leave in a hurry.",
    "Raised among wanderers and horse-traders, at home on the road and nowhere else.",
    "A farmhand whose quiet fields were burned or bought out from under the family.",
    "A performer from a travelling troupe, applause still ringing and the coin long spent.",
    "A former convict who paid a debt to the law and is not sure the law is finished with you.",
    "Reared by a lone mentor in the wilds, fluent in beasts and weather and awkward with people.",
    "A guild apprentice who saw the ledgers behind the guild's smile and could not unsee them.",
    "A healer's aide who learned that some wounds close and some simply teach you to keep going.",
    "A gravedigger or undertaker, comfortable with the dead and wary of the living's promises.",
    "Sole survivor of a caravan, a village, or a voyage, carrying a debt to the ones who did not make it.",
    "A courtier's servant who overheard too much and left before the knowing got you killed.",
    "A hunter or trapper from the frontier, more at ease reading tracks than reading a room.",
    "You do not remember — your life begins at a roadside with no name and no past you can reach.",
  ],
  relatedTableIds: ["character.motivation", "character.bond", "character.race"],
});
