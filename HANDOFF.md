# Bàn giao — Landing page Elynto

## 1. Tình trạng

- Trang đang dùng **thiết kế và câu chữ của bản đầu** (Be Vietnam Pro, nền trắng ấm, hero chia đôi có demo), cộng thêm **hai hình dựng lại từ giao diện beta thật**: “Việc đã giao” và trang dự án (Danh sách / Lịch / Gantt).
- Các bản khác vẫn còn trong lịch sử git để tham khảo hoặc lấy lại từng phần: `580dae7` (thiết kế lại theo skill frontend-design), `cc03398` (câu chữ theo nghiên cứu khách hàng + toàn bộ hình dựng lại).
- Đã thêm khối **“Nghe có quen không?”** dùng component testimonial bạn gửi, đặt sau “Dành cho ai”, cùng **hiệu ứng trượt** cho chữ và hình trên toàn trang (xem mục 3).
- Đã thêm **footer 4 cột** và **12 trang con** song ngữ cho từng mục trong footer (xem mục 4).
- Đã thêm **thống kê truy cập** tự xây và trang xem số liệu `/stats` có mật khẩu (xem mục 5).
- Đủ hai bản **Tiếng Việt** (`/vi`) và **English** (`/en`). Cách chạy và cấu hình xem [`README.md`](./README.md).
- Build production thành công. Lint và typecheck không lỗi. **75** test Playwright đạt trên desktop (1440×900) và mobile (Pixel 7).
- Chưa triển khai lên Vercel, chưa đổi DNS, chưa công khai.

## 2. Hai hình dựa trên giao diện thật

| Hình | Vị trí | Dựa trên |
| --- | --- | --- |
| **Việc đã giao**: dải vòng đời Đã giao → Đã nhận → Đang làm → Đã nộp → Đã duyệt (và Làm lại), bảng việc đã giao có người nhận, hạn, trạng thái, dấu quá hạn | Tính năng mới “Theo dõi việc đã giao”, ngay sau “Việc cần làm bắt đầu từ một câu nói” | Bộ lọc trạng thái trong ảnh Lịch (Draft → Completed), mục Delegated ở sidebar, dấu Overdue |
| **Trang dự án**: sidebar thật, số liệu tiến độ, tình trạng dự án với “Phân tích với AI”, tab Danh sách theo giai đoạn / Lịch tháng / Gantt | Thay cho khối tab cũ ở “Từ việc hôm nay đến tiến độ cả dự án” | Ảnh trang tổng quan dự án, danh sách theo giai đoạn, lịch tháng, Gantt |

Dữ liệu trong hình là dữ liệu mẫu: không có “Phong Du”, “ALEX INC” hay tên thật nào. Nhãn trong hình là bản dịch tiếng Việt; ứng dụng beta hiện hiển thị phần lớn bằng tiếng Anh. Có thể thay bằng ảnh chụp thật qua `productMedia.delegate` và `productMedia.project` trong `src/config/media.ts`.

### Chỉnh nhỏ so với bản đầu để khớp giao diện thật

- Khối tab cũ (Danh sách, Kanban, Lịch, kèm Timeline/Gantt bị ẩn bằng cờ) được thay bằng trang dự án. **Kanban** không thấy trong ảnh nên không còn trên trang; cờ Timeline/Gantt được gỡ vì Gantt đã xác nhận.
- Lợi ích thứ ba đổi “danh sách, Kanban hoặc lịch” thành “danh sách, lịch hoặc Gantt”.
- Thẻ kết quả ở hero đổi trạng thái “Cần làm” thành “Đã giao”, vì app không có trạng thái “Cần làm”.
- Hai trường của thẻ “Đã tạo công việc” thật (“Giao cho”, “Ưu tiên”) chưa đưa vào hero bản đầu để giữ nguyên thiết kế bạn chọn.

## 3. Khối testimonial và hiệu ứng trượt

### Khối “Nghe có quen không?” (component testimonial)

