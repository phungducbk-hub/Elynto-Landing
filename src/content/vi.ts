import type { Dictionary } from "./types";

const minh = { name: "Minh Trần", initials: "M" };
const lan = { name: "Lan Phạm", initials: "L" };
const huy = { name: "Huy Lê", initials: "H" };
const me = { name: "Bạn", initials: "B", self: true };

export const vi: Dictionary = {
  meta: {
    title: "Elynto — Quản lý công việc bằng AI",
    description:
      "Rõ việc cần làm, rõ người phụ trách, rõ tiến độ. Viết việc cần làm bằng lời thường; Elynto tạo và giao việc, lập kế hoạch dự án với AI và giúp bạn theo dõi mọi thứ trong một nơi.",
    ogDescription: "Rõ việc cần làm, rõ người phụ trách, rõ tiến độ.",
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
    home: "Elynto, về đầu trang",
    language: "Ngôn ngữ",
  },
  hero: {
    label: "Quản lý công việc bằng AI",
    promise: "Rõ việc cần làm, rõ người phụ trách, rõ tiến độ.",
    description:
      "Viết việc cần làm như khi nhắn cho đồng nghiệp. Elynto tạo và giao việc, giúp bạn lập kế hoạch dự án với AI và theo dõi mọi thứ trong một nơi.",
    primaryCta: "Dùng thử miễn phí",
    secondaryCta: "Xem Elynto hoạt động",
  },
  demo: {
    label: "Minh họa",
    caption: "Một câu nói. Công việc rõ người, rõ hạn.",
    regionLabel: "Minh họa: từ một câu nói đến công việc",
    srDescription:
      "Minh họa, không phải phiên thao tác trực tiếp với ứng dụng. Người dùng viết: “Giao Minh làm báo giá, hoàn thành trước thứ Sáu.” Elynto tạo công việc “Làm báo giá”, giao cho Minh Trần, hạn Thứ Sáu 09/10 lúc 23:59, mức ưu tiên Trung bình.",
    sentence: [
      "Giao ",
      { field: "assignee", text: "Minh" },
      " ",
      { field: "task", text: "làm báo giá" },
      ", hoàn thành ",
      { field: "due", text: "trước thứ Sáu" },
      ".",
    ],
    fields: {
      assignee: "Giao cho",
      task: "Công việc",
      due: "Hạn",
      priority: "Ưu tiên",
    },
    result: {
      assignee: minh,
      task: "Làm báo giá",
      due: "Thứ Sáu 09/10, 23:59",
      priority: "Trung bình",
    },
    status: {
      idle: "Công việc mới",
      reading: "Elynto đang đọc yêu cầu…",
      created: "Đã tạo công việc",
    },
    open: "Mở công việc",
    controls: {
      pause: "Tạm dừng minh họa",
      play: "Tiếp tục minh họa",
      replay: "Xem lại từ đầu",
    },
  },
  problems: {
    title: "Giao việc xong, vẫn phải đi hỏi tiến độ?",
    intro:
      "Nếu những tình huống dưới đây quen thuộc, Elynto giúp bạn bớt quên việc, bớt hỏi lại và an tâm hơn khi kết thúc ngày.",
    beforeLabel: "Thường gặp",
    afterLabel: "Với Elynto",
    rows: [
      {
        before: "Bạn giao việc trong nhóm chat, nhưng không chắc người nhận đã hiểu, đã nhận việc và có nhớ hạn hay chưa.",
        afterTitle: "Giao bằng một câu, rõ ai đã nhận.",
        afterBody:
          "Mỗi việc có người phụ trách, hạn và mức ưu tiên. Người nhận chuyển việc sang Đã nhận, bạn thấy ngay mà không cần hỏi.",
      },
      {
        before: "Khách hỏi tiến độ, bạn lại phải lục từng đoạn chat và bảng tính để tổng hợp.",
        afterTitle: "Tiến độ nằm sẵn ở một nơi.",
        afterBody:
          "Trang dự án cho thấy phần trăm hoàn thành, việc quá hạn và số ngày còn lại, đủ rõ để trả lời khách hoặc chuẩn bị cuộc họp.",
      },
      {
        before: "Việc chậm chỉ lộ ra sát ngày giao, và bạn trở thành người nhắc việc cho cả nhóm.",
        afterTitle: "Thấy việc chậm sớm hơn.",
        afterBody: "Việc quá hạn luôn được đánh dấu, tình trạng dự án hiện ngay đầu trang để bạn xử lý trước khi quá muộn.",
      },
      {
        before: "Nhiều dự án cùng lúc, sáng nay vẫn không chắc nên bắt đầu từ việc nào.",
        afterTitle: "Mở Elynto, biết việc nào làm trước.",
        afterBody: "Hôm nay gom việc quá hạn, đến hạn và việc ưu tiên cao từ mọi dự án vào một danh sách.",
      },
    ],
  },
  howItWorks: {
    title: "Từ một câu nói đến công việc chạy đúng hạn",
    intro:
      "Elynto chuyển lời mô tả thành công việc có cấu trúc, giúp bạn lập kế hoạch dự án và theo dõi tất cả trên giao diện trực quan.",
  },
  illustration: "Minh họa dựa trên giao diện Elynto",
  app: {
    workspace: "Công ty Mẫu",
    nav: {
      today: "Hôm nay",
      inbox: "Hộp thư",
      myWork: "Việc của tôi",
      delegated: "Việc đã giao",
      projects: "Dự án",
      team: "Nhóm",
      reports: "Báo cáo",
      knowledge: "Kiến thức",
    },
    statuses: {
      draft: "Nháp",
      assigned: "Đã giao",
      accepted: "Đã nhận",
      inProgress: "Đang làm",
      submitted: "Đã nộp",
      rework: "Làm lại",
      approved: "Đã duyệt",
      completed: "Hoàn thành",
    },
    priorities: { high: "Cao", medium: "Trung bình" },
    datePattern: "{dd}/10",
    weekdaysShort: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    monthTitle: "Tháng 10",
    todayLabel: "Hôm nay",
    overdueLabel: "Quá hạn",
    barLegend: { done: "Đã xong", active: "Đang thực hiện", notStarted: "Chưa bắt đầu" },
  },
  delegate: {
    name: "Giao và theo dõi việc.",
    title: "Giao bằng một câu. Biết luôn việc đang ở đâu.",
    body: "Viết như cách bạn vẫn giao việc. Elynto nhận ra người phụ trách, việc cần làm và thời hạn, rồi tạo việc ngay. Mỗi việc đi qua các trạng thái rõ ràng từ lúc giao đến lúc duyệt, và mục Việc đã giao gom mọi việc bạn đã giao vào một chỗ.",
    tip: "Nêu rõ việc gì, ai làm và khi nào xong để kết quả chính xác nhất.",
    view: {
      title: "Việc đã giao",
      count: "5 việc",
      flowLabel: "Vòng đời của một việc",
      flow: ["assigned", "accepted", "inProgress", "submitted", "approved"],
      reworkNote: "Chưa đạt? Chuyển sang Làm lại.",
      columns: { task: "Công việc", assignee: "Người nhận", due: "Hạn", status: "Trạng thái" },
      rows: [
        { title: "Làm báo giá", assignee: minh, due: 9, status: "submitted" },
        { title: "Viết bài giới thiệu dịch vụ", assignee: lan, due: 10, status: "inProgress" },
        { title: "Cập nhật bảng giá trên website", assignee: huy, due: 7, status: "inProgress", overdue: true },
        { title: "Chuẩn bị hình ảnh sản phẩm", assignee: huy, due: 12, status: "accepted" },
        { title: "Lên lịch đăng bài tháng 11", assignee: lan, due: 15, status: "assigned" },
      ],
    },
  },
  planning: {
    name: "Lập kế hoạch dự án với AI.",
    title: "Từ một mục tiêu đến kế hoạch có thể bắt đầu.",
    body: "Mô tả mục tiêu của bạn. AI phác thảo các giai đoạn, công việc và thời gian cho từng việc. Bạn xem lại, thêm, bớt và điều chỉnh trước khi tạo dự án.",
    steps: [
      {
        title: "Nêu mục tiêu",
        body: "Ví dụ: “Thiết kế website giới thiệu công ty trong 3 tuần.”",
      },
      {
        title: "AI phác thảo kế hoạch",
        body: "Mục tiêu được chia thành vài giai đoạn, mỗi giai đoạn có công việc cụ thể và ngày bắt đầu, ngày hạn.",
      },
      {
        title: "Bạn xem lại và quyết định",
        body: "Chỉnh sửa bản nháp rồi tạo dự án, bắt đầu từ việc đầu tiên.",
      },
    ],
    note: "AI giúp bạn có bản nháp để bắt đầu. Quyết định cuối cùng vẫn thuộc về bạn.",
    mock: {
      goalLabel: "Mục tiêu",
      goal: "Thiết kế website giới thiệu công ty trong 3 tuần",
      draftTitle: "Bản nháp do AI đề xuất",
      summary: "4 giai đoạn, 12 công việc",
      phaseLabel: "Giai đoạn",
      reviewHint: "Xem lại và chỉnh sửa trước khi tạo dự án",
      edit: "Chỉnh sửa",
      create: "Tạo dự án",
    },
  },
  project: {
    name: "Theo dõi dự án.",
    title: "Nắm tiến độ mà không phải hỏi từng người.",
    body: "Mỗi dự án có một trang tổng quan: phần trăm hoàn thành, việc quá hạn, số ngày còn lại và tình trạng chung. Cần xem kỹ hơn, chuyển sang danh sách theo giai đoạn, lịch tháng hoặc Gantt.",
    points: [
      "Kéo thả thanh Gantt để dời lịch hoặc đổi ngày hạn.",
      "Đặt mốc quan trọng; mốc có thể tự hoàn thành khi các việc liên quan xong.",
      "Khi cần, phân tích tình trạng dự án với AI.",
    ],
    data: {
      back: "Dự án",
      name: "Thiết kế website",
      tags: ["Chiến lược", "Đang chạy"],
      privacy: "Riêng tư",
      description:
        "Hoàn thiện thiết kế website trong 3 tuần, từ nghiên cứu, wireframe đến giao diện chi tiết và hệ thống thiết kế, sẵn sàng bàn giao cho giai đoạn phát triển.",
      stats: [
        { label: "Tiến độ", value: "25%" },
        { label: "Công việc", value: "12 việc" },
        { label: "Quá hạn", value: "Không có" },
        { label: "Lịch trình", value: "Còn 16 ngày" },
        { label: "Thời gian", value: "05/10 – 25/10" },
      ],
      progress: 25,
      healthLabel: "Tình trạng dự án",
      health: "Đúng tiến độ",
      healthNote: "Không có gì cần xử lý lúc này.",
      analyse: "Phân tích với AI",
      viewsLabel: "Cách xem công việc của dự án",
      views: { list: "Danh sách", calendar: "Lịch", gantt: "Gantt" },
      dragHint: "Kéo thanh để dời lịch, kéo mép để đổi ngày bắt đầu hoặc ngày hạn.",
      columns: {
        task: "Công việc",
        assignee: "Người phụ trách",
        start: "Bắt đầu",
        due: "Hạn",
        priority: "Ưu tiên",
        status: "Trạng thái",
      },
      phases: [
        {
          name: "Nghiên cứu và lên ý tưởng",
          tasks: [
            { title: "Thu thập yêu cầu và mục tiêu website", assignee: me, start: 5, due: 7, priority: "high", status: "completed" },
            { title: "Nghiên cứu đối thủ và xu hướng thiết kế", assignee: lan, start: 6, due: 8, priority: "medium", status: "completed" },
            { title: "Xây dựng moodboard và định hướng phong cách", assignee: lan, start: 8, due: 9, priority: "medium", status: "submitted" },
          ],
        },
        {
          name: "Sơ đồ cấu trúc và wireframe",
          tasks: [
            { title: "Vẽ sơ đồ cấu trúc trang", assignee: minh, start: 9, due: 10, priority: "high", status: "completed" },
            { title: "Phác thảo wireframe trang chủ", assignee: minh, start: 10, due: 12, priority: "high", status: "accepted" },
            { title: "Phác thảo wireframe các trang con", assignee: huy, start: 12, due: 14, priority: "medium", status: "assigned" },
          ],
        },
        {
          name: "Thiết kế giao diện chi tiết",
          tasks: [
            { title: "Thiết kế giao diện trang chủ", assignee: me, start: 14, due: 17, priority: "high", status: "assigned" },
            { title: "Thiết kế giao diện các trang con", assignee: lan, start: 17, due: 20, priority: "medium", status: "assigned" },
            { title: "Thiết kế phiên bản responsive", assignee: minh, start: 19, due: 22, priority: "medium", status: "assigned" },
          ],
        },
        {
          name: "Hệ thống thiết kế và bàn giao",
          tasks: [
            { title: "Xây dựng hệ thống thiết kế", assignee: huy, start: 20, due: 23, priority: "medium", status: "draft" },
            { title: "Tạo prototype tương tác", assignee: minh, start: 22, due: 23, priority: "medium", status: "draft" },
            { title: "Rà soát cuối và bàn giao", assignee: me, start: 24, due: 25, priority: "high", status: "draft" },
          ],
        },
      ],
    },
  },
  today: {
    name: "Hôm nay.",
    title: "Nhiều dự án cùng lúc? Biết việc nào làm trước.",
    body: "Hôm nay gom việc quá hạn, đến hạn và sắp đến hạn từ mọi dự án, kèm mức ưu tiên. Không cần lục lại tin nhắn hay tự tổng hợp danh sách mỗi sáng.",
    points: [
      "Thấy ngay việc nào đang trễ.",
      "Biết hôm nay cần hoàn thành gì.",
      "Cuối ngày rõ việc nào đã xong, việc nào còn lại.",
    ],
    mock: {
      groups: [
        {
          tone: "overdue",
          label: "Quá hạn",
          items: [{ title: "Gửi bản phác thảo logo cho khách", project: "Bộ nhận diện thương hiệu", due: "Hôm qua", priority: "high" }],
        },
        {
          tone: "today",
          label: "Đến hạn hôm nay",
          items: [
            { title: "Duyệt nội dung bài đăng tuần này", project: "Chiến dịch tháng 11", due: "Hôm nay", priority: "high" },
            { title: "Gọi xác nhận lịch chụp ảnh", project: "Website giới thiệu", due: "Hôm nay", priority: "medium" },
          ],
        },
        {
          tone: "upcoming",
          label: "Sắp đến hạn",
          items: [
            { title: "Hoàn thiện wireframe trang chủ", project: "Website giới thiệu", due: "Thứ Hai", priority: "medium" },
            { title: "Gửi hóa đơn tháng 10", project: "Việc cá nhân", due: "Thứ Ba", priority: "medium" },
          ],
        },
      ],
    },
  },
  audience: {
    title: "Dành cho người vừa điều hành, vừa trực tiếp làm",
    items: [
      {
        title: "Chủ agency, nhóm dịch vụ nhỏ",
        question: "Vì sao giao việc rồi vẫn phải hỏi tiến độ?",
        body: "Nhóm marketing, nội dung, thiết kế hay tư vấn với nhiều dự án khách hàng: giao việc rõ, theo dõi ở một nơi, trả lời khách tự tin hơn.",
        example: "Giao Lan viết bài giới thiệu dịch vụ, hạn thứ Tư.",
      },
      {
        title: "Freelancer nhiều dự án",
        question: "Nhiều dự án cùng lúc, sáng nay nên làm gì?",
        body: "Dùng một mình ngay, không cần tạo nhóm. Ghi việc bằng một câu, theo dõi cả việc lẻ lẫn việc của từng dự án khách hàng.",
        example: "Gửi bản thiết kế logo cho khách trước thứ Năm.",
      },
      {
        title: "Chủ doanh nghiệp nhỏ",
        question: "Làm sao công việc vẫn chạy khi mình không có mặt?",
        body: "Trách nhiệm và tiến độ rõ ràng. Xem tổng quan trước, mở chi tiết khi cần, phát hiện sớm nơi cần hỗ trợ.",
        example: "Lập kế hoạch tổ chức sự kiện ra mắt trong 2 tuần.",
      },
    ],
  },
  faq: {
    title: "Câu hỏi thường gặp",
    intro: "Những điều bạn có thể muốn biết trước khi bắt đầu.",
    items: [
      {
        id: "what",
        q: "Elynto là gì?",
        a: "Elynto là hệ thống quản lý công việc bằng AI. Bạn mô tả việc cần làm bằng lời thường, Elynto tạo thành công việc có người phụ trách, hạn và mức ưu tiên. Bạn cũng có thể lập kế hoạch dự án với AI và theo dõi tiến độ trong một nơi.",
      },
      {
        id: "mistake",
        q: "Nếu AI hiểu sai tên người hoặc thời hạn thì sao?",
        a: "Sau mỗi câu, Elynto hiển thị ngay tên việc, người phụ trách, hạn và mức ưu tiên vừa tạo. Nếu có gì chưa đúng, bạn mở công việc và sửa trực tiếp. Viết rõ việc gì, ai làm, khi nào xong sẽ giúp kết quả chính xác hơn.",
      },
      {
        id: "solo",
        q: "Tôi có thể dùng Elynto một mình không?",
        a: "Có. Bạn có thể bắt đầu một mình ngay, không cần tạo nhóm hay mời ai. Khi làm cùng người khác, bạn giao việc cho từng người và theo dõi ở mục Việc đã giao.",
      },
      {
        id: "prompt",
        q: "Tôi có cần biết viết prompt không?",
        a: "Không. Bạn chỉ cần viết như khi nhắn việc cho đồng nghiệp: việc gì, ai làm, khi nào xong.",
      },
      {
        id: "language",
        q: "Elynto hỗ trợ tiếng Việt và tiếng Anh như thế nào?",
        a: "Bạn có thể viết yêu cầu bằng tiếng Việt hoặc tiếng Anh. Trang giới thiệu này có đủ hai ngôn ngữ. Trong giai đoạn beta, phần lớn giao diện ứng dụng đang hiển thị bằng tiếng Anh.",
      },
      {
        id: "start",
        q: "Tôi bắt đầu dùng thử ở đâu?",
        a: "Nhấn “Dùng thử miễn phí” trên trang này để mở Elynto tại beta.elynto.io. Cách bắt đầu dễ nhất là đưa một dự án đang chạy vào: giao vài việc, để mọi người cập nhật, rồi xem tiến độ ở một nơi.",
      },
    ],
  },
  finalCta: {
    title: "Bắt đầu với một việc bạn cần hoàn thành.",
    body: "Đưa một dự án đang chạy vào Elynto: giao vài việc, để mọi người cập nhật, rồi xem tiến độ mà không cần hỏi qua chat.",
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
