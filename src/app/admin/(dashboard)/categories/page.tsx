import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { createCategory, deleteCategory } from "./actions";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Danh mục</h1>

      {error === "has-products" && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          Không thể xoá danh mục còn sản phẩm. Hãy chuyển hoặc xoá hết sản phẩm trong danh mục
          này trước.
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Ảnh</th>
              <th className="px-4 py-3 font-medium">Tên danh mục</th>
              <th className="px-4 py-3 font-medium">Số sản phẩm</th>
              <th className="px-4 py-3 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const deleteWithId = deleteCategory.bind(null, category.id);
              return (
                <tr key={category.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-background">
                      <Image
                        src={category.image ?? "/placeholders/vat-lieu-xay-dung.svg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{category.name}</td>
                  <td className="px-4 py-3 text-muted">{category._count.products}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="text-accent hover:underline"
                      >
                        Sửa
                      </Link>
                      <form action={deleteWithId}>
                        <ConfirmSubmitButton
                          confirmMessage={`Xoá danh mục "${category.name}"?`}
                          className="text-red-600 hover:underline"
                        >
                          Xoá
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-10 max-w-md">
        <h2 className="text-lg font-semibold text-foreground">Thêm danh mục</h2>
        <form action={createCategory} className="mt-4 flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Tên danh mục
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="image" className="text-sm font-medium text-foreground">
              Ảnh đại diện
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-1.5 file:text-sm file:text-white"
            />
          </div>
          <button
            type="submit"
            className="self-start rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Thêm danh mục
          </button>
        </form>
      </div>
    </div>
  );
}
