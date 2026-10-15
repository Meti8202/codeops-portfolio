"use client";

import { useState } from "react";
import { useCart } from "../providers";

export default function AddToCartButton({ dish }) {
     const { addItem } = useCart();
     const [added, setAdded] = useState(false);

     function handleClick() {
          addItem({
               id: dish.id,
               slug: dish.slug,
               nameEn: dish.nameEn,
               priceETB: dish.priceETB,
          });
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
     }

     return (
          <button
               type="button"
               onClick={handleClick}
               className={`w-full mt-2 px-4 py-2.5 rounded-full text-sm font-bold transition-colors ${added
                    ? "bg-green-700 text-white"
                    : "bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)]"
                    }`}
          >
               {added ? "Added to cart ✓" : "Add to order"}
          </button>
     );
}