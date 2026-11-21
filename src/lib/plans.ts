import "server-only";

export function getProPriceVND(): number {
  return parseInt(process.env.PRO_PRICE_VND ?? "990000", 10);
}

export const PLANS = {
  free: {
    name: "Miễn phí",
    price: 0,
    emailReminders: false,
    features: [
      "Khám không giới hạn",
      "Lưu kết quả không giới hạn",
      "Xem kết quả chi tiết",
      "Thư viện hướng dẫn",
    ],
  },
  pro: {
    name: "Pro",
    emailReminders: true,
    features: [
      "Tất cả tính năng gói Miễn phí",
      "Nhắc hạn nộp qua email tự động",
    ],
  },
} as const;

export type Plan = keyof typeof PLANS;

export function isPaymentConfigured(): boolean {
  return !!(
    process.env.VIETQR_BANK_ID &&
    process.env.VIETQR_ACCOUNT_NO &&
    process.env.VIETQR_ACCOUNT_NAME
  );
}

export function getVietQRUrl(amount: number, note: string): string {
  const bankId = process.env.VIETQR_BANK_ID ?? "";
  const accountNo = process.env.VIETQR_ACCOUNT_NO ?? "";
  const accountName = encodeURIComponent(process.env.VIETQR_ACCOUNT_NAME ?? "");
  const encodedNote = encodeURIComponent(note);
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?amount=${amount}&addInfo=${encodedNote}&accountName=${accountName}`;
}

export function getBankInfo() {
  return {
    bankId: process.env.VIETQR_BANK_ID ?? "",
    accountNo: process.env.VIETQR_ACCOUNT_NO ?? "",
    accountName: process.env.VIETQR_ACCOUNT_NAME ?? "",
  };
}
