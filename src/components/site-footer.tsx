import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-foreground">Sổ tay DN Siêu nhỏ</p>
            <p className="mt-1 text-sm text-muted">
              Thông tin tham khảo đã được kế toán viên rà soát — không phải dịch vụ kế toán hay tư vấn pháp lý.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-muted">
            <Link href="/dieu-khoan" className="hover:text-foreground transition-colors">
              Điều khoản
            </Link>
            <Link href="/rieng-tu" className="hover:text-foreground transition-colors">
              Quyền riêng tư
            </Link>
            <Link href="/mien-tru" className="hover:text-foreground transition-colors">
              Miễn trừ trách nhiệm
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-xs text-muted/70">
          Sổ tay DN Siêu nhỏ cung cấp thông tin tham khảo đã được kế toán viên rà soát.
          Đây không phải dịch vụ kế toán, dịch vụ làm thủ tục về thuế hay tư vấn pháp lý.
          Với trường hợp cụ thể, hãy đối chiếu văn bản gốc hoặc hỏi người có chứng chỉ hành nghề.
        </p>
      </div>
    </footer>
  );
}
