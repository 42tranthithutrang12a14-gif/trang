import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import thaoTacJson from "@/content/thao-tac.json";
import { visibleGuides, type ThaoTacContent, type ThaoTacGuide } from "@/lib/thao-tac";
import { CONTENT_PREVIEW } from "@/lib/content/preview";

const CONTENT = thaoTacJson as ThaoTacContent;

function findGuide(slug: string): ThaoTacGuide | undefined {
  return visibleGuides(CONTENT, CONTENT_PREVIEW).find((guide) => guide.slug === slug);
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

export default async function ThaoTacPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  const isDraft = guide.status !== "published";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {isDraft && guide.sample_notice && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          {guide.sample_notice} — các bước chưa đối chiếu với giao diện thật
        </div>
      )}

      <div className="mb-2 flex items-center gap-2 text-xs text-muted">
        <Link href="/cong-cu#thao-tac" className="hover:text-accent">Công cụ</Link>
        <span>/</span>
        <span>Hướng dẫn từng cú nhấp chuột</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-3">{guide.title}</h1>
      <p className="text-sm text-muted mb-4">{guide.summary}</p>

      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
        <a
          href={guide.portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-accent/40 px-3 py-1 font-medium text-accent hover:bg-accent/5"
        >
          Mở {guide.portal.label} ↗
        </a>
        <span className="rounded-full bg-border px-3 py-1 font-medium text-muted">
          {guide.need_login ? "Cần đăng nhập" : "Không cần đăng nhập"}
        </span>
        <span className="rounded-full bg-border px-3 py-1 font-medium text-muted">{guide.steps.length} bước</span>
      </div>

      {guide.prepare.length > 0 && (
        <div className="mb-8 rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-2 text-sm font-bold text-foreground">Chuẩn bị trước</h2>
          <ul className="space-y-1.5">
            {guide.prepare.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-foreground">
                <span className="text-accent">☐</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ol className="space-y-6">
        {guide.steps.map((step, i) => (
          <li key={i} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold leading-snug text-foreground">{step.action}</p>
                {step.detail && <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>}
              </div>
            </div>
            {step.image && step.image_width && step.image_height ? (
              <Image
                src={step.image}
                alt={step.image_alt ?? `Màn hình ở bước ${i + 1}`}
                width={step.image_width}
                height={step.image_height}
                sizes="(max-width: 672px) 100vw, 632px"
                loading={i === 0 ? "eager" : "lazy"}
                className="mt-4 h-auto w-full rounded-xl border border-border"
              />
            ) : (
              isDraft && (
                <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-6 text-center text-xs text-muted">
                  Chưa có ảnh minh họa cho bước này
                </div>
              )
            )}
            {step.source && <p className="mt-2 text-xs text-muted">Nguồn: {step.source}</p>}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs leading-relaxed text-muted">
          Giao diện các cổng của cơ quan nhà nước có thể thay đổi. Nếu màn hình của bạn khác hướng dẫn, hãy làm theo
          hướng dẫn trên chính cổng đó. Thông tin mang tính tham khảo, không phải tư vấn pháp lý hay thuế.
          Đã cập nhật: {CONTENT.updated_at}.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/lo-trinh" className="text-accent hover:underline">
          ← Về lộ trình
        </Link>
        <Link href="/cong-cu#thao-tac" className="text-accent hover:underline">
          Xem các hướng dẫn khác
        </Link>
      </div>
    </div>
  );
}
