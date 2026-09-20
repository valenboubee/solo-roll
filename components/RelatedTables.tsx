import { getTable } from "@/lib/registry";
import { PillLink } from "./ornaments";

export function RelatedTables({ ids }: { ids: string[] }) {
  const tables = ids.map(getTable).filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (tables.length === 0) return null;
  return (
    <section className="mt-8">
      <div className="eyebrow mb-3">Related Tables</div>
      <div className="flex flex-wrap gap-3">
        {tables.map((t) => (
          <PillLink key={t.id} href={`/${t.category}/${t.slug}`}>
            {t.name}
          </PillLink>
        ))}
      </div>
    </section>
  );
}
