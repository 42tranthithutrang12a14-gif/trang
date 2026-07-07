export function formatPrice(price: number | null): string {
  if (price === null) return "Liên hệ";
  return price.toLocaleString("vi-VN") + " đ";
}
