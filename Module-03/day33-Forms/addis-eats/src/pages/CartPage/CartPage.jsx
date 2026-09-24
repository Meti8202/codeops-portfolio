import { Link } from "react-router-dom";
import {
     useCartStore,
     selectTotalItems,
     selectTotalPrice,
} from "../../cart/cartStore";
import "./CartPage.css";

function CartPage() {
     const items = useCartStore((s) => s.items);
     const totalItems = useCartStore(selectTotalItems);
     const totalPrice = useCartStore(selectTotalPrice);
     const increaseQuantity = useCartStore((s) => s.increaseQuantity);
     const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
     const removeItem = useCartStore((s) => s.removeItem);
     const clearCart = useCartStore((s) => s.clearCart);

     if (items.length === 0) {
          return (
               <section className="cart-page">
                    <header className="cart-page-heading">
                         <h1>Your Cart</h1>
                    </header>
                    <section className="empty-cart">
                         <h2>Your cart is empty</h2>
                         <p>Explore the menu and add something you would like to order.</p>
                         <Link className="cart-primary-button" to="/menu">
                              Explore the menu
                         </Link>
                    </section>
               </section>
          );
     }

     return (
          <section className="cart-page">
               <header className="cart-page-heading">
                    <h1>Your Cart</h1>
                    <p>
                         {totalItems} {totalItems === 1 ? "item" : "items"} in your order.
                    </p>
               </header>

               <div className="cart-layout">
                    <section className="cart-items-section">
                         {items.map((item) => (
                              <article className="cart-item" key={item.id}>
                                   <div className="cart-item-thumb">
                                        {item.image ? (
                                             <img src={`/images/${item.image}`} alt="" />
                                        ) : (
                                             <span>{item.nameEn.charAt(0)}</span>
                                        )}
                                   </div>

                                   <div className="cart-item-details">
                                        <h2>{item.nameEn}</h2>
                                        <p>{item.priceETB} ETB each</p>

                                        <div className="quantity-controls">
                                             <button
                                                  type="button"
                                                  className="quantity-button"
                                                  onClick={() => decreaseQuantity(item.id)}
                                                  aria-label={`Decrease ${item.nameEn}`}
                                             >
                                                  −
                                             </button>
                                             <span className="quantity-value">{item.quantity}</span>
                                             <button
                                                  type="button"
                                                  className="quantity-button"
                                                  onClick={() => increaseQuantity(item.id)}
                                                  aria-label={`Increase ${item.nameEn}`}
                                             >
                                                  +
                                             </button>
                                        </div>
                                   </div>

                                   <div className="cart-item-total">
                                        <strong>{item.priceETB * item.quantity} ETB</strong>
                                        <button
                                             type="button"
                                             className="remove-item-button"
                                             onClick={() => removeItem(item.id)}
                                        >
                                             Remove
                                        </button>
                                   </div>
                              </article>
                         ))}
                    </section>

                    <aside className="cart-summary-card">
                         <h2>Order Summary</h2>
                         <div className="summary-row">
                              <span>Items</span>
                              <span>{totalItems}</span>
                         </div>
                         <div className="summary-row summary-total">
                              <span>Total</span>
                              <strong>{totalPrice} ETB</strong>
                         </div>

                         <Link className="cart-primary-button checkout-button" to="/checkout">
                              Continue to checkout
                         </Link>
                         <Link className="continue-menu-link" to="/menu">
                              ← Continue shopping
                         </Link>
                         <button
                              type="button"
                              className="clear-cart-button"
                              onClick={clearCart}
                         >
                              Clear cart
                         </button>
                    </aside>
               </div>
          </section>
     );
}

export default CartPage;