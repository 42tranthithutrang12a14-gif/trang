"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { getSettings } from "@/lib/settings";

type Settings = Awaited<ReturnType<typeof getSettings>>;

type QuoteItem = {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
};

// Điền tạm theo giá anh/chị gửi qua ảnh (nghìn đồng/m²) — sửa lại thoải mái, thêm/xoá dòng tuỳ ý.
const INITIAL_ITEMS: Omit<QuoteItem, "id">[] = [
  { code: "3602", name: "Gạch ốp/lát 3602", unit: "m²", quantity: 0, price: 120000 },
  { code: "3601", name: "Gạch ốp/lát 3601", unit: "m²", quantity: 0, price: 28000 },
  { code: "", name: "Gạch màu kem", unit: "m²", quantity: 0, price: 260000 },
  { code: "66107", name: "Gạch vân gỗ 66107", unit: "m²", quantity: 0, price: 190000 },
  { code: "66110", name: "Gạch vân gỗ 66110", unit: "m²", quantity: 0, price: 95000 },
];

function formatVnd(n: number): string {
  return n.toLocaleString("vi-VN");
}

function todayVn(): { day: string; month: string; year: string } {
  const now = new Date();
  return {
    day: String(now.getDate()).padStart(2, "0"),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    year: String(now.getFullYear()),
  };
}

export function QuoteBuilder({ settings }: { settings: Settings }) {
  const nextId = useRef(INITIAL_ITEMS.length);
  const [items, setItems] = useState<QuoteItem[]>(
    INITIAL_ITEMS.map((item, i) => ({ ...item, id: i }))
  );
  const [customer, setCustomer] = useState({ name: "", address: "", phone: "" });
  const [quoteNo, setQuoteNo] = useState("");
  const [note, setNote] = useState("Báo giá có hiệu lực trong 15 ngày kể từ ngày phát hành.");
  const date = todayVn();

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  );

  function updateItem(id: number, patch: Partial<QuoteItem>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addRow() {
    setItems((prev) => [
      ...prev,
      { id: nextId.current++, code: "", name: "", unit: "m²", quantity: 0, price: 0 },
    ]);
  }

  function removeRow(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <div className="no-print mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
        >
          In / Lưu PDF
        </button>
      </div>

      <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-border bg-white p-8 text-sm text-neutral-900 print:mt-0 print:max-w-none print:border-0 print:p-0">
        {/* Header công ty */}
        <div className="flex items-start justify-between gap-6 border-b border-neutral-300 pb-4">
          <div className="flex items-start gap-3">
            {settings.logoUrl && (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src={settings.logoUrl} alt="Logo" fill className="object-contain" />
              </div>
            )}
            <div>
              <p className="font-semibold uppercase">{settings.companyName}</p>
              {settings.address && <p className="text-neutral-600">Đ/c: {settings.address}</p>}
              {settings.phone && <p className="text-neutral-600">ĐT: {settings.phone}</p>}
              {settings.email && <p className="text-neutral-600">Email: {settings.email}</p>}
              {settings.taxId && <p className="text-neutral-600">MST: {settings.taxId}</p>}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold uppercase tracking-wide">Bảng báo giá</h2>
            <div className="mt-1 flex items-center justify-end gap-1 text-neutral-600">
              <span>Số:</span>
              <input
                value={quoteNo}
                onChange={(e) => setQuoteNo(e.target.value)}
                placeholder="..."
                className="w-24 border-b border-dotted border-neutral-400 bg-transparent text-right outline-none"
              />
            </div>
            <p className="mt-1 text-neutral-600">
              Ngày {date.day} tháng {date.month} năm {date.year}
            </p>
          </div>
        </div>

        {/* Thông tin khách hàng */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-28 shrink-0 font-medium">Kính gửi:</span>
            <input
              value={customer.name}
              onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
              placeholder="Tên khách hàng / công ty"
              className="flex-1 border-b border-dotted border-neutral-400 bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 shrink-0 font-medium">Địa chỉ:</span>
            <input
              value={customer.address}
              onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
              className="flex-1 border-b border-dotted border-neutral-400 bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 shrink-0 font-medium">Điện thoại:</span>
            <input
              value={customer.phone}
              onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
              className="flex-1 border-b border-dotted border-neutral-400 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Bảng hàng hoá */}
        <table className="mt-5 w-full border-collapse text-left">
          <thead>
            <tr className="border-y border-neutral-400 text-xs uppercase text-neutral-600">
              <th className="px-1 py-2 font-medium">STT</th>
              <th className="px-1 py-2 font-medium">Mã</th>
              <th className="px-1 py-2 font-medium">Tên hàng hoá</th>
              <th className="px-1 py-2 font-medium">ĐVT</th>
              <th className="px-1 py-2 text-right font-medium">SL</th>
              <th className="px-1 py-2 text-right font-medium">Đơn giá</th>
              <th className="px-1 py-2 text-right font-medium">Thành tiền</th>
              <th className="no-print px-1 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className="border-b border-neutral-200">
                <td className="px-1 py-1.5 align-top">{i + 1}</td>
                <td className="px-1 py-1.5 align-top">
                  <input
                    value={item.code}
                    onChange={(e) => updateItem(item.id, { code: e.target.value })}
                    className="w-16 bg-transparent outline-none"
                  />
                </td>
                <td className="px-1 py-1.5 align-top">
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    className="w-full min-w-[140px] bg-transparent outline-none"
                  />
                </td>
                <td className="px-1 py-1.5 align-top">
                  <input
                    value={item.unit}
                    onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                    className="w-14 bg-transparent outline-none"
                  />
                </td>
                <td className="px-1 py-1.5 align-top text-right">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                    className="w-16 bg-transparent text-right outline-none"
                  />
                </td>
                <td className="px-1 py-1.5 align-top text-right">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                    className="w-24 bg-transparent text-right outline-none"
                  />
                </td>
                <td className="px-1 py-1.5 align-top text-right font-medium">
                  {formatVnd(item.quantity * item.price)}
                </td>
                <td className="no-print px-1 py-1.5 align-top text-right">
                  <button
                    type="button"
                    onClick={() => removeRow(item.id)}
                    className="text-neutral-400 hover:text-red-600"
                    aria-label="Xoá dòng"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={addRow}
          className="no-print mt-2 text-sm text-accent hover:underline"
        >
          + Thêm dòng
        </button>

        <div className="mt-2 flex justify-end border-t border-neutral-400 pt-2">
          <div className="flex w-64 justify-between font-semibold">
            <span>Tổng cộng</span>
            <span>{formatVnd(total)} đ</span>
          </div>
        </div>

        {/* Ghi chú */}
        <div className="mt-4">
          <span className="font-medium">Ghi chú:</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-1 w-full resize-none bg-transparent text-neutral-700 outline-none print:resize-none"
          />
        </div>

        {/* Ký tên */}
        <div className="mt-10 grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="font-medium">NGƯỜI LẬP BÁO GIÁ</p>
            <p className="text-xs text-neutral-500">(Ký, ghi rõ họ tên)</p>
          </div>
          <div>
            <p className="font-medium">ĐẠI DIỆN KHÁCH HÀNG</p>
            <p className="text-xs text-neutral-500">(Ký, ghi rõ họ tên)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
