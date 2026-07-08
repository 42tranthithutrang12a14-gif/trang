import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { logoutAction } from "../logout-action";

// Trang quản trị luôn cần dữ liệu mới nhất, không cache tĩnh.
export const dynamic = "force-dynamic";

const adminNav = [
  { label: "Sản phẩm", href: "/admin" },
  { label: "Danh mục", href: "/admin/categories" },
  { label: "Dịch vụ", href: "/admin/services" },
  { label: "Cài đặt", href: "/admin/settings" },
];

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-sm font-semibold text-foreground">
              {settings.shortName} · Quản trị
            </span>
            <nav className="flex items-center gap-5">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-muted hover:text-accent">
              Xem trang web ↗
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-sm text-muted hover:text-accent">
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
