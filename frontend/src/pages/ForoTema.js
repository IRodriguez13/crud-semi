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
      showError('Error al enviar respuesta');
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
      showError('Error al editar respuesta');
    }
  };

  const eliminarRespuesta = async (respuestaId) => {
    try {
      await axios.delete(`http://localhost:8000/api/foro/respuesta/${respuestaId}/`);
      fetchRespuestas();
      showSuccess('Respuesta eliminada');
    } catch (error) {
      showError('Error al eliminar respuesta');
    }
  };

  const eliminarTema = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/foro/tema/${id}/`);
      showSuccess('Tema eliminado');
      navigate('/foro');
    } catch (error) {
      showError('Error al eliminar tema');
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

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-start">
          <div>
            <h3 className="mb-1">{tema.titulo}</h3>
            <small className="text-muted">
              Por <strong>{tema.usuario_nombre}</strong> • {formatearFecha(tema.fecha_creacion)}
            </small>
          </div>
          {currentUser && tema.usuario === currentUser.id && (
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={eliminarTema}
            >
              Eliminar Tema
            </button>
          )}
        </div>
        <div className="card-body">
          <p>{tema.descripcion}</p>
        </div>
      </div>

      <div className="mb-4">
        <h5>Respuestas ({respuestas.length})</h5>
        
        {respuestas.map(respuesta => (
          <div key={respuesta.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <strong>{respuesta.usuario_nombre}</strong>
                  <small className="text-muted ms-2">
                    {formatearFecha(respuesta.fecha_creacion)}
                    {respuesta.editado && ' (editado)'}
                  </small>
                </div>
                {currentUser && respuesta.usuario === currentUser.id && (
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setEditandoRespuesta(respuesta.id)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => eliminarRespuesta(respuesta.id)}
                    >
                      Eliminar
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
                <p className="mb-0">{respuesta.contenido}</p>
              )}
            </div>
          </div>
        ))}

        {respuestas.length === 0 && (
          <div className="text-center py-4">
            <p className="text-muted">No hay respuestas aún. Sé el primero en responder.</p>
          </div>
        )}
      </div>

      {currentUser ? (
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">Escribir Respuesta</h6>
          </div>
          <div className="card-body">
            <form onSubmit={enviarRespuesta}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Escribe tu respuesta..."
                  value={nuevaRespuesta}
                  onChange={(e) => setNuevaRespuesta(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar Respuesta
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center">
            <p className="mb-3">Debes iniciar sesión para participar en la discusión</p>
            <Link to="/login" className="btn btn-primary me-2">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-outline-primary">
              Registrarse
            </Link>
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