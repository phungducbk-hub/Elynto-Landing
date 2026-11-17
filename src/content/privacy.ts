import type { Locale } from "@/lib/i18n";

const en = {
  settings: "Privacy settings",
  title: "Your privacy choices",
  description: "Choose how this website uses your browser. You can change your choice here at any time.",
  essential: "Essential preferences",
  essentialBody: "Remember your language and privacy choice so the website works as expected.",
  alwaysOn: "Always on",
  statistics: "Optional statistics",
  statisticsBody: "Help us understand visits and improve the website. Statistics use random browser and visit IDs; they stay off until you allow them.",
  noticeTitle: "A choice about website statistics",
  noticeBody: "We use essential preferences for language and privacy. Optional statistics help improve the website and only run with your permission.",
  deny: "Essential only",
  allow: "Allow statistics",
  close: "Close privacy settings",
  policy: "Read the cookie policy",
  language: "Saved language",
  languageBody: "Reset your language choice to use the website’s automatic selection on a future visit.",
};
const vi: typeof en = {
  settings: "Cài đặt quyền riêng tư",
  title: "Lựa chọn quyền riêng tư",
  description: "Chọn cách website sử dụng trình duyệt của bạn. Bạn có thể thay đổi lựa chọn tại đây bất cứ lúc nào.",
  essential: "Tùy chọn thiết yếu",
  essentialBody: "Lưu ngôn ngữ và lựa chọn quyền riêng tư để website hoạt động như bạn mong đợi.",
  alwaysOn: "Luôn bật",
  statistics: "Thống kê tùy chọn",
  statisticsBody: "Giúp chúng tôi hiểu lượt truy cập và cải thiện website. Thống kê sử dụng mã trình duyệt và lượt truy cập ngẫu nhiên, chỉ hoạt động khi bạn cho phép.",
  noticeTitle: "Lựa chọn về thống kê website",
  noticeBody: "Website lưu tùy chọn thiết yếu về ngôn ngữ và quyền riêng tư. Thống kê tùy chọn giúp cải thiện website và chỉ hoạt động khi bạn đồng ý.",
  deny: "Chỉ dùng thiết yếu",
  allow: "Cho phép thống kê",
  close: "Đóng cài đặt quyền riêng tư",
  policy: "Đọc chính sách cookie",
  language: "Ngôn ngữ đã lưu",
  languageBody: "Xóa lựa chọn ngôn ngữ để website tự chọn lại trong lần truy cập sau.",
};
export type PrivacyCopy = typeof en;
export function getPrivacyCopy(lang: Locale): PrivacyCopy { return lang === "vi" ? vi : en; }
