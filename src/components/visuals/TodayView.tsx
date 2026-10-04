import { CalendarDays, Flag, Sun } from "lucide-react";
import { ProductSurface } from "@/components/ui/ProductSurface";
import type { Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = { copy: Dictionary["today"]["mock"]; app: Dictionary["app"]; label: string };

const tones = {
  overdue: { label: "text-late", due: "text-late" },
  today: { label: "text-ink", due: "text-ink" },
  upcoming: { label: "text-ink", due: "text-muted" },
} as const;

/** Refined Today view: work from every project grouped by when it's due, with priority. */
export function TodayView({ copy, app, label }: Props) {
  return (
    <ProductSurface label={label}>
      <p className="flex items-center gap-2.5 border-b border-rule px-5 py-4 text-xl font-semibold text-ink stretch-wide sm:px-6">
        <Sun className="size-5 text-navy" aria-hidden="true" />
        {app.nav.today}
      </p>
      <div className="divide-y divide-rule">
        {copy.groups.map((group) => {
          const tone = tones[group.tone];
          return (
            <section key={group.label} aria-label={group.label} className="px-5 pt-4 pb-2 sm:px-6">
              <h4 className={cn("flex items-baseline gap-2 text-sm font-semibold", tone.label)}>
                {group.label}
                <span className="font-normal text-muted">{group.items.length}</span>
              </h4>
              <ul className="mt-1">
                {group.items.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 py-2.5">
                    <span aria-hidden="true" className="mt-1 size-4 shrink-0 rounded-full border-[1.5px] border-rule-strong" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] leading-snug font-medium text-ink">{item.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{item.project}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5 text-sm sm:flex-row sm:items-center sm:gap-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1",
                          item.priority === "high" ? "font-semibold text-ink" : "text-muted",
                        )}
                      >
                        <Flag className={cn("size-3.5", item.priority === "high" && "text-late")} aria-hidden="true" />
                        {app.priorities[item.priority]}
                      </span>
                      <span className={cn("inline-flex items-center gap-1 font-medium whitespace-nowrap", tone.due)}>
                        <CalendarDays className="size-3.5" aria-hidden="true" />
                        {item.due}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </ProductSurface>
  );
}
