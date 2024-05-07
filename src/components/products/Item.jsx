import React from 'react';

export const Item = ({ image, title, price }) => {
    const buttonOnClick = () => {
         console.log("agregar al carrito");
     }

    return (
        <div className="item">  
        <img src={image} alt={title} />
        <div className="item-content">
            <h3>{title}</h3>
            <p>${price}</p>
            <button onClick={buttonOnClick}>Agregar al carrito</button>
        </div>
        </div>
    );
};

