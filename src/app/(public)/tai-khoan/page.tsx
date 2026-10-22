import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listResults } from "@/app/actions/results";
import { signOut } from "@/app/actions/auth";
import { getEmailPrefs } from "@/app/actions/email-prefs";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { isEmailConfigured } from "@/lib/email";
import { EmailPrefsForm } from "./EmailPrefsForm";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TaiKhoanPage() {
  if (!isSupabaseConfigured()) {
    redirect("/dang-nhap");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap");
  }

  const [results, emailPrefs] = await Promise.all([
    listResults(),
    getEmailPrefs(),
  ]);

  const emailEnabled = isEmailConfigured();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tài khoản</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
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

      {/* Results history */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Lịch sử khám sức khỏe pháp lý
        </h2>

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
                      <span className="text-danger font-semibold">
                        {r.redCount} cần làm ngay
                      </span>
                    )}
                    {r.yellowCount > 0 && (
                      <span className="text-warning font-semibold">
                        {r.yellowCount} cần kiểm tra
                      </span>
                    )}
                    {r.greenCount > 0 && (
                      <span className="text-success">
                        {r.greenCount} đang ổn
                      </span>
                    )}
                    {r.redCount === 0 && r.yellowCount === 0 && r.greenCount === 0 && (
                      <span className="text-muted">Không có dữ liệu</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
        ) : (
          <EmailPrefsForm
            initialRemindersOn={emailPrefs?.remindersOn ?? true}
            initialRemindDays={emailPrefs?.remindDays ?? 7}
          />
        )}
      </section>

      <div className="mt-2">
        <Link href="/kham" className="text-sm text-accent hover:text-accent-dark transition-colors">
          ← Khám lại từ đầu
        </Link>
      </div>
    </div>
  );
}
