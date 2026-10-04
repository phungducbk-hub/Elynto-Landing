"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Dictionary } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";

type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  signupUrl: string;
  loginUrl: string;
};

export function SiteHeader({ lang, nav, signupUrl, loginUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "#benefits", label: nav.benefits },
    { href: "#how-it-works", label: nav.howItWorks },
    { href: "#faq", label: nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    track("mobile_menu_toggle", { open: next });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-canvas transition-[border-color,box-shadow] duration-200",
        scrolled || open ? "border-line shadow-[0_1px_0_rgb(16_28_43/0.02)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="-m-1 shrink-0 rounded-md p-1 text-brand" aria-label={nav.home}>
          <Logo className="h-7 w-auto sm:h-8" title={null} />
        </a>

        <nav aria-label={nav.mainNav} className="ml-8 hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-track="nav_click"
                  data-track-target={link.href.slice(1)}
                  data-track-location="header"
                  className="rounded-md px-3 py-2 text-[0.9375rem] font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <LanguageSwitch current={lang} label={nav.language} location="header" />
          </div>
          <a
            href={loginUrl}
            data-track="cta_click"
            data-track-cta="login"
            data-track-location="header"
            className="hidden rounded-md px-2 py-2 text-[0.9375rem] font-medium text-ink-muted transition-colors hover:text-ink lg:inline-block"
          >
            {nav.login}
          </a>
          <ButtonLink
            href={signupUrl}
            size="sm"
            className="max-[359px]:hidden"
            dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "header" }}
          >
            {nav.startTrial}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-1 inline-grid size-10 place-items-center rounded-lg text-ink transition-colors hover:bg-sunken lg:hidden"
          >
            <span className="sr-only">{open ? nav.closeMenu : nav.openMenu}</span>
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-canvas lg:hidden">
        <nav aria-label={nav.mainNav} className="mx-auto w-full max-w-6xl px-4 pt-2 pb-5 sm:px-6">
          <ul className="divide-y divide-line">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  data-track="nav_click"
                  data-track-target={link.href.slice(1)}
                  data-track-location="mobile_menu"
                  className="flex min-h-12 items-center text-base font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <LanguageSwitch current={lang} label={nav.language} location="mobile_menu" />
            <a
              href={loginUrl}
              data-track="cta_click"
              data-track-cta="login"
              data-track-location="mobile_menu"
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-ink-muted hover:text-ink"
            >
              {nav.login}
            </a>
          </div>
          <ButtonLink
            href={signupUrl}
            size="lg"
            className="mt-4 w-full"
            dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "mobile_menu" }}
          >
            {nav.startTrial}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
