# Bàn giao — Landing page Elynto

## 1. Tình trạng

- Đã có landing page hoàn chỉnh, chạy được, đủ hai bản **Tiếng Việt** (`/vi`) và **English** (`/en`). Cách chạy và cấu hình xem [`README.md`](./README.md).
- Bản 3 (hiện tại): câu chữ viết lại theo **báo cáo nghiên cứu khách hàng ngày 04/10/2026**; mọi hình sản phẩm được **dựng lại và tinh chỉnh từ 5 ảnh giao diện beta** bạn gửi.
- Build production thành công. Lint và typecheck không lỗi. **39/39** test Playwright đạt trên desktop (1440×900) và mobile (Pixel 7).
- Chưa triển khai lên Vercel, chưa đổi DNS, chưa công khai.

## 2. Nghiên cứu khách hàng → nội dung trang

| Phát hiện trong báo cáo | Cách thể hiện trên trang |
| --- | --- |
| Thông điệp đề xuất thử trước: “Rõ việc cần làm, rõ người phụ trách, rõ tiến độ.” | Câu hứa ngay dưới câu vision ở hero, đồng thời là mô tả chia sẻ (OG) |
| Vision giữ làm câu thương hiệu, nhưng phải có lời giải thích cụ thể bên cạnh | Nhãn “Quản lý công việc bằng AI” + câu hứa + câu giải thích, đều nằm cạnh câu vision |
| Kết quả người dùng thật sự mua: bớt quên việc, bớt hỏi lại, rõ ưu tiên, an tâm khi kết thúc ngày | Lời dẫn của phần “Giao việc xong, vẫn phải đi hỏi tiến độ?”, điểm cuối của phần Hôm nay |
| Nỗi đau của chủ agency: giao rồi không chắc người nhận đã hiểu/nhận; tiến độ nằm rải rác trong chat; việc chậm lộ ra sát hạn | Ba dòng đầu của bảng “Thường gặp / Với Elynto”, mỗi dòng ghép với tính năng thật |
| Nỗi đau của freelancer: nhiều dự án, sáng nay không biết làm gì trước | Dòng thứ tư của bảng; tiêu đề phần Hôm nay |
| “Nhận ra vấn đề”: nội dung nên mô tả tình huống họ vừa gặp, không nói xu hướng AI | Bảng tình huống viết ở ngôi “bạn”; **không** dùng số liệu Microsoft/Asana/OECD (báo cáo dặn không biến chúng thành lời hứa) |
| Góc nội dung theo nhóm: “Vì sao giao việc rồi vẫn phải hỏi tiến độ?”, “Sáng nay nên làm gì?”, “Biến mục tiêu mơ hồ thành bước đầu tiên” | Câu hỏi riêng của từng nhóm trong phần “Dành cho ai”; ví dụ lập kế hoạch website trong phần AI |
| Phân khúc ưu tiên: chủ agency/nhóm dịch vụ 3–15 người, rồi freelancer nhiều dự án | Thứ tự và cách gọi tên ba nhóm trong “Dành cho ai” |
| Người dùng muốn thấy AI đã hiểu gì, tạo gì và sửa được | Thẻ kết quả ở hero hiện đủ trường; FAQ mới “Nếu AI hiểu sai tên người hoặc thời hạn thì sao?”; ghi chú “quyết định cuối cùng thuộc về bạn” |
| Freelancer muốn dùng một mình ngay, không bị bắt tạo nhóm | FAQ “dùng một mình” và mô tả nhóm freelancer |
| “Dám thử”: bắt đầu nhỏ với một dự án thật | Lời CTA cuối trang và câu trả lời FAQ “bắt đầu ở đâu” |
| Báo cáo không tạo lời chứng thực, không gán phát biểu cho người dùng | Trang không có testimonial, không có trích dẫn khách hàng |

## 3. Giao diện thật → hình minh họa

Theo yêu cầu, ảnh chụp **không** được đưa thẳng lên trang. Mỗi màn hình được dựng lại bằng HTML/CSS theo design system của landing, đổi tên người và công ty sang dữ liệu mẫu (không có “Phong Du”, “ALEX INC”), và tinh chỉnh: nhãn viết hoa đầu câu thay cho chữ in hoa, khoảng cách đều, trạng thái có màu thống nhất.

