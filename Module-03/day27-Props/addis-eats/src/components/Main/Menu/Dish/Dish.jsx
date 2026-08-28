
import PropTypes from 'prop-types'
import "./Dish.css"

const Dish = ({ name, price, spicy = false, currency = "ETB", category }) => {
     return (
          <section className='dish-card'>
               <div className='dish-image'>
                    <img src={`/images/${name}.jpg`} />
               </div>

               <div className='dish-details'>
                    <div className='dish-name'>{name} </div>
                    <div className='dish-category'>{category}</div>
                    <div>{spicy && <span className="badge">Spicy</span>}</div>

                    <div className='dish-price'>{price} {currency}</div>
               </div>
          </section >
     )
}

Dish.propTypes = {
     name: PropTypes.string.isRequired,
     price: PropTypes.number.isRequired,
     spicy: PropTypes.bool,
     currency: PropTypes.string,
}

export default Dish