- **Vị trí:** sau “Dành cho ai”, trước FAQ. Người xem vừa đọc Elynto dành cho ai thì gặp ngay những tình huống quen thuộc của chính nhóm đó, rồi tới FAQ và CTA cuối.
- **Nội dung:** brief ban đầu không cho dùng testimonial, và file nghiên cứu ghi rõ “không tạo lời chứng thực khách hàng và không gán các phát biểu minh họa cho người dùng Elynto”. Vì vậy khối này giữ thiết kế và chuyển động của component, nhưng không dùng tên, ảnh hay lời khen dựng sẵn. Thay vào đó là 9 tình huống tổng hợp từ nỗi đau trong nghiên cứu (giao việc rồi vẫn không chắc, khách hỏi tiến độ phải lục chat, sáng ra không biết làm gì trước…). Mỗi thẻ ghi thời điểm, câu nói ở ngôi thứ nhất và vai trò (Chủ nhóm dịch vụ, Freelancer nhiều dự án, Trưởng nhóm, Chủ doanh nghiệp nhỏ, Thành viên nhóm). Ngay dưới tiêu đề có dòng ghi chú: tình huống tổng hợp từ nghiên cứu, không phải lời của một khách hàng cụ thể.
- **Thay đổi so với component gốc:** dùng màu và font của trang. Vòng chạy chuyển sang CSS, nên tự dừng khi rê chuột và có nút “Tạm dừng chuyển động” (WCAG 2.2.2). Bản sao dùng để nối vòng được ẩn khỏi trình đọc màn hình. Thẻ không còn nhận focus bằng phím Tab. Người bật giảm chuyển động thấy lưới thẻ đứng yên. Màn hình nào cũng hiển thị đủ 9 thẻ: mobile một cột, tablet hai cột, desktop ba cột. Bản gốc chỉ hiện 3 thẻ trên mobile và 6 thẻ trên tablet. Bỏ nút đổi giao diện tối, ảnh và dữ liệu ERP mẫu.
- **Khi có lời nhận xét thật** (đã được khách đồng ý cho đăng): thay `voices.items` trong `src/content/vi.ts` / `en.ts`, đổi tiêu đề và bỏ dòng ghi chú.

### Hiệu ứng trượt

- **Hero:** khi tải trang, nhãn, câu vision, mô tả và CTA lần lượt trượt lên, mỗi dòng cách nhau 80 ms. Khung demo trượt vào từ bên phải; trên mobile thì trượt lên.
- **Câu vision ở hero:** chia ba dòng: “The interface” (màu xanh `#2c5281`, khác màu navy của phần còn lại) / “between” / “[you | your team] and work”. Chữ trong pill đổi qua lại giữa “you” (nền xanh nhạt) và “your team” (nền xanh ngọc nhạt, cùng tông màu dùng cho người phụ trách trong các hình). Chữ cũ cuộn lên, chữ mới cuộn vào, pill đổi màu và co giãn theo độ dài chữ, kéo “and work” đi theo. Hiệu ứng chỉ chạy khi hero đang trên màn hình. Người bật giảm chuyển động thấy “you” đứng yên. Trình đọc màn hình nhận câu “The interface between you and work”.
- **Câu vision đầy đủ** “The interface between you and your work” vẫn dùng ở title trang, ảnh chia sẻ mạng xã hội và footer. Nếu muốn đổi sang “you and work” ở mọi nơi, chỉ cần sửa `vision` trong `src/config/site.ts`.
- **Cỡ chữ hero:** tự co theo độ rộng cột để dòng 3 luôn nằm trên một dòng: khoảng 56 px ở desktop, 49 px ở màn hình 1024 px, 36 px trên điện thoại 390 px (ba dòng như desktop). Cột chữ rộng hơn cột demo một chút. Chữ đổi liên tục nên chưa đạt WCAG 2.2.2 ở mức nghiêm ngặt nhất (chưa có nút dừng). Nếu cần, có thể cho pill dừng ở “you” sau vài vòng.
- **Khi cuộn:** tiêu đề và đoạn chữ trượt lên theo thứ tự eyebrow → tiêu đề → mô tả → các ý. Hình sản phẩm (demo ở hero, các hình tính năng, kế hoạch AI, trang dự án) trượt rất nhẹ: lệch 1–1,5rem, phóng từ 98,5%, kéo dài khoảng 2,2 giây và bắt đầu sau chữ một nhịp. Các hình bên cạnh chữ trượt vào từ phía nó đứng (trái hoặc phải). Tường tình huống vừa trượt lên vừa phóng nhẹ từ 97%. Các thẻ lợi ích, đối tượng và bước kế hoạch hiện lần lượt. Khối CTA cuối phóng nhẹ, chữ bên trong theo sau.
- **Nhịp:** chữ dùng đường cong chậm dần (`cubic-bezier(0.16, 1, 0.3, 1)`), dài 0,7–1 giây; hình dùng đường cong mềm hơn (`cubic-bezier(0.22, 1, 0.36, 1)`), dài 1,4–2,2 giây. Mỗi phần tử chỉ chạy một lần, không lặp lại khi cuộn lên.
- **An toàn:** chỉ ẩn trước khi hiện nếu trình duyệt cho phép chuyển động. Không có JavaScript, bật giảm chuyển động, in trang, hoặc JavaScript chưa chạy sau 4 giây thì nội dung đều hiện đầy đủ. Không gây tràn ngang và không ảnh hưởng SEO, vì nội dung vẫn nằm trong HTML.

