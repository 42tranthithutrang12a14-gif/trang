import "server-only";
import type { Plan } from "./plans";

export type UserPlan = {
  plan: Plan;
  isActive: boolean;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export function isPro(sub: UserPlan | null): boolean {
  if (!sub) return false;
  if (sub.plan !== "pro") return false;
  if (!sub.isActive) return false;
  // Check expiry
  if (sub.currentPeriodEnd) {
    return new Date(sub.currentPeriodEnd) > new Date();
  }
  return true;
}
