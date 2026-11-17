import type { PagesDictionary } from "../types";

export const guidesVi: Pick<PagesDictionary, "getting-started" | "writing-tasks" | "about" | "contact"> = {
  "getting-started": {
    "navLabel": "Bắt đầu sử dụng",
    "eyebrow": "Bắt đầu sử dụng",
    "title": "Công việc đầu tiên, từng bước rõ ràng.",
    "description": "Hướng dẫn thực tế từ khi mở workspace đến lúc theo dõi công việc cùng đội nhóm.",
    "sections": [
      {
        "heading": "Mở đúng workspace",
        "body": [
          "Đăng nhập Elynto hoặc tạo tài khoản qua Dùng thử miễn phí. Kiểm tra workspace hiện tại trước khi thêm công việc hay mời người khác."
        ]
      },
      {
        "heading": "Mời đúng người tham gia",
        "body": [
          "Nếu quản lý workspace, mời những đồng nghiệp cần truy cập. Kiểm tra người dự định giao việc đã là thành viên và dùng tên đang hiển thị trong Elynto."
        ]
      },
      {
        "heading": "Tạo việc cho chính bạn",
        "body": [
          "Trên Hôm nay, mô tả việc và thời hạn: “Gửi báo giá cho khách trước thứ sáu.” Xem lại work card, không mặc định AI đã hiểu đúng mọi chi tiết."
        ]
      },
      {
        "heading": "Giao việc và kiểm tra kết quả",
        "body": [
          "Thử “Giao Minh chuẩn bị báo cáo, hoàn thành trước thứ sáu.” Kiểm tra người nhận, ngày hạn và ưu tiên trên thẻ. Theo dõi việc giao cho đồng đội trong Việc đã giao; xem việc của mình trong Việc của tôi."
        ],
        "links": [
          {
            "page": "delegated-work"
          },
          {
            "page": "today"
          }
        ]
      },
      {
        "heading": "Tạo dự án khi công việc cần kế hoạch",
        "body": [
          "Nhập mục tiêu như “Lập kế hoạch ra mắt website trong ba tuần.” Xem lại các giai đoạn và đầu việc được đề xuất trước khi tạo dự án, rồi phân công người phụ trách."
        ],
        "links": [
          {
            "page": "ai-planning"
          }
        ]
      },
      {
        "heading": "Chọn chế độ xem phù hợp",
        "body": [
          "Dùng Danh sách để xem người phụ trách và trạng thái, Lịch để xem ngày và Gantt để xem trình tự công việc. Kiểm tra việc quá hạn và việc chờ duyệt trong nhịp làm việc hằng ngày."
        ],
        "links": [
          {
            "page": "project-views"
          }
        ]
      },
      {
        "heading": "Giữ trao đổi gắn với công việc",
        "body": [
          "Chọn cuộc trò chuyện trực tiếp, nhóm hoặc dự án phù hợp. Đặt mục đích rõ cho cuộc họp và tạo những bước tiếp theo đã thống nhất với người phụ trách, thời hạn."
        ],
        "links": [
          {
            "page": "collaboration"
          }
        ]
      },
      {
        "heading": "Tìm hỗ trợ khi cần",
        "body": [
          "Nếu kết quả khác mong đợi, mô tả thao tác đã thử và điều bạn nhìn thấy. Nêu trang hoặc tính năng liên quan, nhưng không gửi mật khẩu, khóa bí mật hoặc nội dung riêng của người khác."
        ],
        "links": [
          {
            "page": "contact"
          },
          {
            "page": "writing-tasks"
          }
        ]
      }
    ]
  },
  "writing-tasks": {
    "navLabel": "Viết yêu cầu rõ ràng",
    "eyebrow": "Hướng dẫn thực tế",
    "title": "Yêu cầu rõ ràng. Bắt đầu thuận lợi.",
    "description": "Nêu việc cụ thể, người phụ trách dễ xác định và thời hạn rõ, rồi kiểm tra kết quả.",
    "sections": [
      {
        "heading": "Nêu việc cần làm",
        "body": [
          "Bắt đầu bằng hành động và kết quả: chuẩn bị báo giá, duyệt bản nháp, xác nhận ngày ra mắt. Tách những yêu cầu không liên quan để mỗi việc có người phụ trách và thời hạn riêng."
        ]
      },
      {
        "heading": "Nêu người phụ trách và thời hạn",
        "body": [
          "Dùng tên đồng đội như đang hiển thị trong workspace. Nếu dễ nhầm tên, bổ sung ngữ cảnh và kiểm tra người được chọn. Dùng ngày cụ thể khi cần chính xác, nhất là khi làm việc khác múi giờ."
        ]
      },
      {
        "heading": "Bắt đầu từ ví dụ ngắn",
        "body": [
          "Việc của mình: “Gửi báo giá cho khách trước ngày 20/11.” Giao đồng đội: “Giao Minh duyệt đề xuất website trước thứ sáu.” Dự án: “Lập kế hoạch ra mắt website trong ba tuần.”"
        ]
      },
      {
        "heading": "Kiểm tra trước khi tiếp tục",
        "body": [
          "Kiểm tra tên việc, người nhận, thời hạn và ưu tiên trên work card. Với dự án, chỉnh bản nháp trước khi tạo. Nếu cách hiểu chưa đúng, sửa kết quả hoặc làm rõ yêu cầu; kết quả AI không phải bảo đảm về độ chính xác."
        ],
        "links": [
          {
            "page": "natural-language-tasks"
          },
          {
            "page": "ai-planning"
          },
          {
            "page": "security"
          }
        ]
      }
    ]
  },
  "about": {
    "navLabel": "Giới thiệu Elynto",
    "eyebrow": "Giới thiệu Elynto",
    "title": "Bớt công điều phối. Thêm sự rõ ràng.",
    "description": "Elynto đưa công việc, kế hoạch và trao đổi đội nhóm vào một nơi, bắt đầu từ cách mọi người diễn đạt điều cần làm.",
    "sections": [
      {
        "heading": "The interface between you and your work",
        "body": [
          "Mục tiêu rất rõ: giúp cá nhân và đội nhóm biến ý định thành bước tiếp theo cụ thể, có người phụ trách, thời hạn và tiến độ có thể theo dõi."
        ]
      },
      {
        "heading": "Dành cho nhịp làm việc thực tế",
        "body": [
          "Elynto dành cho freelancer quản lý nhiều khách hàng, nhóm nhỏ phối hợp bàn giao và chủ doanh nghiệp theo dõi nhiều đầu việc. Sản phẩm kết nối việc tạo công việc, lập kế hoạch dự án và trao đổi bước tiếp theo."
        ]
      },
      {
        "heading": "AI hỗ trợ, bạn vẫn làm chủ",
        "body": [
          "Yêu cầu bằng lời thường giúp bạn bắt đầu nhanh. Kết quả hiển thị để kiểm tra điều đã được hiểu. Bản nháp dự án được xem lại trước khi tạo; trách nhiệm vẫn thuộc về người thực hiện và phê duyệt công việc."
        ],
        "links": [
          {
            "page": "natural-language-tasks"
          },
          {
            "page": "ai-planning"
          }
        ]
      },
      {
        "heading": "Một kênh trao đổi với Elynto",
        "body": [
          "Gửi câu hỏi sản phẩm, góp ý, đề nghị hợp tác hoặc yêu cầu về dữ liệu tới support@elynto.io. Trung tâm trợ giúp có hướng dẫn thực tế để bắt đầu và làm việc cùng đội nhóm."
        ],
        "links": [
          {
            "page": "help-center"
          },
          {
            "page": "contact"
          },
          {
            "page": "security"
          }
        ]
      }
    ]
  },
  "contact": {
    "navLabel": "Liên hệ",
    "eyebrow": "Liên hệ Elynto",
    "title": "Cùng tìm bước tiếp theo phù hợp.",
    "description": "Câu hỏi sản phẩm, góp ý, vấn đề thanh toán hoặc yêu cầu dữ liệu: liên hệ Elynto qua email.",
    "sections": [
      {
        "heading": "Hỗ trợ sản phẩm và góp ý",
        "body": [
          "Mô tả trang hoặc tính năng, điều bạn muốn làm và kết quả thực tế. Ảnh chụp đã che thông tin có thể hữu ích; hãy gỡ tin nhắn riêng và dữ liệu của người khác trước khi gửi."
        ],
        "emailSubject": "Hỗ trợ sản phẩm"
      },
      {
        "heading": "Thanh toán và hủy dịch vụ",
        "body": [
          "Nêu email tài khoản, mã giao dịch và vấn đề cần xem xét. Không gửi đầy đủ số thẻ, thông tin xác thực thanh toán hoặc mật khẩu."
        ],
        "links": [
          {
            "page": "cancellation"
          }
        ],
        "emailSubject": "Yêu cầu thanh toán"
      },
      {
        "heading": "Quyền riêng tư và bảo mật",
        "body": [
          "Dùng tiêu đề “Yêu cầu quyền riêng tư” cho yêu cầu truy cập, chỉnh sửa hoặc xóa; dùng “Báo cáo bảo mật” cho vấn đề bảo mật. Elynto có thể cần xác minh bạn có thẩm quyền gửi yêu cầu."
        ],
        "links": [
          {
            "page": "privacy"
          },
          {
            "page": "security"
          }
        ],
        "emailSubject": "Yêu cầu quyền riêng tư hoặc bảo mật"
      }
    ]
  }
};
