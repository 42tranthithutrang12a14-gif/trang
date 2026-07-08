import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default async function LienHePage() {
  const settings = await getSettings();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`;

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
                <dd>{settings.address}</dd>
              </div>
              <div>
                <dt className="text-muted">Điện thoại</dt>
                <dd>
                  <a href={telHref(settings.phone)} className="hover:text-accent">
                    {settings.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${settings.email}`} className="hover:text-accent">
                    {settings.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <a
            href={telHref(settings.phone)}
            className="block rounded-2xl bg-accent px-6 py-4 text-center text-base font-medium text-white hover:bg-accent-dark"
          >
            Gọi ngay
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
