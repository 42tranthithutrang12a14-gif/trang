import Link from "next/link";
import questions from "@/content/questions.json";

type Question = {
  id: string;
  group: string;
  group_label: string;
  order: number;
  is_conditional: boolean;
  text: string;
  type: string;
  options: Array<{ label: string; value: string }>;
  help_text: string;
};

export default function CauHoiPage() {
  const grouped = (questions as Question[]).reduce<Record<string, Question[]>>((acc, q) => {
    if (!acc[q.group]) acc[q.group] = [];
    acc[q.group].push(q);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Câu hỏi khám</h1>
          <p className="text-sm text-muted mt-1">
            {questions.length} câu hỏi · Chỉ xem. Chỉnh sửa trực tiếp trong file{" "}
            <code className="font-mono text-xs bg-muted/10 px-1 rounded">src/content/questions.json</code>.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-muted hover:text-accent">
          ← Bảng điều khiển
        </Link>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([group, qs]) => (
          <div key={group} className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="border-b border-border bg-muted/5 px-5 py-3">
              <h2 className="text-sm font-semibold text-foreground">
                Nhóm {group} — {qs[0].group_label}
              </h2>
            </div>
            <div className="divide-y divide-border">
              {qs.sort((a, b) => a.order - b.order).map((q) => (
                <div key={q.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {q.order}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{q.text}</p>
                        {q.is_conditional && (
                          <span className="text-xs bg-muted/20 text-muted rounded-full px-2 py-0.5">
                            Điều kiện
                          </span>
                        )}
                        <span className="text-xs bg-accent/10 text-accent rounded-full px-2 py-0.5">
                          {q.type}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-muted mb-2">id: {q.id}</p>
                      {q.help_text && (
                        <p className="text-xs text-muted italic mb-2">{q.help_text}</p>
                      )}
                      {q.options.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt) => (
                            <span
                              key={opt.value}
                              className="text-xs border border-border rounded-lg px-2 py-1 text-muted"
                            >
                              {opt.label}{" "}
                              <span className="font-mono text-muted/60">({opt.value})</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
