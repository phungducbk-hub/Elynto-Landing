import type { Dictionary } from "./types";

const minh = { name: "Minh", initials: "M" };
const lan = { name: "Lan", initials: "L" };
const huy = { name: "Huy", initials: "H" };
const me = { name: "Bạn", initials: "B", self: true };

export const vi: Dictionary = {
  meta: {
    title: "Elynto — Quản lý công việc bằng AI",
    description:
      "Mô tả việc cần làm bằng lời thường. Elynto giúp bạn tạo và giao việc, lập kế hoạch dự án với AI và theo dõi tiến độ trong một nơi.",
    ogDescription:
      "Mô tả việc cần làm. Elynto giúp bạn tạo và giao việc, lập kế hoạch dự án với AI và theo dõi tiến độ trong một nơi.",
  },
  a11y: {
    skipToContent: "Bỏ qua và đến nội dung chính",
  },
  nav: {
    benefits: "Lợi ích",
    howItWorks: "Cách hoạt động",
    faq: "Câu hỏi thường gặp",
    login: "Đăng nhập",
    startTrial: "Dùng thử miễn phí",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    mainNav: "Điều hướng chính",
    home: "Elynto — về đầu trang",
    language: "Ngôn ngữ",
  },
  hero: {
    eyebrow: "Elynto — Quản lý công việc bằng AI",
    description:
      "Chỉ cần mô tả việc cần làm. Elynto giúp bạn tạo và giao việc, lập kế hoạch dự án với AI và theo dõi tiến độ — tất cả trong một nơi.",
    primaryCta: "Dùng thử miễn phí",
    secondaryCta: "Xem Elynto hoạt động",
  },
  demo: {
    badge: "Minh họa",
    caption: "Một câu nói. Công việc rõ người, rõ hạn.",
    regionLabel: "Minh họa: từ một câu nói đến công việc",
    srDescription:
      "Minh họa, không phải phiên thao tác trực tiếp với ứng dụng. Người dùng viết: “Giao Minh làm báo cáo, hoàn thành trước thứ sáu.” Elynto tạo công việc “Làm báo cáo”, người phụ trách Minh, hạn hoàn thành Thứ Sáu, trạng thái Cần làm.",
    placeholder: "Bạn cần làm gì?",
    command: "Giao Minh làm báo cáo, hoàn thành trước thứ sáu.",
    send: "Gửi",
    newTask: "Công việc mới",
    processing: "Đang tạo công việc…",
    success: "Đã tạo công việc",
    fields: {
      task: "Công việc",
      assignee: "Người phụ trách",
      due: "Hạn hoàn thành",
      status: "Trạng thái",
    },
    result: {
      task: "Làm báo cáo",
      assignee: minh,
      due: "Thứ Sáu",
      status: "Cần làm",
    },
    controls: {
      play: "Phát minh họa",
      pause: "Tạm dừng minh họa",
      replay: "Xem lại từ đầu",
    },
  },
  benefits: {
    eyebrow: "Lợi ích",
    title: "Tập trung vào công việc, không phải vào công cụ",
    items: [
      {
        title: "Bớt thao tác để bắt đầu",
        body: "Viết điều cần làm như khi nhắn cho đồng nghiệp. Không phải điền từng ô hay học cách dùng phức tạp.",
      },
      {
        title: "Rõ ai làm gì, khi nào xong",
        body: "Mỗi việc đều có người phụ trách, thời hạn và trạng thái. Cả nhóm cùng nhìn một thông tin.",
      },
      {
        title: "Nắm tiến độ trong một nơi",
        body: "Theo dõi việc cá nhân và dự án theo góc nhìn phù hợp: danh sách, Kanban hoặc lịch.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Cách hoạt động",
    title: "Từ điều bạn muốn làm đến công việc rõ ràng",
    intro:
      "Elynto chuyển lời mô tả thành công việc có cấu trúc, giúp bạn lập kế hoạch và theo dõi tất cả trên giao diện trực quan.",
  },
  illustration: "Minh họa",
  command: {
    eyebrow: "Tạo và giao việc",
    title: "Việc cần làm bắt đầu từ một câu nói.",
    body: "Viết như cách bạn vẫn giao việc. Elynto nhận ra việc cần làm, người phụ trách và thời hạn, rồi tạo thành công việc để bạn tiếp tục theo dõi và cập nhật.",
    points: [
      "Công việc được lưu lại, không trôi mất trong tin nhắn.",
      "Bạn luôn có thể xem lại và chỉnh sửa trực tiếp.",
      "Dùng cho việc của riêng bạn hoặc việc giao cho người khác.",
    ],
    tip: "Mẹo: nêu rõ việc gì, ai làm và khi nào xong để kết quả chính xác nhất.",
    examplesLabel: "Chọn ví dụ",
    legend: {
      task: "Công việc",
      assignee: "Người phụ trách",
      due: "Thời hạn",
    },
    resultLabel: "Công việc được tạo",
    savedLabel: "Đã lưu vào danh sách việc",
    newBadge: "Mới",
    examples: [
      {
        id: "report",
        label: "Giao việc",
        segments: [
          "Giao ",
          { field: "assignee", text: "Minh" },
          " ",
          { field: "task", text: "làm báo cáo" },
          ", hoàn thành ",
          { field: "due", text: "trước thứ sáu" },
          ".",
        ],
        task: "Làm báo cáo",
        assignee: minh,
        due: "Thứ Sáu",
      },
      {
        id: "campaign",
        label: "Việc của nhóm",
        segments: [
          { field: "assignee", text: "Lan" },
          " ",
          { field: "task", text: "chuẩn bị nội dung chiến dịch tháng 11" },
          ", hạn ",
          { field: "due", text: "thứ tư tuần sau" },
          ".",
        ],
        task: "Chuẩn bị nội dung chiến dịch tháng 11",
        assignee: lan,
        due: "Thứ Tư tuần sau",
      },
      {
        id: "quote",
        label: "Việc của bạn",
        segments: [
          { field: "assignee", text: "Tôi" },
          " cần ",
          { field: "task", text: "gửi báo giá cho khách hàng" },
          " ",
          { field: "due", text: "trước ngày mai" },
          ".",
        ],
        task: "Gửi báo giá cho khách hàng",
        assignee: me,
        due: "Ngày mai",
      },
    ],
    existing: [
      { title: "Duyệt bài đăng tuần này", assignee: lan, due: "Thứ Năm" },
      { title: "Xác nhận địa điểm sự kiện", assignee: huy, due: "Thứ Hai" },
    ],
  },
  planning: {
    eyebrow: "Lập kế hoạch dự án với AI",
    title: "Từ một mục tiêu đến kế hoạch có thể bắt đầu.",
    body: "Nhập mục tiêu của bạn. AI phác thảo các giai đoạn và công việc cần làm. Bạn xem lại, thêm, bớt và điều chỉnh trước khi tạo dự án.",
    steps: [
      {
        title: "Nêu mục tiêu",
        body: "Ví dụ: “Lập kế hoạch ra mắt website trong 3 tuần.”",
      },
      {
        title: "AI phác thảo kế hoạch",
        body: "Mục tiêu được chia thành các giai đoạn, mỗi giai đoạn có công việc cụ thể.",
      },
      {
        title: "Bạn xem lại và quyết định",
        body: "Chỉnh sửa bản nháp rồi tạo dự án để bắt đầu theo dõi.",
      },
    ],
    note: "AI giúp bạn có bản nháp để bắt đầu. Quyết định cuối cùng vẫn thuộc về bạn.",
    mock: {
      goalLabel: "Mục tiêu",
      goal: "Lập kế hoạch ra mắt website trong 3 tuần",
      draftTitle: "Bản nháp kế hoạch",
      aiBadge: "AI đề xuất",
      summary: "3 giai đoạn · 9 công việc",
      phaseLabel: "Giai đoạn",
      phases: [
        {
          name: "Chuẩn bị",
          tasks: ["Chốt mục tiêu và phạm vi", "Thu thập nội dung, hình ảnh", "Lên sơ đồ các trang"],
        },
        {
          name: "Thiết kế & xây dựng",
          tasks: ["Thiết kế giao diện", "Xây dựng các trang", "Hoàn thiện nội dung"],
        },
        {
          name: "Kiểm tra & ra mắt",
          tasks: ["Kiểm tra trên điện thoại và máy tính", "Sửa lỗi, rà soát lần cuối", "Ra mắt website"],
        },
      ],
      reviewHint: "Xem lại và chỉnh sửa trước khi tạo dự án",
      edit: "Chỉnh sửa",
      create: "Tạo dự án",
    },
  },
  today: {
    eyebrow: "Mỗi ngày",
    title: "Mở Elynto. Biết việc nào cần bạn.",
    body: "Việc quá hạn, đến hạn hôm nay và sắp đến hạn được gom về một chỗ, cùng những việc bạn đã đánh dấu quan trọng. Không cần lục lại tin nhắn hay tự tổng hợp danh sách.",
    points: [
      "Thấy ngay việc nào đang trễ.",
      "Biết hôm nay cần hoàn thành gì.",
      "Chuẩn bị trước cho những việc sắp đến hạn.",
    ],
    mock: {
      title: "Hôm nay",
      subtitle: "Việc của tôi",
      importantLabel: "Quan trọng",
      groups: [
        {
          tone: "overdue",
          label: "Quá hạn",
          items: [{ title: "Gửi hóa đơn tháng 9 cho khách", project: "Khách hàng", due: "Hôm qua" }],
        },
        {
          tone: "today",
          label: "Đến hạn hôm nay",
          items: [
            { title: "Duyệt bài đăng tuần này", project: "Chiến dịch nội dung", due: "Hôm nay", important: true },
            { title: "Gọi xác nhận địa điểm sự kiện", project: "Sự kiện ra mắt", due: "Hôm nay" },
          ],
        },
        {
          tone: "upcoming",
          label: "Sắp đến hạn",
          items: [
            { title: "Hoàn thiện sơ đồ trang", project: "Ra mắt website", due: "Thứ Năm" },
            { title: "Tổng hợp số liệu tháng 9", project: "Báo cáo", due: "Thứ Sáu", important: true },
          ],
        },
      ],
    },
  },
  views: {
    eyebrow: "Nhiều cách xem",
    title: "Từ việc hôm nay đến tiến độ cả dự án.",
    body: "Cùng một công việc, nhiều cách xem. Danh sách để rà soát nhanh, Kanban để nắm trạng thái, lịch để xem theo ngày đến hạn.",
    projectBody:
      "Trong dự án, Timeline cho thấy tổng quan các giai đoạn, còn Gantt giúp lên kế hoạch chi tiết với các mốc quan trọng và liên kết giữa công việc.",
    tabsLabel: "Chọn cách xem công việc",
    projectLabel: "Trong dự án",
    tabs: {
      list: { label: "Danh sách", description: "Rà soát nhanh mọi việc, kèm hạn và trạng thái." },
      kanban: { label: "Kanban", description: "Nắm trạng thái công việc theo từng cột." },
      calendar: { label: "Lịch", description: "Xem công việc theo ngày đến hạn." },
      timeline: { label: "Timeline", description: "Tổng quan các giai đoạn của dự án." },
      gantt: { label: "Gantt", description: "Kế hoạch chi tiết với mốc quan trọng và liên kết giữa công việc." },
    },
    statuses: { todo: "Cần làm", inProgress: "Đang làm", done: "Đã xong" },
    listHeaders: { task: "Công việc", project: "Dự án", due: "Hạn", status: "Trạng thái" },
    weekdays: ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"],
    todayLabel: "Hôm nay",
    importantLabel: "Quan trọng",
    myWorkTitle: "Việc của tôi",
    tasks: [
      { title: "Gửi báo giá cho khách hàng mới", project: "Khách hàng", due: "Thứ Hai", day: 0, status: "done" },
      { title: "Duyệt bài đăng tuần này", project: "Chiến dịch nội dung", due: "Thứ Ba", day: 1, status: "inProgress", important: true },
      { title: "Gọi xác nhận địa điểm sự kiện", project: "Sự kiện ra mắt", due: "Thứ Ba", day: 1, status: "todo" },
      { title: "Hoàn thiện sơ đồ trang", project: "Ra mắt website", due: "Thứ Năm", day: 3, status: "inProgress" },
      { title: "Tổng hợp số liệu tháng 9", project: "Báo cáo", due: "Thứ Sáu", day: 4, status: "todo", important: true },
      { title: "Chốt danh sách khách mời", project: "Sự kiện ra mắt", due: "Thứ Sáu", day: 4, status: "todo" },
    ],
    project: {
      name: "Ra mắt website",
      weeks: ["Tuần 1", "Tuần 2", "Tuần 3"],
      phases: [
        { name: "Chuẩn bị", start: 0, end: 5 },
        { name: "Thiết kế & xây dựng", start: 5, end: 11 },
        { name: "Kiểm tra & ra mắt", start: 11, end: 15 },
      ],
      tasks: [
        { name: "Chốt mục tiêu và phạm vi", start: 0, end: 2 },
        { name: "Thu thập nội dung", start: 2, end: 5, after: 0 },
        { name: "Lên sơ đồ các trang", start: 2, end: 5, after: 0 },
        { name: "Thiết kế giao diện", start: 5, end: 8, after: 2 },
        { name: "Xây dựng các trang", start: 8, end: 11, after: 3 },
        { name: "Kiểm tra và sửa lỗi", start: 11, end: 14, after: 4 },
      ],
      milestones: [
        { name: "Duyệt thiết kế", at: 8 },
        { name: "Ra mắt", at: 15 },
      ],
      milestoneLabel: "Mốc quan trọng",
      dependencyLabel: "Liên kết giữa công việc",
    },
  },
  audience: {
    eyebrow: "Dành cho ai",
    title: "Phù hợp với cách bạn đang làm việc",
    examplesLabel: "Ví dụ",
    items: [
      {
        title: "Làm việc độc lập",
        who: "Freelancer, solopreneur",
        body: "Giữ việc cá nhân và dự án của từng khách hàng trong cùng một nơi.",
        examples: ["Gửi báo giá cho khách", "Bàn giao bản thiết kế"],
      },
      {
        title: "Nhóm nhỏ",
        who: "Người quản lý nhóm",
        body: "Ai cũng rõ mình phụ trách việc gì, hạn khi nào và đang đến đâu.",
        examples: ["Chuẩn bị chiến dịch nội dung", "Làm báo cáo tuần"],
      },
      {
        title: "Chủ doanh nghiệp nhỏ",
        who: "Điều hành nhiều đầu việc",
        body: "Nhìn nhanh tình trạng những việc đang triển khai mà không phải hỏi từng người.",
        examples: ["Tổ chức sự kiện", "Ra mắt website mới"],
      },
    ],
  },
  faq: {
    eyebrow: "Hỏi đáp",
    title: "Câu hỏi thường gặp",
    intro: "Những điều bạn có thể muốn biết trước khi bắt đầu.",
    items: [
      {
        id: "what",
        q: "Elynto là gì?",
        a: "Elynto là hệ thống quản lý công việc bằng AI. Bạn mô tả việc cần làm bằng lời thường, Elynto giúp biến nó thành công việc có người phụ trách, thời hạn và trạng thái. Bạn cũng có thể lập kế hoạch dự án với AI và theo dõi tiến độ trong một nơi.",
      },
      {
        id: "solo",
        q: "Tôi có thể dùng Elynto một mình không?",
        a: "Có. Bạn có thể dùng Elynto để quản lý việc cá nhân và dự án của riêng mình. Khi làm việc cùng người khác, bạn có thể giao việc cho từng người để ai cũng rõ phần việc của mình.",
      },
      {
        id: "prompt",
        q: "Tôi có cần biết viết prompt không?",
        a: "Không. Bạn chỉ cần viết như khi nhắn việc cho đồng nghiệp: việc gì, ai làm, khi nào xong. Sau khi công việc được tạo, bạn luôn có thể xem lại và chỉnh sửa trực tiếp trên giao diện.",
      },
      {
        id: "language",
        q: "Elynto hỗ trợ tiếng Việt và tiếng Anh như thế nào?",
        a: "Trang giới thiệu này có đầy đủ tiếng Việt và tiếng Anh. Trong ứng dụng, bạn có thể mô tả công việc bằng tiếng Việt hoặc tiếng Anh. Elynto đang trong giai đoạn beta, nên một số phần của ứng dụng có thể chưa có đủ hai ngôn ngữ.",
      },
      {
        id: "start",
        q: "Tôi bắt đầu dùng thử ở đâu?",
        a: "Nhấn “Dùng thử miễn phí” trên trang này để mở Elynto tại beta.elynto.io và bắt đầu. Nếu đã có tài khoản, hãy chọn “Đăng nhập”.",
      },
    ],
  },
  finalCta: {
    title: "Bắt đầu với một việc bạn cần hoàn thành.",
    body: "Đưa công việc của bạn vào Elynto và bắt đầu quản lý trong một nơi.",
    cta: "Dùng thử miễn phí",
    loginPrompt: "Đã có tài khoản?",
    login: "Đăng nhập",
  },
  footer: {
    tagline: "Quản lý công việc bằng AI",
    navLabel: "Liên kết chân trang",
    rights: "Elynto.",
    languageLabel: "Ngôn ngữ",
  },
};
