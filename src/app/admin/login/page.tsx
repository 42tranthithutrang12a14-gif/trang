import { siteConfig } from "@/lib/site-config";
import { loginAction } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {siteConfig.shortName}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Đăng nhập quản trị</h1>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            Sai tên đăng nhập hoặc mật khẩu.
          </p>
        )}

        <form action={loginAction} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-foreground">
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoFocus
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
