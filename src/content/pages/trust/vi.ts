import type { PagesDictionary } from "../types";

export const trustVi: Pick<PagesDictionary, "collaboration" | "help-center" | "security" | "terms" | "privacy" | "cookies" | "cancellation"> = {
  "collaboration": {
    "navLabel": "Chat, họp và gọi video",
    "eyebrow": "Kết nối đội nhóm",
    "title": "Trao đổi cùng nhau. Tiến việc cùng nhau.",
    "description": "Nhắn tin để làm rõ, họp để thống nhất và gọi video để cùng giải quyết. Giữ bước tiếp theo ngay trong không gian làm việc của nhóm.",
    "sections": [
      {
        "heading": "Cuộc trao đổi có bối cảnh",
        "body": [
          "Chọn trò chuyện trực tiếp, nhóm hoặc dự án theo đúng người cần tham gia. Giữ quyết định bên cạnh dự án và công việc liên quan, để mỗi tin nhắn không trở thành một nơi khác phải tìm lại."
        ]
      },
      {
        "heading": "Cuộc họp có mục đích rõ ràng",
        "body": [
          "Đặt tên cuộc họp dễ hiểu, chọn đúng người tham gia và kiểm tra ngày giờ trước khi gửi. Ghi rõ chủ đề và điều cần thống nhất để mọi người có thể chuẩn bị."
        ]
      },
      {
        "heading": "Gọi video khi cần cùng giải quyết",
        "body": [
          "Khi workspace có tính năng video, tham gia từ cuộc họp và chỉ cấp quyền camera hoặc microphone khi cần sử dụng. Khả năng truy cập tính năng phụ thuộc cấu hình của workspace."
        ]
      },
      {
        "heading": "Biến thống nhất thành bước tiếp theo",
        "body": [
          "Tạo công việc đã thống nhất với người phụ trách và thời hạn, rồi theo dõi trong Việc đã giao hoặc Việc của tôi. Nếu có bản tóm tắt AI, hãy đối chiếu với cuộc trao đổi trước khi sử dụng kết luận."
        ],
        "links": [
          {
            "page": "natural-language-tasks"
          },
          {
            "page": "delegated-work"
          },
          {
            "page": "security"
          }
        ]
      }
    ]
  },
  "help-center": {
    "navLabel": "Trung tâm trợ giúp",
    "eyebrow": "Trung tâm trợ giúp",
    "title": "Tìm hướng dẫn cho bước tiếp theo.",
    "description": "Hướng dẫn thực tế để bắt đầu, phối hợp với đội nhóm và quản lý những thiết lập quan trọng.",
    "sections": [
      {
        "heading": "Bắt đầu từ những điều cơ bản",
        "body": [
          "Tìm hiểu cách tạo việc đầu tiên, chọn người phụ trách và kiểm tra kết quả. Một yêu cầu rõ ràng giúp bước tiếp theo dễ dàng hơn."
        ],
        "links": [
          {
            "page": "getting-started"
          },
          {
            "page": "writing-tasks"
          },
          {
            "page": "faq"
          }
        ]
      },
      {
        "heading": "Phối hợp với đội nhóm",
        "body": [
          "Theo dõi việc đã giao, chọn chế độ xem phù hợp và giữ cuộc trao đổi gắn với công việc."
        ],
        "links": [
          {
            "page": "delegated-work"
          },
          {
            "page": "project-views"
          },
          {
            "page": "collaboration"
          }
        ]
      },
      {
        "heading": "Tài khoản, dữ liệu và lựa chọn của bạn",
        "body": [
          "Tìm hiểu điều khoản dịch vụ, cách sử dụng dữ liệu và cách đổi thiết lập quyền riêng tư trên website. Khi cần hỗ trợ tài khoản, liên hệ bộ phận hỗ trợ và không gửi mật khẩu hoặc mã truy cập."
        ],
        "links": [
          {
            "page": "contact"
          },
          {
            "page": "security"
          },
          {
            "page": "privacy"
          },
          {
            "page": "cookies"
          },
          {
            "page": "cancellation"
          }
        ]
      }
    ]
  },
  "security": {
    "navLabel": "Bảo mật và dữ liệu AI",
    "eyebrow": "Minh bạch và tin cậy",
    "title": "Hiểu rõ cách dữ liệu công việc được xử lý.",
    "description": "Những điều cần biết về quyền truy cập, xử lý AI và các lựa chọn giúp bạn sử dụng Elynto có trách nhiệm.",
    "sections": [
      {
        "heading": "Quyền truy cập bắt đầu từ đúng người",
        "body": [
          "Sử dụng tài khoản riêng và chỉ mời người cần truy cập workspace, dự án, cuộc trò chuyện hoặc cuộc họp. Rà soát thành viên khi trách nhiệm thay đổi; có tài khoản hoặc lời mời không đồng nghĩa được phép chia sẻ dữ liệu của người khác."
        ]
      },
      {
        "heading": "Một yêu cầu AI có thể chứa gì",
        "body": [
          "Để trả lời một yêu cầu AI, Elynto có thể gửi nội dung yêu cầu và ngữ cảnh công việc, dự án hoặc cuộc trao đổi liên quan tới nhà cung cấp mô hình của tính năng đó. Không đưa vào mật khẩu, thông tin xác thực thanh toán hoặc dữ liệu mà tổ chức chưa cho phép chia sẻ."
        ]
      },
      {
        "heading": "Kiểm tra kết quả AI",
        "body": [
          "AI có thể hiểu sai tên, ngày tháng hoặc ý định. Kiểm tra work card được tạo, xem lại bản nháp kế hoạch trước khi tạo dự án và đối chiếu bản tóm tắt với cuộc trao đổi gốc. Quy trình phê duyệt của tổ chức vẫn cần được tuân thủ."
        ]
      },
      {
        "heading": "Hạ tầng và nhà cung cấp dịch vụ",
        "body": [
          "Elynto sử dụng nhà cung cấp cho lưu trữ hạ tầng, danh tính, dữ liệu, liên lạc và AI khi các tính năng tương ứng được bật. Điều kiện xử lý và lưu giữ có thể khác nhau theo tính năng và cấu hình. Liên hệ hỗ trợ để nhận thông tin xử lý áp dụng cho việc sử dụng dịch vụ của bạn."
        ],
        "links": [
          {
            "page": "privacy"
          },
          {
            "page": "contact"
          }
        ]
      },
      {
        "heading": "Báo cáo vấn đề bảo mật",
        "body": [
          "Gửi email tới support@elynto.io với tiêu đề “Báo cáo bảo mật”. Nêu trang bị ảnh hưởng, bước tái hiện và tác động có thể xảy ra. Không gửi dữ liệu riêng của người khác, mật khẩu hoặc khóa bí mật; không tiếp tục thử nghiệm gây ảnh hưởng người dùng khác."
        ]
      },
      {
        "heading": "Yêu cầu xử lý dữ liệu của doanh nghiệp",
        "body": [
          "Nếu tổ chức cần thỏa thuận xử lý dữ liệu, thông tin nhà cung cấp hoặc bảng câu hỏi bảo mật, hãy liên hệ hỗ trợ trước khi đưa vào dữ liệu đòi hỏi thỏa thuận hợp đồng riêng."
        ],
        "links": [
          {
            "page": "contact"
          },
          {
            "page": "terms"
          }
        ]
      }
    ]
  },
  "terms": {
    "navLabel": "Điều khoản sử dụng",
    "eyebrow": "Pháp lý",
    "title": "Điều khoản sử dụng Elynto",
    "description": "Các điều kiện áp dụng khi sử dụng website và dịch vụ quản lý công việc Elynto.",
    "sections": [
      {
        "heading": "1. Phạm vi và việc chấp thuận",
        "body": [
          "Điều khoản này áp dụng cho website và ứng dụng Elynto. Chỉ sử dụng dịch vụ khi bạn có thẩm quyền; nếu thay mặt một tổ chức, cần bảo đảm bạn được phép chấp thuận điều kiện áp dụng cho tổ chức đó. Thỏa thuận riêng bằng văn bản được ưu tiên cho nội dung mà thỏa thuận đó quy định cụ thể."
        ]
      },
      {
        "heading": "2. Tài khoản và trách nhiệm trong workspace",
        "body": [
          "Cung cấp thông tin tài khoản chính xác, bảo vệ thông tin đăng nhập và rà soát quyền đã cấp cho người khác. Bạn chịu trách nhiệm đối với hoạt động được mình cho phép qua tài khoản. Báo sớm dấu hiệu truy cập trái phép tới support@elynto.io."
        ]
      },
      {
        "heading": "3. Nội dung của bạn",
        "body": [
          "Bạn giữ các quyền đối với nội dung mình cung cấp. Bạn cho phép Elynto và nhà cung cấp cần thiết xử lý nội dung để cung cấp, duy trì, bảo vệ dịch vụ và thực hiện yêu cầu của bạn. Bạn cần có quyền và sự cho phép phù hợp khi cung cấp hoặc chia sẻ nội dung."
        ]
      },
      {
        "heading": "4. Sử dụng phù hợp",
        "body": [
          "Không sử dụng Elynto để phát tán nội dung trái pháp luật, gian lận, quấy rối, phần mềm độc hại hoặc truy cập trái phép. Không gây gián đoạn dịch vụ, lạm dụng lời mời hoặc sử dụng dữ liệu của người khác khi chưa được phép. Tôn trọng quyền và sự riêng tư của các thành viên."
        ]
      },
      {
        "heading": "5. Tính năng có AI hỗ trợ",
        "body": [
          "Kết quả AI có thể thiếu hoặc không chính xác. Kiểm tra tên, ngày tháng, kế hoạch và bản tóm tắt trước khi sử dụng, đồng thời kiểm tra kết quả của lệnh tạo hoặc cập nhật công việc. Không coi kết quả AI là tư vấn chuyên môn pháp lý, y tế hoặc tài chính. Tính năng có thể phụ thuộc thiết lập workspace và dịch vụ bạn sử dụng."
        ],
        "links": [
          {
            "page": "security"
          }
        ]
      },
      {
        "heading": "6. Gói dịch vụ và thanh toán",
        "body": [
          "Giá, chu kỳ thanh toán, điều kiện gia hạn, giới hạn sử dụng và điều kiện dùng thử phải được hiển thị trước khi bạn xác nhận mua gói trả phí. Việc xem website không phải là cho phép thu tiền. Hãy giữ xác nhận giao dịch và thông tin gói áp dụng."
        ],
        "links": [
          {
            "page": "cancellation"
          }
        ]
      },
      {
        "heading": "7. Khả năng cung cấp, thay đổi và tạm ngừng",
        "body": [
          "Dịch vụ có thể thay đổi hoặc gián đoạn do bảo trì, sự cố kỹ thuật hay hoàn cảnh ngoài khả năng kiểm soát. Quyền truy cập có thể bị hạn chế để xử lý lạm dụng, rủi ro bảo mật hoặc nghĩa vụ pháp lý. Khi có thể và pháp luật cho phép, Elynto sẽ giải thích việc hạn chế đáng kể và cách liên hệ hỗ trợ."
        ]
      },
      {
        "heading": "8. Ngừng sử dụng và xử lý dữ liệu",
        "body": [
          "Ngừng sử dụng, hủy gói và yêu cầu xóa dữ liệu là những hành động khác nhau. Xem chính sách hủy và quyền riêng tư trước khi đóng tài khoản, đặc biệt khi thành viên khác còn cần nội dung trong workspace."
        ],
        "links": [
          {
            "page": "cancellation"
          },
          {
            "page": "privacy"
          }
        ]
      },
      {
        "heading": "9. Quyền, phản ánh và cập nhật",
        "body": [
          "Điều khoản này không loại trừ quyền hoặc trách nhiệm mà pháp luật áp dụng không cho phép loại trừ. Gửi câu hỏi hoặc khiếu nại tới support@elynto.io để các bên trước hết cùng tìm hướng giải quyết. Tranh chấp chưa giải quyết được thuộc cơ quan có thẩm quyền theo pháp luật áp dụng. Các thay đổi được nhận diện qua ngày cập nhật trên trang này."
        ]
      }
    ],
    "updatedAt": "2026-11-17"
  },
  "privacy": {
    "navLabel": "Quyền riêng tư",
    "eyebrow": "Pháp lý",
    "title": "Dữ liệu của bạn, mục đích rõ ràng.",
    "description": "Cách Elynto xử lý thông tin trên website và trong ứng dụng, cùng những lựa chọn và quyền của bạn.",
    "sections": [
      {
        "heading": "1. Phạm vi và liên hệ",
        "body": [
          "Chính sách này áp dụng cho website giới thiệu và ứng dụng Elynto. Liên hệ support@elynto.io khi có câu hỏi quyền riêng tư hoặc yêu cầu về dữ liệu. Nếu tổ chức của bạn quản lý workspace, tổ chức cũng quyết định cách sử dụng thông tin công việc của thành viên; một số yêu cầu cần có sự tham gia của tổ chức."
        ]
      },
      {
        "heading": "2. Thông tin được xử lý",
        "body": [
          "Tùy tính năng sử dụng, thông tin có thể gồm tài khoản và hồ sơ; thành viên và quyền trong workspace; công việc, dự án, tin nhắn và tệp đính kèm; thông tin cuộc họp và dữ liệu phương tiện cần cho cuộc gọi; yêu cầu AI và ngữ cảnh liên quan; thông tin giao dịch hoặc hỗ trợ bạn cung cấp. Nhật ký kỹ thuật có thể bao gồm thông tin mạng và thiết bị."
        ]
      },
      {
        "heading": "3. Mục đích và căn cứ xử lý",
        "body": [
          "Thông tin được xử lý để cung cấp tính năng bạn yêu cầu, quản lý truy cập, hỗ trợ người dùng, bảo vệ dịch vụ, xử lý giao dịch khi có và thực hiện nghĩa vụ pháp lý. Elynto xin sự đồng ý khi cần, bao gồm thống kê website không thiết yếu. Việc rút đồng ý không làm thay đổi tính hợp pháp của hoạt động đã được thực hiện trước đó."
        ]
      },
      {
        "heading": "4. Chia sẻ trong workspace",
        "body": [
          "Nội dung được sử dụng trong phạm vi người nhận và quyền truy cập của tính năng, chẳng hạn dự án, cuộc trò chuyện hoặc cuộc họp. Trước khi đưa vào thông tin về người khác, hãy bảo đảm bạn được phép chia sẻ với nhóm người đó. Rà soát lời mời và thành viên khi có người tham gia hoặc rời nhóm."
        ]
      },
      {
        "heading": "5. Nhà cung cấp và xử lý AI",
        "body": [
          "Nhà cung cấp có thể xử lý thông tin cần cho hạ tầng, danh tính, lưu trữ, liên lạc, thanh toán và AI. Tính năng AI có thể gửi yêu cầu và ngữ cảnh liên quan tới nhà cung cấp mô hình. Dữ liệu có thể được xử lý ngoài quốc gia của bạn. Điều kiện, địa điểm và thời hạn lưu phụ thuộc tính năng và thỏa thuận áp dụng; hãy yêu cầu thông tin trước khi gửi dữ liệu đòi hỏi thỏa thuận riêng."
        ],
        "links": [
          {
            "page": "security"
          },
          {
            "page": "contact"
          }
        ]
      },
      {
        "heading": "6. Thống kê website không thiết yếu",
        "body": [
          "Thống kê website chỉ bắt đầu sau khi bạn đồng ý. Dữ liệu gồm lượt xem trang, lượt bấm dùng thử/đăng nhập, các bước tạo việc, thời gian, thông tin khái quát về thiết bị/trình duyệt/hệ điều hành, quốc gia, website giới thiệu và nhãn chiến dịch. Mã trình duyệt và lượt truy cập ngẫu nhiên liên kết các sự kiện; đây là định danh giả danh, không phải khẳng định mọi dữ liệu đều ẩn danh. Bản ghi thống kê không lưu IP, chuỗi nhận diện trình duyệt đầy đủ, nội dung công việc, tên hoặc email. Nhật ký hạ tầng là phần riêng.",
          "Nếu bạn đến từ một quảng cáo hay bài đăng có nhãn chiến dịch (utm_) và đã cho phép thống kê, website giữ nhãn đó, trang bạn đến đầu tiên và tên miền trang đã dẫn bạn tới trong 30 ngày, rồi gắn vào liên kết tới ứng dụng Elynto khi bạn bấm Dùng thử miễn phí hoặc Đăng nhập, để Elynto biết chiến dịch nào đưa khách hàng tới. Khi chưa cho phép, website không lưu gì; liên kết chỉ mang theo nhãn chiến dịch có sẵn trong địa chỉ trang bạn vừa mở. Không lưu hay chuyển tiếp mã nhấp quảng cáo (như fbclid, gclid)."
        ],
        "links": [
          {
            "page": "cookies"
          }
        ]
      },
      {
        "heading": "7. Lưu giữ và xóa",
        "body": [
          "Thông tin dịch vụ được lưu cho mục đích cung cấp dịch vụ, xử lý yêu cầu và nghĩa vụ áp dụng. Thời hạn có thể phụ thuộc loại dữ liệu, chỉ dẫn của workspace và thỏa thuận với nhà cung cấp. Thống kê website được cấu hình hết hạn trong tối đa 400 ngày. Rút đồng ý thống kê sẽ gỡ mã trình duyệt và lượt truy cập trên trình duyệt đó, đồng thời dừng ghi nhận tiếp theo; thao tác này không tự xóa bản ghi cũ trên máy chủ. Liên hệ hỗ trợ khi cần truy cập hoặc xóa dữ liệu."
        ]
      },
      {
        "heading": "8. Quyền và yêu cầu của bạn",
        "body": [
          "Theo pháp luật áp dụng, bạn có thể yêu cầu được biết, truy cập, chỉnh sửa, xóa, hạn chế xử lý hoặc nhận bản sao dữ liệu, phản đối xử lý hay rút đồng ý. Gửi support@elynto.io thông tin tài khoản và loại yêu cầu. Elynto có thể cần xác minh danh tính phù hợp và sự tham gia của chủ workspace, đồng thời giải thích nghĩa vụ lưu giữ hoặc giới hạn áp dụng. Không gửi mật khẩu."
        ]
      },
      {
        "heading": "9. Lựa chọn trên trình duyệt và cập nhật",
        "body": [
          "Bạn có thể đổi lựa chọn thống kê bất cứ lúc nào qua Cài đặt quyền riêng tư ở chân trang. Do Not Track và Global Privacy Control sẽ chặn thống kê không thiết yếu kể cả khi trước đó đã đồng ý. Các điều khiển này áp dụng cho website, không áp dụng cho hồ sơ tài khoản hoặc bảo mật của ứng dụng. Ngày phía trên xác định phiên bản chính sách."
        ],
        "links": [
          {
            "page": "cookies"
          }
        ]
      }
    ],
    "updatedAt": "2026-11-17"
  },
  "cookies": {
    "navLabel": "Cookie",
    "eyebrow": "Pháp lý",
    "title": "Trình duyệt của bạn. Lựa chọn của bạn.",
    "description": "Thiết lập thiết yếu giúp website hoạt động. Thống kê không thiết yếu được tắt cho tới khi bạn đồng ý.",
    "sections": [
      {
        "heading": "Thiết lập thiết yếu",
        "body": [
          "Cookie elynto-lang ghi nhớ ngôn ngữ tối đa một năm, kèm bản sao trong localStorage. Giá trị có phiên bản elynto-stats-consent lưu lựa chọn thống kê. Giá trị cũ elynto-stats-optout bảo lưu lựa chọn từ chối trước đây. Các lựa chọn được giữ cho tới khi thay đổi hoặc dữ liệu trình duyệt được xóa. Chúng không được dùng cho quảng cáo."
        ]
      },
      {
        "heading": "Thống kê không thiết yếu",
        "body": [
          "Chỉ sau khi đồng ý, elynto-vid mới lưu mã trình duyệt ngẫu nhiên và elynto-visit xác định lượt truy cập hết hạn sau 30 phút không hoạt động. Mã trình duyệt được giữ tới khi bạn rút đồng ý hoặc xóa dữ liệu trình duyệt. Bản ghi sự kiện trên máy chủ hết hạn trong tối đa 400 ngày. Các mã này là định danh giả danh, không cần tên hay email để tạo.",
          "Cũng chỉ sau khi đồng ý, ely_attr lưu nhãn chiến dịch (utm_) của lần đầu bạn đến, trang đến đầu tiên và tên miền trang giới thiệu trong 30 ngày, để gắn vào liên kết tới ứng dụng Elynto. Rút đồng ý sẽ xóa mục này."
        ]
      },
      {
        "heading": "Đổi lựa chọn thống kê",
        "body": [
          "Cho phép hoặc dừng thống kê ở bên dưới. Từ chối không ngăn bạn xem website hay sử dụng phần trải nghiệm tương tác. Do Not Track hoặc Global Privacy Control được ưu tiên hơn lựa chọn đồng ý trước đó. Rút đồng ý cũng gỡ các mã thống kê khỏi trình duyệt này."
        ],
        "action": "statsOptOut"
      },
      {
        "heading": "Đặt lại ngôn ngữ",
        "body": [
          "Xóa ngôn ngữ đã lưu ở bên dưới. Lần truy cập sau không có tiền tố ngôn ngữ, website sẽ chọn tiếng Việt cho Việt Nam và tiếng Anh cho quốc gia khác; dùng ngôn ngữ trình duyệt khi không xác định được quốc gia."
        ],
        "action": "clearLanguage"
      },
      {
        "heading": "Lưu trữ của website và ứng dụng",
        "body": [
          "Danh mục này áp dụng cho website giới thiệu. Đăng nhập ứng dụng, bảo mật tài khoản và tính năng liên lạc được bật có thể có lưu trữ thiết yếu riêng. Các mục đích đó thuộc chính sách quyền riêng tư của dịch vụ; điều khiển thống kê trên trang này không đăng xuất bạn khỏi ứng dụng."
        ],
        "links": [
          {
            "page": "privacy"
          }
        ]
      }
    ],
    "updatedAt": "2026-11-17"
  },
  "cancellation": {
    "navLabel": "Hủy dịch vụ và hoàn tiền",
    "eyebrow": "Pháp lý",
    "title": "Hiểu rõ việc hủy trước khi quyết định.",
    "description": "Cách yêu cầu hủy, phản ánh vấn đề thanh toán và trao đổi về xử lý dữ liệu của bạn.",
    "sections": [
      {
        "heading": "Trước khi mua gói trả phí",
        "body": [
          "Kiểm tra giá, chu kỳ thanh toán, điều kiện gia hạn, giới hạn, điều kiện dùng thử và hoàn tiền hiển thị cùng đề nghị mua. Giữ lại các thông tin đó. Quyền bắt buộc của người tiêu dùng vẫn áp dụng dù nội dung gói được diễn đạt thế nào."
        ]
      },
      {
        "heading": "Yêu cầu hủy",
        "body": [
          "Sử dụng tùy chọn hủy đi kèm gói đăng ký, hoặc gửi support@elynto.io với tiêu đề “Yêu cầu hủy dịch vụ” và tài khoản hoặc workspace liên quan. Yêu cầu xác nhận ngày có hiệu lực và quyền truy cập còn lại. Không gửi số thẻ hoặc mật khẩu."
        ]
      },
      {
        "heading": "Hoàn tiền và phản ánh thanh toán",
        "body": [
          "Với khoản thu trùng, ngoài dự kiến hoặc có tranh chấp, gửi mã giao dịch, ngày, số tiền và mô tả ngắn. Yêu cầu được xem xét theo điều kiện mua, tình huống thực tế và pháp luật áp dụng. Việc hủy tự nó không bảo đảm được hoàn tiền, cũng không phải mặc nhiên từ chối hoàn tiền."
        ]
      },
      {
        "heading": "Hủy dịch vụ và dữ liệu là hai việc riêng",
        "body": [
          "Hủy gói trả phí không đồng nghĩa xóa tài khoản hoặc workspace. Trước khi ngừng sử dụng, cân nhắc dữ liệu nhóm còn cần. Nếu cần bản sao hoặc xóa dữ liệu, nêu yêu cầu riêng để kiểm tra quyền đối với dữ liệu và nghĩa vụ lưu giữ liên quan."
        ],
        "links": [
          {
            "page": "privacy"
          },
          {
            "page": "contact"
          }
        ]
      },
      {
        "heading": "Hỗ trợ cho yêu cầu",
        "body": [
          "Cung cấp địa chỉ email có thể nhận trả lời và giữ lại xác nhận. Nếu workspace do tổ chức quản lý, quản trị viên có thẩm quyền có thể cần gửi hoặc xác nhận yêu cầu."
        ]
      }
    ],
    "updatedAt": "2026-11-17"
  }
};
