import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubpageView } from "@/components/subpage/SubpageView";
import { isLocale } from "@/lib/i18n";
import { infoPageKeys, isInfoPage } from "@/lib/pages";
import { subpageMetadata } from "@/lib/subpage-metadata";

type Params = { params: Promise<{ lang: string; page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return infoPageKeys.map((page) => ({ page }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, page } = await params;
  if (!isLocale(lang) || !isInfoPage(page)) return {};
  return subpageMetadata(lang, page);
}

export default async function InfoPage({ params }: Params) {
  const { lang, page } = await params;
  if (!isLocale(lang) || !isInfoPage(page)) notFound();
  return <SubpageView lang={lang} pageKey={page} />;
}
