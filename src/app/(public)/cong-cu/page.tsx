import type { Metadata } from "next";
import Link from "next/link";
import ledgerJson from "@/content/so-ke-toan.json";
import thaoTacJson from "@/content/thao-tac.json";
import { DraftNotice } from "@/components/draft-notice";
import { isVisible } from "@/lib/bat-dau";
import { CONTENT_PREVIEW } from "@/lib/content/preview";
import type { LedgerSpec } from "@/lib/so-ke-toan";
import { visibleGuides, type ThaoTacContent } from "@/lib/thao-tac";

export const metadata: Metadata = {
  title: "Công cụ — Sổ tay DN Siêu nhỏ",
  description: "Sổ thu chi Excel dùng ngay và hướng dẫn thao tác trên các cổng nhà nước, từng cú nhấp chuột.",
};

const LEDGER = ledgerJson as LedgerSpec;

export default function CongCuPage() {
  const ledger = isVisible(LEDGER.status, CONTENT_PREVIEW) ? LEDGER : null;
  const guides = visibleGuides(thaoTacJson as ThaoTacContent, CONTENT_PREVIEW);
  const showsUnpublished = [...(ledger ? [ledger] : []), ...guides].some((unit) => unit.status !== "published");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {showsUnpublished && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Nội dung mẫu chưa xác minh — chỉ dùng để thử nghiệm
        </div>
      )}

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Công cụ</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">Công cụ dùng ngay</h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          Tải về là dùng được. Không cần cài phần mềm, không cần tài khoản.
        </p>
      </div>

      {!ledger && guides.length === 0 && (
        <div className="mb-10 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-base font-semibold text-foreground">Nội dung đang được kiểm duyệt</p>
        </div>
      )}

      {ledger && (
        <section id="so-thu-chi" className="mb-12 scroll-mt-20 rounded-2xl border-2 border-accent/30 bg-surface p-6">
          <DraftNotice unit={ledger} />
          <div className="flex items-start gap-3">
            <span className="text-3xl">📒</span>
            <div>
              <h2 className="text-lg font-bold text-foreground">{ledger.title} (file Excel)</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{ledger.summary}</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-warning/40 bg-warning-bg px-4 py-3 text-xs leading-relaxed text-foreground">
            {ledger.notice}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="/tai-ve/so-thu-chi.xlsx"
              download={ledger.file_name}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              ⬇ Tải sổ thu chi (Excel)
            </a>
            <p className="text-xs text-muted">Mở bằng Excel, Google Sheets hoặc LibreOffice.</p>
          </div>

          <h3 className="mt-6 mb-2 text-sm font-bold text-foreground">Dùng thế nào</h3>
          <ol className="space-y-2">
            {ledger.how_to_use.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ol>

          <h3 className="mt-6 mb-2 text-sm font-bold text-foreground">Trong file có {ledger.sheets.length} trang</h3>
          <ul className="space-y-1.5">
            {ledger.sheets.map((sheet) => (
              <li key={sheet.name} className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">{sheet.name}: </span>
                {sheet.desc}
              </li>
            ))}
          </ul>

          <details className="mt-5">
            <summary className="cursor-pointer text-sm font-semibold text-accent">
              Xem {ledger.income_groups.length + ledger.expense_groups.length} nhóm thu, chi có sẵn (bạn sửa và thêm được)
            </summary>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Nhóm thu", groups: ledger.income_groups },
                { label: "Nhóm chi", groups: ledger.expense_groups },
              ].map(({ label, groups }) => (
                <div key={label}>
                  <p className="mb-1.5 text-xs font-semibold text-foreground">{label}</p>
                  <ul className="space-y-1.5">
                    {groups.map((group) => (
                      <li key={group.name} className="text-xs leading-relaxed text-muted">
                        <span className="font-medium text-foreground">{group.name}</span>
                        {!group.in_result && <span className="ml-1 rounded bg-border px-1 py-0.5">không tính vào lãi, lỗ</span>}
                        <br />
                        {group.example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-semibold text-accent">Lưu ý khi ghi sổ</summary>
            <ul className="mt-3 space-y-1.5">
              {ledger.notes.map((note) => (
                <li key={note} className="flex gap-2 text-sm text-muted">
                  <span>•</span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </details>
        </section>
      )}

      {guides.length > 0 && (
        <section id="thao-tac" className="mb-12 scroll-mt-20">
          <h2 className="text-lg font-bold text-foreground mb-1">Hướng dẫn từng cú nhấp chuột</h2>
          <p className="text-sm text-muted mb-5">
            Thao tác trên các cổng của cơ quan nhà nước: bấm vào đâu, gõ gì, màn hình hiện gì.
          </p>
          <div className="space-y-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/thao-tac/${guide.slug}`}
                className="block rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
              >
                <DraftNotice unit={guide} />
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg">🖱️</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-snug text-foreground">{guide.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{guide.summary}</p>
                    <p className="mt-1.5 text-xs text-muted">
                      {guide.steps.length} bước · {guide.portal.label}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-muted">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Công cụ khác</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { href: "/lo-trinh", icon: "🧭", title: "Lộ trình", desc: "Chỉ ra việc tiếp theo bạn cần làm." },
            { href: "/tu-0-den-1", icon: "✅", title: "Từ 0 - đến 1", desc: "Danh sách việc từ lúc chưa có công ty." },
            { href: "/kham", icon: "🩺", title: "Khám 5 phút", desc: "Biết công ty đang thiếu gì." },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <span className="text-2xl">{tool.icon}</span>
              <p className="mt-2 text-sm font-semibold text-foreground">{tool.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs leading-relaxed text-muted">
          Công cụ mang tính tham khảo, không phải dịch vụ kế toán hay tư vấn thuế. Hãy đối chiếu văn bản gốc
          trước khi dùng số liệu để khai thuế.
        </p>
      </div>
    </div>
  );
}
