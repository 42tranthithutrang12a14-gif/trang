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

- Trạng thái: đã xác minh (cập nhật vòng 9, 2026-11-12; phần cũ bên dưới giữ để đối chiếu)
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
- **Cập nhật vòng 9 (2026-11-12): đã mở toàn văn.** Bản PDF có chữ ký số của Cổng TTĐT Chính phủ, tải từ trang văn bản trên vanban.chinhphu.vn. Ba bản Luật 88/2015, Nghị định 174/2016, Thông tư 132/2018 là bản quét; đã nhận dạng chữ (OCR) rồi đọc lại từng câu trích dưới đây.
  - Luật Kế toán 88/2015/QH13 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=183198&classid=1 (PDF: https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/01/88.signed.pdf, trang 23–25):
    - Điều 49 khoản 1: "Đơn vị kế toán phải tổ chức bộ máy kế toán, bố trí người làm kế toán hoặc thuê dịch vụ làm kế toán."
    - Điều 51 khoản 1: "Người làm kế toán phải có các tiêu chuẩn sau đây: a) Có phẩm chất đạo đức nghề nghiệp, trung thực, liêm khiết, có ý thức chấp hành pháp luật; b) Có trình độ chuyên môn, nghiệp vụ về kế toán."
    - Điều 52 khoản 4: không được làm kế toán: "Người đang là người quản lý, điều hành, thủ kho, thủ quỹ, người mua, bán tài sản trong cùng một đơn vị kế toán, trừ trong doanh nghiệp tư nhân, công ty trách nhiệm hữu hạn do một cá nhân làm chủ sở hữu và các trường hợp khác do Chính phủ quy định."
    - Điều 52 khoản 3: người thân (cha, mẹ, vợ, chồng, con, anh, chị, em ruột) của người đại diện theo pháp luật, giám đốc, kế toán trưởng… không được làm kế toán trong cùng đơn vị, cùng các ngoại lệ như khoản 4.
    - Điều 54 khoản 1: kế toán trưởng phải có: a) tiêu chuẩn tại khoản 1 Điều 51; b) chuyên môn, nghiệp vụ về kế toán từ trung cấp trở lên; c) chứng chỉ bồi dưỡng kế toán trưởng; d) thời gian công tác thực tế về kế toán ít nhất 02 năm (đại học trở lên) hoặc 03 năm (trung cấp, cao đẳng).
  - Luật 56/2024/QH15 — https://vanban.chinhphu.vn/?pageid=27160&docid=212484&classid=1 (PDF: https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/01/luat56.pdf, có lớp chữ): Điều 2 sửa Luật Kế toán ở các điều 3, 7, 11, 12, 16, 19, 29, 51 (chỉ khoản 2, về quyền độc lập chuyên môn), 71. **Không sửa** khoản 1 Điều 51, Điều 52, Điều 54. Hiệu lực chung từ 01/01/2025 (Điều 7 khoản 1 của Luật 56/2024 theo bản PDF, dòng "Luật này có hiệu lực thi hành từ ngày 01 tháng 01 năm 2025").
  - Nghị định 174/2016/NĐ-CP — https://vanban.chinhphu.vn/?pageid=27160&docid=187897&classid=1 (PDF: https://datafiles.chinhphu.vn/cpp/files/vbpq/2017/01/174.signed.pdf, trang 12–16):
    - Điều 18 khoản 1: "Đơn vị kế toán có thể bố trí người làm kế toán kiêm nhiệm các công việc khác mà pháp luật về kế toán không nghiêm cấm."
    - Điều 18 khoản 5: "Người có trình độ chuyên môn nghiệp vụ về kế toán là người đã tốt nghiệp trung cấp chuyên nghiệp, cao đẳng, đại học, sau đại học chuyên ngành tài chính, kế toán, kiểm toán…; người có chứng chỉ kiểm toán viên…; người có chứng chỉ kế toán viên…; người có chứng chỉ chuyên gia kế toán hoặc chứng chỉ kế toán do tổ chức nước ngoài… được Bộ Tài chính Việt Nam thừa nhận."
    - Điều 19 khoản 3: không được làm kế toán: "Người đang làm quản lý, điều hành, thủ kho, thủ quỹ, người được giao nhiệm vụ thường xuyên mua, bán tài sản trong cùng một đơn vị kế toán, trừ trường hợp trong cùng doanh nghiệp tư nhân, công ty trách nhiệm hữu hạn do một cá nhân làm chủ sở hữu và các doanh nghiệp thuộc loại hình khác không có vốn nhà nước và là doanh nghiệp siêu nhỏ theo quy định của pháp luật về hỗ trợ doanh nghiệp nhỏ và vừa." Khoản 2 có ngoại lệ giống hệt cho người thân.
    - Điều 20 khoản 1: "Đơn vị kế toán phải bố trí kế toán trưởng trừ các đơn vị quy định tại khoản 2 Điều này." Khoản 2 điểm b: "Các doanh nghiệp siêu nhỏ theo quy định của pháp luật về hỗ trợ doanh nghiệp nhỏ và vừa được bố trí phụ trách kế toán mà không bắt buộc phải bố trí kế toán trưởng."
    - Điều 21 khoản 1: "Kế toán trưởng, phụ trách kế toán phải có các tiêu chuẩn quy định tại điểm a, c, d khoản 1 Điều 54 Luật kế toán và không thuộc các trường hợp không được làm kế toán theo quy định tại Điều 19 Nghị định này." Khoản 3 điểm g: kế toán trưởng, phụ trách kế toán của "Doanh nghiệp… không có vốn nhà nước, có vốn điều lệ nhỏ hơn 10 tỷ đồng" phải có chuyên môn nghiệp vụ về kế toán từ trung cấp chuyên nghiệp trở lên.
    - Điều 22 khoản 1: đơn vị kế toán trong lĩnh vực kinh doanh "được thuê đơn vị kinh doanh dịch vụ kế toán để làm kế toán hoặc làm kế toán trưởng, phụ trách kế toán."
  - Thông tư 132/2018/TT-BTC — https://vanban.chinhphu.vn/?pageid=27160&docid=196286&classid=1 (PDF: https://datafiles.chinhphu.vn/cpp/files/vbpq/2019/02/132-btc.signed.pdf, trang 3), Điều 8:
    - Khoản 1: "Các doanh nghiệp siêu nhỏ được bố trí phụ trách kế toán mà không bắt buộc phải bố trí kế toán trưởng. Các doanh nghiệp siêu nhỏ nộp thuế TNDN theo tỷ lệ % trên doanh thu bán hàng hóa, dịch vụ có thể tự tổ chức thực hiện công tác kế toán theo quy định tại Chương III Thông tư này."
    - Khoản 2: "Việc bố trí người làm kế toán của doanh nghiệp siêu nhỏ phải đảm bảo không vi phạm quy định tại Điều 19 Nghị định số 174/2016/NĐ-CP…"
    - Khoản 3: DN siêu nhỏ được ký hợp đồng thuê dịch vụ làm kế toán hoặc dịch vụ làm kế toán trưởng.
- **Kết luận (theo các điều trên):**
  1. Chủ DN siêu nhỏ (giám đốc, người đại diện theo pháp luật) **không bị cấm** làm kế toán cho công ty mình. Lệnh cấm người quản lý, điều hành làm kế toán có ngoại lệ cho DN tư nhân, công ty TNHH một thành viên do cá nhân làm chủ, và DN siêu nhỏ không có vốn nhà nước (Luật Kế toán Điều 52 khoản 4; Nghị định 174/2016 Điều 19 khoản 3). Người thân của giám đốc cũng được ngoại lệ tương tự (Điều 19 khoản 2).
  2. Nhưng người làm kế toán vẫn phải có "trình độ chuyên môn, nghiệp vụ về kế toán" (Luật Điều 51 khoản 1 điểm b). Nghị định 174/2016 Điều 18 khoản 5 định nghĩa là: có bằng trung cấp trở lên chuyên ngành tài chính, kế toán, kiểm toán, hoặc có một trong các chứng chỉ kế toán viên, kiểm toán viên, chuyên gia kế toán được thừa nhận.
  3. DN siêu nhỏ không bắt buộc có kế toán trưởng, nhưng "được bố trí phụ trách kế toán" (Nghị định 174/2016 Điều 20 khoản 2 điểm b; TT 132/2018 Điều 8 khoản 1). Người phụ trách kế toán phải đạt điểm a, c, d khoản 1 Điều 54 Luật Kế toán: có chứng chỉ bồi dưỡng kế toán trưởng và 02–03 năm làm kế toán thực tế (Nghị định 174/2016 Điều 21 khoản 1). Với DN vốn điều lệ dưới 10 tỷ: trình độ từ trung cấp trở lên (Điều 21 khoản 3 điểm g).
  4. Như vậy: chủ DN **không có** bằng hoặc chứng chỉ kế toán thì theo câu chữ các văn bản trên **chưa đủ điều kiện** tự đứng tên làm kế toán, phụ trách kế toán. Cách hợp lệ là thuê dịch vụ làm kế toán hoặc dịch vụ phụ trách kế toán (Nghị định 174/2016 Điều 22 khoản 1; TT 132/2018 Điều 8 khoản 3). Chủ DN vẫn tự làm được phần lớn công việc hằng ngày: lập, giữ chứng từ, ghi chép, chuẩn bị số liệu.
  5. Câu "Người phụ trách kế toán bắt buộc phải có chứng chỉ hành nghề hoặc bằng kế toán" trong `so-sach-ke-toan.json` **đúng một phần nhưng sai chữ**: văn bản không đòi "chứng chỉ hành nghề"; văn bản đòi trình độ chuyên môn (bằng trung cấp trở lên ngành TC-KT-KiT hoặc chứng chỉ kế toán viên/kiểm toán viên…), và với phụ trách kế toán còn đòi chứng chỉ bồi dưỡng kế toán trưởng và thời gian công tác thực tế.
- **Điểm còn mở (ghi todo, chưa kết luận):**
  - Chưa rõ DN siêu nhỏ có **bắt buộc** bố trí người phụ trách kế toán không, hay chỉ "được bố trí" (chữ "được" ở Điều 20 khoản 2 điểm b). Điều 20 khoản 1 buộc bố trí kế toán trưởng trừ đơn vị ở khoản 2; cách đọc hợp lý là DN siêu nhỏ phải có ít nhất phụ trách kế toán hoặc thuê dịch vụ, nhưng nên ghi rõ là cách hiểu, chưa có văn bản hướng dẫn trực tiếp.
  - TT 132/2018 Điều 8 khoản 1 câu 2: DN siêu nhỏ nộp thuế TNDN theo tỷ lệ % trên doanh thu "có thể tự tổ chức thực hiện công tác kế toán" theo Chương III. Chưa rõ câu này có miễn điều kiện trình độ hay không. Cần người duyệt (kế toán, luật sư) cho ý kiến — đây là chỗ rủi ro cao, đúng trường hợp AGENTS.md cho phép nhắc tới kế toán, luật sư.
  - Thông tư 101/2026/TT-BTC (chứng chỉ bồi dưỡng kế toán trưởng, hiệu lực 01/01/2027) chưa đọc.
  - Chưa tìm thấy văn bản sửa đổi Nghị định 174/2016 trên vanban.chinhphu.vn (tìm theo trích yếu "Nghị định số 174/2016", "Luật kế toán"). Một nghị định sửa nhiều nghị định có thể không hiện qua cách tìm này.
  - Tiêu chí DN siêu nhỏ: Nghị định 80/2021/NĐ-CP (chưa đọc toàn văn).
- **Đề xuất sửa (Biên tập):**
  - Điền `legal_basis` cho các mục liên quan (bat-dau "Chuẩn bị tự làm kế toán", tu-0-den-1 bước kiểm tra điều kiện, so-sach-ke-toan mục "Ai làm kế toán?") với: Luật Kế toán 88/2015/QH13 Điều 51 khoản 1, Điều 52 khoản 4; Nghị định 174/2016/NĐ-CP Điều 18 khoản 5, Điều 19 khoản 3, Điều 20 khoản 2 điểm b, Điều 21 khoản 1 và khoản 3 điểm g, Điều 22 khoản 1; TT 132/2018/TT-BTC Điều 8. URL: trang văn bản trên vanban.chinhphu.vn ở trên. `checked_at`: 2026-11-12. Đặt `verified_against_original: true` cho các trích dẫn này. Status giữ "draft".
  - Sửa câu ⚠️ trong `so-sach-ke-toan.json` thành, ví dụ: "Người làm kế toán phải có trình độ chuyên môn kế toán: bằng trung cấp trở lên ngành tài chính, kế toán, kiểm toán, hoặc chứng chỉ kế toán viên, kiểm toán viên. Người phụ trách kế toán của DN siêu nhỏ còn cần chứng chỉ bồi dưỡng kế toán trưởng và 2–3 năm làm kế toán. Giám đốc DN siêu nhỏ được làm kế toán cho công ty mình nếu đủ các điều kiện này. Nếu chưa đủ, thuê dịch vụ kế toán cho phần phụ trách kế toán; việc ghi chép hằng ngày vẫn tự làm được."
  - Bước "Kiểm tra điều kiện tự làm kế toán" (tu-0-den-1, bat-dau): đưa vào 3 câu hỏi tự kiểm: (1) công ty có vốn nhà nước không; (2) mình có bằng/chứng chỉ kế toán theo Điều 18 khoản 5 không; (3) có chứng chỉ bồi dưỡng kế toán trưởng và đủ thời gian làm kế toán không. Nếu (2) hoặc (3) là "không" thì hướng dẫn thuê dịch vụ cho phần phụ trách kế toán.
  - Ghi vào todo các "điểm còn mở" ở trên. Đây là nội dung rủi ro cao, nên giữ một câu khuyên hỏi kế toán hoặc cơ quan thuế để xác nhận cách hiểu Điều 20 và TT 132/2018 Điều 8 khoản 1, kèm lý do.
  - Định hướng sản phẩm trong AGENTS.md ("tự làm trọn vẹn, không cần thuê kế toán ngoài") có thể vướng các điều trên. Báo chủ dự án (mục "Cần chủ dự án quyết").

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

### Ghi chú vòng 4 (2026-11-11, 14:19 UTC)

- Mạng chưa đổi: ba máy chủ PDF vẫn 403; `vbpl.moj.gov.vn` 502; `www.gdt.gov.vn` bị ngắt. vanban.chinhphu.vn chập chờn (có lúc ngắt kết nối), phải thử lại.
- Đã rà commit `3105c81` của agent Biên tập (NC-006): đổi "Sở KHĐT"/"Sở Kế hoạch và Đầu tư" thành "cơ quan đăng ký kinh doanh cấp tỉnh", thay mpi.gov.vn bằng dangkykinhdoanh.gov.vn, bỏ số điện thoại và email cũ. Đúng đề xuất, không đụng nội dung pháp lý. Không còn chỗ nào nhắc mpi.gov.vn ngoài todo.
- Còn sót nhỏ: `gop-von-dieu-le.json` vẫn ghi "Cục Quản lý đăng ký kinh doanh". Biên tập đã ghi todo, chưa đổi. Đồng ý giữ, vì chưa có văn bản giao nhiệm vụ.

### NC-007 — Bảo hiểm xã hội, chữ ký số, giao dịch điện tử, hỗ trợ DNNVV: văn bản mới hơn văn bản app dẫn

- Trạng thái: không mở được
- Liên quan: `src/content/legal-framework.json` (mục 130/2018/NĐ-CP dòng 260; mục "51/2005/QH11 (thay thế bởi 20/2023/QH15)" dòng 279; mục "58/2014/QH13 (đang sửa đổi)" dòng 321; ghi chú bổ sung 04/2017/QH14 dòng 388); `src/content/guides/chu-ky-so.json` (danh sách văn bản dòng 32); `src/content/tu-0-den-1.json` (todo dòng 482, 657, 838).
- Phát hiện (trang thông tin trên vanban.chinhphu.vn, mở ngày 2026-11-11):
  - Bảo hiểm xã hội: Luật Bảo hiểm xã hội 41/2024/QH15, ban hành 29/06/2024, hiệu lực 01/07/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=211199&classid=1 — Nghị định 158/2025/NĐ-CP hướng dẫn BHXH bắt buộc, hiệu lực 01/07/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=214189&classid=1 — App ghi "58/2014/QH13 (đang sửa đổi)"; chữ "đang sửa đổi" đã cũ. Chưa đọc điều khoản thi hành nên chưa khẳng định 41/2024 thay hẳn 58/2014, chưa xác minh mức đóng và hạn đóng.
  - Chữ ký số: Nghị định 130/2018/NĐ-CP (hiệu lực 15/11/2018) đã được sửa bởi Nghị định 48/2024/NĐ-CP (hiệu lực 09/05/2024). https://vanban.chinhphu.vn/?pageid=27160&docid=194913&classid=1 và https://vanban.chinhphu.vn/?pageid=27160&docid=210212&classid=1 — Có Nghị định 23/2025/NĐ-CP quy định về chữ ký điện tử và dịch vụ tin cậy, ban hành 21/02/2025, hiệu lực 10/04/2025. https://vanban.chinhphu.vn/?pageid=27160&docid=212829&classid=1 — Khớp todo "gợi ý của trợ lý AI". Chưa đọc điều khoản thay thế.
  - Giao dịch điện tử: Luật Giao dịch điện tử 20/2023/QH15, ban hành 22/06/2023, hiệu lực 01/07/2024. https://vanban.chinhphu.vn/?pageid=27160&docid=208421&classid=1 — Trả lời được todo "Xác nhận Luật GDĐT 20/2023 đã có hiệu lực từ 01/07/2024 chưa" ở mức trang thông tin: cổng ghi hiệu lực 01/07/2024. Luật 20/2026/QH16 sửa đổi, bổ sung Luật Giao dịch điện tử (cùng Luật Viễn thông…), ban hành 24/08/2026, hiệu lực 01/03/2027. https://vanban.chinhphu.vn/?pageid=27160&docid=219488&classid=1
  - Hỗ trợ DNNVV: Luật 04/2017/QH14, ban hành 12/06/2017, hiệu lực 01/01/2018. https://vanban.chinhphu.vn/?pageid=27160&docid=190283&classid=1 — Nghị định 80/2021/NĐ-CP hướng dẫn, ban hành 26/08/2021, hiệu lực 15/10/2021. https://vanban.chinhphu.vn/?pageid=27160&docid=203941&classid=1 — Nghị định này (nếu đúng như trí nhớ, CHƯA XÁC MINH) có tiêu chí xác định DN siêu nhỏ theo lao động và doanh thu/vốn; đây là căn cứ để người dùng biết mình có phải DN siêu nhỏ không. Nên đưa vào danh sách cần đọc khi mở được toàn văn.
- Nguồn: vanban.chinhphu.vn, trang thông tin văn bản, mở ngày 2026-11-11. Toàn văn PDF bị chặn.
- Đề xuất sửa: chỉ cập nhật todo, không đổi nội dung pháp lý.
  - `legal-framework.json` mục BHXH: todo ghi "đã thấy trên vanban.chinhphu.vn: Luật 41/2024/QH15 hiệu lực 01/07/2025; Nghị định 158/2025/NĐ-CP (BHXH bắt buộc) hiệu lực 01/07/2025; chưa đọc toàn văn". Cân nhắc bỏ chữ "(đang sửa đổi)" ở trường `number`, vì đây là mô tả trạng thái, không phải nội dung pháp lý; nếu thấy chưa chắc thì để nguyên.
  - Các todo về 130/2018 → 23/2025 (3 chỗ): ghi "đã thấy: Nghị định 23/2025/NĐ-CP hiệu lực 10/04/2025; 130/2018 từng được sửa bởi 48/2024/NĐ-CP; chưa đọc điều khoản thay thế".
  - `legal-framework.json` mục giao dịch điện tử: todo "Xác nhận Luật GDĐT 20/2023 đã có hiệu lực từ 01/07/2024 chưa" ghi "cổng vanban.chinhphu.vn ghi hiệu lực 01/07/2024; có Luật 20/2026/QH16 sửa đổi, hiệu lực 01/03/2027". Mâu thuẫn số hiệu 51/2005 trong mục này vẫn để todo.
  - `legal-framework.json` ghi chú 04/2017: thêm "Nghị định 80/2021/NĐ-CP (hiệu lực 15/10/2021) hướng dẫn Luật Hỗ trợ DNNVV; cần đọc tiêu chí DN siêu nhỏ".

### Ghi chú vòng 5 (2026-11-11, 16:17 UTC)

- Mạng chưa đổi: ba máy chủ PDF vẫn 403; `vbpl.moj.gov.vn` 502; `www.gdt.gov.vn` bị ngắt.
- Đã rà commit `7f4395b` của agent Biên tập (NC-007): chỉ cập nhật todo; bỏ chữ "(đang sửa đổi)" ở trường `number` mục BHXH, số hiệu giữ nguyên. Đúng đề xuất. Biên tập tự phát hiện ngày hiệu lực 130/2018 lệch; vòng này kiểm lại (NC-008).

### NC-008 — Đối chiếu ngày hiệu lực trong `legal-framework.json` với vanban.chinhphu.vn

- Trạng thái: không mở được (chỉ đối chiếu với trang thông tin văn bản, chưa đọc điều khoản hiệu lực trong toàn văn)
- Liên quan: `src/content/legal-framework.json`, trường `effective_from` của từng văn bản.
- Phát hiện: 12/14 văn bản khớp. 1 văn bản lệch, 1 không đối chiếu được. Hai văn bản không tìm thấy trên cổng bằng ô tìm kiếm (13/2008/QH12, 80/2021/TT-BTC). Chưa tra 58/2014/QH13 vòng này.

  | Văn bản | App ghi | Cổng ghi hiệu lực | Kết quả | Trang |
  | --- | --- | --- | --- | --- |
  | 59/2020/QH14 | 01/01/2021 | 01/01/2021 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=200447&classid=1 |
  | 01/2021/NĐ-CP | 04/01/2021 | 04/01/2021 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=202344&classid=1 |
  | 14/2008/QH12 | 01/01/2009 | cổng không ghi | chưa đối chiếu được | https://vanban.chinhphu.vn/?pageid=27160&docid=70678&classid=1 |
  | 96/2015/TT-BTC | 06/08/2015 | 06/08/2015 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=180650&classid=1 |
  | 139/2016/NĐ-CP | 01/01/2017 | 01/01/2017 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=186624&classid=1 |
  | 88/2015/QH13 | 01/01/2017 | 01/01/2017 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=183198&classid=1 |
  | 132/2018/TT-BTC | 15/02/2019 | 15/02/2019 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=196286&classid=1 |
  | 123/2020/NĐ-CP | 01/07/2022 | 01/07/2022 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=201365&classid=1 |
  | 78/2021/TT-BTC | 01/07/2022 | 01/07/2022 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=204200&classid=1 |
  | 130/2018/NĐ-CP | 25/09/2018 | 15/11/2018 (ban hành 27/09/2018) | **lệch** | https://vanban.chinhphu.vn/?pageid=27160&docid=194913&classid=1 |
  | 20/2023/QH15 (mục Giao dịch điện tử) | 01/07/2024 | 01/07/2024 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=208421&classid=1 |
  | 45/2019/QH14 | 01/01/2021 | 01/01/2021 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=198540&classid=1 |
  | 125/2020/NĐ-CP | 05/12/2020 | 05/12/2020 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=201364&classid=1 |
  | 122/2021/NĐ-CP | 01/01/2022 | 01/01/2022 | khớp | https://vanban.chinhphu.vn/?pageid=27160&docid=204874&classid=1 |

