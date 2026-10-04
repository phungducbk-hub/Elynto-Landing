# Elynto — Landing page

Landing page song ngữ (Tiếng Việt / English) cho **Elynto — AI Work OS**, dự kiến chạy tại `elynto.io`.

- Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · framer-motion (chỉ cho khối tình huống)
- Trang tĩnh (SSG) cho `/vi` và `/en`; `proxy.ts` chọn ngôn ngữ khi vào `/`
- Không có backend, không kết nối dịch vụ tracking bên ngoài
- Skill `frontend-design` được cài sẵn tại `.claude/skills/frontend-design/` cho các lần chỉnh giao diện sau

> Ghi chú bàn giao, các lựa chọn thiết kế và danh sách thông tin cần xác minh: xem [`HANDOFF.md`](./HANDOFF.md).

## Chạy ở máy local

Yêu cầu: Node.js ≥ 20.9 và npm.

```bash
npm install
npm run dev          # http://localhost:3000 → tự chuyển sang /vi hoặc /en
```

Bản production:

```bash
npm run build
npm start            # http://localhost:3000
```

Kiểm tra chất lượng:

```bash
npm run lint
npm run typecheck
npx playwright install chromium   # chỉ cần lần đầu
npm run test:e2e                  # tự build và chạy server ở cổng 3100
```

Bộ test (`tests/landing.spec.ts`) chạy trên desktop và mobile. Nó kiểm tra chuyển hướng theo ngôn ngữ, nội dung hero, link CTA, demo, FAQ, tab, menu mobile, đổi ngôn ngữ, chế độ giảm chuyển động, hiện tượng tràn ngang, lỗi console và khả năng truy cập (axe).

## Cấu trúc

```
src/
  app/
    [lang]/layout.tsx         <html lang>, font, metadata (title, description, OG, hreflang)
    [lang]/page.tsx           ghép các section của trang
    [lang]/opengraph-image.tsx  ảnh chia sẻ mạng xã hội cho từng ngôn ngữ (tạo lúc build)
    [lang]/not-found.tsx      trang 404 song ngữ
    globals.css               design tokens (@theme) + style nền
    icon.svg, favicon.ico, apple-icon.png
    robots.ts, sitemap.ts
  proxy.ts                    "/" → /vi hoặc /en (cookie → Accept-Language → mặc định vi)
  content/vi.ts, en.ts        TOÀN BỘ nội dung chữ, có kiểu dữ liệu chung (types.ts)
  config/site.ts              URL trang, URL đăng ký/đăng nhập, quy tắc index
  config/media.ts             chỗ khai báo video/ảnh sản phẩm thật
  lib/analytics.ts            hàm track() + danh sách sự kiện
  lib/reveal.ts               hiệu ứng trượt khi cuộn: reveal() + script khởi động
  components/
    sections/                 Hero, Benefits, HowItWorks, Audience, Voices, Faq, FinalCta
    demo/                     CommandDemo (minh họa HTML), DemoVideo (video thật)
    visuals/                  minh họa sản phẩm: SentenceToTask, PlanDraft, TodayView,
                              DelegatedView và ProjectWorkspace (dựng lại từ giao diện beta)
    layout/                   SiteHeader, SiteFooter, LanguageSwitch, AnalyticsListener, RevealObserver
    ui/, brand/               nút, khung minh họa, avatar, logo, Testimonials (tường thẻ trượt)
public/brand/                 logo gốc được cung cấp (.webp) + bản SVG dựng lại
assets/fonts/                 font dùng để vẽ ảnh Open Graph (SIL OFL)
```

## Chỉnh sửa thường gặp

**Nội dung chữ** — sửa `src/content/vi.ts` và `src/content/en.ts`. Hai file dùng chung kiểu `Dictionary`, nên nếu một ngôn ngữ thiếu nội dung thì `npm run typecheck` sẽ báo lỗi.

**Màu sắc, bóng đổ** — sửa token trong khối `@theme` của `src/app/globals.css`. Component chỉ dùng tên token (`bg-brand`, `text-ink-muted`…), không ghi mã màu trực tiếp. Màu navy `#142D47` được lấy mẫu từ logo. Các màu khác là bảng màu tạm, chưa phải bộ màu thương hiệu chính thức.

