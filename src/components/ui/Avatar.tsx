import { UserRound } from "lucide-react";
import type { Person } from "@/content/types";
import { cn } from "@/lib/cn";

const tones = [
  "bg-[#dce8f5] text-[#1f3d5e]",
  "bg-[#dcefe9] text-[#0e5a52]",
  "bg-[#f6e7d4] text-[#7a3a06]",
  "bg-[#ebe3f3] text-[#4b2f6b]",
  "bg-[#f3e1e1] text-[#7a2420]",
];

function toneFor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return tones[hash % tones.length];
}

export function Avatar({ person, size = "md", className }: { person: Person; size?: "sm" | "md"; className?: string }) {
  const dims = size === "sm" ? "size-5 text-[0.625rem]" : "size-6 text-[0.6875rem]";
  if (person.self) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-grid shrink-0 place-items-center rounded-full bg-brand text-white", dims, className)}
      >
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
