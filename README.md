# Elynto — Landing page

Landing page song ngữ (Tiếng Việt / English) cho **Elynto — AI Work OS**, dự kiến chạy tại `elynto.io`.

- Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · framer-motion (chỉ cho khối tình huống)
- Trang tĩnh (SSG) cho `/vi` và `/en`; `proxy.ts` chọn ngôn ngữ khi vào `/`
- Không kết nối dịch vụ tracking bên ngoài. Website tự thống kê lượt truy cập (`/api/collect`) và có trang xem số liệu `/stats` có mật khẩu (xem mục Thống kê truy cập)
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
    [lang]/features/[slug]/   5 trang tính năng (/vi/features/ai-planning…)
    [lang]/[page]/            7 trang còn lại (/vi/getting-started, /vi/privacy…)
    [lang]/opengraph-image.tsx  ảnh chia sẻ mạng xã hội cho từng ngôn ngữ (tạo lúc build)
    [lang]/not-found.tsx      trang 404 song ngữ
    globals.css               design tokens (@theme) + style nền
    icon.svg, favicon.ico, apple-icon.png
    robots.ts, sitemap.ts
  proxy.ts                    "/" → /vi hoặc /en (cookie → Accept-Language → mặc định vi)
  content/vi.ts, en.ts        TOÀN BỘ nội dung chữ, có kiểu dữ liệu chung (types.ts)
  content/pages/vi.ts, en.ts  nội dung các trang con
  lib/pages.ts                danh sách trang con, nhóm cột footer, đường dẫn
  config/site.ts              URL trang, URL đăng ký/đăng nhập, email liên hệ, quy tắc index
  config/media.ts             chỗ khai báo video/ảnh sản phẩm thật
  lib/analytics.ts            hàm track() + danh sách sự kiện
  lib/reveal.ts               hiệu ứng trượt khi cuộn: reveal() + script khởi động
  lib/stats/                  thống kê truy cập: ghi nhận (client.ts), kiểm tra (collect.ts),
                              lưu trữ (store.ts), tổng hợp (aggregate.ts), đăng nhập (auth.ts)
  app/stats/                  trang thống kê /stats và trang đăng nhập (layout riêng, không index)
  app/api/collect/            nhận lượt xem trang và lượt bấm nút
  app/api/stats/export/       tải bảng số liệu dạng CSV
  components/
    sections/                 Hero, Benefits, HowItWorks, Audience, Voices, Faq, FinalCta
    demo/                     CommandDemo (minh họa HTML), DemoVideo (video thật)
    visuals/                  minh họa sản phẩm: SentenceToTask, PlanDraft, TodayView,
                              DelegatedView và ProjectWorkspace (dựng lại từ giao diện beta)
    layout/                   SiteHeader, SiteFooter, LanguageSwitch, AnalyticsListener, RevealObserver
    subpage/                  SubpageView (giao diện chung của trang con), CookieReset
    ui/, brand/               nút, khung minh họa, avatar, logo, Testimonials (tường thẻ trượt)
public/brand/                 logo gốc được cung cấp (.webp) + bản SVG dựng lại
assets/fonts/                 font dùng để vẽ ảnh Open Graph (SIL OFL)
```

## Chỉnh sửa thường gặp

**Nội dung chữ** — sửa `src/content/vi.ts` và `src/content/en.ts`. Hai file dùng chung kiểu `Dictionary`, nên nếu một ngôn ngữ thiếu nội dung thì `npm run typecheck` sẽ báo lỗi.

**Footer và trang con** — footer có 4 cột: Sản phẩm, Tài nguyên, Công ty, Pháp lý. Mỗi liên kết dẫn tới một trang con riêng có đủ hai ngôn ngữ. Khi đổi ngôn ngữ, trang con vẫn giữ nguyên (ví dụ `/vi/privacy` ↔ `/en/privacy`). Để thêm một trang: khai báo khóa trong `src/lib/pages.ts` (mảng `featurePageKeys` hoặc `infoPageKeys`, và cột trong `pageGroups`), rồi viết nội dung trong `src/content/pages/vi.ts` và `en.ts`. Typecheck sẽ báo nếu thiếu một ngôn ngữ. Trang tính năng tự dùng lại hình minh họa của trang chủ; title, canonical, hreflang và sitemap được tạo tự động.

**Màu sắc, bóng đổ** — sửa token trong khối `@theme` của `src/app/globals.css`. Component chỉ dùng tên token (`bg-brand`, `text-ink-muted`…), không ghi mã màu trực tiếp. Màu navy `#142D47` được lấy mẫu từ logo. Các màu khác là bảng màu tạm, chưa phải bộ màu thương hiệu chính thức.

