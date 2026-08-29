import { useState } from "react";
import { dishes, categories } from "../../../data";
import CategoryBar from "./CategoryBar/CategoryBar";
import Dish from "./Dish/Dish";
import Card from "./Card/Card";
import "./Menu.css";

const Menu = () => {
     const [selectedCategory, setSelectedCategory] = useState("All");
     const [orderTotal, setOrderTotal] = useState(0);

     const filteredDishes =
          selectedCategory === "All"
               ? dishes
               : dishes.filter((dish) => dish.category === selectedCategory);

     const handleAdd = (price) => {
          setOrderTotal((prev) => prev + price);
     };

     return (
          <section className="menu">
               <CategoryBar
                    categories={categories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
               />

               <p className="order-total">Order Total: {orderTotal} ETB</p>

               {filteredDishes.length === 0 ? (
                    <p>No {selectedCategory} dishes found.</p>
               ) : (
                    <div className="dish-grid">
                         {filteredDishes.map((dish) => (
                              <Card key={dish.id}>
                                   <Dish
                                   image ={dish.image}
                                        name={dish.name}
                                        price={dish.price}
                                        spicy={dish.spicy}
                                        category={dish.category}
                                        onAdd={handleAdd}
                                   />
                              </Card>
                         ))}
                    </div>
               )}
          </section>
     );
};

export default Menu;