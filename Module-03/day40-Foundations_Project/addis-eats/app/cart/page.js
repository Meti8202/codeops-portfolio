"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartPage() {
  const { items, removeItem, totalETB } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-4">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-[var(--muted)]">Nothing here yet.</p>
        <Link
          href="/menu"
          className="inline-block bg-[var(--brand)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--brand-dark)] transition"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <ul className="space-y-3 mb-8">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white border border-[var(--line)] rounded-2xl px-5 py-4 shadow-sm"
          >
            <div>
              <p className="font-bold">{item.nameEn}</p>
              <p className="text-sm text-[var(--muted)]">
                {item.quantity} × {item.priceETB} ETB
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p className="font-bold">{item.quantity * item.priceETB} ETB</p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-sm font-medium text-red-700 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-white border border-[var(--line)] rounded-2xl px-5 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <p className="text-xl font-bold">Total: {totalETB} ETB</p>
        <div className="flex gap-3">
          <Link
            href="/menu"
            className="px-5 py-2.5 rounded-full border border-[var(--line)] font-medium hover:bg-[var(--cream-dark)] transition"
          >
            Keep browsing
          </Link>
          <Link
            href="/checkout"
            className="px-5 py-2.5 rounded-full bg-[var(--brand)] text-white font-bold hover:bg-[var(--brand-dark)] transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
