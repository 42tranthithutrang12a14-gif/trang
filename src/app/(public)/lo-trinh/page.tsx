import type { Metadata } from "next";
import Link from "next/link";
import loTrinhJson from "@/content/lo-trinh.json";
import thaoTacJson from "@/content/thao-tac.json";
import tu0Den1Json from "@/content/tu-0-den-1.json";
import { CONTENT_PREVIEW } from "@/lib/content/preview";
import { visibleRoutines, type RoadmapContent } from "@/lib/lo-trinh";
import { guideLinksByStep, visibleGuides, type ThaoTacContent } from "@/lib/thao-tac";
import { filterStages, type Tu0Den1Content } from "@/lib/tu-0-den-1";
import { Roadmap } from "./Roadmap";

export const metadata: Metadata = {
  title: "Lộ trình — Sổ tay DN Siêu nhỏ",
  description: "Chưa biết bắt đầu từ đâu? Chọn chỗ bạn đang đứng, sổ tay chỉ ra việc tiếp theo và cách làm.",
};

const CONTENT = loTrinhJson as RoadmapContent;

export default function LoTrinhPage() {
  const checklist = filterStages((tu0Den1Json as Tu0Den1Content).stages, CONTENT_PREVIEW);
  const routines = visibleRoutines(CONTENT, CONTENT_PREVIEW);
  const guideLinks = guideLinksByStep(visibleGuides(thaoTacJson as ThaoTacContent, CONTENT_PREVIEW));
  const units = [...checklist.flatMap((stage) => [stage, ...stage.steps]), ...routines];
  const showsUnpublished = units.some((unit) => unit.status !== "published");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {showsUnpublished && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Nội dung mẫu chưa xác minh — chỉ dùng để thử nghiệm
        </div>
      )}

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Lộ trình</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">Bắt đầu từ đây</h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          Không cần biết gì trước. Chọn chỗ bạn đang đứng. Sổ tay chỉ ra việc tiếp theo, cách làm từng bước và
          công cụ đi kèm.
        </p>
      </div>

      <Roadmap stages={CONTENT.stages} checklist={checklist} routines={routines} guideLinks={guideLinks} />

      <div className="mt-10 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs leading-relaxed text-muted">
          Thông tin mang tính tham khảo, không phải tư vấn pháp lý hay thuế. Thủ tục có thể thay đổi. Hãy đối chiếu
          văn bản gốc trước khi làm. Tiến độ của bạn chỉ lưu trên trình duyệt này.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/bat-dau" className="text-accent hover:underline">
          Khung tư duy: việc cần làm trong năm đầu →
        </Link>
        <Link href="/khung-phap-ly" className="text-accent hover:underline">
          Khung pháp lý →
        </Link>
        <Link href="/thu-vien" className="text-accent hover:underline">
          Thư viện hướng dẫn →
        </Link>
      </div>
    </div>
  );
}
