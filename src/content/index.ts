import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import type { Dictionary, DictionaryMap } from "./types";
import { vi } from "./vi";

const dictionaries: DictionaryMap = { vi, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary } from "./types";
