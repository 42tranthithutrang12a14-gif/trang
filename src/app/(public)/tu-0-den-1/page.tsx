import type { Metadata } from "next";
import Link from "next/link";
import tu0Den1Json from "@/content/tu-0-den-1.json";
import { DraftNotice } from "@/components/draft-notice";
import { filterIncentives, filterStages, type Incentive, type Tu0Den1Content } from "@/lib/tu-0-den-1";
import { Checklist } from "./Checklist";

export const metadata: Metadata = {
  title: "Từ 0 - đến 1 — Sổ tay DN Siêu nhỏ",
  description: "Danh sách việc cần làm từng bước, từ lúc chưa có công ty đến khi sẵn sàng bán hàng.",
};

const CONTENT_PREVIEW = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true";

const CONTENT = tu0Den1Json as Tu0Den1Content;

const incentiveLevels: Record<Incentive["level"], { label: string; className: string }> = {
  "phai-biet": { label: "Phải biết", className: "bg-danger/10 text-danger" },
  "nen-biet": { label: "Nên biết", className: "bg-accent/10 text-accent" },
};

export default function Tu0Den1Page() {
  const stages = filterStages(CONTENT.stages, CONTENT_PREVIEW);
  const incentives = filterIncentives(CONTENT.incentives, CONTENT_PREVIEW);
  const units = [
    ...stages.flatMap((stage) => [stage, ...stage.steps]),
    ...(incentives ? [incentives, ...incentives.items] : []),
  ];
  const showsUnpublished = units.some((unit) => unit.status !== "published");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {showsUnpublished && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Nội dung mẫu chưa xác minh — chỉ dùng để thử nghiệm
        </div>
      )}

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Từ 0 - đến 1</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">Từ chưa có công ty đến sẵn sàng bán hàng</h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          Danh sách việc cần làm theo thứ tự, chia thành từng bước nhỏ. Làm xong việc nào thì đánh dấu việc đó.
        </p>
        {incentives && stages.length > 0 && (
          <a href="#uu-dai" className="mt-3 inline-block text-sm text-accent hover:underline">
            Xem ưu đãi và lợi thế nên biết ↓
          </a>
        )}
      </div>

      {units.length === 0 && (
        <div className="mb-10 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-base font-semibold text-foreground">Nội dung đang được kiểm duyệt</p>
        </div>
      )}

      {stages.length > 0 && <Checklist stages={stages} />}

      {incentives && (
        <section id="uu-dai" className="mt-12 scroll-mt-20">
          <DraftNotice unit={incentives} />
          <h2 className="text-lg font-bold text-foreground mb-1">{incentives.title}</h2>
          <p className="text-sm text-muted mb-5">{incentives.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {incentives.items.map((item) => (
              <div key={item.id} className="rounded-xl border border-border bg-surface p-4">
                <DraftNotice unit={item} />
                <span className={`block w-fit rounded-full px-2 py-0.5 text-xs font-medium ${incentiveLevels[item.level].className}`}>
                  {incentiveLevels[item.level].label}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-foreground">Ai được hưởng: </span>
                  {item.who}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-foreground">Ưu đãi: </span>
                  {item.benefit}
                </p>
                <ul className="mt-2 space-y-1">
                  {item.how.map((step, j) => (
                    <li key={j} className="flex gap-2 text-xs text-foreground">
                      <span className="text-accent">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                {item.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {item.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs leading-relaxed text-muted">
          Thông tin mang tính tham khảo, không phải tư vấn pháp lý hay thuế. Thủ tục và ưu đãi có thể thay đổi.
          Hãy đối chiếu văn bản gốc hoặc hỏi kế toán viên có chứng chỉ hành nghề trước khi làm.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/bat-dau" className="text-accent hover:underline">
          Đã bán hàng? Xem việc cần làm trong năm đầu →
        </Link>
        <Link href="/khung-phap-ly" className="text-accent hover:underline">
          Xem khung pháp lý →
        </Link>
      </div>
    </div>
  );
}
