export const initialCartState = {
  items: [],
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const dish = action.payload;
      const existing = state.items.find((item) => item.id === dish.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
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
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
}
