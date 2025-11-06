import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const { currentUser } = useAuth();
  const { showSuccess, showError, showWarning } = useNotification();
  const navigate = useNavigate();

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
      showWarning('Debes iniciar sesión para agregar películas al carrito');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/carrito/agregar/', {
        tmdb_id: pelicula.id,
        titulo: pelicula.titulo,
        precio: pelicula.precio,
        imagen: pelicula.imagen,
        cantidad: 1
      });
      showSuccess(`"${pelicula.titulo}" agregada al carrito`);
    } catch (error) {
      showError('Error al agregar película al carrito');
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
      <div className="hero-section p-5 mb-5">
        <div className="text-center">
          <h1 className="display-4 mb-3">🎬 Catálogo BlockBuster</h1>
          <p className="lead mb-4">Descubre miles de películas en alta definición</p>
          
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="input-group mb-3">
                <span className="input-group-text bg-dark border-secondary">
                  🔍
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar películas..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
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

      <div className="row g-4">
        {peliculas.map(pelicula => (
          <div key={pelicula.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
            <div className="movie-card h-100">
              <div className="position-relative">
                {pelicula.imagen && (
                  <img 
                    src={pelicula.imagen} 
                    className="movie-poster w-100" 
                    alt={pelicula.titulo}
                    onClick={() => navigate(`/pelicula/tmdb/${pelicula.id}`)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <div className="position-absolute top-0 end-0 p-2">
                  <span className="badge bg-warning text-dark">
                    ⭐ {pelicula.calificacion}
                  </span>
                </div>
              </div>
              
              <div className="card-body p-3">
                <h6 className="card-title mb-2 text-truncate" title={pelicula.titulo}>
                  {pelicula.titulo}
                </h6>
                <p className="card-text small text-muted mb-2">
                  {pelicula.año}
                </p>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h6 text-success mb-0">${pelicula.precio}</span>
                  <span className="badge bg-success small">HD</span>
                </div>
                
                <div className="d-grid gap-1">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => agregarAlCarrito(pelicula)}
                  >
                    + Carrito
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigate(`/pelicula/tmdb/${pelicula.id}`)}
                  >
                    Ver más
                  </button>
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