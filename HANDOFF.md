# Bàn giao — Landing page Elynto

## 1. Tình trạng

- Đã có landing page hoàn chỉnh, chạy được, đủ hai bản **Tiếng Việt** (`/vi`) và **English** (`/en`). Cách chạy và cấu hình xem [`README.md`](./README.md).
- Build production thành công. Lint và typecheck không lỗi. **39/39** test Playwright đạt trên desktop (1440×900) và mobile (Pixel 7).
- Chưa triển khai lên Vercel, chưa đổi DNS, chưa công khai.

## 2. Kiểm tra sản phẩm thật — không thực hiện được

Môi trường làm việc chặn truy cập tới `beta.elynto.io` (network policy). Vì vậy:

- Chưa xem được giao diện, tính năng thật hay route đăng ký/đăng nhập của app.
- Mọi hình sản phẩm trên trang là **minh họa HTML**, luôn gắn nhãn “Minh họa / Illustration / Illustrative demo”. Cấu trúc code cho phép thay bằng video/ảnh thật mà không phải sửa component (xem `src/config/media.ts`).
- Mô tả tính năng dựa trên brief, giữ ở mức brief đã nêu. Không thêm khả năng nào brief chưa nói.
- Không chỉnh sửa gì ở app beta, không tạo dữ liệu, không gửi lời mời.

Muốn cho phép truy cập: thêm `beta.elynto.io` vào *Allowed domains* trong mục Network access của môi trường cloud (hướng dẫn: https://code.claude.com/docs/en/cloud-environments#network-access). Kể cả khi đã truy cập được, phần sau màn hình đăng nhập vẫn cần bạn cung cấp ảnh chụp, video hoặc tài khoản demo.

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
| Demo hero (một câu → công việc) | Animation HTML ~10 giây, nhãn “Minh họa” | Video thật VI + EN, 10–15 giây, tắt tiếng, MP4 dưới 2 MB, kèm poster. Khai báo ở `productMedia.heroDemo` |
| Tạo và giao việc | Minh họa tương tác, 3 ví dụ có sẵn (không có ô nhập tự do) | Ảnh chụp thật → `productMedia.command` |
| Lập kế hoạch với AI | Minh họa bản nháp kế hoạch | Ảnh chụp màn hình review kế hoạch → `productMedia.planning` |
| Hôm nay / Việc của tôi | Minh họa | Ảnh chụp thật → `productMedia.today` |
| Danh sách / Kanban / Lịch / Timeline / Gantt | Minh họa dạng tab | Giữ minh họa hoặc thay từng panel bằng ảnh |
| Logo | SVG **dựng lại từ ảnh .webp** được cung cấp (`public/brand/`) | File vector gốc chính thức |
| Màu thương hiệu | Navy `#142D47` lấy mẫu từ logo; các màu khác là token tạm | Bảng màu chính thức (sửa trong `globals.css`) |
| Font | Be Vietnam Pro (hỗ trợ dấu tiếng Việt tốt, SIL OFL) | Xác nhận hoặc thay bằng font thương hiệu |

Khi quay hoặc chụp màn hình, chỉ dùng dữ liệu mẫu. Không đưa tên, email hay công việc của khách hàng thật vào.

## 5. Lựa chọn thiết kế và thông điệp

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
  - nút “Xem Elynto hoạt động”, dừng/phát demo, FAQ, tab (chuột và bàn phím), menu mobile (Escape trả focus), đổi ngôn ngữ và ghi nhớ;
  - sự kiện CTA được đẩy vào `dataLayer`;
  - axe: không có lỗi truy cập mức *serious/critical*;
  - không tràn ngang, không lỗi console.
- Đã xem ảnh chụp toàn trang desktop và mobile cho cả hai ngôn ngữ, từng khung hình của demo, và tab Timeline/Gantt khi bật cờ.
- Không có lỗi hay cảnh báo console ở chế độ dev (kiểm tra hydration).
- JS tải lần đầu khoảng 170 KB gzip, phần lớn là React/Next; code của trang khoảng 17 KB gzip. Các section bên dưới không dùng ảnh nặng.

## 7. Ghi chú kỹ thuật

- `npm audit` báo 5 lỗ hổng mức *high* trong chuỗi công cụ lint chỉ dùng khi phát triển (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`). Không đi vào code chạy trên trình duyệt. Có thể nâng cấp khi `eslint-config-next` phát hành bản sửa.
- `next/font/google` tải font lúc build. Vercel làm được việc này; build ở máy không có mạng sẽ lỗi.
- Năm trong footer được tính lúc build.
- `AGENTS.md` / `CLAUDE.md` do `next dev` (Next.js 16) tự tạo, giữ lại để cây code không bị thay đổi ngoài ý muốn.
