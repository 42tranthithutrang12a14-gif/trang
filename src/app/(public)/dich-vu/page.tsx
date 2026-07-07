import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Dịch vụ",
};

const services = [
  {
    title: "Xây dựng nhà để ở",
    desc: "Thi công nhà phố, nhà cấp 4, nhà ống trọn gói từ móng đến hoàn thiện.",
  },
  {
    title: "Xây dựng công trình không để ở",
    desc: "Thi công nhà xưởng, kho bãi, công trình thương mại theo yêu cầu.",
  },
  {
    title: "Hoàn thiện công trình",
    desc: "Ốp lát gạch, sơn nước, trần thạch cao, hoàn thiện nội ngoại thất.",
  },
  {
    title: "Lắp đặt hệ thống cấp thoát nước",
    desc: "Thi công đường ống nước, hệ thống thoát nước, thiết bị vệ sinh.",
  },
  {
    title: "Lắp đặt hệ thống điện",
    desc: "Đi dây, lắp đặt tủ điện, thiết bị chiếu sáng cho công trình dân dụng.",
  },
  {
    title: "Sửa chữa, cải tạo nhà",
    desc: "Sửa chữa, cải tạo, nâng cấp nhà ở, khắc phục thấm dột, xuống cấp.",
  },
];

export default function DichVuPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Dịch vụ</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Ngoài cung cấp vật tư, chúng tôi nhận thi công xây dựng và sửa chữa trọn gói, đảm bảo
        chất lượng và tiến độ công trình.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-base font-semibold text-foreground">{service.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{service.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Cần khảo sát và báo giá công trình?
        </h2>
        <p className="max-w-xl text-sm text-muted">
          Gọi {siteConfig.phone} để được khảo sát và tư vấn miễn phí trước khi thi công.
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
