import React, { useEffect } from 'react';

const Checkout = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="checkout-page">
                <h2 className="checkout-page__title">CHECKOUT</h2>
                <h3 className="checkout-page__subtitle">Complete los siguientes campos para finalizar su compra</h3>
                
                <form className="checkout-page__form" action="">
                    <div className="checkout-page__form-group">
                        <label htmlFor="name" className="checkout-page__label">Nombre</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="checkout-page__input"
                            placeholder="John Smith"
                            required
                        />
                    </div>
                    
                    <div className="checkout-page__form-group">
                        <label htmlFor="phone" className="checkout-page__label">Nro de telefono</label>
                        <input 
                            type="text" 
                            name="phone" 
                            className="checkout-page__input"
                            placeholder="11351123456"
                            required
                        />
                    </div>

                    <div className="checkout-page__form-group">
                        <label htmlFor="email" className="checkout-page__label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="checkout-page__input"
                            placeholder="johnsmith@gmail.com"
                            required
                        />
                    </div>

                    <div className="checkout-page__form-group">
                        <label htmlFor="email_2" className="checkout-page__label">Repita su email</label>
                        <input 
                            type="email" 
                            name="email_2" 
                            className="checkout-page__input"
                            placeholder="johnsmith@gmail.com"
                            required
                        />
                    </div>

                    <button className="checkout-page__button" /* onClick={generateOrder} disabled={btnDisable?true:false} */>
                        Finalizar compra
                    </button>
                </form>
            </div>
        </>
    );
};

export default Checkout;
