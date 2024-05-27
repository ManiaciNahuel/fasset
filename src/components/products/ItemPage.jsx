import React from 'react';
import { useParams } from 'react-router-dom';
import remeraNegra from "../../assets/jpeg/remeraNegra2L.jpg"
import remeraBlanca from "../../assets/jpeg/remeraBlanca2L.png"

const items = [
    { id: 1, title: 'Producto 1', price: 100, image: remeraNegra, description: 'Descripción del Producto 1', sizes: ['S', 'M', 'L'], colors: ['Rojo', 'Azul'] },
    { id: 2, title: 'Producto 2', price: 150, image: remeraBlanca, description: 'Descripción del Producto 2', sizes: ['S', 'M', 'L', 'XL'], colors: ['Verde', 'Negro'] }
];

const ItemPage = () => {
    const { id } = useParams();
    const item = items.find(item => item.id === parseInt(id));
    const buttonOnClick = () => {

        console.log('Agregar al carrito')
    }

    if (!item) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="item-page">
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <p>Precio: ${item.price}</p>
            <div>
                <h3>Talles disponibles:</h3>
                <ul>
                    {item.sizes.map(size => <li key={size}>{size}</li>)}
                </ul>
            </div>
            <div>
                <h3>Colores disponibles:</h3>
                <ul>
                    {item.colors.map(color => <li key={color}>{color}</li>)}
                </ul>
            </div>
            <button onClick={buttonOnClick}>Agregar al carrito</button>
        </div>
    );
};

export default ItemPage;
