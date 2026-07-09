import Link from "next/link";
import type { Metadata } from "next";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { buildCategoryTree, getDescendantIds } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Sản phẩm",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ "danh-muc"?: string; q?: string }>;
}) {
  const { "danh-muc": categorySlug, q } = await searchParams;
  const query = q?.trim();

  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
  const activeCategory = categories.find((c) => c.slug === categorySlug);

  const where: Prisma.ProductWhereInput = {};
  if (activeCategory) {
    where.categoryId = { in: getDescendantIds(activeCategory.id, categories) };
  }
  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { images: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  const topLevelCategories = buildCategoryTree(categories);
  const subCategories = activeCategory
    ? categories.filter((c) => c.parentId === activeCategory.id)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Sản phẩm</h1>
      <p className="mt-2 text-muted">
        {activeCategory
          ? `Đang xem: ${activeCategory.name}`
          : "Gạch lát, vật liệu xây dựng, thiết bị vệ sinh và thiết bị ống nước."}
      </p>

      <form action="/san-pham" method="get" className="mt-6 flex max-w-md gap-2">
        {categorySlug && <input type="hidden" name="danh-muc" value={categorySlug} />}
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Tìm sản phẩm theo tên..."
          className="w-full rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Tìm
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={query ? `/san-pham?q=${encodeURIComponent(query)}` : "/san-pham"}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            !categorySlug
              ? "border-accent bg-accent text-white"
              : "border-border text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          Tất cả
        </Link>
        {topLevelCategories.map((category) => {
          const isActive =
            activeCategory !== undefined &&
            getDescendantIds(category.id, categories).includes(activeCategory.id);
          return (
            <Link
              key={category.id}
              href={`/san-pham?danh-muc=${category.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-border text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>

      {subCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {subCategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/san-pham?danh-muc=${sub.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          {query ? `Không tìm thấy sản phẩm nào cho "${query}".` : "Chưa có sản phẩm nào trong danh mục này."}
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
