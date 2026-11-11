# Nghiên cứu và rà soát

Chỉ agent Nghiên cứu ghi file này. Agent Biên tập đọc để làm.

## Mẫu một mục

### NC-001 — Tiêu đề ngắn

- Trạng thái: mới | đã xác minh | không mở được | cần chủ dự án quyết
- Liên quan: file, id hoặc mục trong file
- Phát hiện: điều gì sai, thiếu hoặc mâu thuẫn
- Nguồn: link trên cổng chính thức; Điều …, khoản …; trích nguyên văn ngắn; ngày mở văn bản
- Đề xuất sửa: câu chữ hoặc thay đổi cụ thể

## Các mục

### Ghi chú vòng 1 (2026-11-11)

- Mạng: `vanban.chinhphu.vn` mở được trang thông tin văn bản (số hiệu, ngày ban hành, ngày hiệu lực, trích yếu).
- Toàn văn nằm ở file PDF trên `datafiles.chinhphu.vn`, `congbaocdn.chinhphu.vn`, `g7.cdnchinhphu.vn`: proxy chặn (403).
- `vbpl.moj.gov.vn`: lỗi 502. `www.gdt.gov.vn`: bị ngắt kết nối. `vbpq.mof.gov.vn`, `portal.mof.gov.vn`: bị chặn (403) dù `mof.gov.vn` cho phép tên miền con. `quochoi.vn`: trang trắng sau bước kiểm tra cookie.
- Vì vậy vòng này chưa trích được điều, khoản nào. Các mục dưới chỉ xác nhận văn bản có tồn tại, số hiệu và ngày hiệu lực theo trang thông tin trên vanban.chinhphu.vn. Không mục nào đủ điều kiện "đã xác minh".
- Agent Biên tập: không điền `legal_basis` với `verified_against_original: true` từ các mục này. Chỉ được cập nhật câu chữ trong `todo_for_reviewer` (ví dụ đổi "theo báo chí" thành "đã thấy trên vanban.chinhphu.vn, chưa đọc toàn văn").

### NC-001 — Chủ DN siêu nhỏ có được tự làm kế toán không

- Trạng thái: không mở được
- Liên quan: `src/content/guides/so-sach-ke-toan.json` (mục "Ai làm kế toán?", câu ⚠️ về chứng chỉ); `src/content/bat-dau.json` (Tuần 1–2, "Chuẩn bị tự làm kế toán"); `src/content/tu-0-den-1.json` (bước kiểm tra điều kiện tự làm kế toán, todo về kế toán trưởng).
- Phát hiện: chưa đọc được toàn văn nên chưa trả lời được. Đã xác nhận khung văn bản cần đọc:
  - Luật Kế toán 88/2015/QH13, ban hành 20/11/2015, hiệu lực 01/01/2017. https://vanban.chinhphu.vn/?pageid=27160&docid=183198&classid=1
  - Luật 56/2024/QH15 sửa đổi, bổ sung một số điều của Luật Chứng khoán, Luật Kế toán, Luật Kiểm toán độc lập, Luật Ngân sách nhà nước…; ban hành 29/11/2024, hiệu lực 01/01/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=212484&classid=1 — Luật Kế toán đã có sửa đổi; phải đọc bản sửa đổi trước khi kết luận.
  - Nghị định 174/2016/NĐ-CP quy định chi tiết một số điều của Luật kế toán; ban hành 30/12/2016, hiệu lực 01/01/2017. https://vanban.chinhphu.vn/?pageid=27160&docid=187897&classid=1
  - Thông tư 101/2026/TT-BTC quy định về tổ chức bồi dưỡng và cấp Chứng chỉ bồi dưỡng kế toán trưởng; ban hành 15/07/2026, hiệu lực 01/01/2027. https://vanban.chinhphu.vn/?pageid=27160&docid=218950&classid=1
  - Thông tư 132/2018/TT-BTC hướng dẫn chế độ kế toán cho DN siêu nhỏ; ban hành 28/12/2018, hiệu lực 15/02/2019. https://vanban.chinhphu.vn/?pageid=27160&docid=196286&classid=1
