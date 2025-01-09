import React, { useState, useEffect } from "react";
import image2 from "../../assets/images/_FRK4599.jpg";
import image1 from "../../assets/images/_FRK4845.jpg";
import image3 from "../../assets/images/_FRK5412.jpg";
import { Section } from "./Section";

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [image1, image2, image3];

  // Lógica para el carrusel en mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section className="home-hero" id="home">
        {/* Desktop */}
        <div className="home-hero__desktop">
          <div className="home-hero__desktop__images">
            {images.map((image, index) => (
              <img
                key={index}
                className="home-hero__desktop__images__image"
                src={image}
                alt={`Imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="home-hero__mobile">
          <img
            className="home-hero__mobile__image"
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
          />
        </div>

        <div className="home-hero__boton">
          <a href="./#section">DROP 1</a>
        </div>
      </section>
      <Section />
    </>
  );
};
