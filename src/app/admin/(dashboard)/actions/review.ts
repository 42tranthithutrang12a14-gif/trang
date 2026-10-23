"use server";

import { getSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { createClient } from "@/lib/supabase/server";

type RuleType = "obligation" | "risk";
type RuleStatus = "draft" | "in_review" | "reviewed" | "published";

export async function updateRuleStatus(
  ruleCode: string,
  ruleType: RuleType,
  status: RuleStatus,
  reviewerNote: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase chưa được cấu hình. Không thể lưu trạng thái." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("rule_reviews").upsert(
    {
      rule_code: ruleCode,
      rule_type: ruleType,
      status,
      reviewer_note: reviewerNote,
      reviewed_at: new Date().toISOString(),
      reviewed_by: String(session.sub ?? "admin"),
    },
    { onConflict: "rule_code,rule_type" }
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
