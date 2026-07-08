import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const SITE_URL = "https://dailoangia.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/san-pham`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/dich-vu`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/gioi-thieu`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/lien-he`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/san-pham/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes];
}
