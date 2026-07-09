import { prisma } from "@/lib/db";
import { createProduct } from "../actions";
import { buildCategoryTree, flattenWithDepth } from "@/lib/categories";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
  const flatCategories = flattenWithDepth(buildCategoryTree(categories));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground">Thêm sản phẩm</h1>

      <form action={createProduct} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Tên sản phẩm
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="text-sm font-medium text-foreground">
            Danh mục
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {flatCategories.map(({ category, depth }) => (
              <option key={category.id} value={category.id}>
                {"— ".repeat(depth)}
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium text-foreground">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="price" className="text-sm font-medium text-foreground">
            Giá (để trống nếu muốn hiện &quot;Liên hệ&quot;)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={1000}
            placeholder="VD: 150000"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="stock" className="text-sm font-medium text-foreground">
            Số lượng tồn kho
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="showStock" className="h-4 w-4 rounded border-border" />
          Hiển thị số lượng tồn kho công khai cho khách xem (không tick thì khách không thấy gì
          về tồn kho)
        </label>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" />
          Hiển thị ở mục &quot;Sản phẩm nổi bật&quot; trên trang chủ
        </label>

        <div>
          <label htmlFor="images" className="text-sm font-medium text-foreground">
            Hình ảnh
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-1.5 file:text-sm file:text-white"
          />
        </div>

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Lưu sản phẩm
          </button>
          <a
            href="/admin"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
          >
            Huỷ
          </a>
        </div>
      </form>
    </div>
  );
}
