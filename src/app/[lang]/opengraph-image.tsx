import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MARK_PATHS, MARK_VIEWBOX } from "@/components/brand/logo-paths";
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
  const [medium, wideBold] = await Promise.all([
    readFile(join(fontDir, "MonaSans-Medium.ttf")),
    readFile(join(fontDir, "MonaSans-SemiExpandedBold.ttf")),
  ]);
  return [
    { name: "Mona Sans", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Mona Sans Wide", data: wideBold, weight: 700 as const, style: "normal" as const },
  ];
}

const navy = "#142d47";
const marker = "#ffdf4f";
const fog = "#f0f3f7";

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : defaultLocale);
  const [, , vbWidth, vbHeight] = MARK_VIEWBOX.split(" ").map(Number);
  const markHeight = 40;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#ffffff",
          fontFamily: "Mona Sans",
          color: navy,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width={(vbWidth / vbHeight) * markHeight} height={markHeight} viewBox={MARK_VIEWBOX} fill={navy}>
            {MARK_PATHS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </svg>
          <div style={{ fontSize: 30, fontWeight: 500 }}>{dict.hero.label}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Mona Sans Wide",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -2.5,
            maxWidth: 1000,
          }}
        >
          {siteConfig.vision}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "22px 28px",
            borderRadius: 18,
            background: fog,
            fontSize: 30,
            fontWeight: 500,
          }}
        >
          {dict.demo.sentence.map((segment, index) =>
            typeof segment === "string" ? (
              <span key={index} style={{ whiteSpace: "pre" }}>
                {segment}
              </span>
            ) : (
              <span key={index} style={{ background: marker, padding: "0 6px", borderRadius: 4 }}>
                {segment.text}
              </span>
            ),
          )}
        </div>
      </div>
    ),
    { ...size, fonts: await loadFonts() },
  );
}
