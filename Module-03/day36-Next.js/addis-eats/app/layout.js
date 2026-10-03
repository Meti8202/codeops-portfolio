import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900">
        <nav className="bg-amber-900 text-amber-50 px-6 py-4 flex gap-6 items-center">
          <Link href="/" className="font-bold text-xl">
            Addis Eats
          </Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
