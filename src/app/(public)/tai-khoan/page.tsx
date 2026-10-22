import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listResults } from "@/app/actions/results";
import { signOut } from "@/app/actions/auth";
import { getEmailPrefs } from "@/app/actions/email-prefs";
import { getUserPlan } from "@/app/actions/subscription";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { isEmailConfigured } from "@/lib/email";
import { isStripeConfigured, PLANS } from "@/lib/stripe";
import { isPro, canSaveMore } from "@/lib/subscription";
import { EmailPrefsForm } from "./EmailPrefsForm";
import { SubscriptionSection } from "./SubscriptionSection";
import { RestoreResultButton } from "./RestoreResultButton";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TaiKhoanPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const params = await searchParams;
  const justUpgraded = params.upgraded === "1";

  if (!isSupabaseConfigured()) {
    redirect("/dang-nhap");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/dang-nhap");

  const [results, emailPrefs, userPlan] = await Promise.all([
    listResults(),
    getEmailPrefs(),
    getUserPlan(),
  ]);

  const emailEnabled = isEmailConfigured();
  const stripeEnabled = isStripeConfigured();
  const pro = isPro(userPlan);
  const saveLimit = PLANS[userPlan?.plan ?? "free"].saveLimit;
  const canSave = canSaveMore(userPlan, results.length);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Upgrade success banner */}
      {justUpgraded && (
        <div className="mb-6 rounded-2xl border-2 border-success/40 bg-success-bg px-5 py-4 flex items-center gap-3">
          <span className="text-xl">🎉</span>
          <div>
            <p className="text-sm font-semibold text-foreground">Nâng cấp thành công!</p>
            <p className="text-xs text-muted mt-0.5">Tài khoản của bạn đã được nâng lên gói Pro. Tận hưởng lưu không giới hạn và nhắc lịch email.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tài khoản</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
          <span className={`inline-block mt-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${pro ? "bg-accent/10 text-accent" : "bg-muted/20 text-muted"}`}>
            {pro ? "Pro" : "Miễn phí"}
          </span>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:border-danger/50 hover:text-danger transition-colors"
          >
            Đăng xuất
          </button>
        </form>
      </div>

      {/* Upgrade CTA (free users only) */}
      {!pro && stripeEnabled && (
        <div className="mb-8 rounded-2xl border-2 border-accent/20 bg-accent/5 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Nâng cấp lên Pro</p>
            <p className="text-xs text-muted mt-0.5">
              Lưu không giới hạn · Nhắc lịch email · {(PLANS.pro.price / 1000).toFixed(0)}k₫/tháng
            </p>
          </div>
          <Link
            href="/nang-cap"
            className="flex-shrink-0 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Nâng cấp →
          </Link>
        </div>
      )}

      {/* Results history */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Lịch sử khám sức khỏe pháp lý
          </h2>
          {!pro && saveLimit !== Infinity && saveLimit > 0 && (
            <span className="text-xs text-muted">
              {results.length}/{saveLimit} lần lưu
            </span>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <p className="text-muted text-sm mb-4">Bạn chưa có lần khám nào được lưu.</p>
            <Link
              href="/kham"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              Khám ngay →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm text-muted">{formatDate(r.createdAt)}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    {r.redCount > 0 && (
                      <span className="text-danger font-semibold">{r.redCount} cần làm ngay</span>
                    )}
                    {r.yellowCount > 0 && (
                      <span className="text-warning font-semibold">{r.yellowCount} cần kiểm tra</span>
                    )}
                    {r.greenCount > 0 && (
                      <span className="text-success">{r.greenCount} đang ổn</span>
                    )}
                    {r.redCount === 0 && r.yellowCount === 0 && r.greenCount === 0 && (
                      <span className="text-muted">Không có dữ liệu</span>
                    )}
                  </div>
                </div>
                <RestoreResultButton answers={r.answers} />
              </div>
            ))}
          </div>
        )}

        {!canSave && !pro && (
          <div className="mt-3 rounded-xl border border-warning/30 bg-warning-bg px-4 py-3 text-xs text-warning">
            Bạn đã dùng hết {saveLimit} lần lưu miễn phí.{" "}
            <Link href="/nang-cap" className="underline font-semibold">Nâng cấp Pro</Link> để lưu không giới hạn.
          </div>
        )}
      </section>

      {/* Email reminders */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-foreground">Nhắc hạn nộp qua email</h2>
        {!emailEnabled ? (
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm text-muted">Tính năng nhắc lịch qua email sắp ra mắt.</p>
          </div>
        ) : !pro ? (
          <div className="rounded-xl border border-border bg-surface p-5 flex items-center justify-between gap-4">
            <p className="text-sm text-muted">Chỉ dành cho gói Pro.</p>
            <Link href="/nang-cap" className="text-xs text-accent hover:underline font-semibold">
              Nâng cấp →
            </Link>
          </div>
        ) : (
          <EmailPrefsForm
            initialRemindersOn={emailPrefs?.remindersOn ?? true}
            initialRemindDays={emailPrefs?.remindDays ?? 7}
          />
        )}
      </section>

      {/* Subscription management */}
      {stripeEnabled && (
        <section className="mb-8">
          <h2 className="mb-4 text-base font-semibold text-foreground">Gói dịch vụ</h2>
          <SubscriptionSection plan={userPlan} />
        </section>
      )}

      <div className="mt-2">
        <Link href="/kham" className="text-sm text-accent hover:text-accent-dark transition-colors">
          ← Khám lại từ đầu
        </Link>
      </div>
    </div>
  );
}
