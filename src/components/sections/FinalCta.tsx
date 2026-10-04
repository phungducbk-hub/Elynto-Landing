import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/content/types";

export function FinalCta({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict;
  return (
    <section aria-labelledby="final-cta-title">
      <Container className="pb-20 sm:pb-28">
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center sm:px-12 sm:py-20">
          <Logo
            variant="mark"
            title={null}
            className="pointer-events-none absolute -right-10 -bottom-16 -z-10 h-72 w-auto text-white opacity-[0.04] sm:h-96"
          />
          <h2
            id="final-cta-title"
            className="mx-auto max-w-2xl text-[1.875rem] leading-[1.2] font-bold tracking-tight text-white text-balance sm:text-[2.5rem]"
          >
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80 text-pretty">{finalCta.body}</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink
              href={siteConfig.signupUrl}
              variant="inverse"
              size="lg"
              className="w-full sm:w-auto"
              dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "final_cta" }}
            >
              {finalCta.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-white/75">
            {finalCta.loginPrompt}{" "}
            <a
              href={siteConfig.loginUrl}
              data-track="cta_click"
              data-track-cta="login"
              data-track-location="final_cta"
              className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              {finalCta.login}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
