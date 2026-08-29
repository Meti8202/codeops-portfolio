import { useState } from "react";
import PropTypes from "prop-types";
import "./Dish.css";

const Dish = ({ name, price, image, spicy = false, currency = "ETB", category, onAdd }) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    onAdd(price); 
  };

  return (
    <section className="dish-card">
      <div className="dish-image">
        <img src={`/images/${image}`}/>
      </div>

      <div className="dish-details">
        <div className="dish-name">
          {name}
          {spicy && <span className="badge"> Spicy</span>}
        </div>
        <div className="dish-price">
          {price} {currency}
        </div>
      </div>

      {category && <p className="dish-category">{category}</p>}

      <div className="dish-actions">
        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
        {count > 0 && <span className="count">{count}</span>}
      </div>
    </section>
  );
};

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  category: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

export default Dish;