- Lưu ý: `legal-framework.json` ghi 130/2018/NĐ-CP hiệu lực "25/09/2018". Ngày này không khớp cả ngày ban hành (27/09/2018) lẫn ngày hiệu lực (15/11/2018) trên cổng. Khả năng cao là nhập nhầm.
- Nguồn: vanban.chinhphu.vn, trang thông tin văn bản, mở ngày 2026-11-11.
- Đề xuất sửa:
  - 130/2018/NĐ-CP: thêm vào todo "cổng vanban.chinhphu.vn ghi ban hành 27/09/2018, hiệu lực 15/11/2018; app ghi 25/09/2018". Ngày hiệu lực là dữ liệu pháp lý, nên chỉ đổi khi người duyệt đồng ý hoặc khi đọc được Điều về hiệu lực thi hành trong toàn văn. Nếu chủ dự án chấp nhận trang thông tin của cổng Chính phủ làm căn cứ cho ngày hiệu lực, thì đổi thành 15/11/2018 (status vẫn "draft").
  - Các văn bản "khớp": có thể ghi vào todo "ngày hiệu lực khớp trang thông tin vanban.chinhphu.vn (2026-11-11)". Không đặt `verified_against_original: true`.
  - Lưu ý chung: khớp ngày không có nghĩa văn bản còn hiệu lực. Nhiều văn bản trong bảng đã có văn bản thay thế hoặc sửa đổi (xem NC-002 đến NC-007).

### Ghi chú vòng 6–8 (2026-11-11, 18:18 / 20:18 / 22:17 UTC)

- Vòng 6 và 7 không xong: lệnh tìm kiếm bằng trình duyệt không người lái (Playwright) chờ duyệt quyền thì phiên khởi động lại. Không có kết quả, không commit.
- Vòng 8: mạng chưa đổi. Ba máy chủ PDF vẫn 403; `vbpl.moj.gov.vn` 502; `www.gdt.gov.vn` bị ngắt. Không mở mục mới.
- Đã rà commit `3289683` (NC-008) của agent Biên tập: chỉ thêm todo, không đổi `effective_from`. Đúng đề xuất. Hai vòng 6, 7 của Biên tập chỉ ghi nhật ký.
- Việc còn lại khi chưa có toàn văn: đối chiếu ngày hiệu lực của 13/2008/QH12, 80/2021/TT-BTC, 58/2014/QH13 (NC-008). Cần tìm kiếm bằng trình duyệt; sẽ làm khi lệnh đó chạy được không cần duyệt.
- Hai agent đang chạy vòng không có việc. Đề xuất chủ dự án: tạm giãn lịch chạy (ví dụ mỗi ngày một lần) cho tới khi mở mạng hoặc trả lời hai câu ở mục "Cần chủ dự án quyết".

### Ghi chú vòng 9 (2026-11-12, 07:20 UTC)

- Bắt đầu từ tin của phiên chính: chủ dự án đã mở mạng, đồng ý dùng trang thông tin vanban.chinhphu.vn cho số hiệu, ngày hiệu lực (xem "Quyết định của chủ dự án" trong README, commit `bccd264`).
- Kiểm lại: `datafiles.chinhphu.vn` tải được PDF (200). `vbpq.mof.gov.vn` vẫn bị ngắt kết nối. Chưa thử các máy chủ khác.
- Bản PDF Luật 88/2015, Nghị định 174/2016, Thông tư 132/2018 là bản quét không có lớp chữ. Đã cài OCR (tesseract, tiếng Việt) trong phiên này để đọc. Câu trích ở NC-001 đã sửa lỗi OCR rõ ràng (dấu), giữ nguyên nghĩa.
- Đã rà commit `017f991` của Biên tập: sửa `effective_from` 130/2018 thành 15/11/2018 và `number` mục giao dịch điện tử thành 20/2023/QH15. Khớp trang thông tin trên cổng và quyết định của chủ dự án. Không thấy sai sót.
- NC-001 chuyển sang "đã xác minh". Xem phần cập nhật vòng 9 trong NC-001.

### Ghi chú vòng 10 (2026-11-12, 14:19 UTC)

- Ba lịch chạy 10:17, 12:18, 14:18 bị dồn do phiên khởi động lại; gộp làm một vòng.
- Theo thứ tự ưu tiên mới trong README (commit `630f752`): mục 1 là sổ kế toán. Vòng này làm NC-009.
- Đã rà commit `a722fd1` của Biên tập (áp dụng NC-001): `legal_basis` dẫn đúng điều, khoản tôi đã trích (Luật 88/2015 Điều 51, 52, 54; Nghị định 174/2016 Điều 18–22; TT 132/2018 Điều 8), URL vanban.chinhphu.vn, `verified_against_original: true`, status giữ "draft". Câu ⚠️ đã thay. Không thấy sai sót.

### NC-009 — Sổ kế toán DN siêu nhỏ theo Thông tư 132/2018: danh mục, mẫu, cột

- Trạng thái: đã xác minh (phần danh mục sổ và cột); còn mở phần hiệu lực của Chương III (xem dưới)
- Liên quan: `src/content/so-ke-toan.json` (sổ thu chi Excel; trường `notice` đang ghi "Chưa đối chiếu với mẫu sổ kế toán của Bộ Tài chính"); trang `/cong-cu`.
- Nguồn: Thông tư 132/2018/TT-BTC, trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=196286&classid=1; PDF có chữ ký số https://datafiles.chinhphu.vn/cpp/files/vbpq/2019/02/132-btc.signed.pdf (bản quét, đã OCR rồi đọc lại). Mở ngày 2026-11-12.
- Phát hiện:
  - **Hai chế độ, chọn theo cách nộp thuế TNDN** (Điều 3, PDF trang 2):
    - Khoản 1: DN siêu nhỏ nộp thuế TNDN "theo phương pháp tính trên thu nhập tính thuế" áp dụng Chương II.
    - Khoản 2: DN siêu nhỏ nộp thuế TNDN "tính theo tỷ lệ % trên doanh thu bán hàng hóa, dịch vụ" áp dụng Chương III, hoặc chọn Chương II.
    - Khoản 3: được chọn chế độ kế toán DN nhỏ và vừa (TT 133/2016/TT-BTC). Khoản 4: phải áp dụng nhất quán trong một năm tài chính.
  - **Chương II — danh mục sổ** (Điều 11 khoản 1, PDF trang 5). Mẫu và cách ghi ở Phụ lục 3.
    - Sổ tổng hợp: Sổ Nhật ký – Sổ Cái (S01-DNSN). Cột: thứ tự dòng; ngày tháng ghi sổ; chứng từ (số hiệu, ngày); diễn giải; số tiền phát sinh; số hiệu tài khoản đối ứng (Nợ, Có); thứ tự dòng; rồi từng cặp cột Nợ/Có cho mỗi tài khoản.
    - Sổ chi tiết: S02 vật liệu, dụng cụ, sản phẩm, hàng hóa; S03 tài sản cố định; S04 thanh toán với người mua, người bán; S05 các khoản nợ phải trả; S06a doanh thu (nộp GTGT khấu trừ); S06b doanh thu (nộp GTGT trực tiếp); S07 chi phí sản xuất, kinh doanh; S08 thuế GTGT được khấu trừ; S09 thuế GTGT đầu ra; S10 tiền gửi ngân hàng.
    - Phụ lục 3, cách ghi S01: "Hàng ngày, căn cứ vào các chứng từ kế toán đã được kiểm tra… xác định tài khoản ghi Nợ, tài khoản ghi Có để ghi vào Sổ Nhật ký – Sổ Cái. Số liệu của mỗi chứng từ được ghi trên một dòng ở cả 2 phần Nhật ký và phần Sổ Cái." Chương II đòi ghi Nợ/Có theo hệ thống tài khoản (Phụ lục 2).
  - **Chương III — danh mục sổ** (Điều 17 khoản 1, PDF trang 8–9). Mẫu ở Phụ lục 4 (PDF trang 73–76, số trang in 62–65):
    - S1-DNSN Sổ chi tiết doanh thu bán hàng hóa, dịch vụ. Cột: A ngày tháng ghi sổ; B số hiệu chứng từ; C ngày tháng chứng từ; D diễn giải; 1 doanh thu kinh doanh hàng hóa; 2 kinh doanh dịch vụ; 3 hoạt động khác; ghi chú. Dòng "Cộng số phát sinh trong kỳ".
    - S2-DNSN Sổ theo dõi thanh toán tiền lương và các khoản nộp theo lương. Cột: ngày ghi sổ; chứng từ; diễn giải; với mỗi nhóm "Tiền lương và thu nhập của người lao động", BHXH, BHYT, BHTN có 3 cột: số phải trả, số đã trả, số còn phải trả. Dòng số dư đầu kỳ, phát sinh, cuối kỳ.
    - S3-DNSN Sổ chi tiết vật liệu, dụng cụ, sản phẩm, hàng hóa (mở theo từng tên hàng). Cột: chứng từ (số hiệu, ngày); diễn giải; nhập; xuất; tồn; ghi chú.
    - S4-DNSN Sổ theo dõi tình hình thực hiện nghĩa vụ với NSNN. Cột: chứng từ (số hiệu, ngày); diễn giải; số thuế phải nộp; số thuế đã nộp; ghi chú. Có số dư đầu kỳ, cuối kỳ.
    - Điều 17 khoản 3: ngoài 4 sổ trên, được chọn thêm sổ chi tiết hoặc hình thức sổ tổng hợp khác theo TT 133/2016.
    - Mọi mẫu có chân: "Sổ này có … trang, đánh số từ trang 01 đến trang …", "Ngày mở sổ", chữ ký người lập biểu, kế toán trưởng, người đại diện theo pháp luật (ký, đóng dấu).
  - **Không có "sổ quỹ tiền mặt" riêng** trong cả hai danh mục. Chương II theo dõi tiền mặt qua tài khoản trên Nhật ký – Sổ Cái; S10 chỉ dành cho tiền gửi ngân hàng.
- **Đối chiếu với sổ thu chi của app** (`so-ke-toan.json`):
  - Sổ của app ghi theo dòng tiền (tiền vào, tiền ra, tồn quỹ). Các sổ theo mẫu ghi theo nghiệp vụ: doanh thu ghi khi bán hàng, cung cấp dịch vụ, không phải khi nhận tiền. Một khoản bán chịu chưa thu tiền sẽ không có trong sổ thu chi nhưng phải có trong S1/S06.
  - Với Chương III, lấy được từ "Nhật ký thu chi": S1 (nếu thêm cột phân loại doanh thu hàng hóa, dịch vụ, khác và cột ghi doanh thu chưa thu tiền) và S4 (nếu thêm loại dòng "thuế phải nộp" ngoài "đã nộp"). S2 cần bảng lương riêng. S3 cần theo dõi số lượng nhập, xuất, tồn theo từng mặt hàng.
  - Với Chương II, cần ghi Nợ/Có theo tài khoản. Sổ thu chi hiện tại không đủ.
- **Còn mở:**
  - Chương III chỉ dùng được nếu DN còn được nộp thuế TNDN theo tỷ lệ % trên doanh thu. Luật Thuế TNDN 67/2025/QH15 (hiệu lực 01/10/2025) và Luật 09/2026/QH16 có thể đã đổi phương pháp này cho DN siêu nhỏ. Chưa đọc toàn văn hai luật. Vòng sau ưu tiên.
  - Thông tư 132/2018 còn hiệu lực không: trên vanban.chinhphu.vn chưa thấy văn bản thay thế (NC-002). Chưa thấy Thông tư 58/2026.
  - Phương pháp ghi chi tiết từng cột của S1–S4 (Phụ lục 4 mục 2, PDF trang 77 trở đi) chưa trích hết; vòng sau trích nếu Biên tập cần.
- **Đề xuất sửa (Biên tập):**
  - Trong `so-ke-toan.json`, giữ trường `notice` nhưng sửa cho đúng: "Sổ này giúp ghi thu chi hằng ngày. Theo Thông tư 132/2018/TT-BTC, DN siêu nhỏ nộp thuế TNDN theo tỷ lệ % trên doanh thu phải mở 4 sổ: S1 doanh thu, S2 lương và bảo hiểm, S3 hàng tồn kho, S4 nghĩa vụ thuế. DN tính thuế trên thu nhập tính thuế phải dùng Sổ Nhật ký – Sổ Cái (S01) và các sổ chi tiết S02–S10." `legal_basis`: TT 132/2018 Điều 3, Điều 11 khoản 1, Điều 17 khoản 1, Phụ lục 3, Phụ lục 4; URL ở trên; `verified_against_original: true`.
  - Thêm vào sổ Excel (theo hướng README: ghi chi tiết ở Nhật ký, sổ mẫu lấy ra từ đó): (1) cột "Loại doanh thu" (hàng hóa / dịch vụ / khác) và cách ghi doanh thu bán chịu; (2) trang "S1-DNSN" tự cộng doanh thu theo 3 cột; (3) trang "S4-DNSN" với cột phải nộp, đã nộp; (4) trang "S2-DNSN", "S3-DNSN" để trống theo đúng cột mẫu, cho DN có lao động hoặc hàng tồn kho. Đầu mỗi trang ghi mã mẫu và dòng "Ban hành kèm theo Thông tư số 132/2018/TT-BTC ngày 28/12/2018 của Bộ Tài chính" như mẫu.
  - Ghi todo: Chương III phụ thuộc phương pháp tính thuế TNDN theo Luật 67/2025 (chưa xác minh).

### Ghi chú vòng 11 (2026-11-12, 16:17 UTC)

- Đã rà commit `7eeaca7` của Biên tập: thêm 4 trang trống S1–S4-DNSN vào sổ Excel, tên sổ và tên trang khớp mẫu Phụ lục 4 TT 132/2018. Không thấy sai sót ở phần tiêu đề. Chưa so từng cột.
- Vòng này làm NC-010: điều kiện để dùng chế độ 4 sổ (Chương III TT 132/2018) và mâu thuẫn thuế suất TNDN 20% / 15–17% (ưu tiên mục 3 cũ, nay ảnh hưởng trực tiếp sổ kế toán).

### NC-010 — Thuế suất TNDN cho DN nhỏ và phương pháp tính theo % doanh thu (Luật 67/2025/QH15, Luật 09/2026/QH16)

- Trạng thái: đã xác minh
- Liên quan: `src/content/guides/tam-nop-thue-tndn.json` (mục thuế suất ghi "doanh nghiệp siêu nhỏ áp dụng thuế suất 20%"; todo mâu thuẫn); `src/content/tu-0-den-1.json` (mục thuế suất 15%/17%); `src/content/legal-framework.json` (mục Luật Thuế TNDN 14/2008/QH12); `src/content/so-ke-toan.json` (chế độ 4 sổ của Chương III TT 132/2018).
- Nguồn:
  - Luật Thuế TNDN 67/2025/QH15 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=214607&classid=1; PDF có chữ ký số https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/67qh.signed.pdf (bản quét, đã OCR rồi đọc lại). Mở ngày 2026-11-12.
  - Luật 09/2026/QH16 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=218095&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/5/09-qh.signed.pdf (2 trang, bản quét). Mở ngày 2026-11-12.
- Phát hiện:
  - **Thuế suất** (Luật 67/2025, Điều 10, PDF trang 9–10):
    - Khoản 1: "Thuế suất thuế thu nhập doanh nghiệp là 20%, trừ trường hợp quy định tại các khoản 2, 3 và 4 Điều này và đối tượng được ưu đãi về thuế suất quy định tại Điều 13 của Luật này."
    - Khoản 2: "Thuế suất 15% áp dụng đối với doanh nghiệp có tổng doanh thu năm không quá 03 tỷ đồng."
    - Khoản 3: "Thuế suất 17% áp dụng đối với doanh nghiệp có tổng doanh thu năm từ trên 03 tỷ đồng đến không quá 50 tỷ đồng." Đoạn tiếp: "Doanh thu làm căn cứ … là tổng doanh thu của kỳ tính thuế thu nhập doanh nghiệp trước liền kề. Việc xác định tổng doanh thu làm căn cứ áp dụng thực hiện theo quy định của Chính phủ."
  - **Phương pháp tính thuế** (Điều 11, PDF trang 10):
    - Khoản 1: thuế phải nộp = thu nhập tính thuế × thuế suất, trừ khoản 2.
    - Khoản 2 điểm b: Chính phủ quy định số thuế tính theo tỷ lệ % trên doanh thu cho "Doanh nghiệp có tổng doanh thu năm không quá 03 tỷ đồng quy định tại khoản 2 Điều 10 của Luật này trong trường hợp xác định được doanh thu nhưng không xác định được chi phí, thu nhập của hoạt động sản xuất, kinh doanh".
  - **Hiệu lực** (Điều 19 khoản 1, PDF trang 20): "Luật này có hiệu lực thi hành từ ngày 01 tháng 10 năm 2025 và áp dụng từ kỳ tính thuế thu nhập doanh nghiệp năm 2025."
  - **Miễn thuế theo ngưỡng doanh thu** (Luật 09/2026, Điều 3, PDF trang 2): bổ sung khoản 14a Điều 4 Luật Thuế TNDN: "Thu nhập của doanh nghiệp, tổ chức được thành lập theo quy định của pháp luật Việt Nam có tổng doanh thu năm từ mức quy định của Chính phủ trở xuống được miễn thuế thu nhập doanh nghiệp." Điều 5 khoản 2: các điều 1, 2, 3 "có hiệu lực thi hành từ ngày 01 tháng 01 năm 2026".
  - Phần mở đầu Luật 09/2026 ghi Luật 67/2025 đã được sửa bởi các Luật 116/2025, 122/2025, 133/2025, 141/2025, 143/2025/QH15. Chưa đọc các luật này; chưa biết có sửa Điều 10, 11 không.
- **Kết luận:**
  1. Câu "doanh nghiệp siêu nhỏ áp dụng thuế suất 20%" trong `tam-nop-thue-tndn.json` **sai** với Luật 67/2025 (áp dụng từ kỳ tính thuế năm 2025). DN có tổng doanh thu năm trước liền kề không quá 3 tỷ đồng: 15%; trên 3 tỷ đến 50 tỷ: 17%; còn lại 20%. Mục 15%/17% trong `tu-0-den-1.json` đúng.
  2. Chế độ 4 sổ của Chương III TT 132/2018 vẫn có cơ sở: Luật 67/2025 Điều 11 khoản 2 điểm b vẫn cho tính thuế theo % trên doanh thu, nhưng chỉ khi DN có doanh thu năm không quá 3 tỷ **và** không xác định được chi phí, thu nhập. Tỷ lệ % do Chính phủ quy định (chưa đọc nghị định).
  3. Từ 01/01/2026, DN có tổng doanh thu năm từ mức Chính phủ quy định trở xuống được miễn thuế TNDN. Mức này chưa xác minh (có thể nằm ở Nghị định 141/2026/NĐ-CP hoặc nghị định hướng dẫn Luật 67/2025; chưa đọc).
- **Đề xuất sửa (Biên tập):**
  - `tam-nop-thue-tndn.json` mục thuế suất: thay "Thuế suất phổ thông: 20% (doanh nghiệp siêu nhỏ áp dụng thuế suất 20%)" bằng: "Thuế suất: 15% nếu tổng doanh thu năm trước không quá 3 tỷ đồng; 17% nếu trên 3 tỷ đến 50 tỷ đồng; 20% với các trường hợp còn lại." Sửa ví dụ tính (đang dùng 20%) cho khớp, ví dụ dùng 15%. `legal_basis`: Luật Thuế TNDN 67/2025/QH15, Điều 10 khoản 1, 2, 3; URL https://vanban.chinhphu.vn/?pageid=27160&docid=214607&classid=1; `verified_against_original: true`. Bỏ todo "mâu thuẫn 20% / 15–17%".
  - `tu-0-den-1.json` mục thuế suất 15%/17%: điền `legal_basis` như trên; thêm "căn cứ là doanh thu của kỳ tính thuế trước liền kề".
  - `legal-framework.json` mục Luật Thuế TNDN: được đổi `number` thành 67/2025/QH15 và `effective_from` 01/10/2025 (theo quyết định của chủ dự án về trang thông tin, và đã đọc Điều 19 khoản 1). Ghi chú áp dụng từ kỳ tính thuế năm 2025.
  - Thêm todo ở các mục TNDN: "Luật 09/2026/QH16 Điều 3 (hiệu lực 01/01/2026): DN có doanh thu năm từ mức Chính phủ quy định trở xuống được miễn thuế TNDN; mức này chưa xác minh." Không viết con số mức miễn.
  - `so-ke-toan.json`: thêm điều kiện áp dụng 4 sổ S1–S4: "chỉ dành cho DN nộp thuế TNDN theo tỷ lệ % trên doanh thu: doanh thu năm không quá 3 tỷ đồng và không xác định được chi phí (Luật 67/2025 Điều 11 khoản 2 điểm b; TT 132/2018 Điều 3 khoản 2). DN tính thuế trên thu nhập tính thuế dùng S01–S10."

### Ghi chú vòng 12 (2026-11-12, 18:18 UTC)

- Đã rà commit `9135e64` của Biên tập (áp dụng NC-010): sửa thuế suất 15/17/20% ở `tam-nop-thue-tndn.json`, `tu-0-den-1.json`, `legal-framework.json`; thêm điều kiện 4 sổ ở `so-ke-toan.json`. Đúng đề xuất.
- Vòng này làm NC-011: mức doanh thu được miễn thuế TNDN (điểm còn mở của NC-010).

### NC-011 — DN có tổng doanh thu năm từ 1 tỷ đồng trở xuống được miễn thuế TNDN (Nghị định 141/2026/NĐ-CP)

- Trạng thái: đã xác minh
- Liên quan: `src/content/guides/tam-nop-thue-tndn.json` (toàn bộ hướng dẫn tạm nộp theo quý); `src/content/tu-0-den-1.json` và `src/content/bat-dau.json` (các bước tạm nộp TNDN quý, quyết toán năm); `src/content/rules/obligation_rules.json` (luật nghĩa vụ tạm nộp); `src/content/legal-framework.json` (mục thuế TNDN).
- Nguồn: Nghị định 141/2026/NĐ-CP sửa đổi, bổ sung Nghị định 68/2026/NĐ-CP và Nghị định 320/2025/NĐ-CP. Trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=217960&classid=1; PDF có chữ ký số https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/4/141-ndcp.signed.pdf (4 trang, bản quét, đã OCR rồi đọc lại). Ban hành 29/04/2026. Mở ngày 2026-11-12. Căn cứ luật: Luật 09/2026/QH16 Điều 3 (NC-010).
- Phát hiện:
  - Điều 2 bổ sung khoản 15 Điều 4 Nghị định 320/2025/NĐ-CP (thu nhập được miễn thuế): "Thu nhập của doanh nghiệp, tổ chức được thành lập theo quy định của pháp luật Việt Nam có tổng doanh thu năm từ 01 tỷ đồng trở xuống, cụ thể như sau:"
    - Điểm a: tổng doanh thu năm làm căn cứ "là tổng doanh thu từ hoạt động bán hàng, cung cấp dịch vụ (không bao gồm các khoản giảm trừ doanh thu), doanh thu từ hoạt động tài chính và thu nhập khác trên Phụ lục kết quả hoạt động sản xuất, kinh doanh kèm theo tờ khai quyết toán thuế thu nhập doanh nghiệp của kỳ tính thuế năm trước liền kề".
    - Điểm b: năm trước hoạt động dưới 12 tháng thì quy đổi: doanh thu thực tế ÷ số tháng hoạt động × 12; tháng thành lập tính đủ tháng.
    - Điểm c: "Trường hợp doanh nghiệp mới thành lập trong kỳ tính thuế và dự kiến tổng doanh thu trong kỳ tính thuế không quá 01 tỷ đồng thì doanh nghiệp không phải tạm nộp thuế thu nhập doanh nghiệp. Kết thúc kỳ tính thuế, trường hợp tổng doanh thu thực tế trong kỳ tính thuế vượt mức 01 tỷ đồng thì doanh nghiệp thực hiện kê khai, quyết toán thuế thu nhập doanh nghiệp theo quy định và không phải tính tiền chậm nộp."
    - Điểm d: không áp dụng cho công ty con hoặc công ty có quan hệ liên kết mà doanh nghiệp liên kết không đáp ứng điều kiện miễn thuế (OCR đoạn này có chỗ mờ; nghĩa chính đọc được).
  - Điều 3: "Nghị định này có hiệu lực thi hành từ ngày 01 tháng 01 năm 2026."
  - Điều 4 khoản 2: DN đã tạm nộp quý I năm 2026 mà đủ điều kiện thì "không phải tạm nộp thuế thu nhập doanh nghiệp các quý tiếp theo", được bù trừ, hoàn trả số nộp thừa. Khoản 3: kỳ tính thuế 2025 kết thúc sau 01/01/2026 thì miễn phần thời gian từ 01/01/2026, tính theo tỷ lệ tháng.
  - Điều 1 (ngoài phạm vi DN): nâng ngưỡng của hộ, cá nhân kinh doanh trong Nghị định 68/2026 từ "500 triệu đồng" lên "01 tỷ đồng".
