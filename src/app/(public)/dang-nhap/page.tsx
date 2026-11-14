"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmail } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/check";

function DangNhapForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/tai-khoan";
  const hasError = searchParams.get("error") === "auth_callback_failed";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace(next);
    });
  }, [router, next]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signInWithEmail(email);
    setLoading(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-muted text-sm">
          Tính năng đăng nhập chưa được bật. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="text-xl font-bold text-foreground mb-1">Đăng nhập</h1>
        <p className="text-sm text-muted mb-6">
          Nhập email — chúng tôi gửi đường link đăng nhập, không cần mật khẩu.
        </p>

        {hasError && (
          <div className="mb-4 rounded-lg border border-danger/30 bg-danger-bg px-4 py-3 text-sm text-danger">
            Liên kết đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng thử lại.
          </div>
        )}

        {sent ? (
          <div className="rounded-xl border border-success/30 bg-success-bg px-5 py-4 text-center">
            <p className="text-base font-semibold text-foreground mb-1">📬 Kiểm tra hộp thư</p>
            <p className="text-sm text-muted">
              Đã gửi link đăng nhập tới <strong>{email}</strong>. Nhấn vào link trong email để tiếp tục.
            </p>
            <p className="mt-3 text-xs text-muted">
              Không thấy email? Kiểm tra thư mục Spam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Địa chỉ email
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ten@congty.vn"
                className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-sm text-danger">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
            >
              {loading ? "Đang gửi..." : "Gửi link đăng nhập →"}
            </button>
          </form>
        )}

        <p className="mt-6 text-xs text-center text-muted">
          App không lưu mật khẩu. Mỗi lần đăng nhập là một link mới qua email.
        </p>
      </div>
    </div>
  );
}

export default function DangNhapPage() {
  return (
    <Suspense>
      <DangNhapForm />
    </Suspense>
  );
}
