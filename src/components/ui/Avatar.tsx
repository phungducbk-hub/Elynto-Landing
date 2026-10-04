import { UserRound } from "lucide-react";
import type { Person } from "@/content/types";
import { cn } from "@/lib/cn";

const tones = ["bg-navy-tint text-navy", "bg-[#dfeee6] text-[#1d5a3c]", "bg-[#f1e7d8] text-[#6b4417]"];

function toneFor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return tones[hash % tones.length];
}

export function Avatar({ person, size = "md", className }: { person: Person; size?: "sm" | "md"; className?: string }) {
  const dims = size === "sm" ? "size-5 text-[0.625rem]" : "size-6 text-[0.6875rem]";
  if (person.self) {
    return (
      <span aria-hidden="true" className={cn("inline-grid shrink-0 place-items-center rounded-full bg-navy text-white", dims, className)}>
        <UserRound className={size === "sm" ? "size-3" : "size-3.5"} strokeWidth={2.25} />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn("inline-grid shrink-0 place-items-center rounded-full font-semibold", dims, toneFor(person.name), className)}
    >
      {person.initials}
    </span>
  );
}
