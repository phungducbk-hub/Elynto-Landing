import type { Metadata } from "next";
import { getPages } from "@/content/pages";
import { locales, ogLocales, type Locale } from "@/lib/i18n";
import { pagePath, type PageKey } from "@/lib/pages";

/** Title, description, canonical and hreflang links for a subpage. The social image is inherited. */
export function subpageMetadata(lang: Locale, key: PageKey): Metadata {
  const page = getPages(lang)[key];
  const path = pagePath(key);
  const title = `${page.navLabel} — Elynto`;

  return {
    title,
    description: page.description,
    alternates: {
      canonical: `/${lang}/${path}`,
      languages: { vi: `/vi/${path}`, en: `/en/${path}`, "x-default": `/vi/${path}` },
    },
    openGraph: {
      type: "website",
      siteName: "Elynto",
      url: `/${lang}/${path}`,
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      title,
      description: page.description,
    },
    twitter: { card: "summary_large_image", title, description: page.description },
  };
}
