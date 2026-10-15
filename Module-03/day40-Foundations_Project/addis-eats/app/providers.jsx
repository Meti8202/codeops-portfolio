"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "addis-eats-cart";

export function useCart() {
     const ctx = useContext(CartContext);
     if (!ctx) throw new Error("useCart must be used inside Providers");
     return ctx;
}

export default function Providers({ children }) {
     const [items, setItems] = useState([]);
     const [ready, setReady] = useState(false);

     // Load from localStorage once on the client
     useEffect(() => {
          try {
               const raw = localStorage.getItem(STORAGE_KEY);
               if (raw) setItems(JSON.parse(raw));
          } catch {
               // ignore bad data
          }
          setReady(true);
     }, []);

     // Persist whenever items change (after first load)
     useEffect(() => {
          if (!ready) return;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
     }, [items, ready]);

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
          localStorage.removeItem(STORAGE_KEY);
     }

     const totalETB = items.reduce(
          (sum, i) => sum + i.priceETB * i.quantity,
          0
     );

     const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

     return (
          <CartContext.Provider
               value={{ items, addItem, removeItem, clearCart, totalETB, itemCount }}
          >
               {children}
          </CartContext.Provider>
     );
}