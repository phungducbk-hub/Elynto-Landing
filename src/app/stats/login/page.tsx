import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { isStatsSignedIn, statsEnabled } from "@/lib/stats/auth";
import { signIn } from "../actions";

export default async function StatsLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isStatsSignedIn()) redirect("/stats");
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4 py-16">
      <Logo className="h-8 w-auto self-start text-brand" />
      <h1 className="mt-8 text-2xl font-bold tracking-tight text-ink">Thống kê truy cập</h1>
      {statsEnabled() ? (
        <form action={signIn} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              autoFocus
              aria-describedby={error ? "password-error" : undefined}
              className="mt-1.5 block h-11 w-full rounded-xl border border-line-strong bg-surface px-3.5 text-base text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            />
            {error ? (
              <p id="password-error" role="alert" className="mt-2 text-sm font-medium text-status-overdue">
                Mật khẩu chưa đúng.
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand text-[0.9375rem] font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Đăng nhập
          </button>
        </form>
      ) : (
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Trang thống kê chưa được bật. Đặt biến môi trường <code className="font-mono text-sm">STATS_PASSWORD</code> rồi
          triển khai lại để sử dụng.
        </p>
      )}
    </main>
  );
}
