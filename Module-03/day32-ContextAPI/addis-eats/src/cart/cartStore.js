import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === dish.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: dish.id,
                slug: dish.slug,
                nameEn: dish.nameEn,
                priceETB: dish.priceETB,
                image: dish.image || "",
                quantity: 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-cart",
    },
  ),
);

export const selectTotalItems = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.items.reduce((sum, item) => sum + item.priceETB * item.quantity, 0);