## 4. Footer và trang con

Footer làm theo bố cục mẫu: logo, câu vision và nút dùng thử ở bên trái, các cột liên kết ở bên phải, hàng dưới cùng có bản quyền, liên kết pháp lý và nút đổi ngôn ngữ. Mỗi liên kết dẫn tới một trang con, có đủ tiếng Việt và tiếng Anh.

| Cột | Trang | Nội dung |
| --- | --- | --- |
| Sản phẩm | Tạo việc bằng câu nói · Theo dõi việc đã giao · Hôm nay & Việc của tôi · Lập kế hoạch với AI (nhãn “AI”) · Danh sách, Lịch, Gantt (cùng thứ tự với trang chủ) | Mỗi trang có phần giới thiệu, hình minh họa dùng lại từ trang chủ và 3–4 ý chính |
| Tài nguyên | Hướng dẫn bắt đầu · Viết yêu cầu hiệu quả · Câu hỏi thường gặp | 6 bước làm quen; cách viết câu để Elynto hiểu đúng; FAQ của trang chủ |
| Công ty | Về Elynto · Liên hệ | Tầm nhìn, cách Elynto được làm ra, dành cho ai, giai đoạn beta; trang liên hệ lấy email từ `NEXT_PUBLIC_CONTACT_EMAIL` |
| Pháp lý | Quyền riêng tư · Cookie | Mô tả đúng những gì website này lưu (một cookie `elynto-lang`); trang Cookie có nút xóa lựa chọn đã lưu |

**Đã lược bỏ so với mẫu:**
- Time Tracking, Resource Allocation, Automation: chưa thấy trong beta.
- Blog, Webinars, Case Studies, Documentation: chưa có nội dung; case study sẽ phải bịa.
- Careers, Partners, Press: không có thông tin.
- Terms of Service, Security: cần văn bản pháp lý thật hoặc thông tin bảo mật đã xác minh.
- Cả cột Community.
- Nhãn “Pro” / “New” / “Hiring”: chưa có thông tin gói giá hay tuyển dụng.
- Biểu tượng mạng xã hội: chưa biết tài khoản chính thức.

Ở vị trí biểu tượng mạng xã hội, footer đặt nút “Dùng thử miễn phí” và “Đăng nhập”.

## 5. Thống kê truy cập

- **Trang xem số liệu:** `/stats`, có mật khẩu (`STATS_PASSWORD`), không bị công cụ tìm kiếm index. Cách cài đặt, các biến môi trường và cách đếm xem trong README, mục “Thống kê truy cập”.
- **Số liệu theo ngày, tháng, năm:**
  - người truy cập, lượt truy cập, lượt xem trang;
  - lượt bấm “Dùng thử miễn phí” và “Đăng nhập” (kèm số người bấm và vị trí nút), tỷ lệ bấm dùng thử;
  - người mới và người quay lại, tỷ lệ thoát;
  - thiết bị, trình duyệt, hệ điều hành, quốc gia, nguồn truy cập, chiến dịch UTM, trang được xem, ngôn ngữ;
  - so sánh với kỳ trước và tải CSV.
- **Cách đếm người truy cập:** mỗi trình duyệt có một mã ngẫu nhiên. Vào nhiều lần, nhiều ngày vẫn là 1 người. Một người dùng hai thiết bị là 2 người.
- **Quyền riêng tư:**
  - Không lưu IP hay user agent đầy đủ.
  - Không đếm bot, trình duyệt bật Do Not Track hoặc GPC.
  - Người xem tắt được thống kê trên trang Cookie.
  - Dữ liệu tự xóa sau 400 ngày (trên Redis).
  - Trang Quyền riêng tư và Cookie đã được cập nhật để mô tả đúng những điều trên.
