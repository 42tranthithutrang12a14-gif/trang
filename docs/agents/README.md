# Hai agent làm việc liên tục

Hai phiên Claude chạy song song trên nhánh `claude/eager-archimedes-kdz3e4`, theo lịch định kỳ. Chúng trao đổi qua hai file trong thư mục này.

## Vai trò

| Agent | Làm gì | Được ghi |
| --- | --- | --- |
| Nghiên cứu | Tra văn bản gốc trên cổng chính thức, rà soát nội dung, giao diện và thay đổi mới của agent Biên tập, đề xuất sửa | Chỉ `docs/agents/nghien-cuu.md` |
| Biên tập | Đưa kết quả nghiên cứu vào hệ thống (sổ kế toán, hướng dẫn thao tác, lộ trình, nội dung), giữ test/lint/build không thêm lỗi | `src/`, `tests/`, `public/thao-tac/`, `docs/agents/bien-tap.md` |

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
4. Không đánh bóng câu chữ chi tiết. Ưu tiên lấp nội dung vào hệ thống: sổ kế toán, hướng dẫn thao tác, lộ trình. Việc lớn ngoài các phần đó (tính năng mới, đổi cấu trúc dữ liệu) thì không làm, ghi vào mục "Cần chủ dự án quyết".
5. Chạy `npm test`, `npm run lint`, `npm run build`. Không thêm lỗi mới so với hiện trạng.
6. Ghi nhật ký vào `bien-tap.md`: mã NC đã làm và commit, việc bỏ qua kèm lý do, câu hỏi cho agent Nghiên cứu.
7. Commit riêng, `git pull --rebase`, push.

## Thứ tự ưu tiên

1. **Sổ kế toán thực tế và đúng luật** (`src/content/so-ke-toan.json`, file Excel tải ở trang `/cong-cu`):
   - Đọc toàn văn Thông tư 132/2018/TT-BTC (phụ lục danh mục và mẫu sổ cho DN siêu nhỏ), kiểm tra còn hiệu lực hay đã có văn bản thay thế. Ghi đặc tả: tên sổ, mã mẫu, các cột, cách ghi.
   - Nghiên cứu tính thực tế, linh hoạt: nhóm thu, nhóm chi chi tiết mà DN siêu nhỏ thật sự cần; khoản chi nào cần hóa đơn, chứng từ để được tính vào chi phí; thuế GTGT đầu ra, đầu vào; tiền mặt và chuyển khoản. Mẫu nhà nước có thể không đủ chi tiết: người dùng ghi chi tiết ở "Nhật ký thu chi", các sổ theo mẫu lấy ra từ đó.
2. **Hướng dẫn thao tác trên mạng, cầm tay chỉ việc từng cú nhấp chuột, có ảnh** (`src/content/thao-tac.json`, ảnh trong `public/thao-tac/`):
   - Tìm tài liệu hướng dẫn sử dụng chính thức của từng cổng (đăng ký doanh nghiệp, thuế điện tử, hóa đơn điện tử, BHXH, dịch vụ công).
   - Ghi từng bước: bấm vào đâu, nhập gì, màn hình hiện gì. Chụp ảnh các trang công khai (không đăng nhập) nếu chạy được mà không cần duyệt quyền; nếu không, ghi tên tài liệu, số trang, số hình trong tài liệu chính thức. Không vẽ giao diện giả.
3. Câu hỏi then chốt NC-001: chủ DN siêu nhỏ có được tự làm kế toán cho công ty mình không, cần điều kiện gì.
4. Nội dung trang `/lo-trinh`: việc phải làm ở từng giai đoạn, đối chiếu hướng dẫn chính thức.
5. Các điểm nghi lỗi thời và mâu thuẫn đã ghi trong todo: chỉ làm khi ảnh hưởng tới 4 mục trên.

## Quy tắc chung

- Vòng nào không có việc thì không commit, không push. Không cần ghi nhật ký cho vòng trống.
- Không chạy lệnh cần người duyệt quyền: không có ai trực để duyệt, phiên sẽ treo. Nếu một việc cần lệnh đó, ghi vào "Cần chủ dự án quyết" rồi làm việc khác.

## Trao đổi

- Tài liệu: mỗi agent chỉ ghi file của mình và đọc file của agent kia.
- Tin nhắn: khi có việc gấp cho agent kia, gửi một tin ngắn (send_message tới mã phiên ở mục "Phiên"), chỉ rõ mục trong file. Lượt nào bắt đầu từ một tin nhắn thì không gửi tin nhắn đáp lại, để tránh hai agent nhắn qua lại không dừng.

## Hệ thống cho người mới (dựng ngày 2026-11-12)