**Link đăng ký / đăng nhập** — đặt biến môi trường (xem `.env.example`):

| Biến | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `NEXT_PUBLIC_SIGNUP_URL` | `https://beta.elynto.io` | Đích của mọi nút “Dùng thử miễn phí” |
| `NEXT_PUBLIC_LOGIN_URL` | `https://beta.elynto.io` | Đích của nút “Đăng nhập” |
| `NEXT_PUBLIC_SITE_URL` | `https://elynto.io` | Canonical, sitemap, Open Graph |
| `SITE_INDEXABLE` | chỉ `true` trên Vercel Production | Cho phép công cụ tìm kiếm index |

Biến `NEXT_PUBLIC_*` được đóng vào bản build. Sau khi đổi, cần build lại (trên Vercel: Redeploy).

**Thay minh họa bằng video/ảnh thật** — chép file vào `public/media/` rồi khai báo trong `src/config/media.ts`, ví dụ:

```ts
heroDemo: {
  vi: { src: "/media/demo-vi.mp4", poster: "/media/demo-vi.webp", width: 1280, height: 960 },
  en: { src: "/media/demo-en.mp4", poster: "/media/demo-en.webp", width: 1280, height: 960 },
},
planning: {
  vi: { src: "/media/planning-vi.webp", width: 1600, height: 1100, alt: "Bản nháp kế hoạch ra mắt website trong Elynto" },
},
```

Khi đã khai báo, trang tự dùng asset thật thay cho minh họa HTML. Video luôn tắt tiếng, có poster và nút phát/dừng, chỉ tải khi gần tới vùng nhìn thấy và tự dừng khi ra khỏi màn hình. Chỉ dùng dữ liệu mẫu, không quay dữ liệu khách hàng thật.

**Hiệu ứng trượt** — có hai lớp:

- Phần mở đầu: chữ hiện dần từng dòng, sau đó khung demo trượt vào từ bên phải. Hiệu ứng chạy bằng CSS (`animate-rise`, `animate-enter-right`), độ trễ đặt bằng `[--enter-delay:80ms]`.
- Câu vision ở hero được chia thành ba dòng: “The interface” / “between” / “[you | your team] and your work”. Các phần chữ khai báo ở `visionParts` trong `src/config/site.ts`. Chữ trong pill đổi qua lại giữa “you” và “your team” theo kiểu Notion (`ui/WordSwap.tsx`): mỗi chữ hiện khoảng 2,6 giây, chỉ đổi khi hero đang nằm trên màn hình, và đứng yên ở “you” khi người xem bật giảm chuyển động. Trình đọc màn hình và công cụ tìm kiếm luôn nhận câu đầy đủ “The interface between you and your work”. Cỡ chữ tự co theo độ rộng cột (container query) để dòng dài nhất không bị xuống dòng.
- Các phần còn lại: thêm `{...reveal("up" | "scale" | "from-left" | "from-right", delayMs)}` vào phần tử. Khi phần tử cuộn vào màn hình, `RevealObserver` gắn `data-revealed` và nó trượt vào một lần. `from-left`/`from-right` chỉ trượt ngang từ màn hình rộng ≥ 1024px; màn hình nhỏ trượt lên.
- Script trong `<head>` chỉ ẩn phần tử trước khi hiện khi trình duyệt cho phép chuyển động. Người tắt chuyển động, không có JavaScript, hoặc in trang đều thấy đủ nội dung ngay. Nếu ứng dụng chưa chạy sau 4 giây, nội dung tự hiện.

**Khối “Nghe có quen không?”** (`sections/Voices.tsx`) dùng component testimonial (`ui/Testimonials.tsx`, chỉnh từ `testimonial-v2` của 21st.dev). Hiện khối chứa các tình huống tổng hợp từ nghiên cứu khách hàng, ghi theo vai trò, không gắn tên hay ảnh người thật. Khi có lời nhận xét thật, đã được khách đồng ý cho đăng, có thể thay nội dung trong `voices.items`, đổi nhãn tiêu đề và bỏ dòng ghi chú. Không dùng tên, ảnh hoặc lời nhận xét dựng sẵn.

