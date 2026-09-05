import "./Dish.css"

function Dish({ name, price }) {
     return (
          <section className="dish">
               <h3>{name}</h3>
               <p>{price} ETB</p>
          </section>
     );
}



export default Dish;