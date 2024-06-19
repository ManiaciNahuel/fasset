import "./App.css";
import { Footer } from "./components/navigation/Footer";
import { NavBar } from "./components/navigation/NavBar";
import { Section } from "./components/sections/Section";
import { Home } from "./components/sections/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemPage from "./components/products/ItemPage";
import CartPage from "./components/cart/CartPage.jsx"; // Asegúrate de ajustar el path según la estructura de tu proyecto
import { CartProvider } from "./context/CartContext.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/section" element={<Section />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
