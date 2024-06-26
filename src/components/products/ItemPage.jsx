import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import remeraNegraFront from "../../assets/jpeg/remeraNegra2L-front.jpg";
import remeraNegraBack from "../../assets/jpeg/remeraNegra2L-back.jpg";
import remeraBlancaFront from "../../assets/jpeg/remeraBlanca2L-front.png";
import remeraBlancaBack from "../../assets/jpeg/remeraBlanca2L-back.png";
import tablaDeTalles from "../../assets/jpeg/tabladetalles.jpg";
import { useCart } from '../../context/CartContext'; // Asegúrate de ajustar el path según la estructura de tu proyecto

const items = [
    { id: 1, title: 'Remera Negra', price: 150, images: [remeraNegraFront, remeraNegraBack, tablaDeTalles], description: 'Descripción del Remera Negra Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis commodi optio perferendis nisi eveniet odio veniam ratione cum accusantium distinctio tempore consectetur quis assumenda nulla quibusdam vero, modi consequatur error.', sizes: ['M', 'L'] },
    { id: 2, title: 'Remera Blanca', price: 150, images: [remeraBlancaFront, remeraBlancaBack, tablaDeTalles], description: 'Descripción del Remera Blanca Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis commodi optio perferendis nisi eveniet odio veniam ratione cum accusantium distinctio tempore consectetur quis assumenda nulla quibusdam vero, modi consequatur error.', sizes: ['M', 'L'] }
];

const ItemPage = () => {
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null); // Estado para el tamaño seleccionado
    const { addToCart, successMessage } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length);
    };

    const showPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart({ ...item, size: selectedSize }); // Agregar el tamaño seleccionado al objeto del carrito
        } else {
            alert('Por favor selecciona un tamaño antes de agregar al carrito.');
        }
    };
    const handleBuyNow = () => {
        if (selectedSize) {
            // Aquí deberías navegar al checkout
            navigate('/checkout');
        } else {
            alert('Por favor selecciona un tamaño antes de proceder con la compra.');
        }
    };

    const item = items.find(item => item.id === parseInt(id));

    if (!item) {
        return <div>Producto no encontrado</div>;
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
                    <p>{item.description}</p>
                    <div>
                        <h3>Talles disponibles:</h3>
                        <ul>
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
                    <div className="price">Precio: <span className='price-number'>${item.price}</span></div>
                    <div className='botones'>
                        <button onClick={handleBuyNow}>Comprar ya</button>
                        <button onClick={handleAddToCart}>Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
