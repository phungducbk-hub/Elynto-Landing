import { WorkTableScreen } from "@/components/demo/ProductDemo";
import type { Dictionary } from "@/content/types";

/** Delegated uses the beta's Upcoming/Overdue/Approval tabs and table. */
export function DelegatedView({ badge }: { view: Dictionary["delegate"]["view"]; app: Dictionary["app"]; badge: string }) {
  return <div><div lang="en" className="overflow-hidden rounded-xl border border-line bg-canvas shadow-card"><div className="border-b border-line bg-white px-5 py-3 text-sm font-medium">Delegated</div><WorkTableScreen delegated /></div><p className="mt-3 text-xs text-ink-muted">{badge}</p></div>;
}
