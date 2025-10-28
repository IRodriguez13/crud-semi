import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/productos/');
      setProductos(response.data);
    } catch (error) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/productos/categorias/');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al cargar categorías');
    }
  };

  const productosFiltrados = filtroCategoria 
    ? productos.filter(producto => producto.categoria.toString() === filtroCategoria)
    : productos;

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Catálogo de Productos</h2>
        <div>
          <select 
            className="form-select"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {producto.imagen && (
                <img 
                  src={producto.imagen} 
                  className="card-img-top" 
                  alt={producto.nombre}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text flex-grow-1">{producto.descripcion}</p>
                <div className="mt-auto">
                  <p className="card-text">
                    <small className="text-muted">Categoría: {producto.categoria_nombre}</small>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 text-primary">${producto.precio}</span>
                    <span className="badge bg-secondary">Stock: {producto.stock}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No hay productos disponibles</p>
        </div>
      )}
    </div>
  );
};

export default Productos;