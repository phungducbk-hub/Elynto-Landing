import type { Locale } from "@/lib/i18n";

type ExperienceCopy = {
  promise: string;
  assurance: string;
  chapterNav: string;
  chapters: { id: string; title: string; body: string }[];
  proof: { eyebrow: string; title: string; body: string; steps: { title: string; body: string }[]; cta: string; help: string; privacy: string; about: string };
  start: { eyebrow: string; title: string; body: string; demoTitle: string; demoBody: string; demoCta: string; betaTitle: string; betaBody: string; betaCta: string; note: string; plans: string; login: string };
  preview: string;
};

const copy: Record<Locale, ExperienceCopy> = {
  vi: {
    promise: "Giao việc bằng một câu. Cả nhóm biết bước tiếp theo.",
    assurance: "Bản mẫu không cần tài khoản · Giao diện Việt / Anh",
    chapterNav: "Khám phá cách Elynto giúp bạn làm việc",
    chapters: [
      { id: "chapter-intent", title: "Từ ý định thành công việc", body: "Nói điều cần làm. Biến một yêu cầu hoặc mục tiêu thành việc có thể bắt đầu." },
      { id: "chapter-together", title: "Cùng đội nhóm triển khai", body: "Giữ cuộc trao đổi, cuộc họp và công việc trong cùng một bối cảnh." },
      { id: "chapter-progress", title: "Nắm tiến độ để quyết định", body: "Thấy ai đang làm gì, việc nào cần bạn và dự án đang đến đâu." },
    ],
    proof: {
      eyebrow: "Tự mình kiểm chứng",
      title: "Một công việc mẫu. Cả hành trình rõ ràng.",
      body: "Bạn có thể thử ngay trên trang, theo dõi kết quả và xem lại từng bước bằng dữ liệu mẫu.",
      steps: [
        { title: "Bắt đầu bằng một câu", body: "Chọn yêu cầu mẫu và xem Elynto gõ câu lệnh, gửi yêu cầu." },
        { title: "Xem công việc được tạo", body: "Work card hiển thị tên việc, người phụ trách, thời hạn và trạng thái." },
        { title: "Theo dõi trong Việc của tôi", body: "Mở danh sách để thấy công việc vừa tạo, rồi thử lại với tình huống khác." },
      ],
      cta: "Thử với dữ liệu mẫu", help: "Hướng dẫn bắt đầu", privacy: "Quyền riêng tư trên website", about: "Tìm hiểu về Elynto",
    },
    start: {
      eyebrow: "Bắt đầu theo cách của bạn", title: "Hiểu rõ trước. Bắt đầu dễ dàng.",
      body: "Khám phá bản mẫu ngay tại đây, hoặc mở trang đăng ký để tham gia Elynto beta.",
      demoTitle: "Khám phá bản mẫu", demoBody: "Thử hành trình tạo việc với dữ liệu mẫu. Không cần tài khoản hoặc thẻ thanh toán.", demoCta: "Mở bản mẫu tương tác",
      betaTitle: "Tham gia Elynto beta", betaBody: "Tạo tài khoản để bắt đầu theo đợt mở beta hiện tại. Đã có tài khoản? Bạn có thể đăng nhập và tiếp tục công việc.", betaCta: "Mở trang đăng ký beta",
      note: "Quyền truy cập và tính năng trong app có thể khác nhau theo đợt beta. Các nội dung gắn nhãn Xem trước là minh họa trải nghiệm.",
      plans: "Bảng giá, thời hạn dùng thử và hạn mức chính thức chưa được công bố trên trang này.", login: "Đã có tài khoản? Đăng nhập",
    },
    preview: "Xem trước",
  },
  en: {
    promise: "Assign work in a sentence. Everyone knows the next step.",
    assurance: "No account needed for the demo · Vietnamese / English interface",
    chapterNav: "Explore how work moves through Elynto",
    chapters: [
      { id: "chapter-intent", title: "From intent to actionable work", body: "Say what needs to happen. Turn a request or goal into work you can start." },
      { id: "chapter-together", title: "Move forward as a team", body: "Keep conversations, meetings and work in the same shared context." },
      { id: "chapter-progress", title: "See progress. Decide what’s next.", body: "Know who’s doing what, what needs your attention and where the project stands." },
    ],
    proof: {
      eyebrow: "See for yourself", title: "One sample task. A clear path from start to finish.",
      body: "Try it on this page, follow the result and revisit each step using sample data.",
      steps: [
        { title: "Start with a sentence", body: "Choose a sample request and watch Elynto type and send the command." },
        { title: "See the work card", body: "The card shows the task, owner, due date and status." },
        { title: "Follow it in My Work", body: "Open the list to see the new task, then replay another scenario." },
      ],
      cta: "Try with sample data", help: "Getting started", privacy: "Website privacy", about: "About Elynto",
    },
    start: {
      eyebrow: "Choose your starting point", title: "Explore first. Start with confidence.",
      body: "Try the sample experience here, or open the sign-up page to join the Elynto beta.",
      demoTitle: "Explore the sample experience", demoBody: "Try the work-creation flow with sample data. No account or payment card needed.", demoCta: "Open the interactive demo",
      betaTitle: "Join the Elynto beta", betaBody: "Create an account according to the current beta availability. Already have one? Sign in and pick up your work.", betaCta: "Open beta sign-up",
      note: "App access and available features may vary during beta. Items marked Preview illustrate the intended experience.",
      plans: "Official pricing, trial duration and resource limits have not been published on this page.", login: "Already have an account? Log in",
    },
    preview: "Preview",
  },
};

export function getExperienceCopy(lang: Locale) { return copy[lang]; }
