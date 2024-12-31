import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const BACKEND_URL = 'https://fassetback-production.up.railway.app';

    useEffect(() => {
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
    }, []);

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
            const response = await fetch(`${BACKEND_URL}/api/productos/${productId}/stock`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stock }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el stock');
            }

            alert('Stock actualizado correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el stock');
        }
    };

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
