import { Download, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { BreakdownList, Card, CtaLocationTable, KpiRow, PeriodTable, SERIES } from "@/components/stats/parts";
import { RangeForm } from "@/components/stats/RangeForm";
import { TrendChart } from "@/components/stats/TrendChart";
import { aggregate } from "@/lib/stats/aggregate";
import { isStatsSignedIn } from "@/lib/stats/auth";
import { dayLabel, formatNumber, formatPercent, periodLabel } from "@/lib/stats/format";
import { resolveRange } from "@/lib/stats/range";
import { getStatsStore } from "@/lib/stats/store";
import { daysBetween } from "@/lib/stats/time";
import type { StatsEvent } from "@/lib/stats/types";
import { signOut } from "./actions";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const storeNotes = {
  redis: null,
  file: "Đang lưu vào tệp trên máy chủ này (thư mục .data/stats). Phù hợp để chạy thử; khi triển khai trên Vercel, hãy kết nối Upstash Redis.",
  none: "Chưa kết nối nơi lưu dữ liệu nên chưa ghi nhận được lượt truy cập nào. Trên Vercel, thêm Upstash Redis cho dự án (xem README, mục Thống kê truy cập).",
};

export default async function StatsPage({ searchParams }: Props) {
  if (!(await isStatsSignedIn())) redirect("/stats/login");

  const params = await searchParams;
  const range = resolveRange(params);
  const store = getStatsStore();

  let events: StatsEvent[] = [];
  let readError = false;
  try {
    events = await store.read(daysBetween(range.previous.from, range.to));
  } catch (error) {
    console.error("[stats] could not read events", error);
    readError = true;
  }

  const report = aggregate(events, range.from, range.to, range.granularity);
  const previous = aggregate(events, range.previous.from, range.previous.to, range.granularity).totals;
  const labels = report.periods.map((p) => periodLabel(p.key, range.granularity, true));
  const fullLabels = report.periods.map((p) => periodLabel(p.key, range.granularity));
  const query = new URLSearchParams({ range: range.preset, from: range.from, to: range.to, by: range.granularity });
  const { totals, breakdowns } = report;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-auto text-brand" />
          <span className="h-5 w-px bg-line-strong" aria-hidden="true" />
          <h1 className="text-lg font-semibold text-ink">Thống kê truy cập</h1>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-ink-muted ring-1 ring-line transition-colors ring-inset hover:bg-surface hover:text-ink"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Đăng xuất
          </button>
        </form>
      </header>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <RangeForm preset={range.preset} from={range.from} to={range.to} granularity={range.granularity} />
        <p className="text-sm text-ink-subtle">
          {dayLabel(range.from)} – {dayLabel(range.to)} · thay đổi so với {dayLabel(range.previous.from)} – {dayLabel(range.previous.to)}
        </p>
      </div>

      {storeNotes[store.kind] || readError ? (
        <p role="status" className="mt-5 rounded-xl border border-field-due/30 bg-field-due-soft px-4 py-3 text-sm text-ink">
          {readError ? "Không đọc được dữ liệu từ nơi lưu trữ. Kiểm tra kết nối Upstash Redis rồi tải lại trang." : storeNotes[store.kind]}
        </p>
      ) : null}

      <div className="mt-6">
        <KpiRow totals={totals} previous={previous} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card title="Người truy cập và lượt truy cập" description="Một người vào nhiều lần vẫn tính là một người truy cập.">
          <TrendChart
            kind="line"
            labels={labels}
            fullLabels={fullLabels}
            ariaLabel="Biểu đồ đường người truy cập và lượt truy cập theo kỳ"
            series={[
              { name: "Người truy cập", color: SERIES.first, values: report.periods.map((p) => p.visitors) },
              { name: "Lượt truy cập", color: SERIES.second, values: report.periods.map((p) => p.visits) },
            ]}
          />
        </Card>
        <Card title="Lượt bấm nút" description="Số lần bấm “Dùng thử miễn phí” và “Đăng nhập”.">
          <TrendChart
            kind="columns"
            labels={labels}
            fullLabels={fullLabels}
            ariaLabel="Biểu đồ cột lượt bấm Dùng thử miễn phí và Đăng nhập theo kỳ"
            series={[
              { name: "Dùng thử miễn phí", color: SERIES.first, values: report.periods.map((p) => p.signupClicks) },
              { name: "Đăng nhập", color: SERIES.second, values: report.periods.map((p) => p.loginClicks) },
            ]}
          />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Thiết bị">
          <BreakdownList dimension="device" rows={breakdowns.device} />
        </Card>
        <Card title="Trình duyệt">
          <BreakdownList dimension="browser" rows={breakdowns.browser} />
        </Card>
        <Card title="Hệ điều hành">
          <BreakdownList dimension="os" rows={breakdowns.os} />
        </Card>
        <Card title="Quốc gia" description="Suy ra từ địa chỉ IP lúc truy cập; IP không được lưu.">
          <BreakdownList dimension="country" rows={breakdowns.country} />
        </Card>
        <Card title="Nguồn truy cập" description="Trang web đã dẫn người xem tới.">
          <BreakdownList dimension="referrer" rows={breakdowns.referrer} />
        </Card>
        <Card title="Chiến dịch" description="Từ tham số utm_source trên đường dẫn.">
          <BreakdownList dimension="utmSource" rows={breakdowns.utmSource.filter((row) => row.value)} />
        </Card>
        <Card title="Trang được xem">
          <BreakdownList dimension="path" rows={breakdowns.path} limit={10} />
        </Card>
        <Card title="Ngôn ngữ trang">
          <BreakdownList dimension="lang" rows={breakdowns.lang} />
        </Card>
        <Card title="Vị trí nút được bấm">
          <CtaLocationTable rows={report.ctaLocations} />
        </Card>
      </div>

      <section className="mt-4 rounded-2xl border border-line bg-surface p-5 sm:p-6" aria-labelledby="period-table-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="period-table-title" className="text-base font-semibold text-ink">
            Số liệu theo {range.granularity === "day" ? "ngày" : range.granularity === "month" ? "tháng" : "năm"}
          </h2>
          <a
            href={`/api/stats/export?${query}`}
            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-ink-muted ring-1 ring-line transition-colors ring-inset hover:bg-sunken hover:text-ink"
          >
            <Download className="size-4" aria-hidden="true" />
            Tải CSV
          </a>
        </div>
        <p className="mt-1 text-sm text-ink-subtle">
          Dòng “Cả khoảng” đếm mỗi người một lần trong cả khoảng thời gian, nên có thể nhỏ hơn tổng các dòng.
        </p>
        <div className="mt-4">
          <PeriodTable periods={report.periods} totals={totals} granularity={range.granularity} />
        </div>
      </section>

      <footer className="mt-6 space-y-1.5 text-xs leading-relaxed text-ink-subtle">
        <p>
          <strong className="font-semibold text-ink-muted">Người truy cập</strong>: mỗi trình duyệt được đếm một lần nhờ một mã ngẫu nhiên
          lưu trong trình duyệt. Cùng một người dùng điện thoại và máy tính được tính là hai; xóa dữ liệu trình duyệt hoặc dùng chế độ ẩn
          danh sẽ được tính là người mới.
        </p>
        <p>
          <strong className="font-semibold text-ink-muted">Lượt truy cập</strong>: một lượt kết thúc sau 30 phút không hoạt động.{" "}
          <strong className="font-semibold text-ink-muted">Tỷ lệ thoát</strong>: lượt truy cập chỉ xem một trang. Trình duyệt bật Do Not
          Track hoặc Global Privacy Control, người đã tắt thống kê và các bot không được tính. Ngày tính theo giờ Việt Nam.
        </p>
        <p>
          Trong khoảng này: {formatNumber(totals.pageviews)} lượt xem trang, tỷ lệ bấm Đăng nhập{" "}
          {formatPercent(totals.visitors ? totals.loginVisitors / totals.visitors : 0)}.
        </p>
      </footer>
    </div>
  );
}
