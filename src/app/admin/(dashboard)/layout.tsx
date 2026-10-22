import Link from "next/link";
import { logoutAction } from "../logout-action";

export const dynamic = "force-dynamic";

const adminNav = [
  { label: "Bảng điều khiển", href: "/admin" },
  { label: "Nghĩa vụ", href: "/admin/nghia-vu" },
  { label: "Rủi ro", href: "/admin/rui-ro" },
  { label: "Câu hỏi", href: "/admin/cau-hoi" },
  { label: "Tài liệu", href: "/admin/tai-lieu" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-sm font-semibold text-foreground">
              Sổ tay DN · Quản trị nội dung
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
