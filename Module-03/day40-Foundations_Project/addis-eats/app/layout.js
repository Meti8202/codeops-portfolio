import "./globals.css";
import Link from "next/link";
import Providers from "./providers";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
        <header className="bg-amber-900 text-amber-50 px-6 py-4">
          <nav className="max-w-5xl mx-auto flex gap-6 items-center">
            <Link href="/" className="font-bold text-xl">
              Addis Eats
            </Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>

        <main className="flex-1 max-w-5xl mx-auto p-6 w-full">
          <Providers>{children}</Providers>
        </main>

        <footer className="bg-stone-800 text-stone-300 text-sm px-6 py-4">
          <div className="max-w-5xl mx-auto">© Addis Eats</div>
        </footer>
      </body>
    </html>
  );
}
