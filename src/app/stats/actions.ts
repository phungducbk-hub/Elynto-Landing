"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkStatsPassword, STATS_COOKIE, STATS_SESSION_SECONDS, statsSessionToken } from "@/lib/stats/auth";

export async function signIn(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkStatsPassword(password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 700));
    redirect("/stats/login?error=1");
  }
  (await cookies()).set(STATS_COOKIE, statsSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: STATS_SESSION_SECONDS,
  });
  redirect("/stats");
}

export async function signOut() {
  (await cookies()).delete(STATS_COOKIE);
  redirect("/stats/login");
}
