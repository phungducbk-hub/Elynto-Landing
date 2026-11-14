import { CommandScreen } from "@/components/demo/ProductDemo";
import type { Dictionary } from "@/content/types";

export function SentenceToTask({ copy, badge }: { copy: Dictionary["command"]; badge: string }) {
  const command = copy.examples[0].segments.map(segment => typeof segment === "string" ? segment : segment.text).join("");
  return <CommandScreen command={command} badge={badge} />;
}
