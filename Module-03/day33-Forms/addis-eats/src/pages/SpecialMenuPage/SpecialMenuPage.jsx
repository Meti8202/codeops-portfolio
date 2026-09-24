import { useMemo } from "react";
import { getSpecials } from "../../api/specialsApi";
import { useFetch } from "../../hooks/useFetch";
import LoadingState from "../../components/LoadingState";
import EmptyState from "../../components/EmptyState";
import DishCard from "../MenuPage/DishCard";
import "./SpecialMenuPage.css";

function SpecialMenuPage() {
     const { data, loading, error } = useFetch(getSpecials);

     const specials = useMemo(() => {
          const dishes = data?.data || [];

          return dishes.map((dish) => ({
               ...dish,
               image: dish.image || `${dish.slug}.jpg`,
          }));
     }, [data]);

     if (loading) {
          return <LoadingState message="Loading special dishes..." />;
     }

     if (error) {
          return (
               <EmptyState title="Could not load specials" message={error} />
          );
     }

     return (
          <section className="special-menu-page">
               <header className="special-menu-heading">
                    <h1>Special Menu</h1>
                    <p>
                         Chef-selected dishes chosen for tradition, flavour, and place at the communal table.
                    </p>
               </header>

               {specials.length === 0 ? (
                    <EmptyState
                         title="No specials right now"
                         message="Check back soon for our chef’s picks."
                    />
               ) : (
                    <div className="dish-grid">
                         {specials.map((dish) => (
                              <DishCard key={dish.id} dish={dish} />
                         ))}
                    </div>
               )}
          </section>
     );
}

export default SpecialMenuPage;