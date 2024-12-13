import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 

const ItemPage = () => {
    const { id } = useParams(); // Obtener ID del producto desde la URL
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null); // Tamaño seleccionado
    const [item, setItem] = useState(null); // Producto actual
    const [error, setError] = useState(null);
    const { successMessage } = useCart();

    const BACKEND_URL = `https://fassetback-production.up.railway.app/api/productos/${id}`;

    useEffect(() => {
        // Fetch del producto desde el backend
        const fetchProducto = async () => {
            try {
                const response = await fetch(BACKEND_URL);
                if (!response.ok) {
                    throw new Error("Error al obtener el producto");
                }
                const data = await response.json();
                // Adaptar los datos del backend al formato esperado
                setItem({
                    id: data.id,
                    title: data.nombre,
                    description: data.descripcion.split(", "), // Separar por comas
                    price: data.precio,
                    images: [data.imagen1, data.imagen2, data.imagen3, data.imagen4].filter(Boolean), // Filtrar imágenes nulas
                    sizes: data.stock.map(stockItem => stockItem.talle), // Obtener talles
                });
            } catch (error) {
                setError(error.message);
            }
        };
        fetchProducto();
        window.scrollTo(0, 0);
    }, [BACKEND_URL]);

    const showNextImage = () => {
        if (item && item.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length);
        }
    };

    const showPreviousImage = () => {
        if (item && item.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
        }
    };

    const handleBuyNow = () => {
        if (selectedSize) {
            const whatsappMessage = `Hola! Vi esta remera ${item.title} en su página y estaba interesado en comprar una talle ${selectedSize}.`;
            const whatsappUrl = `https://wa.me/+5493514085841?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            alert('Por favor selecciona un tamaño antes de proceder con la compra.');
        }
    };

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!item) {
        return <div className="loading">Cargando...</div>;
    }

    return (
        <div className="item-page">
            {successMessage && (
                <div className="item-page__popup">
                    {successMessage}
                </div>
            )}
            <div className="container">
                <div className="image">
                    <img src={item.images[currentImageIndex]} alt={item.title} />
                    <div className="image-nav">
                        <button className="nav-button" onClick={showPreviousImage}>⬅</button>
                        <button className="nav-button" onClick={showNextImage}>⮕</button>
                    </div>
                </div>
                <div className="details">
                    <h2>{item.title}</h2>
                    <h3>Características:</h3>
                    <ul className="caracteristicas">
                        {item.description.map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                    <div>
                        <h3>Talles disponibles:</h3>
                        <ul className="talles">
                            {item.sizes.map(size => (
                                <li
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={selectedSize === size ? 'selected' : ''}
                                >
                                    {size}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="price">Precio: <span className="price-number">${item.price}</span></div>
                    <div className="botones">
                        <button onClick={handleBuyNow}>Comprar ya</button>
                        {/* <button onClick={handleAddToCart}>Agregar al carrito</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;