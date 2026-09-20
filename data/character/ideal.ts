import { makeTable } from "@/lib/tableBuilder";

export const characterIdeal = makeTable({
  id: "character.ideal",
  name: "Ideals",
  category: "character",
  slug: "ideal",
  description:
    "The belief you steer by when the choice is hard — the principle you would suffer to keep. Roll a d20 for the star you navigate by.",
  die: "d20",
  results: [
    "Freedom. No chain, crown, or custom has the right to cage a person.",
    "Justice. The scales must balance, whatever it costs to set them right.",
    "Mercy. Everyone deserves the chance to be better than their worst day.",
    "Loyalty. You stand by your own; that is the whole of the law to you.",
    "Truth. A hard fact honestly told is worth more than a comfortable lie.",
    "Ambition. You were made for more, and you intend to reach it.",
    "Honour. How you win matters as much as whether you win.",
    "Knowledge. Understanding is the only power that cannot be stolen from you.",
    "Family. Blood or chosen, your people come before any grand cause.",
    "Faith. A higher order moves through the world, and you serve your part in it.",
    "Balance. Excess of any kind rots the root; moderation keeps it green.",
    "Beauty. The world is worth saving for its art, its wonder, its small graces.",
    "Independence. Owe nothing, ask nothing, and no one can ever own you.",
    "Duty. You keep your post and your word because someone must.",
    "Compassion. Suffering is suffering; you will not walk past it.",
    "Glory. Deeds outlive the doer, and you mean yours to be remembered.",
    "Change. The old order failed too many; something better must replace it.",
    "Redemption. You did wrong once, and every good act is a coin against that debt.",
    "Survival. High ideals are a luxury; you keep the ones who breathe, breathing.",
    "Wonder. There is always one more marvel over the next hill, and you must see it.",
  ],
  relatedTableIds: ["character.motivation", "character.bond", "character.trait"],
});
