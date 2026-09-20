export type TableEntry = {
  id: string;
  range?: string;
  result: string;
  notes?: string;
  tags?: string[];
};

export type RollTable = {
  id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  die: string;
  format?: "ranges" | "list";
  entries: TableEntry[];
  relatedTableIds?: string[];
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  theme: string;
  tableIds: string[];
};
