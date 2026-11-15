"use client";

import { usePathname } from "next/navigation";
import { ChevronDown, Languages } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/lib/i18n";

function rememberLocale(locale: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The URL still carries the language.
  }
}

type Props = {
  current: Locale;
  label: string;
  location: string;
  className?: string;
};

export function LanguageSwitch({ current, label, location, className }: Props) {
  // Keep the visitor on the same page: /vi/privacy ↔ /en/privacy.
  const rest = usePathname().replace(new RegExp(`^/${current}(?=/|$)`), "");

  return (
    <div className={cn("relative inline-flex shrink-0 items-center", className)}>
      <Languages aria-hidden="true" className="pointer-events-none absolute left-4 size-4 text-ink" />
      <select
        aria-label={label}
        value={current}
        onChange={(event) => {
          const locale = event.target.value as Locale;
          rememberLocale(locale);
          if (locale === current) return;
          track("language_switch", { from: current, to: locale, location });
          // Reload so the document language and metadata match, preserving page and section.
          window.location.assign(`/${locale}${rest}${window.location.search}${window.location.hash}`);
        }}
        className="min-h-11 min-w-44 appearance-none rounded-full border border-line bg-white py-2.5 pr-10 pl-10 text-sm font-medium text-ink transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {locales.map(locale => <option key={locale} value={locale} lang={locale}>{localeNames[locale]}</option>)}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 size-3.5 text-ink-muted" />
    </div>
  );
}
