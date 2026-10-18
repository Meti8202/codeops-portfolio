
import "./Card.css"
import OrderButton from '../OrderButton/OrderButton'

const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>

  )
}

export default Card