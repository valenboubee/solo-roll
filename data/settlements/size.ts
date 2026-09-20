import { makeTable } from "@/lib/tableBuilder";

export const settlementSize = makeTable({
  id: "settlements.size",
  name: "Settlement Size",
  category: "settlements",
  slug: "size",
  description:
    "How large the place is, from a lone farmstead to a teeming capital, with a rough sense of its people. Roll a d20.",
  die: "d20",
  results: [
    "A lone farmstead, one family and their animals against the dark.",
    "A remote croft shared by two households and a single shared well.",
    "A woodcutters' camp of lean-tos that shifts with the season.",
    "A cluster of huts, perhaps thirty souls, with no name on any map.",
    "A hamlet of a dozen families around one shared threshing floor.",
    "A crossroads hamlet grown up where two cart-tracks happen to meet.",
    "A fishing village of forty, its whole life ruled by the tides.",
    "A mining camp swollen past its means, muddy and always hungry.",
    "A large village of some two hundred, with a mill and a chapel.",
    "A market village that triples on fair-days and empties after.",
    "A small town of perhaps eight hundred behind a low earthen bank.",
    "A walled town of a few thousand, its gates barred at dusk.",
    "A river town strung along both banks, joined by a single bridge.",
    "A bustling town of five thousand, guildhalls crowding the square.",
    "A fortified town clenched around a lord's keep on the hill.",
    "A prosperous town of ten thousand, spilling beyond its old walls.",
    "A cathedral city whose spire is visible a full day's ride away.",
    "A great walled city of tens of thousands, quartered and gated within.",
    "A port city where a hundred tongues haggle along crowded wharves.",
    "A teeming capital so vast that no one has ever counted its people.",
  ],
  relatedTableIds: ["settlements.population", "settlements.governance", "settlements.districts"],
});
