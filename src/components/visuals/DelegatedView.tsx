import { CalendarDays, ChevronRight, CircleAlert, RotateCcw, UserRoundCheck } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { ProductSurface } from "@/components/ui/ProductSurface";
import { WorkStatusBadge } from "@/components/ui/WorkStatus";
import type { Dictionary } from "@/content/types";
import { formatDay } from "@/lib/format";

type Props = {
  view: Dictionary["delegate"]["view"];
  app: Dictionary["app"];
  label: string;
};

/** Refined recreation of the beta's "Delegated" view, with the status flow every task moves through. */
export function DelegatedView({ view, app, label }: Props) {
  const countOf = (status: string) => view.rows.filter((row) => row.status === status).length;

  return (
    <ProductSurface label={label}>
      <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-4 sm:px-6">
        <p className="flex items-center gap-2.5 text-lg font-semibold text-ink stretch-wide">
          <UserRoundCheck className="size-5 text-navy" aria-hidden="true" />
          {view.title}
        </p>
        <p className="text-sm text-muted">{view.count}</p>
      </div>

      <div className="border-b border-rule bg-fog px-5 py-4 sm:px-6">
        <p className="text-sm text-muted">{view.flowLabel}</p>
        <ol className="mt-2.5 flex flex-wrap items-center gap-x-1 gap-y-2">
          {view.flow.map((status, index) => (
            <li key={status} className="flex items-center gap-1">
              {index > 0 ? <ChevronRight className="size-3.5 text-muted" aria-hidden="true" /> : null}
              <WorkStatusBadge status={status} label={app.statuses[status]} />
              <span className="min-w-4 text-sm text-muted">{countOf(status)}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-body">
          <RotateCcw className="size-3.5 text-st-rework" aria-hidden="true" />
          {view.reworkNote}
        </p>
      </div>

      <table className="w-full text-left text-[0.9375rem]">
        <thead className="text-sm text-muted">
          <tr className="border-b border-rule">
            <th scope="col" className="py-2.5 pr-3 pl-5 font-normal sm:pl-6">
              {view.columns.task}
            </th>
            <th scope="col" className="hidden py-2.5 pr-3 font-normal sm:table-cell">
              {view.columns.assignee}
            </th>
            <th scope="col" className="hidden py-2.5 pr-3 font-normal sm:table-cell">
              {view.columns.due}
            </th>
            <th scope="col" className="py-2.5 pr-5 font-normal sm:pr-6">
              {view.columns.status}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {view.rows.map((row) => (
            <tr key={row.title}>
              <td className="py-3 pr-3 pl-5 align-top sm:pl-6">
                <span className="block leading-snug font-medium text-ink">{row.title}</span>
                <span className="mt-1 flex items-center gap-2 text-sm text-muted sm:hidden">
                  <Avatar person={row.assignee} size="sm" />
                  {row.assignee.name}, {formatDay(app.datePattern, row.due)}
                </span>
              </td>
              <td className="hidden py-3 pr-3 align-top sm:table-cell">
                <span className="flex items-center gap-2 whitespace-nowrap text-body">
                  <Avatar person={row.assignee} size="sm" />
                  {row.assignee.name}
                </span>
              </td>
              <td className="hidden py-3 pr-3 align-top sm:table-cell">
                <span className={row.overdue ? "flex items-center gap-1.5 font-medium text-late" : "flex items-center gap-1.5 text-body"}>
                  {row.overdue ? (
                    <CircleAlert className="size-4" aria-label={app.overdueLabel} />
                  ) : (
                    <CalendarDays className="size-4 text-muted" aria-hidden="true" />
                  )}
                  {formatDay(app.datePattern, row.due)}
                </span>
              </td>
              <td className="py-3 pr-5 align-top sm:pr-6">
                <WorkStatusBadge status={row.status} label={app.statuses[row.status]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProductSurface>
  );
}
