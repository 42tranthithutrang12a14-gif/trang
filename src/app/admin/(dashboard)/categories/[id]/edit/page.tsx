import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateCategory } from "../../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryId = Number(id);

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) notFound();

  const updateWithId = updateCategory.bind(null, categoryId);

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold text-foreground">Sửa danh mục</h1>

      <form action={updateWithId} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Tên danh mục
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={category.name}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Ảnh hiện tại</p>
          <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-xl border border-border bg-background">
            <Image
              src={category.image ?? "/placeholders/vat-lieu-xay-dung.svg"}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="text-sm font-medium text-foreground">
            Đổi ảnh (bỏ trống nếu giữ nguyên)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
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
            href="/admin/categories"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
          >
            Huỷ
          </a>
        </div>
      </form>
    </div>
  );
}
