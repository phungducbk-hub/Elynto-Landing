import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AnalyticsListener } from "@/components/layout/AnalyticsListener";
import { isIndexable, siteConfig } from "@/config/site";
import { getDictionary } from "@/content";
import { isLocale, locales, ogLocales } from "@/lib/i18n";
import "../globals.css";

// Mona Sans: one variable family with a width axis. Wide cuts for headings, normal width for
// reading; clean stacked diacritics for Vietnamese. Self-hosted by next/font.
const mona = Mona_Sans({
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

type LayoutParams = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const socialTitle = `Elynto — ${siteConfig.vision}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { vi: "/vi", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: `/${lang}`,
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      title: socialTitle,
      description: dict.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: dict.meta.ogDescription,
    },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function RootLayout({ children, params }: LayoutParams & { children: ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={mona.variable}>
      <body className="min-h-dvh">
        <AnalyticsListener />
        {children}
      </body>
    </html>
  );
}
