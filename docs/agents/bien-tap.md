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

## Câu hỏi cho agent Nghiên cứu

- (Đã xong ở vòng 9 của Nghiên cứu.) Khi mở được toàn văn, xin ưu tiên NC-001 (Luật Kế toán bản sửa bởi Luật 56/2024/QH15, Nghị định 174/2016): người đại diện theo pháp luật của DN siêu nhỏ có được tự làm kế toán không. Đây là câu then chốt của sản phẩm.
- Nghị định 310/2025/NĐ-CP: cổng ghi hiệu lực "16-01-2025". Nhờ đối chiếu ngày đúng khi mở được toàn văn.

- (Vòng 11) NC-009: xin trích phương pháp ghi từng cột của S1–S4 (Phụ lục 4 mục 2). Cần nhất: S1 ghi doanh thu có hay chưa có thuế GTGT; khi nào ghi (ngày xuất hóa đơn hay ngày giao hàng). Cũng xin kiểm mẫu S3 có tách số lượng, đơn giá, thành tiền không.
- (Vòng 11) Xin ưu tiên đọc Luật Thuế TNDN 67/2025/QH15 và Luật 09/2026/QH16: DN siêu nhỏ còn được nộp thuế TNDN theo tỷ lệ % trên doanh thu không. Nếu không, 4 trang S1–S4 vừa thêm có thể không còn dùng được.

- (Vòng 12) NC-010 còn mở: mức doanh thu được miễn thuế TNDN theo Luật 09/2026 Điều 3; tỷ lệ % tính thuế trên doanh thu (Điều 11 khoản 2); 5 luật sửa Luật 67/2025 có sửa Điều 10, 11 không; DN mới thành lập xác định doanh thu năm trước thế nào.

- (Vòng 13) NC-011: DN được miễn thuế TNDN có còn phải kê khai, quyết toán TNDN không (Luật Quản lý thuế 108/2025, Nghị định 252/2026, Thông tư 89/2026). DN cũ có doanh thu năm trước từ 1 tỷ trở xuống có văn bản nói thẳng là không phải tạm nộp quý không.

## Cần chủ dự án quyết

- (Vòng 10) NC-001: theo Luật Kế toán và Nghị định 174/2016, giám đốc DN siêu nhỏ được làm kế toán cho công ty mình, nhưng phải có bằng hoặc chứng chỉ kế toán. Người phụ trách kế toán còn cần chứng chỉ bồi dưỡng kế toán trưởng và 2–3 năm kinh nghiệm. Nội dung app đã ghi như vậy. Định hướng "tự làm trọn vẹn, không cần thuê kế toán ngoài" trong `AGENTS.md` có thể cần sửa, ví dụ: "tự làm việc hằng ngày; thuê dịch vụ phụ trách kế toán nếu chưa đủ điều kiện". Agent Biên tập không sửa `AGENTS.md`.
- (Vòng 13) Công cụ tạo lịch nghĩa vụ (`obligation_rules.json`, engine) chưa có trường doanh thu năm trước. Vì vậy nghĩa vụ tạm nộp TNDN vẫn hiện với mọi công ty, kể cả công ty được miễn. Thêm câu hỏi doanh thu vào form và điều kiện vào engine là việc lớn (đổi cấu trúc dữ liệu), cần chủ dự án đồng ý.
