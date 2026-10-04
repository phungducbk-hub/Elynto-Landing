# Bàn giao — Landing page Elynto

## 1. Tình trạng

- Trang đang dùng **thiết kế và câu chữ của bản đầu** (Be Vietnam Pro, nền trắng ấm, hero chia đôi có demo), cộng thêm **hai hình dựng lại từ giao diện beta thật**: “Việc đã giao” và trang dự án (Danh sách / Lịch / Gantt).
- Các bản khác vẫn còn trong lịch sử git để tham khảo hoặc lấy lại từng phần: `580dae7` (thiết kế lại theo skill frontend-design), `cc03398` (câu chữ theo nghiên cứu khách hàng + toàn bộ hình dựng lại).
- Đủ hai bản **Tiếng Việt** (`/vi`) và **English** (`/en`). Cách chạy và cấu hình xem [`README.md`](./README.md).
- Build production thành công. Lint và typecheck không lỗi. **39/39** test Playwright đạt trên desktop (1440×900) và mobile (Pixel 7).
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

## 3. Kiểm tra sản phẩm

Phiên này vẫn không truy cập được `beta.elynto.io` (proxy từ chối). Thông tin về giao diện thật lấy từ 5 ảnh chụp bạn gửi. Không chỉnh sửa gì ở app beta.

## 4. Cần xác minh trước khi công khai

### Bắt buộc (ảnh hưởng luồng chuyển đổi)

| # | Nội dung | Hiện trạng trên trang | Cần làm |
| --- | --- | --- | --- |
| 1 | **Route đăng ký** | Mọi nút “Dùng thử miễn phí” dẫn tới `https://beta.elynto.io` (URL gốc, không đoán `/signup`) | Cung cấp route chính thức → đặt `NEXT_PUBLIC_SIGNUP_URL` |
| 2 | **Có thật sự cho dùng thử miễn phí và tự đăng ký?** | CTA ghi “Dùng thử miễn phí / Start free trial” theo brief. Không nêu thời hạn, thẻ thanh toán hay giới hạn | Nếu beta chưa mở tự đăng ký hoặc chưa miễn phí, phải sửa CTA hoặc mở luồng đăng ký trước khi công khai |
| 3 | Route đăng nhập | “Đăng nhập” dẫn tới `https://beta.elynto.io` | Đặt `NEXT_PUBLIC_LOGIN_URL` nếu có route riêng |

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

Tự sắp lịch, AI tự ưu tiên hoặc tự điều phối, chat/video call, tích hợp bên thứ ba, thông báo/nhắc việc, nhập bằng giọng nói, giá, thời hạn trial, thẻ thanh toán, bảo mật, số người dùng, testimonial, logo khách hàng, số liệu năng suất.

### Asset có thể bổ sung

| Asset | Hiện dùng | Đề xuất |
| --- | --- | --- |
| Demo hero | Animation HTML ~10 giây, nhãn “Minh họa” | Video thật VI + EN, 10–15 giây, tắt tiếng, kèm poster → `productMedia.heroDemo` |
| Tạo và giao việc, Kế hoạch AI, Hôm nay | Minh họa HTML | Ảnh chụp thật → `productMedia.command / planning / today` |
| Việc đã giao, Trang dự án | Giao diện dựng lại từ ảnh beta | Giữ, hoặc thay bằng ảnh thật → `productMedia.delegate / project` |
| Logo | SVG dựng lại từ ảnh .webp | File vector gốc |
| Màu, font | Token tạm, Be Vietnam Pro | Xác nhận bộ nhận diện chính thức |

Khi quay hoặc chụp màn hình, chỉ dùng dữ liệu mẫu.

## 5. Lựa chọn thiết kế và thông điệp (bản đầu)

