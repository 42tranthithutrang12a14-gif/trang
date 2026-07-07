import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { updateProduct, deleteProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId }, include: { images: true } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, productId);
  const deleteWithId = deleteProduct.bind(null, productId);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground">Sửa sản phẩm</h1>

      <form action={updateWithId} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Tên sản phẩm
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={product.name}
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
            defaultValue={product.categoryId}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
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
            defaultValue={product.description}
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
            defaultValue={product.price ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product.featured}
            className="h-4 w-4 rounded border-border"
          />
          Hiển thị ở mục &quot;Sản phẩm nổi bật&quot; trên trang chủ
        </label>

        {product.images.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground">Ảnh hiện tại</p>
            <div className="mt-2 grid grid-cols-4 gap-3">
              {product.images.map((img) => (
                <label key={img.id} className="group relative block">
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-background">
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </div>
                  <span className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <input type="checkbox" name="removeImages" value={img.id} />
                    Xoá
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="images" className="text-sm font-medium text-foreground">
            Thêm ảnh mới
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
            Lưu thay đổi
          </button>
          <a
            href="/admin"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
          >
            Huỷ
          </a>
        </div>
      </form>

      <form action={deleteWithId} className="mt-8 border-t border-border pt-6">
        <ConfirmSubmitButton
          confirmMessage={`Xoá sản phẩm "${product.name}"? Hành động này không thể hoàn tác.`}
          className="rounded-full border border-red-200 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Xoá sản phẩm này
        </ConfirmSubmitButton>
      </form>
    </div>
  );
}