- **Cần làm trên Vercel:**
  1. Đặt `STATS_PASSWORD`.
  2. Kết nối Upstash for Redis từ Vercel Marketplace.
  3. Redeploy.

## 6. Kiểm tra sản phẩm

Phiên này vẫn không truy cập được `beta.elynto.io` (proxy từ chối). Thông tin về giao diện thật lấy từ 5 ảnh chụp bạn gửi. Không chỉnh sửa gì ở app beta.

## 7. Cần xác minh trước khi công khai

### Bắt buộc (ảnh hưởng luồng chuyển đổi)

| # | Nội dung | Hiện trạng trên trang | Cần làm |
| --- | --- | --- | --- |
| 1 | **Route đăng ký** | Mọi nút “Dùng thử miễn phí” dẫn tới `https://beta.elynto.io` (URL gốc, không đoán `/signup`) | Cung cấp route chính thức → đặt `NEXT_PUBLIC_SIGNUP_URL` |
| 2 | **Có thật sự cho dùng thử miễn phí và tự đăng ký?** | CTA ghi “Dùng thử miễn phí / Start free trial” theo brief. Không nêu thời hạn, thẻ thanh toán hay giới hạn | Nếu beta chưa mở tự đăng ký hoặc chưa miễn phí, phải sửa CTA hoặc mở luồng đăng ký trước khi công khai |
| 3 | Route đăng nhập | “Đăng nhập” dẫn tới `https://beta.elynto.io` | Đặt `NEXT_PUBLIC_LOGIN_URL` nếu có route riêng |
| 4 | **“Chỉ trong 10 giây”** ở tiêu đề phần lập kế hoạch AI | Thêm theo yêu cầu | Đo thời gian AI tạo bản nháp kế hoạch trên beta. Nếu thường lâu hơn 10 giây, nên đổi con số hoặc bỏ |
| 5 | **Email liên hệ** | Trang Liên hệ ghi “Kênh liên hệ chính thức sẽ được cập nhật tại đây” | Cung cấp email chính thức → đặt `NEXT_PUBLIC_CONTACT_EMAIL` |
| 6 | **Trang Quyền riêng tư và Cookie** | Mô tả đúng hành vi hiện tại: cookie ngôn ngữ, thống kê truy cập ẩn danh của chính website, không có công cụ đo lường bên thứ ba | Nhờ người phụ trách pháp lý rà soát. Nếu sau này gắn Google Tag Manager hay công cụ đo lường khác, phải cập nhật hai trang này |
| 7 | **Điều khoản sử dụng, chính sách của ứng dụng** | Chưa có trên website | Khi có văn bản chính thức, thêm trang vào cột Pháp lý |
| 8 | **Thống kê truy cập và sự đồng ý** | Website ghi nhận thống kê khi có truy cập; người xem tắt được trên trang Cookie; Do Not Track/GPC được tôn trọng | Nhờ người phụ trách pháp lý xác nhận có cần hỏi ý kiến người xem trước khi ghi nhận hay không (ví dụ theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, hoặc GDPR nếu có khách ở châu Âu). Nếu cần, có thể thêm thanh thông báo xin đồng ý |
| 9 | **Cài đặt thống kê trên Vercel** | Chưa có `STATS_PASSWORD` và Upstash Redis | Đặt mật khẩu, kết nối Upstash for Redis, redeploy (README, mục Thống kê truy cập) |

### Đã thấy trong ảnh giao diện

Tạo việc bằng câu nói (Giao cho, Hạn có giờ, Ưu tiên, nút Mở công việc); 8 trạng thái Draft, Assigned, Accepted, In progress, Submitted, Rework, Approved, Completed; đánh dấu quá hạn; sidebar Today, Inbox, My Work, Delegated, Projects, Team, Reports, Knowledge; dự án có giai đoạn, ngày bắt đầu/hạn, ưu tiên; trang tổng quan có tiến độ, quá hạn, lịch trình, Project health, Analyse with AI; Milestones; xem dạng List, Calendar, Gantt; kéo thả thanh Gantt.

### Vẫn dựa trên brief, chưa thấy trong ảnh

