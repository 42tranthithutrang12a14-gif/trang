import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-accent leading-tight">
            Sổ tay DN<br className="hidden" />
            <span className="text-sm font-medium text-muted ml-1">Siêu nhỏ</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          <Link href="/thu-vien" className="hover:text-foreground transition-colors">
            Thư viện
          </Link>
          <Link href="/dieu-khoan" className="hover:text-foreground transition-colors">
            Điều khoản
          </Link>
        </nav>

        <Link
          href="/kham"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Khám miễn phí
        </Link>
      </div>
    </header>
  );
}