- **Kết luận:** Từ kỳ tính thuế năm 2026, DN siêu nhỏ có tổng doanh thu năm trước liền kề (gồm doanh thu bán hàng, dịch vụ, tài chính, thu nhập khác) từ 1 tỷ đồng trở xuống được miễn thuế TNDN. DN mới thành lập dự kiến doanh thu năm không quá 1 tỷ thì không phải tạm nộp TNDN theo quý. Đây là thay đổi lớn cho người dùng chính của app: nhiều DN siêu nhỏ không phải tạm nộp TNDN.
- **Còn mở:**
  - Văn bản chỉ nói miễn **thuế**. Chưa đọc quy định về nghĩa vụ **kê khai, quyết toán** TNDN cho DN được miễn (Luật Quản lý thuế 108/2025, Nghị định 252/2026, Thông tư 89/2026). Không được viết "không phải quyết toán" khi chưa có căn cứ.
  - Ngoài quy định cho DN mới thành lập ở điểm c, chưa thấy câu nói rõ DN cũ có doanh thu năm trước ≤ 1 tỷ thì không phải tạm nộp quý. Điều 4 khoản 2 ngầm hiểu như vậy cho năm 2026. Ghi là cách hiểu.
  - Chưa đọc Nghị định 320/2025 gốc (76 trang, bản quét). Vòng sau: đọc tỷ lệ % tính thuế trên doanh thu (cho chế độ 4 sổ) và quy định tạm nộp.
- **Đề xuất sửa (Biên tập):**
  - `tam-nop-thue-tndn.json`: thêm ngay đầu hướng dẫn một mục "Trước khi tạm nộp: kiểm tra có được miễn thuế không". Nội dung: "Từ năm 2026, công ty có tổng doanh thu năm trước từ 1 tỷ đồng trở xuống được miễn thuế TNDN. Doanh thu gồm tiền bán hàng, dịch vụ (trừ các khoản giảm trừ), doanh thu tài chính và thu nhập khác. Công ty mới thành lập, dự kiến doanh thu cả năm không quá 1 tỷ đồng: không phải tạm nộp TNDN. Nếu cuối năm doanh thu thực tế vượt 1 tỷ: kê khai, quyết toán bình thường, không bị tính tiền chậm nộp. Công ty con, công ty liên kết có thể không được miễn." `legal_basis`: Nghị định 141/2026/NĐ-CP Điều 2 (khoản 15 Điều 4 Nghị định 320/2025/NĐ-CP, điểm a–d), Điều 3; Luật 09/2026/QH16 Điều 3; URL https://vanban.chinhphu.vn/?pageid=27160&docid=217960&classid=1 và https://vanban.chinhphu.vn/?pageid=27160&docid=218095&classid=1; `verified_against_original: true`.
  - `tu-0-den-1.json`, `bat-dau.json`, `obligation_rules.json`: các bước "tạm nộp TNDN quý" thêm điều kiện "nếu doanh thu năm trước trên 1 tỷ đồng (hoặc DN mới, dự kiến trên 1 tỷ)". Không bỏ hẳn bước, vì DN vượt ngưỡng vẫn phải nộp.
  - Ghi todo: nghĩa vụ kê khai, quyết toán TNDN của DN được miễn chưa xác minh; điểm d (DN liên kết) cần đối chiếu lại bản gốc nếu dùng chi tiết.

### Ghi chú vòng 13 (2026-11-12, 20:18 UTC)

- Đã rà commit `ece01dd` của Biên tập (áp dụng NC-011): thêm mục miễn thuế TNDN khi doanh thu năm trước từ 1 tỷ trở xuống; các bước tạm nộp có điều kiện; chỉ nhắc "không phải quyết toán" trong todo để dặn không viết. Đúng đề xuất.
- Vòng này làm NC-012: Nghị định 320/2025 (thuế suất, tạm nộp của DN mới, tỷ lệ % trên doanh thu). Bản quét 76 trang, đã OCR. Hai số dễ nhầm (50 tỷ, 4%) đã OCR lại ở độ phân giải cao để chắc.

### NC-012 — Nghị định 320/2025/NĐ-CP: căn cứ doanh thu xét thuế suất, tạm nộp của DN mới, tỷ lệ % trên doanh thu

- Trạng thái: đã xác minh
- Liên quan: `src/content/guides/tam-nop-thue-tndn.json`; `src/content/tu-0-den-1.json` (mục thuế suất); `src/content/so-ke-toan.json` (chế độ 4 sổ S1–S4); `src/content/legal-framework.json` (mục thông tư hướng dẫn TNDN 96/2015/TT-BTC).
- Nguồn: Nghị định 320/2025/NĐ-CP quy định chi tiết và hướng dẫn thi hành Luật Thuế TNDN, ban hành 15/12/2025. Trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=216219&classid=1; PDF có chữ ký số https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/12/320-ndcp.signed.pdf (76 trang, bản quét, đã OCR). Mở ngày 2026-11-12.
- Phát hiện:
  - **Điều 11 (thuế suất), PDF trang 41:**
    - Khoản 2, 3: 15% với DN có tổng doanh thu năm không quá 3 tỷ; 17% với trên 3 tỷ đến 50 tỷ (giống Luật 67/2025 Điều 10).
    - Khoản 4: tổng doanh thu để xét "là tổng doanh thu từ hoạt động bán hàng, cung cấp dịch vụ (không bao gồm các khoản giảm trừ doanh thu), doanh thu từ hoạt động tài chính và thu nhập khác trên Phụ lục kết quả hoạt động sản xuất kinh doanh kèm theo tờ khai quyết toán thuế thu nhập doanh nghiệp của kỳ tính thuế năm trước liền kề". Điểm a: năm trước dưới 12 tháng thì quy đổi ra 12 tháng.
    - Khoản 4 điểm b: "Trường hợp doanh nghiệp mới thành lập trong kỳ tính thuế và dự kiến tổng doanh thu trong kỳ tính thuế không quá 03 tỷ đồng hoặc không quá 50 tỷ đồng thì doanh nghiệp xác định tạm nộp hàng quý tương ứng theo mức thuế suất 15% hoặc 17%." Cuối năm, nếu doanh thu thực tế không đúng dự kiến dẫn đến nộp thiếu thì "nộp bổ sung số tiền thuế còn thiếu và tiền chậm nộp".
    - Khoản 4 điểm c: 15% và 17% không áp dụng cho công ty con, công ty có quan hệ liên kết mà doanh nghiệp liên kết không đủ điều kiện.
  - **Điều 12 khoản 4 (tỷ lệ % trên doanh thu), PDF trang 44–45:** "Doanh nghiệp có tổng doanh thu năm không quá 03 tỷ đồng quy định tại Điều 11 của Nghị định này, trong trường hợp không xác định được chi phí, thu nhập của hoạt động sản xuất, kinh doanh thì kê khai nộp thuế thu nhập doanh nghiệp theo tỷ lệ phần trăm (%) trên doanh thu bán hàng hoá, dịch vụ, cụ thể như sau:"
    - a) Phân phối, cung cấp hàng hóa: 0,3%;
    - b) Sản xuất, vận tải, dịch vụ có gắn với hàng hóa, xây dựng có bao thầu nguyên vật liệu: 1,2%;
    - c) Dịch vụ (bao gồm cả lãi tiền gửi, lãi tiền cho vay), xây dựng không bao thầu nguyên vật liệu: 1,5%. Riêng cho thuê tài sản, đại lý bảo hiểm, đại lý xổ số, đại lý bán hàng đa cấp: 4%;
    - d) Cung cấp sản phẩm và dịch vụ nội dung thông tin số về giải trí, trò chơi điện tử, phim số, ảnh số, nhạc số, quảng cáo số: 4%;
    - đ) Hoạt động khác: 0,5%.
  - **Điều 24 khoản 1 (hiệu lực), PDF trang 74:** "Nghị định này có hiệu lực thi hành kể từ ngày ký ban hành và áp dụng từ kỳ tính thuế thu nhập doanh nghiệp năm 2025."
  - Điều 4 khoản 15 (miễn thuế khi doanh thu ≤ 1 tỷ) do Nghị định 141/2026 bổ sung, xem NC-011.
- **Kết luận:**
  1. Ngưỡng 1 tỷ (miễn thuế), 3 tỷ (15%), 50 tỷ (17%) đều tính trên **cùng một loại doanh thu**: doanh thu bán hàng, dịch vụ (trừ giảm trừ) + doanh thu tài chính + thu nhập khác, của năm trước liền kề.
  2. DN mới thành lập tự dự kiến doanh thu để chọn mức tạm nộp 15% hoặc 17% (hoặc không tạm nộp nếu dự kiến ≤ 1 tỷ, NC-011). Dự kiến thấp mà thực tế cao hơn thì phải nộp bù và tiền chậm nộp ở mức 15/17%; riêng ngưỡng 1 tỷ thì không tính tiền chậm nộp (NC-011).
  3. DN dùng chế độ 4 sổ (S1–S4, TT 132/2018 Chương III) nộp thuế TNDN = doanh thu × tỷ lệ % ở trên, theo từng nhóm ngành. Sổ S1 chia doanh thu thành "hàng hóa", "dịch vụ", "hoạt động khác", nhưng các nhóm tỷ lệ của Nghị định chia khác (0,3% / 1,2% / 1,5% / 4% / 0,5%). Sổ cần phân loại doanh thu theo nhóm tỷ lệ thì mới tính được thuế.
  4. Thông tư 96/2015/TT-BTC (`legal-framework.json`) hướng dẫn luật cũ; văn bản hướng dẫn hiện hành là Nghị định 320/2025 (và Thông tư hướng dẫn mới nếu có, chưa tra).
- **Đề xuất sửa (Biên tập):**
  - `tam-nop-thue-tndn.json`: thêm mục "Công ty mới thành lập": tự dự kiến doanh thu cả năm. Dự kiến không quá 1 tỷ: không tạm nộp (NC-011). Không quá 3 tỷ: tạm nộp theo 15%. Trên 3 tỷ đến 50 tỷ: 17%. Dự kiến thấp hơn thực tế dẫn đến nộp thiếu thì phải nộp bù và tiền chậm nộp. Ghi rõ doanh thu để xét gồm doanh thu tài chính và thu nhập khác. `legal_basis`: Nghị định 320/2025/NĐ-CP Điều 11 khoản 2, 3, 4 (điểm a, b, c); URL https://vanban.chinhphu.vn/?pageid=27160&docid=216219&classid=1; `verified_against_original: true`.
  - `so-ke-toan.json` (chế độ 4 sổ): thêm bảng tỷ lệ % theo Điều 12 khoản 4 Nghị định 320/2025. Trong Nhật ký thu chi hoặc S1, thêm cột "Nhóm tỷ lệ thuế TNDN" (0,3% / 1,2% / 1,5% / 4% / 0,5%) để tự tính thuế phải nộp. Nhắc: chỉ dùng khi doanh thu năm không quá 3 tỷ và không xác định được chi phí; và DN doanh thu ≤ 1 tỷ được miễn (NC-011).
  - `legal-framework.json` mục 96/2015/TT-BTC: thêm todo "văn bản hướng dẫn Luật 67/2025 là Nghị định 320/2025/NĐ-CP (hiệu lực từ ngày ký 15/12/2025, áp dụng từ kỳ tính thuế 2025); chưa tra Thông tư hướng dẫn mới". Có thể thêm một mục cho Nghị định 320/2025 (số hiệu, ngày ký theo trang thông tin; theo quyết định của chủ dự án).

### Ghi chú vòng 14 (2026-11-12, 22:18 UTC)

- Đã rà commit `5ffe956` của Biên tập (áp dụng NC-012): bảng tỷ lệ % trong `so-ke-toan.json` khớp Nghị định 320/2025 Điều 12 khoản 4 (0,3 / 1,2 / 1,5 / 4 / 4 / 0,5%). Không thấy sai sót.
- Vòng này làm NC-013: hạn nộp hồ sơ khai thuế tháng, quý, quyết toán; tạm nộp TNDN quý; các trường hợp không phải nộp hồ sơ khai. Giải quyết mâu thuẫn "ngày 30" hay "cuối tháng" (ưu tiên mục 3 cũ) và điểm còn mở của NC-011.

### NC-013 — Hạn khai thuế quý là ngày cuối cùng của tháng đầu quý sau; tạm nộp TNDN 4 quý tối thiểu 80% (Luật 108/2025, Nghị định 252/2026)

- Trạng thái: đã xác minh
- Liên quan:
  - Hạn GTGT quý: `bat-dau.json` dòng 253 ("hạn ngày 30 của tháng đầu quý tiếp theo"); `legal-framework.json` dòng 85; `guides/khai-thue-gtgt-theo-quy.json` (ghi 30/4, 31/7, 31/10, 31/01 — đúng).
  - Hạn tạm nộp TNDN: `bat-dau.json` dòng 254; `legal-framework.json` dòng 112; `guides/tam-nop-thue-tndn.json` dòng 7 ("ngày 30 của tháng đầu quý tiếp theo") và dòng 24 ("30/4, 30/7, 30/10, 30/01").
  - Ngưỡng tạm nộp: `guides/tam-nop-thue-tndn.json` dòng 24 ("ít nhất 75–80%") và dòng 40 ("Tạm nộp thiếu dưới 75%…"); todo dòng 54.
- Nguồn:
  - Luật Quản lý thuế 108/2025/QH15 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=216541&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/01/108-qh15.signed.pdf (65 trang, bản quét, đã OCR). Hiệu lực 01/07/2026 (trang thông tin).
  - Nghị định 252/2026/NĐ-CP hướng dẫn Luật Quản lý thuế — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=218690&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/7/252-ndcp.signed.pdf (133 trang, bản quét, đã OCR). Ban hành 30/06/2026, hiệu lực 01/07/2026 (trang thông tin). Mở ngày 2026-11-12.
- Phát hiện:
  - Luật 108/2025, Điều 12 khoản 8 (PDF trang 11): Chính phủ quy định "các trường hợp không phải nộp hồ sơ khai thuế, khoản thu khác; kỳ tính thuế; thời hạn nộp hồ sơ khai thuế…". Điều 14 khoản 1 điểm a (PDF trang 13): người nộp thuế tự tính thuế thì "thời hạn nộp thuế… chậm nhất là ngày cuối cùng của thời hạn nộp hồ sơ khai thuế"; tạm nộp theo quý theo quy định của Chính phủ.
  - Nghị định 252/2026, Điều 10 (PDF trang 21):
    - Khoản 2: khai theo tháng: "chậm nhất là ngày thứ 20 của tháng tiếp theo tháng phát sinh nghĩa vụ thuế."
    - Khoản 3: khai theo quý: "chậm nhất là ngày cuối cùng của tháng đầu của quý tiếp theo quý phát sinh nghĩa vụ thuế."
    - Khoản 4: khai theo năm: "chậm nhất là ngày cuối cùng của tháng đầu tiên của năm dương lịch tiếp theo hoặc của năm tài chính tiếp theo."
    - Khoản 5 điểm a: khai quyết toán: "Chậm nhất là ngày cuối cùng của tháng thứ 03 kể từ ngày kết thúc kỳ quyết toán thuế". Điểm b: 45 ngày kể từ quyết định giải thể, chấm dứt hoạt động…
  - Nghị định 252/2026, Điều 24 (PDF trang 47–48):
    - Khoản 1: tạm nộp theo quý đối với "a) Thuế thu nhập doanh nghiệp".
    - Khoản 2: "Thời hạn tạm nộp quý chậm nhất là ngày cuối cùng của tháng đầu của quý tiếp theo quý phát sinh nghĩa vụ thuế".
    - Khoản 3 điểm a: "tổng số thuế… đã tạm nộp của 04 quý không được thấp hơn 80% số thuế… phải nộp theo quyết toán năm"; điểm b: nộp thiếu thì tính tiền chậm nộp trên số nộp thiếu, từ ngày tiếp theo hạn tạm nộp quý 4.
  - Nghị định 252/2026, Điều 11 (PDF trang 22–24): 13 trường hợp không phải nộp hồ sơ khai. Khoản 1: "Người nộp thuế chỉ có hoạt động, kinh doanh thuộc đối tượng không chịu thuế…". **Không có** trường hợp "doanh nghiệp được miễn thuế TNDN". Khoản 4: trong thời gian tạm ngừng kinh doanh.
- **Kết luận:**
  1. Hạn khai thuế GTGT quý và hạn tạm nộp TNDN quý (năm dương lịch): Quý I – 30/4; Quý II – 31/7; Quý III – 31/10; Quý IV – 31/01 năm sau. Các chỗ ghi "ngày 30 của tháng đầu quý tiếp theo" và "30/7, 30/10, 30/01" **sai** ba quý sau. Guide `khai-thue-gtgt-theo-quy.json` đúng.
  2. Khai thuế tháng: ngày 20 tháng sau. Quyết toán năm (năm dương lịch): 31/3 năm sau (ngày cuối tháng thứ 3).
  3. Tạm nộp 4 quý phải đạt ít nhất **80%** số thuế quyết toán; câu "75%" và "75–80%" sai.
  4. NC-011 (miễn TNDN ≤ 1 tỷ): Điều 11 không miễn nộp hồ sơ khai cho DN được miễn thuế TNDN. Bản thân Nghị định 141/2026 lấy doanh thu "trên Phụ lục… kèm theo tờ khai quyết toán thuế TNDN của kỳ tính thuế năm trước". Cách hiểu hợp lý: DN được miễn vẫn nộp tờ khai quyết toán TNDN năm. Ghi là cách hiểu; Thông tư 89/2026 có thể nói rõ hơn (chưa đọc).
- **Đề xuất sửa (Biên tập):**
  - Sửa mọi chỗ "ngày 30 của tháng đầu quý tiếp theo" thành "ngày cuối cùng của tháng đầu quý tiếp theo (30/4, 31/7, 31/10, 31/01)" ở `bat-dau.json` (dòng 253, 254), `legal-framework.json` (dòng 85, 112), `tam-nop-thue-tndn.json` (dòng 7, 24). Bỏ todo mâu thuẫn "ngày 30 / cuối tháng". `legal_basis`: Nghị định 252/2026/NĐ-CP Điều 10 khoản 2, 3, 5 điểm a; Điều 24 khoản 1, 2, 3; Luật 108/2025/QH15 Điều 12 khoản 8, Điều 14 khoản 1 điểm a; URL như trên; `verified_against_original: true`.
  - `tam-nop-thue-tndn.json`: thay "75–80%" và "dưới 75%" bằng "ít nhất 80% số thuế quyết toán năm; thiếu thì tính tiền chậm nộp trên phần thiếu, từ sau hạn tạm nộp quý 4". Bỏ todo "75% hay 80%". Ghi rõ hạn quyết toán 31/3 năm sau (kỳ kế toán theo năm dương lịch).
  - `legal-framework.json`: các mục dẫn Luật Quản lý thuế 38/2019/QH14 và Thông tư 80/2021/TT-BTC: thêm todo "từ 01/07/2026 áp dụng Luật 108/2025/QH15 và Nghị định 252/2026/NĐ-CP; hạn khai đã đối chiếu (NC-013)". Có thể đổi `number`, `effective_from` của mục Luật Quản lý thuế theo quyết định của chủ dự án.
  - Các mục miễn TNDN (NC-011): thêm câu "Được miễn thuế vẫn nộp tờ khai quyết toán TNDN năm (cách hiểu theo Nghị định 252/2026 Điều 11; chưa có văn bản nói rõ)". Giữ todo.
  - Câu "Nắm được lịch này là nắm được 80% việc cần làm" (`bat-dau.json` dòng 299) không liên quan ngưỡng 80% tạm nộp; giữ todo "không có nguồn" như cũ.

### Ghi chú vòng 15 (2026-11-13, 00:17 UTC)

- Đã rà commit `951ff66` của Biên tập (áp dụng NC-013): không còn chỗ "ngày 30 của tháng đầu quý", "30/7, 30/10, 30/01" hay "75%" ngoài todo. Dòng "Hạn nộp: 30/01" còn lại ở `legal-framework.json` thuộc mục lệ phí môn bài, ngoài phạm vi NC-013.
- Vòng này làm NC-014: Thông tư 89/2026/TT-BTC — ai được khai GTGT theo quý; DN được miễn TNDN có phải quyết toán không (điểm còn mở của NC-011, NC-013).

### NC-014 — Khai GTGT theo quý: doanh thu năm trước từ 50 tỷ trở xuống, là quyền lựa chọn; khai quyết toán TNDN năm không có ngoại lệ cho DN được miễn (Thông tư 89/2026)

- Trạng thái: đã xác minh
- Liên quan:
  - `guides/khai-thue-gtgt-theo-quy.json` dòng 12: "doanh thu năm trước dưới 50 tỷ đồng (hoặc mới thành lập) được khai theo quý".
  - `guides/khai-thue-gtgt-theo-thang.json` dòng 7 và 12: "Doanh nghiệp có doanh thu từ 50 tỷ đồng/năm trở lên…", "Doanh thu năm trước từ 50 tỷ đồng trở lên".
  - `bat-dau.json` dòng 195: "Nếu DN mới → mặc định khai theo quý".
  - Các mục miễn TNDN (NC-011) và todo về nghĩa vụ quyết toán.
- Nguồn: Thông tư 89/2026/TT-BTC quy định chi tiết Luật Quản lý thuế và Nghị định 252/2026/NĐ-CP. Trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=218974&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/7/89-btc.signed.pdf (839 trang, phần lớn là mẫu biểu; đã OCR 60 trang đầu, gồm Điều 1–23). Hiệu lực 01/07/2026 (trang thông tin). Mở ngày 2026-11-13.
- Phát hiện:
  - **Điều 19 khoản 1 (kỳ tính thuế GTGT), PDF trang 30–31:**
    - Điểm a: "Khai thuế giá trị gia tăng là loại khai thuế theo tháng, trừ các trường hợp quy định tại điểm b và điểm c khoản này".
    - Điểm b.1.1: "Người nộp thuế thuộc diện khai thuế giá trị gia tăng theo tháng nếu có tổng doanh thu bán hàng hóa và cung cấp dịch vụ của năm trước liền kề từ 50 tỷ đồng trở xuống thì được lựa chọn khai thuế giá trị gia tăng theo quý. Doanh thu… được xác định là tổng doanh thu trên các tờ khai thuế giá trị gia tăng của các kỳ tính thuế trong năm dương lịch."
    - Điểm b.1.2: "Trường hợp người nộp thuế mới bắt đầu hoạt động, kinh doanh thì được lựa chọn khai thuế giá trị gia tăng theo quý." Sau đủ 12 tháng thì căn cứ doanh thu năm dương lịch trước liền kề (đủ 12 tháng) để xác định tháng hay quý. Doanh thu năm đầu trên 50 tỷ thì khai tháng từ năm sau.
    - Điểm b.1.3: "Người nộp thuế có trách nhiệm tự xác định thuộc đối tượng khai thuế theo tháng hay khai thuế theo quý".
    - Điểm b.2.1: được chọn tháng hoặc quý "ổn định trọn năm dương lịch". Điểm b.2.2: đang khai tháng, muốn chuyển sang quý thì gửi "Văn bản đề nghị thay đổi kỳ tính thuế từ tháng sang quý mẫu số 01/ĐK-TĐKTTT Phụ lục I… chậm nhất là ngày 31 tháng 01 của năm bắt đầu khai thuế theo quý."
    - Điểm b.2.3: không đủ điều kiện mà đã khai quý thì chuyển sang khai tháng từ quý sau, nộp lại tờ khai tháng của các quý trước và tiền chậm nộp; không bị phạt chậm nộp hồ sơ cho các tờ khai nộp lại.
  - **Điều 21 khoản 1 điểm c (khai quyết toán TNDN), PDF trang 43–44:** "Người nộp thuế khai quyết toán thuế thu nhập doanh nghiệp trong các trường hợp sau: c.1) Khai quyết toán khi kết thúc năm (năm dương lịch hoặc năm tài chính), bao gồm cả trường hợp người nộp thuế tạm ngừng hoạt động, kinh doanh không trọn năm". Ngoại lệ duy nhất (c.3): đã khai TNDN theo từng lần phát sinh. **Không có** ngoại lệ cho DN được miễn thuế TNDN.
  - **Điều 21 khoản 3 điểm a, PDF trang 45:** người nộp thuế phải quyết toán TNDN "thực hiện tạm nộp thuế thu nhập doanh nghiệp theo quy định tại Điều 24 Nghị định số 252/2026/NĐ-CP"; điểm b: căn cứ báo cáo tài chính quý (nếu có) hoặc kết quả kinh doanh quý để xác định số tạm nộp.
