import { useCart } from "../../cart/useCart";
import "./Header.css";

const Header = () => {
  const { count, total } = useCart();

  return (
    <section className="header">
      <h1 className="logo">Addis Eats</h1>
      <div className="cart-badge">
        {count} items = {total} ETB
      </div>
    </section>
  );
};

export default Header;