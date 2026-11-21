import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quyền riêng tư — Sổ tay DN Siêu nhỏ",
};

export default function RiengTuPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">Chính sách quyền riêng tư</h1>
      <p className="text-sm text-muted mb-8">Cập nhật lần cuối: tháng 10 năm 2026</p>

      <div className="space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Thông tin chúng tôi thu thập</h2>
          <p className="text-sm leading-relaxed text-muted">
            Tại bước khám sức khỏe pháp lý, câu trả lời của bạn chỉ được lưu trên thiết bị của
            bạn (localStorage trình duyệt) và không được truyền lên máy chủ. App không thu thập
            mật khẩu ngân hàng, số CCCD, thông tin thẻ tín dụng, hay bất kỳ thông tin nhạy cảm nào.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. Dữ liệu trên thiết bị</h2>
          <p className="text-sm leading-relaxed text-muted">
            Câu trả lời bảng hỏi được lưu trong localStorage trình duyệt với khóa{" "}
            <code className="rounded bg-border px-1 py-0.5 text-xs font-mono">sotay_answers_v1</code>.
            Dữ liệu này có thể bị xóa khi bạn xóa lịch sử trình duyệt hoặc dùng cửa sổ ẩn danh.
            Chúng tôi không thể truy cập dữ liệu này.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Dữ liệu phân tích</h2>
          <p className="text-sm leading-relaxed text-muted">
            App có thể sử dụng công cụ phân tích ẩn danh để hiểu cách người dùng sử dụng tính năng.
            Dữ liệu này không liên kết với danh tính cá nhân của bạn.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">4. Cookie</h2>
          <p className="text-sm leading-relaxed text-muted">
            App sử dụng localStorage thay vì cookie để lưu trữ tiến trình của bạn. Chúng tôi không
            sử dụng cookie theo dõi từ bên thứ ba.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">5. Xóa dữ liệu của bạn</h2>
          <p className="text-sm leading-relaxed text-muted">
            Bạn có thể xóa toàn bộ câu trả lời bảng hỏi khỏi trình duyệt bất kỳ lúc nào bằng
            cách xóa lịch sử trình duyệt (xóa dữ liệu trang web), hoặc nhấn nút "Xóa dữ liệu khám"
            ở cuối trang kết quả. Sau khi xóa, dữ liệu không thể khôi phục được trừ khi bạn đã
            lưu vào tài khoản.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">6. Thay đổi chính sách</h2>
          <p className="text-sm leading-relaxed text-muted">
            Nếu có thay đổi quan trọng về cách thu thập hoặc sử dụng dữ liệu, chúng tôi sẽ cập
            nhật trang này và thay đổi ngày cập nhật ở trên.
          </p>
        </section>
      </div>
    </div>
  );
}
