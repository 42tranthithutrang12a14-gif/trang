# Website công ty VLXD / Gạch lát / Xây dựng sửa chữa

Website giới thiệu công ty + sản phẩm (gạch lát, vật liệu xây dựng, thiết bị vệ sinh, thiết bị
ống nước) và dịch vụ xây dựng/sửa chữa, có trang quản trị riêng để tự thêm/sửa/xoá sản phẩm,
danh mục và ảnh mà không cần đụng vào code.

Xây bằng Next.js 16 (App Router) + TypeScript + Tailwind CSS + Prisma/SQLite.

## Chạy thử ở máy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem trang web.
Trang quản trị ở [http://localhost:3000/admin](http://localhost:3000/admin).

Tài khoản admin mặc định (chỉ dùng để chạy thử ở local, **đổi trước khi đưa lên mạng thật**):

- Tên đăng nhập: `admin`
- Mật khẩu: `admin123`

## Đổi thông tin công ty

Đăng nhập `/admin`, vào mục **Cài đặt** để tự điền: logo, tên công ty, tên hiển thị, khẩu hiệu,
địa chỉ, số điện thoại, email, mã số thuế, người đại diện, ngành nghề kinh doanh. Lưu lại là toàn
bộ trang web (trang chủ, giới thiệu, liên hệ, đầu trang, chân trang) cập nhật ngay lập tức — không
cần sửa code.

## Đổi mật khẩu admin

1. Chạy lệnh sau với mật khẩu mới của bạn:

   ```bash
   npm run hash-password -- "mat-khau-moi-cua-ban"
   ```

2. Lệnh sẽ in ra một dòng dạng `ADMIN_PASSWORD_HASH="..."`. Copy dòng đó, dán đè vào file `.env`
   (thay cho dòng `ADMIN_PASSWORD_HASH` cũ). Có thể đổi luôn `ADMIN_USERNAME` nếu muốn.
3. Khởi động lại `npm run dev` (hoặc redeploy nếu đang chạy trên server) để áp dụng.

> Lưu ý: các dấu `$` trong chuỗi hash phải được escape thành `\$` trong file `.env`, script
> `hash-password` đã tự làm việc này giúp bạn — chỉ cần copy nguyên dòng in ra, không tự gõ lại.

## Quản lý nội dung

Sau khi đăng nhập `/admin`:

- **Sản phẩm**: xem danh sách, thêm mới, sửa (tên, danh mục, mô tả, giá, ảnh), xoá.
- **Danh mục**: xem danh sách, thêm mới, sửa tên/ảnh đại diện, xoá (không xoá được danh mục còn
  sản phẩm bên trong — phải chuyển hoặc xoá hết sản phẩm trước).
- **Dịch vụ**: xem danh sách, thêm mới, sửa, xoá (hiển thị ở trang "Dịch vụ").
- **Cài đặt**: sửa toàn bộ thông tin công ty (xem mục trên).
- Bỏ trống ô "Giá" nếu muốn sản phẩm hiển thị chữ "Liên hệ" thay vì giá cụ thể.
- Ảnh sản phẩm/danh mục được lưu trong thư mục `public/uploads/`.

## Dữ liệu mẫu

Dự án có sẵn thông tin công ty (placeholder), 4 danh mục, một số sản phẩm mẫu (dùng ảnh
placeholder) và 6 dịch vụ mẫu để bạn hình dung giao diện. Xoá/sửa dần qua trang quản trị, hoặc
chạy lại lệnh sau để nạp lại dữ liệu mẫu ban đầu (**sẽ xoá hết dữ liệu và cài đặt hiện có, kể cả
thông tin công ty đã tự điền**):

```bash
npx prisma db seed
```

## Build production

```bash
npm run build
npm run start
```

## Triển khai (deploy)

Trang web dùng SQLite (file `dev.db`) và lưu ảnh trực tiếp vào thư mục `public/uploads/` trên ổ
đĩa server. Vì vậy nên chọn nơi host có **ổ đĩa cố định (persistent disk)**, ví dụ:

- Một VPS chạy Node.js (DigitalOcean, Vultr, AWS Lightsail...)
- Render.com hoặc Railway.app (dùng persistent disk/volume)

**Không nên deploy lên Vercel** ở dạng hiện tại — Vercel chạy serverless, ổ đĩa không được giữ
lại giữa các lần chạy, nên dữ liệu SQLite và ảnh upload sẽ bị mất. Nếu sau này muốn deploy lên
Vercel, cần đổi sang database hosted (ví dụ Postgres của Neon/Supabase) và nơi lưu ảnh riêng (ví
dụ Vercel Blob hoặc Cloudinary) — Prisma giúp việc đổi database chỉ là đổi connection string,
không cần viết lại code.

Trước khi deploy, nhớ:

1. Đổi mật khẩu admin (xem mục ở trên).
2. Đổi `SESSION_SECRET` trong `.env` thành một chuỗi ngẫu nhiên khác (không dùng chung với local).
3. Vào `/admin` → **Cài đặt** để điền thông tin công ty thật.

## Cấu trúc thư mục chính

```
prisma/schema.prisma        Định nghĩa dữ liệu (Settings, Service, Category, Product, ProductImage)
prisma/seed.ts               Dữ liệu mẫu
src/app/(public)/            Các trang công khai: trang chủ, sản phẩm, dịch vụ, giới thiệu, liên hệ
src/app/admin/                Trang quản trị (đăng nhập, dashboard, CRUD sản phẩm/danh mục/dịch vụ/cài đặt)
src/lib/settings.ts          Đọc thông tin công ty từ database (sửa qua /admin/settings, không sửa file này)
src/lib/auth.ts                Đăng nhập/phiên đăng nhập admin
src/proxy.ts                    Chặn truy cập /admin khi chưa đăng nhập
public/uploads/                Ảnh sản phẩm/danh mục do admin tải lên
```
