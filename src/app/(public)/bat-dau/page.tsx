import type { Metadata } from "next";
import Link from "next/link";
import batDauJson from "@/content/bat-dau.json";
import {
  filterBatDau,
  flattenUnits,
  type BatDauContent,
  type Pillar,
  type Principle,
  type Reviewable,
} from "@/lib/bat-dau";

export const metadata: Metadata = {
  title: "Bắt đầu kinh doanh — Khung tư duy pháp lý & thuế",
  description:
    "Khung tư duy pháp lý và thuế cho người mới bắt đầu kinh doanh: phải làm gì và làm khi nào.",
};

const CONTENT_PREVIEW = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true";

const CONTENT = batDauJson as BatDauContent;

const pillarTones: Record<Pillar["tone"], { box: string; title: string }> = {
  accent: { box: "border-accent bg-accent/5", title: "text-accent" },
  warning: { box: "border-warning bg-warning-bg", title: "text-warning" },
  success: { box: "border-success bg-success-bg", title: "text-success" },
};

const typeColors: Record<string, string> = {
  tax: "bg-warning/10 text-warning border-warning/30",
  accounting: "bg-accent/10 text-accent border-accent/30",
  hr: "bg-success/10 text-success border-success/30",
};

const typeLabels: Record<string, string> = {
  tax: "Thuế",
  accounting: "Kế toán",
  hr: "Lao động",
};

function DraftNotice({ unit }: { unit: Reviewable }) {
  if (unit.status === "published" || !unit.sample_notice) return null;
  return (
    <span className="mb-2 inline-block rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">
      {unit.sample_notice}
    </span>
  );
}

function PrincipleBox({ principle, className }: { principle: Principle; className: string }) {
  return (
    <div className={`rounded-xl border border-accent/20 bg-accent/5 p-4 ${className}`}>
      <DraftNotice unit={principle} />
      <p className="text-xs font-semibold text-accent mb-1">{principle.label}</p>
      <p className="text-sm text-foreground leading-relaxed">
        <strong>{principle.lead}</strong> {principle.body}
      </p>
    </div>
  );
}

