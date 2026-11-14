import { WorkTableScreen } from "@/components/demo/ProductDemo";
import type { Dictionary } from "@/content/types";

/** My Work as observed in beta; content is fictional. */
export function TodayView({ badge }: { copy: Dictionary["today"]["mock"]; badge: string }) {
  return <div><div lang="en" className="overflow-hidden rounded-xl border border-line bg-canvas shadow-card"><div className="border-b border-line bg-white px-5 py-3 text-sm font-medium">My Work</div><WorkTableScreen /></div><p className="mt-3 text-xs text-ink-muted">{badge}</p></div>;
}