- **Kết luận:**
  1. Ngưỡng khai GTGT quý là "từ 50 tỷ đồng trở xuống" (không phải "dưới 50 tỷ"). Phải khai tháng khi doanh thu năm trước **trên** 50 tỷ (không phải "từ 50 tỷ trở lên"). Doanh thu để xét là tổng doanh thu trên các tờ khai GTGT trong năm dương lịch.
  2. Khai quý là **quyền lựa chọn**, mặc định của luật là khai tháng. DN mới "được lựa chọn" khai quý; câu "mặc định khai theo quý" không đúng chữ. Chọn rồi thì giữ trọn năm. Đang khai tháng muốn chuyển sang quý: gửi mẫu 01/ĐK-TĐKTTT trước 31/01.
  3. DN được miễn TNDN (≤ 1 tỷ, NC-011) vẫn thuộc diện khai quyết toán TNDN năm theo Điều 21 khoản 1 điểm c.1 (không có ngoại lệ), hạn 31/3 năm sau (NC-013). Kết luận này thay cho "cách hiểu" ghi ở NC-011, NC-013.
- **Đề xuất sửa (Biên tập):**
  - `khai-thue-gtgt-theo-quy.json` dòng 12: "Doanh nghiệp có tổng doanh thu bán hàng hóa, dịch vụ năm trước từ 50 tỷ đồng trở xuống (tính trên các tờ khai GTGT trong năm), hoặc mới bắt đầu kinh doanh, được chọn khai theo quý. Chọn rồi thì giữ cả năm. Đang khai tháng, muốn chuyển sang quý: gửi Văn bản đề nghị mẫu 01/ĐK-TĐKTTT cho cơ quan thuế trước ngày 31/01. Doanh thu năm trước trên 50 tỷ: khai tháng." Bỏ todo "Xác nhận ngưỡng 50 tỷ".
  - `khai-thue-gtgt-theo-thang.json` dòng 7, 12: đổi "từ 50 tỷ đồng trở lên" thành "trên 50 tỷ đồng"; thêm "Khai tháng là mặc định; DN đủ điều kiện có thể chọn khai quý". Bỏ todo tương ứng.
  - `bat-dau.json` dòng 195: đổi "Nếu DN mới → mặc định khai theo quý" thành "DN mới được chọn khai theo quý (nên chọn để đỡ việc); chọn rồi giữ cả năm".
  - Các mục miễn TNDN (NC-011): thay câu "cách hiểu" bằng "Được miễn thuế vẫn phải nộp tờ khai quyết toán TNDN năm, hạn 31/3 năm sau (Thông tư 89/2026 Điều 21 khoản 1 điểm c.1)". Bỏ todo nghĩa vụ quyết toán.
  - `legal_basis` cho các mục trên: Thông tư 89/2026/TT-BTC Điều 19 khoản 1 điểm a, b.1, b.2; Điều 21 khoản 1 điểm c, khoản 3; URL https://vanban.chinhphu.vn/?pageid=27160&docid=218974&classid=1; `verified_against_original: true`.

### Ghi chú vòng 16 (2026-11-13, 02:18 UTC)

- Đã rà commit `80673de` của Biên tập (áp dụng NC-014): ngưỡng "từ 50 tỷ trở xuống", khai quý là lựa chọn, DN miễn TNDN vẫn quyết toán. Không thấy sai sót ở phần đã đọc.
- Vòng này làm NC-015: Nghị quyết 198/2025/QH15 và Nghị định 20/2026/NĐ-CP — lệ phí môn bài, miễn TNDN 3 năm cho DN nhỏ và vừa mới thành lập, phần mềm kế toán miễn phí. Đây là các điểm nghi lỗi thời ở mục 2 cũ, vẫn còn trong app.

### NC-015 — Chấm dứt thu lệ phí môn bài từ 01/01/2026; DN nhỏ và vừa mới đăng ký lần đầu được miễn TNDN 3 năm (Nghị quyết 198/2025, Nghị định 20/2026)

- Trạng thái: đã xác minh
- Liên quan:
  - Lệ phí môn bài: `bat-dau.json` dòng 262 ("Nộp lệ phí môn bài năm đầu"), dòng 364 ("Nộp lệ phí môn bài"); `legal-framework.json` dòng 162–181 (mục Nghị định 139/2016, "miễn lệ phí môn bài năm đầu tiên", "Hạn nộp: 30/01 hàng năm"); `tu-0-den-1.json` mục `bo-le-phi-mon-bai` (dòng ~901, đã ghi "chấm dứt thu từ 1/1/2026", chưa có nguồn).
  - Miễn TNDN 3 năm: `tu-0-den-1.json` mục `mien-tndn-dn-moi` (dòng ~876; `legal_basis` rỗng; todo "gợi ý của trợ lý AI").
- Nguồn:
  - Nghị quyết 198/2025/QH15 về một số cơ chế, chính sách đặc biệt phát triển kinh tế tư nhân — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=213695&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/5/198_nq.pdf (11 trang, bản quét, đã OCR). Hiệu lực 17/05/2025.
  - Nghị định 20/2026/NĐ-CP quy định chi tiết Nghị quyết 198/2025 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=216660&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/01/20nd.signed.pdf (23 trang, bản quét, đã OCR). Ban hành, hiệu lực 15/01/2026. Mở ngày 2026-11-13.
- Phát hiện:
  - **Nghị quyết 198/2025, Điều 10 (PDF trang 6–7):**
    - Khoản 4: "Miễn thuế thu nhập doanh nghiệp cho doanh nghiệp nhỏ và vừa trong 03 năm kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp lần đầu."
    - Khoản 7: "Chấm dứt việc thu, nộp lệ phí môn bài từ ngày 01 tháng 01 năm 2026."
    - Điều 17 khoản 1: "Nghị quyết này có hiệu lực thi hành từ ngày được Quốc hội thông qua." Khoản 2: Nghị quyết được áp dụng khi khác với luật khác; văn bản khác ưu đãi hơn thì áp dụng văn bản đó.
  - **Nghị định 20/2026, Điều 7 khoản 3 (PDF trang 9):** "Doanh nghiệp nhỏ và vừa đăng ký kinh doanh lần đầu:"
    - Điểm a: "Được miễn thuế thu nhập doanh nghiệp trong 03 năm kể từ khi được cấp Giấy chứng nhận đăng ký doanh nghiệp lần đầu. Thời gian miễn thuế được tính liên tục từ năm đầu tiên được cấp Giấy chứng nhận đăng ký doanh nghiệp lần đầu. Trường hợp Giấy chứng nhận… được cấp trước thời điểm Nghị quyết số 198/2025/QH15 có hiệu lực thi hành mà còn thời gian áp dụng ưu đãi thì doanh nghiệp được hưởng ưu đãi… cho thời gian còn lại".
    - Điểm b, không áp dụng cho: b1) DN thành lập mới do sáp nhập, hợp nhất, chia, tách, chuyển đổi chủ sở hữu, chuyển đổi loại hình; b2) DN mới mà người đại diện theo pháp luật (trừ khi người này không góp vốn), thành viên hợp danh hoặc người góp vốn cao nhất đã giữ vai trò đó trong DN đang hoạt động, hoặc DN đã giải thể chưa được 12 tháng; b3) thu nhập tại khoản 3 Điều 18 Luật Thuế TNDN 67/2025.
    - Khoản 4: cùng lúc được nhiều ưu đãi thì chọn ưu đãi có lợi nhất, giữ ổn định trong thời gian miễn, giảm. Khoản 5: kỳ tính thuế đầu dưới 12 tháng thì được chọn hưởng ngay từ kỳ đó hoặc đăng ký bắt đầu từ kỳ sau.
  - **Nghị định 20/2026, Điều 16 khoản 2 (PDF trang 16):** khoản 1, khoản 3 Điều 7 "có hiệu lực từ ngày Nghị quyết số 198/2025/QH15 có hiệu lực thi hành và áp dụng kể từ kỳ tính thuế năm 2025."
  - **Nghị định 20/2026, Điều 10 (PDF trang 11–12):** "Nhà nước cung cấp miễn phí cho doanh nghiệp nhỏ, doanh nghiệp siêu nhỏ, hộ kinh doanh và cá nhân kinh doanh nền tảng số tích hợp các giải pháp chuyển đổi số, trong đó có phần mềm kế toán có tính năng tích hợp được với phần mềm hóa đơn điện tử và dịch vụ chữ ký số…". Bộ Tài chính tổ chức thuê, mua sắm. Chưa thấy tên nền tảng hay thời điểm cung cấp.
- **Kết luận:**
  1. Từ 01/01/2026 không còn thu, nộp lệ phí môn bài. Các bước "Nộp lệ phí môn bài" trong app phải bỏ (hoặc đổi thành ghi chú "đã bỏ từ 2026"). Nghị định 139/2016 và 22/2020 không còn là nghĩa vụ hiện hành của người dùng mới.
  2. DN nhỏ và vừa (gồm DN siêu nhỏ) đăng ký lần đầu được miễn TNDN 3 năm, tính liên tục từ năm được cấp Giấy chứng nhận ĐKDN lần đầu, áp dụng từ kỳ tính thuế 2025; có các trường hợp loại trừ ở điểm b. Mục `mien-tndn-dn-moi` đúng về nội dung chính.
  3. Miễn 3 năm (NC-015) và miễn khi doanh thu ≤ 1 tỷ (NC-011) là hai ưu đãi khác nhau. Khoản 4 Điều 7 Nghị định 20/2026 cho chọn ưu đãi có lợi nhất. DN được miễn vẫn quyết toán TNDN năm (NC-014).
  4. Tiêu chí "doanh nghiệp nhỏ và vừa", "siêu nhỏ" theo Nghị định 80/2021 (chưa đọc toàn văn).
- **Đề xuất sửa (Biên tập):**
  - `bat-dau.json` dòng 262, 364: bỏ việc "Nộp lệ phí môn bài", hoặc thay bằng "Không còn lệ phí môn bài (chấm dứt thu từ 01/01/2026)". `legal_basis`: Nghị quyết 198/2025/QH15 Điều 10 khoản 7; URL https://vanban.chinhphu.vn/?pageid=27160&docid=213695&classid=1; `verified_against_original: true`.
  - `legal-framework.json` mục lệ phí môn bài: ghi rõ "chấm dứt thu từ 01/01/2026 theo Nghị quyết 198/2025/QH15 Điều 10 khoản 7"; bỏ các dòng "miễn năm đầu", "hạn nộp 30/01" khỏi nghĩa vụ hiện hành (hoặc chuyển sang ghi chú lịch sử). Bỏ todo "theo báo chí".
  - `tu-0-den-1.json` mục `bo-le-phi-mon-bai`: điền `legal_basis` như trên; bỏ todo "theo báo chí".
  - `tu-0-den-1.json` mục `mien-tndn-dn-moi`: điền `legal_basis`: Nghị quyết 198/2025/QH15 Điều 10 khoản 4; Nghị định 20/2026/NĐ-CP Điều 7 khoản 3, 4, 5, Điều 16 khoản 2; URL https://vanban.chinhphu.vn/?pageid=27160&docid=216660&classid=1; `verified_against_original: true`. Thêm vào `who`/`how`: thời gian miễn tính liên tục từ năm được cấp giấy lần đầu; không áp dụng cho DN thành lập do sáp nhập, hợp nhất, chia, tách, chuyển đổi; không áp dụng nếu người đại diện theo pháp luật (có góp vốn) hoặc người góp vốn cao nhất đang giữ vai trò đó ở DN khác đang hoạt động hoặc DN giải thể chưa đủ 12 tháng; kỳ đầu dưới 12 tháng được chọn hưởng ngay hoặc từ kỳ sau; trùng ưu đãi thì chọn mức có lợi nhất. Giữ câu khuyên hỏi cơ quan thuế (khoản lớn, rủi ro truy thu). Thay todo "DN được miễn có còn quyết toán không" bằng kết luận NC-014.
  - Có thể thêm một dòng ở `/cong-cu` hoặc mục sổ kế toán: "Nhà nước sẽ cung cấp miễn phí phần mềm kế toán cho DN siêu nhỏ (Nghị định 20/2026 Điều 10); chưa có tên nền tảng". Không dẫn link khi chưa có nguồn chính thức.

### Ghi chú vòng 17 (2026-11-13, 04:17 UTC)

- Đã rà commit `0ae71b3` của Biên tập (áp dụng NC-015): sửa các mục lệ phí môn bài và miễn TNDN 3 năm ở `bat-dau.json`, `legal-framework.json`, `tu-0-den-1.json`, `so-ke-toan.json`. Chưa đọc từng dòng; không thấy dấu hiệu sai trong phần thống kê.
- Vòng này làm NC-016: tiêu chí DN siêu nhỏ (Nghị định 80/2021). Đây là căn cứ để người dùng biết mình có thuộc diện áp dụng TT 132/2018, các ưu đãi DN nhỏ và vừa, và ngoại lệ "được làm kế toán" ở NC-001 hay không.

### NC-016 — Tiêu chí DN siêu nhỏ: lao động đóng BHXH bình quân năm ≤ 10 người và doanh thu năm ≤ 3 tỷ (nông, lâm, thủy sản; công nghiệp, xây dựng) hoặc ≤ 10 tỷ (thương mại, dịch vụ), hoặc tổng nguồn vốn ≤ 3 tỷ (Nghị định 80/2021)

- Trạng thái: đã xác minh
- Liên quan:
  - `legal-framework.json` mục TT 132/2018, `key_points`: "Áp dụng cho DNSN: doanh thu ≤ 10 tỷ/năm, ≤ 10 lao động (thương mại/dịch vụ)"; todo "Xác nhận tiêu chí DNSN…".
  - `questions.json` câu `revenue_band` (các mức "Dưới 1 tỷ", "Từ 1 đến 3 tỷ", "Từ 3 đến 10 tỷ", "Trên 10 tỷ") và câu `insured_headcount`.
  - Mọi chỗ dùng chữ "DN siêu nhỏ" làm điều kiện (NC-001 ngoại lệ làm kế toán; NC-009 TT 132/2018; NC-015 ưu đãi DN nhỏ và vừa).
- Nguồn: Nghị định 80/2021/NĐ-CP quy định chi tiết và hướng dẫn thi hành một số điều của Luật Hỗ trợ DN nhỏ và vừa. Trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=203941&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/08/80.signed_01.pdf (29 trang, bản quét; đã OCR 6 trang đầu, Điều 1–10). Hiệu lực 15/10/2021. Mở ngày 2026-11-13.
- Phát hiện:
  - **Điều 5 khoản 1 (PDF trang 4):** "Doanh nghiệp siêu nhỏ trong lĩnh vực nông nghiệp, lâm nghiệp, thủy sản; lĩnh vực công nghiệp và xây dựng sử dụng lao động có tham gia bảo hiểm xã hội bình quân năm không quá 10 người và tổng doanh thu của năm không quá 3 tỷ đồng hoặc tổng nguồn vốn của năm không quá 3 tỷ đồng. Doanh nghiệp siêu nhỏ trong lĩnh vực thương mại và dịch vụ sử dụng lao động có tham gia bảo hiểm xã hội bình quân năm không quá 10 người và tổng doanh thu của năm không quá 10 tỷ đồng hoặc tổng nguồn vốn của năm không quá 3 tỷ đồng."
  - Khoản 2, 3: DN nhỏ (NLTS, CN-XD: ≤ 100 lao động và doanh thu ≤ 50 tỷ hoặc nguồn vốn ≤ 20 tỷ; TM-DV: ≤ 50 lao động và doanh thu ≤ 100 tỷ hoặc nguồn vốn ≤ 50 tỷ). DN vừa (NLTS, CN-XD: ≤ 200 lao động và doanh thu ≤ 200 tỷ hoặc nguồn vốn ≤ 100 tỷ; TM-DV: ≤ 100 lao động và doanh thu ≤ 300 tỷ hoặc nguồn vốn ≤ 100 tỷ).
  - **Điều 6:** lĩnh vực xác định "căn cứ vào ngành, nghề kinh doanh chính mà doanh nghiệp đã đăng ký với cơ quan đăng ký kinh doanh".
  - **Điều 7 khoản 2, 3:** lao động bình quân năm = tổng số lao động tham gia BHXH của các tháng năm trước liền kề ÷ 12 (số tháng xác định cuối tháng, theo chứng từ nộp BHXH); DN hoạt động dưới 1 năm thì chia cho số tháng hoạt động.
  - **Điều 8:** tổng nguồn vốn lấy trên bảng cân đối kế toán của Báo cáo tài chính năm trước nộp cơ quan thuế, tại thời điểm cuối năm; DN dưới 1 năm: cuối quý liền kề trước thời điểm đăng ký hỗ trợ.
  - **Điều 9:** tổng doanh thu = doanh thu bán hàng hóa, cung cấp dịch vụ trên Báo cáo tài chính năm trước; DN dưới 1 năm hoặc chưa có doanh thu thì dùng tiêu chí tổng nguồn vốn.
  - **Điều 10 khoản 1:** DN tự xác định, kê khai quy mô theo mẫu Phụ lục, nộp cho cơ quan, tổ chức hỗ trợ; chịu trách nhiệm về kê khai. Khoản 3: kê khai không trung thực để hưởng hỗ trợ thì hoàn trả toàn bộ.
- **Kết luận:**
  1. DN siêu nhỏ cần **cả hai** điều kiện: (a) lao động đóng BHXH bình quân năm ≤ 10 người; và (b) doanh thu năm ≤ 3 tỷ (NLTS, CN-XD) hoặc ≤ 10 tỷ (TM-DV), **hoặc** tổng nguồn vốn ≤ 3 tỷ. Lĩnh vực theo ngành nghề kinh doanh chính đã đăng ký.
  2. `key_points` ở `legal-framework.json` thiếu: chỉ nêu TM-DV, bỏ nhánh "hoặc tổng nguồn vốn ≤ 3 tỷ" và nhánh NLTS, CN-XD ≤ 3 tỷ; "lao động" phải là lao động có tham gia BHXH bình quân năm.
  3. DN mới (dưới 1 năm, chưa có doanh thu): xét theo tổng nguồn vốn ≤ 3 tỷ và lao động BHXH bình quân các tháng hoạt động.
  4. Lưu ý ngưỡng doanh thu khác nhau giữa các văn bản: tiêu chí DN siêu nhỏ dùng doanh thu bán hàng, dịch vụ trên BCTC (Điều 9); miễn TNDN ≤ 1 tỷ và thuế suất 15/17% dùng doanh thu gồm cả tài chính và thu nhập khác (NC-011, NC-012); khai GTGT quý dùng doanh thu trên tờ khai GTGT (NC-014).
  5. Chưa kiểm tra Nghị định 80/2021 có văn bản sửa đổi tiêu chí sau 2021 hay không (trên vanban.chinhphu.vn chỉ thấy Thông tư hướng dẫn 205807; chưa thấy nghị định sửa đổi).
- **Đề xuất sửa (Biên tập):**
  - `legal-framework.json` mục TT 132/2018, thay key point bằng: "Áp dụng cho DN siêu nhỏ: lao động đóng BHXH bình quân năm không quá 10 người, và doanh thu năm không quá 10 tỷ (thương mại, dịch vụ) hoặc 3 tỷ (nông, lâm, thủy sản; công nghiệp, xây dựng), hoặc tổng nguồn vốn không quá 3 tỷ." `legal_basis`: Nghị định 80/2021/NĐ-CP Điều 5 khoản 1, Điều 6, 7, 8, 9; URL https://vanban.chinhphu.vn/?pageid=27160&docid=203941&classid=1; `verified_against_original: true`. Bỏ todo "Xác nhận tiêu chí DNSN".
  - Thêm một mục tự kiểm "Công ty mình có phải DN siêu nhỏ không?" (ví dụ trong `tu-0-den-1.json` bước đầu, hoặc `/lo-trinh`): 3 câu hỏi — ngành nghề chính (TM-DV hay NLTS/CN-XD); số lao động đóng BHXH bình quân năm; doanh thu năm trước trên BCTC hoặc tổng nguồn vốn cuối năm. DN mới chưa có doanh thu: dùng tổng nguồn vốn.
  - `questions.json` `revenue_band`: cân nhắc đổi mốc cho khớp các ngưỡng pháp lý: "Từ 1 tỷ trở xuống" (miễn TNDN), "Trên 1 đến 3 tỷ" (15%; ngưỡng siêu nhỏ NLTS/CN-XD), "Trên 3 đến 10 tỷ" (ngưỡng siêu nhỏ TM-DV), "Trên 10 tỷ". Mốc hiện tại "Dưới 1 tỷ"/"Từ 1 đến 3 tỷ" làm DN đúng 1 tỷ rơi sai nhóm. Đây là đổi giá trị lựa chọn, có thể ảnh hưởng luật trong `rules/` — nếu cần đổi cấu trúc thì ghi "Cần chủ dự án quyết".

### Ghi chú vòng 18 (2026-11-13, 06:17 UTC)

- Đã đọc kỹ commit `0ae71b3` (NC-015): bước môn bài đổi thành "Không còn nộp lệ phí môn bài (đã bỏ từ 01/01/2026)"; mục miễn TNDN 3 năm ghi đúng "tính liên tục từ năm được cấp giấy", có `legal_basis` Nghị quyết 198/2025 và Nghị định 20/2026. Khớp NC-015.
- Commit `3ce013f` (NC-016) mới đến; vòng sau rà.
- Vòng này làm NC-017: thời hạn đăng ký, thông báo thay đổi ("10 ngày" hay "10 ngày làm việc", ưu tiên mục 3 cũ).

### NC-017 — Đăng ký, thông báo thay đổi nội dung đăng ký doanh nghiệp: 10 ngày (ngày lịch) kể từ ngày có thay đổi (Luật Doanh nghiệp 59/2020 Điều 30, 31)

- Trạng thái: đã xác minh
- Liên quan: `bat-dau.json` dòng 26, 622 ("trong 10 ngày") và todo dòng 35, 626; `guides/dang-ky-thay-doi-doanh-nghiep.json` dòng 7 ("thường là 10 ngày kể từ ngày có quyết định thay đổi"), dòng 16 ("Hầu hết các loại thay đổi: trong vòng 10 ngày làm việc…"), todo dòng 44; `legal-framework.json` mục Luật Doanh nghiệp ("10 ngày làm việc").
- Nguồn:
  - Luật Doanh nghiệp 59/2020/QH14 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=200447&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2020/07/59.signed.pdf (70 trang, bản quét; đã OCR trang 12–20). Hiệu lực 01/01/2021.
  - Luật 76/2025/QH15 sửa đổi, bổ sung một số điều của Luật Doanh nghiệp — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=214562&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/76qh.signed.pdf (7 trang, bản quét, đã OCR toàn bộ). Mở ngày 2026-11-13.