**Link đăng ký / đăng nhập** — đặt biến môi trường (xem `.env.example`):

| Biến | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `NEXT_PUBLIC_SIGNUP_URL` | `https://beta.elynto.io` | Đích của mọi nút “Dùng thử miễn phí” |
| `NEXT_PUBLIC_LOGIN_URL` | `https://beta.elynto.io` | Đích của nút “Đăng nhập” |
| `NEXT_PUBLIC_SITE_URL` | `https://elynto.io` | Canonical, sitemap, Open Graph |
| `NEXT_PUBLIC_CONTACT_EMAIL` | (trống) | Email hiện trên trang Liên hệ. Để trống thì trang ghi “sẽ được cập nhật” |
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
- Hero dùng bản rút gọn của câu vision, chia ba dòng: “The interface” / “between” / “[you | your team] and work”. Nội dung khai báo ở `heroVision` trong `src/config/site.ts`. Câu vision đầy đủ (`vision`: “The interface between you and your work”) vẫn được dùng cho title, ảnh chia sẻ và footer. Chữ trong pill đổi qua lại giữa “you” và “your team” theo kiểu Notion (`ui/WordSwap.tsx`): mỗi chữ hiện 10 giây (`HOLD_MS`), chỉ đổi khi hero đang trên màn hình, và đứng yên ở “you” khi người xem bật giảm chuyển động. Trình đọc màn hình nhận câu “The interface between you and work”. Cỡ chữ tự co theo độ rộng cột (container query) để dòng dài nhất không xuống dòng.
- Các phần còn lại: thêm `{...reveal("up" | "scale" | "visual" | "from-left" | "from-right", delayMs)}` vào phần tử. Khi phần tử cuộn vào màn hình, `RevealObserver` gắn `data-revealed` và nó trượt vào một lần. Chữ (`up`) trượt trong khoảng 1 giây. Hình sản phẩm (`visual`, `from-left`, `from-right`) trượt nhẹ hơn (lệch 1–1,5rem) và chậm hơn, khoảng 2,2 giây. `from-left`/`from-right` chỉ trượt ngang từ màn hình rộng ≥ 1024px; màn hình nhỏ trượt lên. Thời lượng và độ lệch nằm trong `src/app/globals.css` (`--reveal-move`, `--reveal-fade`, `--reveal-from`).
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

Lượt bấm `cta_click` có `cta` là `signup` hoặc `login` đồng thời được ghi vào thống kê của website (mục Thống kê truy cập).
| `mobile_menu_toggle` | Mở/đóng menu mobile | `open` |

Mọi sự kiện đều có thêm `page_language`. Để theo dõi thêm một phần tử mới, thêm thuộc tính `data-track="cta_click" data-track-location="..."`.

## Thống kê truy cập

Website tự ghi nhận lượt truy cập, không dùng dịch vụ bên thứ ba. Xem tại **`/stats`** (ví dụ `https://elynto.io/stats`), đăng nhập bằng mật khẩu.

**Số liệu có trên trang:**
- Người truy cập, lượt truy cập, lượt xem trang; người mới và người quay lại; số trang mỗi lượt; tỷ lệ thoát.
- Lượt bấm “Dùng thử miễn phí” và “Đăng nhập” (kèm số người bấm và vị trí nút); tỷ lệ bấm dùng thử.
- Biểu đồ và bảng theo ngày, tháng hoặc năm. Khoảng thời gian chọn sẵn (hôm nay, 7/30/90 ngày, 12 tháng, từ đầu năm) hoặc tự chọn. Mỗi số đều có so sánh với kỳ trước cùng độ dài.
- Phân tích theo thiết bị (điện thoại, máy tính bảng, máy tính), trình duyệt, hệ điều hành, quốc gia, nguồn truy cập, chiến dịch (`utm_source`), trang được xem và ngôn ngữ.
- Tải bảng số liệu dạng CSV.

