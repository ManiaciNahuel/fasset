import React from 'react';
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-status">
            <h1>❌ Pago Fallido</h1>
            <p>Hubo un problema con tu pago. Por favor, intenta nuevamente.</p>
            <button onClick={() => navigate("/")}>Volver a Inicio</button>
        </div>
    );
};

export default FailurePage;
