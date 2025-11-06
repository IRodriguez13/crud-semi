import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🎬 BlockBuster
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/peliculas">Películas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/empresa">Nosotros</Link>
            </li>
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/carrito">🛒 Carrito</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/usuarios">Usuarios</Link>
                </li>
              </>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/carrito">
                    🛒 <span className="badge bg-danger">0</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                  >
                    {currentUser.first_name || currentUser.email}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Ingresar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;