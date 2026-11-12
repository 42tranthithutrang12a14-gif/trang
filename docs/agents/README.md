# Hai agent làm việc liên tục

Hai phiên Claude chạy song song trên nhánh `claude/eager-archimedes-kdz3e4`, theo lịch định kỳ. Chúng trao đổi qua hai file trong thư mục này.

## Vai trò

| Agent | Làm gì | Được ghi |
| --- | --- | --- |
| Nghiên cứu | Tra văn bản gốc trên cổng chính thức, rà soát nội dung, giao diện và thay đổi mới của agent Biên tập, đề xuất sửa | Chỉ `docs/agents/nghien-cuu.md` |
| Biên tập | Áp dụng đề xuất đã có nguồn vào `src/`, hoàn thiện câu chữ, giữ test/lint/build không thêm lỗi | `src/`, `tests/`, `docs/agents/bien-tap.md` |

Không agent nào sửa file của agent kia.

## Một vòng của agent Nghiên cứu

1. `git pull origin claude/eager-archimedes-kdz3e4`.
2. Đọc `bien-tap.md`: việc vừa làm, câu hỏi gửi sang.
3. Rà các commit của agent Biên tập từ vòng trước: tìm sai sót, nội dung thiếu nguồn.
4. Chọn 1–3 việc ưu tiên nhất (xem thứ tự bên dưới). Mở văn bản gốc trên cổng chính thức.
5. Ghi kết quả vào `nghien-cuu.md` theo mẫu trong file.
6. Commit riêng file đó, `git pull --rebase`, push.

## Một vòng của agent Biên tập

1. `git pull origin claude/eager-archimedes-kdz3e4`.
2. Đọc `nghien-cuu.md`: các mục "mới" hoặc "đã xác minh" chưa xử lý.
3. Áp dụng từng mục:
   - Chỉ sửa nội dung pháp lý khi mục đó có nguồn chính thức đã mở và trích đúng điều, khoản.
   - Điền `legal_basis` (url chính thức, điều, khoản, `checked_at`, `verified_against_original: true`), rồi cập nhật hoặc bỏ todo tương ứng.
   - Giữ status "draft". Không bao giờ tự chuyển sang "published".
4. Được tự hoàn thiện câu chữ, sửa lỗi nhỏ, theo `AGENTS.md`. Việc lớn (tính năng mới, đổi cấu trúc dữ liệu) thì không làm, ghi vào mục "Cần chủ dự án quyết".
5. Chạy `npm test`, `npm run lint`, `npm run build`. Không thêm lỗi mới so với hiện trạng.
6. Ghi nhật ký vào `bien-tap.md`: mã NC đã làm và commit, việc bỏ qua kèm lý do, câu hỏi cho agent Nghiên cứu.
7. Commit riêng, `git pull --rebase`, push.

## Thứ tự ưu tiên

1. Câu hỏi then chốt: chủ doanh nghiệp siêu nhỏ có được tự làm kế toán cho công ty mình không, cần điều kiện gì.
2. Các điểm nghi lỗi thời: lệ phí môn bài (Nghị quyết 198/2025/QH15), Thông tư 132/2018 và 58/2026, Nghị định 123/2020 và 254/2026, mức phạt chậm nộp tờ khai (Nghị định 125/2020), tên cơ quan đăng ký kinh doanh cấp tỉnh, thời hạn đăng ký thay đổi.
3. Các mâu thuẫn trong app: hạn khai GTGT quý ("ngày 30" hay cuối tháng), thuế suất TNDN cho DN siêu nhỏ (20% hay 15–17%), "10 ngày" hay "10 ngày làm việc".
4. Các `todo_for_reviewer` còn lại trong `src/content/`.
5. Hoàn thiện hướng dẫn tự làm kế toán từng bước, đúng định hướng trong `AGENTS.md`.
6. Khi các mục trên đều đang chờ (mạng, quyết định của chủ dự án): rà chữ hiển thị trên các trang (lỗi chính tả, câu dài, câu khó hiểu, chỗ lặp, chỗ không khớp giữa các trang) và đề xuất sửa không đổi nghĩa pháp lý. Tối đa 3 đề xuất mỗi vòng.

## Quy tắc chung

- Vòng nào không có việc thì không commit, không push. Không cần ghi nhật ký cho vòng trống.
- Không chạy lệnh cần người duyệt quyền: không có ai trực để duyệt, phiên sẽ treo. Nếu một việc cần lệnh đó, ghi vào "Cần chủ dự án quyết" rồi làm việc khác.

## Trao đổi

- Tài liệu: mỗi agent chỉ ghi file của mình và đọc file của agent kia.
- Tin nhắn: khi có việc gấp cho agent kia, gửi một tin ngắn (send_message tới mã phiên ở mục "Phiên"), chỉ rõ mục trong file. Lượt nào bắt đầu từ một tin nhắn thì không gửi tin nhắn đáp lại, để tránh hai agent nhắn qua lại không dừng.

## Hiện trạng đã biết

- `npm test`: 59/59 qua (T25 đã sửa ngày 2026-11-12).
- `npm run lint`: 15 vấn đề có sẵn (6 lỗi ở dieu-khoan, ket-qua, kham, rieng-tu).
- Mạng của môi trường "trang" mở các cổng chính thức trong `src/content/official_sources.json`. Trang ngoài danh sách sẽ bị chặn.

## Quyết định của chủ dự án

- 2026-11-12: đồng ý sửa T25. Đã sửa trong phiên chính. Agent Biên tập bỏ mục T25 khỏi "Cần chủ dự án quyết".
- 2026-11-12: đã nhờ chủ dự án thêm vào mạng của môi trường "trang": `datafiles.chinhphu.vn`, `congbaocdn.chinhphu.vn`, `g7.cdnchinhphu.vn`, `vbpq.mof.gov.vn`, `portal.mof.gov.vn`. Mỗi vòng thử lại; mở được thì làm tiếp NC-001.
- Đang chờ trả lời: có lấy trang thông tin văn bản trên vanban.chinhphu.vn (số hiệu, ngày ban hành, ngày hiệu lực) làm căn cứ để sửa `number`, `effective_from` không. Chưa có trả lời thì chưa sửa.

## Phiên

- Agent Nghiên cứu: `session_01AGVBxq4xx5tu4Y3hrF8yi3`
- Agent Biên tập: `session_01AGVBxrReB9co2B9Rmtgujm`
- Lịch chạy: Nghiên cứu vào phút 17 các giờ chẵn (giờ UTC), Biên tập vào phút 17 các giờ lẻ. Hai agent xen kẽ, mỗi agent cách nhau 2 tiếng.

## Dừng

Chủ dự án nói "dừng agent" trong phiên chính, hoặc tắt hai lịch chạy (scheduled tasks) trong claude.ai.
