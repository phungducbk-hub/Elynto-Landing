import type { Metadata } from "next";
import type { ReactNode } from "react";
import { beVietnam } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Thống kê truy cập — Elynto",
  robots: { index: false, follow: false },
};

/** Separate root layout: the dashboard is internal, Vietnamese only, and records no visits itself. */
export default function StatsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh bg-canvas">{children}</body>
    </html>
  );
}