| Ảnh beta | Trên landing | Đã tinh chỉnh |
| --- | --- | --- |
| Chat “Giao Phong làm thiết kế website…” → thẻ “Đã tạo công việc” | Sân khấu ở hero: câu nói được đánh dấu và nối vào các ô **Giao cho, Công việc, Hạn (có ngày giờ), Ưu tiên**, nút “Mở công việc” | Tên việc viết hoa chữ đầu; hạn hiển thị “Thứ Sáu 09/10, 23:59”; câu mẫu lấy đúng placeholder của app “Giao Minh làm báo giá, hoàn thành trước thứ Sáu.” |
| Bộ lọc trạng thái ở lịch (Draft → Completed) + mục Delegated ở sidebar | “Việc đã giao”: dải vòng đời Đã giao → Đã nhận → Đang làm → Đã nộp → Đã duyệt, kèm Làm lại; bảng việc đã giao có dấu quá hạn | Màu trạng thái riêng, nhất quán ở mọi hình |
| Dự án “Thiết kế website” (4 giai đoạn, 12 việc) | Bản nháp kế hoạch AI trong phần lập kế hoạch | Mỗi giai đoạn có khoảng ngày, mỗi việc có ngày hạn |
| Trang tổng quan dự án (Progress, Overdue, Schedule, Project health, Analyse with AI) + sidebar | Khung app đầy đủ: sidebar thật (Hôm nay, Hộp thư, Việc của tôi, Việc đã giao, Dự án, Nhóm, Báo cáo, Kiến thức), số liệu dự án, tình trạng, nút “Phân tích với AI” | Số liệu gom vào một hàng; nhãn tiếng Việt |
| Danh sách theo giai đoạn, Lịch tháng, Gantt | Ba tab tương tác trong khung app | Gantt có đường “Hôm nay”, tô ngày cuối tuần, màu thanh theo nhóm trạng thái |

Lưu ý: nhãn trong hình là bản dịch tiếng Việt do tôi đặt. Ứng dụng beta hiện hiển thị phần lớn bằng tiếng Anh; FAQ đã nói rõ điều này.

## 4. Cần xác minh trước khi công khai

### Bắt buộc (ảnh hưởng luồng chuyển đổi)

| # | Nội dung | Hiện trạng trên trang | Cần làm |
| --- | --- | --- | --- |
| 1 | **Route đăng ký** | Mọi nút “Dùng thử miễn phí” dẫn tới `https://beta.elynto.io` (URL gốc, không đoán `/signup`) | Cung cấp route chính thức → đặt `NEXT_PUBLIC_SIGNUP_URL` |
| 2 | **Có thật sự cho dùng thử miễn phí và tự đăng ký?** | CTA ghi “Dùng thử miễn phí / Start free trial” theo brief. Không nêu thời hạn, thẻ thanh toán hay giới hạn | Nếu beta chưa mở tự đăng ký hoặc chưa miễn phí, phải sửa CTA hoặc mở luồng đăng ký trước khi công khai |
| 3 | Route đăng nhập | “Đăng nhập” dẫn tới `https://beta.elynto.io` | Đặt `NEXT_PUBLIC_LOGIN_URL` nếu có route riêng |

### Đã thấy trong ảnh giao diện (xem là đã hoạt động)

Tạo việc bằng câu nói với Giao cho, Hạn có giờ, Ưu tiên; nút Mở công việc; trạng thái Draft, Assigned, Accepted, In progress, Submitted, Rework, Approved, Completed; đánh dấu quá hạn; sidebar Today, Inbox, My Work, Delegated, Projects, Team, Reports, Knowledge; dự án có giai đoạn, ngày bắt đầu/hạn, ưu tiên, tệp đính kèm; trang tổng quan có tiến độ, quá hạn, lịch trình, Project health, Analyse with AI; Milestones (có thể tự hoàn thành khi việc liên quan xong); xem dạng List, Calendar, Gantt; kéo thả thanh Gantt.

### Vẫn dựa trên brief, chưa thấy trong ảnh

| Nội dung | Vị trí |
| --- | --- |
| AI lập kế hoạch có bước **xem lại, chỉnh sửa trước khi tạo dự án** (chưa thấy màn hình review) | Phần lập kế hoạch AI, FAQ |
| Nội dung màn hình **Hôm nay** (gom quá hạn, đến hạn, sắp đến hạn, kèm ưu tiên) | Phần Hôm nay, bảng tình huống dòng 4 |
| Người nhận tự chuyển việc sang **Đã nhận / Đã nộp** (thấy trạng thái, chưa thấy ai thao tác) | Bảng tình huống dòng 1, phần Việc đã giao |
| Nội dung của mục **Việc đã giao** (thấy tên mục, chưa thấy màn hình) | Phần Việc đã giao, FAQ |
| AI nhận ra **tiếng Anh** trong câu lệnh | FAQ ngôn ngữ |

