import { Be_Vietnam_Pro } from "next/font/google";

// Be Vietnam Pro: designed for Vietnamese, with full diacritic support. Self-hosted by next/font.
export const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});
