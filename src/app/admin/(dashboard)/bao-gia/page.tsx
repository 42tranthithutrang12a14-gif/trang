import { getSettings } from "@/lib/settings";
import { QuoteBuilder } from "./quote-builder";

export default async function AdminQuotePage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="no-print">
        <h1 className="text-2xl font-semibold text-foreground">Bảng báo giá</h1>
        <p className="mt-2 text-sm text-muted">
          Điền thông tin khách hàng, chỉnh số lượng / đơn giá rồi bấm In để lưu PDF hoặc in trực
          tiếp. Các dòng gạch bên dưới là điền tạm theo giá anh/chị gửi — sửa lại thoải mái.
        </p>
      </div>
      <QuoteBuilder settings={settings} />
    </div>
  );
}
