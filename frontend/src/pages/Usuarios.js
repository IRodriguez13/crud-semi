import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchUsuarios();
    }
  }, [currentUser]);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/usuarios/');
      setUsuarios(response.data);
    } catch (error) {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:8000/api/auth/usuarios/${id}/`);
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        alert('Usuario eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar usuario');
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="alert alert-warning" role="alert">
        Debes iniciar sesión para ver esta página.
      </div>
    );
  }

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
        <h2>Gestión de Usuarios</h2>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.first_name || '-'}</td>
                    <td>{usuario.last_name || '-'}</td>
                    <td>{usuario.telefono || '-'}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => alert('Función de editar en desarrollo')}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(usuario.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {usuarios.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No hay usuarios registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usuarios;