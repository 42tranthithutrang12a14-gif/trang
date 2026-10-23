import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biết ngay công ty bạn đang thiếu gì về thuế và pháp lý",
};

const BENEFITS = [
  {
    icon: "🩺",
    title: "Biết ngay mình đang thiếu gì",
    desc: "Trả lời câu hỏi về loại hình, ngành, quy mô và cách làm kế toán — nhận danh sách cụ thể: việc cần làm ngay, việc cần kiểm tra, và việc đang ổn.",
  },
  {
    icon: "📅",
    title: "Lịch hạn nộp của riêng công ty bạn",
    desc: "Hạn nộp tờ khai thuế GTGT, thuế TNDN, báo cáo tài chính — tính đúng theo kỳ kế toán và ngày thành lập của công ty bạn.",
  },
  {
    icon: "📋",
    title: "Hướng dẫn từng bước xử lý",
    desc: "Mỗi vấn đề được phát hiện kèm hướng dẫn cụ thể: làm gì, làm ở đâu, căn cứ pháp lý nào — không phải lý thuyết chung chung.",
  },
];

const FAQS = [
  {
    q: "App này có phải dịch vụ kế toán không?",
    a: "Không. Sổ tay DN Siêu nhỏ cung cấp thông tin tham khảo đã được kế toán viên có chứng chỉ hành nghề rà soát. Với trường hợp cụ thể của từng công ty, bạn cần đối chiếu văn bản gốc hoặc hỏi người có chứng chỉ hành nghề.",
  },
  {
    q: "Kết quả có chính xác không?",
    a: "Kết quả dựa hoàn toàn vào câu trả lời bạn cung cấp và bộ quy tắc do kế toán viên xây dựng. Nếu trả lời đúng thực tế, kết quả phản ánh đúng nghĩa vụ của công ty bạn. Vì vậy hãy trả lời thật — không có câu nào là \"sai\".",
  },
  {
    q: "Tôi có cần tạo tài khoản không?",
    a: "Không cần tài khoản để khám và xem kết quả. Kết quả lưu tạm trên trình duyệt của bạn. Tạo tài khoản (miễn phí) để lưu kết quả lâu dài và xem lại sau.",
  },
  {
    q: "Thông tin tôi cung cấp có được bảo mật không?",
    a: "Câu trả lời ở bước khám chỉ lưu trên thiết bị của bạn — không gửi lên server. App không thu thập mật khẩu ngân hàng, số CCCD hay thông tin thẻ.",
  },
  {
    q: "Doanh nghiệp siêu nhỏ là loại nào?",
    a: "Theo quy định hiện hành, doanh nghiệp siêu nhỏ trong lĩnh vực thương mại, dịch vụ có doanh thu không quá 10 tỷ đồng/năm và không quá 10 lao động. App phù hợp cho cả những DN lớn hơn — bộ quy tắc áp dụng theo đặc điểm thực tế của công ty bạn.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Miễn phí · Không cần tài khoản
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Biết ngay công ty bạn<br className="hidden md:block" /> đang thiếu gì về thuế và pháp lý
          </h1>
          <p className="mt-5 mx-auto max-w-xl text-base leading-relaxed text-muted">
            Trả lời 23 câu hỏi trong 5 phút. Nhận danh sách việc cần làm và lịch hạn nộp của
            riêng công ty bạn. Miễn phí.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/kham"
              className="rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-dark"
            >
              Khám miễn phí 5 phút →
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted">
            Kết quả lưu trên trình duyệt của bạn, không cần tạo tài khoản
          </p>
        </div>
      </section>

      {/* 3 lợi ích */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-foreground">
          Ba điều app giúp bạn
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="text-3xl">{b.icon}</span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-foreground mb-10">
            Cách hoạt động
          </h2>
          <div className="grid gap-0 md:grid-cols-3 relative">
            {[
              {
                step: "1",
                title: "Trả lời câu hỏi",
                desc: "Trả lời các câu hỏi về loại hình công ty, ngành nghề, cách nộp thuế và tình trạng hiện tại. Khoảng 5 phút.",
              },
              {
                step: "2",
                title: "Nhận danh sách cụ thể",
                desc: "App phân tích câu trả lời và trả về: việc cần làm ngay (màu đỏ), việc cần kiểm tra (màu vàng), và lịch hạn nộp.",
              },
              {
                step: "3",
                title: "Xử lý từng việc",
                desc: "Mỗi mục kèm hướng dẫn từng bước. Cần người làm giúp? Kết nối với kế toán uy tín ngay trên app.",
              },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center px-6 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white text-base font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-accent">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Đừng để vi phạm xảy ra vì không biết mình đang thiếu gì.
          </h2>
          <p className="text-sm text-white/80">
            5 phút khám — biết ngay danh sách việc cần làm và lịch hạn nộp của riêng công ty bạn.
          </p>
          <Link
            href="/kham"
            className="mt-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-accent transition-colors hover:bg-white/90"
          >
            Bắt đầu khám miễn phí →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Câu hỏi thường gặp</h2>
        <div className="mt-8 space-y-5">
          {FAQS.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-semibold text-foreground">{faq.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-xs leading-relaxed text-muted/80">
            Sổ tay DN Siêu nhỏ cung cấp thông tin tham khảo đã được kế toán viên rà soát. Đây không
            phải dịch vụ kế toán, dịch vụ làm thủ tục về thuế hay tư vấn pháp lý. Với trường hợp cụ
            thể, hãy đối chiếu văn bản gốc hoặc hỏi người có chứng chỉ hành nghề.
          </p>
        </div>
      </div>
    </div>
  );
}
