import React from "react";
import { Item } from "../products/Item";
import { useProducts } from "../../context/ProductsContext";
import baner_10off from "../../assets/png/10off.png";
import baner_envio from "../../assets/png/envios.png";
import baner_tarjetas from "../../assets/png/cards.png";

export const Section = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return (
    <section id="section" className="section sec-pad">
      <div className="main-container">
        <div className="section__content">
          {products
            .filter((product) => product.id !== 3) // 🔹 Excluye el producto de prueba (id: 3)
            .map((product) => (
              <div key={product.id} className="section__content-details">
                <Item
                  image={product.images[4]} // Muestra la primera imagen del array
                  title={product.title}
                  price={product.price}
                  id={product.id}
                />
              </div>
            ))}
        </div>
        <div className="section__banner">
          <img src={baner_10off} alt="banerPublicidades" />
          <img src={baner_envio} alt="banerPublicidades" />
          <img src={baner_tarjetas} alt="banerPublicidades" />
        </div>
      </div>
    </section>
  );
};
