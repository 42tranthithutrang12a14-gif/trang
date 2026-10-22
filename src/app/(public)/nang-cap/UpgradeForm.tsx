"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/app/actions/subscription";

export function UpgradeForm() {
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpgrade() {
    setLoading(true);
    setError("");
    const result = await createCheckoutSession(referralCode.trim() || undefined);
    setLoading(false);
    if (result.ok) {
      window.location.href = result.url;
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-muted mb-1">
          Mã giảm giá (nếu có)
        </label>
        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          placeholder="VD: PARTNER2026"
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none uppercase"
        />
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}

      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white hover:bg-accent-dark disabled:opacity-50 transition-colors"
      >
        {loading ? "Đang chuyển hướng..." : "Nâng cấp lên Pro →"}
      </button>
    </div>
  );
}
