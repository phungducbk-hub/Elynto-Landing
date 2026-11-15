import Image from "next/image";
import { ArrowUpRight, Check, ListChecks, Sparkles } from "lucide-react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/** Illustrative hybrid meeting with a localized, reviewable AI Summary overlay. */
export function CollaborationWorkspace({ copy, lang }: { copy: Dictionary["collaboration"]["mock"]; lang: Locale }) {
  return (
    <figure lang={lang}>
      <div className="relative pb-40 sm:pb-32">
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <Image
            src="/media/elynto-hybrid-meeting.webp"
            width={1200}
            height={900}
            alt={copy.imageAlt}
            sizes="(min-width: 1024px) 660px, (min-width: 640px) 90vw, 94vw"
            className="block h-auto w-full"
          />
        </div>
        <div className="absolute right-3 bottom-0 w-[92%] max-w-sm rounded-2xl border border-brand-100 bg-white p-4 shadow-float sm:right-5 sm:p-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand">
            <Sparkles aria-hidden="true" className="size-3.5" />AI Summary
          </p>
          <p className="mt-3 text-base font-semibold leading-snug text-ink">{copy.aiTitle}</p>
          <div className="mt-4 flex items-start gap-2">
            <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand" />
            <div><p className="text-[10px] font-medium text-ink-muted">{copy.conclusionLabel}</p><p className="mt-1 text-xs leading-relaxed text-ink">{copy.conclusion}</p></div>
          </div>
          <div className="mt-3 flex items-start gap-2 border-t border-line pt-3">
            <ListChecks aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand" />
            <div className="min-w-0"><p className="text-[10px] font-medium text-ink-muted">{copy.taskLabel}</p><p className="mt-1 text-xs font-medium leading-relaxed text-ink">{copy.task}</p><p className="mt-1 text-[10px] text-ink-muted">{copy.assignee} · {copy.due}</p></div>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand">{copy.action}<ArrowUpRight aria-hidden="true" className="size-3.5" /></p>
        </div>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-ink-muted">{copy.caption}</figcaption>
    </figure>
  );
}
