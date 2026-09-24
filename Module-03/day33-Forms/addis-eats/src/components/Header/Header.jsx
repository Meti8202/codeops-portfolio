import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from "../../cart/cartStore";
import "./Header.css";

function Header() {
  const { user, signOut } = useAuth();
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const navigate = useNavigate();

  function navClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  function handleSignOut() {
    signOut();
    navigate("/", { replace: true });
  }

  return (
    <header className="site-header">
      <div className="header-content">
        <NavLink to="/" end className="brand">
          Addis Eats
        </NavLink>

        <nav className="main-nav" aria-label="Main">
          <NavLink to="/menu" className={navClass}>
            Menu
          </NavLink>
          <NavLink to="/featured" className={navClass}>
            Special
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className={navClass}>
            Checkout
          </NavLink>
        </nav>

        <NavLink
          to="/cart"
          className="cart-summary"
          aria-label={`${totalItems} items, ${totalPrice} ETB`}
        >
          <span className="cart-summary-count">
            <strong>{totalItems}</strong>
            <small>{totalItems === 1 ? "item" : "items"}</small>
          </span>
          <span className="cart-summary-total">
            <small>ETB</small>
            <strong>{totalPrice.toLocaleString()}</strong>
          </span>
        </NavLink>

        <div className="header-divider" aria-hidden="true" />

        {user ? (
          <div className="account-actions">
            <span className="user-greeting">
              Hi, <strong>{user.name}</strong>
            </span>
            <button
              type="button"
              className="sign-out-button"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <NavLink to="/signin" className="sign-in-link">
              Sign In
            </NavLink>
            <NavLink to="/register" className="register-link">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;