import type { Locale } from "@/lib/i18n";

export type GalleryStory = {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  detail: string[];
};

export type GalleryCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  desktopHint: string;
  mobileHint: string;
  open: string;
  close: string;
  previous: string;
  next: string;
  storyLabel: string;
  items: GalleryStory[];
};

// Fictional people and authored quotes for the user-requested design simulation.
// They are not verified customer endorsements. This branch is preview-only.
const portraits = {
  mai: "/media/customer-gallery/mai-anh.webp",
  minh: "/media/customer-gallery/quang-minh.webp",
  linh: "/media/customer-gallery/linh-tran.webp",
  daniel: "/media/customer-gallery/daniel-park.webp",
};

const copy: Record<Locale, GalleryCopy> = {
  vi: {
    eyebrow: "Cùng làm việc tốt hơn",
    title: "Mỗi người một việc. Cả nhóm cùng nhịp.",
    intro: "Từ dự án cá nhân đến công việc đội nhóm, mọi thứ bắt đầu bằng sự rõ ràng.",
    desktopHint: "Rê chuột để khám phá. Chọn một câu chuyện để đọc thêm.",
    mobileHint: "Vuốt để khám phá. Chạm vào ảnh để đọc thêm.",
    open: "Đọc chia sẻ của",
    close: "Đóng câu chuyện",
    previous: "Câu chuyện trước",
    next: "Câu chuyện tiếp theo",
    storyLabel: "Góc nhìn cùng Elynto",
    items: [
      {
        id: "mai-anh", name: "Mai Anh", role: "Nhà thiết kế tự do", image: portraits.mai,
        quote: "Mỗi khách hàng một dự án, nhưng tôi chỉ cần một nơi để biết hôm nay nên bắt đầu từ đâu.",
        detail: [
          "Trước đây, yêu cầu của khách nằm trong tin nhắn, còn danh sách việc lại ở một chỗ khác. Tôi thường phải đọc lại cả cuộc trò chuyện để nhớ mình đã hứa điều gì.",
          "Với Elynto, tôi đưa yêu cầu thành công việc, đặt hạn và theo dõi theo từng dự án. Buổi sáng bắt đầu nhẹ nhàng hơn vì mọi việc đã có chỗ để quay lại.",
        ],
      },
      {
        id: "quang-minh", name: "Quang Minh", role: "Chủ nhóm dịch vụ sáng tạo", image: portraits.minh,
        quote: "Giao xong là cả nhóm biết ai làm gì, khi nào cần xong. Tôi bớt phải nhắn hỏi từng người.",
        detail: [
          "Một nhóm nhỏ thường phải xử lý nhiều đầu việc cùng lúc. Điều tôi cần là một cách giao việc tự nhiên, nhưng vẫn rõ người phụ trách và thời hạn.",
          "Tôi viết yêu cầu như khi nhắn cho đồng nghiệp, rồi xem lại công việc trong Elynto. Khi cần nắm tiến độ, tôi mở danh sách thay vì ghép thông tin từ nhiều nhóm chat.",
        ],
      },
      {
        id: "linh-tran", name: "Linh Trần", role: "Điều phối dự án", image: portraits.linh,
        quote: "Cuộc họp kết thúc với bước tiếp theo rõ ràng. Những điều đã thống nhất không còn nằm lại trong ghi chú.",
        detail: [
          "Tôi thích khi cuộc trao đổi, cuộc họp và công việc được kết nối. Cả nhóm có thể xem lại quyết định và hiểu vì sao một việc cần được ưu tiên.",
          "AI Summary giúp ghi lại kết luận để tôi xem lại và giao việc ngay trong cuộc họp. Sau đó, từng việc tiếp tục được theo dõi cùng người phụ trách và ngày hạn.",
        ],
      },
      {
        id: "daniel-park", name: "Daniel Park", role: "Tư vấn sản phẩm", image: portraits.daniel,
        quote: "Dù làm việc ở đâu, chúng tôi vẫn có chung một kế hoạch và biết bước tiếp theo của nhau.",
        detail: [
          "Làm việc từ xa dễ khiến thông tin bị chia nhỏ giữa lịch họp, tin nhắn và bảng theo dõi. Tôi muốn mọi người cùng nhìn vào một kế hoạch.",
          "Elynto kết nối công việc với cuộc trao đổi của đội nhóm. Khi cần chuyển từ một việc cụ thể sang tiến độ toàn dự án, tôi vẫn giữ được bối cảnh.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Better work, together",
    title: "Different roles. One shared rhythm.",
    intro: "From independent projects to team delivery, it all starts with clarity.",
    desktopHint: "Hover to explore. Choose a story to read more.",
    mobileHint: "Swipe to explore. Tap a portrait to read more.",
    open: "Read the story from",
    close: "Close story",
    previous: "Previous story",
    next: "Next story",
    storyLabel: "A perspective on working with Elynto",
    items: [
      {
        id: "mai-anh", name: "Mai Anh", role: "Freelance designer", image: portraits.mai,
        quote: "Every client has a different project. I have one place to see where my day should begin.",
        detail: [
          "Client requests used to live in messages, while my task list lived somewhere else. I kept rereading conversations to remember what I had promised.",
          "With Elynto, I turn requests into tasks, set deadlines and keep each project together. Mornings feel calmer because there is a clear place to pick things up.",
        ],
      },
      {
        id: "quang-minh", name: "Quang Minh", role: "Creative agency owner", image: portraits.minh,
        quote: "Once work is assigned, everyone knows the owner and deadline. I spend less time chasing updates.",
        detail: [
          "A small team handles a lot at once. I need a natural way to hand off work that still makes ownership and deadlines clear.",
          "I write a request as I would to a teammate, then review the task in Elynto. When I need an update, I open the list instead of piecing it together from different chats.",
        ],
      },
      {
        id: "linh-tran", name: "Linh Trần", role: "Project coordinator", image: portraits.linh,
        quote: "Meetings end with a clear next step. The decisions we make no longer stay buried in notes.",
        detail: [
          "I like having conversations, meetings and tasks connected. The team can revisit a decision and understand why a piece of work matters.",
          "AI Summary captures the conclusions for me to review and assign work during the meeting. Each task then carries on with a clear owner and due date.",
        ],
      },
      {
        id: "daniel-park", name: "Daniel Park", role: "Product consultant", image: portraits.daniel,
        quote: "Wherever we work, we share one plan and know what comes next for each other.",
        detail: [
          "Remote work can scatter context across calendars, messages and trackers. I want everyone to be looking at the same plan.",
          "Elynto brings the work and the conversation together. Moving from one task to the wider project still feels like following the same story.",
        ],
      },
    ],
  },
};

export function getCustomerGallery(lang: Locale) {
  return copy[lang];
}
