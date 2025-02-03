import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-status">
            <h1>✅ ¡Pago Exitoso!</h1>
            <p>Tu compra se ha realizado correctamente. En breve recibirás un correo con los detalles.</p>
            <button onClick={() => navigate("/")}>Volver a Inicio</button>
        </div>
    );
};

export default SuccessPage;
