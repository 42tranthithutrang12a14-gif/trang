import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bắt đầu kinh doanh — Khung tư duy pháp lý & thuế",
  description:
    "Hướng dẫn toàn diện cho người chưa biết gì: 3 trụ cột cần nắm, việc phải làm ngay trong năm đầu, lịch deadline hàng năm và những sai lầm phổ biến nhất.",
};

const CONTENT_PREVIEW = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true";

const PILLARS = [
  {
    icon: "🏛️",
    title: "Pháp lý doanh nghiệp",
    color: "border-accent bg-accent/5",
    titleColor: "text-accent",
    desc: "Công ty tồn tại hợp pháp, thông tin luôn đúng với đăng ký. Thay đổi gì phải báo Sở KHĐT trong 10 ngày.",
    examples: ["Góp đủ vốn điều lệ trong 90 ngày", "Đăng ký thay đổi địa chỉ, người đại diện", "Lưu hồ sơ thành lập"],
  },
  {
    icon: "🧾",
    title: "Thuế",
    color: "border-warning bg-warning-bg",
    titleColor: "text-warning",
    desc: "Khai đúng hạn quan trọng hơn khai đúng số. Chậm nộp tờ khai bị phạt ngay cả khi không phát sinh thuế.",
    examples: ["GTGT: khai hàng tháng hoặc hàng quý", "TNDN: tạm nộp theo quý, quyết toán năm", "Môn bài: nộp 1 lần/năm trước 30/1"],
  },
  {
    icon: "📒",
    title: "Kế toán",
    color: "border-success bg-success-bg",
    titleColor: "text-success",
    desc: "Ghi chép mọi giao dịch ngay từ ngày thành lập. Kế toán là bằng chứng khi cơ quan thuế kiểm tra.",
    examples: ["Mở sổ kế toán từ ngày đầu", "Lưu hóa đơn, chứng từ ít nhất 10 năm", "Nộp báo cáo tài chính trước 31/3 mỗi năm"],
  },
];

const YEAR_ONE_STEPS = [
  {
    timing: "Tuần 1–2",
    urgency: "hot",
    title: "Ngay sau khi có Giấy chứng nhận ĐKDN",
    tasks: [
      { text: "Mở tài khoản ngân hàng doanh nghiệp", note: "Cần: GCN ĐKDN + CCCD người đại diện" },
      { text: "Đặt mua chữ ký số (USB Token hoặc Remote)", note: "Cần để nộp thuế, BHXH, hồ sơ điện tử" },
      { text: "Thuê kế toán hoặc dịch vụ kế toán", note: "DNSN: 1–5 triệu/tháng cho dịch vụ ngoài" },
    ],
  },
  {
    timing: "Tháng 1",
    urgency: "hot",
    title: "Trước khi xuất hóa đơn đầu tiên",
    tasks: [
      { text: "Đăng ký hóa đơn điện tử tại hoadondientu.gdt.gov.vn", note: "Bắt buộc với mọi DN từ 01/07/2022" },
      { text: "Đăng ký kê khai thuế GTGT (tháng hoặc quý)", note: "Nếu DN mới → mặc định khai theo quý" },
      { text: "Mở sổ kế toán (Excel hoặc phần mềm)", note: "Theo Thông tư 132/2018 cho DNSN" },
    ],
  },
  {
    timing: "Trong 90 ngày",
    urgency: "deadline",
    title: "Bắt buộc trước khi hết 90 ngày",
    tasks: [
      { text: "Góp đủ vốn điều lệ đã đăng ký vào tài khoản công ty", note: "Quá hạn → phải đăng ký giảm vốn hoặc bị phạt" },
    ],
  },
  {
    timing: "Tháng 1–3",
    urgency: "normal",
    title: "Hoàn thiện nền tảng vận hành",
    tasks: [
      { text: "Đăng ký con dấu doanh nghiệp (nếu cần)", note: "DN tự quyết định có dùng con dấu hay không" },
      { text: "Đăng ký BHXH nếu có nhân viên", note: "Phải đăng ký trong 30 ngày kể từ ngày ký HĐLĐ" },
      { text: "Nộp lệ phí môn bài năm đầu", note: "Miễn năm đầu nếu thành lập trong năm — xác minh với kế toán" },
    ],
  },
  {
    timing: "Quý đầu tiên",
    urgency: "normal",
    title: "Bắt đầu chu kỳ khai thuế",
    tasks: [
      { text: "Nộp tờ khai GTGT đầu tiên (dù không phát sinh)", note: "Khai quý: hạn ngày 30 của tháng đầu quý tiếp theo" },
      { text: "Tạm nộp thuế TNDN quý (nếu có lợi nhuận)", note: "Hạn ngày 30 của tháng đầu quý tiếp theo" },
    ],
  },
];

const ANNUAL_MONTHS = [
  { month: "Tháng 1", items: [{ text: "Nộp lệ phí môn bài", deadline: "30/1", type: "tax" }] },
  { month: "T1, T4, T7, T10", items: [{ text: "Khai & nộp thuế GTGT quý", deadline: "30 của tháng đó", type: "tax" }, { text: "Tạm nộp thuế TNDN quý", deadline: "30 của tháng đó", type: "tax" }] },
  { month: "Hàng tháng", items: [{ text: "Khai GTGT tháng (nếu khai theo tháng)", deadline: "Ngày 20 tháng tiếp theo", type: "tax" }, { text: "Đóng BHXH, BHYT, BHTN", deadline: "Cuối tháng", type: "hr" }] },
  { month: "Tháng 3", items: [{ text: "Quyết toán thuế TNDN năm trước", deadline: "31/3", type: "tax" }, { text: "Nộp báo cáo tài chính năm trước", deadline: "31/3", type: "accounting" }] },
];

