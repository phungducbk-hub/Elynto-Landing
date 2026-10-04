export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

/** Used when the browser sends no language preference at all. */
export const defaultLocale: Locale = "vi";

/** Cookie + localStorage key that remembers the visitor's language choice. */
export const LOCALE_COOKIE = "elynto-lang";

export const localeNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const ogLocales: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Picks a supported locale from an Accept-Language header.
 * - First supported language by q-value wins (vi or en).
 * - A header that names only other languages falls back to English.
 * - No header at all falls back to `defaultLocale`.
 */
export function negotiateLocale(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return { lang: tag.trim().toLowerCase().split("-")[0], q, index };
    })
    .filter((entry) => entry.lang && entry.lang !== "*" && Number.isFinite(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { lang } of ranked) {
    if (isLocale(lang)) return lang;
  }
  return ranked.length > 0 ? "en" : defaultLocale;
}
