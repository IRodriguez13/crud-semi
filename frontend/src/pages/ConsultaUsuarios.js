import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ConsultaUsuarios = () => {
  const [busqueda, setBusqueda] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const { currentUser } = useAuth();

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setConsultaRealizada(true);

    try {
      const response = await axios.get('http://localhost:8000/api/auth/usuarios/');
      
      // Filtrar usuarios basado en la búsqueda
      const usuariosFiltrados = response.data.filter(usuario => 
        usuario.username.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        (usuario.first_name && usuario.first_name.toLowerCase().includes(busqueda.toLowerCase())) ||
        (usuario.last_name && usuario.last_name.toLowerCase().includes(busqueda.toLowerCase()))
      );
      
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      setError('Error al realizar la consulta');
    } finally {
      setLoading(false);
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
    setUsuarios([]);
    setConsultaRealizada(false);
    setError('');
  };

  if (!currentUser) {
    return (
      <div className="alert alert-warning" role="alert">
        Debes iniciar sesión para acceder a las consultas de usuarios.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Consulta de Usuarios</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleBuscar}>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="busqueda" className="form-label">
                    Buscar Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="busqueda"
                    placeholder="Buscar por nombre de usuario, email, nombre o apellido..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">&nbsp;</label>
                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading || !busqueda.trim()}
                    >
                      {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          
          {consultaRealizada && (
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                {usuarios.length} resultado(s) encontrado(s)
              </small>
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={limpiarBusqueda}
              >
                Limpiar
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {consultaRealizada && (
        <div className="card">
          <div className="card-body">
            {usuarios.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Email</th>
                      <th>Nombre Completo</th>
                      <th>Teléfono</th>
                      <th>Fecha de Nacimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(usuario => (
                      <tr key={usuario.id}>
                        <td>{usuario.username}</td>
                        <td>{usuario.email}</td>
                        <td>
                          {usuario.first_name || usuario.last_name 
                            ? `${usuario.first_name || ''} ${usuario.last_name || ''}`.trim()
                            : '-'
                          }
                        </td>
                        <td>{usuario.telefono || '-'}</td>
                        <td>
                          {usuario.fecha_nacimiento 
                            ? new Date(usuario.fecha_nacimiento).toLocaleDateString()
                            : '-'
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted">
                  No se encontraron usuarios que coincidan con la búsqueda "{busqueda}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultaUsuarios;