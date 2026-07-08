export function formatPrice(price: number | null): string {
  if (price === null) return "Liên hệ";
  return price.toLocaleString("vi-VN") + " đ";
}

// Ô số điện thoại đôi khi chứa nhiều liên hệ (VD: "[Ms. A] 090... - [Mr. B] 091...").
// Lấy số điện thoại đầu tiên tìm được để tạo link "tel:" hợp lệ.
export function telHref(phone: string): string {
  const match = phone.match(/0\d[\d.\-\s]{7,10}\d/);
  const digits = (match ? match[0] : phone).replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}
