import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const BACKEND_URL = 'https://fassetback-production-39c8.up.railway.app';

    useEffect(() => {
        // Verificar si el usuario es administrador
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);

        if (!adminStatus) {
            navigate('/login'); // Redirigir al login si no es admin
            return;
        }

        // Obtener productos con su stock
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/productos`);
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleStockChange = (productId, talle, newCantidad) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? {
                        ...product,
                        stock: product.stock.map(s =>
                            s.talle === talle ? { ...s, cantidad: newCantidad } : s
                        ),
                    }
                    : product
            )
        );
    };

    const handleSave = async (productId, stock) => {
        try {
            const userId = localStorage.getItem('userId'); // Recuperar el userId del localStorage

            if (!userId) {
                alert('No tienes permisos para realizar esta acción.');
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/productos/${productId}/stock`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, stock }), // Incluye el userId en el cuerpo
            });

            console.log('Response:', response); // Imprimir la respuesta

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error del backend:', errorData); // Imprimir el error del backend
                throw new Error(errorData.error || 'Error al actualizar el stock');
            }

            alert('Stock actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el stock:', error.message);
            alert(`Error al actualizar el stock: ${error.message}`);
        }
    };



    if (!isAdmin) {
        return <div>No tienes permisos para acceder a esta página.</div>;
    }

    if (error) {
        return <div className="admin-page">Error: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="admin-page">Cargando productos...</div>;
    }

    return (
        <div className="admin-page">
            <h1>Administración de Stock</h1>
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h2 className='product-card-title'>{product.nombre} - ID: {product.id}</h2>
                    <ul>
                        {product.stock.map(({ talle, cantidad }) => (
                            <li key={talle}>
                                <span>Talle {talle}:</span>
                                <div className="stock-arrows">
                                    <button
                                        className="arrow-left"
                                        onClick={() =>
                                            handleStockChange(
                                                product.id,
                                                talle,
                                                Math.max(cantidad - 1, 0)
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={cantidad}
                                        onChange={e =>
                                            handleStockChange(
                                                product.id,
                                                talle,
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                    />
                                    <button
                                        className="arrow-right"
                                        onClick={() =>
                                            handleStockChange(
                                                product.id,
                                                talle,
                                                cantidad + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="save-button"
                        onClick={() => handleSave(product.id, product.stock)}
                    >
                        Guardar Cambios
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdminPage;
