import Image from "next/image";
import { getSettings } from "@/lib/settings";
import { updateSettings } from "./actions";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, { saved }] = await Promise.all([getSettings(), searchParams]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground">Cài đặt thông tin công ty</h1>
      <p className="mt-2 text-sm text-muted">
        Thông tin ở đây hiển thị trên toàn bộ trang web (đầu trang, chân trang, trang chủ, giới
        thiệu, liên hệ).
      </p>

      {saved && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          Đã lưu thay đổi.
        </p>
      )}

      <form action={updateSettings} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="companyName" className="text-sm font-medium text-foreground">
            Tên công ty đầy đủ
          </label>
          <input
            id="companyName"
            name="companyName"
            required
            defaultValue={settings.companyName}
            placeholder="VD: Công ty TNHH ABC"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="shortName" className="text-sm font-medium text-foreground">
            Tên hiển thị ngắn (đầu trang, chân trang)
          </label>
          <input
            id="shortName"
            name="shortName"
            required
            defaultValue={settings.shortName}
            placeholder="VD: ABC"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="slogan" className="text-sm font-medium text-foreground">
            Khẩu hiệu / mô tả ngắn
          </label>
          <input
            id="slogan"
            name="slogan"
            defaultValue={settings.slogan}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <span className="text-sm font-medium text-foreground">Logo</span>
          {settings.logoUrl ? (
            <div className="mt-2 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-border bg-background">
                <Image src={settings.logoUrl} alt="Logo" fill className="object-contain p-1" />
              </div>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" name="removeLogo" className="h-4 w-4 rounded border-border" />
                Xoá logo (dùng lại tên chữ)
              </label>
            </div>
          ) : (
            <p className="mt-1 text-sm text-muted">Chưa có logo — đầu trang đang hiển thị bằng chữ.</p>
          )}
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-1.5 file:text-sm file:text-white"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              defaultValue={settings.phone}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={settings.email}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-medium text-foreground">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            defaultValue={settings.address}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="taxId" className="text-sm font-medium text-foreground">
              Mã số thuế
            </label>
            <input
              id="taxId"
              name="taxId"
              defaultValue={settings.taxId}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="representative" className="text-sm font-medium text-foreground">
              Người đại diện pháp luật
            </label>
            <input
              id="representative"
              name="representative"
              defaultValue={settings.representative}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="businessLines" className="text-sm font-medium text-foreground">
            Ngành nghề kinh doanh (mỗi dòng một ngành nghề)
          </label>
          <textarea
            id="businessLines"
            name="businessLines"
            rows={7}
            defaultValue={settings.businessLines.join("\n")}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="mt-2 self-start rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
