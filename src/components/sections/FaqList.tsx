"use client";

import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { track } from "@/lib/analytics";

export function FaqList({ items }: { items: Dictionary["faq"]["items"] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details
          key={item.id}
          className="group"
          onToggle={(event) => track("faq_toggle", { question: item.id, open: event.currentTarget.open })}
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.0625rem] leading-snug font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              className="size-5 shrink-0 text-ink-subtle transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-2xl pb-6 text-base leading-relaxed text-ink-muted text-pretty">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
