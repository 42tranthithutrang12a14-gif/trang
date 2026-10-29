<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Định hướng sản phẩm: Sổ tay DN Siêu nhỏ

- Người dùng chính là chủ doanh nghiệp siêu nhỏ tự làm kế toán, thuế và thủ tục cho công ty của mình.
- Mục tiêu: người dùng tự làm được trọn vẹn, không cần thuê kế toán ngoài. Nội dung viết theo kiểu hướng dẫn tự làm, từng bước.
- Chỉ nhắc tới kế toán, luật sư để tham khảo, hoặc ở những phần đặc biệt quan trọng, rủi ro cao. Khi nhắc thì nói rõ vì sao.

# Hiển thị nội dung nháp

- Nội dung có status khác "published" hiện kèm nhãn "MẪU – CHƯA XÁC MINH" ở máy local và bản xem thử Vercel, bị ẩn trên bản production. Quy tắc nằm ở `src/lib/content/preview.ts`; trang nào cần thì import `CONTENT_PREVIEW` từ đó.
- `NEXT_PUBLIC_CONTENT_PREVIEW="true"` để hiện cả trên production, `"false"` để luôn ẩn.
