import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import PurchaseModal from '../cart/PurchaseModal';

const ItemPage = () => {
    const { id } = useParams(); // Obtener ID del producto desde la URL
    const { products } = useProducts(); // Obtener los productos del contexto
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null); // Tamaño seleccionado
    const { successMessage } = useCart();
    const [showModal, setShowModal] = useState(false);

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
            setShowModal(true);
        } else {
            alert('Por favor selecciona un tamaño antes de proceder con la compra.');
        }
    };


    const handleWhatsappPurchase = () => {
        const whatsappMessage = `Hola! Vi esta remera ${item.title} en su página y estaba interesado en comprar una talle ${selectedSize}.`;
        const whatsappUrl = `https://wa.me/+5493512185195?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        setShowModal(false);
    };

    const handleMercadoPagoPurchase = async () => {
        try {
            const response = await fetch('https://fassetback-production-39c8.up.railway.app/api/checkout/create_preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [{
                        title: item.title,
                        unit_price: item.price,
                        quantity: 1
                    }],
                    payer: {
                        email: 'test_user@example.com',
                        name: 'Nombre del Comprador',
                        phone: { number: '123456789' }
                    }
                })
            });

            const data = await response.json();
            window.open(data.init_point, '_blank');
            setShowModal(false);
        } catch (error) {
            console.error("Error al procesar el pago con Mercado Pago:", error);
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

                    <div className="price">Precio: <span className="price-number">${item.price}</span></div>
                    <div className="botones">
                        <button onClick={handleBuyNow} disabled={!selectedSize}>
                            Comprar ya
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <PurchaseModal
                    onClose={() => setShowModal(false)}
                    onWhatsappPurchase={handleWhatsappPurchase}
                    onMercadoPagoPurchase={handleMercadoPagoPurchase}
                />
            )}
        </div>
    );
};

export default ItemPage;