import type { RollTable } from "@/lib/types";

export const dcReference: RollTable = {
  id: "investigation.dc-reference",
  name: "Difficulty Reference",
  category: "investigation",
  slug: "dc-reference",
  description:
    "A system-agnostic ladder for judging how hard a task is when you set a target number or interpret a check. Match the fiction to a rung, then use your own system's scale.",
  die: "—",
  format: "list",
  entries: [
    { id: "investigation.dc-reference.1", result: "Trivial — anyone could do it; only roll if failure would be interesting." },
    { id: "investigation.dc-reference.2", result: "Easy — a capable person succeeds most of the time." },
    { id: "investigation.dc-reference.3", result: "Routine — a trained hand expects to succeed; the untrained may not." },
    { id: "investigation.dc-reference.4", result: "Challenging — a real test even for the skilled; failure is likely under pressure." },
    { id: "investigation.dc-reference.5", result: "Hard — only the expert or the lucky get through." },
    { id: "investigation.dc-reference.6", result: "Very hard — a feat few could manage even at their best." },
    { id: "investigation.dc-reference.7", result: "Near-impossible — success is a story people will tell for years." },
    { id: "investigation.dc-reference.8", result: "Advantage — you are well-prepared, aided, or well-positioned: take the better of two attempts." },
    { id: "investigation.dc-reference.9", result: "Disadvantage — you are rushed, hindered, or ill-suited: take the worse of two attempts." },
    { id: "investigation.dc-reference.10", result: "Degrees — treat a wide miss as 'no, and', a near miss as 'no, but', a clear pass as 'yes', and a great pass as 'yes, and'." },
  ],
  relatedTableIds: ["investigation.likelihood", "investigation.skill-challenges"],
};
