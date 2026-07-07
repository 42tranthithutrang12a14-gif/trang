// Sửa các thông tin dưới đây khi có tên công ty chính thức / thông tin liên hệ thật.
export const siteConfig = {
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
  ],
  nav: [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/san-pham" },
    { label: "Dịch vụ", href: "/dich-vu" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Liên hệ", href: "/lien-he" },
  ],
} as const;
