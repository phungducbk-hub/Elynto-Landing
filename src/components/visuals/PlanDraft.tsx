import { Pencil } from "lucide-react";
import { ProductSurface } from "@/components/ui/ProductSurface";
import type { Dictionary } from "@/content/types";

type Props = { copy: Dictionary["planning"]["mock"]; label: string };

/** Illustration of an AI-drafted plan: goal → phases → tasks, waiting for the person's review. */
export function PlanDraft({ copy, label }: Props) {
  return (
    <ProductSurface label={label}>
      <div className="grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        {/* Goal */}
        <div className="border-b border-rule px-5 py-6 sm:px-7 lg:border-r lg:border-b-0">
          <p className="text-sm text-muted">{copy.goalLabel}</p>
          <p className="mt-2 text-xl leading-snug font-semibold text-ink stretch-wide">“{copy.goal}”</p>
        </div>

        {/* Draft */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule px-5 py-4 sm:px-7">
            <p className="text-[0.9375rem] font-semibold text-progress">{copy.draftTitle}</p>
            <p className="text-sm text-muted">{copy.summary}</p>
          </div>
          <ol className="grid md:grid-cols-3 md:divide-x md:divide-rule">
            {copy.phases.map((phase, index) => (
              <li key={phase.name} className="border-b border-rule px-5 py-5 last:border-b-0 sm:px-7 md:border-b-0 md:px-6">
                <p className="flex items-baseline gap-2.5">
                  <span className="text-sm font-semibold text-navy">
                    <span className="sr-only">{copy.phaseLabel} </span>
                    {index + 1}
                  </span>
                  <span className="text-[1.0625rem] leading-snug font-semibold text-ink stretch-wide">{phase.name}</span>
                </p>
                <ul className="mt-3 space-y-2.5">
                  {phase.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug">
                      <span aria-hidden="true" className="mt-[0.2rem] size-3.5 shrink-0 rounded-[0.25rem] border-[1.5px] border-rule-strong" />
                      {task}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Review step: visual only */}
      <div className="flex flex-col gap-3 border-t border-rule bg-fog px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
          <Pencil className="size-4 text-navy" aria-hidden="true" />
          {copy.reviewHint}
        </p>
        <div aria-hidden="true" className="flex shrink-0 gap-2">
          <span className="inline-flex h-9 items-center rounded-lg bg-paper px-3.5 text-sm font-semibold text-navy ring-1 ring-rule-strong ring-inset">
            {copy.edit}
          </span>
          <span className="inline-flex h-9 items-center rounded-lg bg-navy px-3.5 text-sm font-semibold text-white">
            {copy.create}
          </span>
        </div>
      </div>
    </ProductSurface>
  );
}
