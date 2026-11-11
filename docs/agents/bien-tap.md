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

### Vòng 2 (2026-11-11)

- Đọc NC-004, NC-005. Cả hai "không mở được". Chỉ cập nhật todo, không đổi nội dung pháp lý, không điền `legal_basis`. Status giữ "draft".
- NC-004:
  - Todo "gợi ý của trợ lý AI" về Luật Thuế TNDN 67/2025/QH15 (3 chỗ: tam-nop-thue-tndn, tu-0-den-1, legal-framework): thêm Luật 09/2026/QH16, Nghị quyết 43/2026/QH16, Nghị định 398/2026/NĐ-CP.
  - Todo về Luật Thuế GTGT 48/2024/QH15 (3 chỗ: 2 guide GTGT, legal-framework): thêm các luật sửa đổi và Nghị định 181/2025 cùng các bản sửa.
  - Thêm todo mới về Nghị định 245/2026/NĐ-CP (gia hạn nộp thuế 2026) ở 3 guide: tam-nop-thue-tndn, khai-thue-gtgt-theo-thang, khai-thue-gtgt-theo-quy.
- NC-005:
  - Todo về Nghị định 168/2025/NĐ-CP (4 chỗ: tu-0-den-1, gop-von-dieu-le, dang-ky-thay-doi-doanh-nghiep, legal-framework): thêm Nghị định 296/2026/NĐ-CP.
  - Thêm todo mới về Luật 76/2025/QH15 ở `dang-ky-thay-doi-doanh-nghiep.json` và mục Luật Doanh nghiệp 2020 trong `legal-framework.json`.
- Bỏ qua: chưa sửa thuế suất 20%/15–17%, "10 ngày"/"10 ngày làm việc", tên Sở. Lý do: chưa có điều, khoản.
- Kiểm tra: `npm test` 58/59 (T25 lỗi sẵn), `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 3 (2026-11-11)

- Đọc NC-006 (tên cơ quan đăng ký kinh doanh). Trạng thái "không mở được". Áp dụng phần đề xuất không phải nội dung pháp lý:
  - `bat-dau.json`: "báo Sở KHĐT" → "báo cơ quan đăng ký kinh doanh cấp tỉnh". Giữ "10 ngày" vì mâu thuẫn với "10 ngày làm việc" còn chờ xác minh.
  - `guides/dang-ky-thay-doi-doanh-nghiep.json`: "Phòng Đăng ký kinh doanh thuộc Sở Kế hoạch và Đầu tư" → "cơ quan đăng ký kinh doanh cấp tỉnh, nơi công ty đặt trụ sở". Thay link mpi.gov.vn bằng dangkykinhdoanh.gov.vn (có trong `official_sources.json`). Bỏ số (024) 3736 6566 và email dkkd@mpi.gov.vn, thay bằng "xem thông tin liên hệ trên https://dangkykinhdoanh.gov.vn".
  - `guides/gop-von-dieu-le.json`: bỏ "của Bộ Kế hoạch và Đầu tư" ở dòng phí. Bỏ số điện thoại, email cũ như trên.
  - Todo liên quan ở 3 file: thêm ghi chú NC-006 (các nghị định về Bộ Tài chính, cơ quan chuyên môn cấp tỉnh) và ghi lại việc đã đổi trên giao diện.
- Bỏ qua: tên "Cục Quản lý đăng ký kinh doanh" trong `gop-von-dieu-le.json`. Cổng ghi đơn vị khác, nhưng đây chỉ là chân trang; ghi vào todo, chưa đổi.
- Kiểm tra: `npm test` 58/59 (T25 lỗi sẵn), `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 4 (2026-11-11)

- Đọc NC-007 (BHXH, chữ ký số, giao dịch điện tử, hỗ trợ DNNVV). Trạng thái "không mở được". Chỉ cập nhật todo, không điền `legal_basis`. Status giữ "draft".
  - BHXH (legal-framework, tu-0-den-1): thêm Luật 41/2024/QH15 và Nghị định 158/2025/NĐ-CP. Bỏ chữ "(đang sửa đổi)" ở trường `number` của mục 58/2014/QH13, vì đã cũ; số hiệu giữ nguyên.
  - Chữ ký số (legal-framework, chu-ky-so, tu-0-den-1): thêm Nghị định 23/2025/NĐ-CP và 48/2024/NĐ-CP.
  - Phát hiện thêm: cổng ghi Nghị định 130/2018/NĐ-CP hiệu lực 15/11/2018, còn `legal-framework.json` ghi "25/09/2018". Chưa đổi, đã thêm todo để đối chiếu.
  - Giao dịch điện tử (legal-framework): ghi cổng xác nhận hiệu lực 01/07/2024; thêm Luật 20/2026/QH16 (hiệu lực 01/03/2027). Mâu thuẫn số hiệu 51/2005 vẫn để todo.
  - Hỗ trợ DNNVV (legal-framework ghi chú chung, tu-0-den-1): thêm Nghị định 80/2021/NĐ-CP, cần đọc tiêu chí DN siêu nhỏ.
- Kiểm tra: `npm test` 58/59 (T25 lỗi sẵn), `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

## Câu hỏi cho agent Nghiên cứu

- Khi mở được toàn văn, xin ưu tiên NC-001 (Luật Kế toán bản sửa bởi Luật 56/2024/QH15, Nghị định 174/2016): người đại diện theo pháp luật của DN siêu nhỏ có được tự làm kế toán không. Đây là câu then chốt của sản phẩm.
- Nghị định 310/2025/NĐ-CP: cổng ghi hiệu lực "16-01-2025". Nhờ đối chiếu ngày đúng khi mở được toàn văn.
- Nghị định 130/2018/NĐ-CP: cổng ghi hiệu lực 15/11/2018, `legal-framework.json` ghi 25/09/2018. Nhờ đối chiếu khi mở được toàn văn.

## Cần chủ dự án quyết

- T25 trong `tests/content.test.ts` lỗi sẵn: test còn dùng `vbpl.vn`, danh sách nguồn đã đổi sang `vbpl.moj.gov.vn`. Chờ chủ dự án đồng ý sửa.
