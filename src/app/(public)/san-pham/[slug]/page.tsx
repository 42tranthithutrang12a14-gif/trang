import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { formatPrice, stockLabel, telHref } from "@/lib/format";
import { getSettings } from "@/lib/settings";
import { ProductCard } from "@/components/product-card";

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { images: true, category: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProduct(slug), getSettings()]);
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    include: { images: true, category: true },
    take: 3,
  });

  const images = product.images.length > 0 ? product.images : [{ id: 0, url: "/placeholders/vat-lieu-xay-dung.svg", productId: 0 }];
  const stock = stockLabel(product);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <nav className="text-sm text-muted">
        <Link href="/san-pham" className="hover:text-accent">
          Sản phẩm
        </Link>{" "}
        /{" "}
        <Link href={`/san-pham?danh-muc=${product.category.slug}`} className="hover:text-accent">
          {product.category.name}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="grid gap-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
            <Image src={images[0].url} alt={product.name} fill className="object-cover" priority />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <Image src={img.url} alt={product.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-accent">
            {product.category.name}
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-foreground">
            {formatPrice(product.price)}
          </p>
          {stock && (
            <p
              className={`mt-1 text-sm font-medium ${
                stock === "Hết hàng" ? "text-red-600" : "text-muted"
              }`}
            >
              {stock}
            </p>
          )}
          <p className="mt-6 whitespace-pre-line leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={telHref(settings.phone)}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Gọi đặt hàng
            </a>
            <Link
              href="/lien-he"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold text-foreground">Sản phẩm liên quan</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
