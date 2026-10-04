import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/lib/i18n";
import { allPageKeys, pagePath } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...allPageKeys.map((key) => `/${pagePath(key)}`)];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteConfig.url}/${locale}${path}`]));
    return locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path ? 0.6 : 1,
      alternates: { languages },
    }));
  });
}
