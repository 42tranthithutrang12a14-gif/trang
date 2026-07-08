import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.service.deleteMany();

  const defaultSettings = {
    companyName: "CÔNG TY TNHH [TÊN CÔNG TY]",
    shortName: "[TÊN CÔNG TY]",
    slogan: "Vật liệu xây dựng chất lượng — Gạch lát tinh tế",
    taxId: "3604042449",
    representative: "Trần Thị Thu Trang",
    address: "340/5, Tổ 8, Khu phố 9, Phường Long Bình, Đồng Nai",
    phone: "0000 000 000",
    email: "lienhe@example.com",
    businessLines: [
      "Bán buôn vật liệu, thiết bị lắp đặt khác trong xây dựng (ngành nghề chính)",
      "Bán lẻ đồ ngũ kim, sơn, kính và thiết bị lắp đặt khác trong xây dựng",
      "Lắp đặt hệ thống cấp, thoát nước, hệ thống sưởi và điều hoà không khí",
      "Lắp đặt hệ thống điện",
      "Hoàn thiện công trình xây dựng",
      "Xây dựng nhà để ở và nhà không để ở",
      "Hoạt động xây dựng chuyên dụng khác",
    ].join("\n"),
  };

  await prisma.settings.upsert({
    where: { id: 1 },
    update: defaultSettings,
    create: { id: 1, ...defaultSettings },
  });

  const services = [
    {
      title: "Xây dựng nhà để ở",
      description: "Thi công nhà phố, nhà cấp 4, nhà ống trọn gói từ móng đến hoàn thiện.",
    },
    {
      title: "Xây dựng công trình không để ở",
      description: "Thi công nhà xưởng, kho bãi, công trình thương mại theo yêu cầu.",
    },
    {
      title: "Hoàn thiện công trình",
      description: "Ốp lát gạch, sơn nước, trần thạch cao, hoàn thiện nội ngoại thất.",
    },
    {
      title: "Lắp đặt hệ thống cấp thoát nước",
      description: "Thi công đường ống nước, hệ thống thoát nước, thiết bị vệ sinh.",
    },
    {
      title: "Lắp đặt hệ thống điện",
      description: "Đi dây, lắp đặt tủ điện, thiết bị chiếu sáng cho công trình dân dụng.",
    },
    {
      title: "Sửa chữa, cải tạo nhà",
      description: "Sửa chữa, cải tạo, nâng cấp nhà ở, khắc phục thấm dột, xuống cấp.",
    },
  ];
  for (const [index, service] of services.entries()) {
    await prisma.service.create({ data: { ...service, order: index } });
  }

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Gạch lát",
        slug: "gach-lat",
        order: 0,
        image: "/placeholders/gach-lat.svg",
      },
    }),
    prisma.category.create({
      data: {
        name: "Vật liệu xây dựng",
        slug: "vat-lieu-xay-dung",
        order: 1,
        image: "/placeholders/vat-lieu-xay-dung.svg",
      },
    }),
    prisma.category.create({
      data: {
        name: "Thiết bị vệ sinh",
        slug: "thiet-bi-ve-sinh",
        order: 2,
        image: "/placeholders/thiet-bi-ve-sinh.svg",
      },
    }),
    prisma.category.create({
      data: {
        name: "Thiết bị ống nước",
        slug: "thiet-bi-ong-nuoc",
        order: 3,
        image: "/placeholders/thiet-bi-ong-nuoc.svg",
      },
    }),
  ]);

  const [gachLat, vlxd, tbvs, ongNuoc] = categories;

  const products: {
    name: string;
    slug: string;
    description: string;
    price: number | null;
    featured: boolean;
    categoryId: number;
    image: string;
  }[] = [
    {
      name: "Gạch lát nền vân đá 60x60",
      slug: "gach-lat-nen-van-da-60x60",
      description:
        "Gạch lát nền khổ lớn 60x60cm, vân đá tự nhiên, bề mặt bóng gương, chống trơn trượt. Phù hợp phòng khách, sảnh lớn.",
      price: 185000,
      featured: true,
      categoryId: gachLat.id,
      image: "/placeholders/gach-lat.svg",
    },
    {
      name: "Gạch ốp tường phòng bếp 30x60",
      slug: "gach-op-tuong-phong-bep-30x60",
      description:
        "Gạch ốp tường 30x60cm, hoạ tiết tinh tế, dễ lau chùi, chống bám dầu mỡ, phù hợp không gian bếp hiện đại.",
      price: 120000,
      featured: false,
      categoryId: gachLat.id,
      image: "/placeholders/gach-lat.svg",
    },
    {
      name: "Gạch lát sân vườn chống trơn 40x40",
      slug: "gach-lat-san-vuon-chong-tron-40x40",
      description:
        "Gạch lát ngoại thất bề mặt nhám, độ chống trơn cao, chịu được thời tiết ngoài trời, thích hợp sân vườn, ban công.",
      price: 95000,
      featured: true,
      categoryId: gachLat.id,
      image: "/placeholders/gach-lat.svg",
    },
    {
      name: "Xi măng đa dụng PCB40",
      slug: "xi-mang-da-dung-pcb40",
      description:
        "Xi măng PCB40 chất lượng cao, dùng cho xây tô, đổ móng, đúc cột. Đóng bao 50kg.",
      price: 95000,
      featured: true,
      categoryId: vlxd.id,
      image: "/placeholders/vat-lieu-xay-dung.svg",
    },
    {
      name: "Cát xây tô đã sàng lọc",
      slug: "cat-xay-to-da-sang-loc",
      description: "Cát vàng đã qua sàng lọc, hạt mịn, sạch tạp chất, dùng cho xây tô, trộn vữa.",
      price: null,
      featured: false,
      categoryId: vlxd.id,
      image: "/placeholders/vat-lieu-xay-dung.svg",
    },
    {
      name: "Thép xây dựng phi 10",
      slug: "thep-xay-dung-phi-10",
      description: "Thép cây phi 10, tiêu chuẩn TCVN, dùng cho kết cấu bê tông cốt thép nhà dân dụng.",
      price: null,
      featured: false,
      categoryId: vlxd.id,
      image: "/placeholders/vat-lieu-xay-dung.svg",
    },
    {
      name: "Bồn cầu một khối tiết kiệm nước",
      slug: "bon-cau-mot-khoi-tiet-kiem-nuoc",
      description:
        "Bồn cầu một khối kiểu dáng hiện đại, hệ xả 2 chế độ tiết kiệm nước, dễ vệ sinh.",
      price: 2850000,
      featured: true,
      categoryId: tbvs.id,
      image: "/placeholders/thiet-bi-ve-sinh.svg",
    },
    {
      name: "Lavabo treo tường cao cấp",
      slug: "lavabo-treo-tuong-cao-cap",
      description: "Lavabo sứ treo tường, thiết kế tối giản sang trọng, phù hợp phòng tắm hiện đại.",
      price: 1450000,
      featured: false,
      categoryId: tbvs.id,
      image: "/placeholders/thiet-bi-ve-sinh.svg",
    },
    {
      name: "Sen cây tắm đứng inox 304",
      slug: "sen-cay-tam-dung-inox-304",
      description: "Bộ sen cây tắm đứng chất liệu inox 304 chống gỉ, vòi sen mưa, dễ lắp đặt.",
      price: 1980000,
      featured: false,
      categoryId: tbvs.id,
      image: "/placeholders/thiet-bi-ve-sinh.svg",
    },
    {
      name: "Ống nhựa PVC Ø90 dẫn nước",
      slug: "ong-nhua-pvc-90-dan-nuoc",
      description: "Ống nhựa PVC đường kính 90mm, chịu áp lực tốt, dùng cho hệ thống thoát nước dân dụng.",
      price: 65000,
      featured: false,
      categoryId: ongNuoc.id,
      image: "/placeholders/thiet-bi-ong-nuoc.svg",
    },
    {
      name: "Van khoá nước inox 21mm",
      slug: "van-khoa-nuoc-inox-21mm",
      description: "Van khoá nước inox bền bỉ, thao tác đóng mở nhẹ nhàng, chống rò rỉ.",
      price: 45000,
      featured: false,
      categoryId: ongNuoc.id,
      image: "/placeholders/thiet-bi-ong-nuoc.svg",
    },
    {
      name: "Máy bơm nước tăng áp",
      slug: "may-bom-nuoc-tang-ap",
      description: "Máy bơm tăng áp tự động, vận hành êm ái, phù hợp nhà phố, căn hộ.",
      price: 1250000,
      featured: true,
      categoryId: ongNuoc.id,
      image: "/placeholders/thiet-bi-ong-nuoc.svg",
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        featured: p.featured,
        categoryId: p.categoryId,
        images: {
          create: [{ url: p.image }],
        },
      },
    });
  }

  console.log(
    `Seeded settings, ${services.length} services, ${categories.length} categories and ${products.length} products.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
