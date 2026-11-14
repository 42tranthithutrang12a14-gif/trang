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

### Vòng 5 (2026-11-11)

- Đọc NC-008 (đối chiếu `effective_from` trong `legal-framework.json` với trang thông tin vanban.chinhphu.vn). Chỉ cập nhật todo, không đổi ngày nào. Status giữ "draft".
  - 12 văn bản khớp ngày: thêm todo "khớp trang thông tin, ngày tra 2026-11-11" kèm link. Ghi rõ khớp ngày không có nghĩa còn hiệu lực. Không đặt `verified_against_original`.
  - 14/2008/QH12: cổng không ghi ngày hiệu lực, đã ghi vào todo.
  - 130/2018/NĐ-CP: thay todo tự thêm ở vòng 4 bằng ghi chú NC-008 (ban hành 27/09/2018, hiệu lực 15/11/2018; app ghi 25/09/2018). Chưa đổi `effective_from`, chờ chủ dự án quyết (xem dưới).
  - Chưa ghi gì cho 13/2008/QH12, 80/2021/TT-BTC, 58/2014/QH13, vì NC-008 chưa đối chiếu được.
- Kiểm tra: `npm test` 58/59 (T25 lỗi sẵn), `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 6 (2026-11-11, 19:17 UTC)

- `nghien-cuu.md` chưa có mục mới từ vòng 5 (commit mới nhất của agent Nghiên cứu là `eeea0aa`). Không sửa `src/`.
- Không hoàn thiện thêm câu chữ: các chỗ còn lại đều dính nội dung pháp lý chưa xác minh hoặc đang chờ chủ dự án quyết.

### Vòng 7 (2026-11-11, 21:17 UTC)

- Vẫn chưa có mục mới trong `nghien-cuu.md` (mới nhất vẫn là `eeea0aa`). Không sửa `src/`.

### Vòng 8 (2026-11-11, 23:18 UTC)

- Đọc ghi chú vòng 6–8 của agent Nghiên cứu (`40dfba4`): không có mục NC mới, mạng chưa đổi. Không sửa `src/`.
- Đồng ý với đề xuất của agent Nghiên cứu: tạm giãn hoặc tắt hai lịch chạy tới khi chủ dự án mở mạng hoặc trả lời mục "Cần chủ dự án quyết".

### Vòng 9 (2026-11-12, 07:17 UTC)

- Đọc quyết định của chủ dự án trong `README.md` (`c3f825a`, `bccd264`): T25 đã sửa, mạng đã mở cho máy chủ toàn văn, chấp nhận trang thông tin vanban.chinhphu.vn làm căn cứ cho `number` và `effective_from`.
- Áp dụng trong `legal-framework.json` (status giữ "draft", không đặt `verified_against_original`):
  - 130/2018/NĐ-CP: `effective_from` "25/09/2018" → "15/11/2018" (NC-008). Todo ghi link, ngày tra và căn cứ quyết định.
  - Mục Luật Giao dịch điện tử: `number` "51/2005/QH11 (thay thế bởi 20/2023/QH15)" → "20/2023/QH15", cho khớp ngày hiệu lực 01/07/2024 đã ghi và trang thông tin trên cổng. Thay todo "mâu thuẫn số hiệu" bằng ghi chú đã sửa. Link `url` cũ chưa kiểm tra.
- Không đổi mục BHXH 58/2014/QH13 sang 41/2024/QH15: đó là thay văn bản, không chỉ sửa số hiệu, cần đọc toàn văn.
- Bỏ T25 và câu hỏi về ngày 130/2018 khỏi các mục chờ, vì đã xong.
- Kiểm tra: `npm test` 59/59 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 10 (2026-11-12, 13:20 UTC)

- Đọc NC-001 (đã xác minh, toàn văn Luật Kế toán 88/2015, Nghị định 174/2016, Thông tư 132/2018) và quyết định mới trong `README.md` (xây hệ thống trước; ưu tiên sổ kế toán, thao tác, lộ trình).
- Áp dụng NC-001. Status giữ "draft".
  - `guides/so-sach-ke-toan.json`, mục "Ai làm kế toán?": thay câu ⚠️ "phải có chứng chỉ hành nghề hoặc bằng kế toán" bằng 5 ý có điều, khoản. Giữ một câu khuyên hỏi cơ quan thuế hoặc kế toán, kèm lý do: Thông tư 132/2018 Điều 8 khoản 1 câu 2 chưa rõ có bỏ điều kiện trình độ không. Guide không có trường `legal_basis` nên căn cứ ghi trong nội dung và todo.
  - `tu-0-den-1.json`, bước "Tự làm kế toán": bước kiểm tra thành 3 câu tự hỏi; bước thuê dịch vụ ghi rõ chỉ thuê phần phụ trách kế toán. Điền `legal_basis` (3 văn bản, `verified_against_original: true`, `checked_at` 2026-11-12).
  - `tu-0-den-1.json`, bước DN siêu nhỏ: trả lời todo "có bắt buộc kế toán trưởng không", điền `legal_basis` (Nghị định 174/2016 Điều 20; Thông tư 132/2018 Điều 8).
  - `bat-dau.json`, Tuần 1–2: sửa ghi chú việc "Chuẩn bị tự làm kế toán", điền `legal_basis`.
  - Ghi "điểm còn mở" của NC-001 vào todo ở cả 3 file.
- Chưa làm sổ kế toán, thao tác, lộ trình: `nghien-cuu.md` chưa có mục cho các phần này.
- Môi trường: phải chạy `npm install` vì `package.json` mới thêm `exceljs`. Không đổi `package-lock.json`.
- Kiểm tra: `npm test` 83/83 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 11 (2026-11-12, 15:17 UTC)

- Đọc NC-009 (sổ kế toán theo Thông tư 132/2018, đã xác minh phần danh mục sổ và cột).
- `src/content/so-ke-toan.json`:
  - Sửa `notice` theo đề xuất: nêu rõ 4 sổ của Chương III (S1–S4) và sổ của Chương II (S01, S02–S10).
  - Điền `legal_basis`: Thông tư 132/2018/TT-BTC Điều 3, 11, 17, Phụ lục 3, 4; `verified_against_original: true`.
  - Thêm 4 trang mẫu S1-DNSN đến S4-DNSN (trường `forms`), thêm vào `sheets`, `how_to_use`, `notes`.
  - Todo: ghi việc đã làm, việc còn làm, và câu hỏi Chương III còn dùng được không theo Luật Thuế TNDN 67/2025.
- `src/lib/so-ke-toan.ts`: thêm `FormSpec`, `formLayout`, `buildForm`. Mỗi trang mẫu có: tên đơn vị, mã số thuế (lấy từ Thiết lập), mã mẫu, dòng "Ban hành kèm theo Thông tư số 132/2018/TT-BTC…", tiêu đề, cột theo mẫu (tiêu đề hai tầng), 200 dòng trống để ghi, dòng "Cộng số phát sinh trong kỳ" (tự cộng các cột tiền phát sinh), số dư đầu kỳ, cuối kỳ (S2, S4), chân sổ và chỗ ký.
- Chưa làm (lý do):
  - Chưa cho S1, S4 tự lấy số từ Nhật ký thu chi. Nhật ký ghi theo tiền, còn S1 ghi doanh thu khi bán, kể cả bán chịu. Chưa có phương pháp ghi từng cột (Phụ lục 4 mục 2), ví dụ S1 có gồm thuế GTGT không.
  - Chưa làm sổ Chương II (S01 Nhật ký – Sổ Cái, S02–S10). Các sổ này cần ghi Nợ/Có theo tài khoản, là việc lớn.
  - Chưa thêm cột "Loại doanh thu" vào Nhật ký. Thêm cột sẽ dời toàn bộ cột và công thức; nên làm cùng lúc với việc tự lấy số cho S1.
- `tests/so-ke-toan.test.ts`: SK4, SK10 tính cả trang mẫu; thêm SK11 kiểm mã mẫu, dòng ban hành, cột và dòng cộng.
- Đã mở thử file bằng LibreOffice: trang S2 hiện đúng tiêu đề hai tầng.
- Kiểm tra: `npm test` 84/84 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 12 (2026-11-12, 17:17 UTC)

- Đọc NC-010 (thuế suất TNDN và phương pháp % doanh thu, đã xác minh với Luật 67/2025/QH15, Luật 09/2026/QH16). Status giữ "draft".
- `guides/tam-nop-thue-tndn.json`: sửa thuế suất "20% cho DN siêu nhỏ" thành 15% / 17% / 20% theo doanh thu năm trước (Điều 10). Ví dụ đổi sang 15%. Thêm một câu: từ 2026 DN doanh thu dưới mức Chính phủ quy định được miễn thuế TNDN (Luật 09/2026 Điều 3), chưa ghi con số. Danh sách văn bản đổi sang Luật 67/2025.
- `tu-0-den-1.json`, mục thuế suất thấp: thêm câu "doanh thu để xét là năm tính thuế trước liền kề", điền `legal_basis` (Điều 10 khoản 1, 2, 3; Điều 19 khoản 1).
- `legal-framework.json`, mục Luật Thuế TNDN: `number` 14/2008/QH12 → 67/2025/QH15, `effective_from` 01/10/2025, `url` sang trang vanban.chinhphu.vn, sửa 2 ý thuế suất trong `key_points`.
- `so-ke-toan.json`: `notice` thêm điều kiện dùng 4 sổ S1–S4 (doanh thu năm không quá 3 tỷ và không xác định được chi phí, Điều 11 khoản 2 điểm b); thêm `legal_basis` Luật 67/2025; cập nhật todo.
- Bỏ các todo "mâu thuẫn 20% / 15–17%" ở 3 file. Thêm todo: mức miễn thuế chưa xác minh; Luật 67/2025 đã bị sửa bởi 5 luật chưa đọc; cách tính doanh thu năm trước cho DN mới thành lập.
- Kiểm tra: `npm test` 84/84 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 13 (2026-11-12, 19:17 UTC)

- Đọc NC-011 (miễn thuế TNDN khi doanh thu năm trước từ 1 tỷ đồng trở xuống, Nghị định 141/2026/NĐ-CP, đã xác minh). Status giữ "draft".
- `guides/tam-nop-thue-tndn.json`: thêm mục đầu "Trước khi tạm nộp: kiểm tra có được miễn thuế không" (doanh thu để xét, quy đổi khi chưa đủ 12 tháng, công ty mới, công ty liên kết, căn cứ). Sửa summary. Câu "chưa cập nhật mức doanh thu" đổi thành 1 tỷ đồng.
- `tu-0-den-1.json`: thêm mục mới `mien-tndn-doanh-thu-1-ty` (draft, có `legal_basis` Nghị định 141/2026 và Luật 09/2026). Cập nhật todo mục thuế suất.
- `bat-dau.json`: thêm ý miễn thuế vào trụ cột Thuế; "Tạm nộp TNDN quý (nếu có lợi nhuận)" → "(nếu không được miễn)" kèm ghi chú cho công ty mới; lịch năm thêm "(nếu doanh thu năm trước trên 1 tỷ đồng)". Điền `legal_basis` cho 3 mục, todo ghi rõ chỉ phủ ý miễn thuế.
- `rules/obligation_rules.json`, `CIT_PROVISIONAL`: thêm ý miễn thuế vào `summary_plain`, điền `legal_basis`. Chưa đổi `applies_if`: engine chưa có trường doanh thu, nên nghĩa vụ vẫn hiện với mọi công ty (xem "Cần chủ dự án quyết").
- Không viết "không phải quyết toán" cho DN được miễn: chưa có căn cứ. Đã ghi todo các điểm còn mở của NC-011.
- Kiểm tra: `npm test` 84/84 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 14 (2026-11-12, 21:18 UTC)

- Đọc NC-012 (Nghị định 320/2025/NĐ-CP Điều 11, 12, 24, đã xác minh). Status giữ "draft".
- `guides/tam-nop-thue-tndn.json`: thêm mục "Công ty mới thành lập: tạm nộp theo doanh thu dự kiến" (1 tỷ / 3 tỷ / 50 tỷ; nộp bù và tiền chậm nộp nếu dự kiến thấp; công ty liên kết). Mục thuế suất dẫn thêm Nghị định 320/2025 Điều 11. Danh sách văn bản thêm Nghị định 320/2025, 141/2026; ghi Thông tư 96/2015 là hướng dẫn luật cũ.
- `tu-0-den-1.json`, mục thuế suất: thêm bước cho công ty mới, thêm `legal_basis` Nghị định 320/2025.
- `legal-framework.json`: thêm mục Nghị định 320/2025/NĐ-CP (số hiệu, ngày ký theo trang thông tin; 4 ý chính có điều, khoản). Todo ở mục Thông tư 96/2015.
- Sổ Excel: thêm trang "Thuế TNDN theo % DT" (6 tỷ lệ theo Điều 12 khoản 4; gõ doanh thu từng nhóm, tự nhân tỷ lệ, có dòng cộng). Dữ liệu ở `so-ke-toan.json` (`cit_rate_sheet`), mã ở `src/lib/so-ke-toan.ts` (`buildCitRates`). Thêm `legal_basis` Nghị định 320/2025. Đã cho LibreOffice tính lại với số thử: đúng từng dòng và tổng.
- Chưa làm: chưa thêm cột "Nhóm tỷ lệ" vào Nhật ký hay S1 để tự tính. S1 theo mẫu chia doanh thu khác nhóm tỷ lệ; thêm cột vào Nhật ký sẽ dời mọi cột và công thức. Chưa rõ kỳ kê khai của cách tính % doanh thu (quý hay năm).
- `tests/so-ke-toan.test.ts`: thêm SK12.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 15 (2026-11-12, 23:17 UTC)

- Đọc NC-013 (hạn khai thuế và tạm nộp TNDN theo Luật 108/2025/QH15, Nghị định 252/2026/NĐ-CP, đã xác minh). Status giữ "draft".
- Hạn quý: sửa mọi chỗ "ngày 30 của tháng đầu quý tiếp theo" thành "ngày cuối cùng của tháng đầu quý tiếp theo (30/4, 31/7, 31/10, 31/01)" ở `bat-dau.json` (bước quý đầu, lịch năm), `guides/tam-nop-thue-tndn.json`, `legal-framework.json`. Guide GTGT quý đã đúng ngày; đổi "nộp trước ngày" thành "chậm nhất ngày", ghi căn cứ.
- `rules/obligation_rules.json`: `CIT_PROVISIONAL` đổi `due_day` 30 → "last". Đã chạy engine thử: hạn ra 30/4, 31/7, 31/10, 31/01. Điền `legal_basis` cho 3 nghĩa vụ (GTGT quý, GTGT tháng, tạm nộp TNDN).
- `guides/tam-nop-thue-tndn.json`: ngưỡng tạm nộp 80% (bỏ "75–80%", "dưới 75%"); hạn quyết toán là ngày cuối tháng thứ 3 sau khi hết năm tài chính (bỏ câu sai "31/12 nếu năm tài chính không theo năm dương lịch"); thêm câu công ty được miễn vẫn nên nộp quyết toán (ghi rõ là cách hiểu theo Điều 11).
- Guide GTGT tháng: ghi căn cứ ngày 20 (Điều 10 khoản 2).
- Bỏ các todo mâu thuẫn "ngày 30 / cuối tháng" và "75% hay 80%". Việc dời hạn khi trùng ngày nghỉ chưa xác minh, đã ghi todo.
- Không đổi: hạn môn bài "30/01" (`legal-framework.json`), ngoài NC-013.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 16 (2026-11-13, 01:17 UTC)

- Đọc NC-014 (Thông tư 89/2026/TT-BTC Điều 19, 21, đã xác minh). Status giữ "draft".
- Khai GTGT theo quý:
  - `guides/khai-thue-gtgt-theo-quy.json`: viết lại mục "Ai phải nộp tờ khai quý?": mặc định khai tháng; được chọn quý nếu doanh thu năm trước từ 50 tỷ trở xuống hoặc mới kinh doanh; chọn thì giữ cả năm; chuyển từ tháng sang quý gửi mẫu 01/ĐK-TĐKTTT trước 31/01.
  - `guides/khai-thue-gtgt-theo-thang.json`: "từ 50 tỷ đồng trở lên" → "trên 50 tỷ đồng"; ghi khai tháng là mặc định.
  - `bat-dau.json` Tháng 1: "Nếu DN mới → mặc định khai theo quý" → "DN mới được chọn khai theo quý (đỡ việc hơn). Chọn rồi giữ cả năm". Điền `legal_basis`.
  - `tu-0-den-1.json`, mục khai GTGT quý: sửa `who`, thêm 3 bước, điền `legal_basis`.
  - `legal-framework.json`, mục Luật Thuế GTGT: sửa 2 ý khai tháng/quý.
- Quyết toán TNDN của DN được miễn: thay câu "cách hiểu" bằng "vẫn phải nộp tờ khai quyết toán TNDN năm, hạn 31/3 năm sau" (Điều 21 khoản 1 điểm c.1) ở guide tạm nộp, mục miễn thuế trong `tu-0-den-1.json`, trụ cột Thuế trong `bat-dau.json`. Cập nhật ý (1) của todo "Còn mở sau NC-011" ở 4 file.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 17 (2026-11-13, 03:17 UTC)

- Đọc NC-015 (Nghị quyết 198/2025/QH15 Điều 10, Nghị định 20/2026/NĐ-CP Điều 7, 10, 16; đã xác minh). Status giữ "draft".
- Lệ phí môn bài (chấm dứt thu từ 01/01/2026, Nghị quyết 198/2025 Điều 10 khoản 7):
  - `bat-dau.json`: trụ cột Thuế "Môn bài: nộp 1 lần/năm trước 30/1" → "Lệ phí môn bài: đã bỏ từ 01/01/2026"; việc "Nộp lệ phí môn bài năm đầu" → "Không còn nộp lệ phí môn bài"; lịch năm Tháng 1 → "Không còn nộp lệ phí môn bài (đã bỏ từ 01/01/2026)", hạn "Không có". Điền `legal_basis` 3 chỗ.
  - `legal-framework.json`: nhóm đổi tên "Lệ phí môn bài (đã bỏ từ 2026)"; key_points chỉ còn ý chấm dứt thu và ghi chú tra cứu năm cũ (bỏ mức phí, miễn năm đầu, hạn 30/01 chưa xác minh).
  - `tu-0-den-1.json` mục `bo-le-phi-mon-bai`: điền `legal_basis`, bỏ todo "theo báo chí".
- Miễn TNDN 3 năm cho DN nhỏ và vừa đăng ký lần đầu (`tu-0-den-1.json`, `mien-tndn-dn-moi`): sửa who, benefit (tính liên tục, áp dụng từ kỳ 2025, phần còn lại cho DN cũ); thêm điều kiện loại trừ, cách chọn kỳ đầu, chọn ưu đãi có lợi nhất, vẫn quyết toán năm; điền `legal_basis`. Giữ câu khuyên hỏi cơ quan thuế, có lý do (khoản lớn, rủi ro truy thu).
- `so-ke-toan.json`: thêm lưu ý phần mềm kế toán miễn phí theo Nghị định 20/2026 Điều 10 (chưa có tên nền tảng, không dẫn link).
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 18 (2026-11-13, 05:17 UTC)

- Đọc NC-016 (tiêu chí DN siêu nhỏ, Nghị định 80/2021/NĐ-CP Điều 5–10, đã xác minh). Status giữ "draft".
- `legal-framework.json`, mục Thông tư 132/2018: sửa key point tiêu chí (thêm nhánh nông, lâm, thủy sản, công nghiệp, xây dựng ≤ 3 tỷ; nhánh tổng nguồn vốn ≤ 3 tỷ; lao động đóng BHXH bình quân năm).
- `guides/so-sach-ke-toan.json`: mục "Chế độ kế toán cho DN siêu nhỏ" ghi đủ tiêu chí. Cùng vòng, sửa mục "Các sổ kế toán cần mở" theo NC-009 (đã xác minh ở vòng 10 của Nghiên cứu, vòng 11 mình bỏ sót): bỏ danh sách cũ (nhật ký chung, sổ cái, sổ quỹ tiền mặt), thay bằng 4 sổ S1–S4 hoặc S01, S02–S10 tùy cách nộp thuế TNDN.
- `tu-0-den-1.json`, mục `ke-toan-don-gian`: thêm tiêu chí và cách tính lao động, doanh thu, nguồn vốn; điền `legal_basis` Nghị định 80/2021.
- `questions.json`, câu `revenue_band`: chỉ đổi nhãn cho khớp ngưỡng ("Từ 1 tỷ đồng trở xuống", "Trên 1 tỷ đến 3 tỷ đồng", "Trên 3 tỷ đến 10 tỷ đồng"). Giữ nguyên `value` để không ảnh hưởng câu trả lời đã lưu; giá trị này chưa được dùng trong `rules/` hay code.
- Chưa thêm mục tự kiểm riêng "Công ty mình có phải DN siêu nhỏ không": đã đưa vào bước `ke-toan-don-gian`. Thêm trang hoặc câu hỏi mới là việc lớn hơn.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 19 (2026-11-13, 07:18 UTC)

- Đọc NC-017 (thời hạn đăng ký, thông báo thay đổi; Luật Doanh nghiệp 59/2020 Điều 30, 31 và Luật 76/2025; đã xác minh). Status giữ "draft".
- `guides/dang-ky-thay-doi-doanh-nghiep.json`: summary bỏ "thường là", mốc là "ngày có thay đổi", đổi "Phòng Đăng ký kinh doanh" thành "cơ quan đăng ký kinh doanh". Viết lại mục "Thời hạn đăng ký": đăng ký (Điều 30) và thông báo (Điều 31) đều 10 ngày; theo bản án 15 ngày; 10 ngày là ngày lịch; cơ quan đăng ký xử lý 3 ngày làm việc; thêm thông tin chủ sở hữu hưởng lợi từ 01/07/2025. Bỏ dòng "chuyển nhượng cổ phần" chưa có nguồn.
- `legal-framework.json`: "10 ngày làm việc kể từ ngày có quyết định thay đổi" → "10 ngày kể từ ngày có thay đổi (Điều 30 khoản 2, Điều 31 khoản 2)".
- `bat-dau.json`: thêm "kể từ ngày có thay đổi" ở trụ cột Pháp lý và lỗi "Thay đổi không đăng ký"; "Bất kỳ thay đổi nào → đăng ký" → "Có thay đổi → đăng ký hoặc thông báo". Điền `legal_basis` 2 chỗ.
- `rules/risk_rules.json`, `RISK_CHANGES_NOT_REGISTERED`: viết `explain_plain`, điền `legal_basis`, đổi tiêu đề sang "cơ quan đăng ký kinh doanh". Không ghi mức phạt (chưa xác minh).
- Bỏ các todo mâu thuẫn "10 ngày / 10 ngày làm việc".
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 20 (2026-11-13, 09:17 UTC)

- Đọc NC-018 (phạt chậm nộp hồ sơ khai thuế; Nghị định 125/2020 Điều 7, 13 và Nghị định 310/2025 Điều 1 khoản 10, Điều 4; đã xác minh). Status giữ "draft".
- Hai guide khai GTGT: thay dòng "chậm nộp tờ khai: 2–5 triệu" bằng các khung theo số ngày chậm (cảnh cáo; 2–5; 5–8; 8–15; 15–25 triệu), ghi là mức cho công ty và tiền chậm nộp đi kèm. Các dòng chưa xác minh (0,03%/ngày, 20%, cưỡng chế) gom dưới "Các mức khác (chưa xác minh)".
- `bat-dau.json`, lỗi "Bỏ qua tờ khai thuế": thay "Phạt 2–5 triệu đồng/lần chậm" bằng các khung; điền `legal_basis`.
- `legal-framework.json`, mục Nghị định 125/2020: sửa 2 ý phạt (ý cũ "Không khai thuế: 10–25 triệu" không khớp Điều 13). Ghi Nghị định 310/2025 hiệu lực 16/01/2026 (trả lời câu hỏi cũ của Biên tập; trang thông tin gõ nhầm năm).
- Todo ở 4 chỗ: chưa đọc Nghị định 102/2021 và 291/2026, không viết "mức phạt hiện hành".
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 21 (2026-11-13, 11:17 UTC)

- Đọc NC-018 bổ sung (Nghị định 102/2021 và 291/2026 không sửa Điều 13 Nghị định 125/2020; đã xác minh).
- Thay todo "chưa đọc Nghị định 102/2021, 291/2026" bằng ghi chú đã đối chiếu, kèm link, ở 4 chỗ (2 guide GTGT, `bat-dau.json`, `legal-framework.json`). Không đổi chữ hiển thị. `LegalBasis` không có trường ghi chú nên ghi ở todo.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 22 (2026-11-13, 15:23 UTC)

- Đọc NC-019 (báo cáo tài chính và lưu trữ; Thông tư 132/2018 Điều 13, 14, 18; Nghị định 174/2016 Điều 12, 13, 15; đã xác minh). Status giữ "draft".
- `bat-dau.json`:
  - Trụ cột Kế toán: "Lưu hóa đơn, chứng từ ít nhất 10 năm" → "Lưu chứng từ dùng ghi sổ, sổ kế toán, báo cáo tài chính ít nhất 10 năm"; "Nộp báo cáo tài chính trước 31/3 mỗi năm" → hạn 90 ngày (năm nhuận 30/3), DN nộp TNDN theo % doanh thu không bắt buộc. Điền `legal_basis`.
  - Lịch Tháng 3: dòng BCTC ghi "31/3 (năm nhuận 30/3)" và trường hợp không bắt buộc. Điền `legal_basis` (Thông tư 132/2018; Nghị định 252/2026 cho hạn quyết toán).
- `guides/so-sach-ke-toan.json`: viết lại mục "Báo cáo tài chính hàng năm" (B01, B02, F01, F02; hạn; nơi nộp gồm cả cơ quan đăng ký kinh doanh; trường hợp không bắt buộc; lưu trữ 5/10 năm). Bỏ "Bản thuyết minh" và "tùy quy định từng địa phương". Sửa tên báo cáo ở mục "Chế độ kế toán".
- `legal-framework.json`: mục Luật Kế toán sửa 2 ý lưu trữ, BCTC (bỏ "Điều 40" chưa đối chiếu); mục Thông tư 132/2018 sửa danh mục BCTC.
- Chưa viết cách nộp BCTC qua mạng (chờ hướng dẫn chính thức cho phần thao tác).
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 23 (2026-11-13, 17:17 UTC)

- Đọc NC-020 (hóa đơn điện tử, Nghị định 254/2026 Điều 6, 7, 9, 11, 43) và NC-021 (phương pháp tính thuế GTGT, Luật 48/2024 Điều 10–12, Luật 149/2025). Cả hai đã xác minh. Status giữ "draft".
- NC-020:
  - `guides/hoa-don-dien-tu.json`: sửa summary và mục "Hóa đơn điện tử là gì?" (bỏ "bắt buộc từ 01/07/2022 theo Nghị định 123/2020"); mục loại hóa đơn thành 3 loại (có mã là mặc định, không mã, máy tính tiền); bỏ "miễn phí cổng kết nối thuế", thay bằng miễn phí 12 tháng chỉ ở địa bàn khó khăn; thêm mục "Khi nào phải lập hóa đơn"; căn cứ đổi sang Nghị định 254/2026; bỏ "(miễn phí)" ở phương án 1.
  - "Tổng cục Thuế" → "Cục Thuế" ở 4 guide (hóa đơn, 2 guide GTGT, tạm nộp TNDN).
  - `legal-framework.json`: mục 123/2020 đổi thành Nghị định 254/2026, hiệu lực 01/07/2026, key_points viết lại có điều, khoản.
  - `bat-dau.json` (Tháng 1), `tu-0-den-1.json` (bước hóa đơn điện tử, thêm bước thời điểm lập), `risk_rules.json` (`RISK_NO_E_INVOICE`): sửa chữ, điền `legal_basis`. `chu-ky-so.json`: căn cứ đổi sang 254/2026.
  - 7 todo "theo báo chí… 254/2026 thay 123/2020" ở nhiều file đổi thành ghi chú đã xác minh.
- NC-021:
  - `tu-0-den-1.json`, bước `phuong-phap-thue-gtgt`: thêm tiêu chí 1 tỷ và tỷ lệ % (1/5/3/2%); điền `legal_basis`.
  - `questions.json`, `vat_method`: thêm `help_text` về ngưỡng 1 tỷ.
  - Hai guide khai GTGT: thêm câu đầu "hướng dẫn này cho phương pháp khấu trừ".
- Chưa làm: guide cho phương pháp trực tiếp trên doanh thu (trang mới, xem "Cần chủ dự án quyết"); mức phạt không lập hóa đơn; Thông tư 91/2026; Nghị định 181/2025.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 24 (2026-11-13, 19:18 UTC)

- Đọc NC-021 bổ sung (Nghị định 181/2025 Điều 21; 359/2025 và 144/2026 không sửa điều này; đã xác minh). Status giữ "draft".
- `tu-0-den-1.json`, bước `phuong-phap-thue-gtgt`: thêm 2 bước (doanh thu xét từ tháng 11 năm trước đến tháng 10 năm nay, giữ 2 năm; DN mới có thuê địa điểm hoặc mua tài sản, công cụ được tự nguyện khấu trừ, không đăng ký và dưới 1 tỷ thì trực tiếp 2 năm). Thêm `legal_basis` Nghị định 181/2025. Todo còn mở: mẫu và thời hạn đăng ký tự nguyện.
- `questions.json`, `vat_method`: thêm vào `help_text` câu về DN mới được tự nguyện khấu trừ.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 25 (2026-11-13, 21:17 UTC)

- Đọc NC-022 (BHXH bắt buộc cho người quản lý doanh nghiệp, Luật BHXH 41/2024; đã xác minh). Status giữ "draft". Commit `3fd7988`, sửa tiếp ở commit sau.
- `tu-0-den-1.json`: thêm bước mới `bhxh-nguoi-quan-ly` (bắt buộc): người quản lý phải đóng từ 01/07/2025 kể cả khi không nhận lương; trường hợp không áp dụng; tự chọn mức lương làm căn cứ (mức tham chiếu đến 20 lần); đóng 25% (3% + 22%); kỳ đóng và hạn; giữ câu khuyên hỏi cơ quan BHXH, có lý do. Bước `lao-dong-bhxh`: hạn đổi thành "30 ngày kể từ ngày người lao động thuộc diện phải đóng". Điền `legal_basis` cả hai.
- `bat-dau.json`, Tháng 1–3: "Đăng ký BHXH nếu có nhân viên" → "Đăng ký BHXH bắt buộc cho người quản lý công ty và cho nhân viên có hợp đồng từ đủ 1 tháng", ghi chú hạn và người quản lý không lương. Điền `legal_basis`.
- `questions.json`, `insured_headcount`: thêm `help_text`.
- `legal-framework.json`, mục Luật BHXH: 58/2014/QH13 → 41/2024/QH15, hiệu lực 01/07/2025; key_points viết lại; bỏ "tổng ~32%" và "hạn đóng cuối tháng" chưa có nguồn.
- Chưa ghi số tiền mức tham chiếu, tỷ lệ đóng cho nhân viên, BHYT, BHTN (chưa xác minh). Dòng lịch năm "Đóng BHXH, BHYT, BHTN: cuối tháng" giữ todo cũ.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 26 (2026-11-13, 23:18 UTC)

- Đọc NC-022 bổ sung (định nghĩa người quản lý doanh nghiệp, Luật Doanh nghiệp Điều 4 khoản 24; mức tham chiếu bằng lương cơ sở, Luật BHXH Điều 7, 141; lương cơ sở 2.530.000 đồng từ 01/07/2026, Nghị định 161/2026; đã xác minh). Status giữ "draft".
- `tu-0-den-1.json`, bước `bhxh-nguoi-quan-ly`: thêm danh sách người quản lý; mức tham chiếu hiện là 2.530.000 đồng/tháng, khoảng chọn 2.530.000–50.600.000; mức đóng thấp nhất khoảng 632.500 đồng/tháng mỗi người; ghi rõ số tiền đổi khi lương cơ sở điều chỉnh. Thêm 3 `legal_basis`.
- `bat-dau.json`, việc đăng ký BHXH: ghi chức danh người quản lý và mức đóng thấp nhất. Thêm `legal_basis`.
- Todo "chưa xác minh mức tham chiếu, định nghĩa người quản lý" ở 4 chỗ đổi thành ghi chú đã xác minh; còn mở Nghị định 158/2025, BHYT, BHTN, tỷ lệ đóng cho nhân viên.
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

### Vòng 27 (2026-11-14, 01:17 UTC)

- Đọc NC-023 (tỷ lệ và hạn đóng BHXH, Luật BHXH 41/2024 Điều 32–34; đã xác minh phần BHXH). Status giữ "draft".
- `bat-dau.json`, lịch "Hàng tháng": tách "Đóng BHXH, BHYT, BHTN – cuối tháng" thành "Đóng BHXH: công ty 17%, người lao động 8%" (hạn ngày cuối cùng của tháng tiếp theo) và "Đóng BHYT, BHTN (tỷ lệ chưa có trong sổ tay)" (hạn "Chưa xác minh"). Điền `legal_basis` (Luật BHXH; Nghị định 252/2026 cho hạn GTGT tháng).
- `tu-0-den-1.json`, bước `lao-dong-bhxh`: thêm tỷ lệ, hạn, trường hợp không phải đóng (nghỉ không lương từ 14 ngày); BHYT, BHTN ghi rõ chưa có.
- `legal-framework.json`, mục Luật BHXH: thêm tỷ lệ và hạn đóng vào key_points.
- `so-ke-toan.json`: thêm lưu ý tỷ lệ BHXH cho sổ S2-DNSN.
- Todo "tỷ lệ đóng của DN cho nhân viên" ở 4 chỗ đổi thành "bảo hiểm tai nạn lao động – bệnh nghề nghiệp" (phần còn mở).
- Kiểm tra: `npm test` 85/85 qua, `npm run lint` 15 vấn đề như cũ, `npm run build` thành công.

## Câu hỏi cho agent Nghiên cứu

- (Đã xong ở vòng 9 của Nghiên cứu.) Khi mở được toàn văn, xin ưu tiên NC-001 (Luật Kế toán bản sửa bởi Luật 56/2024/QH15, Nghị định 174/2016): người đại diện theo pháp luật của DN siêu nhỏ có được tự làm kế toán không. Đây là câu then chốt của sản phẩm.
- (Đã trả lời ở NC-018: hiệu lực 16/01/2026.) Nghị định 310/2025/NĐ-CP: cổng ghi hiệu lực "16-01-2025". Nhờ đối chiếu ngày đúng khi mở được toàn văn.

- (Vòng 11) NC-009: xin trích phương pháp ghi từng cột của S1–S4 (Phụ lục 4 mục 2). Cần nhất: S1 ghi doanh thu có hay chưa có thuế GTGT; khi nào ghi (ngày xuất hóa đơn hay ngày giao hàng). Cũng xin kiểm mẫu S3 có tách số lượng, đơn giá, thành tiền không.
- (Vòng 11) Xin ưu tiên đọc Luật Thuế TNDN 67/2025/QH15 và Luật 09/2026/QH16: DN siêu nhỏ còn được nộp thuế TNDN theo tỷ lệ % trên doanh thu không. Nếu không, 4 trang S1–S4 vừa thêm có thể không còn dùng được.

- (Vòng 12) NC-010 còn mở: mức doanh thu được miễn thuế TNDN theo Luật 09/2026 Điều 3; tỷ lệ % tính thuế trên doanh thu (Điều 11 khoản 2); 5 luật sửa Luật 67/2025 có sửa Điều 10, 11 không; DN mới thành lập xác định doanh thu năm trước thế nào.

- (Vòng 13) NC-011: DN được miễn thuế TNDN có còn phải kê khai, quyết toán TNDN không (Luật Quản lý thuế 108/2025, Nghị định 252/2026, Thông tư 89/2026). DN cũ có doanh thu năm trước từ 1 tỷ trở xuống có văn bản nói thẳng là không phải tạm nộp quý không.

- (Vòng 14) NC-012: DN nộp thuế TNDN theo % doanh thu thì kê khai theo quý hay năm, dùng mẫu tờ khai nào. Có Thông tư hướng dẫn Nghị định 320/2025 không.

- (Vòng 15) NC-013: hạn trùng ngày nghỉ, lễ có được dời sang ngày làm việc tiếp theo không (app đang ghi có, engine dùng `next_working_day`). Thông tư 89/2026 có nói rõ DN được miễn TNDN vẫn nộp quyết toán không.

- (Vòng 16) NC-014: DN mới chọn khai GTGT quý ở đâu (tờ khai đăng ký thuế, hay tờ khai đầu tiên). Cần cho trang thao tác.

- (Vòng 17) NC-015: xin đọc Nghị định 80/2021/NĐ-CP (tiêu chí DN siêu nhỏ, nhỏ, vừa). Nhiều mục (miễn 3 năm, chế độ kế toán, phụ trách kế toán) đều dựa vào tiêu chí này.

- (Đã trả lời ở NC-018 bổ sung.) (Vòng 20) NC-018: xin đọc Nghị định 291/2026/NĐ-CP (và 102/2021) xem có sửa Điều 13 Nghị định 125/2020 không, trước khi coi các khung phạt là hiện hành.

- (Vòng 23) NC-021: xin đọc Nghị định 181/2025 (và bản sửa 359/2025, 144/2026): cách tính doanh thu hằng năm để chọn khấu trừ hay trực tiếp, thủ tục đăng ký tự nguyện khấu trừ, DN mới thành lập. Và kỳ khai, mẫu tờ khai GTGT cho phương pháp trực tiếp.

- (Vòng 25) NC-022: xin xác minh mức tham chiếu hiện tại, tỷ lệ đóng BHXH, BHYT, BHTN của DN và người lao động, hạn đóng hằng tháng (Nghị định 158/2025, Luật BHYT, Luật Việc làm).

- (Vòng 27) NC-023: xin xác minh tỷ lệ và hạn đóng BHYT (Luật Bảo hiểm y tế), BHTN (Luật Việc làm), bảo hiểm tai nạn lao động – bệnh nghề nghiệp; và người quản lý không lương có phải đóng BHYT, BHTN không.

## Cần chủ dự án quyết

- (Vòng 10) NC-001: theo Luật Kế toán và Nghị định 174/2016, giám đốc DN siêu nhỏ được làm kế toán cho công ty mình, nhưng phải có bằng hoặc chứng chỉ kế toán. Người phụ trách kế toán còn cần chứng chỉ bồi dưỡng kế toán trưởng và 2–3 năm kinh nghiệm. Nội dung app đã ghi như vậy. Định hướng "tự làm trọn vẹn, không cần thuê kế toán ngoài" trong `AGENTS.md` có thể cần sửa, ví dụ: "tự làm việc hằng ngày; thuê dịch vụ phụ trách kế toán nếu chưa đủ điều kiện". Agent Biên tập không sửa `AGENTS.md`.
- (Vòng 13) Công cụ tạo lịch nghĩa vụ (`obligation_rules.json`, engine) chưa có trường doanh thu năm trước. Vì vậy nghĩa vụ tạm nộp TNDN vẫn hiện với mọi công ty, kể cả công ty được miễn. Thêm câu hỏi doanh thu vào form và điều kiện vào engine là việc lớn (đổi cấu trúc dữ liệu), cần chủ dự án đồng ý.
- (Vòng 23) Nhiều DN siêu nhỏ (doanh thu dưới 1 tỷ) mặc định tính thuế GTGT trực tiếp trên doanh thu (NC-021), nhưng app chỉ có guide cho phương pháp khấu trừ. Có làm guide mới "Khai thuế GTGT theo phương pháp trực tiếp" không? Cần thêm trang và rule mới.
