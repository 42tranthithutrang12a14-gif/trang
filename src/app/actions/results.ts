"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserPlan } from "./subscription";
import { isPro } from "@/lib/subscription";
import type { Answers } from "@/lib/engine/types";

export type SaveResultPayload = {
  answers: Answers;
  redCount: number;
  yellowCount: number;
  greenCount: number;
};

export type SaveResultResponse =
  | { ok: true; id: string }
  | { ok: false; error: string };

const FREE_SAVE_LIMIT = 3;

export async function saveResult(payload: SaveResultPayload): Promise<SaveResultResponse> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "Chưa đăng nhập." };
  }

  // Enforce save limit for free users
  const plan = await getUserPlan();
  if (!isPro(plan)) {
    const { count } = await supabase
      .from("saved_results")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);
    if ((count ?? 0) >= FREE_SAVE_LIMIT) {
      return { ok: false, error: `Gói miễn phí chỉ cho phép lưu ${FREE_SAVE_LIMIT} kết quả. Nâng cấp Pro để lưu không giới hạn.` };
    }
  }

  const { data, error } = await supabase
    .from("saved_results")
    .insert({
      user_id: user.id,
      answers: payload.answers,
      red_count: payload.redCount,
      yellow_count: payload.yellowCount,
      green_count: payload.greenCount,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, error: "Không thể lưu kết quả. Vui lòng thử lại." };
  }

  return { ok: true, id: data.id as string };
}

export type SavedResult = {
  id: string;
  createdAt: string;
  redCount: number;
  yellowCount: number;
  greenCount: number;
};

export async function listResults(): Promise<SavedResult[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_results")
    .select("id, created_at, red_count, yellow_count, green_count")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error || !data) return [];

  return data.map((r) => ({
    id: r.id as string,
    createdAt: r.created_at as string,
    redCount: r.red_count as number,
    yellowCount: r.yellow_count as number,
    greenCount: r.green_count as number,
  }));
}
