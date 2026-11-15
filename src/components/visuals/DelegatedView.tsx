import type { Locale } from "@/lib/i18n";
import { getProductUi } from "@/content/product-ui";
import { WorkTableScreen } from "@/components/demo/ProductDemo";
import type { Dictionary } from "@/content/types";

/** Delegated uses the beta's Upcoming/Overdue/Approval tabs and table. */
export function DelegatedView({ lang }: { lang: Locale; view: Dictionary["delegate"]["view"]; app: Dictionary["app"] }) {
  const ui = getProductUi(lang);
  return <div><div lang={lang} className="overflow-hidden rounded-3xl border border-line bg-canvas shadow-card"><div className="border-b border-line bg-white px-5 py-3 text-sm font-medium">{ui.nav.Delegated}</div><WorkTableScreen lang={lang} delegated compact /></div></div>;
}
