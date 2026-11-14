import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Miễn trừ trách nhiệm — Sổ tay DN Siêu nhỏ",
};

export default function MienTruPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">Miễn trừ trách nhiệm</h1>
      <p className="text-sm text-muted mb-8">Cập nhật lần cuối: tháng 10 năm 2026</p>

      <div className="rounded-xl border-2 border-warning/40 bg-warning-bg p-5 mb-8">
        <p className="text-sm font-semibold text-warning mb-1">Lưu ý quan trọng</p>
        <p className="text-sm leading-relaxed text-foreground">
          Sổ tay DN Siêu nhỏ cung cấp thông tin tham khảo đã được kế toán viên có chứng chỉ hành
          nghề rà soát. Đây <strong>không phải</strong> dịch vụ kế toán, dịch vụ làm thủ tục về
          thuế hay tư vấn pháp lý.
        </p>
      </div>

      <div className="space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Tính chính xác của thông tin</h2>
          <p className="text-sm leading-relaxed text-muted">
            Mặc dù chúng tôi nỗ lực đảm bảo thông tin trong App chính xác và cập nhật, luật thuế
            và pháp luật doanh nghiệp tại Việt Nam thay đổi thường xuyên. Chúng tôi không đảm bảo
            tính đầy đủ, chính xác hoặc kịp thời của mọi thông tin tại mọi thời điểm.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. Không thay thế tư vấn chuyên nghiệp</h2>
          <p className="text-sm leading-relaxed text-muted">
            Kết quả từ bảng hỏi và thông tin trong App chỉ mang tính định hướng chung. Với tình
            huống cụ thể của doanh nghiệp bạn — đặc biệt khi có giao dịch phức tạp, tranh chấp
            thuế, hoặc thay đổi lớn trong hoạt động kinh doanh — hãy tham khảo kế toán viên có
            chứng chỉ hành nghề hoặc luật sư.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Giới hạn trách nhiệm</h2>
          <p className="text-sm leading-relaxed text-muted">
            Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất, thiệt hại, tiền phạt, hay hậu
            quả pháp lý nào phát sinh từ việc bạn sử dụng hoặc dựa vào thông tin trong App mà
            không có xác nhận từ chuyên gia có thẩm quyền.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">4. Nguồn thông tin</h2>
          <p className="text-sm leading-relaxed text-muted">
            Mọi thông tin pháp lý trong App đều trích dẫn nguồn từ văn bản quy phạm pháp luật
            chính thức do cơ quan nhà nước ban hành. Bạn có thể và nên đối chiếu trực tiếp với
            văn bản gốc tại các cổng thông tin chính phủ như{" "}
            <span className="font-medium">vbpl.moj.gov.vn</span>,{" "}
            <span className="font-medium">gdt.gov.vn</span>, và{" "}
            <span className="font-medium">vanban.chinhphu.vn</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
