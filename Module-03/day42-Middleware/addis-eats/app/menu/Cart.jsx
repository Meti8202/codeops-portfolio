"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function Cart() {
     const { itemCount } = useCart();
     return (
          <Link href="/cart" className="hover:text-amber-200 transition">
               Cart{itemCount > 0 ? ` (${itemCount})` : ""}
          </Link>
     );
}