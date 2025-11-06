import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Carrito = () => {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchCarrito();
    }
  }, [currentUser]);

  const fetchCarrito = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/carrito/');
      setCarrito(response.data);
    } catch (error) {
      setError('Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  const actualizarCantidad = async (itemId, nuevaCantidad) => {
    try {
      await axios.put(`http://localhost:8000/api/carrito/item/${itemId}/`, {
        cantidad: nuevaCantidad
      });
      fetchCarrito();
    } catch (error) {
      alert('Error al actualizar cantidad');
    }
  };

  const eliminarItem = async (itemId) => {
    if (window.confirm('¿Estás seguro de eliminar esta película del carrito?')) {
      try {
        await axios.delete(`http://localhost:8000/api/carrito/item/${itemId}/eliminar/`);
        fetchCarrito();
      } catch (error) {
        alert('Error al eliminar item');
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="alert alert-warning" role="alert">
        Debes iniciar sesión para ver tu carrito.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">🛒 Mi Carrito - BlockBuster</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {carrito && carrito.items.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Películas en tu carrito ({carrito.cantidad_items} items)</h5>
              </div>
              <div className="card-body">
                {carrito.items.map(item => (
                  <div key={item.id} className="row align-items-center border-bottom py-3">
                    <div className="col-md-2">
                      {item.pelicula_imagen && (
                        <img 
                          src={item.pelicula_imagen} 
                          className="img-fluid rounded"
                          alt={item.pelicula_titulo}
                          style={{ maxHeight: '80px' }}
                        />
                      )}
                    </div>
                    <div className="col-md-4">
                      <h6 className="mb-1">{item.pelicula_titulo}</h6>
                      <small className="text-muted">${item.pelicula_precio} c/u</small>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group input-group-sm">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="form-control text-center"
                          value={item.cantidad}
                          onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <strong>${item.subtotal}</strong>
                    </div>
                    <div className="col-md-1">
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminarItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Resumen del Pedido</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${carrito.total}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>${carrito.total}</strong>
                </div>
                
                <div className="d-grid gap-2">
                  <button className="btn btn-success btn-lg">
                    💳 Proceder al Pago
                  </button>
                  <button className="btn btn-outline-primary">
                    🎬 Seguir Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="fas fa-shopping-cart fa-5x text-muted"></i>
          </div>
          <h3>Tu carrito está vacío</h3>
          <p className="text-muted">¡Explora nuestro catálogo y encuentra películas increíbles!</p>
          <a href="/peliculas" className="btn btn-primary">
            🎬 Ver Películas
          </a>
        </div>
      )}
    </div>
  );
};

export default Carrito;