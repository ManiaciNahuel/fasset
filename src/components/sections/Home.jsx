import React from "react";
import isotipo from "../../assets/images/Isotipo.jpg";
import { Section } from "./Section";

export const Home = () => {
  return (
    <>
      <section className="home-hero" id="home">
        <div className="home-hero__content">
          <h1 className="heading-primary">Bienvenido a FASSET!</h1>
          <img src={isotipo} alt="isotipo" className="home-hero__logo" />
        </div>
        <div className="home-hero__boton">
          <a href="./#section">
            DROP 1
          </a>
        </div>
      </section>
      <Section />
    </>
  );
};
