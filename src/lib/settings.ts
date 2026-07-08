import { cache } from "react";
import { prisma } from "@/lib/db";

const DEFAULTS = {
  companyName: "CÔNG TY TNHH [TÊN CÔNG TY]",
  shortName: "[TÊN CÔNG TY]",
  slogan: "Vật liệu xây dựng chất lượng — Gạch lát tinh tế",
  taxId: "",
  representative: "",
  address: "",
  phone: "",
  email: "",
  businessLines: [] as string[],
  logoUrl: null as string | null,
  heroImage: null as string | null,
};

export const nav = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Liên hệ", href: "/lien-he" },
] as const;

// cache() dedupes this DB read across a single request/render pass.
export const getSettings = cache(async () => {
  const row = await prisma.settings.findUnique({ where: { id: 1 } });
  if (!row) return DEFAULTS;
  return {
    companyName: row.companyName,
    shortName: row.shortName,
    slogan: row.slogan,
    taxId: row.taxId,
    representative: row.representative,
    address: row.address,
    phone: row.phone,
    email: row.email,
    businessLines: row.businessLines.split("\n").filter(Boolean),
    logoUrl: row.logoUrl,
    heroImage: row.heroImage,
  };
});
