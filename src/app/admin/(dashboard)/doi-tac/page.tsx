import { createClient as createServiceClient } from "@supabase/supabase-js";
import { AddPartnerForm } from "./AddPartnerForm";

type Partner = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
};

async function getPartners(): Promise<Partner[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  const supabase = createServiceClient(url, key);
  const { data } = await supabase
    .from("partners")
    .select("*")
    .order("name");

  return (data ?? []) as Partner[];
}

export default async function DoiTacPage() {
  const partners = await getPartners();
  const supabaseReady = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Đối tác</h1>
        <p className="text-sm text-muted mt-1">
          Danh sách kế toán và tư vấn pháp lý nhận yêu cầu hỗ trợ từ khách hàng.
        </p>
      </div>

      {!supabaseReady ? (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Cấu hình SUPABASE_SERVICE_ROLE_KEY để dùng tính năng này.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{partners.length}</p>
              <p className="text-xs text-muted mt-1">Tổng số</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="text-2xl font-bold text-success">
                {partners.filter((p) => p.is_active).length}
              </p>
              <p className="text-xs text-muted mt-1">Đang hoạt động</p>
            </div>
          </div>

          {partners.length > 0 && (
            <div className="mb-6 rounded-2xl border border-border bg-surface overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface/50">
                    <th className="text-left px-4 py-3 font-medium text-muted">Tên</th>
                    <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">Liên hệ</th>
                    <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Ghi chú</th>
                    <th className="text-left px-4 py-3 font-medium text-muted">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{p.name}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {p.phone && <p className="text-xs text-muted">{p.phone}</p>}
                        {p.email && <p className="text-xs text-muted">{p.email}</p>}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-muted">{p.notes ?? "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.is_active ? "bg-success/20 text-success" : "bg-muted/20 text-muted"}`}>
                          {p.is_active ? "Hoạt động" : "Đã tắt"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Thêm đối tác mới</h2>
            <AddPartnerForm />
          </div>
        </>
      )}
    </div>
  );
}
