import { createClient as createServiceClient } from "@supabase/supabase-js";
import { AssignForm } from "./AssignForm";

type HelpRequest = {
  id: string;
  user_id: string | null;
  contact_name: string;
  contact_phone: string;
  contact_email: string | null;
  notes: string | null;
  status: "new" | "assigned" | "completed";
  partner_id: string | null;
  commission_note: string | null;
  created_at: string;
  assigned_at: string | null;
  completed_at: string | null;
};

type Partner = { id: string; name: string };
type SearchParams = Promise<{ filter?: string }>;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

async function getData(filterStatus: string | undefined): Promise<{ requests: HelpRequest[]; partners: Partner[] }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { requests: [], partners: [] };

  const supabase = createServiceClient(url, key);

  let q = supabase
    .from("help_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (filterStatus && filterStatus !== "all") {
    q = q.eq("status", filterStatus);
  }

  const [{ data: requests }, { data: partners }] = await Promise.all([
    q,
    supabase.from("partners").select("id, name").eq("is_active", true).order("name"),
  ]);

  return {
    requests: (requests ?? []) as HelpRequest[],
    partners: (partners ?? []) as Partner[],
  };
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  new: { label: "Mới", cls: "bg-accent/10 text-accent" },
  assigned: { label: "Đã giao", cls: "bg-warning/20 text-warning" },
  completed: { label: "Hoàn thành", cls: "bg-success/20 text-success" },
};

const FILTER_OPTIONS = [
  { value: "new", label: "Mới" },
  { value: "assigned", label: "Đã giao" },
  { value: "all", label: "Tất cả" },
];

export default async function YeuCauPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const filter = params.filter ?? "new";
  const { requests, partners } = await getData(filter === "all" ? undefined : filter);
  const supabaseReady = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Yêu cầu hỗ trợ</h1>
          <p className="text-sm text-muted mt-1">Kết nối khách hàng với đối tác kế toán/pháp lý.</p>
        </div>
        <div className="flex gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`/admin/yeu-cau?filter=${opt.value}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === opt.value ? "bg-accent text-white" : "border border-border text-muted hover:border-accent hover:text-accent"}`}
            >
              {opt.label}
            </a>
          ))}
        </div>
      </div>

      {!supabaseReady ? (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Cấu hình SUPABASE_SERVICE_ROLE_KEY để dùng tính năng này.</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">Chưa có yêu cầu nào.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const st = STATUS_LABELS[req.status] ?? STATUS_LABELS.new;
            return (
              <div key={req.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${st.cls}`}>
                        {st.label}
                      </span>
                      <span className="text-xs text-muted">{formatDate(req.created_at)}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{req.contact_name}</p>
                    <p className="text-xs text-muted">{req.contact_phone}</p>
                    {req.contact_email && (
                      <p className="text-xs text-muted">{req.contact_email}</p>
                    )}
                    {req.notes && (
                      <p className="text-xs text-muted italic">{req.notes}</p>
                    )}
                    {req.commission_note && (
                      <p className="text-xs text-muted">Hoa hồng: {req.commission_note}</p>
                    )}
                    {req.completed_at && (
                      <p className="text-xs text-success">Hoàn thành: {formatDate(req.completed_at)}</p>
                    )}
                  </div>
                </div>
                <AssignForm
                  requestId={req.id}
                  partners={partners}
                  currentStatus={req.status}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