| Nội dung | Vị trí |
| --- | --- |
| AI lập kế hoạch có bước **xem lại, chỉnh sửa trước khi tạo dự án** | Phần lập kế hoạch AI |
| Nội dung màn hình **Hôm nay** (quá hạn, đến hạn, sắp đến hạn, việc quan trọng) | Phần “Mỗi ngày” |
| Nội dung của mục **Việc đã giao** và ai chuyển việc sang Đã nhận / Đã nộp | Phần “Theo dõi việc đã giao” |
| Viết yêu cầu bằng **tiếng Anh** | FAQ ngôn ngữ |

### Cố ý không nhắc tới

Tự sắp lịch, AI tự ưu tiên hoặc tự điều phối, chat/video call, tích hợp bên thứ ba, thông báo/nhắc việc, nhập bằng giọng nói, giá, thời hạn trial, thẻ thanh toán, bảo mật, số người dùng, lời chứng thực của khách hàng (khối tình huống ghi rõ là tổng hợp từ nghiên cứu), logo khách hàng, số liệu năng suất.

### Asset có thể bổ sung

| Asset | Hiện dùng | Đề xuất |
| --- | --- | --- |
| Demo hero | Animation HTML ~10 giây, nhãn “Minh họa” | Video thật VI + EN, 10–15 giây, tắt tiếng, kèm poster → `productMedia.heroDemo` |
| Tạo và giao việc, Kế hoạch AI, Hôm nay | Minh họa HTML | Ảnh chụp thật → `productMedia.command / planning / today` |
| Việc đã giao, Trang dự án | Giao diện dựng lại từ ảnh beta | Giữ, hoặc thay bằng ảnh thật → `productMedia.delegate / project` |
| Khối “Nghe có quen không?” | Tình huống tổng hợp từ nghiên cứu, ghi theo vai trò | Lời nhận xét thật của người dùng beta, có đồng ý đăng → `voices.items` |
| Logo | SVG dựng lại từ ảnh .webp | File vector gốc |
| Màu, font | Token tạm, Be Vietnam Pro | Xác nhận bộ nhận diện chính thức |

Khi quay hoặc chụp màn hình, chỉ dùng dữ liệu mẫu.

## 8. Lựa chọn thiết kế và thông điệp (bản đầu)

- **5 giây đầu**: H1 gồm dòng mô tả theo ngôn ngữ đang chọn (“Elynto — Quản lý công việc bằng AI”) và câu vision tiếng Anh nổi bật “The interface between you and your work”. Ngay dưới là câu giải thích lợi ích và hai CTA. Bên phải là demo đang hiển thị sẵn kết quả: một công việc có tên, người phụ trách, thời hạn.
- **Gộp “Demo chủ đạo” vào hero**: demo chính nằm ngay trong màn hình đầu thay vì lặp lại thành một section riêng. “Xem Elynto hoạt động” cuộn tới demo và phát lại từ đầu. Trên mobile, demo nằm ngay sau CTA.
- **Demo**: mở đầu bằng kết quả cuối (hiểu ngay giá trị), sau đó lặp lại chuỗi gõ câu → xử lý → tạo xong, khoảng 10 giây mỗi vòng. Tự dừng khi ra khỏi màn hình hoặc khi tab bị ẩn; có nút dừng/phát lại. Với người bật “giảm chuyển động”, demo đứng yên ở kết quả cho tới khi bấm phát. Phần này không phải ô chat, người xem không nhập được gì.
- **Lợi ích trước, tính năng sau**: Lợi ích (3 ý) → Cách hoạt động → Dành cho ai → Nghe có quen không? → FAQ → CTA cuối. Trong “Cách hoạt động”, các tính năng đi theo một ngày làm việc: tạo và giao việc → theo dõi việc đã giao → Mỗi ngày → lập kế hoạch dự án với AI → theo dõi dự án. Hình và chữ đổi bên luân phiên trái/phải.
- **Lập kế hoạch với AI** có dải nền riêng, 3 bước và một ô nhấn mạnh “Xem lại và chỉnh sửa trước khi tạo dự án”, kèm ghi chú “quyết định cuối cùng thuộc về bạn”.
- **Không lặp hàng card**: Lợi ích dùng các cột ngăn bằng đường kẻ; “Dành cho ai” là một khối chia ba cột; CTA cuối là khối navy duy nhất trên nền sáng.
- **Câu chữ**: đổi “Nói việc cần làm” thành “Chỉ cần mô tả việc cần làm” để không gợi ý nhập bằng giọng nói. Giữ “Một câu nói. Công việc rõ người, rõ hạn.” vì demo cho thấy rõ là gõ chữ. Thêm mẹo “nêu rõ việc gì, ai làm, khi nào xong” để không ngụ ý AI hiểu mọi yêu cầu.
- **Typography**: Be Vietnam Pro, tăng nhẹ khoảng cách giữa từ (font gốc có khoảng trắng hẹp, dễ dính chữ ở những từ như “thử miễn”).

