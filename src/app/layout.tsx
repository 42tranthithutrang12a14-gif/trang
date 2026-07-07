import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const title = `${siteConfig.shortName} — ${siteConfig.slogan}`;
const description = `${siteConfig.companyName}: ${siteConfig.slogan}. ${siteConfig.address}.`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s — ${siteConfig.shortName}`,
  },
  description,
  openGraph: {
    title,
    description,
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
