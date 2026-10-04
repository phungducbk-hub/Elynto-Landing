# Elynto — Landing page

Landing page song ngữ (Tiếng Việt / English) cho **Elynto — AI Work OS**, dự kiến chạy tại `elynto.io`.

- Next.js 16 (App Router) · TypeScript · Tailwind CSS 4
- Trang tĩnh (SSG) cho `/vi` và `/en`; `proxy.ts` chọn ngôn ngữ khi vào `/`
- Không có backend, không kết nối dịch vụ tracking bên ngoài
- Thiết kế theo skill `frontend-design` (cài tại `.claude/skills/frontend-design/`)

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
    globals.css               design tokens (@theme), thang chữ (type-display, type-h2…), nét đánh dấu .marker
    icon.svg, favicon.ico, apple-icon.png
    robots.ts, sitemap.ts
  proxy.ts                    "/" → /vi hoặc /en (cookie → Accept-Language → mặc định vi)
  content/vi.ts, en.ts        TOÀN BỘ nội dung chữ và dữ liệu mẫu của hình minh họa, có kiểu dữ liệu chung (types.ts)
  config/site.ts              URL trang, URL đăng ký/đăng nhập, quy tắc index
  config/media.ts             chỗ khai báo video/ảnh sản phẩm thật
  lib/analytics.ts            hàm track() + danh sách sự kiện
  components/
    sections/                 Hero, Benefits, HowItWorks, Audience, Faq, FinalCta
    hero/                     TransformStage: câu nói → công việc (chuyển động duy nhất của trang)
    demo/                     DemoVideo (dùng khi có video thật)
    visuals/                  giao diện Elynto dựng lại: DelegatedView, PlanDraft, ProjectWorkspace, TodayView
    layout/                   SiteHeader, SiteFooter, LanguageSwitch, AnalyticsListener
    ui/, brand/               nút, khung minh họa, avatar, logo
public/brand/                 logo gốc được cung cấp (.webp) + bản SVG dựng lại
assets/fonts/                 Mona Sans tĩnh để vẽ ảnh Open Graph (SIL OFL)
.claude/skills/frontend-design/  skill thiết kế (Apache 2.0) dùng cho các lần chỉnh sửa giao diện
```

## Chỉnh sửa thường gặp

**Nội dung chữ** — sửa `src/content/vi.ts` và `src/content/en.ts`. Hai file dùng chung kiểu `Dictionary`, nên nếu một ngôn ngữ thiếu nội dung thì `npm run typecheck` sẽ báo lỗi.

**Màu sắc, chữ** — sửa token trong khối `@theme` của `src/app/globals.css`. Component chỉ dùng tên token (`bg-navy`, `text-muted`, `bg-fog`, `type-h2`…), không ghi mã màu trực tiếp. Màu navy `#142D47` được lấy mẫu từ logo. Các màu khác là bảng màu tạm, chưa phải bộ màu thương hiệu chính thức. Màu vàng `marker` chỉ dùng để đánh dấu phần câu mà Elynto đọc ra, không dùng để trang trí.

**Chuyển động ở hero** — thời gian từng bước nằm trong `src/components/hero/TransformStage.module.css` (`--t-assignee`, `--t-task`…). Trạng thái tự nhiên của mọi phần tử là khung hình cuối, nên trang vẫn đúng khi tắt JavaScript hoặc khi người xem bật giảm chuyển động.

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
project: {
  vi: { src: "/media/project-vi.webp", width: 1600, height: 1100, alt: "Trang tổng quan dự án Thiết kế website trong Elynto" },
},
```

Khi đã khai báo, trang tự dùng asset thật thay cho minh họa HTML. Video luôn tắt tiếng, có poster và nút phát/dừng, chỉ tải khi gần tới vùng nhìn thấy và tự dừng khi ra khỏi màn hình. Chỉ dùng dữ liệu mẫu, không quay dữ liệu khách hàng thật.

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
