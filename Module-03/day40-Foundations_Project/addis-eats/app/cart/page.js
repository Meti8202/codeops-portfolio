"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartPage() {
  const { items, removeItem, totalETB } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-stone-600 mb-6">Cart is empty.</p>
        <Link href="/menu" className="text-amber-800 underline">
          Continue browsing menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-4 mb-8">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">{item.nameEn}</p>
              <p className="text-sm text-stone-600">
                {item.quantity} × {item.priceETB} ETB
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">{item.quantity * item.priceETB} ETB</p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-700 underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-xl font-bold mb-6">Total: {totalETB} ETB</p>

      <div className="flex gap-4">
        <Link href="/menu" className="text-amber-800 underline">
          Continue browsing menu
        </Link>
        <Link
          href="/checkout"
          className="bg-amber-800 text-white px-5 py-2 rounded-lg"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