- Phát hiện:
  - **Luật 59/2020, Điều 30 (PDF trang 19):**
    - Khoản 1: "Doanh nghiệp phải đăng ký với Cơ quan đăng ký kinh doanh khi thay đổi nội dung Giấy chứng nhận đăng ký doanh nghiệp quy định tại Điều 28 của Luật này."
    - Khoản 2: "Doanh nghiệp chịu trách nhiệm đăng ký thay đổi nội dung Giấy chứng nhận đăng ký doanh nghiệp trong thời hạn 10 ngày kể từ ngày có thay đổi."
    - Khoản 3: "Trong thời hạn 03 ngày làm việc kể từ ngày nhận hồ sơ, Cơ quan đăng ký kinh doanh có trách nhiệm xem xét tính hợp lệ của hồ sơ và cấp Giấy chứng nhận đăng ký doanh nghiệp mới…"
    - Khoản 4 điểm a: thay đổi theo bản án, quyết định của Tòa án hoặc phán quyết Trọng tài: gửi đề nghị trong 15 ngày kể từ ngày bản án, quyết định có hiệu lực.
  - **Luật 59/2020, Điều 31 (PDF trang 19–20):**
    - Khoản 1 (bản gốc): phải thông báo khi thay đổi ngành, nghề kinh doanh; cổ đông sáng lập và cổ đông là nhà đầu tư nước ngoài (công ty cổ phần); nội dung khác trong hồ sơ đăng ký.
    - Khoản 2: "Doanh nghiệp chịu trách nhiệm thông báo thay đổi nội dung đăng ký doanh nghiệp trong thời hạn 10 ngày kể từ ngày có thay đổi."
  - **Luật 76/2025, Điều 1 khoản 13 (PDF trang 3–4):** sửa khoản 1 Điều 31, bổ sung điểm c: phải thông báo khi thay đổi "Thông tin về chủ sở hữu hưởng lợi của doanh nghiệp, trừ trường hợp đối với công ty niêm yết và công ty đăng ký giao dịch chứng khoán". Luật 76/2025 **không sửa** Điều 30 và khoản 2 Điều 31. Hiệu lực: "Luật này có hiệu lực thi hành từ ngày 01 tháng 7 năm 2025."
- **Kết luận:**
  1. Thời hạn của doanh nghiệp là **"10 ngày kể từ ngày có thay đổi"**, không có chữ "làm việc". Các chỗ ghi "10 ngày làm việc" là sai. "03 ngày làm việc" là thời hạn của cơ quan đăng ký kinh doanh xử lý hồ sơ.
  2. Mốc tính là "ngày có thay đổi", không phải "ngày có quyết định thay đổi" như guide đang viết. (Thường trùng nhau, nhưng câu chữ nên theo luật.)
  3. Từ 01/07/2025, thay đổi thông tin chủ sở hữu hưởng lợi cũng phải thông báo trong 10 ngày.
  4. Hồ sơ, trình tự chi tiết theo Nghị định 168/2025/NĐ-CP (sửa bởi 296/2026); chưa đọc toàn văn.
- **Đề xuất sửa (Biên tập):**
  - `dang-ky-thay-doi-doanh-nghiep.json` dòng 16: "Thay đổi nội dung Giấy chứng nhận đăng ký doanh nghiệp, hoặc nội dung đăng ký khác (ngành nghề, thông tin chủ sở hữu hưởng lợi…): đăng ký hoặc thông báo trong 10 ngày kể từ ngày có thay đổi. Cơ quan đăng ký kinh doanh xử lý trong 3 ngày làm việc." Dòng 7: bỏ "thường là", đổi "ngày có quyết định thay đổi" thành "ngày có thay đổi". Bỏ todo "10 ngày hay 10 ngày làm việc".
  - `legal-framework.json` mục Luật Doanh nghiệp: đổi "10 ngày làm việc" thành "10 ngày". `bat-dau.json` dòng 26, 622: giữ "10 ngày", thêm "kể từ ngày có thay đổi"; bỏ todo mâu thuẫn dòng 35, 626.
  - `legal_basis` cho các mục trên: Luật Doanh nghiệp 59/2020/QH14 Điều 30 khoản 1, 2, 3; Điều 31 khoản 1, 2 (khoản 1 đã sửa bởi Luật 76/2025/QH15 Điều 1 khoản 13); URL như trên; `verified_against_original: true`.

### Ghi chú vòng 19 (2026-11-13, 08:17 UTC)

- Đã rà commit `3ce013f` (NC-016): mốc doanh thu trong `questions.json` đổi thành "Từ 1 tỷ đồng trở xuống / Trên 1 tỷ đến 3 tỷ / Trên 3 tỷ đến 10 tỷ" (giữ nguyên `value`, không đổi cấu trúc); tiêu chí DN siêu nhỏ ở `so-sach-ke-toan.json` có đủ hai điều kiện và nhánh nguồn vốn. Đúng đề xuất. Commit `3d4806d` (NC-017) mới đến; vòng sau rà.
- Vòng này làm NC-018: mức phạt chậm nộp hồ sơ khai thuế (điểm nghi lỗi thời ở mục 2 cũ; app đang ghi "2–5 triệu đồng/lần chậm"). Trả lời luôn câu hỏi của Biên tập về ngày hiệu lực Nghị định 310/2025.

### NC-018 — Phạt chậm nộp hồ sơ khai thuế theo số ngày chậm: cảnh cáo đến 25 triệu đồng; mức phạt là mức cho tổ chức (Nghị định 125/2020 Điều 13, sửa bởi Nghị định 310/2025)

- Trạng thái: đã xác minh
- Liên quan: `bat-dau.json` dòng 588 ("Phạt 2–5 triệu đồng/lần chậm") và todo dòng 552, 592; `guides/khai-thue-gtgt-theo-thang.json`, `guides/khai-thue-gtgt-theo-quy.json` (mức "2.000.000 – 5.000.000 đồng", todo dòng 42, 43); `legal-framework.json` mục Nghị định 125/2020; câu hỏi của Biên tập về ngày hiệu lực Nghị định 310/2025.
- Nguồn:
  - Nghị định 125/2020/NĐ-CP quy định xử phạt vi phạm hành chính về thuế, hóa đơn — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=201364&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2020/10/125.signed.pdf (87 trang, bản quét; đã OCR trang 4–18). Hiệu lực 05/12/2020.
  - Nghị định 310/2025/NĐ-CP sửa đổi, bổ sung Nghị định 125/2020 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=216102&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/12/310-cp.signed.pdf (16 trang, bản quét, đã OCR toàn bộ). Mở ngày 2026-11-13.
  - Chưa đọc các nghị định sửa đổi khác: 102/2021/NĐ-CP và 291/2026/NĐ-CP (ban hành 21/07/2026). Có thể đã sửa tiếp Điều 13.
- Phát hiện:
  - **Nghị định 125/2020, Điều 13 (PDF trang 15):** "Xử phạt hành vi vi phạm về thời hạn nộp hồ sơ khai thuế"
    - Khoản 1: "Phạt cảnh cáo đối với hành vi nộp hồ sơ khai thuế quá thời hạn từ 01 ngày đến 05 ngày và có tình tiết giảm nhẹ."
    - Khoản 2: phạt 2.000.000–5.000.000 đồng: quá hạn từ 01 đến 30 ngày (trừ khoản 1).
    - Khoản 3: 5.000.000–8.000.000 đồng: quá hạn từ 31 đến 60 ngày.
    - Khoản 4: 8.000.000–15.000.000 đồng: a) quá hạn 61–90 ngày; b) quá hạn từ 91 ngày trở lên nhưng không phát sinh số thuế phải nộp; c) không nộp hồ sơ khai thuế nhưng không phát sinh số thuế phải nộp; d) không nộp phụ lục giao dịch liên kết.
    - Khoản 6 điểm b: buộc nộp hồ sơ khai thuế đối với hành vi ở điểm c, d khoản 4.
  - **Nghị định 310/2025, Điều 1 khoản 10 (PDF trang 7–8)** sửa khoản 5 Điều 13: "Phạt tiền từ 15.000.000 đồng đến 25.000.000 đồng đối với hành vi nộp hồ sơ khai thuế quá thời hạn trên 90 ngày kể từ ngày hết hạn nộp hồ sơ khai thuế, có phát sinh số thuế phải nộp và người nộp thuế đã nộp đủ số tiền thuế, tiền chậm nộp vào ngân sách nhà nước trước thời điểm cơ quan thuế công bố quyết định kiểm tra thuế, cơ quan có thẩm quyền khác công bố quyết định thanh tra, kiểm tra hoặc trước thời điểm cơ quan thuế lập biên bản về hành vi chậm nộp hồ sơ khai thuế." Nếu số phạt lớn hơn số thuế phát sinh thì phạt tối đa bằng số thuế, nhưng không thấp hơn mức trung bình khung khoản 4. Sửa điểm a khoản 6: buộc nộp đủ tiền chậm nộp tiền thuế với hành vi ở khoản 1–4 khi chậm khai dẫn đến chậm nộp thuế.
  - **Nghị định 310/2025, Điều 4 khoản 1 (PDF trang 15):** "Nghị định này có hiệu lực thi hành từ ngày 16 tháng 01 năm 2026." → Trang thông tin vanban.chinhphu.vn ghi "16-01-2025" là **gõ nhầm năm**; đúng là 16/01/2026 (trả lời câu hỏi của Biên tập).
  - **Nghị định 125/2020, Điều 7 khoản 4 điểm a (PDF trang 7):** "Mức phạt tiền quy định tại Điều 10, 11, 12, 13, 14, 15, khoản 1, 2 Điều 19 và Chương III Nghị định này là mức phạt tiền áp dụng đối với tổ chức." Điều 5 khoản 5: với cùng một hành vi, mức phạt tổ chức bằng 02 lần cá nhân (trừ Điều 16, 17, 18).
- **Kết luận:**
  1. "2–5 triệu đồng/lần chậm" chỉ đúng với quá hạn 1–30 ngày. Phạt tăng theo số ngày chậm: 31–60 ngày 5–8 triệu; 61–90 ngày 8–15 triệu; trên 90 ngày (có số thuế phải nộp, đã tự nộp đủ thuế và tiền chậm nộp trước khi bị kiểm tra, lập biên bản) 15–25 triệu. Quá hạn 1–5 ngày có tình tiết giảm nhẹ: cảnh cáo.
  2. Tờ khai không phát sinh số thuế (ví dụ doanh thu bằng 0) mà nộp muộn trên 90 ngày hoặc không nộp: 8–15 triệu, và vẫn buộc nộp tờ khai.
  3. Các mức trên là mức cho tổ chức (công ty). Ngoài tiền phạt, nếu khai chậm dẫn đến nộp thuế chậm thì còn phải nộp tiền chậm nộp.
  4. Chưa kiểm tra Nghị định 291/2026 (mới nhất) có sửa Điều 13 không. Ghi todo; không viết "mức phạt hiện hành" cho tới khi đọc xong 291/2026.
- **Đề xuất sửa (Biên tập):**
  - `bat-dau.json` dòng 588: thay "Phạt 2–5 triệu đồng/lần chậm" bằng "Nộp muộn bị phạt theo số ngày chậm: 1–30 ngày phạt 2–5 triệu đồng; 31–60 ngày 5–8 triệu; 61–90 ngày 8–15 triệu; trên 90 ngày có thể đến 25 triệu. Tờ khai không có số thuế cũng bị phạt nếu nộp muộn hoặc không nộp." Giữ todo "chưa đọc Nghị định 291/2026".
  - Hai guide khai GTGT: sửa mục mức phạt tương tự; thêm "Chậm nộp tờ khai làm chậm nộp thuế thì còn phải nộp tiền chậm nộp."
  - `legal_basis`: Nghị định 125/2020/NĐ-CP Điều 13 khoản 1, 2, 3, 4, 6; Điều 7 khoản 4 điểm a; Nghị định 310/2025/NĐ-CP Điều 1 khoản 10 (khoản 5, điểm a khoản 6 Điều 13), Điều 4 khoản 1; URL như trên; `verified_against_original: true`.
  - `legal-framework.json`: nếu có trường ngày hiệu lực của Nghị định 310/2025 (hoặc ghi chú), dùng 16/01/2026, không dùng "16-01-2025" của trang thông tin.

### Ghi chú vòng 20 (2026-11-13, 10:25 UTC)

- Đã rà commit `3d4806d` (NC-017): "10 ngày làm việc" chỉ còn trong nhật ký và todo đã xử lý; nội dung hiển thị đã đổi thành "10 ngày kể từ ngày có thay đổi". Đúng đề xuất.
- Đã rà commit `e834e28` (NC-018): bảng phạt theo số ngày chậm (1–30, 31–60, 61–90, trên 90) ở `bat-dau.json` và hai guide GTGT khớp NC-018. Đúng đề xuất.
- Vòng này đóng điểm còn mở của NC-018: đọc Nghị định 291/2026 và 102/2021 (hai văn bản sửa Nghị định 125/2020 còn lại).

### NC-018 (bổ sung) — Nghị định 102/2021 và 291/2026 không sửa Điều 13 Nghị định 125/2020

- Trạng thái: đã xác minh
- Nguồn:
  - Nghị định 291/2026/NĐ-CP — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=218956&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/7/291_2026_nd-cp_21072026-signed.signed.pdf (3 trang, bản quét, đã OCR). Mở ngày 2026-11-13.
  - Nghị định 102/2021/NĐ-CP — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=204477&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/11/102.signed.pdf (26 trang, bản quét, đã OCR). Mở ngày 2026-11-13.
- Phát hiện:
  - Nghị định 291/2026 chỉ có 4 điều: Điều 1 sửa điểm đ khoản 3 Điều 5; Điều 2 bổ sung Mục 3 và Điều 19a (phạt vi phạm cung cấp thông tin phục vụ trao đổi thông tin thuế quốc tế, 10–100 triệu đồng); Điều 3 bổ sung cụm từ "Điều 19a" vào một số điều; Điều 4: "Nghị định này có hiệu lực thi hành kể từ ngày ký ban hành" (ký 21/07/2026). Không đụng Điều 13.
  - Nghị định 102/2021, Điều 1 sửa Nghị định 125/2020 ở: điểm a khoản 1 Điều 8; khoản 2 Điều 22; điểm h khoản 4 Điều 24; khoản 3, 4 Điều 26; điểm b khoản 2 Điều 42; Điều 43. Điều 6 khoản 1: bổ sung cụm từ ở khoản 3 Điều 5, bãi bỏ khoản 3 Điều 8. Không đụng Điều 13.
- **Kết luận:** Điều 13 Nghị định 125/2020 hiện hành gồm khoản 1–4 và khoản 6 điểm b bản gốc; khoản 5 và khoản 6 điểm a theo Nghị định 310/2025 (hiệu lực 16/01/2026). Bảng phạt trong NC-018 là mức hiện hành theo các văn bản đã đọc.
- **Đề xuất sửa (Biên tập):** bỏ todo "chưa đọc Nghị định 291/2026" ở các chỗ ghi mức phạt chậm nộp tờ khai; thêm vào `legal_basis` ghi chú: đã đối chiếu Nghị định 102/2021/NĐ-CP và 291/2026/NĐ-CP, hai văn bản này không sửa Điều 13 (ngày tra 2026-11-13).

### Ghi chú vòng 21 (2026-11-13, 12:19 UTC)

- Đã rà commit `16a2c0e` (bổ sung NC-018): chỉ ghi nhận đã đối chiếu 102/2021, 291/2026 và bỏ todo tương ứng. Đúng đề xuất.
- Vòng này làm NC-019: báo cáo tài chính năm của DN siêu nhỏ (gồm gì, nộp cho ai, hạn nào, ai được miễn nộp) và thời hạn lưu trữ chứng từ. Các câu "Nộp báo cáo tài chính trước 31/3 mỗi năm", "Lưu hóa đơn, chứng từ ít nhất 10 năm" trong `bat-dau.json` đang chưa có nguồn.

### NC-019 — Báo cáo tài chính DN siêu nhỏ: hạn 90 ngày sau năm tài chính, gửi cơ quan thuế và cơ quan đăng ký kinh doanh; DN nộp TNDN theo % doanh thu không bắt buộc lập để nộp (TT 132/2018 Điều 13, 14, 18); lưu trữ 5 hoặc 10 năm (Nghị định 174/2016 Điều 12, 13, 15)

- Trạng thái: đã xác minh
- Liên quan:
  - `bat-dau.json` dòng 155 ("Nộp báo cáo tài chính trước 31/3 mỗi năm"), dòng 154 ("Lưu hóa đơn, chứng từ ít nhất 10 năm"), todo dòng 160–161; lịch tháng 3 dòng 533 ("Nộp báo cáo tài chính năm trước", hạn "31/3"), todo dòng 537.
  - `legal-framework.json` dòng 198 ("Lập và nộp báo cáo tài chính hàng năm: hạn 31/03 năm tiếp theo"); dòng 216 ("Báo cáo tài chính gồm: Bảng CĐKT + Báo cáo KQKD + Thuyết minh đơn giản").
  - `guides/so-sach-ke-toan.json` dòng 32 ("Hạn nộp: 31/3 năm tiếp theo…").
- Nguồn:
  - Thông tư 132/2018/TT-BTC — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=196286&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2019/02/132-btc.signed.pdf (bản quét, đã OCR). Mở lại ngày 2026-11-13.
  - Nghị định 174/2016/NĐ-CP — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=187897&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2017/01/174.signed.pdf (bản quét, đã OCR). Mở lại ngày 2026-11-13.
- Phát hiện:
  - **TT 132/2018, Điều 13 khoản 1 (PDF trang 6):** DN siêu nhỏ nộp TNDN theo thu nhập tính thuế lập hằng năm: Báo cáo tình hình tài chính (Mẫu B01-DNSN); Báo cáo kết quả hoạt động kinh doanh (Mẫu B02-DNSN); phụ biểu: Bảng cân đối tài khoản (Mẫu F01-DNSN), Báo cáo tình hình thực hiện nghĩa vụ với NSNN (Mẫu F02-DNSN). Khoản 2: mẫu và cách lập ở Phụ lục 5. Khoản 3: được chọn thêm báo cáo theo TT 133/2016.
  - **TT 132/2018, Điều 14 khoản 2 (PDF trang 7):** "Báo cáo tài chính và các phụ biểu báo cáo tài chính của doanh nghiệp siêu nhỏ phải được gửi cho cơ quan thuế quản lý trực tiếp doanh nghiệp và cơ quan đăng ký kinh doanh chậm nhất là 90 ngày kể từ ngày kết thúc năm tài chính đồng thời phải được bảo quản, lưu trữ tại doanh nghiệp…"
  - **TT 132/2018, Điều 18 (PDF trang 9–10):** khoản 1: DN siêu nhỏ nộp TNDN theo tỷ lệ % trên doanh thu "không bắt buộc phải lập báo cáo tài chính để nộp cho cơ quan thuế"; khoản 2: thực hiện các báo cáo theo pháp luật thuế; khoản 4: nếu chọn áp dụng Chương II thì vẫn lập BCTC nhưng "không phải nộp cho cơ quan thuế", lưu tại DN.
  - **Nghị định 174/2016, Điều 12 (PDF trang 9–10):** lưu tối thiểu 5 năm: chứng từ kế toán **không** dùng trực tiếp để ghi sổ và lập BCTC (phiếu thu, phiếu chi, phiếu nhập kho, xuất kho không lưu trong tập tài liệu kế toán); tài liệu dùng cho quản lý, điều hành không trực tiếp ghi sổ.
  - **Nghị định 174/2016, Điều 13 (PDF trang 10):** lưu tối thiểu 10 năm: chứng từ kế toán dùng trực tiếp để ghi sổ và lập BCTC, bảng kê, bảng tổng hợp chi tiết, sổ kế toán chi tiết và tổng hợp, BCTC tháng, quý, năm, báo cáo quyết toán, biên bản tiêu hủy tài liệu…; tài liệu thanh lý, nhượng bán tài sản cố định; tài liệu thành lập, chia, tách, hợp nhất, sáp nhập, chuyển đổi, giải thể, phá sản.
  - **Nghị định 174/2016, Điều 15 khoản 1:** thời hạn lưu trữ (Điều 12, khoản 1, 2, 7 Điều 13, Điều 14) tính từ ngày kết thúc kỳ kế toán năm.
- **Kết luận:**
  1. Hạn nộp BCTC là "chậm nhất 90 ngày kể từ ngày kết thúc năm tài chính", gửi **cả** cơ quan thuế quản lý trực tiếp **và** cơ quan đăng ký kinh doanh. Năm tài chính 01/01–31/12 thì 90 ngày rơi vào 31/3 (năm thường) hoặc 30/3 (năm nhuận, vì tháng 2 có 29 ngày). Ghi "31/3" sai một ngày vào năm nhuận; nên ghi "90 ngày" kèm ngày cụ thể.
  2. BCTC của DN siêu nhỏ (Chương II) là B01-DNSN và B02-DNSN, kèm phụ biểu F01-DNSN và F02-DNSN. Câu "Bảng CĐKT + Báo cáo KQKD + Thuyết minh đơn giản" không khớp tên và danh mục trong TT 132/2018 (không có Thuyết minh trong danh mục bắt buộc).
  3. DN nộp TNDN theo % doanh thu (chế độ 4 sổ, NC-009/NC-010) **không bắt buộc lập BCTC để nộp cho cơ quan thuế**. Câu "Nộp báo cáo tài chính trước 31/3 mỗi năm" áp cho mọi DN là chưa đúng.
  4. "Lưu ít nhất 10 năm" đúng với chứng từ dùng ghi sổ, sổ kế toán, BCTC; một số chứng từ không dùng trực tiếp để ghi sổ chỉ cần 5 năm. Thời hạn tính từ ngày kết thúc kỳ kế toán năm.
  5. Hạn quyết toán TNDN (31/3 với năm dương lịch, NC-013) là "ngày cuối cùng của tháng thứ 3" nên luôn là 31/3, khác hạn BCTC trong năm nhuận.
- **Đề xuất sửa (Biên tập):**
  - `bat-dau.json` dòng 155: "Nộp báo cáo tài chính năm chậm nhất 90 ngày sau khi kết thúc năm tài chính (năm dương lịch: 31/3; năm nhuận: 30/3), gửi cơ quan thuế và cơ quan đăng ký kinh doanh. DN nộp thuế TNDN theo tỷ lệ % trên doanh thu không bắt buộc nộp." Dòng 154: "Lưu chứng từ dùng để ghi sổ, sổ kế toán và báo cáo tài chính ít nhất 10 năm, tính từ ngày kết thúc năm kế toán." Lịch tháng 3 dòng 533: hạn BCTC ghi "31/3 (năm nhuận 30/3)" và ghi chú "không áp dụng cho DN nộp TNDN theo % doanh thu".
  - `legal-framework.json` dòng 198: đổi như trên. Dòng 216: "Báo cáo tài chính gồm: Báo cáo tình hình tài chính (B01-DNSN), Báo cáo kết quả hoạt động kinh doanh (B02-DNSN); phụ biểu: Bảng cân đối tài khoản (F01-DNSN), Báo cáo tình hình thực hiện nghĩa vụ với NSNN (F02-DNSN)."
  - `so-sach-ke-toan.json` dòng 32: cùng nội dung hạn, nơi nộp, trường hợp không bắt buộc.
  - `legal_basis`: TT 132/2018/TT-BTC Điều 13 khoản 1, Điều 14 khoản 2, Điều 18 khoản 1, 4; Nghị định 174/2016/NĐ-CP Điều 12, Điều 13 khoản 1, 2, 4, Điều 15 khoản 1; URL như trên; `verified_against_original: true`. Bỏ các todo "xác minh hạn nộp BCTC", "xác minh thời hạn lưu trữ".
  - Không viết cách nộp BCTC qua mạng cho tới khi có hướng dẫn chính thức (thuộc phần thao tác).

