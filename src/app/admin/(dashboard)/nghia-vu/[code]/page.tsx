import { notFound } from "next/navigation";
import Link from "next/link";
import obligationRules from "@/content/rules/obligation_rules.json";
import { ReviewForm } from "../../_components/ReviewForm";

export default async function NghiaVuDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rule = (obligationRules as any[]).find((r) => r.code === code);
  if (!rule) notFound();

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/nghia-vu" className="text-sm text-muted hover:text-accent">
          ← Nghĩa vụ
        </Link>
        <span className="text-muted/50">/</span>
        <span className="font-mono text-sm text-foreground">{rule.code}</span>
      </div>

      <h1 className="text-xl font-bold text-foreground mb-1">{rule.title}</h1>
      {rule.sample_notice && (
        <p className="text-xs font-semibold text-danger mb-4">{rule.sample_notice}</p>
      )}

      {/* Summary */}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-5 space-y-3">
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Tóm tắt</p>
          <p className="text-sm text-foreground">{rule.summary_plain || "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Lý do áp dụng</p>
          <p className="text-sm text-foreground">{rule.why_plain || "—"}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Mức độ</p>
            <p className="text-sm text-foreground">{rule.severity || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Hiệu lực từ</p>
            <p className="text-sm text-foreground">{rule.effective_from || "—"}</p>
          </div>
        </div>
      </div>

      {/* Todo for reviewer */}
      {rule.todo_for_reviewer?.length > 0 && (
        <div className="mb-6 rounded-2xl border-2 border-warning/30 bg-warning-bg p-5">
          <h2 className="text-sm font-bold text-warning mb-3">
            ⚠️ Việc cần làm trước khi xuất bản ({rule.todo_for_reviewer.length} mục)
          </h2>
          <ul className="space-y-2">
            {rule.todo_for_reviewer.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 flex-shrink-0 h-4 w-4 rounded border border-warning/50 bg-white/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Schedule */}
      {rule.schedule && (
        <div className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-bold text-foreground mb-3">Lịch nộp</h2>
          <pre className="text-xs text-muted font-mono whitespace-pre-wrap overflow-auto">
            {JSON.stringify(rule.schedule, null, 2)}
          </pre>
        </div>
      )}

      {/* Legal basis */}
      {rule.legal_basis?.length > 0 && (
        <div className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-bold text-foreground mb-3">Căn cứ pháp lý</h2>
          <ul className="space-y-1">
            {rule.legal_basis.map((b: string, i: number) => (
              <li key={i} className="text-sm text-foreground">{b}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Review form */}
      <ReviewForm
        ruleCode={rule.code}
        ruleType="obligation"
        currentStatus={rule.status ?? "draft"}
      />
    </div>
  );
}
