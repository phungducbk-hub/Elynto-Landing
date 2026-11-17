import type { PagesDictionary } from "./types";
import { guidesVi } from "./trust/guides-vi";
import { trustVi } from "./trust/vi";

/**
 * Subpage copy. Describes only what the product references or the brief confirm; nothing about
 * pricing, integrations, automation or security that has not been verified.
 */
const existingPages = {
  "natural-language-tasks": {
    navLabel: "Tạo và giao việc",
    eyebrow: "Tạo và giao việc",
    title: "Viết một câu, có ngay một công việc rõ ràng.",
    description:
      "Mô tả việc cần làm như khi nhắn cho đồng nghiệp. Elynto nhận ra việc gì, ai làm, khi nào xong và tạo thành công việc để bạn theo dõi.",
    sections: [
      {
        heading: "Cách hoạt động",
        body: [
          "Bạn viết một câu như “Giao Minh làm báo cáo, hoàn thành trước thứ sáu”. Elynto tách ra tên công việc, người phụ trách và thời hạn, rồi tạo công việc với trạng thái Đã giao.",
        ],
      },
      {
        heading: "Luôn xem lại được",
        body: [
          "Kết quả hiện ngay: tên việc, người được giao, thời hạn và mức ưu tiên. Thông tin nào chưa đúng, bạn sửa trực tiếp trên công việc.",
        ],
      },
      {
        heading: "Cho việc của bạn và việc giao đi",
        points: [
          "Việc của riêng bạn: “Gửi báo giá cho khách vào chiều mai.”",
          "Việc giao cho người khác: “Nhờ Lan viết bài giới thiệu dịch vụ trước thứ năm.”",
        ],
      },
      {
        heading: "Để kết quả chính xác hơn",
        points: [
          "Bắt đầu bằng một động từ: gửi, viết, kiểm tra, chuẩn bị.",
          "Ghi tên người phụ trách đúng như trong nhóm.",
          "Nói rõ thời hạn: “trước thứ sáu”, “chiều mai”.",
        ],
      },
    ],
  },
  "ai-planning": {
    navLabel: "Lập kế hoạch với AI",
    eyebrow: "Lập kế hoạch dự án với AI",
    title: "Từ một mục tiêu đến bản kế hoạch có giai đoạn và đầu việc.",
    description:
      "Nhập mục tiêu, AI phác thảo các giai đoạn và công việc cần làm. Bạn xem lại, thêm, bớt và chỉnh sửa trước khi tạo dự án.",
    sections: [
      {
        heading: "Bắt đầu từ mục tiêu",
        body: [
          "Viết mục tiêu bằng lời thường, ví dụ “Lập kế hoạch ra mắt website trong 3 tuần”. Nêu càng rõ kết quả và thời gian, bản nháp càng sát với điều bạn cần.",
        ],
      },
      {
        heading: "AI phác thảo, bạn quyết định",
        body: [
          "AI đề xuất các giai đoạn và công việc trong từng giai đoạn. Đây là bản nháp: bạn thêm, bớt, đổi tên hoặc sắp xếp lại trước khi tạo dự án.",
        ],
      },
      {
        heading: "Sau khi tạo dự án",
        body: [
          "Dự án có sẵn các giai đoạn và công việc. Bạn giao việc cho từng người và theo dõi tiến độ bằng danh sách, lịch hoặc Gantt.",
        ],
      },
      {
        heading: "Gợi ý viết mục tiêu",
        points: [
          "Kết quả cuối cùng: website, chiến dịch, sự kiện…",
          "Khung thời gian: 2 tuần, trước cuối tháng…",
          "Phạm vi chính nếu đã biết: số trang, kênh, hạng mục.",
        ],
      },
    ],
  },
  "delegated-work": {
    navLabel: "Theo dõi việc đã giao",
    eyebrow: "Theo dõi việc đã giao",
    title: "Giao rồi, vẫn biết việc đang ở đâu.",
    description:
      "Mục Việc đã giao gom mọi việc bạn giao cho người khác vào một chỗ, kèm người nhận, hạn và trạng thái, để bạn không phải nhắn hỏi từng người.",
    sections: [
      {
        heading: "Một nơi cho mọi việc đã giao",
        body: [
          "Mỗi việc hiện người nhận, thời hạn và trạng thái hiện tại. Việc quá hạn được đánh dấu rõ, để bạn biết nên hỏi han việc nào trước.",
        ],
      },
      {
        heading: "Trạng thái cho biết tiến độ",
        body: ["Mỗi việc đi qua những bước rõ ràng:"],
        points: [
          "Nháp: việc mới tạo, chưa giao.",
          "Đã giao: người nhận đã có việc.",
          "Đã nhận: người nhận xác nhận sẽ làm.",
          "Đang làm: việc đang được thực hiện.",
          "Đã nộp: kết quả đã gửi, chờ bạn xem.",
          "Đã duyệt, Hoàn thành: việc đã được chấp nhận và khép lại.",
        ],
      },
      {
        heading: "Chưa đạt thì làm lại",
        body: [
          "Nếu kết quả chưa đúng ý, chuyển việc sang Làm lại. Người nhận biết cần chỉnh sửa, còn bạn vẫn thấy việc trong danh sách cho tới khi xong.",
        ],
      },
    ],
  },
  today: {
    navLabel: "Hôm nay & Việc của tôi",
    eyebrow: "Mỗi ngày",
    title: "Mở Elynto. Biết ngay việc nào cần bạn.",
    description:
      "Hôm nay là nơi bắt đầu một yêu cầu. Việc của tôi tập hợp việc được giao cho bạn theo các tab Sắp tới, Quá hạn, Làm lại và Đã hoàn thành.",
    sections: [
      {
        heading: "Bắt đầu ngày làm việc",
        body: [
          "Mở Việc của tôi để xem việc được giao cho bạn, hạn hoàn thành, mức ưu tiên và trạng thái.",
        ],
      },
      {
        heading: "Nhóm theo mức gấp",
        points: [
          "Quá hạn: việc đã qua thời hạn.",
          "Làm lại: những việc cần làm lại.",
          "Sắp tới: theo dõi các việc sắp tới.",
        ],
      },
      {
        heading: "Việc quan trọng không bị lẫn",
        body: [
          "Đánh dấu quan trọng bằng biểu tượng lá cờ; dùng chế độ Tập trung để tập trung vào các việc cần chú ý.",
        ],
      },
    ],
  },
  "project-views": {
    navLabel: "Các chế độ xem dự án",
    eyebrow: "Theo dõi dự án",
    title: "Mỗi dự án, ba cách nhìn.",
    description:
      "Trang dự án cho thấy tiến độ chung, việc quá hạn và lịch trình. Bạn xem công việc theo danh sách giai đoạn, lịch tháng hoặc Gantt.",
    sections: [
      {
        heading: "Tổng quan dự án",
        body: [
          "Phần trăm hoàn thành, số công việc, việc quá hạn, thời gian còn lại và tình trạng chung của dự án. Khi cần, chọn Phân tích với AI để AI nhận định tình trạng dự án.",
        ],
      },
      {
        heading: "Danh sách theo giai đoạn",
        body: ["Công việc được nhóm theo giai đoạn, kèm người phụ trách, ngày bắt đầu, hạn, mức ưu tiên và trạng thái."],
      },
      {
        heading: "Lịch",
        body: ["Xem công việc theo tháng để biết tuần nào đang dày việc."],
      },
      {
        heading: "Gantt",
        body: [
          "Thấy các công việc trên trục thời gian. Kéo thanh công việc để dời lịch, đặt mốc cho những thời điểm quan trọng.",
        ],
      },
    ],
  },


  faq: {
    navLabel: "Câu hỏi thường gặp",
    eyebrow: "Hỏi đáp",
    title: "Câu hỏi thường gặp",
    description: "Những điều bạn có thể muốn biết trước khi bắt đầu với Elynto.",
    sections: [],
  },


} satisfies Partial<PagesDictionary>;

export const vi: PagesDictionary = { ...existingPages, ...trustVi, ...guidesVi };
