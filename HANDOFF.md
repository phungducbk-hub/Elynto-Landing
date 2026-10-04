# Bàn giao — Landing page Elynto

## 1. Tình trạng

- Đã có landing page hoàn chỉnh, chạy được, đủ hai bản **Tiếng Việt** (`/vi`) và **English** (`/en`). Cách chạy và cấu hình xem [`README.md`](./README.md).
- Build production thành công. Lint và typecheck không lỗi. **39/39** test Playwright đạt trên desktop (1440×900) và mobile (Pixel 7).
- Chưa triển khai lên Vercel, chưa đổi DNS, chưa công khai.

## 2. Kiểm tra sản phẩm thật — vẫn chưa thực hiện được

Sau khi `beta.elynto.io` được thêm vào *Allowed domains*, phiên làm việc này vẫn bị proxy từ chối (`403 connect_rejected`, đã thử lại nhiều lần). Thay đổi cấu hình mạng thường chỉ có hiệu lực với **phiên/container mới**. Vì vậy:

- Chưa xem được giao diện, tính năng thật hay route đăng ký/đăng nhập của app.
- Mọi hình sản phẩm trên trang vẫn là **minh họa HTML**, có ghi chú “Minh họa / Illustration” ngay bên dưới, kèm nhãn “Minh họa / Illustrative demo” ở hero. Có thể thay bằng video/ảnh thật mà không phải sửa component (xem `src/config/media.ts`).
- Mô tả tính năng dựa trên brief, giữ ở mức brief đã nêu. Không chỉnh sửa gì ở app beta.