**Cách đếm:**
- **Người truy cập:** mỗi trình duyệt có một mã ngẫu nhiên lưu trong `localStorage`. Một người vào nhiều lần trong ngày, hay nhiều ngày liền, vẫn là 1 người. Cùng một người dùng điện thoại và máy tính được tính là 2; xóa dữ liệu trình duyệt hoặc dùng chế độ ẩn danh thì được tính là người mới.
- **Lượt truy cập:** kết thúc sau 30 phút không hoạt động.
- **Không đếm:** bot, trình duyệt bật Do Not Track hoặc Global Privacy Control, và người đã tắt thống kê trên trang Cookie.
- **Thời gian:** ngày tính theo giờ Việt Nam.
- **Dữ liệu được lưu:** không lưu địa chỉ IP hay chuỗi user agent đầy đủ. Quốc gia lấy từ header `x-vercel-ip-country` của Vercel nên chỉ có khi chạy trên Vercel.
- **Muốn không tính lượt vào của chính bạn:** mở `/vi/cookies` trên mỗi trình duyệt bạn hay dùng và bấm “Không ghi nhận lượt truy cập của tôi”.

**Cài đặt trên Vercel:**
1. Thêm biến `STATS_PASSWORD` (một mật khẩu dài). Khi chưa đặt biến này, trang `/stats` bị tắt.
2. Thêm nơi lưu dữ liệu. Trong dự án Vercel, vào **Storage → Create Database / Marketplace → Upstash for Redis** rồi kết nối với dự án. Vercel tự thêm `KV_REST_API_URL` và `KV_REST_API_TOKEN`. Code cũng nhận ra:
   - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`, khi bạn tạo Redis trực tiếp trên Upstash;
   - các tên trên kèm tiền tố riêng chọn lúc kết nối;
   - `KV_URL` / `REDIS_URL` của Upstash.
3. **Redeploy** (Deployments → bản mới nhất → ⋯ → Redeploy). Biến môi trường chỉ có hiệu lực với lần triển khai được tạo **sau khi** biến được thêm. Bản đang chạy từ trước sẽ vẫn báo chưa kết nối.

Trang `/stats` cho biết trạng thái kết nối. Khi đã nối, trang ghi “Đã kết nối Upstash Redis” kèm tên biến được dùng. Khi chưa nối, trang hiện các bước cần làm, môi trường hiện tại (production/preview) và tên các biến liên quan đang có. Trang chỉ hiện tên biến, không bao giờ hiện giá trị.

**Chạy ở máy local:** số liệu được lưu vào thư mục `.data/stats/` (đã có trong `.gitignore`). Ví dụ: `STATS_PASSWORD=dat-mat-khau npm run start`, rồi mở `http://localhost:3000/stats`.

| Biến | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `STATS_PASSWORD` | (trống, `/stats` tắt) | Mật khẩu trang thống kê. Đổi mật khẩu thì mọi phiên đăng nhập cũ hết hiệu lực |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | — | Upstash Redis (Vercel tự đặt khi kết nối) |
| `STATS_RETENTION_DAYS` | `400` | Số ngày giữ dữ liệu trên Redis, quá hạn tự xóa |
| `STATS_TIMEZONE` | `Asia/Ho_Chi_Minh` | Múi giờ để tính ngày |
| `STATS_DATA_DIR` | `.data/stats` | Thư mục lưu khi chạy ngoài Vercel mà không có Redis |

Dữ liệu được đọc thẳng từ từng ngày và tổng hợp khi mở trang. Cách này phù hợp với lượng truy cập của landing page, khoảng vài chục nghìn lượt mỗi tháng. Nếu lưu lượng tăng lớn, nên chuyển sang lưu số đã cộng sẵn.

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
