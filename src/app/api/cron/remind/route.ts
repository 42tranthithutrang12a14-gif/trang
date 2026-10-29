import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { evaluate } from "@/lib/engine/evaluate";
import { getTodayInVN } from "@/lib/engine/schedule";
import { sendReminderEmail, isEmailConfigured } from "@/lib/email";
import type { ReminderItem } from "@/lib/email";
import type { Answers } from "@/lib/engine/types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import obligationRules from "@/content/rules/obligation_rules.json";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import riskRules from "@/content/rules/risk_rules.json";

const REMIND_DAYS_AHEAD = 14;

// Vercel cron secret header
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json({ skipped: true, reason: "Email not configured" });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase service key not configured" }, { status: 500 });
  }

  const supabase = createServiceClient(supabaseUrl, serviceKey);
  const today = getTodayInVN();
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() + REMIND_DAYS_AHEAD);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  // Get all users who opted in to reminders
  const { data: prefs } = await supabase
    .from("user_email_prefs")
    .select("user_id, remind_days")
    .eq("reminders_on", true);

  const userIds = (prefs ?? []).map((p: { user_id: string }) => p.user_id);
  if (userIds.length === 0) {
    return NextResponse.json({ sent: 0, skipped_users: 0 });
  }

  // Get latest saved result per user
  const { data: results } = await supabase
    .from("saved_results")
    .select("id, user_id, answers")
    .in("user_id", userIds)
    .order("created_at", { ascending: false });

  // Deduplicate: one result per user (latest)
  const latestByUser = new Map<string, { id: string; answers: Answers }>();
  for (const r of results ?? []) {
    if (!latestByUser.has(r.user_id)) {
      latestByUser.set(r.user_id, { id: r.id, answers: r.answers as Answers });
    }
  }

  let sent = 0;
  let errors = 0;

  for (const [userId, { id: resultId, answers }] of latestByUser.entries()) {
    // Compute obligations
    const evalResult = evaluate(
      answers,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obligationRules as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      riskRules as any,
      today,
      [],
      { includeDraft: false }
    );

    // Filter to upcoming deadlines in next REMIND_DAYS_AHEAD days
    const upcoming = evalResult.obligations.filter(
      (o) => o.dueDate >= today && o.dueDate <= cutoffStr
    );

    if (upcoming.length === 0) continue;

    // Check which have NOT been reminded yet
    const { data: alreadySent } = await supabase
      .from("reminder_log")
      .select("rule_code, due_date")
      .eq("user_id", userId)
      .in(
        "rule_code",
        upcoming.map((o) => o.ruleCode)
      );

    const sentSet = new Set(
      (alreadySent ?? []).map(
        (r: { rule_code: string; due_date: string }) => `${r.rule_code}:${r.due_date}`
      )
    );

    const toRemind = upcoming.filter(
      (o) => !sentSet.has(`${o.ruleCode}:${o.dueDate}`)
    );

    if (toRemind.length === 0) continue;

    // Get user email from auth.users via admin API
    const { data: userData } = await supabase.auth.admin.getUserById(userId);
    const email = userData?.user?.email;
    if (!email) continue;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const reminderItems: ReminderItem[] = toRemind.map((o) => {
      const daysUntil = Math.round(
        (new Date(o.dueDate).getTime() - new Date(today).getTime()) / 86400000
      );
      return {
        ruleCode: o.ruleCode,
        title: o.ruleCode,
        dueDate: o.dueDate,
        daysUntil,
      };
    });

    const emailResult = await sendReminderEmail({ to: email, reminders: reminderItems, appUrl });

    if (emailResult.ok) {
      // Log sent reminders
      await supabase.from("reminder_log").upsert(
        toRemind.map((o) => ({
          user_id: userId,
          result_id: resultId,
          rule_code: o.ruleCode,
          due_date: o.dueDate,
        })),
        { onConflict: "user_id,rule_code,due_date" }
      );
      sent++;
    } else {
      errors++;
    }
  }

  return NextResponse.json({ sent, errors, today });
}