Bước tiếp theo: mở một phiên mới trong môi trường đã cấu hình (hướng dẫn: https://code.claude.com/docs/en/cloud-environments#network-access). Ở phiên đó có thể xem trang công khai (đăng nhập, đăng ký) để xác định route. Phần nằm sau màn hình đăng nhập thì không tự vượt qua; cần bạn gửi ảnh chụp/video hoặc một tài khoản demo với dữ liệu mẫu.

## 3. Cần xác minh trước khi công khai

### Bắt buộc (ảnh hưởng luồng chuyển đổi)

| # | Nội dung | Hiện trạng trên trang | Cần làm |
| --- | --- | --- | --- |
| 1 | **Route đăng ký** | Mọi nút “Dùng thử miễn phí” dẫn tới `https://beta.elynto.io` (URL gốc, không đoán `/signup`) | Cung cấp route chính thức → đặt `NEXT_PUBLIC_SIGNUP_URL` |
| 2 | **Có thật sự cho dùng thử miễn phí và tự đăng ký?** | CTA ghi “Dùng thử miễn phí / Start free trial” theo brief. Không nêu thời hạn, thẻ thanh toán hay giới hạn | Nếu beta chưa mở tự đăng ký hoặc chưa miễn phí, phải sửa CTA hoặc mở luồng đăng ký trước khi công khai |
| 3 | Route đăng nhập | “Đăng nhập” dẫn tới `https://beta.elynto.io` | Đặt `NEXT_PUBLIC_LOGIN_URL` nếu có route riêng |

### Tính năng đang được mô tả là đã có (theo brief)

| Nội dung | Vị trí trên trang |
| --- | --- |
| Viết một câu → Elynto tạo công việc, nhận ra **việc / người phụ trách / thời hạn** | Hero, “Tạo và giao việc”, FAQ |
| Công việc được lưu và **chỉnh sửa trực tiếp** sau khi tạo | “Tạo và giao việc”, FAQ |
| Giao việc cho người khác (dùng một mình hoặc theo nhóm) | “Tạo và giao việc”, “Dành cho ai”, FAQ |
| Viết yêu cầu bằng **tiếng Việt hoặc tiếng Anh** | FAQ “Elynto hỗ trợ tiếng Việt và tiếng Anh…”. Câu trả lời có nói rõ một số phần app có thể chưa đủ hai ngôn ngữ |
| **Lập kế hoạch dự án với AI**: mục tiêu → giai đoạn → công việc; người dùng **xem lại, chỉnh sửa trước khi tạo dự án** | Section riêng “Lập kế hoạch dự án với AI” |
| Màn hình **Hôm nay / Việc của tôi**: quá hạn, đến hạn hôm nay, sắp đến hạn, việc đánh dấu quan trọng | “Mỗi ngày” |
| Cách xem **Danh sách, Kanban, Lịch** (lịch = xem theo ngày đến hạn) | “Nhiều cách xem”, “Lợi ích” |
| Trạng thái “Cần làm / Đang làm / Đã xong” | Các minh họa |

Nhãn trong minh họa (“Hôm nay”, “Việc của tôi”, “Đang tạo công việc…”, tên trạng thái) là nhãn giả định. Hãy cho biết tên thật trong app để đồng bộ. Chữ nằm trong `src/content/*.ts`.

### Đang ẩn, chờ xác nhận

- **Timeline** và **Gantt** (kèm mốc quan trọng và liên kết giữa công việc) đã dựng xong nhưng **tắt mặc định**. Bật bằng `NEXT_PUBLIC_FEATURE_PROJECT_TIMELINE=true` / `NEXT_PUBLIC_FEATURE_PROJECT_GANTT=true` khi đã chạy thật. Đoạn mô tả đi kèm sẽ tự hiện.

### Cố ý không nhắc tới

Tự sắp lịch, AI tự ưu tiên hoặc tự điều phối, chat/video call, tích hợp bên thứ ba, thông báo/nhắc việc, nhập bằng giọng nói, kéo-thả, giá, thời hạn trial, thẻ thanh toán, bảo mật, số người dùng, testimonial, logo khách hàng, số liệu năng suất.

## 4. Asset minh họa và tài nguyên còn thiếu

| Asset | Hiện dùng | Đề xuất thay |
| --- | --- | --- |
| Demo hero (một câu → công việc) | Chuỗi CSS ~4,5 giây chạy một lần, nhãn “Minh họa” | Video thật VI + EN, 10–15 giây, tắt tiếng, MP4 dưới 2 MB, kèm poster. Khai báo ở `productMedia.heroDemo` |
| Tạo và giao việc | Bảng minh họa “Bạn viết / Elynto tạo” với 3 câu mẫu | Ảnh chụp thật → `productMedia.command` |
| Lập kế hoạch với AI | Minh họa bản nháp kế hoạch | Ảnh chụp màn hình review kế hoạch → `productMedia.planning` |
| Hôm nay / Việc của tôi | Minh họa | Ảnh chụp thật → `productMedia.today` |
| Danh sách / Kanban / Lịch / Timeline / Gantt | Minh họa dạng tab | Giữ minh họa hoặc thay từng panel bằng ảnh |
| Logo | SVG **dựng lại từ ảnh .webp** được cung cấp (`public/brand/`) | File vector gốc chính thức |
| Màu thương hiệu | Navy `#142D47` lấy mẫu từ logo; các màu khác là token tạm | Bảng màu chính thức (sửa trong `globals.css`) |
| Font | Mona Sans (biến thể độ rộng, hỗ trợ tiếng Việt, SIL OFL) | Xác nhận hoặc thay bằng font thương hiệu |

Khi quay hoặc chụp màn hình, chỉ dùng dữ liệu mẫu. Không đưa tên, email hay công việc của khách hàng thật vào.

## 5. Lựa chọn thiết kế (bản 2, theo skill `frontend-design`)

Skill được cài vào repo tại `.claude/skills/frontend-design/` (nguồn: `anthropics/skills`, giấy phép Apache 2.0) để các lần chỉnh sửa sau dùng cùng một chuẩn.

**Ý tưởng.** “The interface between you and your work”: một câu nói thường được **đánh dấu như bằng bút dạ quang**, rồi từng phần được nối xuống thành các ô của công việc theo trật tự **Ai làm → Làm gì → Khi nào xong**, đúng câu “Rõ ai làm gì, khi nào xong” của brief. Đây là điểm nhấn duy nhất của trang; mọi phần khác giữ tĩnh và kỷ luật.

**Token.**

| Tên | Giá trị | Vai trò |
| --- | --- | --- |
| Navy | `#142D47` | Logo, tiêu đề, CTA (lấy mẫu từ logo) |
| Paper | `#FFFFFF` | Nền chính |
| Fog | `#F0F3F7` | Nền dải section và sân khấu demo |
| Rule | `#D9E0E8` | Đường kẻ mảnh |
| Marker | `#FFDF4F` | Màu nhấn duy nhất, chỉ dùng cho phần câu mà Elynto đọc ra |

**Chữ.** Mona Sans, một họ chữ biến thể có trục độ rộng: tiêu đề dùng bản rộng 112–116%, đậm; thân chữ dùng độ rộng thường. Font được chọn sau khi so sánh bảng mẫu tiếng Việt của 8 họ chữ. Geologica và Commissioner đặt dấu hỏi trên “ể” bị lệch; Be Vietnam Pro (bản 1) ổn nhưng ít cá tính ở cỡ lớn. Thang cỡ chữ theo thang cổ điển 16/18/21/24/30/36/48/60/72/80; tiêu đề tiếng Việt giữ line-height ≥ 1.12 để dấu không chạm dòng trên.

**Chuyển động.** Chỉ một khoảnh khắc: demo ở hero chạy **một lần** (~4,5 giây) khi vào tầm nhìn rồi dừng ở công việc đã tạo, có nút tạm dừng và xem lại. Chuỗi được viết bằng CSS, trạng thái tự nhiên là khung hình cuối, nên hiển thị đúng khi chưa có JS và khi bật giảm chuyển động. Đường nối được JS đo vị trí và đồng bộ với đồng hồ của CSS. Không có hiệu ứng trượt vào cho từng section.

**Đã bỏ so với bản 1** (đều là dấu hiệu “trang làm sẵn” mà skill cảnh báo):
- nhãn nhỏ phía trên mọi tiêu đề, thay bằng tên tính năng đặt ở đầu đoạn văn (“**Lập kế hoạch dự án với AI.** Nhập mục tiêu…”);
- nhãn chữ in hoa, chuỗi “A · B”, nhãn kiểu “Elynto — …”, mũi tên → trong nút;
- khung giả cửa sổ app có pill “MINH HỌA” trên mọi hình;
- các hàng card giống nhau có icon (Lợi ích giờ là danh sách định nghĩa có đường kẻ, Dành cho ai là ba cột chữ kèm câu ví dụ);
- khối CTA navy ở cuối trang; animation lặp vô hạn.

**Đánh số** chỉ dùng ở nơi nội dung thật sự là trình tự: 3 bước lập kế hoạch và 3 giai đoạn của dự án.

**Câu chữ**: giữ như bản 1, bỏ các dấu gạch ngang trang trí. “Nói việc cần làm” vẫn được thay bằng “Chỉ cần mô tả việc cần làm” để không gợi ý nhập bằng giọng nói. Mẹo “nêu rõ việc gì, ai làm, khi nào xong” vẫn được giữ.

## 6. Đã kiểm tra

- `npm run build` thành công; `/vi`, `/en` và ảnh Open Graph được tạo tĩnh lúc build.
- `npm run lint`: 0 lỗi, 0 cảnh báo. `npm run typecheck`: đạt.
- `npm run test:e2e`: 39 test đạt, 1 test chỉ dành cho mobile được bỏ qua trên desktop:
  - chuyển hướng `/` theo Accept-Language, lựa chọn đã lưu thắng ngôn ngữ trình duyệt, trang 404 song ngữ;
  - hero chứa định vị và vision, mọi CTA đăng ký trỏ đúng URL, demo có nhãn minh họa;
  - metadata và ảnh OG theo từng ngôn ngữ;
  - nút “Xem Elynto hoạt động” phát lại demo; demo tạm dừng/tiếp tục được, chạy một lần rồi dừng ở “Đã tạo công việc”;
  - FAQ, tab (chuột và bàn phím), menu mobile (Escape trả focus), đổi ngôn ngữ và ghi nhớ;
  - sự kiện CTA được đẩy vào `dataLayer`;
  - axe: không có lỗi truy cập mức *serious/critical*;
  - không tràn ngang, không lỗi console.
- Giảm chuyển động: demo hiển thị ngay công việc đã tạo, không có animation đang chạy, không hiện nút điều khiển.
- Đã xem ảnh chụp toàn trang desktop và mobile cho cả hai ngôn ngữ và từng khung hình của chuỗi chuyển động. Đường nối giữ đúng trạng thái khi đổi kích thước cửa sổ qua breakpoint.
- Không có lỗi hay cảnh báo console ở chế độ dev (kiểm tra hydration).
- JS tải lần đầu khoảng 170 KB gzip, phần lớn là React/Next; code của trang khoảng 17 KB gzip. Các section bên dưới không dùng ảnh nặng.

## 7. Ghi chú kỹ thuật

- `npm audit` báo 5 lỗ hổng mức *high* trong chuỗi công cụ lint chỉ dùng khi phát triển (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`). Không đi vào code chạy trên trình duyệt. Có thể nâng cấp khi `eslint-config-next` phát hành bản sửa.
- `next/font/google` tải font lúc build. Vercel làm được việc này; build ở máy không có mạng sẽ lỗi.
- Năm trong footer được tính lúc build.
- `AGENTS.md` / `CLAUDE.md` do `next dev` (Next.js 16) tự tạo, giữ lại để cây code không bị thay đổi ngoài ý muốn.
