import type { Locale } from "@/lib/i18n";

/** Vocabulary shared by every product preview, selected by the marketing page locale. */
const productUi = {
  vi: {
    nav: { Today: "Hôm nay", Inbox: "Hộp thư", Chat: "Trò chuyện", Meetings: "Cuộc họp", "My Work": "Việc của tôi", Delegated: "Việc đã giao", Projects: "Dự án", Team: "Nhóm", Reports: "Báo cáo", Knowledge: "Kiến thức" },
    version: "V0.1.0 · NỀN TẢNG", workspace: "KHÔNG GIAN MẪU", ask: "Hỏi Elynto", settings: "Cài đặt",
    greeting: "Chào bạn, hôm nay bạn muốn giao việc gì?",
    intro: "Viết yêu cầu như cách bạn vẫn giao việc. Elynto tạo công việc với người phụ trách rõ ràng.",
    briefing: "Tổng quan hôm nay", sample: "DỮ LIỆU MẪU",
    sampleNote: "Bản xem trước bằng dữ liệu mẫu.",
    overdueBrief: "2 công việc đã quá hạn", overdueHint: "Xử lý các việc này trước khi giao thêm việc mới.",
    dueWeek: "3 công việc đến hạn trong tuần này", overloaded: "Minh đang có 6 công việc chưa hoàn thành",
    finishToday: "Cần xong hôm nay: duyệt đề xuất thiết kế website.",
    upcoming: "Sắp tới", overdue: "Quá hạn", approval: "Chờ duyệt", rework: "Làm lại", completed: "Đã hoàn thành", archived: "Đã lưu trữ",
    work: "Công việc", assignedTo: "Giao cho", assignedBy: "Người giao", created: "Ngày tạo", due: "Thời hạn", priority: "Ưu tiên", status: "Trạng thái", files: "Tệp",
    otherWork: "Công việc khác", you: "Bạn", medium: "Trung bình", assigned: "Đã giao", inProgress: "Đang làm",
    myWorkTable: "Bảng công việc mẫu của tôi", delegatedTable: "Bảng công việc đã giao mẫu",
    rows: ["Chuẩn bị báo cáo tháng", "Duyệt đề xuất thiết kế website", "Hoàn thiện hình ảnh chiến dịch", "Xác nhận lịch ra mắt", "Gửi báo giá cho khách hàng"],
    openWork: "Xem trong Việc của tôi", projectPage: "Trang dự án",
    commandHelp: "Tạo hoặc giao việc bằng lời thường, giống như trên trang Hôm nay.",
    commandContext: "Để thêm việc mới vào dự án này, hãy nói rõ “dự án này” trong yêu cầu.",
    plannerTitle: "Lập kế hoạch dự án với AI", backProjects: "← Quay lại dự án", goalPrompt: "Bạn muốn đạt được điều gì?",
    goalHelp: "Mô tả mục tiêu và những thông tin đã có: thời gian, ngân sách, nhóm hoặc yêu cầu chính. Bạn cũng có thể chỉ nêu mục tiêu; Elynto sẽ đưa ra giả định cho các thông tin còn thiếu để bạn xem lại.",
    generate: "Tạo bản nháp kế hoạch", milestones: "Cột mốc", milestoneTitle: "Đánh dấu những thời điểm quan trọng của dự án.",
    milestoneHelp: "Xác nhận cột mốc thủ công hoặc để cột mốc tự hoàn thành khi các công việc hay giai đoạn liên quan đã xong.",
  },
  en: {
    nav: { Today: "Today", Inbox: "Inbox", Chat: "Chat", Meetings: "Meetings", "My Work": "My Work", Delegated: "Delegated", Projects: "Projects", Team: "Team", Reports: "Reports", Knowledge: "Knowledge" },
    version: "V0.1.0 · FOUNDATION", workspace: "STUDIO DEMO", ask: "Ask Elynto", settings: "Settings",
    greeting: "Hi there, what would you like to assign today?",
    intro: "Write a sentence as you normally would. Elynto creates work with a clear owner.",
    briefing: "Today at a glance", sample: "SAMPLE DATA", sampleNote: "An interface preview with sample data.",
    overdueBrief: "2 work items are overdue", overdueHint: "Deal with these before assigning new work.",
    dueWeek: "3 work items are due this week", overloaded: "Minh has 6 open work items",
    finishToday: "To finish today: review the website proposal.",
    upcoming: "Upcoming", overdue: "Overdue", approval: "Approval", rework: "Rework", completed: "Completed", archived: "Archived",
    work: "Work", assignedTo: "Assigned to", assignedBy: "Assigned by", created: "Created", due: "Due", priority: "Priority", status: "Status", files: "Files",
    otherWork: "Other work", you: "You", medium: "Medium", assigned: "Assigned", inProgress: "In progress",
    myWorkTable: "Sample My Work table", delegatedTable: "Sample delegated work table",
    rows: ["Prepare the monthly report", "Review the website proposal", "Finalise campaign visuals", "Confirm the launch schedule", "Send the client quotation"],
    openWork: "View in My Work", projectPage: "Project page",
    commandHelp: "Create or assign work in your own words - the same command as on Today.",
    commandContext: "New work goes into this project only when you say “this project”.",
    plannerTitle: "Plan a project with AI", backProjects: "← Back to projects", goalPrompt: "What do you want to achieve?",
    goalHelp: "Describe your goal and whatever you already know - for example timing, budget, team or key requirements. You can also give just the goal; Elynto will make assumptions about anything missing, for you to review.",
    generate: "Generate plan", milestones: "Milestones", milestoneTitle: "Mark the moments that define project progress.",
    milestoneHelp: "Milestones can be confirmed manually or achieved automatically when linked work or phases are completed.",
  },
} as const;

export function getProductUi(lang: Locale) {
  return productUi[lang];
}
