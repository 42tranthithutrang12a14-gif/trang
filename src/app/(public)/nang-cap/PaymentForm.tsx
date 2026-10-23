"use client";

import { useState, useEffect } from "react";
import { getPaymentInfo, createPaymentRequest } from "@/app/actions/subscription";
import type { PaymentInfo } from "@/app/actions/subscription";
import Link from "next/link";

function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + " ₫";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-2 rounded px-2 py-0.5 text-xs border border-border text-muted hover:border-accent hover:text-accent transition-colors"
    >
      {copied ? "Đã sao chép" : "Sao chép"}
    </button>
  );
}

type Props = {
  amount: number;
  bank: { bankId: string; accountNo: string; accountName: string };
  qrBaseUrl: string | null;
  configured: boolean;
};

export function PaymentForm({ amount, bank, qrBaseUrl, configured }: Props) {
  const [info, setInfo] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getPaymentInfo().then((data) => {
      setInfo(data);
      setLoading(false);
    });
  }, []);

  const transferNote = info?.transferNote ?? "SOTAY ????????";
  const qrUrl = info?.qrUrl ?? qrBaseUrl;
  const accountNo = bank.accountNo || info?.accountNo;
  const accountName = bank.accountName || info?.accountName;
  const isLoggedIn = !!info;

  if (!configured) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">Thanh toán chưa được cấu hình. Liên hệ admin để nâng cấp.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-success/40 bg-success-bg p-6 text-center">
        <p className="text-base font-semibold text-foreground mb-2">✅ Đã ghi nhận yêu cầu!</p>
        <p className="text-sm text-muted mb-4">
          Admin sẽ xác nhận thanh toán trong 1–2 ngày làm việc. Bạn sẽ nhận email thông báo khi được duyệt.
        </p>
        <Link href="/tai-khoan" className="text-sm text-accent hover:underline">
          Xem tài khoản →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-base font-semibold text-foreground mb-5">Thanh toán qua chuyển khoản</h2>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* QR code */}
        {qrUrl && (
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <img
              src={qrUrl}
              alt="Mã QR chuyển khoản"
              width={180}
              height={180}
              className="rounded-xl border border-border"
            />
            <p className="text-xs text-muted text-center">Quét bằng app ngân hàng</p>
          </div>
        )}

        {/* Bank details */}
        <div className="flex-1 space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted">Ngân hàng</span>
            <span className="font-medium text-foreground uppercase">{bank.bankId || info?.bankId}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted">Số tài khoản</span>
            <span className="font-mono font-semibold text-foreground">
              {accountNo}
              {accountNo && <CopyButton text={accountNo} />}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted">Chủ tài khoản</span>
            <span className="font-medium text-foreground">{accountName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted">Số tiền</span>
            <span className="font-bold text-foreground text-base">{formatVND(amount)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted">Nội dung CK</span>
            <span className={`font-mono font-semibold ${loading ? "text-muted" : "text-accent"}`}>
              {loading ? "Đang tải..." : transferNote}
              {!loading && isLoggedIn && <CopyButton text={transferNote} />}
            </span>
          </div>
        </div>
      </div>

      {/* Transfer note notice */}
      <div className="mt-4 rounded-xl border border-warning/30 bg-warning-bg px-4 py-3 text-xs text-warning">
        Nhập đúng nội dung chuyển khoản <strong>{loading ? "..." : transferNote}</strong> để admin xác nhận tự động.
      </div>

      {/* Submit button */}
      <div className="mt-5">
        {!isLoggedIn && !loading ? (
          <div className="text-center">
            <p className="text-sm text-muted mb-3">Đăng nhập để tạo mã chuyển khoản riêng và theo dõi trạng thái.</p>
            <Link
              href="/dang-nhap?next=/nang-cap"
              className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              Đăng nhập →
            </Link>
          </div>
        ) : (
          <>
            {error && <p className="mb-3 text-xs text-danger">{error}</p>}
            <button
              onClick={async () => {
                setSubmitting(true);
                setError("");
                const result = await createPaymentRequest();
                setSubmitting(false);
                if (result.ok) {
                  setSubmitted(true);
                } else {
                  setError(result.error);
                }
              }}
              disabled={submitting || loading}
              className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors disabled:opacity-50"
            >
              {submitting ? "Đang gửi..." : "Tôi đã chuyển khoản →"}
            </button>
            <p className="mt-2 text-center text-xs text-muted">
              Nhấn sau khi đã chuyển khoản xong để admin biết cần xác nhận.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
