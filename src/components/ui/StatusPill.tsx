import type { TaskStatus } from "@/content/types";
import { cn } from "@/lib/cn";

const styles: Record<TaskStatus, string> = {
  todo: "text-muted",
  inProgress: "text-progress",
  done: "text-done",
};

const dots: Record<TaskStatus, string> = {
  todo: "border-[1.5px] border-current",
  inProgress: "border-[1.5px] border-current bg-[conic-gradient(currentColor_0_50%,transparent_50%)]",
  done: "bg-current",
};

/** Status shown as a small glyph + word. Quiet on purpose: status is data, not decoration. */
export function StatusPill({ status, label, className }: { status: TaskStatus; label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap", styles[status], className)}>
      <span aria-hidden="true" className={cn("size-2.5 rounded-full", dots[status])} />
      {label}
    </span>
  );
}
