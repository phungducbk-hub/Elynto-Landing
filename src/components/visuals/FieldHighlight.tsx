import type { FieldKey } from "@/content/types";
import { cn } from "@/lib/cn";

export const fieldStyles: Record<FieldKey, { text: string; soft: string; underline: string; dot: string }> = {
  task: {
    text: "text-field-task",
    soft: "bg-field-task-soft",
    underline: "decoration-field-task",
    dot: "bg-field-task",
  },
  assignee: {
    text: "text-field-assignee",
    soft: "bg-field-assignee-soft",
    underline: "decoration-field-assignee",
    dot: "bg-field-assignee",
  },
  due: {
    text: "text-field-due",
    soft: "bg-field-due-soft",
    underline: "decoration-field-due",
    dot: "bg-field-due",
  },
};

export function FieldHighlight({ field, children }: { field: FieldKey; children: React.ReactNode }) {
  const style = fieldStyles[field];
  return (
    <mark
      className={cn(
        "rounded-[0.3rem] px-0.5 py-0.5 font-semibold underline decoration-2 underline-offset-4 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]",
        style.soft,
        style.text,
        style.underline,
      )}
    >
      {children}
    </mark>
  );
}
