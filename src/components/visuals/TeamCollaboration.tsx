import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import type { Locale } from "@/lib/i18n";

/** Original illustrative team photograph with localized Elynto branding. */
export function TeamCollaboration({ lang }: { lang: Locale }) {
  const vi = lang === "vi";

  return (
    <figure className="relative isolate pb-20 pl-4 sm:pb-16 sm:pl-8">
      <div aria-hidden="true" className="absolute top-9 right-0 bottom-12 left-12 -z-10 rounded-2xl bg-brand-100 sm:top-10 sm:bottom-8 sm:left-16" />
      <div className="elynto-photo-frame mr-3">
        <Image
          src="/media/elynto-team-collaboration.webp"
          width={1200}
          height={900}
          alt={vi ? "Đội nhóm châu Á vui vẻ cùng làm việc bên máy tính trong văn phòng sáng tự nhiên" : "An Asian team enjoying a collaborative working moment around a laptop in a bright office"}
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 80vw, 94vw"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="elynto-insight-card absolute bottom-0 left-0 w-[92%] max-w-sm">
        <div className="flex items-center justify-between gap-4">
          <Logo className="h-6 w-auto text-brand" />
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-field-assignee-soft text-brand">
            <CircleCheck className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-base font-semibold leading-snug text-ink sm:text-lg">
          {vi ? "Việc rõ ràng. Đội nhóm đồng lòng." : "Clear work. A team moving together."}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
          {vi ? "Từ một câu nói đến bước tiếp theo của cả nhóm." : "From one sentence to the whole team’s next step."}
        </p>
      </figcaption>
    </figure>
  );
}
