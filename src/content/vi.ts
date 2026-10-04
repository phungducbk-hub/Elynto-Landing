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
      "Minh họa, không phải phiên thao tác trực tiếp với ứng dụng. Người dùng viết: “Giao Minh làm báo cáo, hoàn thành trước thứ sáu.” Elynto tạo công việc “Làm báo cáo”, người phụ trách Minh, hạn hoàn thành Thứ Sáu, trạng thái Đã giao.",
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
      status: "Đã giao",
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
        body: "Theo dõi việc cá nhân và dự án theo góc nhìn phù hợp: danh sách, lịch hoặc Gantt.",
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
    title: "Từ một mục tiêu đến kế hoạch chỉ trong 10 giây.",
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
    eyebrow: "Theo dõi dự án",
    title: "Từ việc hôm nay đến tiến độ cả dự án.",
    body: "Mỗi dự án có trang tổng quan: phần trăm hoàn thành, việc quá hạn, số ngày còn lại và tình trạng chung. Cần xem kỹ hơn, chuyển sang danh sách theo giai đoạn, lịch tháng hoặc Gantt.",
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
  delegate: {
    eyebrow: "Theo dõi việc đã giao",
    title: "Giao rồi, biết luôn việc đang ở đâu.",
    body: "Mỗi việc đi qua các trạng thái rõ ràng, từ lúc giao đến lúc duyệt. Mục Việc đã giao gom mọi việc bạn đã giao cho người khác vào một chỗ, kèm người nhận, hạn và trạng thái.",
    points: [
      "Thấy ngay ai đã nhận việc, ai đang làm và việc nào đã nộp.",
      "Việc quá hạn được đánh dấu rõ ràng.",
      "Chưa đạt? Chuyển việc sang Làm lại.",
    ],
    view: {
      title: "Việc đã giao",
      count: "5 việc",
      flowLabel: "Vòng đời của một việc",
      flow: ["assigned", "accepted", "inProgress", "submitted", "approved"],
      reworkNote: "Chưa đạt? Chuyển sang Làm lại.",
      columns: { task: "Công việc", assignee: "Người nhận", due: "Hạn", status: "Trạng thái" },
      rows: [
        { title: "Làm báo cáo", assignee: minh, due: 9, status: "submitted" },
        { title: "Viết bài giới thiệu dịch vụ", assignee: lan, due: 10, status: "inProgress" },
        { title: "Cập nhật bảng giá trên website", assignee: huy, due: 7, status: "inProgress", overdue: true },
        { title: "Chuẩn bị hình ảnh sản phẩm", assignee: huy, due: 12, status: "accepted" },
        { title: "Lên lịch đăng bài tháng 11", assignee: lan, due: 15, status: "assigned" },
      ],
    },
  },
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
  voices: {
    eyebrow: "Nghe có quen không?",
    title: "Những lúc công việc bắt đầu rối",
    intro:
      "Giao việc qua tin nhắn, theo dõi bằng trí nhớ, hỏi tiến độ từng người. Elynto được làm cho đúng những khoảnh khắc này.",
    note: "Tình huống tiêu biểu tổng hợp từ nghiên cứu về cách nhóm nhỏ và freelancer làm việc, không phải lời của một khách hàng cụ thể.",
    regionLabel: "Những tình huống công việc thường gặp",
    pause: "Tạm dừng chuyển động",
    play: "Tiếp tục chuyển động",
    personas: {
      agency: "Chủ nhóm dịch vụ",
      freelancer: "Freelancer nhiều dự án",
      lead: "Trưởng nhóm",
      owner: "Chủ doanh nghiệp nhỏ",
      member: "Thành viên nhóm",
    },
    // Order matters: the wall slices these into three columns of three, so each column mixes roles.
    items: [
      {
        persona: "agency",
        moment: "Ngay sau khi giao việc",
        quote: "Giao xong rồi mà vẫn không chắc bạn ấy hiểu đúng chưa, đã nhận chưa, có nhớ hạn không.",
      },
      {
        persona: "freelancer",
        moment: "Lúc bắt đầu ngày",
        quote: "Biết là mình bận, nhưng sáng ra vẫn không chắc nên làm việc nào trước.",
      },
      {
        persona: "owner",
        moment: "Khi vắng mặt một hôm",
        quote: "Nhiều việc chỉ nằm trong đầu mình. Vắng một hôm là cả nhóm phải gọi hỏi.",
      },
      {
        persona: "freelancer",
        moment: "Khi nhiều khách cùng gấp",
        quote: "Ba khách cùng nhắn gấp. Nhận việc mới xong là quên mất mình đã hứa gì với khách trước.",
      },
      {
        persona: "member",
        moment: "Khi được giao việc",
        quote: "Việc đến rải rác qua tin nhắn. Mình phải tự ghi lại xem việc nào trước, hạn khi nào.",
      },
      {
        persona: "agency",
        moment: "Khi gần đến ngày giao",
        quote: "Việc chậm thường chỉ lộ ra sát hạn. Lúc đó mình thành người đi nhắc và chữa cháy.",
      },
      {
        persona: "lead",
        moment: "Khi cần báo cáo tiến độ",
        quote: "Mọi người cập nhật không đều, nên bảng theo dõi chỉ đúng được mấy ngày đầu.",
      },
      {
        persona: "agency",
        moment: "Khi khách hỏi “đến đâu rồi?”",
        quote: "Lần nào khách hỏi, mình cũng phải lục lại mấy nhóm chat và bảng tính mới trả lời được.",
      },
      {
        persona: "freelancer",
        moment: "Lúc tắt máy cuối ngày",
        quote: "Tắt máy rồi mà trong đầu vẫn phải giữ nguyên danh sách việc của ngày mai.",
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
    groups: {
      product: "Sản phẩm",
      resources: "Tài nguyên",
      company: "Công ty",
      legal: "Pháp lý",
    },
    legalLabel: "Thông tin pháp lý",
  },
  subpage: {
    breadcrumbLabel: "Đường dẫn",
    home: "Trang chủ",
    related: {
      product: "Tính năng khác",
      resources: "Tài nguyên khác",
      company: "Thông tin khác",
      legal: "Thông tin pháp lý khác",
    },
    updated: "Cập nhật lần cuối: 04/10/2026",
    step: "Bước",
    contact: {
      emailLabel: "Email",
      pending: "Kênh liên hệ chính thức sẽ được cập nhật tại đây.",
      helpTitle: "Có thể bạn tìm thấy câu trả lời ở đây",
      helpBody: "Nhiều câu hỏi về cách bắt đầu và cách dùng Elynto đã có trong các trang sau.",
    },
    cookies: {
      clear: "Xóa lựa chọn ngôn ngữ đã lưu",
      cleared: "Đã xóa. Website không còn lưu lựa chọn ngôn ngữ của bạn.",
    },
  },
};