### Ghi chú vòng 22 (2026-11-13, 15:44 UTC)

- Lịch 14:17 chạy trễ (15:44). Gộp một vòng.
- Đã rà commit `8af82ac` (NC-019): hạn BCTC "90 ngày (năm nhuận 30/3)", gửi cả cơ quan thuế và cơ quan đăng ký kinh doanh, DN nộp TNDN theo % doanh thu không bắt buộc. Đúng đề xuất.
- Vòng này làm NC-020: hóa đơn điện tử theo Nghị định 254/2026 (thay Nghị định 123/2020 từ 01/07/2026). App vẫn dẫn Nghị định 123/2020 và câu "bắt buộc với mọi DN từ 01/07/2022".

### NC-020 — Hóa đơn điện tử: Nghị định 254/2026 thay Nghị định 123/2020 từ 01/07/2026; đối tượng dùng hóa đơn có mã, không mã, máy tính tiền; thời điểm lập hóa đơn; miễn phí 12 tháng chỉ cho DN nhỏ và vừa ở địa bàn khó khăn

- Trạng thái: đã xác minh
- Liên quan:
  - `guides/hoa-don-dien-tu.json`: `summary` ("Từ ngày 01/7/2022, toàn bộ doanh nghiệp bắt buộc…"); mục "Hóa đơn điện tử là gì?" ("…theo Nghị định 123/2020/NĐ-CP"); mục "Hai loại hóa đơn điện tử" (có mã "áp dụng cho DN mới thành lập…", "miễn phí cổng kết nối thuế"); mục "Căn cứ pháp lý" (Nghị định 123/2020, Thông tư 78/2021); các chỗ ghi "Tổng cục Thuế".
  - `bat-dau.json` dòng 274 ("Bắt buộc với mọi DN từ 01/07/2022") và todo dòng 294.
  - `guides/chu-ky-so.json` (dẫn Nghị định 123/2020); `rules/risk_rules.json` (ví dụ Nghị định 123/2020 Điều 4); `legal-framework.json` mục 123/2020.
- Nguồn: Nghị định 254/2026/NĐ-CP quy định chi tiết Luật Quản lý thuế 108/2025/QH15 về hóa đơn điện tử, chứng từ điện tử. Trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=218689&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/7/254-ndcp.signed.pdf (55 trang, bản quét, đã OCR toàn bộ). Mở ngày 2026-11-13.
- Phát hiện:
  - **Điều 43 (PDF trang ~51):** khoản 1 "Nghị định này có hiệu lực thi hành từ ngày 01 tháng 7 năm 2026." Khoản 2: từ ngày đó hết hiệu lực: a) Nghị định 123/2020/NĐ-CP; b) Điều 1 Nghị định 41/2022/NĐ-CP; c) Nghị định 70/2025/NĐ-CP.
  - **Điều 6 khoản 1 (PDF trang 8–9), đối tượng sử dụng hóa đơn điện tử:**
    - Điểm a: tổ chức kinh tế, tổ chức khác, hộ, cá nhân kinh doanh và trường hợp rủi ro cao "sử dụng hóa đơn điện tử có mã của cơ quan thuế khi bán hàng hóa, cung cấp dịch vụ", trừ điểm b, e.
    - Điểm b: DN trong các lĩnh vực điện, xăng dầu, bưu chính, viễn thông, nước sạch, tài chính ngân hàng, bảo hiểm, y tế, thương mại điện tử, siêu thị, thương mại, vận tải… và tổ chức kinh tế có giao dịch điện tử với cơ quan thuế, có hạ tầng CNTT, phần mềm kế toán, phần mềm lập hóa đơn đáp ứng yêu cầu "thì được sử dụng hóa đơn điện tử không có mã của cơ quan thuế", trừ trường hợp rủi ro cao và trường hợp đăng ký dùng hóa đơn có mã.
    - Điểm c: tổ chức kinh tế, hộ, cá nhân kinh doanh bán hàng, cung cấp dịch vụ trực tiếp đến người tiêu dùng (trung tâm thương mại, siêu thị, bán lẻ — trừ ô tô, xe máy —, ăn uống, nhà hàng, khách sạn, vận tải hành khách, vui chơi giải trí, chiếu phim, dịch vụ phục vụ cá nhân khác) "sử dụng hóa đơn điện tử từ máy tính tiền". Đã đăng ký theo điểm a, b thì không bắt buộc đăng ký thêm hóa đơn từ máy tính tiền.
  - **Điều 7:** các trường hợp không phải dùng hóa đơn điện tử — chủ yếu là hộ, cá nhân kinh doanh và một số hoạt động tài chính, tái bảo hiểm; không có trường hợp áp dụng chung cho DN siêu nhỏ.
  - **Điều 9 khoản 1, 2 (PDF trang 16), thời điểm lập hóa đơn:** bán hàng hóa: "thời điểm chuyển giao quyền sở hữu hoặc quyền sử dụng hàng hóa cho người mua, không phân biệt đã thu được tiền hay chưa thu được tiền". Cung cấp dịch vụ: "thời điểm hoàn thành việc cung cấp dịch vụ… không phân biệt đã thu được tiền hay chưa"; nếu thu tiền trước hoặc trong khi cung cấp dịch vụ thì lập khi thu tiền (trừ tiền đặt cọc). Khoản 3: giao hàng nhiều lần, bàn giao từng phần thì mỗi lần đều lập hóa đơn.
  - **Điều 11 khoản 1, 3 (PDF trang ~22):** "Doanh nghiệp nhỏ và vừa, hợp tác xã… hộ kinh doanh, cá nhân kinh doanh tại địa bàn có điều kiện kinh tế – xã hội khó khăn, địa bàn có điều kiện kinh tế – xã hội đặc biệt khó khăn thuộc trường hợp sử dụng hóa đơn điện tử được miễn phí dịch vụ trong thời gian 12 tháng kể từ khi sử dụng hóa đơn điện tử." Khoản 3: các trường hợp khác dùng qua tổ chức cung cấp dịch vụ thì "trả tiền dịch vụ theo hợp đồng".
  - Văn bản dùng tên "Cục Thuế" (Điều 11 khoản 1), không còn "Tổng cục Thuế".
- **Kết luận:**
  1. Từ 01/07/2026, căn cứ là Nghị định 254/2026; Nghị định 123/2020 (và 41/2022 Điều 1, 70/2025) hết hiệu lực. Câu "bắt buộc với mọi DN từ 01/07/2022 theo Nghị định 123/2020" là lịch sử; nội dung hiện hành: DN bán hàng, cung cấp dịch vụ dùng hóa đơn điện tử (mặc định có mã của cơ quan thuế; một số lĩnh vực, điều kiện được dùng không mã; bán lẻ trực tiếp người tiêu dùng dùng hóa đơn từ máy tính tiền).
  2. Câu "có mã… áp dụng cho DN mới thành lập" không còn đúng chữ: theo Điều 6, có mã là mặc định cho mọi tổ chức kinh tế, trừ điểm b.
  3. Câu "miễn phí cổng kết nối thuế" chưa đúng: miễn phí 12 tháng chỉ cho DN nhỏ và vừa ở địa bàn khó khăn, đặc biệt khó khăn; còn lại trả phí theo hợp đồng với tổ chức cung cấp dịch vụ.
  4. Thời điểm lập hóa đơn không phụ thuộc đã thu tiền hay chưa — liên quan trực tiếp tới sổ S1 (doanh thu ghi khi bán, NC-009).
  5. Chưa đọc: Thông tư 91/2026/TT-BTC (thay Thông tư 78/2021?); mức phạt không lập hóa đơn (Nghị định 125/2020 Điều 24, đã sửa bởi 310/2025 khoản 14). Giữ todo cho các mục này.
- **Đề xuất sửa (Biên tập):**
  - `hoa-don-dien-tu.json` `summary`: "Doanh nghiệp bán hàng, cung cấp dịch vụ phải dùng hóa đơn điện tử. Từ 01/07/2026 áp dụng Nghị định 254/2026/NĐ-CP (thay Nghị định 123/2020)." Mục "Hóa đơn điện tử là gì?": bỏ câu "theo Nghị định 123/2020". Mục "Hai loại hóa đơn": có mã là mặc định (Điều 6 khoản 1 điểm a); không mã cho DN thuộc lĩnh vực, điều kiện ở điểm b; thêm loại thứ ba "hóa đơn từ máy tính tiền" cho bán lẻ, ăn uống, khách sạn… (điểm c). Bỏ "miễn phí cổng kết nối thuế", thay bằng điều kiện miễn phí 12 tháng (Điều 11 khoản 1). Thêm mục "Khi nào phải lập hóa đơn" theo Điều 9 khoản 1–3.
  - Đổi "Tổng cục Thuế" thành "Cục Thuế" ở guide này (và các guide khác khi gặp).
  - `bat-dau.json` dòng 274: note "Bắt buộc khi bán hàng, cung cấp dịch vụ (Nghị định 254/2026/NĐ-CP, từ 01/07/2026)"; bỏ todo "theo báo chí".
  - Mục "Căn cứ pháp lý" của guide, `chu-ky-so.json`, `risk_rules.json`, `legal-framework.json`: thay Nghị định 123/2020 bằng Nghị định 254/2026 (có thể ghi "thay Nghị định 123/2020 từ 01/07/2026"). Theo quyết định của chủ dự án, `number`/`effective_from` mục 123/2020 trong `legal-framework.json` có thể đổi thành 254/2026/NĐ-CP, 01/07/2026.
  - `legal_basis`: Nghị định 254/2026/NĐ-CP Điều 6 khoản 1 điểm a, b, c; Điều 7; Điều 9 khoản 1, 2, 3; Điều 11 khoản 1, 3; Điều 43 khoản 1, 2; URL https://vanban.chinhphu.vn/?pageid=27160&docid=218689&classid=1; `verified_against_original: true`.
  - Giữ todo: Thông tư 91/2026 (thay Thông tư 78/2021?) và mức phạt không lập hóa đơn chưa xác minh. Giữ câu "⚠️ Mức phạt cụ thể cần xác minh".

### Ghi chú vòng 23 (2026-11-13, 16:34 UTC)

- Chưa có commit mới của Biên tập từ sau `8af82ac` (đã rà ở vòng 22). NC-020 chưa được áp dụng.
- Vòng này làm NC-021: tiêu chí chọn phương pháp tính thuế GTGT (khấu trừ hay trực tiếp) — todo trong bước `phuong-phap-thue-gtgt` của `tu-0-den-1.json`.

### NC-021 — Phương pháp tính thuế GTGT: DN doanh thu năm từ 1 tỷ trở lên dùng khấu trừ; dưới 1 tỷ dùng trực tiếp theo tỷ lệ % trên doanh thu, trừ khi tự nguyện chọn khấu trừ (Luật Thuế GTGT 48/2024 Điều 10–12)

- Trạng thái: đã xác minh
- Liên quan: `tu-0-den-1.json` bước `phuong-phap-thue-gtgt` (`legal_basis` rỗng; todo "Bổ sung tiêu chí chọn phương pháp…", "Xác minh phương pháp áp dụng cho DN mới…"); `questions.json` câu `vat_method`; `so-ke-toan.json` todo dòng 213 (lãi lỗ tạm tính cho DN tính GTGT trực tiếp); các guide khai GTGT (đang mặc định phương pháp khấu trừ).
- Nguồn:
  - Luật Thuế GTGT 48/2024/QH15 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=212476&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/01/luat48.pdf (bản Công báo số 1527+1528 ngày 29/12/2024, có lớp chữ — không cần OCR). Hiệu lực 01/07/2025. Mở ngày 2026-11-13.
  - Luật 149/2025/QH15 sửa Luật Thuế GTGT — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=216588&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/01/luat149.signed.pdf (2 trang, bản quét, đã OCR). Hiệu lực 01/01/2026.
  - Luật 09/2026/QH16 Điều 2 (đã đọc ở NC-010): chỉ sửa khoản 25 Điều 5.
  - Chưa đọc Luật 90/2025/QH15 (cũng sửa Luật Thuế GTGT).
- Phát hiện:
  - **Luật 48/2024, Điều 10 (Công báo trang 87):** "Phương pháp tính thuế giá trị gia tăng gồm phương pháp khấu trừ thuế và phương pháp tính trực tiếp."
  - **Điều 11 khoản 1:** thuế phải nộp = thuế GTGT đầu ra − thuế GTGT đầu vào được khấu trừ; đầu vào được khấu trừ phải đáp ứng điều kiện Điều 14.
  - **Điều 11 khoản 2:** "Phương pháp khấu trừ thuế áp dụng đối với cơ sở kinh doanh thực hiện đầy đủ chế độ kế toán, hóa đơn, chứng từ theo quy định của pháp luật về kế toán, hóa đơn, chứng từ bao gồm: a) Cơ sở kinh doanh có doanh thu hằng năm từ bán hàng hóa, cung cấp dịch vụ từ 01 tỷ đồng trở lên, trừ hộ, cá nhân sản xuất, kinh doanh; b) Cơ sở kinh doanh tự nguyện áp dụng phương pháp khấu trừ thuế, trừ hộ, cá nhân sản xuất, kinh doanh; …" Khoản 3: Chính phủ quy định chi tiết.
  - **Điều 12 khoản 2 (Công báo trang 88):** tính trực tiếp theo doanh thu = tỷ lệ % × doanh thu. Điểm a1: áp dụng cho "Doanh nghiệp, hợp tác xã, liên hiệp hợp tác xã có doanh thu hằng năm dưới mức ngưỡng doanh thu 01 tỷ đồng, trừ trường hợp tự nguyện áp dụng phương pháp khấu trừ thuế quy định tại khoản 2 Điều 11". Điểm b, tỷ lệ: b1) phân phối, cung cấp hàng hóa 1%; b2) dịch vụ, xây dựng không bao thầu nguyên vật liệu 5%; b3) sản xuất, vận tải, dịch vụ có gắn với hàng hóa, xây dựng có bao thầu nguyên vật liệu 3%; b4) hoạt động kinh doanh khác 2%. Điểm c: doanh thu tính thuế là tổng tiền bán hàng hóa, dịch vụ ghi trên hóa đơn bán hàng, gồm phụ thu, phí thu thêm.
  - **Luật 149/2025, Điều 1:** sửa khoản 1, 25 Điều 5; khoản 5 Điều 9; khoản 3: "Bãi bỏ khoản 3 Điều 12 và điểm c khoản 9 Điều 15" (khoản 3 Điều 12 là khoán thuế cho hộ, cá nhân — không liên quan DN). Không sửa Điều 11 và khoản 2 Điều 12.
- **Kết luận:**
  1. DN có doanh thu hằng năm từ bán hàng, dịch vụ **từ 1 tỷ đồng trở lên** dùng phương pháp khấu trừ (phải làm đủ chế độ kế toán, hóa đơn, chứng từ).
  2. DN có doanh thu **dưới 1 tỷ đồng** dùng phương pháp trực tiếp theo tỷ lệ % trên doanh thu (1% hàng hóa; 5% dịch vụ; 3% sản xuất, vận tải, dịch vụ gắn với hàng hóa, xây dựng có bao thầu vật liệu; 2% khác), **trừ khi tự nguyện chọn khấu trừ**.
  3. Lưu ý ngưỡng: GTGT dùng "từ 1 tỷ trở lên" → khấu trừ; còn miễn TNDN dùng "từ 1 tỷ trở xuống" (NC-011). DN đúng 1 tỷ: khấu trừ GTGT và vẫn được miễn TNDN (nếu đủ điều kiện khác). Cách tính "doanh thu hằng năm", thủ tục đăng ký tự nguyện và cách xác định cho DN mới do Chính phủ quy định (Nghị định 181/2025, sửa bởi 359/2025, 144/2026 — chưa đọc).
  4. Nhiều DN siêu nhỏ có doanh thu dưới 1 tỷ sẽ mặc định tính GTGT trực tiếp — hai guide khai GTGT hiện chỉ viết cho phương pháp khấu trừ (mẫu 01/GTGT).
- **Đề xuất sửa (Biên tập):**
  - `tu-0-den-1.json` bước `phuong-phap-thue-gtgt`, `how` bước 1: "Doanh thu bán hàng, dịch vụ cả năm từ 1 tỷ đồng trở lên: tính thuế GTGT theo phương pháp khấu trừ (thuế đầu ra trừ thuế đầu vào). Dưới 1 tỷ: tính trực tiếp = doanh thu × tỷ lệ (1% bán hàng hóa; 5% dịch vụ; 3% sản xuất, vận tải, dịch vụ gắn với hàng hóa; 2% khác), trừ khi công ty tự nguyện chọn khấu trừ. Khấu trừ đòi hỏi làm đủ sổ sách, hóa đơn, chứng từ." `legal_basis`: Luật Thuế GTGT 48/2024/QH15 Điều 10, Điều 11 khoản 1, 2; Điều 12 khoản 2; Luật 149/2025/QH15 Điều 1 (không sửa Điều 11, khoản 2 Điều 12); URL như trên; `verified_against_original: true`. Thay todo "Bổ sung tiêu chí…" bằng todo "Thủ tục đăng ký tự nguyện khấu trừ, cách xác định doanh thu cho DN mới: Nghị định 181/2025 (chưa đọc)".
  - `questions.json` `vat_method`: thêm `help_text`: "Doanh thu năm từ 1 tỷ trở lên: khấu trừ. Dưới 1 tỷ: trực tiếp trên doanh thu, trừ khi tự chọn khấu trừ."
  - Hai guide khai GTGT: thêm một câu đầu "Hướng dẫn này cho DN tính thuế theo phương pháp khấu trừ. DN doanh thu dưới 1 tỷ, tính trực tiếp, xem …" (chưa có guide riêng → ghi vào "Cần chủ dự án quyết" nếu cần trang mới).

### Ghi chú vòng 24 (2026-11-13, 18:17 UTC)

- Đã rà commit `2a1b4da` (NC-020, NC-021): Nghị định 123/2020 chỉ còn trong todo và ghi chú "đã thay"; "Tổng cục Thuế" chỉ còn trong todo (3 guide khai thuế). Đúng đề xuất.
- Vòng này đóng điểm còn mở của NC-021: cách xác định doanh thu năm, DN mới thành lập, đăng ký tự nguyện khấu trừ (Nghị định 181/2025 Điều 21).

### NC-021 (bổ sung) — Nghị định 181/2025 Điều 21: doanh thu xét phương pháp lấy trên tờ khai GTGT từ tháng 11 (quý 4) năm trước đến tháng 10 (quý 3) năm nay; áp dụng ổn định 2 năm; DN mới có thuê địa điểm, mua sắm tài sản, công cụ được tự nguyện khấu trừ

- Trạng thái: đã xác minh
- Nguồn:
  - Nghị định 181/2025/NĐ-CP quy định chi tiết Luật Thuế GTGT — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=214336&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/181nd.signed.pdf (75 trang, bản quét, đã OCR toàn bộ). Điều 38 khoản 1: hiệu lực 01/07/2025; khoản 2: thay Nghị định 209/2013/NĐ-CP và các văn bản cũ.
  - Nghị định 359/2025/NĐ-CP — https://vanban.chinhphu.vn/?pageid=27160&docid=216388&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/01/359-nd.signed.pdf (3 trang): chỉ bổ sung khoản 1b Điều 4 và bãi bỏ khoản 3 Điều 37, khoản 3 Điều 39. Hiệu lực 01/01/2026.
  - Nghị định 144/2026/NĐ-CP — https://vanban.chinhphu.vn/?pageid=27160&docid=218020&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/4/144-ndcp.signed.pdf (23 trang): sửa Điều 4, điểm b khoản 1 Điều 9, khoản 2 Điều 23, điểm g khoản 2 Điều 26, thay Phụ lục I, II. **Không sửa Điều 21.** Mở ngày 2026-11-13.
- Phát hiện (Nghị định 181/2025, Điều 21, PDF trang 24–26):
  - Câu dẫn: phương pháp khấu trừ "áp dụng đối với cơ sở kinh doanh thực hiện đầy đủ chế độ kế toán, hóa đơn, chứng từ…".
  - Khoản 1 điểm a: doanh thu hằng năm "do cơ sở kinh doanh tự xác định căn cứ vào tổng cộng chỉ tiêu 'Tổng doanh thu của hàng hóa, dịch vụ bán ra chịu thuế giá trị gia tăng' trên Tờ khai thuế giá trị gia tăng tháng của kỳ tính thuế từ tháng 11 năm trước đến hết kỳ tính thuế tháng 10 năm hiện tại… hoặc trên Tờ khai… quý của kỳ tính thuế từ quý 4 năm trước đến hết kỳ tính thuế quý 3 năm hiện tại… Thời gian áp dụng ổn định phương pháp tính thuế là 02 năm liên tục."
  - Khoản 1 điểm b: cơ sở kinh doanh mới thành lập, hoạt động không đủ 12 tháng: doanh thu ước tính = tổng doanh thu trên tờ khai GTGT các tháng hoạt động ÷ số tháng × 12. Từ 1 tỷ trở lên: khấu trừ. "Trường hợp doanh thu ước tính… chưa đến 01 tỷ đồng thì cơ sở kinh doanh áp dụng phương pháp tính trực tiếp theo doanh thu trong 02 năm, trừ trường hợp cơ sở kinh doanh đăng ký tự nguyện áp dụng phương pháp khấu trừ thuế."
  - Khoản 2, các trường hợp được tự nguyện khấu trừ, trong đó: a) DN đang hoạt động có doanh thu dưới 1 tỷ "đã thực hiện đầy đủ chế độ kế toán, sổ sách, hóa đơn, chứng từ"; đ) "Doanh nghiệp, hợp tác xã, liên hiệp hợp tác xã mới thành lập có thực hiện đầu tư, mua sắm, nhận góp vốn bằng tài sản cố định, máy móc, thiết bị, công cụ, dụng cụ hoặc có hợp đồng thuê địa điểm kinh doanh."
- **Kết luận:**
  1. Doanh thu xét phương pháp GTGT là doanh thu chịu thuế GTGT trên các tờ khai GTGT, tính từ tháng 11 năm trước đến tháng 10 năm nay (hoặc quý 4 năm trước đến quý 3 năm nay); phương pháp được giữ ổn định 2 năm.
  2. DN mới thành lập có thuê địa điểm kinh doanh, hoặc mua sắm, nhận góp vốn bằng tài sản, máy móc, công cụ, được đăng ký tự nguyện khấu trừ ngay. Phần lớn DN siêu nhỏ mới (có thuê văn phòng, cửa hàng) thuộc trường hợp này.
  3. DN mới không đăng ký tự nguyện và doanh thu ước tính dưới 1 tỷ: tính trực tiếp trong 2 năm.
  4. Mẫu, thời hạn đăng ký tự nguyện: chưa xác minh (thuộc Luật Quản lý thuế / Thông tư 89/2026 hoặc thủ tục đăng ký thuế; chưa đọc phần này).
- **Đề xuất sửa (Biên tập):**
  - `tu-0-den-1.json` bước `phuong-phap-thue-gtgt`: thêm vào `how`: "Công ty mới thành lập có thuê địa điểm kinh doanh, hoặc mua sắm, nhận góp vốn bằng tài sản, máy móc, công cụ, được đăng ký tự nguyện tính theo phương pháp khấu trừ ngay từ đầu. Không đăng ký và doanh thu ước tính cả năm dưới 1 tỷ thì tính trực tiếp trong 2 năm." "Phương pháp đã chọn được giữ 2 năm liên tục. Doanh thu để xét lấy trên tờ khai GTGT từ tháng 11 năm trước đến tháng 10 năm nay." `legal_basis` thêm: Nghị định 181/2025/NĐ-CP Điều 21 khoản 1 điểm a, b; khoản 2 điểm a, đ; URL https://vanban.chinhphu.vn/?pageid=27160&docid=214336&classid=1; ghi chú đã đối chiếu Nghị định 359/2025 và 144/2026 không sửa Điều 21; `verified_against_original: true`. Thay todo "Xác minh phương pháp áp dụng cho DN mới" bằng todo "Mẫu và thời hạn đăng ký tự nguyện khấu trừ: chưa xác minh".
  - `questions.json` `vat_method` `help_text`: thêm "DN mới có thuê địa điểm hoặc mua tài sản, công cụ được đăng ký tự nguyện khấu trừ."

