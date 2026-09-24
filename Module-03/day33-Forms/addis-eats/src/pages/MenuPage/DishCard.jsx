import { Link } from "react-router-dom";
import { useCartStore } from "../../cart/cartStore";
import "./DishCard.css";

function DishCard({ dish }) {
  const addItem = useCartStore((s) => s.addItem);

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
          <button
            type="button"
            className="add-to-cart-button"
            onClick={() => addItem(dish)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;