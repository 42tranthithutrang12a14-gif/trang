"use client";

import { useState } from "react";
import { addReferralCode } from "./actions";

export function AddPartnerForm() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState(20);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    const result = await addReferralCode(code.toUpperCase().trim(), name.trim(), email.trim(), discount);
    setSaving(false);
    if (result.ok) {
      setSaved(true);
      setCode("");
      setName("");
      setEmail("");
      setDiscount(20);
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Mã referral *</label>
          <input
            required
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="VD: PARTNER2026"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Giảm giá (%)</label>
          <select
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            {[10, 15, 20, 25, 30, 50].map((d) => (
              <option key={d} value={d}>{d}%</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Tên đối tác *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Công ty Kế toán ABC"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Email liên hệ *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="lienhe@ketoanABC.vn"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
      {saved && <p className="text-xs text-success">✓ Đã thêm đối tác thành công.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50 transition-colors"
      >
        {saving ? "Đang lưu..." : "Thêm đối tác"}
      </button>
    </form>
  );
}