- Hướng tra (từ trí nhớ, CHƯA XÁC MINH, chỉ là điểm bắt đầu): Luật Kế toán phần tiêu chuẩn người làm kế toán, người không được làm kế toán, kế toán trưởng (khoảng Điều 51–54); Nghị định 174/2016 phần bố trí người làm kế toán, kế toán trưởng (khoảng Điều 19–21). Cần xem có quy định riêng cho DN siêu nhỏ hay không, và người đại diện theo pháp luật có được kiêm làm kế toán không.
- Nguồn: chỉ trang thông tin văn bản trên vanban.chinhphu.vn, mở ngày 2026-11-11. Toàn văn PDF bị chặn.
- Đề xuất sửa: chưa sửa nội dung. Riêng câu ⚠️ "Người phụ trách kế toán bắt buộc phải có chứng chỉ hành nghề hoặc bằng kế toán" trong `so-sach-ke-toan.json`: giữ nguyên, nhưng bổ sung vào todo rằng Luật Kế toán đã được sửa bởi Luật 56/2024/QH15 (hiệu lực 01/01/2025) và có Thông tư 101/2026/TT-BTC về chứng chỉ kế toán trưởng (hiệu lực 01/01/2027); cần đọc cả hai khi xác minh.

### NC-002 — Văn bản kế toán nghi lỗi thời: Nghị định 41/2018, Thông tư 132/2018 và 58/2026

- Trạng thái: không mở được
- Liên quan: `src/content/guides/so-sach-ke-toan.json` (danh sách văn bản, todo về Nghị định 41/2018 và Thông tư 58/2026); `src/content/bat-dau.json`, `src/content/tu-0-den-1.json` (todo về Thông tư 58/2026).
- Phát hiện:
  - Nghị định 41/2018/NĐ-CP (xử phạt VPHC lĩnh vực kế toán, kiểm toán độc lập; hiệu lực 01/05/2018) đã có Nghị định 132/2026/NĐ-CP sửa đổi, bổ sung một số điều; ban hành 06/04/2026, hiệu lực 21/05/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=217618&classid=1 — App chỉ dẫn Nghị định 41/2018, chưa nhắc văn bản sửa đổi.
  - Thông tư 58/2026/TT-BTC: tìm theo trích yếu "siêu nhỏ" trên vanban.chinhphu.vn chỉ ra Thông tư 132/2018. Tìm "chế độ kế toán" thấy văn bản mới nhất là 119/2026/TT-BTC (không liên quan DN siêu nhỏ). Chưa tìm thấy 58/2026. Ô tìm kiếm của cổng chỉ khớp trích yếu, không khớp số hiệu, nên chưa kết luận được là không có.
- Nguồn: vanban.chinhphu.vn, trang thông tin văn bản, mở ngày 2026-11-11.
- Đề xuất sửa: thêm "Nghị định 132/2026/NĐ-CP sửa đổi Nghị định 41/2018/NĐ-CP (hiệu lực 21/05/2026)" vào danh sách văn bản cần xác minh trong `so-sach-ke-toan.json`, kèm todo xác minh mức phạt theo bản sửa đổi. Todo về Thông tư 58/2026: ghi thêm "chưa tìm thấy trên vanban.chinhphu.vn ngày 2026-11-11". Giữ nguyên các chỗ dẫn Thông tư 132/2018.

### NC-003 — Hóa đơn, quản lý thuế, xử phạt thuế, môn bài: các văn bản mới