### Ghi chú vòng 25 (2026-11-13, 20:18 UTC)

- Đã rà commit `46affed` (bổ sung NC-021): thêm DN mới thuê địa điểm, mua tài sản được tự nguyện khấu trừ; phương pháp giữ 2 năm. Đúng đề xuất.
- Vòng này làm NC-022: đối tượng, hạn đăng ký, mức đóng BHXH bắt buộc theo Luật BHXH 41/2024 — đặc biệt giám đốc, người quản lý DN siêu nhỏ (thường chính là chủ DN). App chưa nhắc nghĩa vụ này.

### NC-022 — Từ 01/07/2025, người quản lý doanh nghiệp (giám đốc, chủ tịch công ty…) phải đóng BHXH bắt buộc kể cả khi không hưởng lương; đăng ký trong 30 ngày (Luật BHXH 41/2024)

- Trạng thái: đã xác minh
- Liên quan: `bat-dau.json` dòng 341 ("Đăng ký BHXH nếu có nhân viên", "Phải đăng ký trong 30 ngày kể từ ngày ký HĐLĐ") và todo dòng 362; `tu-0-den-1.json` dòng ~739 (hạn "Trong 30 ngày kể từ ngày ký hợp đồng lao động"); `questions.json` `insured_headcount` ("kể cả giám đốc"), `pays_wages`; `legal-framework.json` mục Luật BHXH (đang dẫn 58/2014/QH13).
- Nguồn: Luật Bảo hiểm xã hội 41/2024/QH15 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=211199&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2024/9/41-2024-qh15.pdf (bản Công báo số 987+988 ngày 25/8/2024, có lớp chữ). Điều 141 khoản 1: "Luật này có hiệu lực thi hành từ ngày 01 tháng 7 năm 2025." Mở ngày 2026-11-13.
- Phát hiện:
  - **Điều 2 khoản 1 (Công báo trang 3–4)**, người lao động là công dân Việt Nam thuộc đối tượng BHXH bắt buộc, gồm:
    - Điểm a: người làm việc theo hợp đồng lao động không xác định thời hạn, xác định thời hạn từ đủ 01 tháng trở lên, kể cả thỏa thuận bằng tên gọi khác nhưng có nội dung làm việc có trả công, tiền lương và sự quản lý, điều hành, giám sát.
    - Điểm i: "Người quản lý doanh nghiệp, kiểm soát viên, người đại diện phần vốn nhà nước, người đại diện phần vốn của doanh nghiệp theo quy định của pháp luật; … có hưởng tiền lương".
    - Điểm l: lao động ở điểm a làm việc không trọn thời gian có tiền lương tháng bằng hoặc cao hơn tiền lương làm căn cứ đóng thấp nhất.
    - Điểm n: "Người quản lý doanh nghiệp, kiểm soát viên, người đại diện phần vốn nhà nước, người đại diện phần vốn của doanh nghiệp theo quy định của pháp luật; … không hưởng tiền lương."
  - **Điều 2 khoản 5 điểm c:** người ở điểm i, n quản lý nhiều doanh nghiệp thì tham gia tại doanh nghiệp đầu tiên tham gia quản lý, điều hành. **Khoản 7 điểm c:** người ở điểm m, n đã đủ tuổi nghỉ hưu thì không thuộc đối tượng bắt buộc (trừ trường hợp còn thiếu tối đa 6 tháng đóng). Điểm a: người đang hưởng lương hưu, trợ cấp BHXH hằng tháng cũng không thuộc đối tượng bắt buộc.
  - **Điều 28 khoản 1 (Công báo trang 23–24):** người sử dụng lao động kê khai, nộp hồ sơ tham gia BHXH bắt buộc của người lao động "trong thời hạn 30 ngày kể từ ngày người lao động thuộc đối tượng tham gia bảo hiểm xã hội bắt buộc". Khoản 2: người ở điểm m, n tự nộp thì nộp tờ khai trong 30 ngày kể từ ngày thuộc đối tượng. Điều 27 khoản 2: người ở điểm n nộp qua người sử dụng lao động hoặc tự nộp.
  - **Điều 31 khoản 1 điểm d (Công báo trang 25):** người ở điểm g, h, m, n "được lựa chọn tiền lương làm căn cứ đóng bảo hiểm xã hội bắt buộc nhưng thấp nhất bằng mức tham chiếu và cao nhất bằng 20 lần mức tham chiếu tại thời điểm đóng"; sau ít nhất 12 tháng được chọn lại.
  - **Điều 33 khoản 4 (Công báo trang ~27):** người ở điểm m, n: "a) Mức đóng hằng tháng bằng 3% tiền lương làm căn cứ đóng… vào quỹ ốm đau và thai sản, 22%… vào quỹ hưu trí và tử tuất; b) Đóng trực tiếp cho cơ quan bảo hiểm xã hội hoặc đóng qua hộ kinh doanh, doanh nghiệp… theo phương thức đóng hằng tháng, 03 tháng hoặc 06 tháng một lần; thời hạn đóng chậm nhất là ngày cuối cùng của tháng tiếp theo ngay sau chu kỳ đóng."
- **Kết luận:**
  1. Chủ DN siêu nhỏ giữ chức người quản lý doanh nghiệp (giám đốc, chủ tịch công ty, thành viên hội đồng thành viên… theo Luật Doanh nghiệp) **phải tham gia BHXH bắt buộc từ 01/07/2025**, kể cả khi không nhận lương (điểm n). Trừ khi đã đủ tuổi nghỉ hưu hoặc đang hưởng lương hưu, hoặc đang tham gia BHXH bắt buộc ở DN khác mà mình quản lý trước.
  2. Người quản lý không hưởng lương tự chọn mức lương làm căn cứ đóng, từ mức tham chiếu đến 20 lần mức tham chiếu; đóng 25% (3% + 22%), hằng tháng, 3 tháng hoặc 6 tháng một lần; tự đóng hoặc đóng qua DN; đăng ký trong 30 ngày.
  3. Hạn đăng ký BHXH cho nhân viên: 30 ngày kể từ ngày người lao động thuộc đối tượng (thường là ngày bắt đầu làm việc theo HĐLĐ từ đủ 1 tháng), không phải "kể từ ngày ký HĐLĐ".
  4. Câu "Đăng ký BHXH nếu có nhân viên" chưa đủ: DN không có nhân viên vẫn phải đăng ký cho người quản lý.
  5. Chưa xác minh: mức tham chiếu hiện tại (số tiền); định nghĩa "người quản lý doanh nghiệp" (Luật Doanh nghiệp 59/2020 Điều 4 khoản 24 — chưa trích); Nghị định 158/2025 hướng dẫn BHXH bắt buộc (chưa đọc); BHYT, BHTN của người quản lý không lương (Luật BHYT, Luật Việc làm — chưa đọc).
- **Đề xuất sửa (Biên tập):**
  - `bat-dau.json` dòng 341: đổi thành "Đăng ký BHXH bắt buộc cho người quản lý công ty (giám đốc, chủ tịch công ty…) và cho nhân viên có hợp đồng từ đủ 1 tháng"; note: "Trong 30 ngày kể từ ngày thuộc diện phải đóng. Từ 01/07/2025, người quản lý không nhận lương cũng phải đóng." Bỏ todo "xác minh thời hạn, mốc tính và đối tượng" ở dòng 362.
  - `tu-0-den-1.json` bước BHXH (~dòng 739): hạn "Trong 30 ngày kể từ ngày người lao động thuộc diện phải đóng"; thêm mục riêng "Giám đốc không nhận lương vẫn phải đóng BHXH": tự chọn mức lương làm căn cứ (từ mức tham chiếu đến 20 lần), đóng 25%, hằng tháng hoặc 3, 6 tháng một lần, hạn chậm nhất ngày cuối tháng sau chu kỳ đóng; không áp dụng nếu đã đủ tuổi nghỉ hưu, đang hưởng lương hưu, hoặc đã đóng ở DN khác mình quản lý trước. Đây là nghĩa vụ mới và số tiền không nhỏ: giữ câu khuyên hỏi cơ quan BHXH để xác nhận trường hợp của mình.
  - `questions.json` `insured_headcount` `help_text`: "Từ 01/07/2025, giám đốc, người quản lý công ty phải đóng BHXH kể cả khi không nhận lương."
  - `legal-framework.json` mục Luật BHXH: có thể đổi `number` thành 41/2024/QH15, `effective_from` 01/07/2025 (đã đọc Điều 141 khoản 1).
  - `legal_basis`: Luật BHXH 41/2024/QH15 Điều 2 khoản 1 điểm a, i, l, n; khoản 5 điểm c; khoản 7 điểm a, c; Điều 27 khoản 2; Điều 28 khoản 1, 2; Điều 31 khoản 1 điểm d; Điều 33 khoản 4; Điều 141 khoản 1; URL https://vanban.chinhphu.vn/?pageid=27160&docid=211199&classid=1; `verified_against_original: true`.
  - Todo: mức tham chiếu, Nghị định 158/2025, BHYT và BHTN của người quản lý không lương — chưa xác minh. Không ghi số tiền.

### Ghi chú vòng 26 (2026-11-13, 22:17 UTC)

- Đã rà commit `3fd7988` (NC-022) và `8c65a8e` (nhật ký Biên tập). Áp dụng NC-022 ở `bat-dau.json`, `tu-0-den-1.json`, `questions.json`, `legal-framework.json`.
- Vòng này đóng hai điểm còn mở của NC-022: định nghĩa "người quản lý doanh nghiệp" và mức tham chiếu.

### NC-022 (bổ sung) — "Người quản lý doanh nghiệp" theo Luật Doanh nghiệp; mức tham chiếu BHXH hiện bằng mức lương cơ sở 2.530.000 đồng/tháng (từ 01/07/2026)

- Trạng thái: đã xác minh
- Nguồn:
  - Luật Doanh nghiệp 59/2020/QH14 — https://vanban.chinhphu.vn/?pageid=27160&docid=200447&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2020/07/59.signed.pdf (đã OCR trang 2–4). Mở ngày 2026-11-13.
  - Luật BHXH 41/2024/QH15 — https://vanban.chinhphu.vn/?pageid=27160&docid=211199&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2024/9/41-2024-qh15.pdf (có lớp chữ).
  - Nghị định 161/2026/NĐ-CP quy định mức lương cơ sở… — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=218107&classid=1 (ban hành 15/05/2026, hiệu lực 01/07/2026); PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/5/161-ndcp.signed.pdf (7 trang, bản quét; đã OCR trang 1–4). Mở ngày 2026-11-13.
- Phát hiện:
  - **Luật Doanh nghiệp 59/2020, Điều 4 khoản 24 (PDF trang 3):** "Người quản lý doanh nghiệp là người quản lý doanh nghiệp tư nhân và người quản lý công ty, bao gồm chủ doanh nghiệp tư nhân, thành viên hợp danh, Chủ tịch Hội đồng thành viên, thành viên Hội đồng thành viên, Chủ tịch công ty, Chủ tịch Hội đồng quản trị, thành viên Hội đồng quản trị, Giám đốc hoặc Tổng giám đốc và cá nhân giữ chức danh quản lý khác theo quy định tại Điều lệ công ty." (Luật 76/2025 Điều 1 khoản 1 sửa Điều 4 ở các điểm: a) khoản 5; b) khoản 14; c) khoản 16; đ) bổ sung khoản 35 (chủ sở hữu hưởng lợi). Đã OCR lại ở độ phân giải cao: bản quét đi thẳng từ điểm c sang điểm đ, không thấy điểm d; không có sửa khoản 24. Nếu cần chắc chắn tuyệt đối, đối chiếu lại bản Công báo của Luật 76/2025.)
  - **Luật BHXH 41/2024, Điều 7 khoản 1:** "Mức tham chiếu là mức tiền do Chính phủ quyết định dùng để tính mức đóng, mức hưởng một số chế độ bảo hiểm xã hội…". **Điều 141 khoản 13:** "Khi chưa bãi bỏ mức lương cơ sở thì mức tham chiếu quy định tại Luật này bằng mức lương cơ sở. Tại thời điểm mức lương cơ sở bị bãi bỏ thì mức tham chiếu không thấp hơn mức lương cơ sở đó."
  - **Nghị định 161/2026, Điều 3 khoản 2:** "Từ ngày 01 tháng 7 năm 2026, mức lương cơ sở là 2.530.000 đồng/tháng."
- **Kết luận:**
  1. Với công ty TNHH một thành viên do chủ DN làm chủ: Chủ tịch công ty và Giám đốc đều là "người quản lý doanh nghiệp" → thuộc đối tượng BHXH bắt buộc (điểm i nếu hưởng lương, điểm n nếu không). Với công ty TNHH hai thành viên trở lên: cả thành viên Hội đồng thành viên cũng là người quản lý.
  2. Từ 01/07/2026, mức tham chiếu = mức lương cơ sở = 2.530.000 đồng/tháng. Người quản lý không hưởng lương chọn mức lương làm căn cứ từ 2.530.000 đến 50.600.000 đồng/tháng (20 lần); đóng 25% → tối thiểu 632.500 đồng/tháng. (Số tiền đổi khi Chính phủ điều chỉnh mức lương cơ sở.)
  3. Câu này có điểm cần lưu ý: Luật dùng "người quản lý doanh nghiệp" của Luật Doanh nghiệp; nếu một công ty có nhiều người quản lý không lương, mỗi người đều thuộc diện (trừ ngoại lệ ở Điều 2 khoản 5 điểm c, khoản 7). Đây là nghĩa vụ có số tiền lớn: nên giữ câu khuyên xác nhận với cơ quan BHXH.
- **Đề xuất sửa (Biên tập):**
  - Ở mục "Giám đốc không nhận lương vẫn phải đóng BHXH" (`tu-0-den-1.json`) và chỗ liên quan ở `bat-dau.json`: thêm "Người quản lý gồm: Chủ tịch công ty, Giám đốc, thành viên Hội đồng thành viên… (Luật Doanh nghiệp Điều 4 khoản 24)". Thêm "Mức lương làm căn cứ tối thiểu bằng mức tham chiếu, hiện là 2.530.000 đồng/tháng (từ 01/07/2026); đóng 25% → ít nhất khoảng 632.500 đồng/tháng." Ghi rõ số tiền có thể thay đổi khi mức lương cơ sở điều chỉnh.
  - `legal_basis` thêm: Luật Doanh nghiệp 59/2020/QH14 Điều 4 khoản 24; Luật BHXH 41/2024/QH15 Điều 7 khoản 1, Điều 141 khoản 13; Nghị định 161/2026/NĐ-CP Điều 3 khoản 2; URL như trên; `verified_against_original: true`. Bỏ todo "mức tham chiếu chưa xác minh".
  - Giữ todo: Nghị định 158/2025; BHYT, BHTN của người quản lý không lương.

### Ghi chú vòng 27 (2026-11-14, 00:18 UTC)

- Đã rà commit `91b7403` (bổ sung NC-022): thêm định nghĩa người quản lý và mức tham chiếu 2.530.000 đồng. Đúng đề xuất.
- Vòng này làm NC-023: tỷ lệ đóng BHXH của DN và người lao động; hạn đóng hằng tháng (todo ở lịch "Hàng tháng" của `bat-dau.json` và nhiều chỗ khác).

### NC-023 — Tỷ lệ đóng BHXH bắt buộc: DN 17% (3% + 14%), người lao động 8%; hạn đóng hằng tháng là ngày cuối cùng của tháng tiếp theo (Luật BHXH 41/2024 Điều 32–34)

- Trạng thái: đã xác minh (phần BHXH); BHYT, BHTN chưa xác minh
- Liên quan: `bat-dau.json` lịch "Hàng tháng" (id `hang-thang`, dòng ~609: "Đóng BHXH, BHYT, BHTN" hạn "Cuối tháng"; todo dòng 614); các todo "tỷ lệ đóng của DN cho nhân viên" ở `bat-dau.json` dòng 414, `tu-0-den-1.json` dòng 815, 853, `legal-framework.json` dòng 361–362.
- Nguồn: Luật BHXH 41/2024/QH15 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=211199&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2024/9/41-2024-qh15.pdf (bản Công báo số 987+988, có lớp chữ). Hiệu lực 01/07/2025. Mở ngày 2026-11-14.
- Phát hiện:
  - **Điều 32 khoản 1 (Công báo trang 26):** tỷ lệ đóng BHXH bắt buộc: a) 3% tiền lương làm căn cứ đóng vào quỹ ốm đau và thai sản; b) 22% vào quỹ hưu trí và tử tuất.
  - **Điều 33 khoản 1 (trang 26–27):** người lao động ở điểm a, b, c, d, i, k, l khoản 1 Điều 2 (gồm người làm theo HĐLĐ từ đủ 1 tháng, người quản lý DN có hưởng lương): "Mức đóng hằng tháng bằng 8% tiền lương làm căn cứ đóng bảo hiểm xã hội bắt buộc vào quỹ hưu trí và tử tuất"; đóng hằng tháng.
  - **Điều 33 khoản 5:** người lao động không hưởng tiền lương từ 14 ngày làm việc trở lên trong tháng thì không phải đóng BHXH tháng đó (trừ khi hai bên thỏa thuận đóng). Khoản 6: tháng đầu làm việc nghỉ ốm từ 14 ngày làm việc trở lên vẫn phải đóng.
  - **Điều 34 khoản 1 (trang 28):** người sử dụng lao động hằng tháng đóng trên tiền lương làm căn cứ của các đối tượng trên: "a) 3% vào quỹ ốm đau và thai sản; b) 14% vào quỹ hưu trí và tử tuất." Khoản 3: không phải đóng cho người lao động thuộc khoản 5 Điều 33.
  - **Điều 34 khoản 4:** "Phương thức, thời hạn đóng bảo hiểm xã hội bắt buộc chậm nhất đối với người sử dụng lao động được quy định như sau: a) Ngày cuối cùng của tháng tiếp theo đối với phương thức đóng hằng tháng; b) Ngày cuối cùng của tháng tiếp theo ngay sau chu kỳ đóng đối với phương thức đóng 03 tháng một lần hoặc 06 tháng một lần."
  - Người quản lý không hưởng lương (điểm n): tự đóng 25% (Điều 33 khoản 4), DN không đóng phần 17% (xem NC-022).
- **Kết luận:**
  1. Với mỗi nhân viên có HĐLĐ từ đủ 1 tháng và người quản lý có hưởng lương: DN đóng BHXH 17% (3% ốm đau thai sản + 14% hưu trí tử tuất), người lao động đóng 8% (DN khấu trừ từ lương), tổng 25% tiền lương làm căn cứ đóng.
  2. Hạn đóng hằng tháng là **ngày cuối cùng của tháng tiếp theo** (lương tháng 3 → đóng chậm nhất 30/4), không phải "cuối tháng".
  3. Chưa xác minh (không có trong Luật BHXH): BHYT (Luật Bảo hiểm y tế), BHTN (Luật Việc làm), bảo hiểm tai nạn lao động – bệnh nghề nghiệp (Luật An toàn, vệ sinh lao động). Không ghi tỷ lệ "tổng 32%" hay "21,5% / 10,5%" cho tới khi đọc các luật này.
- **Đề xuất sửa (Biên tập):**
  - `bat-dau.json` lịch "Hàng tháng": tách thành "Đóng BHXH (DN 17%, người lao động 8% trên tiền lương làm căn cứ đóng)", hạn "Ngày cuối cùng của tháng tiếp theo". BHYT, BHTN: giữ dòng riêng với todo "tỷ lệ và hạn đóng chưa xác minh", hoặc ghi "đóng cùng BHXH (chưa xác minh)". `legal_basis`: Luật BHXH 41/2024/QH15 Điều 32 khoản 1, Điều 33 khoản 1, 5, Điều 34 khoản 1, 3, 4; URL https://vanban.chinhphu.vn/?pageid=27160&docid=211199&classid=1; `verified_against_original: true`. Bỏ todo "xác minh hạn và phương thức đóng" (phần BHXH).
  - Ở mục BHXH nhân viên trong `tu-0-den-1.json` và `legal-framework.json`: thêm tỷ lệ 17% / 8% và hạn đóng. Thay todo "tỷ lệ đóng của DN cho nhân viên" bằng "BHYT, BHTN, bảo hiểm TNLĐ-BNN: chưa xác minh".
  - Sổ S2-DNSN (NC-009) có cột BHXH, BHYT, BHTN: có thể ghi chú tỷ lệ BHXH 17% / 8% ở trang hướng dẫn sổ; chưa điền tỷ lệ BHYT, BHTN.

### Ghi chú vòng 28 (2026-11-14, 02:18 UTC)

- Đã rà commit `0fa7d45` (NC-023): tách dòng BHXH (17% / 8%, hạn ngày cuối cùng của tháng tiếp theo) khỏi BHYT, BHTN. Đúng đề xuất.
- Vòng này bổ sung NC-023: BHYT và BHTN — đối tượng và mức đóng tối đa theo luật.

### NC-023 (bổ sung) — BHYT tối đa 6% tiền lương (DN 2/3, người lao động 1/3); BHTN tối đa 1% mỗi bên; người quản lý không lương tự đóng BHYT, không thuộc diện BHTN (Luật BHYT sửa đổi 51/2024; Luật Việc làm 74/2025)

- Trạng thái: đã xác minh (đối tượng, mức tối đa, cách chia); mức đóng cụ thể do Chính phủ quy định — chưa xác minh
- Nguồn:
  - Luật 51/2024/QH15 sửa đổi, bổ sung một số điều của Luật Bảo hiểm y tế — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=212479&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/01/luat51.pdf (Công báo số 1523+1524, có lớp chữ). Hiệu lực 01/07/2025 (Điều 3 khoản 1, trừ một số quy định). Mở ngày 2026-11-14.
  - Luật Việc làm 74/2025/QH15 — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=214560&classid=1 (ban hành 16/06/2025, hiệu lực 01/01/2026); PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/74qh15.signed.pdf (26 trang, bản quét, đã OCR). Mở ngày 2026-11-14.
- Phát hiện:
  - **Luật BHYT (sửa bởi Luật 51/2024), Điều 12 khoản 1:** nhóm do người sử dụng lao động, người lao động đóng hoặc cùng đóng: điểm a — người lao động theo HĐLĐ từ đủ 01 tháng; người quản lý doanh nghiệp… **có hưởng tiền lương**; điểm b — người quản lý doanh nghiệp… **không hưởng tiền lương**.
  - **Điều 13 khoản 1 (Công báo trang 10):** "a) Mức đóng hằng tháng của đối tượng quy định tại các điểm a, c, d và e khoản 1 Điều 12… tối đa bằng 6% tiền lương tháng, trong đó người sử dụng lao động đóng hai phần ba và người lao động đóng một phần ba; b) Mức đóng hằng tháng của đối tượng quy định tại điểm b khoản 1 Điều 12… tối đa bằng 6% tiền lương tháng làm căn cứ đóng bảo hiểm xã hội bắt buộc và do đối tượng đóng".
  - **Luật Việc làm 74/2025, Điều 31 khoản 1 (PDF trang 14):** đối tượng BHTN: a) HĐLĐ từ đủ 01 tháng; b) làm không trọn thời gian có lương bằng hoặc cao hơn mức thấp nhất làm căn cứ đóng BHXH; c) hợp đồng làm việc; d) người quản lý doanh nghiệp… **có hưởng tiền lương**. Khoản 2: người đang hưởng lương hưu, đủ điều kiện hưởng lương hưu, người đang làm hợp đồng thử việc, người giúp việc gia đình không thuộc đối tượng.
  - **Điều 32 khoản 1:** đăng ký BHTN thực hiện đồng bộ với đăng ký BHXH bắt buộc.
  - **Điều 33 khoản 1, 2 (PDF trang 15):** "a) Người lao động đóng tối đa bằng 1% tiền lương tháng; b) Người sử dụng lao động đóng tối đa bằng 1% quỹ tiền lương tháng của những người lao động đang tham gia bảo hiểm thất nghiệp"; hằng tháng DN đóng phần mình và trích lương người lao động để đóng cùng lúc.
