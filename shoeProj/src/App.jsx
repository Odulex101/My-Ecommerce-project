import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Footer from "./components/Footer/Footer";
import { SearchProvider, useSearch } from "./context/SearchContext";
import SearchResultsDisplay from "./components/SearchResultsDisplay";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Checkout from "./pages/Checkout";
import CustomerCare from "./pages/CustomerCare";
import Stores from "./pages/Stores";

// SHOP & CART
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

// CONTEXT
import { CartProvider } from "./context/CartContext";
import { BestSellerProvider } from "./context/BestSellerContext";

function PublicApp() {
  const { searchTerm } = useSearch();

  return (
    <>
      <Header />
      <Hero />
      {searchTerm ? <SearchResultsDisplay /> : <FeaturedProducts />}
    </>
  );
}

function App() {
  const { token } = useAuth();
  const isLoggedIn = !!token;

  return (
    <SearchProvider>
      {isLoggedIn ? (
        <CartProvider>
          <BestSellerProvider>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={<Orders />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/customer-care" element={<CustomerCare />} />
                <Route path="/stores" element={<Stores />} />
              </Route>
            </Routes>
          </BestSellerProvider>
        </CartProvider>
      ) : (
        <PublicApp />
      )}

      {/* ✅ FOOTER NOW SHOWS ON ALL PAGES */}
      <Footer />
    </SearchProvider>
  );
}

export default App;





















