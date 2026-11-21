import { notFound } from "next/navigation";
import Link from "next/link";
import riskRules from "@/content/rules/risk_rules.json";
import { ReviewForm } from "../../_components/ReviewForm";

export default async function RuiRoDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rule = (riskRules as any[]).find((r) => r.code === code);
  if (!rule) notFound();

  const levelColors: Record<string, string> = {
    red: "text-danger",
    yellow: "text-warning",
    green: "text-success",
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/rui-ro" className="text-sm text-muted hover:text-accent">
          ← Rủi ro
        </Link>
        <span className="text-muted/50">/</span>
        <span className="font-mono text-sm text-foreground">{rule.code}</span>
      </div>

      <h1 className="text-xl font-bold text-foreground mb-1">{rule.title}</h1>
      {rule.sample_notice && (
        <p className="text-xs font-semibold text-danger mb-4">{rule.sample_notice}</p>
      )}

      <div className="mb-6 rounded-2xl border border-border bg-surface p-5 space-y-3">
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Tiêu đề khi ổn</p>
          <p className="text-sm text-foreground">{rule.ok_title || "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Giải thích</p>
          <p className="text-sm text-foreground">{rule.explain_plain || "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Mức độ rủi ro</p>
          <p className={`text-sm font-semibold ${levelColors[rule.level] ?? "text-foreground"}`}>
            {rule.level ?? "—"}
          </p>
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

      {/* Fix steps */}
      {rule.fix_steps?.length > 0 && (
        <div className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-bold text-foreground mb-3">Các bước khắc phục</h2>
          <ol className="list-decimal list-inside space-y-1">
            {rule.fix_steps.map((step: string, i: number) => (
              <li key={i} className="text-sm text-foreground">{step}</li>
            ))}
          </ol>
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

      <ReviewForm
        ruleCode={rule.code}
        ruleType="risk"
        currentStatus={rule.status ?? "draft"}
      />
    </div>
  );
}
