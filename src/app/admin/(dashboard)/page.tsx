import Link from "next/link";
import obligationRules from "@/content/rules/obligation_rules.json";
import riskRules from "@/content/rules/risk_rules.json";

type RuleStatus = "draft" | "in_review" | "reviewed" | "published";

function countByStatus(rules: Array<{ status: string }>) {
  const counts: Record<RuleStatus, number> = {
    draft: 0,
    in_review: 0,
    reviewed: 0,
    published: 0,
  };
  for (const r of rules) {
    const s = r.status as RuleStatus;
    if (s in counts) counts[s]++;
  }
  return counts;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-muted/20 text-muted",
    in_review: "bg-warning/20 text-warning",
    reviewed: "bg-accent/20 text-accent",
    published: "bg-success/20 text-success",
  };
  const labels: Record<string, string> = {
    draft: "Bản nháp",
    in_review: "Đang xem xét",
    reviewed: "Đã xem xét",
    published: "Đã xuất bản",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] ?? styles.draft}`}>
      {labels[status] ?? status}
    </span>
  );
}

function RuleSummaryCard({
  title,
  counts,
  href,
}: {
  title: string;
  counts: Record<RuleStatus, number>;
  href: string;
}) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <Link href={href} className="text-xs text-accent hover:underline">
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(["draft", "in_review", "reviewed", "published"] as RuleStatus[]).map((s) => (
          <div key={s} className="flex items-center justify-between rounded-xl border border-border px-3 py-2">
            <StatusBadge status={s} />
            <span className="text-sm font-bold text-foreground">{counts[s]}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted text-right">{total} quy tắc tổng cộng</p>
    </div>
  );
}

export default function AdminPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const oCounts = countByStatus(obligationRules as any[]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rCounts = countByStatus(riskRules as any[]);

  const publishedTotal = oCounts.published + rCounts.published;
  const pendingTotal = oCounts.draft + oCounts.in_review + rCounts.draft + rCounts.in_review;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Bảng điều khiển</h1>
      <p className="text-sm text-muted mb-8">
        Kiểm tra và xét duyệt nội dung pháp lý trước khi xuất bản cho người dùng.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
        <div className="rounded-2xl border border-success/30 bg-success-bg p-4 text-center">
          <p className="text-2xl font-bold text-success">{publishedTotal}</p>
          <p className="text-xs text-muted mt-1">Đã xuất bản</p>
        </div>
        <div className="rounded-2xl border border-warning/30 bg-warning-bg p-4 text-center">
          <p className="text-2xl font-bold text-warning">{pendingTotal}</p>
          <p className="text-xs text-muted mt-1">Chờ xem xét</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{obligationRules.length}</p>
          <p className="text-xs text-muted mt-1">Nghĩa vụ</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{riskRules.length}</p>
          <p className="text-xs text-muted mt-1">Rủi ro</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RuleSummaryCard title="Quy tắc nghĩa vụ" counts={oCounts} href="/admin/nghia-vu" />
        <RuleSummaryCard title="Quy tắc rủi ro" counts={rCounts} href="/admin/rui-ro" />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-base font-semibold text-foreground mb-3">Hướng dẫn quy trình duyệt nội dung</h2>
        <ol className="space-y-2 text-sm text-muted list-decimal list-inside">
          <li>Mở quy tắc cần xem xét từ danh sách Nghĩa vụ hoặc Rủi ro.</li>
          <li>Đọc phần <strong className="text-foreground">Việc cần làm</strong> — đây là danh sách cần kiểm tra pháp lý.</li>
          <li>Điền thông tin pháp lý thực tế vào file JSON tương ứng (hoặc nhờ chuyên gia điền).</li>
          <li>Chuyển trạng thái sang <strong className="text-foreground">Đang xem xét</strong> khi bắt đầu.</li>
          <li>Sau khi xác minh xong, chuyển sang <strong className="text-foreground">Đã xem xét</strong>.</li>
          <li>Chỉ chuyển sang <strong className="text-foreground">Đã xuất bản</strong> khi kế toán/luật sư đã xác nhận.</li>
        </ol>
        <p className="mt-4 text-xs text-danger/80 font-medium">
          ⚠️ Không xuất bản nội dung chưa được chuyên gia xác nhận. Sai sót có thể gây thiệt hại pháp lý cho người dùng.
        </p>
      </div>
    </div>
  );
}
