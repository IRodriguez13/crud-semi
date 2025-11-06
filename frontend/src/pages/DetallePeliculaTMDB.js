import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DetallePeliculaTMDB = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchPelicula();
  }, [id]);

  const fetchPelicula = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tmdb/pelicula/${id}/`);
      setPelicula(response.data);
    } catch (error) {
      setError('Error al cargar la película');
    } finally {
      setLoading(false);
    }
  };

  const agregarAlCarrito = async () => {
    if (!currentUser) {
      alert('Debes iniciar sesión para agregar películas al carrito');
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

  if (error || !pelicula) {
    return (
      <div className="alert alert-danger" role="alert">
        {error || 'Película no encontrada'}
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section con Backdrop */}
      {pelicula.backdrop && (
        <div 
          className="hero-section mb-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${pelicula.backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                {pelicula.imagen && (
                  <img 
                    src={pelicula.imagen} 
                    className="img-fluid rounded shadow-lg"
                    alt={pelicula.titulo}
                    style={{ maxHeight: '400px' }}
                  />
                )}
              </div>
              <div className="col-md-8">
                <h1 className="display-4 mb-3">{pelicula.titulo}</h1>
                <p className="lead mb-4">{pelicula.descripcion}</p>
                <div className="d-flex align-items-center mb-4">
                  <span className="badge bg-warning text-dark me-3 fs-6">
                    ⭐ {pelicula.calificacion_tmdb}/10
                  </span>
                  <span className="badge bg-info me-3">{pelicula.año}</span>
                  <span className="badge bg-secondary">{pelicula.duracion} min</span>
                </div>
                <div className="d-flex align-items-center">
                  <h3 className="text-success me-4">${pelicula.precio}</h3>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={agregarAlCarrito}
                  >
                    🛒 Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header">
                <h4>Información de la Película</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Director:</strong> {pelicula.director}</p>
                    <p><strong>Año:</strong> {pelicula.año}</p>
                    <p><strong>Duración:</strong> {pelicula.duracion} minutos</p>
                    <p><strong>Géneros:</strong> {pelicula.generos.join(', ')}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Calificación TMDB:</strong> {pelicula.calificacion_tmdb}/10</p>
                    <p><strong>Votos:</strong> {pelicula.votos.toLocaleString()}</p>
                    <p><strong>Disponibilidad:</strong> <span className="badge bg-success">Digital</span></p>
                  </div>
                </div>
                
                {pelicula.reparto && pelicula.reparto.length > 0 && (
                  <div className="mt-4">
                    <h6>Reparto Principal:</h6>
                    <p>{pelicula.reparto.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
            
            {pelicula.trailer && (
              <div className="card mb-4">
                <div className="card-header">
                  <h4>Trailer</h4>
                </div>
                <div className="card-body">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube.com/embed/${pelicula.trailer}`}
                      title="Trailer"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="col-md-4">
            <div className="card sticky-top">
              <div className="card-header">
                <h5>Comprar Película</h5>
              </div>
              <div className="card-body text-center">
                {pelicula.imagen && (
                  <img 
                    src={pelicula.imagen} 
                    className="img-fluid rounded mb-3"
                    alt={pelicula.titulo}
                    style={{ maxHeight: '200px' }}
                  />
                )}
                <h5>{pelicula.titulo}</h5>
                <p className="text-muted">{pelicula.año}</p>
                <h3 className="text-success mb-3">${pelicula.precio}</h3>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={agregarAlCarrito}
                  >
                    🛒 Agregar al Carrito
                  </button>
                  <button className="btn btn-outline-secondary">
                    ❤️ Agregar a Favoritos
                  </button>
                </div>
                
                <div className="mt-3">
                  <small className="text-muted">
                    ✅ Disponible inmediatamente<br/>
                    ✅ Calidad HD<br/>
                    ✅ Sin restricciones de tiempo
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Sinopsis Completa</h4>
              </div>
              <div className="card-body">
                <p className="lead">{pelicula.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePeliculaTMDB;