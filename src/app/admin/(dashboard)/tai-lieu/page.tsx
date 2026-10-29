import Link from "next/link";
import guideVatQuarterly from "@/content/guides/khai-thue-gtgt-theo-quy.json";
import guideChanges from "@/content/guides/dang-ky-thay-doi-doanh-nghiep.json";
import type { Guide } from "@/lib/guides";

const GUIDES: Guide[] = [
  guideVatQuarterly as Guide,
  guideChanges as Guide,
];

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted/20 text-muted",
  in_review: "bg-warning/20 text-warning",
  reviewed: "bg-accent/20 text-accent",
  published: "bg-success/20 text-success",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Bản nháp",
  in_review: "Đang xem xét",
  reviewed: "Đã xem xét",
  published: "Đã xuất bản",
};

export default function TaiLieuPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tài liệu hướng dẫn</h1>
          <p className="text-sm text-muted mt-1">
            {GUIDES.length} tài liệu · Chỉnh sửa trực tiếp trong thư mục{" "}
            <code className="font-mono text-xs bg-muted/10 px-1 rounded">src/content/guides/</code>
          </p>
        </div>
        <Link href="/admin" className="text-sm text-muted hover:text-accent">
          ← Bảng điều khiển
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="text-left px-4 py-3 font-medium text-muted">Tiêu đề</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Danh mục</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Trạng thái</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {GUIDES.map((g) => (
              <tr key={g.slug} className="border-b border-border last:border-0 hover:bg-muted/5">
                <td className="px-4 py-3">
                  <Link
                    href={`/huong-dan/${g.slug}`}
                    target="_blank"
                    className="text-foreground hover:text-accent"
                  >
                    {g.title}
                  </Link>
                  <p className="font-mono text-xs text-muted mt-0.5">{g.slug}</p>
                </td>
                <td className="px-4 py-3 text-xs text-muted">{g.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[g.status] ?? STATUS_STYLES.draft}`}>
                    {STATUS_LABELS[g.status] ?? g.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted">{g.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs text-muted">
          Để thêm tài liệu mới: tạo file JSON trong{" "}
          <code className="font-mono bg-muted/10 px-1 rounded">src/content/guides/</code>{" "}
          và import vào trang hướng dẫn và trang này.
        </p>
      </div>
    </div>
  );
}
