"use client";
import { useId, useState } from "react";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

export function PlanDraft({ copy, lang }: { copy: Dictionary["planning"]["mock"]; lang: Locale }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return <div lang={lang} className="grid overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-card md:grid-cols-[0.85fr_1.15fr]">
    <div className="flex flex-col bg-brand-50 p-6 sm:p-8">
      <span className="flex items-center gap-2 text-sm font-semibold text-brand"><Sparkles aria-hidden="true" className="size-4" />{copy.goalLabel}</span>
      <p className="mt-5 text-xl leading-snug font-semibold tracking-tight text-ink sm:text-2xl">{copy.goal}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{copy.reviewHint}</p>
      <a href={`/${lang}/features/project-views`} className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-brand hover:underline md:mt-auto md:pt-8">{lang === "vi" ? "Khám phá cách theo dõi dự án" : "Explore project views"}<ArrowRight aria-hidden="true" className="size-4" /></a>
    </div>
    <div className="p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-lg font-semibold text-ink">{copy.draftTitle}</p><span className="rounded-full bg-field-assignee-soft px-3 py-1 text-xs font-medium text-field-assignee">{copy.aiBadge}</span></div>
      <p className="mt-2 text-sm text-ink-muted">{copy.summary}</p>
      <ol className="mt-6 divide-y divide-line">{copy.phases.map((phase,index) => <li key={phase.name} className="py-2 first:pt-0 last:pb-0">
        <button type="button" aria-expanded={open === index} aria-controls={`${id}-phase-${index}`} onClick={() => setOpen(open === index ? null : index)} className="flex min-h-12 w-full items-center gap-3 py-2 text-left text-sm font-semibold text-ink"><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-50 font-mono text-xs text-brand">0{index+1}</span><span className="flex-1">{phase.name}</span><ChevronDown aria-hidden="true" className={`size-4 shrink-0 text-ink-muted transition-transform duration-200 ${open === index ? "rotate-180" : ""}`} /></button>
        <ul id={`${id}-phase-${index}`} hidden={open !== index} className="space-y-3 pt-2 pb-4 pl-10">{phase.tasks.map(task => <li key={task} className="flex gap-2 text-sm leading-relaxed text-ink-muted"><Check aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-brand" />{task}</li>)}</ul>
      </li>)}</ol>
    </div>
  </div>;
}
