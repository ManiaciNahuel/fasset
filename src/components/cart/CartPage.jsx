import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx'; // Ajusta el path según la estructura de tu proyecto
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, successMessage } = useCart();
    const navigate = useNavigate();
    const handleBuyNow = () => {
            // Aquí deberías navegar al checkout
            navigate('/checkout');
        
    };
    const handleRemoveFromCart = (item) => {
        removeFromCart(item);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cart-page">
            <h2 className="cart-page__title">Tu Carrito</h2>
            {successMessage && (
                <div className="cart-page__popup">
                    {successMessage}
                </div>
            )}
            {cart.length === 0 ? (
                <div className="cart-page__empty">
                    <p className="cart-page__empty-text">Tu carrito está vacío.</p>
                    <div className="cart-page__empty-boton">
                        <a href="./#section">
                            DROP 1
                        </a>
                    </div>
                </div>
            ) : (
                <div>
                    <ul className="cart-page__list">
                        {cart.map(item => (
                            <li key={item.id} className="cart-page__item">
                                <div className="cart-page__item-content">
                                    <img src={item.images[0]} alt={item.title} className="cart-page__item-image" />
                                    <div className="cart-page__item-details">
                                        <h3 className="cart-page__item-title">{item.title}</h3>
                                        <p className="cart-page__item-size">Tamaño: {item.size}</p> {/* Mostrar el tamaño seleccionado */}
                                        <p className="cart-page__item-price">Precio: ${item.price}</p>
                                        <button className="cart-page__item-remove" onClick={() => handleRemoveFromCart(item)}>Eliminar</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="cart-page__item-remove1" onClick={handleBuyNow}>Comprar</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
