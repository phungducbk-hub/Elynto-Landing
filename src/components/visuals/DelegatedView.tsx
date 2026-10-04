import { CalendarDays, ChevronRight, CircleAlert, RotateCcw, UserRoundCheck } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { IllustrationFrame } from "@/components/ui/IllustrationFrame";
import { WorkStatusBadge } from "@/components/ui/WorkStatus";
import type { Dictionary } from "@/content/types";
import { formatDay } from "@/lib/format";

type Props = {
  view: Dictionary["delegate"]["view"];
  app: Dictionary["app"];
  badge: string;
};

/** Refined recreation of the beta's "Delegated" view, with the status flow every task moves through. */
export function DelegatedView({ view, app, badge }: Props) {
  const countOf = (status: string) => view.rows.filter((row) => row.status === status).length;

  return (
    <IllustrationFrame
      badge={badge}
      padded={false}
      title={
        <>
          <UserRoundCheck className="size-4 text-brand" aria-hidden="true" />
          <span>{view.title}</span>
          <span className="font-normal text-ink-subtle">{view.count}</span>
        </>
      }
    >
      <div className="border-b border-line px-4 py-4 sm:px-6">
        <p className="text-sm text-ink-subtle">{view.flowLabel}</p>
        <ol className="mt-2.5 flex flex-wrap items-center gap-x-1 gap-y-2">
          {view.flow.map((status, index) => (
            <li key={status} className="flex items-center gap-1">
              {index > 0 ? <ChevronRight className="size-3.5 text-ink-subtle" aria-hidden="true" /> : null}
              <WorkStatusBadge status={status} label={app.statuses[status]} />
              <span className="min-w-4 text-sm text-ink-subtle">{countOf(status)}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-muted">
          <RotateCcw className="size-3.5 text-st-rework" aria-hidden="true" />
          {view.reworkNote}
        </p>
      </div>

      <table className="w-full text-left text-[0.9375rem]">
        <thead className="text-sm text-ink-subtle">
          <tr className="border-b border-line">
            <th scope="col" className="py-2.5 pr-3 pl-4 font-normal sm:pl-6">
              {view.columns.task}
            </th>
            <th scope="col" className="hidden py-2.5 pr-3 font-normal whitespace-nowrap sm:table-cell">
              {view.columns.assignee}
            </th>
            <th scope="col" className="hidden py-2.5 pr-3 font-normal whitespace-nowrap sm:table-cell">
              {view.columns.due}
            </th>
            <th scope="col" className="py-2.5 pr-4 font-normal sm:pr-6">
              {view.columns.status}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {view.rows.map((row) => (
            <tr key={row.title}>
              <td className="py-3 pr-3 pl-4 align-top sm:pl-6">
                <span className="block leading-snug font-medium text-ink">{row.title}</span>
                <span className="mt-1 flex items-center gap-2 text-sm text-ink-subtle sm:hidden">
                  <Avatar person={row.assignee} size="sm" />
                  {row.assignee.name}, {formatDay(app.datePattern, row.due)}
                </span>
              </td>
              <td className="hidden py-3 pr-3 align-top sm:table-cell">
                <span className="flex items-center gap-2 whitespace-nowrap text-ink-muted">
                  <Avatar person={row.assignee} size="sm" />
                  {row.assignee.name}
                </span>
              </td>
              <td className="hidden py-3 pr-3 align-top sm:table-cell">
                <span
                  className={
                    row.overdue
                      ? "flex items-center gap-1.5 font-medium text-status-overdue"
                      : "flex items-center gap-1.5 text-ink-muted"
                  }
                >
                  {row.overdue ? (
                    <CircleAlert className="size-4" aria-label={app.overdueLabel} />
                  ) : (
                    <CalendarDays className="size-4 text-ink-subtle" aria-hidden="true" />
                  )}
                  {formatDay(app.datePattern, row.due)}
                </span>
              </td>
              <td className="py-3 pr-4 align-top sm:pr-6">
                <WorkStatusBadge status={row.status} label={app.statuses[row.status]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </IllustrationFrame>
  );
}
