"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function useCart() {
     const ctx = useContext(CartContext);
     if (!ctx) throw new Error("useCart must be used inside Providers");
     return ctx;
}

export default function Providers({ children }) {
     const [items, setItems] = useState([]);

     function addItem(dish) {
          setItems((prev) => {
               const existing = prev.find((i) => i.id === dish.id);
               if (existing) {
                    return prev.map((i) =>
                         i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
                    );
               }
               return [...prev, { ...dish, quantity: 1 }];
          });
     }

     function removeItem(id) {
          setItems((prev) => prev.filter((i) => i.id !== id));
     }

     function clearCart() {
          setItems([]);
     }

     const totalETB = items.reduce(
          (sum, i) => sum + i.priceETB * i.quantity,
          0
     );

     return (
          <CartContext.Provider
               value={{ items, addItem, removeItem, clearCart, totalETB }}
          >
               {children}
          </CartContext.Provider>
     );
}