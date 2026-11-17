import type { Locale } from "@/lib/i18n";

type Item = { q: string; a: string };
export function getSupportFaq(lang: Locale, existing: (Item & { id: string })[]): (Item & { id: string })[] {
  const extra: Item[] = lang === "vi" ? [
    { q: "Tìm hướng dẫn sử dụng ở đâu?", a: "Trung tâm trợ giúp có hướng dẫn bắt đầu, cách viết yêu cầu rõ ràng và các trang về tính năng. Nếu cần hỗ trợ cho tài khoản cụ thể, gửi email tới support@elynto.io, kèm trang hoặc tính năng và kết quả bạn gặp." },
    { q: "Công việc giao cho người khác xuất hiện ở đâu?", a: "Theo dõi công việc bạn giao cho đồng đội trong Việc đã giao. Việc được giao cho chính bạn nằm trong Việc của tôi. Kiểm tra người phụ trách và thời hạn trên work card sau khi tạo." },
    { q: "Có nên kiểm tra lại kết quả AI không?", a: "Có. AI có thể hiểu nhầm tên, ngày hoặc ý định. Kiểm tra work card, xem lại bản nháp dự án trước khi tạo và đối chiếu bản tóm tắt với cuộc thảo luận gốc." },
    { q: "Vì sao tính năng cuộc gọi hoặc AI khác giữa các workspace?", a: "Khả năng sử dụng có thể phụ thuộc vào cấu hình workspace và dịch vụ được bật. Liên hệ hỗ trợ để xác nhận tính năng áp dụng cho tài khoản của bạn." },
    { q: "Xem điều kiện thanh toán và yêu cầu hủy ở đâu?", a: "Xem thông tin gói, chu kỳ thanh toán, gia hạn và điều kiện dùng thử được trình bày trước khi xác nhận mua. Trang Hủy dịch vụ & hoàn tiền hướng dẫn gửi yêu cầu và xử lý vấn đề thanh toán." },
    { q: "Làm sao yêu cầu truy cập hoặc xóa dữ liệu?", a: "Gửi email tới support@elynto.io, nêu tài khoản liên quan và yêu cầu cụ thể. Có thể cần xác minh danh tính và phối hợp với người quản lý workspace. Hủy gói và yêu cầu xóa dữ liệu là hai thao tác riêng." },
    { q: "Tôi có thể tắt thống kê website không?", a: "Có. Thống kê chỉ hoạt động khi bạn cho phép. Mở Cài đặt quyền riêng tư ở chân trang để thay đổi lựa chọn. Do Not Track và Global Privacy Control được ưu tiên áp dụng." },
  ] : [
    { q: "Where can I find practical help?", a: "The help center links to getting-started guides, clear-request examples and feature pages. For account-specific support, email support@elynto.io with the page or feature involved and what happened." },
    { q: "Where does work assigned to a teammate appear?", a: "Follow work you assign to others in Delegated. Work assigned to you appears in My Work. Check the owner and deadline on the result card after creating work." },
    { q: "Should I check AI results?", a: "Yes. AI can misunderstand names, dates or intent. Check the work card, review project drafts before creating them and verify summaries against the original discussion." },
    { q: "Why can calling or AI features differ between workspaces?", a: "Availability can depend on the workspace configuration and enabled services. Contact support to confirm what applies to your account." },
    { q: "Where do I find payment and cancellation terms?", a: "Review the plan, billing period, renewal and trial conditions presented before confirming a purchase. The Cancellation & refunds page explains how to submit a request or raise a billing issue." },
    { q: "How do I request access to or deletion of my data?", a: "Email support@elynto.io with the account concerned and your request. Identity verification and involvement of the workspace administrator may be needed. Cancelling a plan and requesting data deletion are separate actions." },
    { q: "Can I turn website statistics off?", a: "Yes. Statistics run only after you allow them. Open Privacy settings in the footer to change your choice. Do Not Track and Global Privacy Control take precedence." },
  ];
  return [...existing, ...extra.map((item, index) => ({ ...item, id: `support-${index + 1}` }))];
}
