import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../cart/useCart";
import "./CheckoutPage.css";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  notes: "",
};

function CheckoutPage() {
  const { items, totalItems, totalPrice, dispatch } = useCart();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    dispatch({ type: "CLEAR_CART" });
  }

  function handleNewOrder() {
    setSubmitted(false);
    setForm(initialForm);
    navigate("/menu");
  }

  if (submitted) {
    return (
      <section className="checkout-page">
        <section className="order-success-card">
          <h1>Thank you for your order!</h1>
          <p>
            We will contact you on the phone number you provided to confirm
            delivery details.
          </p>
          <div className="success-details">
            <p>
              <span>Name</span>
              <strong>{form.fullName}</strong>
            </p>
            <p>
              <span>Delivery address</span>
              <strong>{form.address}</strong>
            </p>
          </div>
          <button
            type="button"
            className="checkout-primary-button"
            onClick={handleNewOrder}
          >
            Start a new order
          </button>
        </section>
      </section>
    );
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <section className="checkout-page">
      <header className="checkout-page-heading">
        <h1>Checkout</h1>
        <p>Enter your delivery details to place your order.</p>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery details</h2>

          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="09xxxxxxxx"
            autoComplete="tel"
            pattern="^09[0-9]{8}$"
            title="Ethiopian phone: 09xxxxxxxx"
            required
          />

          <label htmlFor="address">Delivery address</label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="4"
            autoComplete="street-address"
            required
          />

          <label htmlFor="notes">
            Order notes <span>(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. mild spice, call when you arrive"
          />

          <button type="submit" className="checkout-primary-button">
            Place order — {totalPrice} ETB
          </button>
        </form>

        <aside className="checkout-summary-card">
          <h2>Your order</h2>
          <ul className="checkout-item-list">
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity} × {item.nameEn}
                </span>
                <strong>{item.priceETB * item.quantity} ETB</strong>
              </li>
            ))}
          </ul>
          <div className="checkout-summary-total">
            <span>
              Total ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
            <strong>{totalPrice} ETB</strong>
          </div>
          <Link className="back-to-cart-link" to="/cart">
            ← Back to cart
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;