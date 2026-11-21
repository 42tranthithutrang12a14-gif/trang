<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Định hướng sản phẩm: Sổ tay DN Siêu nhỏ

- Người dùng chính là chủ doanh nghiệp siêu nhỏ tự làm kế toán, thuế và thủ tục cho công ty của mình.
- Mục tiêu: người dùng tự làm được trọn vẹn, không cần thuê kế toán ngoài. Nội dung viết theo kiểu hướng dẫn tự làm, từng bước.
- Chỉ nhắc tới kế toán, luật sư để tham khảo, hoặc ở những phần đặc biệt quan trọng, rủi ro cao. Khi nhắc thì nói rõ vì sao.

# Nguyên tắc bắt buộc (do chủ dự án đặt)

1. Không bịa nội dung pháp lý. Mục nội dung mới hoặc chuyển đi phải có status "draft" và sample_notice "MẪU – CHƯA XÁC MINH".
2. `legal_basis[].url` chỉ dùng nguồn qua được `isOfficialSourceUrl()` (`src/lib/content/validate-source.ts`, danh sách ở `src/content/official_sources.json`).
3. Chỉ đặt `verified_against_original: true` khi đã thật sự mở văn bản gốc và đối chiếu đúng điều, khoản. Không tự chuyển status sang "published".
4. Chỗ nào không chắc (hạn, đối tượng, mức phạt, văn bản còn hiệu lực không) thì ghi vào `todo_for_reviewer`, đừng đoán.
5. Số hiệu văn bản lấy từ báo chí hoặc từ trí nhớ của AI có thể sai; chỉ là điểm bắt đầu tra cứu.
6. Không viết như tư vấn thuế hay pháp lý. Giữ các trang miễn trừ hiện có. Chữ trên giao diện bằng tiếng Việt, câu ngắn.
7. Không làm hỏng tính năng đang có. Chạy `npm test`, `npm run lint`, `npm run build`. Thiếu biến môi trường thì báo cáo, không tạo giá trị giả.
8. Commit riêng, message rõ ràng. Không merge vào master, không deploy production.
9. Bật Row Level Security cho mọi bảng Supabase. Không đặt khóa service_role trong code chạy trên trình duyệt. Không thu thập mật khẩu ngân hàng, số CCCD hay thông tin thẻ.
10. README.md và các model Prisma cũ thuộc dự án website vật liệu xây dựng; không xóa phần cũ.

# Hai agent làm việc liên tục

Vai trò, quy trình một vòng và file trao đổi: xem `docs/agents/README.md`.

# Hiển thị nội dung nháp

- Nội dung có status khác "published" hiện kèm nhãn "MẪU – CHƯA XÁC MINH" ở máy local và bản xem thử Vercel, bị ẩn trên bản production. Quy tắc nằm ở `src/lib/content/preview.ts`; trang nào cần thì import `CONTENT_PREVIEW` từ đó.
- `NEXT_PUBLIC_CONTENT_PREVIEW="true"` để hiện cả trên production, `"false"` để luôn ẩn.
