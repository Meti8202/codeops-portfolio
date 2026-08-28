
import Dish from './Dish/Dish'
import Card from './Card/Card'
import "./Menu.css"

const dishes = [
     { id: 1, name: "Doro Wat", price: 240, category: "Main", spicy: true, },
     { id: 2, name: "Shiro", price: 120, category: "Main", spicy: false },
     { id: 3, name: "Tibs", price: 280, category: "Main", spicy: true },
     { id: 4, name: "Injera", price: 50, category: "Side", spicy: false },
     { id: 5, name: "Kitfo", price: 320, category: "Main", spicy: true },
]

const Menu = () => {

     const selectedCategory = "Main"

     const filteredDishes = dishes.filter(
          (dish) => dish.category === selectedCategory
     )

     if (filteredDishes.length === 0) {
          return (
               <section className='menu'>
                    <p>No {selectedCategory} dishes found.</p>
               </section>
          )
     }

     return (
          <section className='menu'>
               {filteredDishes.map((dish) => (
                    <Card key={dish.id}>
                         <Dish
                              name={dish.name}
                              price={dish.price}
                              category={dish.category} spicy={dish.spicy}

                         />
                    </Card>
               ))}
          </section>
     )
}

export default Menu