export default function BatDauPage() {
  const visible = filterBatDau(CONTENT, CONTENT_PREVIEW);
  const units = flattenUnits(visible);
  const showsUnpublished = units.some((unit) => unit.status !== "published");
  const { pillars, year_one: yearOne, annual, principle, mistakes } = visible;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {showsUnpublished && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Nội dung mẫu chưa xác minh — chỉ dùng để thử nghiệm
        </div>
      )}

      {/* Hero */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Khung tư duy</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Bắt đầu kinh doanh: cần biết gì về luật và thuế?
        </h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          Dành cho người chưa biết gì. Không phải danh sách điều luật —
          mà là cách nhìn tổng thể: phải làm gì và làm khi nào.
        </p>
      </div>

      {units.length === 0 && (
        <div className="mb-10 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-base font-semibold text-foreground">Nội dung đang được kiểm duyệt</p>
        </div>
      )}

      {/* Pillars */}
      {pillars && (
        <section className="mb-12">
          <DraftNotice unit={pillars} />
          <h2 className="text-lg font-bold text-foreground mb-1">{pillars.title}</h2>
          <p className="text-sm text-muted mb-5">{pillars.intro}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.items.map((p) => (
              <div key={p.id} className={`rounded-2xl border-2 ${pillarTones[p.tone].box} p-5`}>
                <DraftNotice unit={p} />
                <div className="text-2xl mb-2">{p.icon}</div>
                <h3 className={`text-sm font-bold mb-2 ${pillarTones[p.tone].title}`}>{p.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-3">{p.desc}</p>
                <ul className="space-y-1">
                  {p.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-1.5 text-xs text-foreground">
                      <span className="mt-0.5 text-muted">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Year 1 timeline */}
      {yearOne && (
        <section className="mb-12">
          <DraftNotice unit={yearOne} />
          <h2 className="text-lg font-bold text-foreground mb-1">{yearOne.title}</h2>
          <p className="text-sm text-muted mb-6">{yearOne.intro}</p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {yearOne.items.map((step) => (
                <div key={step.id} className="relative pl-10">
                  <div className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-surface ${
                    step.urgency === "hot" ? "bg-danger" : step.urgency === "deadline" ? "bg-warning" : "bg-accent"
                  }`} />
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <DraftNotice unit={step} />
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        step.urgency === "hot"
                          ? "bg-danger/10 text-danger"
                          : step.urgency === "deadline"
                          ? "bg-warning/10 text-warning"
                          : "bg-accent/10 text-accent"
                      }`}>
                        {step.timing}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{step.title}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {step.tasks.map((task, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-muted">
                            {j + 1}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-foreground">{task.text}</p>
                            <p className="text-xs text-muted mt-0.5">{task.note}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Annual cycle */}
      {annual && (
        <section className="mb-12">
          <DraftNotice unit={annual} />
          <h2 className="text-lg font-bold text-foreground mb-1">{annual.title}</h2>
          <p className="text-sm text-muted mb-5">{annual.intro}</p>
          <div className="space-y-3">
            {annual.items.map((row) => (
              <div key={row.id} className="rounded-xl border border-border bg-surface p-4">
                <DraftNotice unit={row} />
                <p className="text-sm font-bold text-foreground mb-2">{row.month}</p>
                <div className="space-y-2">
                  {row.entries.map((entry, j) => (
                    <div key={j} className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[entry.type]}`}>
                        {typeLabels[entry.type]}
                      </span>
                      <span className="text-sm text-foreground">{entry.text}</span>
                      <span className="text-xs text-muted">— hạn: {entry.deadline}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {principle && <PrincipleBox principle={principle} className="mt-4" />}
        </section>
      )}

      {!annual && principle && <PrincipleBox principle={principle} className="mb-12" />}

      {/* Common mistakes */}
      {mistakes && (
        <section className="mb-10">
          <DraftNotice unit={mistakes} />
          <h2 className="text-lg font-bold text-foreground mb-1">{mistakes.title}</h2>
          <p className="text-sm text-muted mb-5">{mistakes.intro}</p>
          <div className="space-y-3">
            {mistakes.items.map((m) => (
              <div key={m.id} className="rounded-xl border border-danger/20 bg-surface p-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">{m.icon}</span>
                  <div>
                    <DraftNotice unit={m} />
                    <p className="text-sm font-semibold text-foreground mb-1">{m.title}</p>
                    <p className="text-xs text-muted leading-relaxed mb-2">
                      <span className="font-medium text-danger">Hậu quả: </span>{m.consequence}
                    </p>
                    <p className="text-xs text-foreground leading-relaxed">
                      <span className="font-medium text-success">✓ Cách tránh: </span>{m.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="rounded-2xl border-2 border-accent/20 bg-accent/5 p-6 text-center">
        <p className="text-sm font-semibold text-foreground mb-2">
          Muốn biết công ty bạn đang thiếu gì cụ thể?
        </p>
        <p className="text-xs text-muted mb-4">
          Trả lời 23 câu hỏi về tình hình thực tế — nhận danh sách việc cần làm ngay của riêng công ty bạn.
        </p>
        <Link
          href="/kham"
          className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
        >
          Khám miễn phí →
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs leading-relaxed text-muted">
          Thông tin mang tính tham khảo, được tổng hợp từ văn bản quy phạm pháp luật chính thức.
          Với tình huống cụ thể của công ty bạn, hãy đối chiếu văn bản gốc hoặc tham vấn kế toán viên có chứng chỉ hành nghề.
          Tra cứu văn bản gốc tại{" "}
          <a href="https://vbpl.moj.gov.vn" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            vbpl.moj.gov.vn
          </a>.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/khung-phap-ly" className="text-accent hover:underline">
          Xem khung pháp lý chi tiết →
        </Link>
        <Link href="/thu-vien" className="text-accent hover:underline">
          Xem thư viện hướng dẫn →
        </Link>
      </div>
    </div>
  );
}
