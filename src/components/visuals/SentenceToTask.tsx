import type { Locale } from "@/lib/i18n";
import { CommandScreen } from "@/components/demo/ProductDemo";
import type { Dictionary } from "@/content/types";

export function SentenceToTask({ copy, badge, lang }: { lang: Locale; copy: Dictionary["command"]; badge: string }) {
  const command = copy.examples[0].segments.map(segment => typeof segment === "string" ? segment : segment.text).join("");
  return <CommandScreen lang={lang} command={command} badge={badge} />;
}
