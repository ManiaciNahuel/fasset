import React from 'react';
import { Link } from 'react-router-dom';

export const Item = ({ image, title, price, id }) => {
    return (
        <Link to={`/item/${id}`} className="shop-card-link">
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
                    <div className='estado'>Disponible</div>
                    <div className="btn-vermas">
                        Ver más
                        <span className="bg"></span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
