import { createClient as createServiceClient } from "@supabase/supabase-js";
import { ReviewForm } from "./ReviewForm";

type PaymentRequest = {
  id: string;
  user_id: string;
  amount: number;
  transfer_note: string;
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
};

type SearchParams = Promise<{ filter?: string }>;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + " ₫";
}

async function getPaymentRequests(filterPending: boolean): Promise<PaymentRequest[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  const supabase = createServiceClient(url, key);
  let q = supabase
    .from("payment_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (filterPending) q = q.eq("status", "pending");

  const { data } = await q;
  return (data ?? []) as PaymentRequest[];
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Chờ duyệt", cls: "bg-warning/20 text-warning" },
  approved: { label: "Đã duyệt", cls: "bg-success/20 text-success" },
  rejected: { label: "Từ chối", cls: "bg-danger/20 text-danger" },
};

export default async function ThanhToanPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const filterPending = params.filter !== "all";
  const supabaseReady = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  const requests = await getPaymentRequests(filterPending);
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Yêu cầu thanh toán</h1>
          <p className="text-sm text-muted mt-1">
            Xem xét và duyệt yêu cầu nâng cấp Pro.
            {filterPending && pendingCount > 0 && (
              <span className="ml-2 rounded-full bg-warning/20 px-2 py-0.5 text-xs font-semibold text-warning">
                {pendingCount} đang chờ
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/admin/thanh-toan"
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filterPending ? "bg-accent text-white" : "border border-border text-muted hover:border-accent hover:text-accent"}`}
          >
            Chờ duyệt
          </a>
          <a
            href="/admin/thanh-toan?filter=all"
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${!filterPending ? "bg-accent text-white" : "border border-border text-muted hover:border-accent hover:text-accent"}`}
          >
            Tất cả
          </a>
        </div>
      </div>

      {!supabaseReady ? (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Cấu hình SUPABASE_SERVICE_ROLE_KEY để dùng tính năng này.</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">
            {filterPending ? "Không có yêu cầu nào đang chờ duyệt." : "Chưa có yêu cầu thanh toán nào."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const st = STATUS_LABELS[req.status] ?? STATUS_LABELS.pending;
            return (
              <div key={req.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${st.cls}`}>
                        {st.label}
                      </span>
                      <span className="text-xs text-muted">{formatDate(req.created_at)}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{formatVND(req.amount)}</p>
                    <p className="text-xs font-mono text-accent">{req.transfer_note}</p>
                    <p className="text-xs text-muted break-all">User: {req.user_id}</p>
                    {req.admin_note && (
                      <p className="text-xs text-muted italic">Ghi chú: {req.admin_note}</p>
                    )}
                    {req.reviewed_by && req.reviewed_at && (
                      <p className="text-xs text-muted">
                        Duyệt bởi {req.reviewed_by} lúc {formatDate(req.reviewed_at)}
                      </p>
                    )}
                  </div>
                </div>
                {req.status === "pending" && (
                  <ReviewForm requestId={req.id} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
