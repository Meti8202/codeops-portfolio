import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from "../../cart/cartStore";
import { useAuth } from "../../auth/useAuth";
import { checkoutSchema, AREAS } from "../../checkout/schema";
import { placeOrder } from "../../api/orders";
import "./CheckoutPage.css";

function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      area: "",
      notes: "",
    },
    mode: "onBlur",
  });

  async function onValid(data) {
    try {
      await placeOrder(data, items);
      setCompletedOrder(data);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      if (err.status === 422 && err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        const first = Object.keys(err.fieldErrors)[0];
        if (first) setFocus(first);
        return;
      }
      setError("root", {
        type: "server",
        message: err.message || "Could not place the order. Please try again.",
      });
    }
  }

  function onInvalid(formErrors) {
    const first = Object.keys(formErrors)[0];
    if (first) setFocus(first);
  }

  function handleNewOrder() {
    setOrderComplete(false);
    setCompletedOrder(null);
    reset({
      name: user?.name || "",
      phone: user?.phone || "",
      area: "",
      notes: "",
    });
    navigate("/menu");
  }

  // Success stays until the user clicks "Start a new order"
  if (orderComplete && completedOrder) {
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
              <strong>{completedOrder.name}</strong>
            </p>
            <p>
              <span>Phone</span>
              <strong>{completedOrder.phone}</strong>
            </p>
            <p>
              <span>Delivery area</span>
              <strong>{completedOrder.area}</strong>
            </p>
            {completedOrder.notes ? (
              <p>
                <span>Notes</span>
                <strong>{completedOrder.notes}</strong>
              </p>
            ) : null}
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
        <form
          className="checkout-form"
          onSubmit={handleSubmit(onValid, onInvalid)}
          noValidate
        >
          <h2>Delivery details</h2>

          {errors.root && (
            <p className="field-error" role="alert">
              {errors.root.message}
            </p>
          )}

          <div className="checkout-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="field-error" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="checkout-field">
            <label htmlFor="phone">TeleBirr phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="09xxxxxxxx or +2519xxxxxxxx"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
            {errors.phone && (
              <p id="phone-error" className="field-error" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="checkout-field">
            <label htmlFor="area">Delivery area</label>
            <select
              id="area"
              aria-invalid={Boolean(errors.area)}
              aria-describedby={errors.area ? "area-error" : undefined}
              {...register("area")}
            >
              <option value="">Choose an area</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {errors.area && (
              <p id="area-error" className="field-error" role="alert">
                {errors.area.message}
              </p>
            )}
          </div>

          <div className="checkout-field">
            <label htmlFor="notes">Order notes (optional)</label>
            <textarea
              id="notes"
              rows="3"
              placeholder="e.g. mild spice, call when you arrive"
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={errors.notes ? "notes-error" : undefined}
              {...register("notes")}
            />
            {errors.notes && (
              <p id="notes-error" className="field-error" role="alert">
                {errors.notes.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="checkout-primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting
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