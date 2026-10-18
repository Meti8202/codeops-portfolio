import { useState, useMemo } from "react";
import { useFetch } from "../../../hooks/useFetch";
import CategoryBar from "./CategoryBar/CategoryBar";
import Dish from "./Dish/Dish";
import Card from "./Card/Card";
import "./Menu.css";

const categories = ["All", "Main", "Side"];

const Menu = () => {
     const [selectedCategory, setSelectedCategory] = useState("All");
     const { data: dishes, loading, error } = useFetch("/dishes.json");

     
     const filteredDishes = useMemo(() => {
          if (!dishes) return [];
          if (selectedCategory === "All") return dishes;
          return dishes.filter((d) => d.category === selectedCategory);
     }, [dishes, selectedCategory]);

     if (loading) return <p className="menu">Loading menu…</p>;
     if (error) return <p className="menu">Error: {error}</p>;

     return (
          <section className="menu">
               <CategoryBar
                    categories={categories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
               />

               {filteredDishes.length === 0 ? (
                    <p>No {selectedCategory} dishes found.</p>
               ) : (
                    <div className="dish-grid">
                         {filteredDishes.map((dish) => (
                              <Card key={dish.id}>
                                   <Dish
                                        id={dish.id}
                                        name={dish.name}
                                        price={dish.price}
                                        image={dish.image}
                                        spicy={dish.spicy}
                                        category={dish.category}
                                   />
                              </Card>
                         ))}
                    </div>
               )}
          </section>
     );
};

export default Menu;