import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron bg-light p-5 rounded">
          <h1 className="display-4">Bienvenido al Sistema CRUD</h1>
          <p className="lead">
            Sistema completo de gestión de usuarios y productos desarrollado con Django y React.
          </p>
          <hr className="my-4" />
          
          {currentUser ? (
            <div>
              <p>¡Hola {currentUser.first_name || currentUser.email}!</p>
              <p>Puedes acceder a todas las funcionalidades del sistema.</p>
              <Link className="btn btn-primary btn-lg me-3" to="/usuarios" role="button">
                Gestionar Usuarios
              </Link>
              <Link className="btn btn-success btn-lg" to="/productos" role="button">
                Ver Productos
              </Link>
            </div>
          ) : (
            <div>
              <p>Para acceder a todas las funcionalidades, inicia sesión o regístrate.</p>
              <Link className="btn btn-primary btn-lg me-3" to="/login" role="button">
                Iniciar Sesión
              </Link>
              <Link className="btn btn-success btn-lg" to="/registro" role="button">
                Registrarse
              </Link>
            </div>
          )}
        </div>
        
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Gestión de Usuarios</h5>
                <p className="card-text">
                  Registro, consulta y administración completa de usuarios del sistema.
                </p>
                <Link to="/usuarios" className="btn btn-primary">Ver Usuarios</Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Catálogo de Productos</h5>
                <p className="card-text">
                  Consulta nuestro catálogo completo de productos disponibles.
                </p>
                <Link to="/productos" className="btn btn-primary">Ver Productos</Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Acerca de Nosotros</h5>
                <p className="card-text">
                  Conoce más sobre nuestra empresa y nuestros servicios.
                </p>
                <Link to="/empresa" className="btn btn-primary">Conocer Más</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;