const MISTAKES = [
  {
    icon: "❌",
    title: "Không mở sổ kế toán từ ngày đầu",
    consequence: "Khi thuế kiểm tra, không có bằng chứng. Phạt và truy thu cả phần không chứng minh được.",
    fix: "Thuê dịch vụ kế toán từ tháng đầu, dù chưa có doanh thu.",
  },
  {
    icon: "❌",
    title: "Bỏ qua tờ khai thuế vì \"tháng này không bán được gì\"",
    consequence: "Tờ khai phải nộp đúng hạn kể cả khi doanh thu = 0. Phạt 2–5 triệu đồng/lần chậm.",
    fix: "Lịch nhắc hàng tháng/quý. Giao kế toán nộp tờ khai không phát sinh.",
  },
  {
    icon: "❌",
    title: "Chưa đăng ký hóa đơn điện tử đã bán hàng",
    consequence: "Doanh thu không có hóa đơn hợp lệ → không được ghi nhận chi phí bên mua → mất khách B2B.",
    fix: "Đăng ký HĐĐT tại hoadondientu.gdt.gov.vn trước khi nhận tiền đầu tiên.",
  },
  {
    icon: "❌",
    title: "Không góp đủ vốn điều lệ sau 90 ngày",
    consequence: "Vi phạm Luật DN. Phải đăng ký giảm vốn hoặc bị phạt hành chính.",
    fix: "Chuyển tiền vào tài khoản công ty đúng số vốn đã đăng ký trong 90 ngày.",
  },
  {
    icon: "❌",
    title: "Lẫn lộn tiền cá nhân và tiền công ty",
    consequence: "Không tính được doanh thu, chi phí thực. Kế toán không thể làm báo cáo. Thuế không đối chiếu được.",
    fix: "Mọi thu chi kinh doanh đều qua tài khoản ngân hàng công ty. Không dùng tài khoản cá nhân.",
  },
  {
    icon: "❌",
    title: "Thay đổi địa chỉ, người đại diện mà không đăng ký",
    consequence: "Vi phạm Luật DN. Phạt 10–20 triệu đồng. Thư từ cơ quan thuế gửi sai địa chỉ.",
    fix: "Bất kỳ thay đổi nào → đăng ký tại dangkykinhdoanh.gov.vn trong 10 ngày.",
  },
];

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

export default function BatDauPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {CONTENT_PREVIEW && (
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
          mà là cách nhìn tổng thể: phải làm gì, làm khi nào, và những lỗi nào
          khiến hầu hết DN siêu nhỏ bị phạt trong năm đầu.
        </p>
      </div>

      {/* 3 pillars */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-foreground mb-1">3 trụ cột bạn phải quản lý song song</h2>
        <p className="text-sm text-muted mb-5">
          Kinh doanh hợp pháp không chỉ là "đóng thuế". Có 3 mảng độc lập — bỏ sót bất kỳ cái nào cũng bị phạt.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className={`rounded-2xl border-2 ${p.color} p-5`}>
              <div className="text-2xl mb-2">{p.icon}</div>
              <h3 className={`text-sm font-bold mb-2 ${p.titleColor}`}>{p.title}</h3>
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

      {/* Year 1 timeline */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-foreground mb-1">Năm đầu tiên: làm gì và làm khi nào</h2>
        <p className="text-sm text-muted mb-6">
          Theo thứ tự thời gian từ ngày nhận Giấy chứng nhận ĐKDN.
        </p>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {YEAR_ONE_STEPS.map((step, i) => (
              <div key={i} className="relative pl-10">
                <div className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-surface ${
                  step.urgency === "hot" ? "bg-danger" : step.urgency === "deadline" ? "bg-warning" : "bg-accent"
                }`} />
                <div className="rounded-xl border border-border bg-surface p-4">
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

      {/* Annual cycle */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-foreground mb-1">Chu kỳ hàng năm: lịch deadline không được bỏ</h2>
        <p className="text-sm text-muted mb-5">
          Sau năm đầu, công việc trở thành lặp đi lặp lại. Nắm được lịch này là nắm được 80% việc cần làm.
        </p>
        <div className="space-y-3">
          {ANNUAL_MONTHS.map((row, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-sm font-bold text-foreground mb-2">{row.month}</p>
              <div className="space-y-2">
                {row.items.map((item, j) => (
                  <div key={j} className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[item.type]}`}>
                      {typeLabels[item.type]}
                    </span>
                    <span className="text-sm text-foreground">{item.text}</span>
                    <span className="text-xs text-muted">— hạn: {item.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-4">
          <p className="text-xs font-semibold text-accent mb-1">Nguyên tắc số 1</p>
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Nộp tờ khai đúng hạn quan trọng hơn nộp đúng số tiền.</strong>{" "}
            Nếu không chắc số thuế, nộp tờ khai trước — khai gần đúng rồi bổ sung sau còn
            hơn bỏ lỡ hạn và bị phạt tự động.
          </p>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-1">6 sai lầm phổ biến nhất trong năm đầu</h2>
        <p className="text-sm text-muted mb-5">
          Hầu hết đều tránh được nếu biết trước.
        </p>
        <div className="space-y-3">
          {MISTAKES.map((m, i) => (
            <div key={i} className="rounded-xl border border-danger/20 bg-surface p-4">
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{m.icon}</span>
                <div>
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
