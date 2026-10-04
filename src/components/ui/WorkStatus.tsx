import type { WorkStatus } from "@/content/types";
import { cn } from "@/lib/cn";

const styles: Record<WorkStatus, string> = {
  draft: "bg-st-draft-bg text-st-draft",
  assigned: "bg-st-assigned-bg text-st-assigned",
  accepted: "bg-st-accepted-bg text-st-accepted",
  inProgress: "bg-st-progress-bg text-st-progress",
  submitted: "bg-st-submitted-bg text-st-submitted",
  rework: "bg-st-rework-bg text-st-rework",
  approved: "bg-st-approved-bg text-st-approved",
  completed: "bg-st-completed-bg text-st-completed",
};

/** Left-border accent per status, for calendar chips and similar compact items. */
export const statusAccent: Record<WorkStatus, string> = {
  draft: "border-st-draft/40",
  assigned: "border-st-assigned/50",
  accepted: "border-st-accepted",
  inProgress: "border-st-progress",
  submitted: "border-st-submitted",
  rework: "border-st-rework",
  approved: "border-st-approved",
  completed: "border-st-completed",
};

export function WorkStatusBadge({ status, label, className }: { status: WorkStatus; label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[0.8125rem] leading-5 font-medium whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      {label}
    </span>
  );
}
