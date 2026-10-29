"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "../actions";
import { useCart } from "../providers";

export default function CheckoutPage() {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const { items, totalETB, clearCart } = useCart();

  useEffect(() => {
    if (state?.success) {
      clearCart();
    }
  }, [state?.success, clearCart]);

  if (state?.success) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-5">
        <h1 className="text-3xl font-bold">Order placed</h1>
        <p className="text-green-700 text-lg">
          Success! Order ID: <span className="font-bold">{state.id}</span>
        </p>
        <p className="text-[var(--muted)]">Your cart has been cleared.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/orders/${state.id}`}
            className="inline-block bg-[var(--brand)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--brand-dark)] transition"
          >
            Track order
          </Link>
          <Link
            href="/menu"
            className="inline-block border border-[var(--line)] px-6 py-3 rounded-full font-medium hover:bg-[var(--cream-dark)] transition"
          >
            Back to menu
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-5">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-[var(--muted)]">
          Your cart is empty. Add dishes before checking out.
        </p>
        <Link
          href="/menu"
          className="inline-block bg-[var(--brand)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--brand-dark)] transition"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  const cartItemsPayload = items.map((i) => ({
    id: i.id,
    nameEn: i.nameEn,
    quantity: i.quantity,
    priceETB: i.priceETB,
  }));

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="mb-8 border border-[var(--line)] rounded-2xl p-5 bg-white shadow-sm">
        <h2 className="font-bold mb-3">Your order</h2>
        <ul className="text-sm space-y-2 mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>
                {item.quantity} × {item.nameEn}
              </span>
              <span className="font-medium shrink-0">
                {item.quantity * item.priceETB} ETB
              </span>
            </li>
          ))}
        </ul>
        <p className="font-bold text-lg border-t border-[var(--line)] pt-3">
          Total: {totalETB} ETB
        </p>
      </div>

      {state?.error && (
        <p role="alert" className="text-red-600 text-sm mb-4">
          {state.error}{" "}
          <Link href="/signin?next=/checkout" className="underline">
            Sign in
          </Link>
        </p>
      )}

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="cartTotal" value={totalETB} />
        <input
          type="hidden"
          name="cartItems"
          value={JSON.stringify(cartItemsPayload)}
        />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="w-full border border-[var(--line)] rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
            required
          />
          {state?.fieldErrors?.name && (
            <p role="alert" className="text-red-600 text-sm mt-1.5">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="w-full border border-[var(--line)] rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
            placeholder="09xxxxxxxx or +2519xxxxxxxx"
            required
          />
          {state?.fieldErrors?.phone && (
            <p role="alert" className="text-red-600 text-sm mt-1.5">
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-semibold mb-1">
            Notes{" "}
            <span className="font-normal text-[var(--muted)]">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full border border-[var(--line)] rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto bg-[var(--brand)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--brand-dark)] disabled:opacity-50 transition"
        >
          {pending ? "Sending…" : "Place order"}
        </button>
      </form>

      <Link
        href="/cart"
        className="inline-block mt-8 text-[var(--brand)] font-medium hover:underline"
      >
        ← Back to cart
      </Link>
    </div>
  );
}
