import { Inter } from "next/font/google";

// Matches the Elynto app, including Vietnamese glyphs; served locally by Next.js.
export const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});
