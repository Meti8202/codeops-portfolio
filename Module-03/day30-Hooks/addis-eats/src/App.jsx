import { CartProvider } from "./cart/CartProvider";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <section className="container">
        <Header />
        <Main />
        <Footer />
      </section>
    </CartProvider>
  );
}

export default App;