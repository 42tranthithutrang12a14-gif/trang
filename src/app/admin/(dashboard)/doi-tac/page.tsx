import { createClient as createServiceClient } from "@supabase/supabase-js";
import { AddPartnerForm } from "./AddPartnerForm";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createServiceClient(url, key);
}

type ReferralCode = {
  code: string;
  partner_name: string;
  partner_email: string;
  discount_pct: number;
  is_active: boolean;
  created_at: string;
  uses: number;
};

async function getReferralCodes(): Promise<ReferralCode[]> {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data: codes } = await supabase
    .from("referral_codes")
    .select("*")
    .order("created_at", { ascending: false });

  if (!codes) return [];

  const { data: uses } = await supabase
    .from("referral_uses")
    .select("code");

  const useCounts = (uses ?? []).reduce<Record<string, number>>((acc, u) => {
    acc[u.code] = (acc[u.code] ?? 0) + 1;
    return acc;
  }, {});

  return codes.map((c) => ({ ...c, uses: useCounts[c.code] ?? 0 }));
}

export default async function DoiTacPage() {
  const codes = await getReferralCodes();
  const supabaseReady = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Đối tác & Referral</h1>
          <p className="text-sm text-muted mt-1">
            Quản lý mã giảm giá cho đối tác và theo dõi số lượng người dùng được giới thiệu.
          </p>
        </div>
      </div>

      {!supabaseReady ? (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Cấu hình SUPABASE_SERVICE_ROLE_KEY để dùng tính năng này.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{codes.length}</p>
              <p className="text-xs text-muted mt-1">Đối tác</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {codes.reduce((s, c) => s + c.uses, 0)}
              </p>
              <p className="text-xs text-muted mt-1">Lượt dùng</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="text-2xl font-bold text-success">
                {codes.filter((c) => c.is_active).length}
              </p>
              <p className="text-xs text-muted mt-1">Đang hoạt động</p>
            </div>
          </div>

          {codes.length > 0 && (
            <div className="mb-6 rounded-2xl border border-border bg-surface overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface/50">
                    <th className="text-left px-4 py-3 font-medium text-muted">Mã</th>
                    <th className="text-left px-4 py-3 font-medium text-muted">Đối tác</th>
                    <th className="text-left px-4 py-3 font-medium text-muted">Giảm giá</th>
                    <th className="text-left px-4 py-3 font-medium text-muted">Lượt dùng</th>
                    <th className="text-left px-4 py-3 font-medium text-muted">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.code} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-mono text-sm text-accent">{c.code}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-foreground">{c.partner_name}</p>
                        <p className="text-xs text-muted">{c.partner_email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.discount_pct}%</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{c.uses}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.is_active ? "bg-success/20 text-success" : "bg-muted/20 text-muted"}`}>
                          {c.is_active ? "Hoạt động" : "Đã tắt"}
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