- **5 giây đầu**: H1 gồm dòng mô tả theo ngôn ngữ đang chọn (“Elynto — Quản lý công việc bằng AI”) và câu vision tiếng Anh nổi bật “The interface between you and your work”. Ngay dưới là câu giải thích lợi ích và hai CTA. Bên phải là demo đang hiển thị sẵn kết quả: một công việc có tên, người phụ trách, thời hạn.
- **Gộp “Demo chủ đạo” vào hero**: demo chính nằm ngay trong màn hình đầu thay vì lặp lại thành một section riêng. “Xem Elynto hoạt động” cuộn tới demo và phát lại từ đầu. Trên mobile, demo nằm ngay sau CTA.
- **Demo**: mở đầu bằng kết quả cuối (hiểu ngay giá trị), sau đó lặp lại chuỗi gõ câu → xử lý → tạo xong, khoảng 10 giây mỗi vòng. Tự dừng khi ra khỏi màn hình hoặc khi tab bị ẩn; có nút dừng/phát lại. Với người bật “giảm chuyển động”, demo đứng yên ở kết quả cho tới khi bấm phát. Phần này không phải ô chat, người xem không nhập được gì.
- **Lợi ích trước, tính năng sau**: Lợi ích (3 ý) → Cách hoạt động (4 tình huống) → Dành cho ai → FAQ → CTA cuối.
- **Lập kế hoạch với AI** có dải nền riêng, 3 bước và một ô nhấn mạnh “Xem lại và chỉnh sửa trước khi tạo dự án”, kèm ghi chú “quyết định cuối cùng thuộc về bạn”.
- **Không lặp hàng card**: Lợi ích dùng các cột ngăn bằng đường kẻ; “Dành cho ai” là một khối chia ba cột; CTA cuối là khối navy duy nhất trên nền sáng.
- **Câu chữ**: đổi “Nói việc cần làm” thành “Chỉ cần mô tả việc cần làm” để không gợi ý nhập bằng giọng nói. Giữ “Một câu nói. Công việc rõ người, rõ hạn.” vì demo cho thấy rõ là gõ chữ. Thêm mẹo “nêu rõ việc gì, ai làm, khi nào xong” để không ngụ ý AI hiểu mọi yêu cầu.
- **Typography**: Be Vietnam Pro, tăng nhẹ khoảng cách giữa từ (font gốc có khoảng trắng hẹp, dễ dính chữ ở những từ như “thử miễn”).

## 6. Đã kiểm tra

- `npm run build` thành công; `/vi`, `/en` và ảnh Open Graph được tạo tĩnh lúc build.
- `npm run lint`: 0 lỗi, 0 cảnh báo. `npm run typecheck`: đạt.
- `npm run test:e2e`: 39 test đạt, 1 test chỉ dành cho mobile được bỏ qua trên desktop:
  - chuyển hướng `/` theo Accept-Language, lựa chọn đã lưu thắng ngôn ngữ trình duyệt, trang 404 song ngữ;
  - hero chứa định vị và vision, mọi CTA đăng ký trỏ đúng URL, demo có nhãn minh họa;
  - metadata và ảnh OG theo từng ngôn ngữ;
  - nút “Xem Elynto hoạt động”, dừng/phát demo, FAQ, tab Danh sách/Lịch/Gantt của trang dự án (chuột và bàn phím), menu mobile (Escape trả focus), đổi ngôn ngữ và ghi nhớ;
  - sự kiện CTA được đẩy vào `dataLayer`;
  - axe: không có lỗi truy cập mức *serious/critical*;
  - không tràn ngang, không lỗi console.
- Đã xem ảnh chụp toàn trang desktop và mobile cho cả hai ngôn ngữ, hai hình mới ở cả hai cỡ màn hình, và từng tab Danh sách/Lịch/Gantt.
- Không có lỗi hay cảnh báo console ở chế độ dev (kiểm tra hydration).
- JS tải lần đầu khoảng 170 KB gzip, phần lớn là React/Next; code của trang khoảng 17 KB gzip. Các section bên dưới không dùng ảnh nặng.

## 7. Ghi chú kỹ thuật

- `npm audit` báo 5 lỗ hổng mức *high* trong chuỗi công cụ lint chỉ dùng khi phát triển (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`). Không đi vào code chạy trên trình duyệt. Có thể nâng cấp khi `eslint-config-next` phát hành bản sửa.
- `next/font/google` tải font lúc build. Vercel làm được việc này; build ở máy không có mạng sẽ lỗi.
- Năm trong footer được tính lúc build.
- `AGENTS.md` / `CLAUDE.md` do `next dev` (Next.js 16) tự tạo, giữ lại để cây code không bị thay đổi ngoài ý muốn.
