"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalETB } = useCart();

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
            className="flex justify-between items-center bg-white border border-[var(--line)] rounded-2xl px-5 py-4 shadow-sm gap-4"
          >
            <div className="min-w-0">
              <p className="font-bold truncate">{item.nameEn}</p>
              <p className="text-sm text-[var(--muted)]">
                {item.priceETB} ETB each
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Quantity controls */}
              <div className="flex items-center border border-[var(--line)] rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-9 h-9 flex items-center justify-center text-lg font-medium hover:bg-[var(--cream-dark)] transition"
                  aria-label={`Decrease quantity of ${item.nameEn}`}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-lg font-medium hover:bg-[var(--cream-dark)] transition"
                  aria-label={`Increase quantity of ${item.nameEn}`}
                >
                  +
                </button>
              </div>

              <p className="font-bold w-20 text-right tabular-nums">
                {item.quantity * item.priceETB} ETB
              </p>

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
            Keep adding dishes
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
