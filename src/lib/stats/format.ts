import type { BreakdownDimension, Granularity } from "./aggregate";

const numberFormat = new Intl.NumberFormat("vi-VN");
const percentFormat = new Intl.NumberFormat("vi-VN", { style: "percent", maximumFractionDigits: 1 });
const decimalFormat = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 });
const regionNames = new Intl.DisplayNames(["vi"], { type: "region" });

export const formatNumber = (value: number) => numberFormat.format(value);
export const formatPercent = (value: number) => percentFormat.format(value);
export const formatDecimal = (value: number) => decimalFormat.format(value);

/** Period key → label: 04/10/2026, 10/2026, 2026. */
export function periodLabel(key: string, granularity: Granularity, short = false) {
  if (granularity === "year") return key;
  const [y, m, d] = key.split("-");
  if (granularity === "month") return short ? `T${Number(m)}/${y.slice(2)}` : `Tháng ${Number(m)}/${y}`;
  return short ? `${d}/${m}` : `${d}/${m}/${y}`;
}

export function dayLabel(day: string) {
  const [y, m, d] = day.split("-");
  return `${d}/${m}/${y}`;
}

const deviceNames: Record<string, string> = { mobile: "Điện thoại", tablet: "Máy tính bảng", desktop: "Máy tính" };
const langNames: Record<string, string> = { vi: "Tiếng Việt", en: "English" };

/** Readable label for a breakdown value; empty values get a meaningful name. */
export function dimensionLabel(dimension: BreakdownDimension, value: string) {
  switch (dimension) {
    case "device":
      return deviceNames[value] ?? "Không rõ";
    case "lang":
      return langNames[value] ?? "Không rõ";
    case "country":
      if (!value) return "Không rõ";
      try {
        return regionNames.of(value) ?? value;
      } catch {
        return value;
      }
    case "referrer":
      return value || "Trực tiếp / không rõ";
    case "utmSource":
    case "utmCampaign":
      return value || "(không có)";
    default:
      return value || "Không rõ";
  }
}

const locationNames: Record<string, string> = {
  hero: "Đầu trang (hero)",
  header: "Thanh menu",
  mobile_menu: "Menu trên điện thoại",
  final_cta: "Khối cuối trang",
  footer: "Chân trang",
  subpage: "Trang con",
};

export function ctaLocationLabel(location: string) {
  return locationNames[location] ?? (location || "Khác");
}
