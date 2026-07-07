import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/format";

export type ProductCardData = Prisma.ProductGetPayload<{
  include: { images: true; category: true };
}>;

export function ProductCard({ product }: { product: ProductCardData }) {
  const image = product.images[0]?.url ?? "/placeholders/vat-lieu-xay-dung.svg";

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-accent">
          {product.category.name}
        </span>
        <h3 className="text-base font-medium text-foreground">{product.name}</h3>
        <p className="mt-auto pt-2 text-sm font-semibold text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
