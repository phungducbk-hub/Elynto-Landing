import type { TaskStatus } from "@/content/types";
import { cn } from "@/lib/cn";

const styles: Record<TaskStatus, string> = {
  todo: "bg-status-todo-soft text-status-todo",
  inProgress: "bg-status-progress-soft text-status-progress",
  done: "bg-status-done-soft text-status-done",
};

const dots: Record<TaskStatus, string> = {
  todo: "border-2 border-current bg-transparent",
  inProgress: "bg-current",
  done: "bg-current",
};

export function StatusPill({ status, label, className }: { status: TaskStatus; label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-2 rounded-full", dots[status])} />
      {label}
    </span>
  );
}
