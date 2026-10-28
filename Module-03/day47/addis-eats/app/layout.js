import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Cart from "./menu/Cart";
import { getSession } from "@/lib/session";
import { signOut } from "./actions";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et",
  ),
  title: {
    default: "Addis Eats",
    template: "%s | Addis Eats",
  },
  description:
    "Authentic Ethiopian flavors delivered — wats, tibs, kitfo, and fasting dishes from Addis.",
  openGraph: {
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
  },
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-[var(--cream)] text-[var(--ink)]`}
      >
        <Providers>
          <header className="bg-[var(--brand)] text-amber-50 px-6 py-4 shadow-md">
            <nav className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="font-bold text-2xl tracking-tight">
                  Addis Eats
                </Link>
                <div className="hidden sm:flex gap-6 text-sm font-medium items-center">
                  <Link
                    href="/menu"
                    className="hover:text-amber-200 transition"
                  >
                    Menu
                  </Link>
                  <Cart />
                  <Link
                    href="/checkout"
                    className="hover:text-amber-200 transition"
                  >
                    Checkout
                  </Link>
                  {user?.role === "staff" && (
                    <>
                      <Link
                        href="/dashboard"
                        className="hover:text-amber-200 transition"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/kitchen"
                        className="hover:text-amber-200 transition"
                      >
                        Kitchen
                      </Link>
                      <Link
                        href="/orders"
                        className="hover:text-amber-200 transition"
                      >
                        Orders
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                {user ? (
                  <>
                    <span className="hidden sm:inline text-amber-100/80">
                      {user.name}
                    </span>
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="hover:text-amber-200 transition"
                      >
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/signin"
                    className="hover:text-amber-200 transition"
                  >
                    Sign in
                  </Link>
                )}
                <div className="sm:hidden flex gap-4">
                  <Link href="/menu">Menu</Link>
                  <Cart />
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full">
            {children}
          </main>

          <footer className="bg-[var(--brand-dark)] text-amber-100/90 text-sm px-6 py-8 mt-auto">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="font-bold text-amber-50 text-lg mb-1">
                  Addis Eats
                </p>
                <p className="text-amber-100/70">
                  Authentic Ethiopian flavors, delivered.
                </p>
              </div>
              <div className="flex gap-6 items-end">
                <Link href="/menu" className="hover:text-white transition">
                  Menu
                </Link>
                <Link href="/cart" className="hover:text-white transition">
                  Cart
                </Link>
                <span className="text-amber-100/50">© Addis Eats</span>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
