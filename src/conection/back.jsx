import React, { useEffect, useState } from "react";

const TestConnection = () => {
  const [message, setMessage] = useState(""); // Estado para guardar el mensaje del backend

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("https://fassetback-production.up.railway.app/api/test"); // Cambia la URL según tu backend
        const data = await response.json();
        setMessage(data.message); // Guardar el mensaje recibido
      } catch (error) {
        console.error("Error al conectarse con el backend:", error);
        setMessage("Error al conectarse con el backend"); // Mensaje de error
      }
    };

    fetchMessage(); // Llamar a la función al montar el componente
  }, []);

  return (
    <div>
      <h1>Prueba de Conexión</h1>
      <p>{message}</p> {/* Mostrar el mensaje recibido */}
    </div>
  );
};

export default TestConnection;
