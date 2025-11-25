import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useCart } from '../context/CartContext';

const DetallePeliculaTMDB = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const { currentUser } = useAuth();
  const { showSuccess, showError, showWarning } = useNotification();
  const { refreshCart } = useCart();
  const navigate = useNavigate();

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
      refreshCart();
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
                <div className="mb-3">
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={() => navigate('/peliculas')}
                  >
                    ← Volver al catálogo
                  </button>
                </div>
                
                <h1 className="display-4 mb-3">{pelicula.titulo}</h1>
                
                <div className="synopsis-container mb-4">
                  <p className="lead" style={{ 
                    lineHeight: '1.6',
                    fontSize: '1.1rem'
                  }}>
                    {showFullSynopsis || pelicula.descripcion?.length <= 200 
                      ? pelicula.descripcion 
                      : `${pelicula.descripcion?.substring(0, 200)}...`
                    }
                  </p>
                  {pelicula.descripcion?.length > 200 && (
                    <button 
                      className="btn btn-link text-light p-0 text-decoration-underline"
                      onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                    >
                      {showFullSynopsis ? 'Ver menos' : 'Leer más'}
                    </button>
                  )}
                </div>
                
                <div className="d-flex flex-wrap align-items-center mb-4 gap-2">
                  <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                    ⭐ {pelicula.calificacion_tmdb}/10
                  </span>
                  <span className="badge bg-info fs-6 px-3 py-2">{pelicula.año}</span>
                  <span className="badge bg-secondary fs-6 px-3 py-2">{pelicula.duracion} min</span>
                  {pelicula.generos?.map((genero, index) => (
                    <span key={index} className="badge bg-dark fs-6 px-3 py-2">
                      {genero}
                    </span>
                  ))}
                </div>
                
                <div className="d-flex align-items-center flex-wrap gap-3">
                  <h3 className="text-success mb-0">${pelicula.precio}</h3>
                  <button 
                    className="btn btn-primary btn-lg px-4"
                    onClick={agregarAlCarrito}
                  >
                    🛒 Agregar al Carrito
                  </button>
                  <button className="btn btn-outline-light btn-lg">
                    ❤️ Favoritos
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
            <div className="card border-0 shadow-sm">
              <div className="card-header border-0" style={{ background: 'var(--primary-red)' }}>
                <h4 className="mb-0 text-white">📖 Sinopsis Completa</h4>
              </div>
              <div className="card-body" style={{ background: 'var(--card-bg)' }}>
                <div className="row">
                  <div className="col-md-8">
                    <p className="fs-5 lh-lg text-justify" style={{ 
                      textAlign: 'justify',
                      lineHeight: '1.8',
                      fontSize: '1.1rem',
                      color: 'var(--text-primary)'
                    }}>
                      {pelicula.descripcion}
                    </p>
                    
                    {pelicula.tagline && (
                      <blockquote className="blockquote text-center mt-4">
                        <p className="mb-0 fst-italic" style={{ color: 'var(--text-secondary)' }}>"{pelicula.tagline}"</p>
                      </blockquote>
                    )}
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 rounded shadow-sm" style={{ background: 'var(--darker-bg)', border: '1px solid #333' }}>
                      <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Datos Técnicos</h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <strong style={{ color: 'var(--text-primary)' }}>Título original:</strong><br/>
                          <span style={{ color: 'var(--text-secondary)' }}>{pelicula.titulo_original || pelicula.titulo}</span>
                        </li>
                        <li className="mb-2">
                          <strong style={{ color: 'var(--text-primary)' }}>Idioma:</strong><br/>
                          <span style={{ color: 'var(--text-secondary)' }}>{pelicula.idioma || 'Español'}</span>
                        </li>
                        <li className="mb-2">
                          <strong style={{ color: 'var(--text-primary)' }}>País:</strong><br/>
                          <span style={{ color: 'var(--text-secondary)' }}>{pelicula.pais || 'Estados Unidos'}</span>
                        </li>
                        <li className="mb-2">
                          <strong style={{ color: 'var(--text-primary)' }}>Presupuesto:</strong><br/>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {pelicula.presupuesto 
                              ? `$${pelicula.presupuesto.toLocaleString()}` 
                              : 'No disponible'
                            }
                          </span>
                        </li>
                        <li className="mb-2">
                          <strong style={{ color: 'var(--text-primary)' }}>Recaudación:</strong><br/>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {pelicula.recaudacion 
                              ? `$${pelicula.recaudacion.toLocaleString()}` 
                              : 'No disponible'
                            }
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePeliculaTMDB;