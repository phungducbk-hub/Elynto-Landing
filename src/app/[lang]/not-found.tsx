"use client";

import { useParams } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { defaultLocale, isLocale } from "@/lib/i18n";

const copy = {
  vi: {
    title: "Không tìm thấy trang",
    body: "Trang bạn tìm không tồn tại hoặc đã được chuyển đi.",
    back: "Về trang chủ Elynto",
  },
  en: {
    title: "Page not found",
    body: "The page you’re looking for doesn’t exist or has moved.",
    back: "Back to the Elynto home page",
  },
};

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = isLocale(params?.lang) ? params.lang : defaultLocale;
  const text = copy[lang];

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center px-4 py-16 sm:px-6">
      <Logo className="h-8 w-auto text-brand" />
      <p className="mt-10 text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{text.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-muted">{text.body}</p>
      <ButtonLink href={`/${lang}`} className="mt-8">
        {text.back}
      </ButtonLink>
    </main>
  );
}
