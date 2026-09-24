import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getMenu } from "../../api/menuApi";
import { useFetch } from "../../hooks/useFetch";
import LoadingState from "../../components/LoadingState";
import EmptyState from "../../components/EmptyState";
import CategoryBar from "./CategoryBar";
import DishCard from "./DishCard";
import "./MenuPage.css";

function MenuPage() {
     const { data, loading, error } = useFetch(getMenu);
     const [searchParams, setSearchParams] = useSearchParams();

     const selectedCategory = searchParams.get("category") || "All";
     const dishes = data?.data || [];

     const categories = useMemo(() => {
          const cats = dishes.map((d) => d.category);
          return ["All", ...new Set(cats)];
     }, [dishes]);

     const filtered = useMemo(() => {
          if (selectedCategory === "All") return dishes;
          return dishes.filter((d) => d.category === selectedCategory);
     }, [dishes, selectedCategory]);

     function handleSelect(category) {
          if (category === "All") {
               setSearchParams({});
          } else {
               setSearchParams({ category });
          }
     }

     if (loading) return <LoadingState message="Loading the menu..." />;
     if (error) return <EmptyState title="Could not load the menu" message={error} />;

     return (
          <section className="menu-page">
               <header className="menu-page-heading">
                    <h1>Our Menu</h1>
                    <p>Traditional Ethiopian dishes, prepared for sharing.</p>
               </header>

               <CategoryBar
                    categories={categories}
                    selected={selectedCategory}
                    onSelect={handleSelect}
               />

               {filtered.length === 0 ? (
                    <EmptyState
                         title="No dishes in this category"
                         message="Choose another category to see more dishes."
                    />
               ) : (
                    <div className="dish-grid">
                         {filtered.map((dish) => (
                              <DishCard key={dish.id} dish={dish} />
                         ))}
                    </div>
               )}
          </section>
     );
}

export default MenuPage;