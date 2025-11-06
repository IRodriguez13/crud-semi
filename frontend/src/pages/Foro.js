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

  const crearTema = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showError('Debes iniciar sesión para crear temas');
      return;
    }
    
    try {
      await axios.post('http://localhost:8000/api/foro/temas/', nuevoTema);
      setNuevoTema({ titulo: '', descripcion: '' });
      setShowModal(false);
      fetchTemas();
      showSuccess('Tema creado exitosamente');
    } catch (error) {
      showError('Error al crear tema');
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Foro de Discusión</h2>
          <p className="text-muted">Comparte tus opiniones sobre películas y entretenimiento</p>
        </div>
        {currentUser ? (
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Nuevo Tema
          </button>
        ) : (
          <Link to="/login" className="btn btn-outline-primary">
            Inicia sesión para participar
          </Link>
        )}
      </div>

      <div className="row">
        <div className="col-12">
          {temas.length > 0 ? (
            <div className="list-group">
              {temas.map(tema => (
                <Link 
                  key={tema.id}
                  to={`/foro/tema/${tema.id}`}
                  className="list-group-item list-group-item-action"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{tema.titulo}</h5>
                      <p className="mb-1 text-muted">{tema.descripcion}</p>
                      <small>
                        Por <strong>{tema.usuario_nombre}</strong> • {formatearFecha(tema.fecha_creacion)}
                      </small>
                    </div>
                    <div className="text-end">
                      <span className="badge bg-primary rounded-pill mb-1">
                        {tema.total_respuestas} respuestas
                      </span>
                      {tema.ultima_respuesta && (
                        <div>
                          <small className="text-muted">
                            Última: {tema.ultima_respuesta.usuario}
                            <br />
                            {formatearFecha(tema.ultima_respuesta.fecha)}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h4>No hay temas de discusión</h4>
              <p className="text-muted">Sé el primero en iniciar una conversación</p>
              {currentUser ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  Crear Primer Tema
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Inicia sesión para crear temas
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Tema de Discusión</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={crearTema}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Título del Tema</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevoTema.titulo}
                      onChange={(e) => setNuevoTema({...nuevoTema, titulo: e.target.value})}
                      required
                      maxLength={200}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={nuevoTema.descripcion}
                      onChange={(e) => setNuevoTema({...nuevoTema, descripcion: e.target.value})}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Crear Tema
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