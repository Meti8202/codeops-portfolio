import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import AppLayout from "./layout/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingState from "./components/LoadingState";
import Home from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const MenuPage = lazy(() => import("./pages/MenuPage/MenuPage"));
const SpecialMenuPage = lazy(
  () => import("./pages/SpecialMenuPage/SpecialMenuPage")
);
const DishDetailPage = lazy(
  () => import("./pages/DishDetailPage/DishDetailPage")
);
const CartPage = lazy(() => import("./pages/CartPage/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));

function PageLoader() {
  return <LoadingState message="Loading page…" />;
}

function App() {
  return (
    <ErrorBoundary message="The app hit an unexpected error.">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            <Route
              path="menu"
              element={
                <ErrorBoundary message="The menu could not be shown.">
                  <MenuPage />
                </ErrorBoundary>
              }
            />

            <Route
              path="featured"
              element={
                <ErrorBoundary message="Specials could not be shown.">
                  <SpecialMenuPage />
                </ErrorBoundary>
              }
            />

            <Route
              path="menu/:slug"
              element={
                <ErrorBoundary message="This dish page failed.">
                  <DishDetailPage />
                </ErrorBoundary>
              }
            />

            <Route
              path="cart"
              element={
                <ErrorBoundary message="The cart could not be shown.">
                  <CartPage />
                </ErrorBoundary>
              }
            />

            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <ErrorBoundary message="Checkout failed to load.">
                    <CheckoutPage />
                  </ErrorBoundary>
                </RequireAuth>
              }
            />

            <Route path="signin" element={<SignInPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;