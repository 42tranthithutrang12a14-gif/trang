import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const settings = await getSettings();
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.product.findMany({
      where: { featured: true },
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              {settings.shortName}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              {settings.slogan}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Chuyên cung cấp gạch lát, vật liệu xây dựng, thiết bị vệ sinh, thiết bị ống nước
              và nhận thi công xây dựng, sửa chữa nhà ở tại {settings.address}.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/san-pham"
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
              >
                Xem sản phẩm
              </Link>
              <Link
                href="/lien-he"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/placeholders/gach-lat.svg"
              alt={settings.slogan}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Danh mục nổi bật */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl font-semibold text-foreground">Danh mục sản phẩm</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/san-pham?danh-muc=${category.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-background">
                <Image
                  src={category.image ?? "/placeholders/vat-lieu-xay-dung.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-foreground">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      {featuredProducts.length > 0 && (
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Sản phẩm nổi bật</h2>
              <Link href="/san-pham" className="text-sm font-medium text-accent hover:underline">
                Xem tất cả →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lý do chọn chúng tôi */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl font-semibold text-foreground">Vì sao chọn chúng tôi</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            { title: "Giá cạnh tranh", desc: "Nhập hàng trực tiếp, giá tốt cho công trình lớn nhỏ." },
            { title: "Giao hàng tận nơi", desc: "Giao vật tư đến tận công trình, đúng tiến độ." },
            { title: "Tư vấn kỹ thuật", desc: "Đội ngũ tư vấn miễn phí về vật liệu, thi công." },
            { title: "Bảo hành rõ ràng", desc: "Sản phẩm, dịch vụ có bảo hành, hỗ trợ sau bán hàng." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA liên hệ */}
      <section className="border-t border-border bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Cần tư vấn vật liệu hoặc báo giá công trình?
          </h2>
          <p className="max-w-xl text-sm text-white/90">
            Liên hệ ngay {settings.phone} hoặc ghé trực tiếp {settings.address} để được hỗ trợ.
          </p>
          <Link
            href="/lien-he"
            className="mt-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-accent hover:bg-white/90"
          >
            Liên hệ ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