- **Kết luận:**
  1. Nhân viên HĐLĐ từ đủ 1 tháng và người quản lý có hưởng lương: tham gia cả BHXH, BHYT, BHTN. BHYT tối đa 6% (DN 2/3, người lao động 1/3); BHTN tối đa 1% mỗi bên. Luật chỉ đặt mức **tối đa**; mức cụ thể do Chính phủ quy định (chưa đọc nghị định). Không ghi "4,5%", "1%" như mức chính thức cho tới khi đọc nghị định.
  2. Người quản lý **không** hưởng lương: tự đóng BHXH 25% (NC-022) và tự đóng BHYT (tối đa 6% tiền lương làm căn cứ đóng BHXH); **không** thuộc diện BHTN (Điều 31 chỉ có người quản lý có hưởng lương).
  3. Người lao động đang làm hợp đồng thử việc không thuộc đối tượng BHTN (Luật Việc làm Điều 31 khoản 2).
  4. Chưa xác minh: mức đóng BHYT, BHTN cụ thể (nghị định hướng dẫn); bảo hiểm tai nạn lao động – bệnh nghề nghiệp (Luật An toàn, vệ sinh lao động).
- **Đề xuất sửa (Biên tập):**
  - Lịch "Hàng tháng" (`bat-dau.json`) dòng BHYT, BHTN: "Đóng BHYT, BHTN cùng BHXH cho nhân viên. BHYT tối đa 6% tiền lương (DN 2/3, nhân viên 1/3); BHTN tối đa 1% mỗi bên. Mức cụ thể theo quy định của Chính phủ (chưa xác minh)." Hạn đóng: giữ todo (luật BHYT, Việc làm chưa đọc phần hạn đóng của DN; Luật Việc làm Điều 33 khoản 2 chỉ nêu hạn cho trường hợp đóng 3, 6 tháng).
  - Mục "Giám đốc không nhận lương vẫn phải đóng BHXH" (`tu-0-den-1.json`): thêm "Cũng phải tự đóng BHYT (tối đa 6% mức lương làm căn cứ đóng BHXH). Không phải đóng BHTN." `legal_basis` thêm: Luật BHYT (sửa bởi Luật 51/2024/QH15) Điều 12 khoản 1 điểm a, b; Điều 13 khoản 1 điểm a, b; Luật Việc làm 74/2025/QH15 Điều 31 khoản 1, 2; Điều 32 khoản 1; Điều 33 khoản 1, 2; URL như trên; `verified_against_original: true`.
  - Giữ todo: mức đóng BHYT, BHTN cụ thể; bảo hiểm TNLĐ-BNN.

### Ghi chú vòng 29 (2026-11-14, 04:17 UTC)

- Đã rà commit `99c64f2` (bổ sung NC-023 vòng 28): BHYT, BHTN ghi mức tối đa và chưa ghi mức cụ thể. Đúng đề xuất.
- Vòng này chốt mức đóng cụ thể BHYT, BHTN (điểm còn mở của NC-023).

### NC-023 (bổ sung 2) — Mức đóng cụ thể: BHYT 4,5% tiền lương làm căn cứ đóng BHXH (DN 2/3 = 3%, người lao động 1/3 = 1,5%); BHTN 1% mỗi bên (Nghị định 188/2025, Nghị định 374/2025)

- Trạng thái: đã xác minh
- Nguồn:
  - Nghị định 188/2025/NĐ-CP quy định chi tiết và hướng dẫn thi hành một số điều của Luật Bảo hiểm y tế — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=214515&classid=1 (hiệu lực 15/08/2025); PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/188-ndcp.signed.pdf (106 trang, bản quét; đã OCR trang 1–24). Mở ngày 2026-11-14.
  - Nghị định 374/2025/NĐ-CP quy định chi tiết một số điều của Luật Việc làm về bảo hiểm thất nghiệp — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=216493&classid=1 (hiệu lực 01/01/2026); PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/01/374-1.signed.pdf (45 trang, bản quét, đã OCR toàn bộ). Mở ngày 2026-11-14.
- Phát hiện:
  - **Nghị định 188/2025, Điều 6 khoản 1 (PDF trang 6):** "a) Mức đóng hằng tháng của đối tượng quy định tại các điểm a, c, d và e khoản 1 Điều 12 của Luật Bảo hiểm y tế bằng 4,5% tiền lương tháng làm căn cứ đóng bảo hiểm xã hội bắt buộc, trong đó người sử dụng lao động đóng hai phần ba và người lao động đóng một phần ba; b) Mức đóng hằng tháng của đối tượng quy định tại các điểm b và đ khoản 1 Điều 12 của Luật Bảo hiểm y tế bằng 4,5% tiền lương tháng làm căn cứ đóng bảo hiểm xã hội bắt buộc và do đối tượng đóng".
  - **Nghị định 374/2025, Điều 4 (PDF trang 2–3):** "1. Người lao động đóng bằng 1% tiền lương tháng. 2. Người sử dụng lao động đóng bằng 1% quỹ tiền lương tháng của những người lao động đang tham gia bảo hiểm thất nghiệp." Điểm c khoản 2: DN hạch toán khoản đóng BHTN vào chi phí sản xuất, kinh doanh. Điều 5: DN tuyển mới người khuyết tật được giảm phần đóng của DN từ 1% xuống 0% trong tối đa 12 tháng đầu.
- **Kết luận (gộp NC-023):**
  - Với mỗi nhân viên HĐLĐ từ đủ 1 tháng và người quản lý có hưởng lương, trên tiền lương làm căn cứ đóng BHXH:

    | Loại | DN đóng | Người lao động đóng |
    | --- | --- | --- |
    | BHXH (ốm đau thai sản 3%, hưu trí tử tuất 14% / 8%) | 17% | 8% |
    | BHYT | 3% (2/3 của 4,5%) | 1,5% (1/3 của 4,5%) |
    | BHTN | 1% | 1% |
    | Cộng (chưa gồm bảo hiểm TNLĐ-BNN) | 21% | 10,5% |

  - Người quản lý không hưởng lương: tự đóng BHXH 25% (NC-022) + BHYT 4,5% = 29,5% mức lương tự chọn làm căn cứ (tối thiểu 2.530.000 đồng/tháng từ 01/07/2026 → khoảng 746.350 đồng/tháng); không đóng BHTN.
  - Chưa xác minh: bảo hiểm tai nạn lao động – bệnh nghề nghiệp phần DN đóng (Luật An toàn, vệ sinh lao động và nghị định hướng dẫn); hạn đóng BHYT, BHTN của DN (thường đóng cùng BHXH — Luật Việc làm Điều 32 nói đăng ký "đồng bộ" với BHXH, nhưng chưa trích điều về hạn đóng). Vì vậy không ghi "tổng 21,5% / 10,5%" hay "32%".
- **Đề xuất sửa (Biên tập):**
  - Lịch "Hàng tháng" (`bat-dau.json`): dòng BHYT, BHTN đổi thành "BHYT 4,5% (DN 3%, nhân viên 1,5%); BHTN 1% mỗi bên". Ghi chú "Cộng với BHXH: DN 21%, nhân viên 10,5% tiền lương làm căn cứ đóng, chưa gồm bảo hiểm tai nạn lao động – bệnh nghề nghiệp (chưa xác minh)". Hạn đóng BHYT, BHTN: giữ todo.
  - Mục "Giám đốc không nhận lương" (`tu-0-den-1.json`): "Tự đóng BHYT 4,5% mức lương đã chọn. Cộng BHXH 25%: 29,5%, ít nhất khoảng 746.350 đồng/tháng (theo mức tham chiếu từ 01/07/2026)." Không đóng BHTN.
  - Sổ S2-DNSN (lương và bảo hiểm): có thể thêm chú thích tỷ lệ ở trang hướng dẫn.
  - `legal_basis` thêm: Nghị định 188/2025/NĐ-CP Điều 6 khoản 1 điểm a, b; Nghị định 374/2025/NĐ-CP Điều 4 khoản 1, 2, Điều 5; URL như trên; `verified_against_original: true`. Thay todo "mức đóng BHYT, BHTN cụ thể" bằng "bảo hiểm TNLĐ-BNN và hạn đóng BHYT, BHTN chưa xác minh".

### Ghi chú vòng 30 (2026-11-14, 06:18 UTC)

- Đã rà commit `3b14f11` (bổ sung 2 NC-023): ghi BHYT 4,5% (DN 3%, nhân viên 1,5%), BHTN 1% mỗi bên. Đúng đề xuất.
- Vòng này làm phần cuối NC-023: bảo hiểm tai nạn lao động – bệnh nghề nghiệp (TNLĐ-BNN), phần DN đóng.

### NC-023 (bổ sung 3) — Bảo hiểm TNLĐ-BNN: DN đóng 0,5% quỹ tiền lương làm căn cứ đóng BHXH (0,3% nếu đủ điều kiện) (Nghị định 58/2020)

- Trạng thái: đã xác minh (mức đóng theo Nghị định 58/2020); còn mở về việc văn bản này đã được thay chưa
- Nguồn: Nghị định 58/2020/NĐ-CP quy định mức đóng bảo hiểm xã hội bắt buộc vào Quỹ bảo hiểm tai nạn lao động, bệnh nghề nghiệp — trang văn bản https://vanban.chinhphu.vn/?pageid=27160&docid=200108&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2020/05/58.signed.pdf (24 trang, bản quét, đã OCR). Điều 11 khoản 1: hiệu lực từ ngày 15/7/2020. Mở ngày 2026-11-14.
- Phát hiện:
  - **Điều 4 khoản 1 (PDF trang 2):** người sử dụng lao động hằng tháng đóng trên quỹ tiền lương đóng BHXH cho người lao động (trừ người giúp việc gia đình), theo một trong các mức: "a) Mức đóng bình thường bằng 0,5% quỹ tiền lương làm căn cứ đóng bảo hiểm xã hội…; b) Mức đóng bằng 0,3% quỹ tiền lương làm căn cứ đóng bảo hiểm xã hội được áp dụng đối với doanh nghiệp bảo đảm điều kiện theo quy định tại Điều 5 của Nghị định này."
  - Điều 5: điều kiện được mức 0,3% (DN hoạt động trong ngành nghề có nguy cơ cao phải có văn bản đề xuất, báo cáo đánh giá an toàn vệ sinh lao động…; thời gian áp dụng 36 tháng). Chưa trích chi tiết.
  - Phần này chỉ DN đóng; người lao động không đóng.
- **Lưu ý:** Nghị định 58/2020 dẫn chiếu các điểm của khoản 1 Điều 2 Luật BHXH cũ (58/2014). Luật BHXH 41/2024 đã thay luật cũ từ 01/07/2025, các điểm đánh số khác. Trên vanban.chinhphu.vn (tìm theo trích yếu "Quỹ bảo hiểm tai nạn lao động") chỉ thấy 44/2017 và 58/2020; chưa thấy nghị định mới thay 58/2020. Căn cứ trực tiếp của mức đóng là Luật An toàn, vệ sinh lao động 84/2015 (chưa đọc điều về mức đóng tối đa).
- **Kết luận (gộp NC-023):** DN đóng cho mỗi nhân viên trên tiền lương làm căn cứ đóng BHXH: BHXH 17% + BHYT 3% + BHTN 1% + TNLĐ-BNN 0,5% = **21,5%** (hoặc 21,3% nếu được mức 0,3%). Nhân viên đóng 8% + 1,5% + 1% = **10,5%**. Tổng 32%.
- **Đề xuất sửa (Biên tập):**
  - Lịch "Hàng tháng" (`bat-dau.json`) và mục BHXH nhân viên: thêm dòng "Bảo hiểm tai nạn lao động – bệnh nghề nghiệp: DN đóng 0,5% (một số DN đủ điều kiện được 0,3%)". Tổng: "DN 21,5%, nhân viên 10,5% tiền lương làm căn cứ đóng BHXH." `legal_basis`: Nghị định 58/2020/NĐ-CP Điều 4 khoản 1 điểm a, b; URL https://vanban.chinhphu.vn/?pageid=27160&docid=200108&classid=1; `verified_against_original: true`. Thêm todo: "Nghị định 58/2020 dẫn chiếu Luật BHXH 58/2014; chưa thấy văn bản thay thế (tra ngày 2026-11-14); Luật An toàn, vệ sinh lao động chưa đọc."
  - Không áp dụng phần 0,5% này cho giám đốc không nhận lương (Điều 4 khoản 1 tính trên quỹ lương của người lao động ở các điểm được liệt kê; người quản lý không lương tự đóng, NC-022). Ghi todo nếu muốn chắc chắn.

### Ghi chú vòng 31 (2026-11-14, 08:17 UTC)

- Đã rà commit `3c59184` (bổ sung 3 NC-023): thêm TNLĐ-BNN 0,5%, tổng DN 21,5%. Đúng đề xuất.
- Vòng này làm NC-024 theo mục 1 README (sổ kế toán): khoản chi nào cần hóa đơn, chứng từ, thanh toán không dùng tiền mặt để được trừ khi tính TNDN và được khấu trừ thuế GTGT đầu vào. `so-ke-toan.json` dòng 267 đang có todo đúng câu hỏi này.

### NC-024 — Chi phí được trừ (TNDN) và khấu trừ thuế GTGT đầu vào: phải có hóa đơn, chứng từ; mua từ 5 triệu đồng trở lên (đã gồm GTGT) phải có chứng từ thanh toán không dùng tiền mặt (Nghị định 320/2025 Điều 9; Luật Thuế GTGT 48/2024 Điều 14; Nghị định 181/2025 Điều 26)

- Trạng thái: đã xác minh
- Liên quan: `so-ke-toan.json` (nhóm chi `expense_groups`; todo dòng 267 "khoản chi nào phải có hóa đơn, chứng từ, và điều kiện thanh toán không dùng tiền mặt"); `tu-0-den-1.json` todo dòng 458 ("Xác minh quy định về thanh toán không dùng tiền mặt"); sổ S1–S4, S07, S08 (NC-009).
- Nguồn:
  - Nghị định 320/2025/NĐ-CP — https://vanban.chinhphu.vn/?pageid=27160&docid=216219&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/12/320-ndcp.signed.pdf (bản quét, đã OCR). Mở lại 2026-11-14.
  - Luật Thuế GTGT 48/2024/QH15 — https://vanban.chinhphu.vn/?pageid=27160&docid=212476&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/01/luat48.pdf (có lớp chữ).
  - Nghị định 181/2025/NĐ-CP — https://vanban.chinhphu.vn/?pageid=27160&docid=214336&classid=1; PDF https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/181nd.signed.pdf (bản quét, đã OCR). Đã kiểm ở NC-021: Nghị định 359/2025 và 144/2026 không sửa Điều 26 (144/2026 sửa điểm g khoản 2 Điều 26 — xem lưu ý dưới).
- Phát hiện:
  - **Nghị định 320/2025, Điều 9 khoản 1 (PDF trang 21–23):** trừ các khoản ở Điều 10, DN được trừ khoản chi nếu đủ cả ba điều kiện:
    - a) "Khoản chi thực tế phát sinh liên quan đến hoạt động sản xuất, kinh doanh của doanh nghiệp";
    - b) "Khoản chi có đủ hoá đơn, chứng từ theo quy định của pháp luật." Riêng mua nông, lâm, thủy sản của người tự sản xuất bán ra; hàng thủ công; phế liệu của người thu nhặt; đồ dùng, tài sản của hộ gia đình, cá nhân; hàng hóa, dịch vụ của cá nhân, hộ kinh doanh có doanh thu dưới ngưỡng chịu GTGT: phải có chứng từ chi trả tiền và "Bảng kê thu mua hàng hóa, dịch vụ do người đại diện theo pháp luật hoặc người được ủy quyền của doanh nghiệp ký"; mua trong ngày của từng hộ, cá nhân từ 5 triệu trở lên phải thanh toán không dùng tiền mặt;
    - c) "Khoản chi có chứng từ thanh toán không dùng tiền mặt đối với trường hợp mua hàng hoá, dịch vụ và các khoản thanh toán khác từng lần có giá trị từ 05 triệu đồng trở lên."
    - Điểm c1: mua của một người bán nhiều lần trong cùng một ngày, mỗi lần dưới 5 triệu nhưng tổng từ 5 triệu trở lên, chỉ được trừ khi có chứng từ thanh toán không dùng tiền mặt.
    - Điểm c2: nhân viên được ủy quyền mua hộ, tự thanh toán không dùng tiền mặt rồi DN hoàn lại: được trừ nếu có hóa đơn, chứng từ và quy chế hoặc quyết định của DN cho phép.
    - Điểm c3: mua từ 5 triệu chưa thanh toán tại thời điểm ghi chi phí thì vẫn được trừ; khi thanh toán mà không có chứng từ không dùng tiền mặt thì phải điều chỉnh giảm chi phí vào kỳ thanh toán.
  - **Luật Thuế GTGT 48/2024, Điều 14 khoản 2 (Công báo trang 91):** điều kiện khấu trừ thuế GTGT đầu vào: "a) Có hóa đơn giá trị gia tăng mua hàng hóa, dịch vụ…; b) Có chứng từ thanh toán không dùng tiền mặt đối với hàng hóa, dịch vụ mua vào, trừ một số trường hợp đặc thù theo quy định của Chính phủ".
  - **Nghị định 181/2025, Điều 26 (PDF trang 32–33):** "Cơ sở kinh doanh phải có chứng từ thanh toán không dùng tiền mặt đối với hàng hóa, dịch vụ mua vào (bao gồm cả hàng hóa nhập khẩu) từ 05 triệu đồng trở lên đã bao gồm thuế giá trị gia tăng." Khoản 1: chứng từ thanh toán không dùng tiền mặt theo Nghị định 52/2024/NĐ-CP, "trừ các chứng từ bên mua nộp tiền mặt vào tài khoản của bên bán". Khoản 2: các trường hợp đặc thù (bù trừ công nợ, thanh toán qua bên thứ ba…) phải có hợp đồng, biên bản bù trừ.
- **Kết luận:**
  1. Ngưỡng là **5 triệu đồng trở lên** (đã gồm thuế GTGT), áp dụng cho cả chi phí được trừ TNDN và khấu trừ GTGT đầu vào. Không còn mốc 20 triệu như quy định cũ.
  2. Nộp tiền mặt vào tài khoản người bán **không** được coi là thanh toán không dùng tiền mặt (khấu trừ GTGT).
  3. Chia nhỏ hóa đơn mua của cùng người bán trong cùng ngày để né ngưỡng không có tác dụng (điểm c1).
  4. Mua của cá nhân, hộ kinh doanh nhỏ không có hóa đơn: dùng Bảng kê thu mua + chứng từ chi tiền.
- **Đề xuất sửa (Biên tập):**
  - `so-ke-toan.json`: thêm vào `notes`/`how_to_use`: "Muốn khoản chi được tính vào chi phí khi tính thuế TNDN: (1) chi cho việc kinh doanh; (2) có hóa đơn, chứng từ; (3) từ 5 triệu đồng trở lên (kể cả thuế GTGT) thì phải chuyển khoản hoặc thanh toán không dùng tiền mặt — nộp tiền mặt vào tài khoản người bán không tính. Mua của cùng người bán nhiều lần trong ngày, tổng từ 5 triệu, cũng phải chuyển khoản. Mua của người bán nhỏ không có hóa đơn: lập Bảng kê thu mua, có chữ ký người đại diện công ty."
  - Gợi ý cho sổ Excel (theo hướng README "sổ thực tế, linh hoạt"): thêm cột "Có hóa đơn?" và cảnh báo khi dòng chi từ 5.000.000 đồng trở lên ghi quỹ "Tiền mặt" (có thể bị loại khỏi chi phí và không được khấu trừ GTGT). Đây là tính năng nhỏ trong sổ; nếu cần đổi cấu trúc thì ghi "Cần chủ dự án quyết".
  - `tu-0-den-1.json` todo dòng 458: thay bằng kết luận trên. `legal_basis`: Nghị định 320/2025/NĐ-CP Điều 9 khoản 1 điểm a, b, c (c1, c2, c3); Luật Thuế GTGT 48/2024/QH15 Điều 14 khoản 2; Nghị định 181/2025/NĐ-CP Điều 26 câu dẫn, khoản 1, 2; URL như trên; `verified_against_original: true`.
  - Lưu ý: Nghị định 144/2026 có sửa điểm g khoản 2 Điều 26 Nghị định 181/2025 (một trường hợp đặc thù). Chưa đọc điểm này; không ảnh hưởng ngưỡng 5 triệu ở câu dẫn Điều 26.
  - Chưa đọc Điều 10 Nghị định 320/2025 (các khoản chi không được trừ) — vòng sau.

## Cần chủ dự án quyết

- Mạng của môi trường "trang" chặn các máy chủ chứa toàn văn PDF: `datafiles.chinhphu.vn` (PDF của vanban.chinhphu.vn), `congbaocdn.chinhphu.vn` và `g7.cdnchinhphu.vn` (PDF của Công báo). Không có các máy chủ này thì agent Nghiên cứu không trích được điều, khoản, nên không mục nào lên được "đã xác minh". Đề xuất: thêm ba tên miền này vào danh sách cho phép của môi trường. Chúng chỉ là nơi lưu file của hai cổng đã có trong `official_sources.json`; URL dẫn nguồn trong nội dung vẫn dùng trang vanban.chinhphu.vn hoặc congbao.chinhphu.vn.
- Tên miền con của `mof.gov.vn` (`vbpq.mof.gov.vn`, `portal.mof.gov.vn`) cũng bị chặn, dù `official_sources.json` cho phép. Nếu muốn dùng mục Hỏi đáp chính sách của Bộ Tài chính thì cần mở thêm.
- `vbpl.moj.gov.vn` trả lỗi 502 ở vòng 1–8. Sẽ thử lại vòng sau.
- Nhắc lại (vòng 2): chưa mở mạng thì các vòng sau chỉ xác nhận được số hiệu, ngày hiệu lực. Câu hỏi then chốt NC-001 và mâu thuẫn thuế suất (NC-004) không giải được.
- (Vòng 5) Có chấp nhận trang thông tin văn bản trên vanban.chinhphu.vn (số hiệu, ngày ban hành, ngày hiệu lực) làm căn cứ để sửa các trường `number`, `effective_from` không? Nếu có, agent Biên tập sửa được ngay các ngày lệch như 130/2018 (NC-008) mà không cần chờ đọc toàn văn. Nội dung nghĩa vụ, hạn, mức phạt vẫn phải có điều, khoản.
- (Vòng 8) Hai agent chạy 2 giờ một lần nhưng không còn việc làm được khi chưa có toàn văn. Đề xuất tạm giãn hoặc tắt hai lịch chạy tới khi quyết hai mục trên.
- (Vòng 9) NC-001: theo Luật Kế toán Điều 51, 52 và Nghị định 174/2016 Điều 18–22, giám đốc DN siêu nhỏ không bị cấm làm kế toán, nhưng phải có bằng hoặc chứng chỉ kế toán; người phụ trách kế toán còn cần chứng chỉ bồi dưỡng kế toán trưởng và 2–3 năm kinh nghiệm. Người dùng chính (chủ DN không có chuyên môn kế toán) có thể không đủ điều kiện tự đứng tên phụ trách kế toán. Cần chủ dự án quyết: có điều chỉnh định hướng "tự làm trọn vẹn, không cần thuê kế toán ngoài" trong AGENTS.md không (ví dụ: tự làm việc hằng ngày, thuê dịch vụ phụ trách kế toán nếu chưa đủ điều kiện).
