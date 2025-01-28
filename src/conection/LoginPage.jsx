import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir al usuario si ya está autenticado
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://fassetback-production-39c8.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const data = await response.json();
            console.log('Login exitoso:', data);

            // Guardar datos en localStorage
            localStorage.setItem('isAdmin', data.isAdmin);
            localStorage.setItem('userId', data.userId);

            // Redirigir tras guardar
            setTimeout(() => {
                if (data.isAdmin) {
                    navigate('/admin'); // Página de admin
                } else {
                    navigate('/'); // Página estándar
                }
            }, 0); // Garantiza que la redirección ocurre al final del ciclo de renderizado
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Usuario o contraseña incorrectos');
        }
    };


    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Correo electrónico"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
