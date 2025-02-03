import React from 'react';
import PropTypes from 'prop-types';

const PurchaseModal = ({ onClose, onWhatsappPurchase, onMercadoPagoPurchase }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Elige una opción de pago</h2>
                <button onClick={onWhatsappPurchase}>Transferir y contactar por WhatsApp</button>
                <button onClick={onMercadoPagoPurchase}>Pagar con Mercado Pago</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

// Definir los tipos de props para evitar errores
PurchaseModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onWhatsappPurchase: PropTypes.func.isRequired,
    onMercadoPagoPurchase: PropTypes.func.isRequired
};

export default PurchaseModal;