| Phần | Trang | Nội dung | Code |
| --- | --- | --- | --- |
| Lộ trình | `/lo-trinh` | `src/content/lo-trinh.json` (giai đoạn, việc định kỳ); việc của 2 giai đoạn đầu lấy từ `tu-0-den-1.json` | `src/lib/lo-trinh.ts`, `src/app/(public)/lo-trinh/` |
| Sổ thu chi Excel | `/cong-cu`, tải ở `/tai-ve/so-thu-chi.xlsx` | `src/content/so-ke-toan.json` (nhóm thu chi, cách dùng, ví dụ) | `src/lib/so-ke-toan.ts` (dựng 4 trang bằng exceljs) |
| Thao tác từng cú nhấp chuột | `/thao-tac/<slug>` | `src/content/thao-tac.json`, ảnh trong `public/thao-tac/<slug>/` | `src/lib/thao-tac.ts`, `src/app/(public)/thao-tac/` |

Mọi nội dung mới đều là "draft". Sửa nội dung thì sửa file JSON; chỉ sửa code khi cần thêm cột, thêm trang sổ.

### Sổ thu chi

- Người dùng ghi chi tiết ở trang "Nhật ký thu chi". Trang "Tổng hợp" tự tính. Sổ theo mẫu nhà nước (khi nghiên cứu xong) là các trang thêm vào, lấy số từ nhật ký; không thay nhật ký.
- Đổi tên nhóm, thêm nhóm, sửa cách dùng: sửa `so-ke-toan.json`.
- Sau khi sửa `src/lib/so-ke-toan.ts`: chạy `npm run tao-so -- <đường dẫn>.xlsx`, mở file bằng LibreOffice không giao diện để tính lại, và kiểm tra không có ô lỗi (`#REF!`, `#NAME?`, `#VALUE!`). Điền vài dòng thử và so số ở trang "Tổng hợp" với số tự tính. Ghi cách đã kiểm vào nhật ký.

### Ảnh minh họa cho thao tác

- Chụp trang công khai: `npm run chup -- <https://...> public/thao-tac/<slug>/<tên>.png [--rong 1280] [--cao 800] [--ca-trang]`. Lệnh in ra `image`, `image_width`, `image_height` để chép vào bước tương ứng trong `thao-tac.json`, kèm `image_alt` và `source` (ghi ngày chụp).
- Chỉ chụp trang công khai, không đăng nhập, không nhập thông tin cá nhân. Không vẽ giao diện giả.
- Nếu lệnh chụp đòi duyệt quyền hoặc cổng chặn: không thử lại nhiều lần. Ghi tên tài liệu hướng dẫn chính thức (trang, hình) vào `source` và ghi vào "Cần chủ dự án quyết".

## Hiện trạng đã biết

- `npm test`: 82/82 qua.
- `npm run lint`: 15 vấn đề có sẵn (6 lỗi ở dieu-khoan, ket-qua, kham, rieng-tu).
- Mạng của môi trường "trang" mở các cổng chính thức trong `src/content/official_sources.json`. Trang ngoài danh sách sẽ bị chặn. `thuedientu.gdt.gov.vn` và `hoadondientu.gdt.gov.vn` chưa được mở.

## Quyết định của chủ dự án

- 2026-11-12: đồng ý sửa T25. Đã sửa trong phiên chính. Agent Biên tập bỏ mục T25 khỏi "Cần chủ dự án quyết".
- 2026-11-12: chủ dự án đã mở mạng cho `datafiles.chinhphu.vn`, `congbaocdn.chinhphu.vn`, `g7.cdnchinhphu.vn`, `vbpq.mof.gov.vn`, `portal.mof.gov.vn`. Agent Nghiên cứu làm tiếp NC-001 rồi các mục khác bằng toàn văn.
- 2026-11-12: đồng ý lấy trang thông tin văn bản trên vanban.chinhphu.vn làm căn cứ để sửa số hiệu (`number`) và ngày hiệu lực (`effective_from`). Khi sửa: ghi link và ngày tra vào todo, status vẫn "draft". Điều này không đủ để đặt `verified_against_original: true`, và không áp dụng cho nghĩa vụ, hạn, mức phạt: những nội dung đó vẫn phải trích được điều, khoản trong toàn văn. Agent Biên tập sửa được ngay ngày hiệu lực Nghị định 130/2018/NĐ-CP (NC-008).
- 2026-11-12: không chỉnh sửa chi tiết nữa; xây hệ thống trước, hoàn thiện sau. Hệ thống gồm: trang `/lo-trinh` (chỗ bắt đầu duy nhất, chỉ ra việc tiếp theo), trang `/cong-cu` (sổ kế toán Excel dùng ngay), các trang `/thao-tac/...` (thao tác trên mạng từng cú nhấp chuột). Sổ kế toán phải thực tế, linh hoạt, phân loại chi tiết, không chỉ đúng mẫu nhà nước. Thao tác trên mạng phải có hình minh họa.

## Phiên

- Agent Nghiên cứu: `session_01AGVBxq4xx5tu4Y3hrF8yi3`
- Agent Biên tập: `session_01AGVBxrReB9co2B9Rmtgujm`
- Lịch chạy: Nghiên cứu vào phút 17 các giờ chẵn (giờ UTC), Biên tập vào phút 17 các giờ lẻ. Hai agent xen kẽ, mỗi agent cách nhau 2 tiếng.

## Dừng

Chủ dự án nói "dừng agent" trong phiên chính, hoặc tắt hai lịch chạy (scheduled tasks) trong claude.ai.
