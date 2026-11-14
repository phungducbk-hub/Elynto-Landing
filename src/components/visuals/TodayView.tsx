import type { Locale } from "@/lib/i18n";
import { getProductUi } from "@/content/product-ui";
import { WorkTableScreen } from "@/components/demo/ProductDemo";
import type { Dictionary } from "@/content/types";

/** My Work as observed in beta; content is fictional. */
export function TodayView({ badge, lang }: { lang: Locale; copy: Dictionary["today"]["mock"]; badge: string }) {
  const ui = getProductUi(lang);
  return <div><div lang={lang} className="overflow-hidden rounded-xl border border-line bg-canvas shadow-card"><div className="border-b border-line bg-white px-5 py-3 text-sm font-medium">{ui.nav["My Work"]}</div><WorkTableScreen lang={lang} /></div><p className="mt-3 text-xs text-ink-muted">{badge}</p></div>;
}
