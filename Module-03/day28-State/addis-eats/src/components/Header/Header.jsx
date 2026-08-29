import "./Header.css"
import OrderCounter from './OrderCounter/OrderCounter'
import CategoryBar from "../Main/Menu/CategoryBar/CategoryBar"


const Header = () => {
  return (
    <section className='header'>
      <h1 className='logo'>Addis Eats</h1>
      <div className='event'>
        <OrderCounter />
      </div>
    </section>
  )
}

export default Header