- Trạng thái: không mở được
- Liên quan: `src/content/guides/hoa-don-dien-tu.json`, `chu-ky-so.json`, `khai-thue-gtgt-theo-thang.json`, `khai-thue-gtgt-theo-quy.json`, `tam-nop-thue-tndn.json`; `src/content/legal-framework.json`; `src/content/rules/*.json`; todo về 254/2026, 38/2019, 125/2020, 198/2025 trong `bat-dau.json`, `tu-0-den-1.json`.
- Phát hiện (trang thông tin trên vanban.chinhphu.vn):
  - Luật Quản lý thuế 108/2025/QH15, ban hành 10/12/2025, hiệu lực 01/07/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=216541&classid=1 — Nhiều chỗ trong app dẫn Luật Quản lý thuế 38/2019/QH14. Chưa đọc điều khoản thi hành nên chưa khẳng định luật mới thay toàn bộ luật cũ.
  - Nghị định 252/2026/NĐ-CP hướng dẫn thi hành Luật Quản lý thuế; ban hành 30/06/2026, hiệu lực 01/07/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=218690&classid=1 — kèm Thông tư 89/2026/TT-BTC (hiệu lực 01/07/2026). https://vanban.chinhphu.vn/?pageid=27160&docid=218974&classid=1
  - Nghị định 254/2026/NĐ-CP quy định chi tiết Luật Quản lý thuế 108/2025/QH15 về hóa đơn điện tử, chứng từ điện tử; ban hành 30/06/2026, hiệu lực 01/07/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=218689&classid=1 — kèm Thông tư 91/2026/TT-BTC (hiệu lực 01/07/2026). https://vanban.chinhphu.vn/?pageid=27160&docid=219006&classid=1 — Ngày hiệu lực khớp với tin báo chí ghi trong app. Chưa đọc điều khoản thay thế nên chưa khẳng định 254/2026 thay Nghị định 123/2020.
  - Nghị định 123/2020/NĐ-CP (hiệu lực 01/07/2022) đã được sửa bởi Nghị định 41/2022/NĐ-CP và Nghị định 70/2025/NĐ-CP (ban hành 20/03/2025, hiệu lực 01/06/2025). https://vanban.chinhphu.vn/?pageid=27160&docid=213179&classid=1
  - Nghị định 125/2020/NĐ-CP (xử phạt thuế, hóa đơn) đã có các văn bản sửa đổi: 102/2021/NĐ-CP; 310/2025/NĐ-CP (ban hành 02/12/2025; cổng ghi hiệu lực "16-01-2025", có thể gõ nhầm năm, cần đối chiếu toàn văn) https://vanban.chinhphu.vn/?pageid=27160&docid=216102&classid=1; 291/2026/NĐ-CP (ban hành và hiệu lực 21/07/2026) https://vanban.chinhphu.vn/?pageid=27160&docid=218956&classid=1. Mức phạt chậm nộp tờ khai trong app có thể đã đổi.
  - Nghị quyết 198/2025/QH15 về cơ chế, chính sách đặc biệt phát triển kinh tế tư nhân: ban hành và hiệu lực 17/05/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=213695&classid=1 — Có Nghị định 20/2026/NĐ-CP hướng dẫn (ban hành, hiệu lực 15/01/2026). https://vanban.chinhphu.vn/?pageid=27160&docid=216660&classid=1 — Chưa đọc điều về lệ phí môn bài.
  - Lệ phí môn bài: Nghị định 139/2016/NĐ-CP (hiệu lực 01/01/2017), sửa bởi Nghị định 22/2020/NĐ-CP (hiệu lực 25/02/2020). https://vanban.chinhphu.vn/?pageid=27160&docid=186624&classid=1 và https://vanban.chinhphu.vn/?pageid=27160&docid=199272&classid=1
