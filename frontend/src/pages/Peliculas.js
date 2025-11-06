import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchPeliculas();
    fetchGeneros();
  }, [filtroGenero, busqueda]);

  const fetchPeliculas = async () => {
    try {
      const params = new URLSearchParams();
      if (filtroGenero) params.append('genero', filtroGenero);
      if (busqueda) params.append('busqueda', busqueda);
      
      const response = await axios.get(`http://localhost:8000/api/tmdb/peliculas/?${params}`);
      setPeliculas(response.data.results || []);
    } catch (error) {
      setError('Error al cargar películas');
    } finally {
      setLoading(false);
    }
  };

  const fetchGeneros = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tmdb/generos/');
      setGeneros(response.data || []);
    } catch (error) {
      console.error('Error al cargar géneros');
    }
  };

  const agregarAlCarrito = async (pelicula) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para agregar películas al carrito');
      return;
    }

    try {
      // Para películas de TMDB, usamos un endpoint especial o creamos la película localmente
      await axios.post('http://localhost:8000/api/carrito/agregar/', {
        tmdb_id: pelicula.id,
        titulo: pelicula.titulo,
        precio: pelicula.precio,
        imagen: pelicula.imagen,
        cantidad: 1
      });
      alert('Película agregada al carrito');
    } catch (error) {
      alert('Error al agregar película al carrito');
    }
  };

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
      <div className="row mb-4">
        <div className="col-md-12">
          <h1 className="text-center mb-4">🎬 Catálogo de Películas BlockBuster</h1>
          
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar películas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select 
                className="form-select"
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
              >
                <option value="">Todos los géneros</option>
                {generos.map(genero => (
                  <option key={genero.id} value={genero.id}>
                    {genero.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {peliculas.map(pelicula => (
          <div key={pelicula.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 movie-card">
              {pelicula.imagen && (
                <img 
                  src={pelicula.imagen} 
                  className="card-img-top movie-poster" 
                  alt={pelicula.titulo}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{pelicula.titulo}</h5>
                <p className="card-text">
                  <small className="text-muted">
                    {pelicula.año} • ⭐ {pelicula.calificacion}/10
                  </small>
                </p>
                <p className="card-text flex-grow-1">
                  {pelicula.descripcion.length > 100 
                    ? `${pelicula.descripcion.substring(0, 100)}...` 
                    : pelicula.descripcion}
                </p>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="h5 text-success mb-0">${pelicula.precio}</span>
                    <div>
                      <span className="badge bg-warning text-dark me-1">
                        ⭐ {pelicula.calificacion}
                      </span>
                      <span className="badge bg-success">
                        Digital
                      </span>
                    </div>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary"
                      onClick={() => agregarAlCarrito(pelicula)}
                    >
                      🛒 Agregar al Carrito
                    </button>
                    <button 
                      className="btn btn-outline-info btn-sm"
                      onClick={() => window.open(`/pelicula/tmdb/${pelicula.id}`, '_blank')}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {peliculas.length === 0 && (
        <div className="text-center py-5">
          <h3>No se encontraron películas</h3>
          <p className="text-muted">Intenta cambiar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Peliculas;