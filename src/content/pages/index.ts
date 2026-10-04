import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import type { PagesDictionary } from "./types";
import { vi } from "./vi";

const pages: Record<Locale, PagesDictionary> = { vi, en };

export function getPages(lang: Locale): PagesDictionary {
  return pages[lang];
}
