import type { Metadata } from "next";
import Link from "next/link";
import framework from "@/content/legal-framework.json";

export const metadata: Metadata = {
  title: "Khung pháp lý — Sổ tay DN Siêu nhỏ",
  description:
    "Tổng hợp các văn bản pháp luật cốt lõi doanh nghiệp siêu nhỏ cần nắm: thuế, kế toán, hóa đơn, lao động, BHXH. Kèm link nguồn chính thức từ cổng gov.vn.",
};

const CONTENT_PREVIEW = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true";

type Law = {
  name: string;
  number: string;
  issued_by: string;
  effective_from: string;
  url: string;
  congbao_url: string;
  key_points: string[];
  todo_for_reviewer: string[];
};

type Category = {
  id: string;
  label: string;
  icon: string;
  laws: Law[];
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
    >
      {children}
      <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

function LawCard({ law }: { law: Law }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <p className="text-sm font-semibold text-foreground leading-snug">{law.name}</p>
          <p className="text-xs text-muted mt-0.5">
            Số {law.number} · {law.issued_by} · Hiệu lực: {law.effective_from}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <ExternalLink href={law.url}>Bộ Tư pháp</ExternalLink>
          <ExternalLink href={law.congbao_url}>Công báo</ExternalLink>
        </div>
      </div>

      {law.key_points.length > 0 && (
        <ul className="space-y-1.5">
          {law.key_points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {CONTENT_PREVIEW && law.todo_for_reviewer.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-xs text-warning font-medium">
            ⚠️ Cần xác minh ({law.todo_for_reviewer.length} mục)
          </summary>
          <ul className="mt-2 space-y-1 pl-3 border-l-2 border-warning/30">
            {law.todo_for_reviewer.map((item, i) => (
              <li key={i} className="text-xs text-muted">{item}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default function KhungPhapLyPage() {
  const isDraft = framework.status === "draft";
  const categories = framework.categories as Category[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {CONTENT_PREVIEW && isDraft && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          {framework.sample_notice}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
          Tham chiếu pháp lý
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-3">Khung pháp lý doanh nghiệp siêu nhỏ</h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          Tổng hợp các văn bản pháp luật cốt lõi bạn cần nắm khi vận hành doanh nghiệp tại Việt Nam.
          Mỗi mục kèm link nguồn chính thức từ cổng{" "}
          <a href="https://vbpl.moj.gov.vn" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            vbpl.moj.gov.vn
          </a>{" "}
          (Bộ Tư pháp) và{" "}
          <a href="https://congbao.chinhphu.vn" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            congbao.chinhphu.vn
          </a>{" "}
          để bạn đối chiếu văn bản gốc.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-8 rounded-xl border border-warning/40 bg-warning-bg p-4">
        <p className="text-xs font-semibold text-warning mb-1">Lưu ý quan trọng</p>
        <p className="text-xs leading-relaxed text-foreground">
          Thông tin mang tính tham khảo, được tổng hợp từ văn bản quy phạm pháp luật chính thức.
          Luật thuế và pháp luật doanh nghiệp tại Việt Nam thay đổi thường xuyên —
          hãy đối chiếu với văn bản gốc hoặc tham vấn kế toán viên có chứng chỉ hành nghề trước khi áp dụng.
        </p>
      </div>

      {/* Category jump links */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted hover:border-accent/50 hover:text-accent transition-colors"
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </a>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{cat.icon}</span>
              <h2 className="text-lg font-bold text-foreground">{cat.label}</h2>
            </div>
            <div className="space-y-3">
              {cat.laws.map((law, i) => (
                <LawCard key={i} law={law} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs leading-relaxed text-muted">
          Cập nhật lần cuối: {framework.updated_at}. Thông tin mang tính tham khảo dựa trên văn bản pháp luật
          do cơ quan nhà nước ban hành. Tra cứu văn bản gốc tại{" "}
          <a href="https://vbpl.moj.gov.vn" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            vbpl.moj.gov.vn
          </a>{" "}
          và{" "}
          <a href="https://congbao.chinhphu.vn" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            congbao.chinhphu.vn
          </a>.
        </p>
      </div>

      <div className="mt-6">
        <Link href="/thu-vien" className="text-sm text-accent hover:underline">
          ← Xem thư viện hướng dẫn
        </Link>
      </div>
    </div>
  );
}
