import React from 'react';

export const Item = ({ image, title, price }) => {
    const buttonOnClick = () => {
         console.log("agregar al carrito");
     }

    return (
        <div className="shop-card">
        <div className="title">{title}</div>
        <div className="desc">Tu remera ideal</div>
        <div className="slider">
            <figure>
            <img src={image} alt={title} />
            </figure>
        </div>

        <div className="cta">
            <div className="price">${price}</div>
            <button className="btn" onClick={buttonOnClick}>Ver más<span className="bg"></span></button>
        </div>
        </div>

    );
};