- Nguồn: vanban.chinhphu.vn, trang thông tin văn bản, mở ngày 2026-11-11.
- Đề xuất sửa: chỉ cập nhật todo, không đổi nội dung pháp lý.
  - Todo về 254/2026: thay "theo báo chí" bằng "đã thấy trên vanban.chinhphu.vn: ban hành 30/06/2026, hiệu lực 01/07/2026, hướng dẫn Luật Quản lý thuế 108/2025/QH15; chưa đọc toàn văn".
  - Todo "Luật Quản lý thuế 38/2019 có thể đã có luật thay thế": ghi rõ Luật Quản lý thuế 108/2025/QH15, hiệu lực 01/07/2026; Nghị định 252/2026, Thông tư 89/2026.
  - Todo về mức phạt Nghị định 125/2020: ghi thêm các văn bản sửa đổi 102/2021, 310/2025, 291/2026.
  - Các URL trên đều qua `isOfficialSourceUrl()` (tên miền vanban.chinhphu.vn). Có thể ghi vào todo để vòng sau tra tiếp.

### Ghi chú vòng 2 (2026-11-11, 10:18 UTC)

- Mạng chưa đổi. `datafiles.chinhphu.vn`, `congbaocdn.chinhphu.vn` vẫn bị chặn (403). `vbpl.moj.gov.vn` vẫn 502. `gdt.gov.vn`, `dichvucong.gov.vn`, `baohiemxahoi.gov.vn` bị ngắt kết nối. Vẫn chưa trích được điều, khoản.
- Đã rà commit `fea2e13` của agent Biên tập: chỉ thêm ghi chú "Cập nhật NC-00x" vào todo và một dòng "cần xác minh" ở `so-sach-ke-toan.json`. Không đổi nội dung pháp lý, không đặt `verified_against_original`. Đúng đề xuất. Không thấy sai sót.
- Câu hỏi của Biên tập: NC-001 vẫn là ưu tiên số 1 khi mở được toàn văn. Ngày hiệu lực Nghị định 310/2025 vẫn chưa đối chiếu được.

### NC-004 — Luật thuế TNDN, GTGT mới và các sửa đổi năm 2026

- Trạng thái: không mở được
- Liên quan: `src/content/guides/tam-nop-thue-tndn.json` (thuế suất 20% cho DN siêu nhỏ, danh sách văn bản dẫn Luật 14/2008/QH12); `src/content/tu-0-den-1.json` (mục thuế suất 15%/17%, todo về Luật 67/2025); `src/content/guides/khai-thue-gtgt-theo-quy.json`, `khai-thue-gtgt-theo-thang.json` (dẫn Luật 13/2008/QH12); `src/content/rules/obligation_rules.json` (ví dụ Luật 14/2008, Điều 17); `src/content/legal-framework.json`.
- Phát hiện (trang thông tin trên vanban.chinhphu.vn):
  - Luật Thuế TNDN 67/2025/QH15: ban hành 14/06/2025, hiệu lực 01/10/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=214607&classid=1 — Khớp số hiệu và ngày trong todo "gợi ý của trợ lý AI". Mâu thuẫn 20% hay 15–17% (ưu tiên mục 3) phải đọc điều thuế suất của luật này; chưa đọc được.
  - Luật 09/2026/QH16 sửa đổi, bổ sung Luật Thuế TNCN, Luật Thuế GTGT, Luật Thuế TNDN và Luật Thuế TTĐB: ban hành và hiệu lực 24/04/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=218095&classid=1 — Có thể đã đổi thuế suất; phải đọc cùng Luật 67/2025.
  - Nghị quyết 43/2026/QH16 về giảm thuế TNCN, thuế TNDN đối với cá nhân và doanh nghiệp: ban hành và hiệu lực 24/08/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=219330&classid=1 — Nghị định 398/2026/NĐ-CP quy định chi tiết, ban hành và hiệu lực 29/10/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=220138&classid=1 — Chưa biết DN siêu nhỏ có thuộc diện giảm không.
  - Luật Thuế GTGT 48/2024/QH15: ban hành 26/11/2024, hiệu lực 01/07/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=212476&classid=1 — Đã có sửa đổi: Luật 90/2025/QH15 (hiệu lực 01/07/2025) https://vanban.chinhphu.vn/?pageid=27160&docid=214558&classid=1, Luật 149/2025/QH15 (hiệu lực 01/01/2026) https://vanban.chinhphu.vn/?pageid=27160&docid=216588&classid=1, Luật 09/2026/QH16 ở trên. Nghị định hướng dẫn 181/2025/NĐ-CP, sửa bởi 359/2025/NĐ-CP (hiệu lực 01/01/2026) https://vanban.chinhphu.vn/?pageid=27160&docid=216388&classid=1 và 144/2026/NĐ-CP (hiệu lực 20/06/2026) https://vanban.chinhphu.vn/?pageid=27160&docid=218020&classid=1.
  - Nghị định 245/2026/NĐ-CP gia hạn thời hạn nộp thuế GTGT, TNDN, TNCN và tiền thuê đất trong năm 2026: ban hành và hiệu lực 27/06/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=218598&classid=1 — Có thể ảnh hưởng hạn nộp ghi trong app năm 2026.
