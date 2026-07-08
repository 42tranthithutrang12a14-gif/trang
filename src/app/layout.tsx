import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = `${settings.shortName} — ${settings.slogan}`;
  const description = `${settings.companyName}: ${settings.slogan}. ${settings.address}.`;

  return {
    metadataBase: new URL("https://dailoangia.vercel.app"),
    title: {
      default: title,
      template: `%s — ${settings.shortName}`,
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
}

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
