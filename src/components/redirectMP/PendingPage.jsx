import React from 'react';
import { useNavigate } from 'react-router-dom';

const PendingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-status">
            <h1>🕓 Pago Pendiente</h1>
            <p>Estamos procesando tu pago. Te avisaremos cuando se confirme.</p>
            <button onClick={() => navigate("/")}>Volver a Inicio</button>
        </div>
    );
};

export default PendingPage;
