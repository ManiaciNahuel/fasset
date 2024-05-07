import "./App.css";
import { Footer } from "./components/navigation/Footer";
import { NavBar } from "./components/navigation/NavBar";
import { Section } from "./components/sections/Section";
import { Home } from "./components/sections/Home";

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <Section />
      <Footer />
    </>
  );
}

export default App;
