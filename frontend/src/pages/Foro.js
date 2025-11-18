import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Foro = () => {
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nuevoTema, setNuevoTema] = useState({ titulo: '', descripcion: '' });
  const { currentUser } = useAuth();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchTemas();
  }, []);

  const fetchTemas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/foro/temas/');
      setTemas(response.data);
    } catch (error) {
      showError('Error al cargar temas del foro');
    } finally {
      setLoading(false);
    }
  };

  const handleNuevoTema = () => {
    if (!currentUser) {
      showError('Debes iniciar sesión para crear temas');
      window.location.href = '/login';
      return;
    }
    setShowModal(true);
  };

  const crearTema = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showError('Debes iniciar sesión para crear temas');
      setShowModal(false);
      window.location.href = '/login';
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/foro/temas/', nuevoTema);
      setNuevoTema({ titulo: '', descripcion: '' });
      setShowModal(false);
      fetchTemas();
      showSuccess('Tema creado exitosamente');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Error al crear tema';
      showError(errorMessage);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="hero-section p-4 mb-5 rounded">
        <div className="text-center">
          <h1 className="display-5 mb-3">💬 Comunidad BlockBuster</h1>
          <p className="lead mb-4">
            Únete a la conversación. Comparte tus opiniones sobre películas y descubre nuevas perspectivas.
          </p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleNuevoTema}
          >
            ✨ Iniciar Nueva Discusión
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {temas.length > 0 ? (
            <div className="row g-4">
              {temas.map(tema => (
                <div key={tema.id} className="col-12">
                  <div className="card forum-card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="flex-grow-1">
                          <Link 
                            to={`/foro/tema/${tema.id}`}
                            className="text-decoration-none"
                          >
                            <h5 className="card-title text-white mb-2 forum-title">
                              {tema.titulo}
                            </h5>
                          </Link>
                          <p className="card-text text-muted mb-2">
                            {tema.descripcion.length > 150 
                              ? `${tema.descripcion.substring(0, 150)}...` 
                              : tema.descripcion}
                          </p>
                          <div className="d-flex align-items-center gap-3">
                            <small className="text-muted">
                              <span className="badge bg-secondary me-1">👤</span>
                              <strong>{tema.usuario_nombre}</strong>
                            </small>
                            <small className="text-muted">
                              <span className="badge bg-secondary me-1">📅</span>
                              {formatearFecha(tema.fecha_creacion)}
                            </small>
                          </div>
                        </div>
                        <div className="text-end ms-3">
                          <div className="d-flex flex-column align-items-end gap-2">
                            <span className="badge bg-primary fs-6 px-3 py-2">
                              💬 {tema.total_respuestas} respuestas
                            </span>
                            {tema.ultima_respuesta && (
                              <div className="text-end">
                                <small className="text-muted d-block">
                                  <strong>Última respuesta:</strong>
                                </small>
                                <small className="text-muted">
                                  {tema.ultima_respuesta.usuario} • {formatearFecha(tema.ultima_respuesta.fecha)}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <Link 
                          to={`/foro/tema/${tema.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver Discusión →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="card">
                <div className="card-body py-5">
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💭</div>
                  <h4 className="text-white">No hay discusiones aún</h4>
                  <p className="text-muted mb-4">Sé el primero en iniciar una conversación sobre películas</p>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={handleNuevoTema}
                  >
                    🚀 Crear Primera Discusión
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title text-white">✨ Nueva Discusión</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={crearTema}>
                <div className="modal-body">
                  <div className="mb-4">
                    <label className="form-label text-white">
                      <strong>Título de la Discusión</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="¿De qué quieres hablar?"
                      value={nuevoTema.titulo}
                      onChange={(e) => setNuevoTema({...nuevoTema, titulo: e.target.value})}
                      required
                      maxLength={200}
                    />
                    <small className="text-muted">
                      {200 - nuevoTema.titulo.length} caracteres restantes
                    </small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">
                      <strong>Descripción</strong>
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Comparte más detalles sobre tu tema de discusión..."
                      value={nuevoTema.descripcion}
                      onChange={(e) => setNuevoTema({...nuevoTema, descripcion: e.target.value})}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top border-secondary">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    🚀 Publicar Discusión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Foro;