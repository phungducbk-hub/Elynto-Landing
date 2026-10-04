import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { BreakdownDimension, BreakdownRow, CtaLocationRow, Granularity, PeriodRow, Totals } from "@/lib/stats/aggregate";
import { ctaLocationLabel, dimensionLabel, formatDecimal, formatNumber, formatPercent, periodLabel } from "@/lib/stats/format";

/** Chart colours: slots 1–2 of the validated categorical palette (pass CVD and contrast on white). */
export const SERIES = { first: "#2a78d6", second: "#eb6834" };

export function Card({ title, description, children, className }: { title: string; description?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${className ?? ""}`}>
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      {description ? <p className="mt-1 text-sm text-ink-subtle">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/**
 * Change against the previous period of the same length (named once, beside the date range).
 * Up is good for every figure here; direction is shown by an arrow as well as colour.
 */
function Delta({ current, previous, hasPrevious, points }: { current: number; previous: number; hasPrevious: boolean; points?: boolean }) {
  if (!hasPrevious || (!points && previous === 0)) return <DeltaText tone="flat">Chưa có kỳ trước</DeltaText>;
  const change = points ? (current - previous) * 100 : (current - previous) / previous;
  const tone = Math.abs(change) < (points ? 0.05 : 0.0005) ? "flat" : change > 0 ? "up" : "down";
  const sign = tone === "up" ? "+" : tone === "down" ? "−" : "";
  return (
    <DeltaText tone={tone}>
      {sign}
      {points ? `${formatDecimal(Math.abs(change))} điểm` : formatPercent(Math.abs(change))}
      <span className="sr-only"> so với kỳ trước</span>
    </DeltaText>
  );
}

function DeltaText({ tone, children }: { tone: "up" | "down" | "flat"; children: ReactNode }) {
  const Icon = tone === "up" ? ArrowUpRight : tone === "down" ? ArrowDownRight : ArrowRight;
  const color = tone === "up" ? "text-status-done" : tone === "down" ? "text-status-overdue" : "text-ink-subtle";
  return (
    <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${color}`}>
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function KpiRow({ totals, previous }: { totals: Totals; previous: Totals }) {
  const signupRate = totals.visitors ? totals.signupVisitors / totals.visitors : 0;
  const previousRate = previous.visitors ? previous.signupVisitors / previous.visitors : 0;
  // Any traffic at all in the previous period makes the comparison meaningful.
  const hasPrevious = previous.visitors > 0;

  const tiles = [
    {
      key: "visitors",
      label: "Người truy cập",
      value: formatNumber(totals.visitors),
      note: `${formatNumber(totals.newVisitors)} mới · ${formatNumber(totals.returningVisitors)} quay lại`,
      delta: <Delta current={totals.visitors} previous={previous.visitors} hasPrevious={hasPrevious} />,
    },
    {
      key: "visits",
      label: "Lượt truy cập",
      value: formatNumber(totals.visits),
      note: `${formatDecimal(totals.pagesPerVisit)} trang mỗi lượt`,
      delta: <Delta current={totals.visits} previous={previous.visits} hasPrevious={hasPrevious} />,
    },
    {
      key: "pageviews",
      label: "Lượt xem trang",
      value: formatNumber(totals.pageviews),
      note: `Tỷ lệ thoát ${formatPercent(totals.bounceRate)}`,
      delta: <Delta current={totals.pageviews} previous={previous.pageviews} hasPrevious={hasPrevious} />,
    },
    {
      key: "signup",
      label: "Bấm “Dùng thử”",
      value: formatNumber(totals.signupClicks),
      note: `từ ${formatNumber(totals.signupVisitors)} người`,
      delta: <Delta current={totals.signupClicks} previous={previous.signupClicks} hasPrevious={hasPrevious} />,
    },
    {
      key: "login",
      label: "Bấm “Đăng nhập”",
      value: formatNumber(totals.loginClicks),
      note: `từ ${formatNumber(totals.loginVisitors)} người`,
      delta: <Delta current={totals.loginClicks} previous={previous.loginClicks} hasPrevious={hasPrevious} />,
    },
    {
      key: "signupRate",
      label: "Tỷ lệ bấm dùng thử",
      value: formatPercent(signupRate),
      note: "số người bấm / người truy cập",
      delta: <Delta current={signupRate} previous={previousRate} hasPrevious={hasPrevious} points />,
    },
  ];

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {tiles.map((tile) => (
        <li key={tile.key} data-kpi={tile.key} className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
          <p className="text-sm font-medium text-ink-muted">{tile.label}</p>
          <p data-kpi-value className="mt-2 text-[1.75rem] leading-none font-semibold tracking-tight text-ink">
            {tile.value}
          </p>
          <p className="mt-2 text-xs text-ink-subtle">{tile.note}</p>
          {tile.delta}
        </li>
      ))}
    </ul>
  );
}

