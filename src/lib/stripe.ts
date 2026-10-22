import "server-only";
import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY chưa được cấu hình");
    _stripe = new Stripe(key, { apiVersion: "2026-09-30.endive" });
  }
  return _stripe;
}

export function isStripeConfigured(): boolean {
  return !!(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

export const PLANS = {
  free: {
    name: "Miễn phí",
    price: 0,
    saveLimit: 3,
    emailReminders: false,
    features: ["3 lần lưu kết quả", "Khám không giới hạn", "Xem kết quả chi tiết"],
  },
  pro: {
    name: "Pro",
    price: 99000,
    saveLimit: Infinity,
    emailReminders: true,
    features: [
      "Lưu kết quả không giới hạn",
      "Nhắc hạn nộp qua email",
      "Xem lịch sử thay đổi",
      "Hỗ trợ ưu tiên",
    ],
  },
} as const;

export type Plan = keyof typeof PLANS;
