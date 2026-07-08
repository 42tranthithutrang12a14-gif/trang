import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Dịch vụ",
};

export default async function DichVuPage() {
  const [services, settings] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    getSettings(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Dịch vụ</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Ngoài cung cấp vật tư, chúng tôi nhận thi công xây dựng và sửa chữa trọn gói, đảm bảo
        chất lượng và tiến độ công trình.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-base font-semibold text-foreground">{service.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Cần khảo sát và báo giá công trình?
        </h2>
        <p className="max-w-xl text-sm text-muted">
          Gọi {settings.phone} để được khảo sát và tư vấn miễn phí trước khi thi công.
        </p>
        <Link
          href="/lien-he"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Liên hệ ngay
        </Link>
      </div>
    </div>
  );
}
