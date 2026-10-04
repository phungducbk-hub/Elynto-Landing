"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

export type ChartSeries = { name: string; color: string; values: number[] };

type Props = {
  /** Short labels on the x axis (04/10, T10/26…). */
  labels: string[];
  /** Full labels in the tooltip (04/10/2026, Tháng 10/2026…). */
  fullLabels: string[];
  series: ChartSeries[];
  kind: "line" | "columns";
  ariaLabel: string;
  height?: number;
};

const MARGIN = { top: 12, right: 12, bottom: 30, left: 48 };
const numberFormat = new Intl.NumberFormat("vi-VN");

/** Rounds the axis maximum up to a clean step: 0 / 5 / 10 / 15 … 0 / 200 / 400 … */
function niceScale(max: number) {
  if (max <= 0) return { top: 4, step: 1 };
  const rough = max / 4;
  const power = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= rough) ?? 10 * power;
  const niceStep = Math.max(1, Math.round(step));
  return { top: Math.ceil(max / niceStep) * niceStep, step: niceStep };
}

/** Column with a 4px rounded data end and a square baseline. */
function columnPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}

/**
 * Line or grouped-column chart in plain SVG. Hover or arrow keys pick a period; the tooltip lists
 * every series at that period. The period table under the charts carries the same numbers.
 */
export function TrendChart({ labels, fullLabels, series, kind, ariaLabel, height = 260 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, Math.round(entry.contentRect.width))));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const n = labels.length;
  const innerW = width - MARGIN.left - MARGIN.right;
  const innerH = height - MARGIN.top - MARGIN.bottom;
  const band = innerW / Math.max(n, 1);
  const max = Math.max(0, ...series.flatMap((s) => s.values));
  const { top, step } = niceScale(max);
  const y = (value: number) => MARGIN.top + innerH - (value / top) * innerH;
  const cx = (i: number) => MARGIN.left + band * (i + 0.5);
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
  const labelEvery = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(innerW / 58))));

  // Columns: at most 24px each, 2px apart, centred in the band.
  const gap = 2;
  const colW = Math.max(2, Math.min(24, (band * 0.72 - gap * (series.length - 1)) / series.length));
  const groupW = colW * series.length + gap * (series.length - 1);

  const pick = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * width;
    setActive(Math.min(n - 1, Math.max(0, Math.floor((x - MARGIN.left) / band))));
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    setActive((current) => {
      const at = current ?? n - 1;
      if (event.key === "Home") return 0;
      if (event.key === "End") return n - 1;
      return Math.min(n - 1, Math.max(0, at + (event.key === "ArrowRight" ? 1 : -1)));
    });
  };

  const tooltipLeft = active === null ? 0 : Math.min(Math.max(cx(active), 90), width - 90);

  return (
    <div>
      {series.length > 1 ? (
        <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
          {series.map((s) => (
            <li key={s.name} className="flex items-center gap-2">
              {kind === "line" ? (
                <span className="h-0.5 w-4 rounded-full" style={{ background: s.color }} aria-hidden="true" />
              ) : (
                <span className="size-2.5 rounded-sm" style={{ background: s.color }} aria-hidden="true" />
              )}
              {s.name}
            </li>
          ))}
        </ul>
      ) : null}

      <div
        ref={wrapRef}
        className="relative rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        tabIndex={0}
        role="group"
        aria-label={`${ariaLabel}. Dùng phím mũi tên để xem từng kỳ.`}
        onKeyDown={onKey}
        onFocus={() => setActive((current) => current ?? n - 1)}
        onBlur={() => setActive(null)}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block max-w-full touch-pan-y"
          role="img"
          aria-label={ariaLabel}
          onPointerMove={pick}
          onPointerDown={pick}
          onPointerLeave={() => setActive(null)}
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={MARGIN.left} x2={width - MARGIN.right} y1={y(tick)} y2={y(tick)} stroke="var(--color-line)" strokeWidth={1} />
              <text x={MARGIN.left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className="fill-ink-subtle text-[11px] tabular-nums">
                {numberFormat.format(tick)}
              </text>
            </g>
          ))}

          {labels.map((label, i) =>
            i % labelEvery === 0 ? (
              <text key={i} x={cx(i)} y={height - 8} textAnchor="middle" className="fill-ink-subtle text-[11px] tabular-nums">
                {label}
              </text>
            ) : null,
          )}

          {kind === "columns" && active !== null ? (
            <rect x={MARGIN.left + band * active} y={MARGIN.top} width={band} height={innerH} fill="var(--color-sunken)" />
          ) : null}

          {kind === "columns"
            ? series.map((s, si) =>
                s.values.map((value, i) => {
                  const h = (value / top) * innerH;
                  if (h <= 0) return null;
                  const x = cx(i) - groupW / 2 + si * (colW + gap);
                  return <path key={`${si}-${i}`} d={columnPath(x, y(value), colW, h)} fill={s.color} />;
                }),
              )
            : series.map((s) => (
                <path
                  key={s.name}
                  d={s.values.map((value, i) => `${i ? "L" : "M"}${cx(i)},${y(value)}`).join("")}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}

          {kind === "line" && active !== null ? (
            <g>
              <line x1={cx(active)} x2={cx(active)} y1={MARGIN.top} y2={MARGIN.top + innerH} stroke="var(--color-line-strong)" strokeWidth={1} />
              {series.map((s) => (
                <circle key={s.name} cx={cx(active)} cy={y(s.values[active])} r={4} fill={s.color} stroke="var(--color-surface)" strokeWidth={2} />
              ))}
            </g>
          ) : null}

          {kind === "line" && n === 1
            ? series.map((s) => <circle key={s.name} cx={cx(0)} cy={y(s.values[0])} r={4} fill={s.color} />)
            : null}
        </svg>

        {active !== null ? (
          <div
            className="pointer-events-none absolute top-0 z-10 min-w-40 -translate-x-1/2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm shadow-float"
            style={{ left: tooltipLeft }}
            role="status"
          >
            <p className="font-medium text-ink-muted">{fullLabels[active]}</p>
            <ul className="mt-1.5 space-y-1">
              {series.map((s) => (
                <li key={s.name} className="flex items-center gap-2">
                  <span className="h-0.5 w-3 rounded-full" style={{ background: s.color }} aria-hidden="true" />
                  <span className="font-semibold text-ink tabular-nums">{numberFormat.format(s.values[active])}</span>
                  <span className="text-ink-subtle">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
