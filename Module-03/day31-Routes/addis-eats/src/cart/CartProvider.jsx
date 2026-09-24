import { createContext, useEffect, useMemo, useReducer } from "react";
import { cartReducer, initialCartState } from "./cartReducer";

export const CartContext = createContext(null);

const CART_KEY = "addis-eats-cart";

function loadCart() {
     try {
          const saved = localStorage.getItem(CART_KEY);
          if (!saved) return initialCartState;
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed?.items)) return parsed;
          return initialCartState;
     } catch {
          return initialCartState;
     }
}

function CartProvider({ children }) {
     const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

     useEffect(() => {
          try {
               localStorage.setItem(CART_KEY, JSON.stringify(state));
          } catch {
              
          }
     }, [state]);

     const totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
     );

     const totalPrice = state.items.reduce(
          (sum, item) => sum + item.priceETB * item.quantity,
          0
     );

     const value = useMemo(
          () => ({
               items: state.items,
               totalItems,
               totalPrice,
               dispatch,
          }),
          [state.items, totalItems, totalPrice]
     );

     return (
          <CartContext.Provider value={value}>{children}</CartContext.Provider>
     );
}

export default CartProvider;