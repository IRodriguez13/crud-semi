import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const DetallePelicula = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({ texto: '', calificacion: 5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const { refreshCart } = useCart();

  useEffect(() => {
    fetchPelicula();
    fetchComentarios();
  }, [id]);

  const fetchPelicula = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/peliculas/${id}/`);
      setPelicula(response.data);
    } catch (error) {
      setError('Error al cargar la película');
    } finally {
      setLoading(false);
    }
  };

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/peliculas/${id}/comentarios/`);
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al cargar comentarios');
    }
  };

  const agregarComentario = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Debes iniciar sesión para comentar');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/peliculas/${id}/comentarios/`, nuevoComentario);
      setNuevoComentario({ texto: '', calificacion: 5 });
      fetchComentarios();
      fetchPelicula(); // Actualizar promedio de calificación
      alert('Comentario agregado exitosamente');
    } catch (error) {
      alert('Error al agregar comentario');
    }
  };

  const agregarAlCarrito = async () => {
    if (!currentUser) {
      alert('Debes iniciar sesión para agregar películas al carrito');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/carrito/agregar/', {
        pelicula_id: pelicula.id,
        cantidad: 1
      });
      alert('Película agregada al carrito');
      refreshCart();
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
      <div className="row">
        <div className="col-md-4">
          {pelicula.imagen && (
            <img 
              src={pelicula.imagen} 
              className="img-fluid rounded shadow"
              alt={pelicula.titulo}
            />
          )}
        </div>
        
        <div className="col-md-8">
          <h1>{pelicula.titulo}</h1>
          <p className="lead">{pelicula.descripcion}</p>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>Director:</strong> {pelicula.director}</p>
              <p><strong>Año:</strong> {pelicula.año}</p>
              <p><strong>Duración:</strong> {pelicula.duracion} minutos</p>
              <p><strong>Calificación:</strong> {pelicula.calificacion}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Género:</strong> {pelicula.genero_nombre}</p>
              <p><strong>Stock:</strong> {pelicula.stock} disponibles</p>
              <p>
                <strong>Calificación promedio:</strong> 
                <span className="badge bg-warning text-dark ms-2">
                  ⭐ {pelicula.promedio_calificacion || 'Sin calificar'}
                </span>
              </p>
              <p><strong>Comentarios:</strong> {pelicula.total_comentarios}</p>
            </div>
          </div>
          
          <div className="d-flex align-items-center mb-4">
            <h3 className="text-success me-4">${pelicula.precio}</h3>
            <button 
              className="btn btn-primary btn-lg"
              onClick={agregarAlCarrito}
              disabled={pelicula.stock === 0}
            >
              {pelicula.stock === 0 ? 'Agotado' : '🛒 Agregar al Carrito'}
            </button>
          </div>
          
          {pelicula.trailer_url && (
            <div className="mb-4">
              <h5>Trailer</h5>
              <a href={pelicula.trailer_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                ▶️ Ver Trailer
              </a>
            </div>
          )}
        </div>
      </div>
      
      <hr className="my-5" />
      
      <div className="row">
        <div className="col-md-8">
          <h4>Comentarios ({comentarios.length})</h4>
          
          {currentUser && (
            <div className="card mb-4">
              <div className="card-header">
                <h6>Agregar Comentario</h6>
              </div>
              <div className="card-body">
                <form onSubmit={agregarComentario}>
                  <div className="mb-3">
                    <label className="form-label">Calificación</label>
                    <select 
                      className="form-select"
                      value={nuevoComentario.calificacion}
                      onChange={(e) => setNuevoComentario({...nuevoComentario, calificacion: parseInt(e.target.value)})}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 estrellas)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 estrellas)</option>
                      <option value={3}>⭐⭐⭐ (3 estrellas)</option>
                      <option value={2}>⭐⭐ (2 estrellas)</option>
                      <option value={1}>⭐ (1 estrella)</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comentario</label>
                    <textarea 
                      className="form-control"
                      rows="3"
                      value={nuevoComentario.texto}
                      onChange={(e) => setNuevoComentario({...nuevoComentario, texto: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Publicar Comentario
                  </button>
                </form>
              </div>
            </div>
          )}
          
          <div className="comentarios">
            {comentarios.map(comentario => (
              <div key={comentario.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="card-title">{comentario.usuario_nombre}</h6>
                      <div className="mb-2">
                        {'⭐'.repeat(comentario.calificacion)}
                        <span className="text-muted ms-2">({comentario.calificacion}/5)</span>
                      </div>
                    </div>
                    <small className="text-muted">
                      {new Date(comentario.fecha_creacion).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="card-text">{comentario.texto}</p>
                </div>
              </div>
            ))}
            
            {comentarios.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted">No hay comentarios aún. ¡Sé el primero en comentar!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePelicula;