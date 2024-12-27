import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://fassetback-production.up.railway.app/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login exitoso:", data);
                onLogin(); // Marca como autenticado
                navigate("/admin"); // Redirige a la página de administración
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Error al iniciar sesión");
            }
        } catch (err) {
            setError("Error al conectar con el servidor");
            console.error("Error:", err);
        }
    };


    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
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
