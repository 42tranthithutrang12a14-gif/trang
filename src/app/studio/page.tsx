import type { Metadata } from "next";
import { StudioLoader } from "./studio-loader";

// Layout gốc đọc cài đặt từ database — không prerender lúc build (giống các trang công khai).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cine Studio",
  description:
    "Công cụ đặt góc máy kiểu phim, chọn concept, chỉnh màu, giả lập máy quay và xuất video ngắn ngay trên trình duyệt.",
};

export default function StudioPage() {
  return <StudioLoader />;
}
