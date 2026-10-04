import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Marker } from "@/components/ui/Marker";
import { ProductSurface } from "@/components/ui/ProductSurface";
import type { Dictionary } from "@/content/types";

type Props = { copy: Dictionary["sentences"]; label: string };

/** Illustration: what a person writes on the left, the task Elynto creates on the right. */
export function SentenceTable({ copy, label }: Props) {
  return (
    <ProductSurface label={label}>
      <div className="hidden grid-cols-[minmax(0,1.15fr)_2rem_minmax(0,1fr)] gap-4 border-b border-rule bg-fog px-6 py-3 text-sm text-muted md:grid">
        <span>{copy.youWrite}</span>
        <span />
        <span>{copy.elyntoCreates}</span>
      </div>
      <ul className="divide-y divide-rule">
        {copy.rows.map((row) => (
          <li
            key={row.task}
            className="grid gap-3 px-5 py-5 md:grid-cols-[minmax(0,1.15fr)_2rem_minmax(0,1fr)] md:items-center md:gap-4 md:px-6"
          >
            <p className="text-[1.0625rem] leading-[1.7] text-ink">
              {row.segments.map((segment, index) =>
                typeof segment === "string" ? (
                  <span key={index}>{segment}</span>
                ) : (
                  <Marker key={index}>{segment.text}</Marker>
                ),
              )}
            </p>
            <ArrowRight className="hidden size-4 text-muted md:block" aria-hidden="true" />
            <div className="rounded-xl border border-rule bg-paper px-4 py-3 md:border-0 md:p-0">
              <p className="sr-only">{copy.elyntoCreates}:</p>
              <p className="text-base leading-snug font-semibold text-ink">{row.task}</p>
              <dl className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">{copy.fields.assignee}</dt>
                  <Avatar person={row.assignee} size="sm" />
                  <dd className="text-body">{row.assignee.name}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">{copy.fields.due}</dt>
                  <CalendarDays className="size-3.5 text-muted" aria-hidden="true" />
                  <dd className="text-body">{row.due}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-2 border-t border-rule bg-fog px-5 py-3 text-sm text-body md:px-6">
        <Check className="size-4 text-done" strokeWidth={2.5} aria-hidden="true" />
        {copy.savedNote}
      </p>
    </ProductSurface>
  );
}
