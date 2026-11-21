"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import obligationRules from "@/content/rules/obligation_rules.json";
import riskRules from "@/content/rules/risk_rules.json";
import { evaluate } from "@/lib/engine/evaluate";
import { getTodayInVN } from "@/lib/engine/schedule";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { createClient } from "@/lib/supabase/client";
import { saveResult } from "@/app/actions/results";
import type { EngineResult, ObligationInstance, ObligationRule, ResultItem, LegalRef } from "@/lib/engine/types";
import type { Answers } from "@/lib/engine/types";
import { CONTENT_PREVIEW } from "@/lib/content/preview";

function LegalCitations({ item }: { item: ResultItem }) {
  if (item.legalRefs.length > 0) {
    return (
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {item.legalRefs.map((ref: LegalRef, i: number) => (
          <a
            key={i}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent hover:underline"
          >
            <span>📄</span>
            <span>{ref.label} – {ref.article}</span>
          </a>
        ))}
      </div>
    );
  }
  if (item.isDraft) {
    return (
      <p className="mt-2 text-xs text-muted/60 italic">
        Căn cứ pháp lý: đang được kế toán viên xác minh
      </p>
    );
  }
  return null;
}

const STORAGE_KEY = "sotay_answers_v1";

const obligationTitleMap: Record<string, string> = Object.fromEntries(
  (obligationRules as ObligationRule[]).map((r) => [r.code, r.title])
);

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
  const [answers, setAnswers] = useState<Answers>({});
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<ObligationInstance[]>([]);
  const [today, setToday] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let loadedAnswers: Answers = {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) loadedAnswers = JSON.parse(saved) as Answers;
    } catch {
      // ignore
    }

    if (Object.keys(loadedAnswers).length === 0) {
      router.replace("/kham");
      return;
    }

    setAnswers(loadedAnswers);

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        setIsLoggedIn(!!user);
      });
    }

    const todayStr = getTodayInVN();
    setToday(todayStr);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const evalResult = evaluate(loadedAnswers, obligationRules as any, riskRules as any, todayStr, [], {
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
                {item.guideSlug && (
                  <Link
                    href={`/huong-dan/${item.guideSlug}`}
                    className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                  >
                    Xem hướng dẫn xử lý →
                  </Link>
                )}
                <LegalCitations item={item} />
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
                {item.guideSlug && (
                  <Link
                    href={`/huong-dan/${item.guideSlug}`}
                    className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                  >
                    Xem hướng dẫn →
                  </Link>
                )}
                <LegalCitations item={item} />
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
                    <p className="text-sm font-medium text-foreground">
                      {obligationTitleMap[d.ruleCode] ?? d.ruleCode}
                    </p>
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
          <p className="text-3xl mb-3">🔍</p>
          <p className="font-semibold text-foreground mb-2">Nội dung đang được xác minh</p>
          <p className="text-sm text-muted max-w-sm mx-auto">
            Cơ sở dữ liệu pháp lý đang được kế toán viên có chứng chỉ rà soát.
            Kết quả đầy đủ sẽ hiển thị sau khi nội dung được xác nhận.
          </p>
          <div className="mt-5">
            <Link
              href="/thu-vien"
              className="text-sm font-medium text-accent hover:underline"
            >
              Xem thư viện hướng dẫn →
            </Link>
          </div>
        </div>
      )}

      {/* CTA: Save results */}
      <div className="mb-6 rounded-2xl border-2 border-accent/20 bg-accent/5 p-5 text-center">
        {!isSupabaseConfigured() ? (
          <>
            <p className="text-sm font-semibold text-foreground mb-1">Lưu kết quả & nhận nhắc lịch</p>
            <p className="text-xs text-muted mb-4">Tính năng này sắp ra mắt.</p>
            <button disabled className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white opacity-40 cursor-not-allowed">
              Sắp có
            </button>
          </>
        ) : saved ? (
          <>
            <p className="text-base font-semibold text-foreground mb-1">✅ Đã lưu kết quả</p>
            <p className="text-xs text-muted mb-3">Xem lại bất cứ lúc nào trong tài khoản.</p>
            <Link href="/tai-khoan" className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors">
              Xem tài khoản →
            </Link>
          </>
        ) : isLoggedIn ? (
          <>
            <p className="text-sm font-semibold text-foreground mb-1">Lưu kết quả</p>
            <p className="text-xs text-muted mb-4">Lưu vào tài khoản để xem lại và theo dõi thay đổi.</p>
            {saveError && <p className="mb-3 text-xs text-danger">{saveError}</p>}
            <button
              onClick={async () => {
                setSaving(true);
                setSaveError("");
                const r = await saveResult({
                  answers,
                  redCount: result?.red.length ?? 0,
                  yellowCount: result?.yellow.length ?? 0,
                  greenCount: result?.green.length ?? 0,
                });
                setSaving(false);
                if (r.ok) { setSaved(true); }
                else { setSaveError(r.error); }
              }}
              disabled={saving}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors disabled:opacity-50"
            >
              {saving ? "Đang lưu..." : "Lưu kết quả →"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-foreground mb-1">Lưu kết quả & nhận nhắc lịch</p>
            <p className="text-xs text-muted mb-4">Đăng nhập để lưu kết quả và nhận nhắc hạn nộp tự động.</p>
            <Link href={`/dang-nhap?next=/ket-qua`} className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors">
              Đăng nhập miễn phí →
            </Link>
          </>
        )}
      </div>

      {/* CTA: Help request */}
      {totalIssues > 0 && (
        <div className="mb-6 rounded-2xl border border-border bg-surface p-5 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">Cần người làm giúp?</p>
          <p className="text-xs text-muted mb-3">
            Chúng tôi kết nối bạn với kế toán/pháp lý uy tín để xử lý các việc trên.
          </p>
          <Link
            href="/can-giup"
            className="inline-block rounded-xl border-2 border-accent px-5 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
          >
            Tìm người làm giúp →
          </Link>
        </div>
      )}

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

      {/* Delete survey data */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            if (!window.confirm("Xóa toàn bộ câu trả lời khỏi trình duyệt này? Thao tác không thể hoàn tác.")) return;
            try {
              localStorage.removeItem(STORAGE_KEY);
              localStorage.removeItem("sotay_progress_v1");
            } catch { /* ignore */ }
            router.replace("/kham");
          }}
          className="text-xs text-muted/60 hover:text-danger underline"
        >
          Xóa dữ liệu khám
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
