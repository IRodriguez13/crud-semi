import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="hero-section p-5 rounded text-center">
          <h1 className="display-3 mb-2">🎬 BlockBuster</h1>
          <p className="h4 text-primary mb-4" style={{ fontStyle: 'italic' }}>
            "Nunca nos fuimos"
          </p>
          <p className="lead mb-4">
            La experiencia cinematográfica que siempre quisiste. Miles de películas en alta definición.
          </p>
          
          {currentUser ? (
            <div>
              <h4 className="mb-4">¡Hola {currentUser.first_name || currentUser.email}!</h4>
              <p className="mb-4">Explora nuestro catálogo y disfruta del mejor entretenimiento</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link className="btn btn-primary btn-lg" to="/peliculas">
                  🎬 Explorar Catálogo
                </Link>
                <Link className="btn btn-outline-light btn-lg" to="/carrito">
                  🛒 Mi Carrito
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">Únete a millones de usuarios que ya disfrutan de BlockBuster</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link className="btn btn-primary btn-lg" to="/registro">
                  Comenzar Gratis
                </Link>
                <Link className="btn btn-outline-light btn-lg" to="/login">
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <div className="mb-3" style={{ fontSize: '3rem' }}>🎬</div>
                <h5 className="card-title">Catálogo Extenso</h5>
                <p className="card-text">
                  Miles de películas de todos los géneros y épocas. Desde clásicos hasta los últimos estrenos.
                </p>
                <Link to="/peliculas" className="btn btn-primary">Explorar Ahora</Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <div className="mb-3" style={{ fontSize: '3rem' }}>⚡</div>
                <h5 className="card-title">Acceso Instantáneo</h5>
                <p className="card-text">
                  Disfruta de tus películas favoritas al instante. Sin esperas, sin descargas.
                </p>
                <Link to="/peliculas" className="btn btn-primary">Ver Películas</Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <div className="mb-3" style={{ fontSize: '3rem' }}>🏆</div>
                <h5 className="card-title">Calidad Premium</h5>
                <p className="card-text">
                  Experiencia cinematográfica en alta definición con el mejor sonido y imagen.
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