## Đo lường (analytics)

Chưa kết nối dịch vụ nào. Mọi sự kiện được:

1. đẩy vào `window.dataLayer`, nên Google Tag Manager hoặc công cụ tương thích sẽ tự nhận nếu được thêm sau này;
2. phát dưới dạng `CustomEvent("elynto:analytics")` trên `window`.

| Sự kiện | Khi nào | Thuộc tính |
| --- | --- | --- |
| `cta_click` | Nhấn nút đăng ký / đăng nhập / xem demo | `cta` (`signup`, `login`, `see_demo`), `location` (`header`, `hero`, `mobile_menu`, `final_cta`, `footer`), `href` |
| `nav_click` | Nhấn mục menu | `target`, `location` |
| `language_switch` | Đổi ngôn ngữ | `from`, `to`, `location` |
| `demo_view` | Demo hiện ≥ 50% trên màn hình (1 lần) | `demo` |
| `demo_play` / `demo_pause` / `demo_replay` | Điều khiển demo | `demo`, `source` |
| `example_select` | Chọn ví dụ ở phần “Tạo và giao việc” | `example` |
| `view_tab_select` | Đổi tab cách xem của dự án (Danh sách, Lịch, Gantt) | `view` |
| `faq_toggle` | Mở/đóng câu hỏi | `question`, `open` |
| `testimonials_motion_toggle` | Dừng/chạy lại tường tình huống | `paused` |
| `mobile_menu_toggle` | Mở/đóng menu mobile | `open` |

Mọi sự kiện đều có thêm `page_language`. Để theo dõi thêm một phần tử mới, thêm thuộc tính `data-track="cta_click" data-track-location="..."`.

## Song ngữ

- URL: `/vi` và `/en`. Truy cập `/` sẽ được chuyển hướng 307 theo thứ tự: lựa chọn đã lưu (cookie `elynto-lang`) → ngôn ngữ trình duyệt → `vi`. Trình duyệt chỉ có ngôn ngữ khác (ví dụ tiếng Pháp) sẽ nhận `en`.
- Nút VI/EN ghi nhớ lựa chọn (cookie + localStorage) và giữ nguyên vị trí section (`#hash`).
- Mỗi ngôn ngữ có title, description, Open Graph, `hreflang` và ảnh chia sẻ riêng.
- Câu vision “The interface between you and your work” giữ nguyên tiếng Anh ở cả hai bản và có `lang="en"`.

## Đưa lên GitHub và triển khai Vercel

Code đã được đẩy lên `github.com/phungducbk-hub/Elynto-Landing`, nhánh `claude/fervent-volta-4eds3s`.

1. **Gộp code** — mở Pull Request từ nhánh trên vào `main`, xem lại rồi merge. Nếu repo chưa có `main`, có thể đổi tên nhánh hoặc chọn nhánh này làm Production Branch trên Vercel.
2. **Tạo project Vercel** — vào vercel.com → *Add New… → Project* → chọn repo `Elynto-Landing`. Vercel tự nhận Next.js; giữ nguyên lệnh build (`next build`) và Node 20 trở lên.
3. **Biến môi trường** (*Settings → Environment Variables*) — đặt `NEXT_PUBLIC_SIGNUP_URL` / `NEXT_PUBLIC_LOGIN_URL` khi đã có route chính thức.
4. **Duyệt bản preview** — mỗi nhánh hoặc PR có một URL preview riêng. Bản preview luôn `noindex`.
5. **Gắn tên miền** (chỉ khi đã sẵn sàng công khai) — *Settings → Domains* → thêm `elynto.io` (và `www.elynto.io` chuyển hướng về `elynto.io`), rồi cập nhật DNS theo hướng dẫn của Vercel. Bản Production trên Vercel sẽ tự cho phép index.

> Kho code này **chưa** được triển khai lên Vercel và **chưa** thay đổi DNS. Việc công khai trang do bạn quyết định.