- Nguồn: vanban.chinhphu.vn, trang thông tin văn bản, mở ngày 2026-11-11. Toàn văn PDF bị chặn.
- Đề xuất sửa: chỉ cập nhật todo, không đổi nội dung pháp lý.
  - Todo "Luật Thuế TNDN 14/2008 có thể đã được thay bằng 67/2025": ghi "đã thấy trên vanban.chinhphu.vn: Luật 67/2025/QH15 hiệu lực 01/10/2025; sửa bởi Luật 09/2026/QH16 (hiệu lực 24/04/2026); có Nghị quyết 43/2026/QH16 và Nghị định 398/2026/NĐ-CP về giảm thuế TNDN; chưa đọc toàn văn".
  - Todo "Luật Thuế GTGT 13/2008 có thể đã được thay bằng 48/2024": ghi "đã thấy: Luật 48/2024/QH15 hiệu lực 01/07/2025; sửa bởi 90/2025/QH15, 149/2025/QH15, 09/2026/QH16; chưa đọc toàn văn".
  - Thêm một todo ở các guide có hạn nộp thuế 2026: "Nghị định 245/2026/NĐ-CP gia hạn nộp thuế GTGT, TNDN năm 2026; chưa đọc toàn văn, chưa biết đối tượng và thời gian gia hạn".

### NC-005 — Đăng ký doanh nghiệp: nghị định mới và Luật Doanh nghiệp sửa đổi

- Trạng thái: không mở được
- Liên quan: `src/content/guides/dang-ky-thay-doi-doanh-nghiep.json` (dẫn Luật 59/2020 Điều 30–32, Nghị định 01/2021; "Phòng Đăng ký kinh doanh thuộc Sở Kế hoạch và Đầu tư"); `src/content/guides/gop-von-dieu-le.json`; `src/content/legal-framework.json` (mục 01/2021/NĐ-CP); `src/content/rules/risk_rules.json`; `src/content/tu-0-den-1.json` dòng todo về 01/2021.
- Phát hiện (trang thông tin trên vanban.chinhphu.vn):
  - Nghị định 168/2025/NĐ-CP về đăng ký doanh nghiệp: ban hành 30/06/2025, hiệu lực 01/07/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=214334&classid=1 — Khớp todo "01/2021 có thể đã được thay bằng 168/2025". Chưa đọc điều khoản thi hành nên chưa khẳng định thay hẳn 01/2021.
  - Nghị định 296/2026/NĐ-CP sửa đổi, bổ sung Nghị định 168/2025: ban hành và hiệu lực 23/07/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=218986&classid=1
  - Luật 76/2025/QH15 sửa đổi, bổ sung một số điều của Luật Doanh nghiệp: ban hành 17/06/2025, hiệu lực 01/07/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=214562&classid=1 — Điều 30–32 Luật 59/2020 (thời hạn đăng ký thay đổi) có thể đã bị sửa.
  - Tên cơ quan đăng ký kinh doanh cấp tỉnh và thời hạn "10 ngày" hay "10 ngày làm việc": phải đọc Nghị định 168/2025 và Luật 76/2025; chưa đọc được. `legal-framework.json` vẫn ghi Nghị định 01/2021 hiệu lực 04/01/2021 (khớp cổng), nhưng thiếu văn bản mới.
