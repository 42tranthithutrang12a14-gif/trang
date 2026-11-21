import Link from "next/link";
import obligationRules from "@/content/rules/obligation_rules.json";

type RuleStatus = "draft" | "in_review" | "reviewed" | "published";

const STATUS_LABELS: Record<RuleStatus, string> = {
  draft: "Bản nháp",
  in_review: "Đang xem xét",
  reviewed: "Đã xem xét",
  published: "Đã xuất bản",
};

const STATUS_STYLES: Record<RuleStatus, string> = {
  draft: "bg-muted/20 text-muted",
  in_review: "bg-warning/20 text-warning",
  reviewed: "bg-accent/20 text-accent",
  published: "bg-success/20 text-success",
};

export default function NghiaVuListPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quy tắc nghĩa vụ</h1>
          <p className="text-sm text-muted mt-1">
            {obligationRules.length} quy tắc · Nhấn vào một quy tắc để xem chi tiết và cập nhật trạng thái.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-muted hover:text-accent">
          ← Bảng điều khiển
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="text-left px-4 py-3 font-medium text-muted">Mã</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Tiêu đề</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Mức độ</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Trạng thái</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Việc cần làm</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(obligationRules as any[]).map((rule) => {
              const status = (rule.status ?? "draft") as RuleStatus;
              const todoCount = rule.todo_for_reviewer?.length ?? 0;
              return (
                <tr key={rule.code} className="border-b border-border last:border-0 hover:bg-muted/5">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/nghia-vu/${rule.code}`}
                      className="font-mono text-xs text-accent hover:underline"
                    >
                      {rule.code}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/nghia-vu/${rule.code}`} className="text-foreground hover:text-accent">
                      {rule.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted">{rule.severity ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status] ?? STATUS_STYLES.draft}`}>
                      {STATUS_LABELS[status] ?? status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {todoCount > 0 ? (
                      <span className="text-xs text-warning">{todoCount} mục</span>
                    ) : (
                      <span className="text-xs text-success">Hoàn thành</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