### Đã gỡ khỏi trang

- **Kanban**: brief có nhắc nhưng không thấy trong thanh công cụ ở các ảnh, nên tạm bỏ. Thêm lại khi xác nhận.
- Cờ tính năng Timeline/Gantt: Gantt đã xác nhận nên hiển thị luôn; không có màn Timeline riêng nên bỏ cờ.

### Cố ý không nhắc tới

Tự sắp lịch, AI tự ưu tiên hoặc tự điều phối, chat/video call, tích hợp bên thứ ba, thông báo/nhắc việc, nhập bằng giọng nói, giá, thời hạn trial, thẻ thanh toán, bảo mật dữ liệu, xuất dữ liệu, số người dùng, testimonial, logo khách hàng, số liệu năng suất. Báo cáo cũng xếp nhắc việc chủ động, tự xếp lịch, tích hợp chat và báo cáo nâng cao là nhu cầu, chưa phải khả năng sẵn có.

### Asset có thể bổ sung

| Asset | Hiện dùng | Đề xuất |
| --- | --- | --- |
| Demo hero | Chuỗi CSS ~4,5 giây chạy một lần | Video thật VI + EN, 10–15 giây, tắt tiếng, kèm poster → `productMedia.heroDemo` |
| Việc đã giao, Kế hoạch AI, Trang dự án, Hôm nay | Giao diện dựng lại | Có thể giữ (đã tinh chỉnh), hoặc thay bằng ảnh thật → `productMedia.delegate / planning / project / today` |
| Logo | SVG dựng lại từ ảnh .webp | File vector gốc |
| Màu, font | Token tạm, Mona Sans | Xác nhận bộ nhận diện chính thức |

## 5. Lựa chọn thiết kế (theo skill `frontend-design`)

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
- khung giả cửa sổ app có pill “MINH HỌA” trên mọi hình (bản 3 chỉ dựng lại khung app ở nơi có giao diện thật làm căn cứ);
- các hàng card giống nhau có icon (Lợi ích giờ là bảng “Thường gặp / Với Elynto”, Dành cho ai là ba cột chữ kèm câu hỏi và câu ví dụ);
- khối CTA navy ở cuối trang; animation lặp vô hạn.

**Đánh số** chỉ dùng ở nơi nội dung thật sự là trình tự: 3 bước lập kế hoạch và 3 giai đoạn của dự án.

**Bản 3** giữ nguyên hệ thống này. Màu trạng thái công việc (8 màu nhạt) chỉ xuất hiện bên trong hình sản phẩm, như dữ liệu, không dùng để trang trí. Hình sản phẩm dùng Mona Sans ở cỡ giao diện (13–15px), bo góc theo cấp: khung app 16px, khối bên trong 12px, nhãn 6px.

**Câu chữ**: theo nghiên cứu khách hàng (mục 2), bỏ các dấu gạch ngang trang trí. “Nói việc cần làm” vẫn được thay bằng “Chỉ cần mô tả việc cần làm” để không gợi ý nhập bằng giọng nói. Mẹo “nêu rõ việc gì, ai làm, khi nào xong” vẫn được giữ.

## 6. Đã kiểm tra

- `npm run build` thành công; `/vi`, `/en` và ảnh Open Graph được tạo tĩnh lúc build.
- `npm run lint`: 0 lỗi, 0 cảnh báo. `npm run typecheck`: đạt.
- `npm run test:e2e`: 39 test đạt, 1 test chỉ dành cho mobile được bỏ qua trên desktop:
  - chuyển hướng `/` theo Accept-Language, lựa chọn đã lưu thắng ngôn ngữ trình duyệt, trang 404 song ngữ;
  - hero chứa định vị và vision, mọi CTA đăng ký trỏ đúng URL, demo có nhãn minh họa;
  - metadata và ảnh OG theo từng ngôn ngữ;
  - nút “Xem Elynto hoạt động” phát lại demo; demo tạm dừng/tiếp tục được, chạy một lần rồi dừng ở “Đã tạo công việc”;
  - FAQ, tab Danh sách/Lịch/Gantt của dự án (chuột và bàn phím), menu mobile (Escape trả focus), đổi ngôn ngữ và ghi nhớ;
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
