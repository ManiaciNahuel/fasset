import "./App.css";
import { Footer } from "./components/navigation/Footer";
import { NavBar } from "./components/navigation/NavBar";
import { Section } from "./components/sections/Section";
import { Home } from "./components/sections/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ItemPage from "./components/products/ItemPage";
import CartPage from "./components/cart/CartPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Checkout from "./components/cart/Checkout.jsx";
import { ProductsProvider } from "./context/ProductsContext"; // Importamos el provider
import AdminPage from "./conection/AdminPage.jsx";
import LoginPage from "./conection/LoginPage.jsx";
import { useEffect, useState } from "react";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar el rol del usuario en localStorage
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/section" element={<Section />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas protegidas */}
            <Route
              path="/admin"
              element={isAdmin ? <AdminPage /> : <Navigate to="/login" />}
            />
          </Routes>
          <Footer />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
