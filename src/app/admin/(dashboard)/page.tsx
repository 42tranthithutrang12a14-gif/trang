import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductsTable } from "./products/products-table";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Sản phẩm</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <ProductsTable products={products} categories={categories} />
    </div>
  );
}
