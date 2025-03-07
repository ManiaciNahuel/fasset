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
                    <div className="price">
                        ${new Intl.NumberFormat('es-AR').format(price)}
                    </div>
                    <div className="discount-price">
                        <span className="discount-text">15% OFF efectivo/transferencia: </span>
                        <span className="discount-value">
                             ${new Intl.NumberFormat('es-AR').format((price * 0.83333333333).toFixed(0))}
                        </span>
                    </div>
                    <div className="btn-vermas">
                        Ver más
                        <span className="bg"></span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
