import React from 'react';
import { useParams } from 'react-router-dom';
import remeraNegra from "../../assets/jpeg/remeraNegra2L.jpg";
import remeraBlanca from "../../assets/jpeg/remeraBlanca2L.png";

const items = [
    { id: 1, title: 'Remera Negra', price: 150, image: remeraNegra, description: 'Descripción del Remera Negra', sizes: ['M', 'L'] },
    { id: 2, title: 'Remera Blanca', price: 150, image: remeraBlanca, description: 'Descripción del Remera Blanca', sizes: ['M', 'L']}
];

const ItemPage = () => {
    const { id } = useParams();
    const item = items.find(item => item.id === parseInt(id));
    const agregarAlCarrito = () => {
        console.log('Agregar al carrito');
        console.log(item);
    };

    if (!item) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="item-page">
            <div className="container">
                <div className="image">
                    <img src={item.image} alt={item.title} />
                </div>
                <div className="details">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <div>
                        <h3>Talles disponibles:</h3>
                        <ul>
                            {item.sizes.map(size => <li key={size}>{size}</li>)}
                        </ul>
                    </div>
                    <div className="price">Precio: ${item.price}</div>

                    <button onClick={agregarAlCarrito(item)}>Comprar</button>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
