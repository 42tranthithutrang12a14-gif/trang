import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Sản phẩm",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ "danh-muc"?: string }>;
}) {
  const { "danh-muc": categorySlug } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.product.findMany({
      where: categorySlug ? { category: { slug: categorySlug } } : undefined,
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Sản phẩm</h1>
      <p className="mt-2 text-muted">
        {activeCategory
          ? `Đang xem: ${activeCategory.name}`
          : "Gạch lát, vật liệu xây dựng, thiết bị vệ sinh và thiết bị ống nước."}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/san-pham"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            !categorySlug
              ? "border-accent bg-accent text-white"
              : "border-border text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          Tất cả
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/san-pham?danh-muc=${category.slug}`}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              categorySlug === category.slug
                ? "border-accent bg-accent text-white"
                : "border-border text-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-16 text-center text-muted">Chưa có sản phẩm nào trong danh mục này.</p>
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
