import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload.id);
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);
    const [successMessage, setSuccessMessage] = useState('');

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
        setSuccessMessage(`${item.title} agregado al carrito con éxito`);
        setTimeout(() => setSuccessMessage(''), 3000); // El mensaje desaparece después de 3 segundos
    };

    const removeFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, successMessage }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
