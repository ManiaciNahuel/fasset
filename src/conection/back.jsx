import React, { useState, useEffect } from "react";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    // URL del backend
    const BACKEND_URL = "https://fassetback-production-39c8.up.railway.app/api/productos";

    // Obtener productos desde el backend
    const fetchProductos = async () => {
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Incluye credenciales si es necesario
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Productos</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {productos.map((producto) => (
                    <div key={producto.id} style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
                        <h2>{producto.nombre}</h2>
                        <p>{producto.descripcion}</p>
                        <p>Precio: ${producto.precio}</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {producto.imagen1 && <img src={producto.imagen1} alt="Imagen 1" width="100" />}
                            {producto.imagen2 && <img src={producto.imagen2} alt="Imagen 2" width="100" />}
                            {producto.imagen3 && <img src={producto.imagen3} alt="Imagen 3" width="100" />}
                        </div>
                        <h4>Stock:</h4>
                        <ul>
                            {producto.stock.map((item, index) => (
                                <li key={index}>
                                    Talle {item.talle}: {item.cantidad} unidades
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;
