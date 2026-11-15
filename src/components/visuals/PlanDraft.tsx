import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { getProductUi } from "@/content/product-ui";

export function PlanDraft({ copy, lang }: { copy: Dictionary["planning"]["mock"]; lang: Locale }) {
  const ui = getProductUi(lang);
  return (
    <div>
      <div lang={lang} className="rounded-xl border border-line bg-canvas p-5 shadow-card sm:p-10">
        <p className="text-xl font-semibold tracking-tight">{ui.plannerTitle}</p>
        <p className="mt-2 text-xs text-ink-muted">{ui.backProjects}</p>
        <div className="mt-6 rounded-xl border border-line bg-white p-5">
          <p className="text-sm font-semibold">{ui.goalPrompt}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{ui.goalHelp}</p>
          <div className="mt-5 min-h-24 rounded-xl border border-line p-4 text-sm leading-relaxed">{copy.goal}</div>
          <span className="mt-3 inline-flex rounded-md bg-brand px-3 py-2 text-xs font-medium text-white">{ui.generate}</span>
        </div>
      </div>
    </div>
  );
}
