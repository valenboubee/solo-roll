import type { RollTable } from "@/lib/types";

export const likelihoodModifiers: RollTable = {
  id: "investigation.likelihood",
  name: "Likelihood & Modifiers",
  category: "investigation",
  slug: "likelihood",
  description:
    "Before consulting the Yes/No Oracle, judge how likely the answer is and adjust your d100 roll by the listed amount. A higher adjusted roll leans toward Yes.",
  die: "—",
  format: "list",
  entries: [
    { id: "investigation.likelihood.1", result: "Almost certain — add 40 to your roll." },
    { id: "investigation.likelihood.2", result: "Very likely — add 30 to your roll." },
    { id: "investigation.likelihood.3", result: "Likely — add 20 to your roll." },
    { id: "investigation.likelihood.4", result: "Slightly likely — add 10 to your roll." },
    { id: "investigation.likelihood.5", result: "Even odds (50/50) — no adjustment." },
    { id: "investigation.likelihood.6", result: "Slightly unlikely — subtract 10 from your roll." },
    { id: "investigation.likelihood.7", result: "Unlikely — subtract 20 from your roll." },
    { id: "investigation.likelihood.8", result: "Very unlikely — subtract 30 from your roll." },
    { id: "investigation.likelihood.9", result: "Almost impossible — subtract 40 from your roll." },
  ],
  relatedTableIds: ["investigation.oracle", "investigation.dc-reference"],
};
