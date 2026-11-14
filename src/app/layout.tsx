import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? "https://sotay.dn"),
  title: {
    default: "Sổ tay DN Siêu nhỏ — Thuế, kế toán, pháp lý cho doanh nghiệp",
    template: "%s — Sổ tay DN Siêu nhỏ",
  },
  description:
    "Biết ngay công ty bạn đang thiếu gì về thuế và pháp lý. Trả lời 23 câu hỏi trong 5 phút. Nhận danh sách việc cần làm và lịch hạn nộp của riêng công ty bạn. Miễn phí.",
  openGraph: {
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
