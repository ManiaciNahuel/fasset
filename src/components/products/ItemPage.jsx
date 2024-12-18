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
        if (selectedSize) {
            const whatsappMessage = `Hola! Vi esta remera ${item.title} en su página y estaba interesado en comprar una talle ${selectedSize}.`;
            const whatsappUrl = `https://wa.me/+5493514085841?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            alert('Por favor selecciona un tamaño antes de proceder con la compra.');
        }
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
                    <h3>Especificaciones:</h3>
                    <ul className="caracteristicas">
                        {item.especificacion.map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                    <div>
                        <h3>Talles disponibles:</h3>
                        <ul className="talles">
                            {console.log("Producto actual:", item)} {/* Log para depuración */}
                            {console.log("Stock:", item?.stock)} 
                            {item.sizes.map(size => {
                                // Validar si `stock` existe y es un array
                                const stockForSize = Array.isArray(item.stock)
                                    ? item.stock.find(stock => stock.talle === size)
                                    : null;
                                const hasStock = stockForSize && stockForSize.cantidad > 0;

                                return (
                                    <li
                                        key={size}
                                        onClick={() => hasStock && setSelectedSize(size)}
                                        className={`${selectedSize === size ? 'selected' : ''} ${!hasStock ? 'no-stock' : ''}`}
                                    >
                                        {size} {hasStock ? "(Disponible)" : "(Sin stock)"}
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                    <div className="price">Precio: <span className="price-number">${item.price}</span></div>
                    <div className="botones">
                        <button onClick={handleBuyNow} disabled={!selectedSize}>
                            Comprar ya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;