import { Link, useParams } from "react-router-dom";
import { getMenu } from "../../api/menuApi";
import { useFetch } from "../../hooks/useFetch";
import { useCartStore } from "../../cart/cartStore";
import LoadingState from "../../components/LoadingState";
import EmptyState from "../../components/EmptyState";
import "./DishDetailPage.css";

function DishDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(getMenu);
  const addItem = useCartStore((s) => s.addItem);

  const dishes = data?.data || [];
  const dish = dishes.find((d) => d.slug === slug);

  function handleAdd() {
    if (dish) {
      addItem(dish);
    }
  }

  if (loading) {
    return <LoadingState message="Loading dish details..." />;
  }

  if (error) {
    return (
      <section className="dish-detail-page">
        <EmptyState title="Could not load this dish" message={error} />
        <Link className="back-link" to="/menu">
          ← Back to menu
        </Link>
      </section>
    );
  }

  if (!dish) {
    return (
      <section className="dish-detail-page">
        <EmptyState
          title="Dish not found"
          message={`No dish found for "${slug}".`}
        />
        <Link className="back-link" to="/menu">
          ← Back to menu
        </Link>
      </section>
    );
  }

  return (
    <section className="dish-detail-page">
      <Link className="back-link" to="/menu">
        ← Back to menu
      </Link>

      <article className="dish-detail-card">
        <div className="dish-detail-hero">
          <img src={`/images/${dish.image}`} alt={dish.nameEn} />
        </div>

        <div className="dish-detail-content">
          <p className="dish-detail-category">{dish.category}</p>
          <h1>{dish.nameEn}</h1>
          <p className="dish-detail-amharic-mobile">{dish.nameAm}</p>

          {dish.tagline && (
            <p className="dish-detail-tagline">{dish.tagline}</p>
          )}

          <p className="dish-detail-description">{dish.description}</p>

          <div className="dish-detail-meta">
            <div>
              <span className="meta-label">Price</span>
              <strong>{dish.priceETB} ETB</strong>
            </div>
            <div>
              <span className="meta-label">Spice level</span>
              <strong>{dish.spiceLevel}</strong>
            </div>
            <div>
              <span className="meta-label">Serving</span>
              <strong>{dish.servings}</strong>
            </div>
            <div>
              <span className="meta-label">Fasting</span>
              <strong>{dish.isFasting ? "Yes" : "No"}</strong>
            </div>
          </div>

          <section className="ingredients-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {dish.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </section>

          <div className="dish-detail-actions">
            <button
              type="button"
              className="add-detail-cart-button"
              onClick={handleAdd}
            >
              Add to cart — {dish.priceETB} ETB
            </button>
            <Link className="menu-button" to="/menu">
              Continue exploring
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}

export default DishDetailPage;