// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Hero from "./components/Hero/Hero";
// import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
// import Footer from "./components/Footer/Footer";
// import { SearchProvider, useSearch } from "./context/SearchContext";
// import SearchResultsDisplay from "./components/SearchResultsDisplay";

// import Orders from "./pages/Orders";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { useAuth } from "./context/AuthContext";

// function PublicApp() {
//   const { searchTerm } = useSearch();

//   return (
//     <>
//       <Header />
//       <Hero />
//       {searchTerm ? <SearchResultsDisplay /> : <FeaturedProducts />}
//       <Footer />
//     </>
//   );
// }

// function App() {
//   const { token } = useAuth(); // ✅ reactive
//   const isLoggedIn = !!token;

//   return (
//     <SearchProvider>
//       {isLoggedIn ? (
//         <Routes>
//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<Orders />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>
//         </Routes>
//       ) : (
//         <PublicApp />
//       )}
//     </SearchProvider>
//   );
// }

// export default App;


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

// ✅ SHOP & CART
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

// ✅ CONTEXT
import { CartProvider } from "./context/CartContext";

function PublicApp() {
  const { searchTerm } = useSearch();

  return (
    <>
      <Header />
      <Hero />
      {searchTerm ? <SearchResultsDisplay /> : <FeaturedProducts />}
      <Footer />
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
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Orders />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </CartProvider>
      ) : (
        <PublicApp />
      )}
    </SearchProvider>
  );
}

export default App;



















