import "./App.css";
import { Footer } from "./components/navigation/Footer";
import { NavBar } from "./components/navigation/NavBar";
import { Section } from "./components/sections/Section";
import { Home } from "./components/sections/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemPage from "./components/products/ItemPage";
import CartPage from "./components/cart/CartPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Checkout from "./components/cart/Checkout.jsx";
import { ProductsProvider } from "./context/ProductsContext"; // Importamos el provider

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/section" element={<Section />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
