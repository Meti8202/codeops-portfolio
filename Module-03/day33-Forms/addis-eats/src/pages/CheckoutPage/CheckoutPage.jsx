import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from "../../cart/cartStore";
import { useAuth } from "../../auth/useAuth";
import { validate, AREAS } from "../../checkout/validate";
import { placeOrder } from "../../api/orders";
import Field from "../../checkout/Field";
import "./CheckoutPage.css";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(() => ({
    ...initialForm,
    name: user?.name || "",
    phone: user?.phone || "",
  }));
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverFieldErrors, setServerFieldErrors] = useState({});
  const [orderDone, setOrderDone] = useState(false);

  const errors = validate(form);
  const allErrors = { ...errors, ...serverFieldErrors };
  const hasErrors = Object.keys(allErrors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setServerError("");
    setServerFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function showError(field) {
    return (touched[field] || submitted) && allErrors[field];
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    setServerFieldErrors({});

    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    try {
      await placeOrder(form, items);
      clearCart();
      setOrderDone(true);
    } catch (err) {
      if (err.status === 422 && err.fieldErrors) {
        setServerFieldErrors(err.fieldErrors);
        const first = Object.keys(err.fieldErrors)[0];
        document.getElementById(first)?.focus();
      } else {
        setServerError(
          err.message || "Couldn't place order. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleNewOrder() {
    setOrderDone(false);
    setSubmitted(false);
    setTouched({});
    setForm({
      ...initialForm,
      name: user?.name || "",
      phone: user?.phone || "",
    });
    navigate("/menu");
  }

  if (orderDone) {
    return (
      <section className="checkout-page">
        <section className="order-success-card">
          <h1>Thank you for your order!</h1>
          <p>
            We will contact you on the phone number you provided to confirm delivery details.
          </p>
          <div className="success-details">
            <p>
              <span>Name</span>
              <strong>{form.name}</strong>
            </p>
            <p>
              <span>Delivery area</span>
              <strong>{form.area}</strong>
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
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Delivery details</h2>

          {submitted && hasErrors && (
            <div className="error-summary" role="alert">
              <p>Please fix {Object.keys(allErrors).length} field(s):</p>
              <ul>
                {Object.entries(allErrors).map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${field}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {serverError && (
            <p className="field-error" role="alert">
              {serverError}
            </p>
          )}

          <Field id="name" label="Full name" error={showError("name")}>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              aria-invalid={Boolean(showError("name"))}
              aria-describedby={
                showError("name") ? "name-error" : undefined
              }
            />
          </Field>

          <Field
            id="phone"
            label="TeleBirr phone"
            error={showError("phone")}
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="09xxxxxxxx or +2519xxxxxxxx"
              autoComplete="tel"
              aria-invalid={Boolean(showError("phone"))}
              aria-describedby={
                showError("phone") ? "phone-error" : undefined
              }
            />
          </Field>

          <Field
            id="area"
            label="Delivery area"
            error={showError("area")}
          >
            <select
              id="area"
              name="area"
              value={form.area}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(showError("area"))}
              aria-describedby={
                showError("area") ? "area-error" : undefined
              }
            >
              <option value="">Choose an area</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="notes"
            label="Order notes (optional)"
            error={showError("notes")}
          >
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="3"
              placeholder="e.g. mild spice, call when you arrive"
              aria-invalid={Boolean(showError("notes"))}
              aria-describedby={
                showError("notes") ? "notes-error" : undefined
              }
            />
          </Field>

          <button
            type="submit"
            className="checkout-primary-button"
            disabled={submitting}
          >
            {submitting
              ? "Sending your order…"
              : `Place order — ${totalPrice} ETB`}
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