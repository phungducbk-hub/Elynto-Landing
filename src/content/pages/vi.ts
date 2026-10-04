import type { PagesDictionary } from "./types";

/**
 * Subpage copy. Describes only what the beta screenshots or the brief confirm; nothing about
 * pricing, integrations, automation or security that has not been verified.
 */
export const vi: PagesDictionary = {
  "natural-language-tasks": {
    navLabel: "Tạo việc bằng câu nói",
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
    badge: "AI",
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
      "Hôm nay và Việc của tôi gom việc của bạn về một chỗ: việc quá hạn, đến hạn hôm nay, sắp đến hạn và những việc bạn đánh dấu quan trọng.",
    sections: [
      {
        heading: "Bắt đầu ngày làm việc",
        body: [
          "Thay vì lục lại tin nhắn hay tự tổng hợp danh sách, mở Hôm nay để thấy ngay việc nào đang trễ và việc nào cần xong trong ngày.",
        ],
      },
      {
        heading: "Nhóm theo mức gấp",
        points: [
          "Quá hạn: việc đã qua thời hạn.",
          "Đến hạn hôm nay: việc cần hoàn thành trong ngày.",
          "Sắp đến hạn: chuẩn bị trước cho những ngày tới.",
        ],
      },
      {
        heading: "Việc quan trọng không bị lẫn",
        body: [
          "Những việc bạn đánh dấu quan trọng được tách riêng, để không bị chìm giữa các việc nhỏ.",
        ],
      },
    ],
  },
  "project-views": {
    navLabel: "Danh sách, Lịch, Gantt",
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
  "getting-started": {
    navLabel: "Hướng dẫn bắt đầu",
    eyebrow: "Hướng dẫn",
    title: "Bắt đầu với Elynto trong vài bước.",
    description: "Từ công việc đầu tiên đến dự án đầu tiên: những bước cơ bản để làm quen với Elynto.",
    sections: [
      {
        heading: "Mở Elynto",
        body: ["Nhấn Dùng thử miễn phí để mở Elynto tại beta.elynto.io. Nếu đã có tài khoản, chọn Đăng nhập."],
      },
      {
        heading: "Tạo công việc đầu tiên",
        body: [
          "Viết một câu mô tả việc cần làm, ví dụ “Gửi báo giá cho khách vào chiều mai”. Elynto tạo công việc có tên và thời hạn.",
        ],
      },
      {
        heading: "Kiểm tra và chỉnh sửa",
        body: ["Xem lại người phụ trách, thời hạn và mức ưu tiên. Sửa trực tiếp nếu có thông tin chưa đúng."],
      },
      {
        heading: "Giao việc cho người khác",
        body: [
          "Ghi tên người nhận trong câu, ví dụ “Giao Minh làm báo cáo, hoàn thành trước thứ sáu”. Người nhận cần là thành viên trong nhóm của bạn. Theo dõi các việc đã giao trong mục Việc đã giao.",
        ],
      },
      {
        heading: "Lập kế hoạch cho một dự án",
        body: ["Nhập mục tiêu và để AI phác thảo giai đoạn, công việc. Chỉnh bản nháp cho đúng ý rồi tạo dự án."],
      },
      {
        heading: "Mỗi ngày, mở Hôm nay",
        body: ["Bắt đầu ngày ở Hôm nay hoặc Việc của tôi để thấy việc quá hạn, đến hạn và sắp tới."],
      },
    ],
  },
  "writing-tasks": {
    navLabel: "Viết yêu cầu hiệu quả",
    eyebrow: "Hướng dẫn",
    title: "Viết yêu cầu để Elynto hiểu đúng ngay lần đầu.",
    description: "Một câu rõ việc, rõ người, rõ hạn giúp công việc được tạo chính xác hơn và ít phải sửa lại.",
    sections: [
      {
        heading: "Ba thành phần nên có",
        points: [
          "Việc gì: bắt đầu bằng động từ như gửi, viết, kiểm tra, chuẩn bị.",
          "Ai làm: tên người phụ trách. Bỏ qua nếu là việc của bạn.",
          "Khi nào xong: “trước thứ sáu”, “chiều mai”, “cuối tuần này”.",
        ],
      },
      {
        heading: "Ví dụ",
        points: [
          "“Giao Minh làm báo cáo, hoàn thành trước thứ sáu.”",
          "“Nhờ Lan chuẩn bị nội dung chiến dịch tháng 11, xong trước thứ tư tuần sau.”",
          "“Gửi báo giá cho khách hàng trước ngày mai.”",
        ],
      },
      {
        heading: "Nên tránh",
        points: [
          "Gộp nhiều việc vào một câu. Tách thành từng câu để mỗi việc có người và hạn riêng.",
          "Thời hạn mơ hồ như “sớm” hay “khi nào rảnh”.",
          "Gọi người phụ trách bằng biệt danh khác với tên trong nhóm.",
        ],
      },
      {
        heading: "Luôn kiểm tra kết quả",
        body: [
          "Elynto cho bạn thấy công việc vừa tạo. Nếu tên việc, người phụ trách hay thời hạn chưa đúng, sửa trực tiếp. Bạn luôn là người quyết định.",
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
  about: {
    navLabel: "Về Elynto",
    eyebrow: "Về Elynto",
    title: "Công việc rõ ràng hơn, bắt đầu từ một câu nói.",
    description:
      "Elynto là hệ thống quản lý công việc bằng AI. Bạn mô tả việc cần làm bằng lời thường, Elynto biến nó thành công việc rõ người, rõ hạn và giúp bạn theo dõi tất cả trong một nơi.",
    sections: [
      {
        heading: "Tầm nhìn",
        body: [
          "“The interface between you and your work.” Bạn chỉ cần mô tả điều cần làm; Elynto giúp biến nó thành công việc có người phụ trách, thời hạn và trạng thái, để bạn dành sức cho chính công việc.",
        ],
      },
      {
        heading: "Cách Elynto được làm ra",
        points: [
          "Bắt đầu phải nhanh: viết một câu thay vì điền nhiều ô.",
          "AI đề xuất, bạn quyết định: mọi bản nháp đều xem lại và sửa được.",
          "Rõ ràng trước hết: ai làm gì, khi nào xong, đang đến đâu.",
        ],
      },
      {
        heading: "Dành cho ai",
        body: [
          "Freelancer và solopreneur có nhiều dự án, nhóm nhỏ cần rõ ai làm gì, và chủ doanh nghiệp nhỏ muốn nắm tình hình mà không phải hỏi từng người.",
        ],
      },
      {
        heading: "Giai đoạn hiện tại",
        body: ["Elynto đang ở giai đoạn beta tại beta.elynto.io và tiếp tục được hoàn thiện."],
      },
    ],
  },
  contact: {
    navLabel: "Liên hệ",
    eyebrow: "Liên hệ",
    title: "Liên hệ với Elynto",
    description: "Câu hỏi về sản phẩm, góp ý hay đề xuất hợp tác, hãy gửi cho chúng tôi.",
    sections: [],
  },
  privacy: {
    navLabel: "Quyền riêng tư",
    eyebrow: "Pháp lý",
    title: "Quyền riêng tư trên website Elynto",
    description: "Website này lưu gì trên trình duyệt của bạn, ghi nhận số liệu truy cập nào, vì sao và trong bao lâu.",
    sections: [
      {
        heading: "Phạm vi",
        body: [
          "Trang này áp dụng cho website giới thiệu Elynto. Dữ liệu bạn nhập trong ứng dụng Elynto tại beta.elynto.io không thuộc phạm vi trang này.",
        ],
      },
      {
        heading: "Thông tin được lưu trên trình duyệt",
        body: [
          "Website lưu lựa chọn ngôn ngữ (cookie elynto-lang, tối đa 1 năm), một mã ngẫu nhiên để đếm số người truy cập và mốc thời gian của lượt truy cập hiện tại. Không mục nào chứa tên, email hay thông tin liên hệ của bạn. Chi tiết từng mục có trên trang Cookie.",
        ],
      },
      {
        heading: "Thống kê truy cập",
        body: [
          "Để biết website được dùng thế nào, website tự ghi nhận: trang được xem, lượt bấm Dùng thử miễn phí và Đăng nhập (kèm vị trí nút), thời điểm, loại thiết bị, trình duyệt, hệ điều hành, quốc gia và trang web đã dẫn bạn tới.",
          "Quốc gia được suy ra từ địa chỉ IP lúc truy cập. Địa chỉ IP và chuỗi nhận dạng trình duyệt không được lưu.",
        ],
      },
      {
        heading: "Lưu trữ và chia sẻ",
        body: [
          "Số liệu thống kê được lưu trong cơ sở dữ liệu do Elynto quản lý, chỉ dùng để xem số liệu tổng hợp, không bán hay chia sẻ cho bên khác, và tự xóa sau khoảng 13 tháng.",
        ],
      },
      {
        heading: "Không có công cụ theo dõi của bên thứ ba",
        body: [
          "Website không dùng công cụ đo lường, quảng cáo hay mạng xã hội của bên thứ ba và không đặt cookie của bên thứ ba.",
        ],
      },
      {
        heading: "Không có biểu mẫu thu thập thông tin",
        body: [
          "Website không có biểu mẫu đăng ký hay đăng nhập. Các nút Dùng thử miễn phí và Đăng nhập chuyển bạn sang ứng dụng Elynto tại beta.elynto.io.",
        ],
      },
      {
        heading: "Nhật ký kỹ thuật",
        body: [
          "Như mọi website, máy chủ lưu trữ có thể ghi nhật ký truy cập kỹ thuật, ví dụ địa chỉ IP và thời điểm truy cập, để vận hành và bảo vệ website.",
        ],
      },
      {
        heading: "Lựa chọn của bạn",
        body: [
          "Bạn có thể tắt thống kê hoặc xóa lựa chọn ngôn ngữ đã lưu trên trang Cookie. Website tự bỏ qua trình duyệt bật Do Not Track hoặc Global Privacy Control.",
        ],
      },
    ],
  },
  cookies: {
    navLabel: "Cookie",
    eyebrow: "Pháp lý",
    title: "Cookie trên website Elynto",
    description: "Website dùng một cookie để nhớ ngôn ngữ bạn chọn, và bộ nhớ trình duyệt để đếm lượt truy cập ẩn danh.",
    sections: [
      {
        heading: "Cookie đang dùng",
        table: {
          caption: "Cookie của website Elynto",
          columns: ["Tên", "Mục đích", "Thời hạn", "Loại"],
          rows: [["elynto-lang", "Nhớ ngôn ngữ bạn chọn (Tiếng Việt hoặc English)", "1 năm", "Chức năng, của Elynto"]],
        },
        body: ["Khi bạn mở elynto.io, cookie này giúp chuyển thẳng tới phiên bản ngôn ngữ đã chọn."],
      },
      {
        heading: "Bộ nhớ trình duyệt",
        table: {
          caption: "Mục lưu trong bộ nhớ trình duyệt (localStorage)",
          columns: ["Tên", "Mục đích", "Thời hạn", "Loại"],
          rows: [
            ["elynto-vid", "Mã ngẫu nhiên để đếm số người truy cập", "Đến khi bạn xóa dữ liệu trình duyệt", "Thống kê"],
            ["elynto-visit", "Nhận biết lượt truy cập hiện tại", "Hết hiệu lực sau 30 phút không hoạt động", "Thống kê"],
            ["elynto-lang", "Bản sao lựa chọn ngôn ngữ", "Đến khi bạn xóa dữ liệu trình duyệt", "Chức năng"],
            ["elynto-stats-optout", "Ghi nhớ bạn đã tắt thống kê", "Đến khi bạn bật lại", "Chức năng"],
          ],
        },
      },
      {
        heading: "Không có cookie của bên thứ ba",
        body: ["Website không đặt cookie quảng cáo, đo lường hay mạng xã hội của bên thứ ba."],
      },
      {
        heading: "Tắt thống kê truy cập",
        body: ["Nhấn nút bên dưới để website không ghi nhận lượt truy cập từ trình duyệt này."],
        action: "statsOptOut",
      },
      {
        heading: "Xóa lựa chọn ngôn ngữ",
        body: [
          "Nhấn nút bên dưới để xóa cookie và lựa chọn ngôn ngữ đã lưu. Lần tới, website sẽ chọn ngôn ngữ theo cài đặt trình duyệt của bạn.",
        ],
        action: "clearLanguage",
      },
    ],
  },
};
