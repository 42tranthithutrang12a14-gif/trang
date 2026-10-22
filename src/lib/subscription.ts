import "server-only";
import type { Plan } from "./stripe";

export type SubscriptionRecord = {
  plan: Plan;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string | null;
};

export type UserPlan = {
  plan: Plan;
  isActive: boolean;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export function isPro(sub: UserPlan | null): boolean {
  return sub?.plan === "pro" && sub.isActive;
}

export function canSaveMore(sub: UserPlan | null, savedCount: number): boolean {
  if (isPro(sub)) return true;
  return savedCount < 3;
}
