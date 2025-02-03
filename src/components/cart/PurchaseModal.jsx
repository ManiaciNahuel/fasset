import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PurchaseModal = ({ onClose, onWhatsappPurchase, onMercadoPagoPurchase }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const saveUserData = async () => {
        console.log("Guardar usuariop");

        try {
            const response = await fetch('https://fassetback-production-39c8.up.railway.app/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, phone })
            });

            const data = await response.json();
            console.log("Respuesta del servidor al guardar usuario:", data);
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };


    const handleWhatsapp = async () => {
        if (!email || !name || !phone) {
            alert("Por favor completa todos los campos antes de continuar.");
            return;
        }
        await saveUserData(); // Guardar el usuario en la base de datos
        onWhatsappPurchase({ email, name, phone });
    };

    const handleMercadoPago = async () => {
        if (!email || !name || !phone) {
            alert("Por favor completa todos los campos antes de continuar.");
            return;
        }
        await saveUserData(); // Guardar el usuario en la base de datos
        onMercadoPagoPurchase({ email, name, phone });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="form-title">Completa tus datos antes de continuar</h2>
                <div className="form-group">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Teléfono:</label>
                    <input
                        type="tel"
                        className="form-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>


                <button onClick={handleWhatsapp} className="button-contactar">Contactar por WhatsApp y transferir</button>
                <button onClick={handleMercadoPago}>Pagar con Mercado Pago</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

PurchaseModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onWhatsappPurchase: PropTypes.func.isRequired,
    onMercadoPagoPurchase: PropTypes.func.isRequired
};

export default PurchaseModal;
