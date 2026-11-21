import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import type { Guide } from "@/lib/guides";
import guideVatQuarterly from "@/content/guides/khai-thue-gtgt-theo-quy.json";
import guideVatMonthly from "@/content/guides/khai-thue-gtgt-theo-thang.json";
import guideCIT from "@/content/guides/tam-nop-thue-tndn.json";
import guideChanges from "@/content/guides/dang-ky-thay-doi-doanh-nghiep.json";
import guideDigitalSig from "@/content/guides/chu-ky-so.json";
import guideEInvoice from "@/content/guides/hoa-don-dien-tu.json";
import guideCapital from "@/content/guides/gop-von-dieu-le.json";
import guideBookkeeping from "@/content/guides/so-sach-ke-toan.json";
import { CONTENT_PREVIEW } from "@/lib/content/preview";

const GUIDES: Guide[] = [
  guideVatQuarterly as Guide,
  guideVatMonthly as Guide,
  guideCIT as Guide,
  guideChanges as Guide,
  guideDigitalSig as Guide,
  guideEInvoice as Guide,
  guideCapital as Guide,
  guideBookkeeping as Guide,
];

function findGuide(slug: string): Guide | undefined {
  const g = GUIDES.find((g) => g.slug === slug);
  if (!g) return undefined;
  if (g.status !== "published" && !CONTENT_PREVIEW) return undefined;
  return g;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return { title: "Không tìm thấy" };
  return {
    title: `${guide.title} — Sổ tay DN Siêu nhỏ`,
    description: guide.summary,
  };
}

export default async function HuongDanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  const categoryLabels: Record<string, string> = {
    thue: "Thuế",
    "ke-toan": "Kế toán",
    "phap-ly": "Pháp lý",
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {CONTENT_PREVIEW && guide.sample_notice && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          {guide.sample_notice}
        </div>
      )}

      <div className="mb-2 flex items-center gap-2 text-xs text-muted">
        <Link href="/thu-vien" className="hover:text-accent">Thư viện</Link>
        <span>/</span>
        <span>{categoryLabels[guide.category] ?? guide.category}</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-3">{guide.title}</h1>
      <p className="text-sm text-muted mb-8">{guide.summary}</p>

      <div className="space-y-6">
        {guide.body_sections.map((section, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-foreground mb-3">{section.heading}</h2>
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs leading-relaxed text-muted">
          Thông tin mang tính tham khảo dựa trên câu trả lời bạn cung cấp. Không thay thế tư vấn
          kế toán hoặc pháp lý chuyên nghiệp. Đã cập nhật: {guide.updated_at}.
        </p>
      </div>

      <div className="mt-6">
        <Link href="/thu-vien" className="text-sm text-accent hover:underline">
          ← Quay lại thư viện
        </Link>
      </div>
    </div>
  );
}
