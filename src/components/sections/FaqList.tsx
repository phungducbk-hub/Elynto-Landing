"use client";

import { Plus } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { track } from "@/lib/analytics";

export function FaqList({ items }: { items: Dictionary["faq"]["items"] }) {
  return (
    <div className="border-t-2 border-navy">
      {items.map((item) => (
        <details
          key={item.id}
          className="group border-b border-rule"
          onToggle={(event) => track("faq_toggle", { question: item.id, open: event.currentTarget.open })}
        >
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg leading-snug font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              className="size-5 shrink-0 text-navy transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-[40rem] pb-7 text-base leading-relaxed text-pretty">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
