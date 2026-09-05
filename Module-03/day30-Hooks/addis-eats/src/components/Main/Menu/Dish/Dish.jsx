import PropTypes from "prop-types";
import { useCart } from "../../../../cart/useCart";
import "./Dish.css";

const Dish = ({ id, name, price, image, spicy = false, currency = "ETB", category }) => {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({ type: "add", dish: { id, name, price, image, spicy, category } });
  };

  return (
    <section className="dish-card">
      <div className="dish-image">
        <img src={`/images/${image}`} alt={name} />
      </div>

      <div className="dish-details">
        <div className="dish-name">
          {name}

        </div>
        <div className="dish-price">
          {price} {currency}
        </div>
      </div>

      <div className="dish-cats">  {category && <p className="dish-category">{category}</p>}
       
        {spicy && <span className="badge"> Spicy</span>} </div>

      <div className="dish-actions">
        <button className="add-btn" onClick={handleAdd}>
          Add to cart
        </button>
      </div>
    </section>
  );
};

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  category: PropTypes.string,
};

export default Dish;