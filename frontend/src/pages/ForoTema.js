import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const ForoTema = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tema, setTema] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevaRespuesta, setNuevaRespuesta] = useState('');
  const [editandoRespuesta, setEditandoRespuesta] = useState(null);
  const [editandoTema, setEditandoTema] = useState(false);
  const [temaEditado, setTemaEditado] = useState({ titulo: '', descripcion: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [respuestaAEliminar, setRespuestaAEliminar] = useState(null);
  const { currentUser } = useAuth();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchTema();
    fetchRespuestas();
  }, [id]);

  const fetchTema = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/foro/tema/${id}/`);
      setTema(response.data);
    } catch (error) {
      showError('Error al cargar tema');
      navigate('/foro');
    }
  };

  const fetchRespuestas = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/foro/tema/${id}/respuestas/`);
      setRespuestas(response.data);
    } catch (error) {
      showError('Error al cargar respuestas');
    } finally {
      setLoading(false);
    }
  };

  const enviarRespuesta = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showError('Debes iniciar sesión para responder');
      window.location.href = '/login';
      return;
    }
    if (!nuevaRespuesta.trim()) return;

    try {
      await axios.post(`http://localhost:8000/api/foro/tema/${id}/respuestas/`, {
        contenido: nuevaRespuesta
      });
      setNuevaRespuesta('');
      fetchRespuestas();
      showSuccess('Respuesta enviada');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Error al enviar respuesta';
      showError(errorMessage);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  const editarRespuesta = async (respuestaId, nuevoContenido) => {
    try {
      await axios.put(`http://localhost:8000/api/foro/respuesta/${respuestaId}/`, {
        contenido: nuevoContenido
      });
      setEditandoRespuesta(null);
      fetchRespuestas();
      showSuccess('Respuesta actualizada');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Error al editar respuesta';
      showError(errorMessage);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setEditandoRespuesta(null);
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      }
    }
  };

  const confirmarEliminarRespuesta = (respuestaId) => {
    setRespuestaAEliminar(respuestaId);
    setShowDeleteModal(true);
  };

  const eliminarRespuesta = async () => {
    if (!respuestaAEliminar) return;
    
    try {
      await axios.delete(`http://localhost:8000/api/foro/respuesta/${respuestaAEliminar}/`);
      fetchRespuestas();
      showSuccess('Respuesta eliminada');
      setShowDeleteModal(false);
      setRespuestaAEliminar(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Error al eliminar respuesta';
      showError(errorMessage);
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      }
      setShowDeleteModal(false);
      setRespuestaAEliminar(null);
    }
  };

  const eliminarTema = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este tema?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8000/api/foro/tema/${id}/`);
      showSuccess('Tema eliminado');
      navigate('/foro');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Error al eliminar tema';
      showError(errorMessage);
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      }
    }
  };

  const iniciarEdicionTema = () => {
    setTemaEditado({
      titulo: tema.titulo,
      descripcion: tema.descripcion
    });
    setEditandoTema(true);
  };

  const cancelarEdicionTema = () => {
    setEditandoTema(false);
    setTemaEditado({ titulo: '', descripcion: '' });
  };

  const guardarEdicionTema = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/foro/tema/${id}/`, temaEditado);
      setTema(response.data);
      setEditandoTema(false);
      showSuccess('Tema actualizado');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Error al actualizar tema';
      showError(errorMessage);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setEditandoTema(false);
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
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



  if (loading || !tema) {
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
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/foro">Foro</Link>
          </li>
          <li className="breadcrumb-item active">{tema.titulo}</li>
        </ol>
      </nav>

      <div className="card mb-5 forum-topic-card">
        <div className="card-header border-bottom border-secondary p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              {editandoTema ? (
                <form onSubmit={guardarEdicionTema}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={temaEditado.titulo}
                      onChange={(e) => setTemaEditado({...temaEditado, titulo: e.target.value})}
                      required
                      maxLength={200}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      value={temaEditado.descripcion}
                      onChange={(e) => setTemaEditado({...temaEditado, descripcion: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-success btn-sm">
                      💾 Guardar
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={cancelarEdicionTema}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-white mb-3">{tema.titulo}</h2>
                  <div className="d-flex align-items-center gap-4 mb-2">
                    <div className="d-flex align-items-center">
                      <span className="badge bg-secondary me-2">👤</span>
                      <strong className="text-white">{tema.usuario_nombre}</strong>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-secondary me-2">📅</span>
                      <span className="text-muted">{formatearFecha(tema.fecha_creacion)}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-primary me-2">💬</span>
                      <span className="text-muted">{respuestas.length} respuestas</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            {currentUser && (tema.usuario === currentUser.id || tema.usuario === parseInt(currentUser.id)) && !editandoTema && (
              <div className="btn-group btn-group-sm">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={iniciarEdicionTema}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={eliminarTema}
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
        {!editandoTema && (
          <div className="card-body p-4">
            <p className="text-muted fs-5 lh-base">{tema.descripcion}</p>
          </div>
        )}
      </div>

      <div className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="text-white mb-0">
            💬 Respuestas ({respuestas.length})
          </h4>
        </div>
        
        {respuestas.map((respuesta, index) => (
          <div key={respuesta.id} className="card forum-response-card mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                       style={{ width: '40px', height: '40px', fontSize: '16px' }}>
                    {respuesta.usuario_nombre[0].toUpperCase()}
                  </div>
                  <div>
                    <strong className="text-white d-block">{respuesta.usuario_nombre}</strong>
                    <small className="text-muted">
                      {formatearFecha(respuesta.fecha_creacion)}
                      {respuesta.editado && ' • editado'}
                    </small>
                  </div>
                </div>
                {currentUser && (
                  (respuesta.usuario === currentUser.id) || 
                  (respuesta.usuario === parseInt(currentUser.id)) ||
                  (parseInt(respuesta.usuario) === currentUser.id) ||
                  (parseInt(respuesta.usuario) === parseInt(currentUser.id))
                ) && (
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setEditandoRespuesta(respuesta.id)}
                      title="Editar respuesta"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => confirmarEliminarRespuesta(respuesta.id)}
                      title="Eliminar respuesta"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
              
              {editandoRespuesta === respuesta.id ? (
                <EditarRespuesta 
                  contenido={respuesta.contenido}
                  onSave={(nuevoContenido) => editarRespuesta(respuesta.id, nuevoContenido)}
                  onCancel={() => setEditandoRespuesta(null)}
                />
              ) : (
                <div className="response-content">
                  <p className="text-muted mb-0 lh-base">{respuesta.contenido}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {respuestas.length === 0 && (
          <div className="text-center py-5">
            <div className="card">
              <div className="card-body py-5">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💭</div>
                <h5 className="text-white">No hay respuestas aún</h5>
                <p className="text-muted">Sé el primero en compartir tu opinión</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card forum-response-form">
        <div className="card-header border-bottom border-secondary p-4">
          <h5 className="mb-0 text-white">
            ✍️ Únete a la Conversación
          </h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={enviarRespuesta}>
            <div className="mb-4">
              <textarea
                className="form-control form-control-lg"
                rows="5"
                placeholder={currentUser ? "Comparte tu opinión..." : "Escribe tu respuesta (se te pedirá iniciar sesión al enviar)"}
                value={nuevaRespuesta}
                onChange={(e) => setNuevaRespuesta(e.target.value)}
                required
                style={{ resize: 'vertical', minHeight: '120px' }}
              ></textarea>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {!currentUser && (
                  <small className="text-muted">
                    <Link to="/login" className="text-primary text-decoration-none">Iniciar sesión</Link> o <Link to="/registro" className="text-primary text-decoration-none">registrarse</Link> para participar
                  </small>
                )}
              </div>
              <button type="submit" className="btn btn-primary btn-lg px-4">
                🚀 Publicar Respuesta
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmación para eliminar respuesta */}
      {showDeleteModal && (
        <div 
          className="modal show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
              setRespuestaAEliminar(null);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid #333',
              borderRadius: '8px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)'
            }}>
              <div className="modal-header border-bottom border-secondary" style={{
                backgroundColor: 'var(--darker-bg)',
                borderBottom: '1px solid #333'
              }}>
                <h5 className="modal-title text-white">
                  ⚠️ Confirmar Eliminación
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setRespuestaAEliminar(null);
                  }}
                  style={{ filter: 'invert(1)' }}
                ></button>
              </div>
              <div className="modal-body" style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-primary)',
                padding: '1.5rem'
              }}>
                <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                  ¿Estás seguro de que quieres eliminar esta respuesta? Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="modal-footer border-top border-secondary" style={{
                backgroundColor: 'var(--darker-bg)',
                borderTop: '1px solid #333',
                padding: '1rem 1.5rem'
              }}>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setRespuestaAEliminar(null);
                  }}
                  style={{
                    color: 'var(--text-primary)',
                    borderColor: '#555'
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={eliminarRespuesta}
                  style={{
                    backgroundColor: 'var(--primary-red)',
                    borderColor: 'var(--primary-red)'
                  }}
                >
                  🗑️ Eliminar Respuesta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditarRespuesta = ({ contenido, onSave, onCancel }) => {
  const [nuevoContenido, setNuevoContenido] = useState(contenido);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevoContenido.trim()) {
      onSave(nuevoContenido);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <textarea
          className="form-control"
          rows="3"
          value={nuevoContenido}
          onChange={(e) => setNuevoContenido(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="btn-group btn-group-sm">
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ForoTema;