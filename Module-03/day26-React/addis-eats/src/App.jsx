import Dish from "./components/Dish/Dish";
import Header from "./components/Header/Header";
import "./App.css"



function App() {
  const menu = [
    { id: 1, name: "Doro Wat", price: 240 },
    { id: 2, name: "Shiro", price: 120 },
    { id: 3, name: "Tibs", price: 280 },
    { id: 4, name: "Kitfo", price: 320 },
  ];

  return (
    <div className="App">
      <Header />
      {menu.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
        />
      ))}
    </div>
  );
}

export default App;