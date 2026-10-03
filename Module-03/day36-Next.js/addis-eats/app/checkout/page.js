import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-stone-600 mb-6">Checkout form coming soon.</p>
      <Link href="/cart" className="text-amber-800 underline">
        ← Back to cart
      </Link>
    </div>
  );
}
