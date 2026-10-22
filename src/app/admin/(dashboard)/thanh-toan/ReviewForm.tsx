"use client";

import { useState } from "react";
import { approvePayment, rejectPayment } from "./actions";

export function ReviewForm({ requestId }: { requestId: string }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handle(action: "approve" | "reject") {
    setLoading(true);
    setError("");
    const result =
      action === "approve"
        ? await approvePayment(requestId, note)
        : await rejectPayment(requestId, note);
    setLoading(false);
    if (!result.ok) setError(result.error);
  }

  return (
    <div className="mt-3 space-y-2 border-t border-border pt-3">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ghi chú (không bắt buộc)"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={() => handle("approve")}
          disabled={loading}
          className="flex-1 rounded-lg bg-success px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "..." : "✓ Duyệt — kích hoạt Pro 1 năm"}
        </button>
        <button
          onClick={() => handle("reject")}
          disabled={loading}
          className="rounded-lg bg-danger px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "..." : "✗ Từ chối"}
        </button>
      </div>
    </div>
  );
}