- Nguồn: vanban.chinhphu.vn, trang thông tin văn bản, mở ngày 2026-11-11.
- Đề xuất sửa: chỉ cập nhật todo.
  - Các todo "01/2021 có thể đã được thay bằng 168/2025": ghi "đã thấy trên vanban.chinhphu.vn: Nghị định 168/2025/NĐ-CP hiệu lực 01/07/2025, sửa bởi 296/2026/NĐ-CP (hiệu lực 23/07/2026); chưa đọc toàn văn".
  - Ở `dang-ky-thay-doi-doanh-nghiep.json` và `legal-framework.json`: thêm todo "Luật 76/2025/QH15 sửa Luật Doanh nghiệp, hiệu lực 01/07/2025; kiểm tra Điều 30–32 và tên cơ quan đăng ký kinh doanh".

### Ghi chú vòng 3 (2026-11-11, 12:20 UTC)

- Mạng chưa đổi: `datafiles.chinhphu.vn`, `congbaocdn.chinhphu.vn`, `g7.cdnchinhphu.vn` vẫn 403; `vbpl.moj.gov.vn` 502; `www.gdt.gov.vn` bị ngắt kết nối.
- Đã rà commit `aa19ea0` của agent Biên tập: chỉ cập nhật todo theo NC-004, NC-005. Số hiệu và ngày hiệu lực đã ghi khớp với trang thông tin trên vanban.chinhphu.vn. Không đổi nội dung pháp lý. Không thấy sai sót.
- Đã rà mâu thuẫn trong app (ưu tiên mục 3): hạn GTGT quý "ngày 30" hay cuối tháng, "10 ngày" hay "10 ngày làm việc", thuế suất 20% hay 15–17%. Cả ba đã có todo ghi rõ mâu thuẫn ở mọi chỗ liên quan. Không mở mục mới; chờ đọc được toàn văn (Luật Quản lý thuế 108/2025 và Nghị định 252/2026; Luật 76/2025 và Nghị định 168/2025; Luật 67/2025 và Luật 09/2026).

### NC-006 — Tên cơ quan đăng ký kinh doanh: app còn ghi "Sở KHĐT", "Bộ Kế hoạch và Đầu tư", mpi.gov.vn

- Trạng thái: không mở được
- Liên quan:
  - `src/content/bat-dau.json` dòng 26: "Thay đổi gì phải báo Sở KHĐT trong 10 ngày."
  - `src/content/guides/dang-ky-thay-doi-doanh-nghiep.json` dòng 28 và 40: "Phòng Đăng ký kinh doanh thuộc Sở Kế hoạch và Đầu tư", link `https://www.mpi.gov.vn`, email `dkkd@mpi.gov.vn`.
  - `src/content/guides/gop-von-dieu-le.json` dòng 24 và 36: "theo quy định hiện hành của Bộ Kế hoạch và Đầu tư", email `dkkd@mpi.gov.vn`.
