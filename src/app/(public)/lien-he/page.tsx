import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default function LienHePage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Liên hệ</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Liên hệ trực tiếp để được tư vấn vật liệu, báo giá công trình hoặc đặt hàng.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Thông tin liên hệ
            </h2>
            <dl className="mt-4 space-y-3 text-sm text-foreground">
              <div>
                <dt className="text-muted">Địa chỉ</dt>
                <dd>{siteConfig.address}</dd>
              </div>
              <div>
                <dt className="text-muted">Điện thoại</dt>
                <dd>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="block rounded-2xl bg-accent px-6 py-4 text-center text-base font-medium text-white hover:bg-accent-dark"
          >
            Gọi ngay: {siteConfig.phone}
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Bản đồ"
            src={mapSrc}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
