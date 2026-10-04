import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/content/types";

export function FinalCta({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict;
  return (
    <section aria-labelledby="final-cta-title" className="border-t border-rule">
      <Container className="grid gap-8 py-24 sm:py-32 lg:grid-cols-12 lg:items-end lg:gap-12">
        <h2 id="final-cta-title" className="type-h2 text-balance lg:col-span-7">
          {finalCta.title}
        </h2>
        <div className="lg:col-span-5">
          <p className="max-w-[30rem] type-lead text-pretty">{finalCta.body}</p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink
              href={siteConfig.signupUrl}
              className="w-full sm:w-auto"
              dataAttrs={{ "data-track": "cta_click", "data-track-cta": "signup", "data-track-location": "final_cta" }}
            >
              {finalCta.cta}
            </ButtonLink>
            <p className="text-[0.9375rem]">
              {finalCta.loginPrompt}{" "}
              <a
                href={siteConfig.loginUrl}
                data-track="cta_click"
                data-track-cta="login"
                data-track-location="final_cta"
                className="font-semibold text-navy underline decoration-rule-strong underline-offset-4 hover:decoration-navy"
              >
                {finalCta.login}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
