"use client";

import { useRef } from "react";
import type { Granularity } from "@/lib/stats/aggregate";
import type { RangePreset } from "@/lib/stats/range";

const presets: { value: RangePreset; label: string }[] = [
  { value: "today", label: "Hôm nay" },
  { value: "7d", label: "7 ngày qua" },
  { value: "30d", label: "30 ngày qua" },
  { value: "90d", label: "90 ngày qua" },
  { value: "12m", label: "12 tháng qua" },
  { value: "ytd", label: "Từ đầu năm" },
  { value: "custom", label: "Tùy chọn" },
];

const fieldClass =
  "h-10 rounded-lg border border-line-strong bg-surface px-3 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

/**
 * Date range and grouping, as a plain GET form so it works without JavaScript. With it, changing
 * a preset or the grouping applies straight away, and editing a date switches to "Tùy chọn".
 */
export function RangeForm({ preset, from, to, granularity }: { preset: RangePreset; from: string; to: string; granularity: Granularity }) {
  const formRef = useRef<HTMLFormElement>(null);
  const presetRef = useRef<HTMLSelectElement>(null);
  const submit = () => formRef.current?.requestSubmit();

  return (
    <form ref={formRef} method="get" className="flex flex-wrap items-end gap-3">
      <label className="grid gap-1 text-xs font-medium text-ink-subtle">
        Khoảng thời gian
        <select ref={presetRef} name="range" defaultValue={preset} onChange={submit} className={fieldClass}>
          {presets.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-xs font-medium text-ink-subtle">
        Từ ngày
        <input
          type="date"
          name="from"
          defaultValue={from}
          onChange={() => presetRef.current && (presetRef.current.value = "custom")}
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-ink-subtle">
        Đến ngày
        <input
          type="date"
          name="to"
          defaultValue={to}
          onChange={() => presetRef.current && (presetRef.current.value = "custom")}
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-ink-subtle">
        Nhóm theo
        <select name="by" defaultValue={granularity} onChange={submit} className={fieldClass}>
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </label>
      <button type="submit" className="h-10 rounded-lg bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-hover">
        Xem
      </button>
    </form>
  );
}
