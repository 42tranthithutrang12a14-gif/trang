import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng — Sổ tay DN Siêu nhỏ",
};

export default function DieuKhoanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">Điều khoản sử dụng</h1>
      <p className="text-sm text-muted mb-8">Cập nhật lần cuối: tháng 10 năm 2024</p>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Chấp nhận điều khoản</h2>
          <p className="text-sm leading-relaxed text-muted">
            Khi sử dụng Sổ tay DN Siêu nhỏ ("App"), bạn đồng ý tuân theo các điều khoản sử dụng này.
            Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng App.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. Mục đích và giới hạn</h2>
          <p className="text-sm leading-relaxed text-muted">
            App cung cấp thông tin tham khảo về thuế, kế toán và pháp lý cho doanh nghiệp siêu nhỏ
            tại Việt Nam. Thông tin trong App đã được kế toán viên có chứng chỉ hành nghề rà soát
            nhưng không phải dịch vụ kế toán, dịch vụ làm thủ tục về thuế, hay tư vấn pháp lý.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Với trường hợp cụ thể của doanh nghiệp bạn, hãy đối chiếu với văn bản gốc còn hiệu lực
            hoặc hỏi người có chứng chỉ hành nghề kế toán, kiểm toán, hoặc luật sư.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Sử dụng hợp lệ</h2>
          <p className="text-sm leading-relaxed text-muted">
            Bạn đồng ý chỉ sử dụng App cho mục đích hợp pháp và không vi phạm quyền của bên thứ ba.
            Bạn không được sao chép, phân phối lại hoặc bán thông tin từ App mà không có sự cho phép
            bằng văn bản từ chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">4. Thay đổi điều khoản</h2>
          <p className="text-sm leading-relaxed text-muted">
            Chúng tôi có thể cập nhật các điều khoản này theo thời gian. Phiên bản mới nhất luôn
            được đăng tải tại trang này với ngày cập nhật. Việc tiếp tục sử dụng App sau khi điều
            khoản thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">5. Luật áp dụng</h2>
          <p className="text-sm leading-relaxed text-muted">
            Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam.
          </p>
        </section>
      </div>
    </div>
  );
}
