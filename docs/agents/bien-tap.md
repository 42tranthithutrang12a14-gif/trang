# Biên tập và hoàn thiện

Chỉ agent Biên tập ghi file này. Agent Nghiên cứu đọc để rà lại.

## Nhật ký

### Vòng 1 (2026-11-11)

- Đọc NC-001, NC-002, NC-003. Cả ba ở trạng thái "không mở được": chưa trích được điều, khoản.
- Vì vậy không đổi nội dung pháp lý, không điền `legal_basis`, không đặt `verified_against_original`. Mọi mục giữ status "draft".
- Đã làm: thêm ghi chú "Cập nhật NC-00x" vào cuối các todo liên quan. Câu "theo báo chí" giữ nguyên để người duyệt thấy nguồn gốc. Ghi chú nói rõ "chưa đọc toàn văn" và kèm link vanban.chinhphu.vn.
  - NC-001: todo về chứng chỉ trong `guides/so-sach-ke-toan.json` (Luật 56/2024/QH15, Thông tư 101/2026/TT-BTC, Nghị định 174/2016/NĐ-CP).
  - NC-002: todo về Thông tư 58/2026 (6 chỗ: bat-dau, tu-0-den-1, so-sach-ke-toan, legal-framework), ghi "chưa tìm thấy ngày 2026-11-11". Todo về Nghị định 41/2018 (so-sach-ke-toan, legal-framework), thêm Nghị định 132/2026/NĐ-CP. Thêm dòng "Nghị định 132/2026/NĐ-CP sửa đổi Nghị định 41/2018/NĐ-CP (hiệu lực 21/05/2026)" vào danh sách "cần xác minh" ở mục "Căn cứ pháp lý" của `so-sach-ke-toan.json`.
  - NC-003: todo về Nghị định 254/2026 (7 chỗ), Luật Quản lý thuế 108/2025/QH15 (4 chỗ: 2 guide GTGT, tam-nop-thue-tndn, legal-framework), mức phạt Nghị định 125/2020 và các văn bản sửa đổi (5 chỗ), Nghị quyết 198/2025/QH15 và Nghị định 20/2026/NĐ-CP (7 chỗ).
- Bỏ qua: không bỏ dòng "Môn bài" hay đổi "Thông tư 132/2018" trên giao diện, vì chưa có điều, khoản. Không đổi tên cơ quan đăng ký kinh doanh, vì chưa có mục nghiên cứu.
- Kiểm tra: `npm test` 58/59 qua (T25 lỗi sẵn), `npm run lint` 15 vấn đề như cũ, `npm run build` thành công. Không thêm lỗi mới.

## Câu hỏi cho agent Nghiên cứu

- Khi mở được toàn văn, xin ưu tiên NC-001 (Luật Kế toán bản sửa bởi Luật 56/2024/QH15, Nghị định 174/2016): người đại diện theo pháp luật của DN siêu nhỏ có được tự làm kế toán không. Đây là câu then chốt của sản phẩm.
- Nghị định 310/2025/NĐ-CP: cổng ghi hiệu lực "16-01-2025". Nhờ đối chiếu ngày đúng khi mở được toàn văn.

## Cần chủ dự án quyết

- T25 trong `tests/content.test.ts` lỗi sẵn: test còn dùng `vbpl.vn`, danh sách nguồn đã đổi sang `vbpl.moj.gov.vn`. Chờ chủ dự án đồng ý sửa.
