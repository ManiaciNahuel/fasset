import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx'; // Ajusta el path según la estructura de tu proyecto

const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    const handleRemoveFromCart = (item) => {
        removeFromCart(item);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cart-page">
            <h2 className="cart-page__title">Tu Carrito</h2>
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
            )}
        </div>
    );
};

export default CartPage;

