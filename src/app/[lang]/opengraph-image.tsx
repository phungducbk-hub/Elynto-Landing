import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOCKUP_PATHS, LOCKUP_VIEWBOX } from "@/components/brand/logo-paths";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

export const alt = `Elynto — ${siteConfig.vision}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const fontDir = join(process.cwd(), "assets/fonts");

async function loadFonts() {
  const [medium, bold] = await Promise.all([
    readFile(join(fontDir, "BeVietnamPro-Medium.ttf")),
    readFile(join(fontDir, "BeVietnamPro-Bold.ttf")),
  ]);
  return [
    { name: "Be Vietnam Pro", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Be Vietnam Pro", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : defaultLocale);
  const [, , vbWidth, vbHeight] = LOCKUP_VIEWBOX.split(" ").map(Number);
  const logoHeight = 52;
  const navy = "#142d47";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "#fcfbf8",
          fontFamily: "Be Vietnam Pro",
          color: navy,
        }}
      >
        <svg width={(vbWidth / vbHeight) * logoHeight} height={logoHeight} viewBox={LOCKUP_VIEWBOX} fill={navy}>
          {LOCKUP_PATHS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: 26, fontWeight: 500, color: "#2c5281" }}>{dict.hero.eyebrow}</div>
            <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1.5, marginTop: 18 }}>
              {siteConfig.vision}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 360,
              background: "#ffffff",
              border: "1px solid #e7e3db",
              borderRadius: 22,
              boxShadow: "0 24px 48px -24px rgba(16,28,43,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 22px",
                borderBottom: "1px solid #e7e3db",
                fontSize: 20,
                fontWeight: 700,
                color: "#157a3c",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  background: "#157a3c",
                  color: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="#ffffff" strokeWidth="2.2">
                  <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {dict.demo.success}
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "20px 22px", gap: 14 }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: "#101c2b" }}>{dict.demo.result.task}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
                <span style={{ color: "#5f6b7c", fontWeight: 500 }}>{dict.demo.fields.assignee}</span>
                <span style={{ color: "#0e6f66", fontWeight: 700 }}>{dict.demo.result.assignee.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
                <span style={{ color: "#5f6b7c", fontWeight: 500 }}>{dict.demo.fields.due}</span>
                <span style={{ color: "#a14a06", fontWeight: 700 }}>{dict.demo.result.due}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: "#475467", maxWidth: 900, lineHeight: 1.4 }}>
          {dict.meta.ogDescription}
        </div>
      </div>
    ),
    { ...size, fonts: await loadFonts() },
  );
}
