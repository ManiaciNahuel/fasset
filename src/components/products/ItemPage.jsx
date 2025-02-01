import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';

const ItemPage = () => {
    const { id } = useParams(); // Obtener ID del producto desde la URL
    const { products } = useProducts(); // Obtener los productos del contexto
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null); // Tamaño seleccionado
    const { successMessage } = useCart();

    // Buscar el producto en la lista global usando el ID
    const item = products.find((product) => product.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const limitedImages = item ? item.images.slice(0, 4) : [];

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % limitedImages.length);
    };

    const showPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + limitedImages.length) % limitedImages.length);
    };


    const handleBuyNow = () => {
        console.log("Talle seleccionado:", selectedSize); 
        if (!selectedSize) {
            alert('⚠️ Por favor selecciona un talle antes de proceder con la compra.');
            
            return; // Detiene la ejecución del resto de la función
        }

        const whatsappMessage = `Hola! Vi esta remera ${item.title} en su página y estaba interesado en comprar una talle ${selectedSize}.`;
        const whatsappUrl = `https://wa.me/+5493512185195?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    };


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
                    <img src={limitedImages[currentImageIndex]} alt={item.title} />
                    <div className="image-nav">
                        <button className="nav-button" onClick={showPreviousImage}>&#9665;</button>
                        <button className="nav-button" onClick={showNextImage}>&#9655;</button>
                    </div>
                </div>
                <div className="details">
                    <h2>{item.title}</h2>
                    <div>
                        <h3>Características</h3>
                        <ul className="caracteristicas">
                            {item.description.map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Especificaciones</h3>
                        <ul className="caracteristicas">
                            {item.especificacion.map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Talles disponibles:</h3>
                        <ul className="talles">
                            {item.sizes.map(size => {
                                const stockForSize = Array.isArray(item.stock)
                                    ? item.stock.find(stock => stock.talle === size)
                                    : null;
                                const cantidad = stockForSize ? stockForSize.cantidad : 0;
                                const hasStock = cantidad > 0;

                                return (
                                    <li
                                        key={size}
                                        onClick={() => hasStock && setSelectedSize(size)}
                                        className={`talle-item ${hasStock ? 'available' : 'no-stock'} ${selectedSize === size ? 'selected' : ''}`}
                                    >
                                        {size}
                                        {hasStock && (
                                            <span className="stock-tooltip">
                                                {cantidad <= 5 ? `Últimas ${cantidad}!` : `${cantidad} disponibles`}
                                            </span>
                                        )}
                                        {!hasStock && (
                                            <span className="stock-tooltip">Sin stock</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                    </div>

                    <div className="price-container">
                        <div className="price">
                            Precio: <span className="price-number">${new Intl.NumberFormat('es-AR').format(item.price)}</span>
                        </div>
                        <div className="discount-price">
                            <span className="discount-text">📢 10% OFF en efectivo o transferencia</span>
                            <span className="discount-value">${new Intl.NumberFormat('es-AR').format((item.price * 0.9).toFixed(0))}</span>
                        </div>
                    </div>



                    <div className="botones">
                        <button onClick={handleBuyNow} >
                            Comprar ya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;