## 9. Đã kiểm tra

- `npm run build` thành công; `/vi`, `/en` và ảnh Open Graph được tạo tĩnh lúc build.
- `npm run lint`: 0 lỗi, 0 cảnh báo. `npm run typecheck`: đạt.
- `npm run test:e2e`: 75 test đạt, 1 test chỉ dành cho mobile được bỏ qua trên desktop:
  - chuyển hướng `/` theo Accept-Language, lựa chọn đã lưu thắng ngôn ngữ trình duyệt, trang 404 song ngữ;
  - hero chứa định vị và vision, mọi CTA đăng ký trỏ đúng URL, demo có nhãn minh họa;
  - metadata và ảnh OG theo từng ngôn ngữ;
  - nút “Xem Elynto hoạt động”, dừng/phát demo, FAQ, tab Danh sách/Lịch/Gantt của trang dự án (chuột và bàn phím), menu mobile (Escape trả focus), đổi ngôn ngữ và ghi nhớ;
  - sự kiện CTA được đẩy vào `dataLayer`;
  - khối tình huống: có dòng ghi chú, trình đọc màn hình chỉ thấy 9 thẻ, nút tạm dừng làm dừng chuyển động;
  - hiệu ứng trượt: phần tử chưa tới thì ẩn, cuộn tới thì hiện; khi bật giảm chuyển động thì mọi thứ hiện ngay, tường thẻ đứng yên;
  - footer: đủ 4 cột, 12 liên kết; mọi trang con trả về 200 ở cả hai ngôn ngữ, trang không tồn tại trả 404, sitemap có trang con;
  - trang con có title và canonical riêng, đổi ngôn ngữ vẫn ở đúng trang, nút xóa lựa chọn ngôn ngữ trên trang Cookie hoạt động;
  - thống kê: đếm 1 người dù vào nhiều lượt, nhiều ngày; nhóm theo ngày/tháng; nhận diện thiết bị, trình duyệt, hệ điều hành; lọc dữ liệu gửi lên; khoảng thời gian; lượt xem và lượt bấm được gửi đi và hiện trên `/stats`; sai mật khẩu bị từ chối; không đăng nhập thì không xem hay tải CSV được; tắt thống kê trên trang Cookie thì không gửi gì nữa;
  - axe: không có lỗi truy cập mức *serious/critical* trên trang chủ và 3 trang con, kiểm tra sau khi mọi phần tử đã hiện;
  - không tràn ngang, không lỗi console.
- Đã xem ảnh chụp toàn trang desktop và mobile cho cả hai ngôn ngữ, hai hình mới ở cả hai cỡ màn hình, và từng tab Danh sách/Lịch/Gantt.
- Không có lỗi hay cảnh báo console ở chế độ dev (kiểm tra hydration).
- JS tải lần đầu khoảng 222 KB gzip, phần lớn là React/Next. Khối tình huống cùng phần lõi framer-motion chiếm khoảng 16 KB; phần hiệu ứng của framer (~20 KB) được tải sau, không chặn trang. Hiệu ứng trượt chạy bằng CSS và chỉ thêm một script rất nhỏ. Các section bên dưới không dùng ảnh nặng.

## 10. Ghi chú kỹ thuật

- `npm audit` báo 5 lỗ hổng mức *high* trong chuỗi công cụ lint chỉ dùng khi phát triển (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`). Không đi vào code chạy trên trình duyệt. Có thể nâng cấp khi `eslint-config-next` phát hành bản sửa.
- `next/font/google` tải font lúc build. Vercel làm được việc này; build ở máy không có mạng sẽ lỗi.
- Năm trong footer được tính lúc build.
- `AGENTS.md` / `CLAUDE.md` do `next dev` (Next.js 16) tự tạo, giữ lại để cây code không bị thay đổi ngoài ý muốn.