/** Ranked list with a magnitude bar per row (one hue). Every value is printed, so nothing hides behind hover. */
export function BreakdownList({ dimension, rows, limit = 8 }: { dimension: BreakdownDimension; rows: BreakdownRow[]; limit?: number }) {
  if (!rows.length) return <p className="text-sm text-ink-subtle">Chưa có dữ liệu trong khoảng này.</p>;
  const total = rows.reduce((sum, row) => sum + row.pageviews, 0);
  const max = Math.max(...rows.map((row) => row.visitors));
  const shown = rows.slice(0, limit);

  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-ink-subtle">
        <span>{dimension === "path" ? "Trang" : "Giá trị"}</span>
        <span>Người · % lượt xem</span>
      </div>
      <ul className="mt-2 space-y-2.5">
        {shown.map((row) => (
          <li key={row.value}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className={`min-w-0 truncate text-ink ${dimension === "path" ? "font-mono text-[0.8125rem]" : ""}`}>
                {dimensionLabel(dimension, row.value)}
              </span>
              <span className="shrink-0 text-ink-muted tabular-nums">
                <span className="font-semibold text-ink">{formatNumber(row.visitors)}</span> ·{" "}
                {formatPercent(total ? row.pageviews / total : 0)}
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-sunken">
              <div className="h-full rounded-full" style={{ width: `${(row.visitors / max) * 100}%`, background: SERIES.first }} />
            </div>
          </li>
        ))}
      </ul>
      {rows.length > limit ? <p className="mt-3 text-xs text-ink-subtle">và {formatNumber(rows.length - limit)} mục khác</p> : null}
    </div>
  );
}

export function CtaLocationTable({ rows }: { rows: CtaLocationRow[] }) {
  if (!rows.length) return <p className="text-sm text-ink-subtle">Chưa có lượt bấm trong khoảng này.</p>;
  return (
    <table className="w-full text-left text-sm">
      <thead className="text-xs text-ink-subtle">
        <tr className="border-b border-line">
          <th scope="col" className="pb-2 font-medium">
            Vị trí nút
          </th>
          <th scope="col" className="pb-2 text-right font-medium">
            Dùng thử
          </th>
          <th scope="col" className="pb-2 text-right font-medium">
            Đăng nhập
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {rows.map((row) => (
          <tr key={row.location}>
            <td className="py-2 text-ink">{ctaLocationLabel(row.location)}</td>
            <td className="py-2 text-right font-semibold text-ink tabular-nums">{formatNumber(row.signup)}</td>
            <td className="py-2 text-right text-ink-muted tabular-nums">{formatNumber(row.login)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PeriodTable({ periods, totals, granularity }: { periods: PeriodRow[]; totals: Totals; granularity: Granularity }) {
  const columns = ["Người truy cập", "Lượt truy cập", "Lượt xem trang", "Bấm Dùng thử", "Bấm Đăng nhập"];
  const cells = (row: Pick<PeriodRow, "visitors" | "visits" | "pageviews" | "signupClicks" | "loginClicks">) => [
    row.visitors,
    row.visits,
    row.pageviews,
    row.signupClicks,
    row.loginClicks,
  ];

  return (
    <div role="region" aria-label="Bảng số liệu theo kỳ" tabIndex={0} className="max-h-[28rem] overflow-auto rounded-xl border border-line outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
      <table className="w-full min-w-[40rem] text-right text-sm tabular-nums">
        <thead className="sticky top-0 bg-sunken text-xs text-ink-subtle">
          <tr>
            <th scope="col" className="px-4 py-2.5 text-left font-medium">
              Kỳ
            </th>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-2.5 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          <tr className="bg-brand-50/60 font-semibold text-ink">
            <th scope="row" className="px-4 py-2.5 text-left">
              Cả khoảng
            </th>
            {cells(totals).map((value, i) => (
              <td key={i} className="px-4 py-2.5">
                {formatNumber(value)}
              </td>
            ))}
          </tr>
          {[...periods].reverse().map((row) => (
            <tr key={row.key} className="text-ink-muted">
              <th scope="row" className="px-4 py-2 text-left font-normal text-ink">
                {periodLabel(row.key, granularity)}
              </th>
              {cells(row).map((value, i) => (
                <td key={i} className={`px-4 py-2 ${value ? "" : "text-ink-subtle"}`}>
                  {formatNumber(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
