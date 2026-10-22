"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import obligationRules from "@/content/rules/obligation_rules.json";
import riskRules from "@/content/rules/risk_rules.json";
import { evaluate } from "@/lib/engine/evaluate";
import { getTodayInVN } from "@/lib/engine/schedule";
import type { EngineResult, ObligationInstance } from "@/lib/engine/types";
import type { Answers } from "@/lib/engine/types";

const STORAGE_KEY = "sotay_answers_v1";
const CONTENT_PREVIEW = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function daysUntil(dateStr: string, today: string): number {
  const d = new Date(dateStr);
  const t = new Date(today);
  return Math.round((d.getTime() - t.getTime()) / (1000 * 60 * 60 * 24));
}

function urgencyLabel(days: number): { label: string; className: string } {
  if (days < 0) return { label: "Đã qua hạn", className: "text-danger" };
  if (days <= 7) return { label: `Còn ${days} ngày`, className: "text-danger font-semibold" };
  if (days <= 30) return { label: `Còn ${days} ngày`, className: "text-warning font-semibold" };
  return { label: `Còn ${days} ngày`, className: "text-muted" };
}

export default function KetQuaPage() {
  const router = useRouter();
  const [result, setResult] = useState<EngineResult | null>(null);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<ObligationInstance[]>([]);
  const [today, setToday] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let answers: Answers = {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) answers = JSON.parse(saved) as Answers;
    } catch {
      // ignore
    }

    if (Object.keys(answers).length === 0) {
      router.replace("/kham");
      return;
    }

    const todayStr = getTodayInVN();
    setToday(todayStr);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const evalResult = evaluate(answers, obligationRules as any, riskRules as any, todayStr, [], {
      includeDraft: CONTENT_PREVIEW,
    });

    setResult(evalResult);

    const sorted = [...evalResult.obligations]
      .filter((o) => o.dueDate >= todayStr)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 3);
    setUpcomingDeadlines(sorted);

    setLoaded(true);
  }, [router]);

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Đang tính toán...</p>
      </div>
    );
  }

  if (!result) return null;

  const totalIssues = result.red.length + result.yellow.length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {CONTENT_PREVIEW && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Nội dung mẫu chưa xác minh — chỉ dùng để thử nghiệm
        </div>
      )}

      {/* Summary header */}
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">
          Kết quả khám sức khỏe pháp lý
        </p>
        {totalIssues === 0 ? (
          <h1 className="text-2xl font-bold text-foreground">
            Công ty bạn đang ở trạng thái tốt 🎉
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-foreground">
            Tìm thấy{" "}
            {result.red.length > 0 && (
              <span className="text-danger">{result.red.length} việc cần làm ngay</span>
            )}
            {result.red.length > 0 && result.yellow.length > 0 && " và "}
            {result.yellow.length > 0 && (
              <span className="text-warning">{result.yellow.length} việc cần kiểm tra</span>
            )}
          </h1>
        )}
        <p className="mt-2 text-sm text-muted">
          Kết quả dựa trên câu trả lời của bạn — không thay thế tư vấn kế toán chuyên nghiệp.
        </p>
      </div>

      {/* Red: Cần làm ngay */}
      {result.red.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-danger">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger text-white text-xs">!</span>
            Cần làm ngay ({result.red.length})
          </h2>
          <div className="space-y-3">
            {result.red.map((item) => (
              <div
                key={item.code}
                className="rounded-xl border-2 border-danger/30 bg-danger-bg p-4"
              >
                {item.isDraft && (
                  <p className="mb-1 text-xs font-semibold text-red-600">MẪU – CHƯA XÁC MINH</p>
                )}
                <p className="font-semibold text-foreground">{item.title}</p>
                {item.explain && (
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.explain}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Yellow: Cần kiểm tra */}
      {result.yellow.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-warning">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning text-white text-xs">?</span>
            Cần kiểm tra ({result.yellow.length})
          </h2>
          <div className="space-y-3">
            {result.yellow.map((item) => (
              <div
                key={item.code}
                className="rounded-xl border-2 border-warning/30 bg-warning-bg p-4"
              >
                {item.isDraft && (
                  <p className="mb-1 text-xs font-semibold text-yellow-700">MẪU – CHƯA XÁC MINH</p>
                )}
                <p className="font-semibold text-foreground">{item.title}</p>
                {item.explain && (
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.explain}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Green: Đang ổn */}
      {result.green.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-success">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white text-xs">✓</span>
            Đang ổn ({result.green.length})
          </h2>
          <div className="space-y-2">
            {result.green.map((item) => (
              <div
                key={item.code}
                className="rounded-xl border border-success/30 bg-success-bg px-4 py-3"
              >
                <p className="text-sm font-medium text-foreground">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming deadlines */}
      {upcomingDeadlines.length > 0 && (
        <section className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-4 text-base font-bold text-foreground">
            📅 Hạn nộp sắp đến
          </h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((d) => {
              const days = daysUntil(d.dueDate, today);
              const { label, className } = urgencyLabel(days);
              return (
                <div key={`${d.ruleCode}-${d.dueDate}`} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{d.ruleCode}</p>
                    <p className="text-xs text-muted">{d.periodLabel}</p>
                    {d.shiftedFrom && (
                      <p className="text-xs text-muted">
                        (dời từ {formatDate(d.shiftedFrom)})
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground">{formatDate(d.dueDate)}</p>
                    <p className={`text-xs ${className}`}>{label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty state */}
      {result.red.length === 0 && result.yellow.length === 0 && result.green.length === 0 && upcomingDeadlines.length === 0 && (
        <div className="mb-6 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-muted text-sm">
            Chưa có dữ liệu kiểm tra. Thêm nội dung pháp lý để xem kết quả chi tiết.
          </p>
        </div>
      )}

      {/* CTA: Save results */}
      <div className="mb-6 rounded-2xl border-2 border-accent/20 bg-accent/5 p-5 text-center">
        <p className="text-sm font-semibold text-foreground mb-1">
          Lưu kết quả và nhận nhắc lịch
        </p>
        <p className="text-xs text-muted mb-4">
          Tính năng này sắp ra mắt — đăng ký để nhận thông báo khi có.
        </p>
        <button
          disabled
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white opacity-40 cursor-not-allowed"
        >
          Sắp có → Lưu & nhận nhắc
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/kham"
          className="flex-1 rounded-xl border-2 border-border px-4 py-3 text-center text-sm font-medium text-muted hover:border-accent hover:text-accent transition-colors"
        >
          ← Làm lại từ đầu
        </Link>
        <button
          onClick={() => {
            try { window.print(); } catch { /* ignore */ }
          }}
          className="flex-1 rounded-xl border-2 border-border px-4 py-3 text-sm font-medium text-muted hover:border-accent hover:text-accent transition-colors"
        >
          In kết quả
        </button>
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs leading-relaxed text-muted/70">
        Kết quả chỉ mang tính tham khảo dựa trên câu trả lời bạn cung cấp. Đây không phải dịch vụ
        kế toán hay tư vấn pháp lý. Với trường hợp cụ thể, hãy đối chiếu văn bản gốc hoặc hỏi
        người có chứng chỉ hành nghề.
      </p>
    </div>
  );
}
