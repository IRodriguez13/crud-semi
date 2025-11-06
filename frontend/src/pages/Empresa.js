import React from 'react';

const Empresa = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">🎬 Acerca de BlockBuster</h1>
              
              <div className="row">
                <div className="col-md-6">
                  <h3>Nuestra Misión</h3>
                  <p className="lead">
                    Revivir la magia del entretenimiento casero, ofreciendo la mejor 
                    selección de películas con la comodidad de la tecnología moderna. 
                    Conectamos a las familias con historias increíbles.
                  </p>
                  
                  <h3>Nuestra Visión</h3>
                  <p>
                    Ser la plataforma líder en entretenimiento digital, manteniendo vivo 
                    el espíritu nostálgico de las videoclub tradicionales mientras 
                    abrazamos las innovaciones del futuro.
                  </p>
                </div>
                
                <div className="col-md-6">
                  <h3>Nuestros Valores</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>🎬 Pasión por el Cine:</strong> Amamos las películas y 
                      queremos compartir esa pasión contigo.
                    </li>
                    <li className="mb-2">
                      <strong>🏠 Comodidad:</strong> Disfruta del mejor entretenimiento 
                      desde la comodidad de tu hogar.
                    </li>
                    <li className="mb-2">
                      <strong>🌟 Calidad:</strong> Solo ofrecemos contenido de la más 
                      alta calidad en video y audio.
                    </li>
                    <li className="mb-2">
                      <strong>👨‍👩‍👧‍👦 Familia:</strong> Contenido para toda la familia, 
                      desde los más pequeños hasta los adultos.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">🎥 Catálogo Extenso</h5>
              <p className="card-text">
                Miles de películas de todos los géneros: acción, comedia, drama, 
                terror, ciencia ficción y mucho más.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">📱 Tecnología Moderna</h5>
              <p className="card-text">
                Plataforma web moderna y fácil de usar, accesible desde cualquier 
                dispositivo con conexión a internet.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">🚚 Entrega Rápida</h5>
              <p className="card-text">
                Acceso inmediato a tus películas favoritas. Sin esperas, 
                sin complicaciones, solo entretenimiento puro.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h3>📞 Contacto</h3>
              <div className="row">
                <div className="col-md-4">
                  <h5>🏢 Dirección</h5>
                  <p>Av. Hollywood #1990<br />Los Ángeles, CA</p>
                </div>
                <div className="col-md-4">
                  <h5>📱 Teléfono</h5>
                  <p>+1 (555) BLOCKBUSTER</p>
                </div>
                <div className="col-md-4">
                  <h5>📧 Email</h5>
                  <p>info@blockbuster.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empresa;