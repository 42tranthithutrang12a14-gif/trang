import type { Metadata } from "next";
import Link from "next/link";
import obligationRules from "@/content/rules/obligation_rules.json";
import riskRules from "@/content/rules/risk_rules.json";

export const metadata: Metadata = {
  title: "Thư viện — Sổ tay DN Siêu nhỏ",
  description: "Hướng dẫn chi tiết về thuế, kế toán và pháp lý cho doanh nghiệp siêu nhỏ",
};

const CONTENT_PREVIEW = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true";

const CATEGORIES = [
  { slug: "thue", label: "Thuế" },
  { slug: "ke-toan", label: "Kế toán" },
  { slug: "phap-ly", label: "Pháp lý" },
];

type Guide = {
  slug: string;
  title: string;
  summary: string;
  type: "obligation" | "risk";
  level?: "red" | "yellow";
  isDraft: boolean;
};

function buildGuideList(): Guide[] {
  const guides: Guide[] = [];

  for (const r of obligationRules) {
    if (r.status !== "published" && !CONTENT_PREVIEW) continue;
    guides.push({
      slug: r.guide_slug,
      title: r.title,
      summary: r.summary_plain,
      type: "obligation",
      isDraft: r.status === "draft",
    });
  }

  for (const r of riskRules) {
    if (r.status !== "published" && !CONTENT_PREVIEW) continue;
    guides.push({
      slug: r.guide_slug,
      title: r.title,
      summary: r.explain_plain || "Hướng dẫn chi tiết sắp có.",
      type: "risk",
      level: r.level as "red" | "yellow",
      isDraft: r.status === "draft",
    });
  }

  return guides;
}

export default function ThuVienPage() {
  const guides = buildGuideList();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {CONTENT_PREVIEW && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Nội dung mẫu chưa xác minh — chỉ dùng để thử nghiệm
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Thư viện hướng dẫn</h1>
        <p className="mt-2 text-sm text-muted">
          Giải thích chi tiết về từng nghĩa vụ thuế, kế toán và pháp lý — có căn cứ pháp lý và
          các bước thực hiện.
        </p>
      </div>

      {guides.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <p className="text-3xl mb-4">📚</p>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Nội dung đang được biên soạn
          </h2>
          <p className="text-sm leading-relaxed text-muted max-w-sm mx-auto">
            Thư viện hướng dẫn đang được kế toán viên có chứng chỉ rà soát và xác minh.
            Nội dung sẽ được đăng theo từng phần sau khi được xác nhận.
          </p>
          <div className="mt-6">
            <Link
              href="/kham"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              Khám sức khỏe pháp lý miễn phí →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {guides.map((g) => (
            <div
              key={g.slug}
              className="rounded-xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors"
            >
              {g.isDraft && (
                <span className="inline-block mb-2 rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">
                  Bản mẫu — chưa xác minh
                </span>
              )}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-base">
                  {g.type === "obligation" ? "📋" : g.level === "red" ? "🔴" : "🟡"}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-foreground leading-snug">{g.title}</h2>
                  {g.summary && (
                    <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">{g.summary}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-semibold text-foreground mb-1">Về nội dung thư viện</p>
        <p className="text-xs leading-relaxed text-muted">
          Mọi nội dung pháp lý được kế toán viên có chứng chỉ hành nghề rà soát và đối chiếu với
          văn bản gốc trước khi đăng. Thông tin mang tính tham khảo — không thay thế tư vấn chuyên nghiệp.
        </p>
      </div>
    </div>
  );
}
