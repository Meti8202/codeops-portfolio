"use client";

import { useCart } from "../providers";

export default function AddToCartButton({ dish }) {
     const { addItem } = useCart();

     return (
          <button
               type="button"
               onClick={() =>
                    addItem({
                         id: dish.id,
                         slug: dish.slug,
                         nameEn: dish.nameEn,
                         priceETB: dish.priceETB,
                    })
               }
               className="mt-6 bg-amber-800 text-white px-6 py-3 rounded-lg font-medium"
          >
               Add to order
          </button>
     );
}