"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import type { Category, Product, ProductImage } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/format";
import { normalizeForSearch } from "@/lib/slug";
import { buildCategoryTree, flattenWithDepth, getDescendantIds } from "@/lib/categories";
import { adjustStock } from "./actions";

type ProductRow = Product & { images: ProductImage[]; category: Category };

function StockAdjuster({ productId, initialStock }: { productId: number; initialStock: number }) {
  const [stock, setStock] = useState(initialStock);
  const [, startTransition] = useTransition();

  function adjust(delta: number) {
    setStock((s) => Math.max(0, s + delta));
    startTransition(() => {
      adjustStock(productId, delta);
    });
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => adjust(-1)}
        className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted hover:border-accent hover:text-accent"
        aria-label="Giảm 1"
      >
        −
      </button>
      <span className={`w-6 text-center ${stock === 0 ? "text-red-600" : "text-foreground"}`}>
        {stock}
      </span>
      <button
        type="button"
        onClick={() => adjust(1)}
        className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted hover:border-accent hover:text-accent"
        aria-label="Tăng 1"
      >
        +
      </button>
    </div>
  );
}

export function ProductsTable({
  products,
  categories,
}: {
  products: ProductRow[];
  categories: Category[];
}) {
  const [categoryId, setCategoryId] = useState<number | "all">("all");
  const [query, setQuery] = useState("");

  const flatCategories = useMemo(
    () => flattenWithDepth(buildCategoryTree(categories)),
    [categories]
  );

  const filtered = useMemo(() => {
    let list = products;
    if (categoryId !== "all") {
      const allowed = new Set(getDescendantIds(categoryId, categories));
      list = list.filter((p) => allowed.has(p.categoryId));
    }
    const normalizedQuery = normalizeForSearch(query.trim());
    if (normalizedQuery) {
      list = list.filter((p) => normalizeForSearch(p.name).includes(normalizedQuery));
    }
    return list;
  }, [products, categoryId, query, categories]);

  return (
    <div>
      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="all">Tất cả danh mục</option>
          {flatCategories.map(({ category, depth }) => (
            <option key={category.id} value={category.id}>
              {"— ".repeat(depth)}
              {category.name}
            </option>
          ))}
        </select>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên sản phẩm..."
          className="min-w-[220px] flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-border bg-background text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Ảnh</th>
              <th className="px-4 py-3 font-medium">Tên sản phẩm</th>
              <th className="px-4 py-3 font-medium">Danh mục</th>
              <th className="px-4 py-3 font-medium">Giá</th>
              <th className="px-4 py-3 font-medium">Tồn kho</th>
              <th className="px-4 py-3 font-medium">Nổi bật</th>
              <th className="px-4 py-3 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-background">
                    <Image
                      src={product.images[0]?.url ?? "/placeholders/vat-lieu-xay-dung.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                <td className="px-4 py-3 text-muted">{product.category.name}</td>
                <td className="px-4 py-3 text-foreground">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StockAdjuster productId={product.id} initialStock={product.stock} />
                    {product.showStock && <span className="text-xs text-muted">(công khai)</span>}
                  </div>
                </td>
                <td className="px-4 py-3">{product.featured ? "Có" : ""}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-accent hover:underline"
                  >
                    Sửa
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
