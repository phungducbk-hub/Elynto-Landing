import { aggregate } from "@/lib/stats/aggregate";
import { isStatsSignedIn } from "@/lib/stats/auth";
import { periodLabel } from "@/lib/stats/format";
import { resolveRange } from "@/lib/stats/range";
import { getStatsStore } from "@/lib/stats/store";
import { daysBetween } from "@/lib/stats/time";

/** The period table as CSV (UTF-8 with BOM so Excel shows Vietnamese correctly). */
export async function GET(request: Request) {
  if (!(await isStatsSignedIn())) return new Response("Unauthorized", { status: 401 });

  const range = resolveRange(Object.fromEntries(new URL(request.url).searchParams));
  const events = await getStatsStore().read(daysBetween(range.from, range.to));
  const report = aggregate(events, range.from, range.to, range.granularity);

  const rows = [
    ["Kỳ", "Người truy cập", "Lượt truy cập", "Lượt xem trang", "Bấm Đăng ký beta", "Bấm Đăng nhập", "Xem demo", "Thấy work card", "Mở My Work", "Bấm đăng ký sau demo"],
    ...report.periods.map((p) => [periodLabel(p.key, range.granularity), p.visitors, p.visits, p.pageviews, p.signupClicks, p.loginClicks, p.demoViews, p.workCards, p.workLists, p.signupAfterDemo]),
    ["Cả khoảng", report.totals.visitors, report.totals.visits, report.totals.pageviews, report.totals.signupClicks, report.totals.loginClicks, report.totals.demoViews, report.totals.workCards, report.totals.workLists, report.totals.signupAfterDemo],
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\r\n");

  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="elynto-thong-ke-${range.from}-${range.to}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
