import "./App.css";
import { Footer } from "./components/navigation/Footer";
import { NavBar } from "./components/navigation/NavBar";
import { Section } from "./components/sections/Section";
import { Home } from "./components/sections/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemPage from "./components/products/ItemPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Section />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
