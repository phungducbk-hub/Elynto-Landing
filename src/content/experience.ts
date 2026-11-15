import type { Locale } from "@/lib/i18n";

type ExperienceCopy = {
  promise: string;
  chapterNav: string;
  chapters: { id: string; title: string; body: string }[];
  proof: { eyebrow: string; title: string; body: string; steps: { title: string; body: string }[]; cta: string; help: string; privacy: string; about: string };
  start: { eyebrow: string; title: string; body: string; demoTitle: string; demoBody: string; demoCta: string; trialTitle: string; trialBody: string; trialCta: string; login: string };
};

const copy: Record<Locale, ExperienceCopy> = {
  vi: {
    promise: "Giao việc bằng một câu. Cả nhóm biết bước tiếp theo.",
    chapterNav: "Khám phá cách Elynto giúp bạn làm việc",
    chapters: [
      { id: "chapter-intent", title: "Từ ý định thành công việc", body: "Nói điều cần làm. Biến một yêu cầu hoặc mục tiêu thành việc có thể bắt đầu." },
      { id: "chapter-together", title: "Cùng đội nhóm triển khai", body: "Giữ cuộc trao đổi, cuộc họp và công việc trong cùng một bối cảnh." },
      { id: "chapter-progress", title: "Nắm tiến độ để quyết định", body: "Thấy ai đang làm gì, việc nào cần bạn và dự án đang đến đâu." },
    ],
    proof: {
      eyebrow: "Tự mình kiểm chứng",
      title: "Một công việc. Cả hành trình rõ ràng.",
      body: "Theo dõi cách một yêu cầu trở thành công việc rõ người, rõ hạn và được quản lý trong cùng một nơi.",
      steps: [
        { title: "Bắt đầu bằng một câu", body: "Chọn một yêu cầu và theo dõi từng bước tạo công việc." },
        { title: "Xem công việc được tạo", body: "Work card hiển thị tên việc, người phụ trách, thời hạn và trạng thái." },
        { title: "Theo dõi trong Việc của tôi", body: "Mở danh sách để thấy công việc vừa tạo, rồi thử lại với tình huống khác." },
      ],
      cta: "Xem cách tạo công việc", help: "Hướng dẫn bắt đầu", privacy: "Quyền riêng tư trên website", about: "Tìm hiểu về Elynto",
    },
    start: {
      eyebrow: "Bắt đầu theo cách của bạn", title: "Hiểu rõ trước. Bắt đầu dễ dàng.",
      body: "Khám phá cách Elynto hoạt động ngay tại đây, hoặc dùng thử miễn phí để bắt đầu quản lý công việc.",
      demoTitle: "Xem Elynto hoạt động", demoBody: "Khám phá cách tạo việc, giao việc và theo dõi tiến độ ngay trên trang.", demoCta: "Khám phá Elynto",
      trialTitle: "Bắt đầu với Elynto", trialBody: "Đưa công việc, kế hoạch và cuộc trao đổi của đội nhóm vào cùng một nơi. Tạo tài khoản và bắt đầu với việc đầu tiên của bạn.", trialCta: "Dùng thử miễn phí",
      login: "Đã có tài khoản? Đăng nhập",
    },
  },
  en: {
    promise: "Assign work in a sentence. Everyone knows the next step.",
    chapterNav: "Explore how work moves through Elynto",
    chapters: [
      { id: "chapter-intent", title: "From intent to actionable work", body: "Say what needs to happen. Turn a request or goal into work you can start." },
      { id: "chapter-together", title: "Move forward as a team", body: "Keep conversations, meetings and work in the same shared context." },
      { id: "chapter-progress", title: "See progress. Decide what’s next.", body: "Know who’s doing what, what needs your attention and where the project stands." },
    ],
    proof: {
      eyebrow: "See for yourself", title: "One task. A clear path from start to finish.",
      body: "Follow a request as it becomes work with a clear owner and deadline, managed in one place.",
      steps: [
        { title: "Start with a sentence", body: "Choose a request and follow each step of creating work." },
        { title: "See the work card", body: "The card shows the task, owner, due date and status." },
        { title: "Follow it in My Work", body: "Open the list to see the new task, then replay another scenario." },
      ],
      cta: "Explore work creation", help: "Getting started", privacy: "Website privacy", about: "About Elynto",
    },
    start: {
      eyebrow: "Choose your starting point", title: "Explore first. Start with confidence.",
      body: "See how Elynto works here, or start your free trial to manage your work.",
      demoTitle: "See Elynto in action", demoBody: "Explore how to create, assign and follow work directly on this page.", demoCta: "Explore Elynto",
      trialTitle: "Get started with Elynto", trialBody: "Bring your team’s work, plans and conversations together. Create an account and start with your first task.", trialCta: "Start free trial",
      login: "Already have an account? Log in",
    },
  },
};

export function getExperienceCopy(lang: Locale) { return copy[lang]; }
