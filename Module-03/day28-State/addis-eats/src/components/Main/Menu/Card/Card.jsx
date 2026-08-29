
import "./Card.css"
import OrderButton from '../OrderButton/OrderButton'

const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
      {/* <OrderButton /> */}
    </div>

  )
}

export default Card