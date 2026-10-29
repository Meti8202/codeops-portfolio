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

     useEffect(() => {
          try {
               const raw = localStorage.getItem(STORAGE_KEY);
               if (raw) setItems(JSON.parse(raw));
          } catch {
               // ignore corrupt storage
          }
          setReady(true);
     }, []);

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

     function updateQuantity(id, nextQty) {
          const qty = Math.max(0, Number(nextQty) || 0);
          if (qty === 0) {
               removeItem(id);
               return;
          }
          setItems((prev) =>
               prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
          );
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
               value={{
                    items,
                    addItem,
                    removeItem,
                    updateQuantity,
                    clearCart,
                    totalETB,
                    itemCount,
               }}
          >
               {children}
          </CartContext.Provider>
     );
}
