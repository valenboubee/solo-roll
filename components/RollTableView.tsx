import type { RollTable } from "@/lib/types";

export function RollTableView({ table }: { table: RollTable }) {
  if (table.format === "list") {
    return (
      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 md:grid-cols-4">
        {table.entries.map((e) => (
          <li key={e.id} className="text-[var(--color-parchment)]">
            {e.result}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="eyebrow">
            <th className="w-24 border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2 pr-4">
              {table.die}
            </th>
            <th className="border-b border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] py-2">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {table.entries.map((e, i) => (
            <tr
              key={e.id}
              className={
                i % 2 ? "bg-[color-mix(in_oklab,var(--color-plum)_35%,transparent)]" : ""
              }
            >
              <td className="whitespace-nowrap py-2 pr-4 align-top font-[family-name:var(--font-display)] text-[var(--color-gold)]">
                {e.range}
              </td>
              <td className="py-2 align-top text-[var(--color-ivory)]">
                {e.result}
                {e.notes ? (
                  <span className="block text-sm text-[var(--color-parchment)]">{e.notes}</span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