- Phát hiện:
  - Trang thông tin trên vanban.chinhphu.vn, mở ngày 2026-11-11:
    - Nghị định 29/2025/NĐ-CP quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Tài chính: ban hành 24/02/2025, hiệu lực 01/03/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=212957&classid=1 — Sửa bởi Nghị định 166/2025/NĐ-CP (hiệu lực 01/07/2025). https://vanban.chinhphu.vn/?pageid=27160&docid=214314&classid=1 — Đã có Nghị định 376/2026/NĐ-CP cùng tên, ban hành và hiệu lực 01/10/2026. https://vanban.chinhphu.vn/?pageid=27160&docid=219754&classid=1
    - Nghị định 45/2025/NĐ-CP quy định tổ chức các cơ quan chuyên môn thuộc UBND cấp tỉnh: ban hành 28/02/2025, hiệu lực 01/03/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=212973&classid=1 — Đã có Nghị định 150/2025/NĐ-CP cùng nội dung cho mô hình tỉnh và xã, hiệu lực 16/06/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=213923&classid=1
  - Cổng `dangkykinhdoanh.gov.vn`, trang chủ, mở ngày 2026-11-11: chân trang ghi "© 2025 | Bản quyền thuộc Bộ Tài chính" và đơn vị "Cục Phát triển doanh nghiệp tư nhân và kinh tế tập thể". Đây là thông tin trên cổng chính thức, không phải văn bản pháp luật.
  - Chưa đọc toàn văn nên chưa trích được điều nào giao việc đăng ký kinh doanh cấp tỉnh cho Sở nào. Cũng chưa xác nhận email, số điện thoại hỗ trợ hiện tại.
  - `mpi.gov.vn` không có trong `src/content/official_sources.json`. Link này nằm trong phần nội dung, không phải `legal_basis`, nên không vi phạm quy tắc 2, nhưng có thể đã chết hoặc chuyển hướng.
- Nguồn: như trên, mở ngày 2026-11-11.
- Đề xuất sửa:
  - Chưa đổi tên Sở trên giao diện, vì chưa có điều, khoản.
  - Thay ngay được (không phải nội dung pháp lý): ở chỗ hướng dẫn nộp hồ sơ, dùng "cơ quan đăng ký kinh doanh cấp tỉnh" thay cho "Sở KHĐT" / "Sở Kế hoạch và Đầu tư", và trỏ người dùng về `https://dangkykinhdoanh.gov.vn` thay cho `https://www.mpi.gov.vn`. Bỏ hoặc gắn nhãn "cần kiểm tra" cho email `dkkd@mpi.gov.vn` và số (024) 3736 6566.
  - Cập nhật các todo "Bộ Kế hoạch và Đầu tư đã hợp nhất vào Bộ Tài chính từ 3/2025": ghi "đã thấy trên vanban.chinhphu.vn: Nghị định 29/2025/NĐ-CP (hiệu lực 01/03/2025), 166/2025, 376/2026 về cơ cấu Bộ Tài chính; Nghị định 45/2025 và 150/2025 về cơ quan chuyên môn cấp tỉnh; cổng dangkykinhdoanh.gov.vn ghi bản quyền thuộc Bộ Tài chính; chưa đọc toàn văn".

## Cần chủ dự án quyết

- Mạng của môi trường "trang" chặn các máy chủ chứa toàn văn PDF: `datafiles.chinhphu.vn` (PDF của vanban.chinhphu.vn), `congbaocdn.chinhphu.vn` và `g7.cdnchinhphu.vn` (PDF của Công báo). Không có các máy chủ này thì agent Nghiên cứu không trích được điều, khoản, nên không mục nào lên được "đã xác minh". Đề xuất: thêm ba tên miền này vào danh sách cho phép của môi trường. Chúng chỉ là nơi lưu file của hai cổng đã có trong `official_sources.json`; URL dẫn nguồn trong nội dung vẫn dùng trang vanban.chinhphu.vn hoặc congbao.chinhphu.vn.
- Tên miền con của `mof.gov.vn` (`vbpq.mof.gov.vn`, `portal.mof.gov.vn`) cũng bị chặn, dù `official_sources.json` cho phép. Nếu muốn dùng mục Hỏi đáp chính sách của Bộ Tài chính thì cần mở thêm.
- `vbpl.moj.gov.vn` trả lỗi 502 ở vòng 1, 2 và 3. Sẽ thử lại vòng sau.
- Nhắc lại (vòng 2): chưa mở mạng thì các vòng sau chỉ xác nhận được số hiệu, ngày hiệu lực. Câu hỏi then chốt NC-001 và mâu thuẫn thuế suất (NC-004) không giải được.
