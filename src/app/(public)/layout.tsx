import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Lấy dữ liệu lúc có người truy cập thay vì lúc build — tránh mở nhiều kết nối
// database cùng lúc khi build (Neon free tier giới hạn số kết nối đồng thời),
// và nội dung sửa trong /admin hiện ra ngay lập tức không cần revalidate cache.
export const dynamic = "force-dynamic";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
