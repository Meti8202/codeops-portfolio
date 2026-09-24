import { Link } from "react-router-dom";
import { useCart } from "../../cart/useCart";
import "./DishCard.css";

function DishCard({ dish }) {
  const { dispatch } = useCart();

  function handleAdd() {
    dispatch({ type: "ADD_ITEM", payload: dish });
  }

  return (
    <article className="dish-card">
      <div className="dish-image">
        <img src={`/images/${dish.image}`} alt={dish.nameEn} />
      </div>

      <div className="dish-content">
        <p className="dish-category">{dish.category}</p>
        <h2>{dish.nameEn}</h2>
        <p className="dish-amharic-name">{dish.nameAm}</p>
        <p className="dish-description">{dish.description}</p>

        <div className="dish-bottom">
          <strong className="dish-price">{dish.priceETB} ETB</strong>
        </div>

        <div className="dish-actions">
          <Link className="dish-link" to={`/menu/${dish.slug}`}>
            View dish
          </Link>
          <button type="button" className="add-to-cart-button" onClick={handleAdd}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;