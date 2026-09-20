import { makeTable } from "@/lib/tableBuilder";

export const characterFlaw = makeTable({
  id: "character.flaw",
  name: "Flaws",
  category: "character",
  slug: "flaw",
  description:
    "The crack in you that trouble knows how to find — the failing that will complicate your story. Roll a d20 for the weakness you carry.",
  die: "d20",
  results: [
    "Your pride will not let you back down, even when backing down is the only sane choice.",
    "You cannot resist a wager, a dare, or a locked door.",
    "You trust too easily, and you have the scars to show for it.",
    "You lie so smoothly you have started to believe some of them.",
    "You hold grudges long past the point where they do you any good.",
    "You freeze when someone you love is in danger, and you hate yourself for it.",
    "Coin talks louder to you than it should, and enemies know it.",
    "You would rather be right than be kind, and you usually manage both wrong.",
    "You drink, or gamble, or chase something, to keep the quiet from catching up.",
    "You cannot leave a mystery alone, even when leaving it alone would keep you alive.",
    "You judge others by first impressions and rarely revisit the verdict.",
    "You crave approval so badly you will follow the wrong person to get it.",
    "You are a coward about exactly one thing, and you will lie to hide which.",
    "You keep everyone at arm's length, and then resent that no one gets close.",
    "You cannot admit when you are wrong until the damage is already done.",
    "Your temper is a fuse, and you are never sure how long it is.",
    "You are loyal past all reason, even to those who have plainly betrayed you.",
    "You take foolish risks to feel something, and call it courage.",
    "You hoard secrets, including ones your friends deserve to know.",
    "You believe, deep down, that you do not deserve the good things, and you sabotage them.",
  ],
  relatedTableIds: ["character.trait", "character.motivation", "character.quirk"],
});
