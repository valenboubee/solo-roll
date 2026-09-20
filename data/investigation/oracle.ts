import type { RollTable } from "@/lib/types";

export const yesNoOracle: RollTable = {
  id: "investigation.oracle",
  name: "Yes / No Oracle",
  category: "investigation",
  slug: "oracle",
  description:
    "Ask the world a yes-or-no question, then roll a d100 for an even (50/50) chance. For likely or unlikely questions, shift your reading using the Likelihood & Modifiers table first.",
  die: "d100",
  entries: [
    {
      id: "investigation.oracle.1",
      range: "01–05",
      result: "No, and — a firm no, made worse by an unwelcome complication.",
    },
    {
      id: "investigation.oracle.2",
      range: "06–45",
      result: "No.",
    },
    {
      id: "investigation.oracle.3",
      range: "46–50",
      result: "No, but — a no softened by a small mercy or silver lining.",
    },
    {
      id: "investigation.oracle.4",
      range: "51–55",
      result: "Yes, but — a yes that carries a catch, cost, or condition.",
    },
    {
      id: "investigation.oracle.5",
      range: "56–95",
      result: "Yes.",
    },
    {
      id: "investigation.oracle.6",
      range: "96–100",
      result: "Yes, and — an emphatic yes, with an extra advantage in your favour.",
    },
  ],
  relatedTableIds: ["investigation.likelihood", "investigation.twists"],
};
