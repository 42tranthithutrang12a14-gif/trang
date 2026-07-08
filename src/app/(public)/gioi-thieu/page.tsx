import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Giới thiệu",
};

export default async function GioiThieuPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Giới thiệu</h1>
      <p className="mt-4 leading-relaxed text-muted">
        {settings.companyName} chuyên cung cấp gạch lát, vật liệu xây dựng, thiết bị vệ sinh,
        thiết bị ống nước và nhận thi công xây dựng, sửa chữa nhà ở. Chúng tôi hướng tới sự tinh
        gọn, minh bạch về giá và chất lượng vật tư ổn định cho từng công trình.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
            Thông tin đăng ký kinh doanh
          </h2>
          <dl className="mt-4 space-y-2 text-sm text-foreground">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Loại hình</dt>
              <dd className="text-right">Công ty TNHH</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Mã số thuế</dt>
              <dd className="text-right">{settings.taxId}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Người đại diện</dt>
              <dd className="text-right">{settings.representative}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Địa chỉ</dt>
              <dd className="text-right">{settings.address}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
            Ngành nghề kinh doanh
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {settings.businessLines.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
