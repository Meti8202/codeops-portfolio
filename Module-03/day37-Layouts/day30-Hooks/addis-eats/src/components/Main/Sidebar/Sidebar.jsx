import { useCart } from "../../../cart/useCart";
import OrderForm from "./OrderForm/OrderForm";
import "./Sidebar.css";

const Sidebar = () => {
  const { items, total, dispatch } = useCart();

  return (
    <section className="sidebar">
      <div className="orders">
        <h3>Your Order</h3>

        {items.length === 0 ? (
          <p className="cart-status">Cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} × {item.quantity} — {item.price * item.quantity} ETB
                  </span>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => dispatch({ type: "remove", id: item.id })}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="order-bottom">
              <p className="cart-total">Total: {total} ETB</p>
              <button
                type="button"
                className="clear-btn"
                onClick={() => dispatch({ type: "clear" })}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>

      <span className="divider"></span>

      <div className="delivery">
        <h3>Delivery</h3>
        <OrderForm />
      </div>
    </section>
  );
};

export default Sidebar;