import { useReducer, useMemo } from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
     const [state, dispatch] = useReducer(cartReducer, initialCartState);

     const total = useMemo(
          () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
          [state.items]
     );

     const count = useMemo(
          () => state.items.reduce((sum, item) => sum + item.quantity, 0),
          [state.items]
     );

     const value = useMemo(
          () => ({
               items: state.items,
               dispatch,
               total,
               count,
          }),
          [state.items, total, count]
     );

     return (
          <CartContext.Provider value={value}>
               {children}
          </CartContext.Provider>
     );
}