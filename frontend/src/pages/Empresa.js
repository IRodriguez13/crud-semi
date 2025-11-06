import React from 'react';

const Empresa = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-5 pb-5">
                <div className="mb-4">
                  <img
                    src="http://localhost:8000/static/bb_logo.png"
                    alt="BlockBuster Logo"
                    className="img-fluid mb-3"
                    style={{ maxHeight: '150px', maxWidth: '300px' }}
                    onError={(e) => {
                      console.log('Error loading logo, using fallback');
                      e.target.style.display = 'none';
                      // Mostrar texto como fallback
                      const fallback = document.createElement('div');
                      fallback.innerHTML = 'BLOCKBUSTER';
                      fallback.style.cssText = `
                        background: linear-gradient(45deg, #FFD700, #FFA500);
                        color: #000;
                        padding: 20px 40px;
                        border-radius: 10px;
                        font-family: Arial Black, sans-serif;
                        font-size: 2.5rem;
                        font-weight: bold;
                        text-align: center;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                        border: 3px solid #000;
                        display: inline-block;
                        transform: rotate(-2deg);
                        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
                      `;
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                </div>
                <p className="h4 text-primary mb-4" style={{ fontStyle: 'italic' }}>
                  "Nunca nos fuimos"
                </p>
                <p className="lead text-muted mb-4">
                  Desde 1985, fuimos el corazón de tus noches de película. Cuando las videoclubes
                  eran el lugar donde las familias elegían sus aventuras de fin de semana.
                </p>
                <p className="text-muted">
                  Netflix y el streaming cambiaron el mundo, pero nosotros evolucionamos.
                  Ahora regresamos combinando la nostalgia que amabas con la tecnología que necesitas.
                </p>
              </div>

              <div className="row mb-5 mt-5 pt-5">
                <div className="col-md-6">
                  <div className="p-4">
                    <h3 className="text-primary mb-3">🎯 Nuestra Misión</h3>
                    <p className="lead text-muted">
                      Revivir la magia de aquellas noches de viernes cuando elegir una película
                      era toda una experiencia. Combinamos la nostalgia de las videoclubes con
                      la comodidad del streaming moderno, conectando generaciones a través del cine.
                    </p>
                  </div>

                  <div className="p-4">
                    <h3 className="text-primary mb-3">🚀 Nuestra Visión</h3>
                    <p className="text-muted">
                      Demostrar que no fuimos solo una víctima del progreso, sino pioneros
                      que sabían el valor de la experiencia cinematográfica. Queremos ser
                      el puente entre la era dorada de las videoclubes y el futuro del
                      entretenimiento digital.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4">
                    <h3 className="text-primary mb-3">💎 Nuestros Valores</h3>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="d-flex align-items-start">
                          <span className="badge bg-primary me-3 mt-1" style={{ fontSize: '1.2rem' }}>🎬</span>
                          <div>
                            <strong className="text-white">Pasión por el Cine</strong>
                            <p className="text-muted mb-0 small">Desde VHS hasta 4K, nuestra pasión por las películas nunca cambió.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-start">
                          <span className="badge bg-primary me-3 mt-1" style={{ fontSize: '1.2rem' }}>🏠</span>
                          <div>
                            <strong className="text-white">Nostalgia Renovada</strong>
                            <p className="text-muted mb-0 small">La experiencia que recordabas, mejorada con tecnología actual.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-start">
                          <span className="badge bg-primary me-3 mt-1" style={{ fontSize: '1.2rem' }}>🌟</span>
                          <div>
                            <strong className="text-white">Calidad Premium</strong>
                            <p className="text-muted mb-0 small">Solo contenido de la más alta calidad en video y audio.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-start">
                          <span className="badge bg-primary me-3 mt-1" style={{ fontSize: '1.2rem' }}>👨‍👩‍👧‍👦</span>
                          <div>
                            <strong className="text-white">Para Toda la Familia</strong>
                            <p className="text-muted mb-0 small">Contenido para todas las edades y gustos.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 text-center feature-card">
            <div className="card-body p-4">
              <div className="feature-icon mb-3">🎥</div>
              <h5 className="card-title text-primary">El Catálogo que Recordabas</h5>
              <p className="card-text text-muted">
                Todas las películas que solías encontrar en nuestras estanterías,
                más miles de títulos nuevos. Desde los clásicos de los 80s hasta
                los últimos estrenos.
              </p>
              <div className="mt-3">
                <span className="badge bg-primary me-1">Acción</span>
                <span className="badge bg-primary me-1">Drama</span>
                <span className="badge bg-primary me-1">Comedia</span>
                <span className="badge bg-primary">+20 géneros</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 text-center feature-card">
            <div className="card-body p-4">
              <div className="feature-icon mb-3">⚡</div>
              <h5 className="card-title text-primary">Evolución Digital</h5>
              <p className="card-text text-muted">
                De las cintas VHS a la transmisión 4K. Aprendimos, evolucionamos
                y ahora ofrecemos la mejor calidad sin las limitaciones físicas
                del pasado.
              </p>
              <div className="mt-3">
                <span className="badge bg-success me-1">4K Ultra HD</span>
                <span className="badge bg-success me-1">Dolby Atmos</span>
                <span className="badge bg-success">Multi-dispositivo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 text-center feature-card">
            <div className="card-body p-4">
              <div className="feature-icon mb-3">🌍</div>
              <h5 className="card-title text-primary">Regreso Triunfal</h5>
              <p className="card-text text-muted">
                Ya no necesitas venir a nosotros, ahora vamos contigo. En cada
                dispositivo, en cada pantalla, BlockBuster vive donde tú estés.
              </p>
              <div className="mt-3">
                <span className="badge bg-warning text-dark me-1">Web</span>
                <span className="badge bg-warning text-dark me-1">Mobile</span>
                <span className="badge bg-warning text-dark">Smart TV</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card contact-card">
            <div className="card-body text-center p-5">
              <h3 className="text-primary mb-5">🌐 Conecta con Nosotros</h3>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="contact-item p-4">
                    <div className="contact-icon mb-3">🌍</div>
                    <h5 className="text-white mb-3">Nuestra Presencia</h5>
                    <p className="text-primary fs-5 fw-bold mb-2">"Ahora estamos en todos lados"</p>
                    <p className="text-muted">
                      Desde nuestros orígenes en las calles hasta la nube digital,
                      BlockBuster ahora vive en cada pantalla del mundo.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="contact-item p-4">
                    <div className="contact-icon mb-3">📞</div>
                    <h5 className="text-white mb-3">Soporte 24/7</h5>
                    <p className="text-muted mb-2">Línea directa:</p>
                    <p className="text-primary fs-5 fw-bold">+1 (555) BLOCKBUSTER</p>
                    <p className="text-muted small">
                      Atención personalizada para resolver cualquier duda sobre tu experiencia cinematográfica.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="contact-item p-4">
                    <div className="contact-icon mb-3">💌</div>
                    <h5 className="text-white mb-3">Escríbenos</h5>
                    <p className="text-muted mb-2">Email corporativo:</p>
                    <p className="text-primary fs-5 fw-bold">hello@blockbuster.com</p>
                    <p className="text-muted small">
                      Sugerencias, colaboraciones o simplemente para contarnos tu película favorita.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-top border-secondary">
                <p className="text-muted mb-3">Síguenos en nuestras redes sociales</p>
                <div className="d-flex justify-content-center gap-3">
                  <span className="badge bg-primary fs-6 px-3 py-2">📱 @BlockBusterOfficial</span>
                  <span className="badge bg-primary fs-6 px-3 py-2">🐦 @BlockBuster</span>
                  <span className="badge bg-primary fs-6 px-3 py-2">📺 BlockBuster Channel</span>
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