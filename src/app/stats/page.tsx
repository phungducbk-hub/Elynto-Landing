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
import { getStatsStore, storageVariableNames, type StatsStore } from "@/lib/stats/store";
import { daysBetween } from "@/lib/stats/time";
import type { StatsEvent } from "@/lib/stats/types";
import { signOut } from "./actions";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const noticeClass = "mt-5 rounded-xl border px-4 py-3 text-sm leading-relaxed text-ink";

/** Where the numbers come from, and what to do when storage isn't reachable. */
function StoreNotice({ store, readError }: { store: StatsStore; readError: boolean }) {
  if (readError) {
    return (
      <div role="alert" className={`${noticeClass} border-status-overdue/30 bg-status-overdue-soft`}>
        Không đọc được dữ liệu từ Upstash Redis (biến <code className="font-mono">{store.source}</code>). Kiểm tra database còn hoạt
        động và token đúng, rồi tải lại trang. Chi tiết lỗi nằm trong Logs của dự án trên Vercel.
      </div>
    );
  }
  if (store.kind === "redis") {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-ink-subtle">
        <span className="size-2 rounded-full bg-status-done" aria-hidden="true" />
        Đã kết nối Upstash Redis (biến <code className="font-mono text-xs">{store.source}</code>)
      </p>
    );
  }
  if (store.kind === "file") {
    return (
      <p role="status" className={`${noticeClass} border-field-due/30 bg-field-due-soft`}>
        Đang lưu vào tệp trên máy chủ này (thư mục .data/stats). Phù hợp để chạy thử; khi triển khai trên Vercel, hãy kết nối Upstash Redis.
      </p>
    );
  }

  const found = storageVariableNames();
  const environment = process.env.VERCEL_ENV ?? "không rõ";
  return (
    <div role="status" className={`${noticeClass} border-field-due/30 bg-field-due-soft`}>
      <p className="font-semibold">Lần triển khai này chưa thấy thông tin kết nối Upstash Redis, nên lượt truy cập chưa được lưu.</p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        <li>
          Nếu bạn vừa kết nối Upstash: vào Vercel → Deployments, mở bản mới nhất → ⋯ → <strong>Redeploy</strong>. Biến môi trường chỉ có
          hiệu lực với lần triển khai được tạo sau khi thêm biến.
        </li>
        <li>
          Vào Settings → Environment Variables, kiểm tra có <code className="font-mono">KV_REST_API_URL</code> và{" "}
          <code className="font-mono">KV_REST_API_TOKEN</code> (hoặc cùng tên với tiền tố riêng) cho môi trường{" "}
          <strong>{environment}</strong>.
        </li>
      </ol>
      <p className="mt-2 text-ink-muted">
        Biến liên quan có trong lần triển khai này:{" "}
        {found.length ? found.map((name) => <code key={name} className="mr-1.5 font-mono">{name}</code>) : "không có"}.
      </p>
    </div>
  );
}

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

      <StoreNotice store={store} readError={readError} />

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
