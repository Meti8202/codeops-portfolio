import { Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import AppLayout from "./layout/AppLayout";

import Home from "./pages/Home/Home";
import MenuPage from "./pages/MenuPage/MenuPage";
import FeaturedDishPage from "./pages/SpecialMenuPage/SpecialMenuPage";
import DishDetailPage from "./pages/DishDetailPage/DishDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="featured" element={<FeaturedDishPage />} />
        <Route path="menu/:slug" element={<DishDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route path="signin" element={<SignInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;