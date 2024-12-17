import React, { createContext, useState, useEffect, useContext } from "react";

const ProductsContext = createContext();

// Hook para acceder al contexto
export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fassetback-production.up.railway.app/api/productos");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        
        // Mapear los productos al formato esperado
        const formattedProducts = data.map((product) => ({
          id: product.id,
          title: product.nombre,
          description: product.descripcion.split(", "), // Separar por comas
          price: product.precio,
          images: [product.imagen1, product.imagen2, product.imagen3, product.imagen4, product.imagen5 ].filter(Boolean),
          sizes: product.stock.map(stockItem => stockItem.talle), // Extraer talles
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
