import React from 'react';

const Empresa = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Acerca de Nosotros</h1>
              
              <div className="row">
                <div className="col-md-6">
                  <h3>Nuestra Misión</h3>
                  <p className="lead">
                    Somos una empresa dedicada al desarrollo de soluciones tecnológicas 
                    innovadoras que faciliten la gestión y administración de datos para 
                    nuestros clientes.
                  </p>
                  
                  <h3>Nuestra Visión</h3>
                  <p>
                    Ser líderes en el desarrollo de sistemas CRUD eficientes y escalables, 
                    proporcionando herramientas que permitan a las empresas optimizar sus 
                    procesos de gestión de información.
                  </p>
                </div>
                
                <div className="col-md-6">
                  <h3>Nuestros Valores</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>Innovación:</strong> Constantemente buscamos nuevas formas 
                      de mejorar nuestros productos y servicios.
                    </li>
                    <li className="mb-2">
                      <strong>Calidad:</strong> Nos comprometemos a entregar soluciones 
                      de la más alta calidad.
                    </li>
                    <li className="mb-2">
                      <strong>Confiabilidad:</strong> Nuestros sistemas son robustos y 
                      seguros para proteger la información de nuestros clientes.
                    </li>
                    <li className="mb-2">
                      <strong>Soporte:</strong> Brindamos atención personalizada y 
                      soporte técnico especializado.
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
              <h5 className="card-title">Tecnología</h5>
              <p className="card-text">
                Utilizamos las últimas tecnologías como Django, React, y bases de datos 
                modernas para crear soluciones robustas.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Experiencia</h5>
              <p className="card-text">
                Contamos con años de experiencia en el desarrollo de sistemas de 
                gestión empresarial y aplicaciones web.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Soporte 24/7</h5>
              <p className="card-text">
                Ofrecemos soporte técnico continuo para garantizar el funcionamiento 
                óptimo de nuestras soluciones.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h3>Contacto</h3>
              <div className="row">
                <div className="col-md-4">
                  <h5>Dirección</h5>
                  <p>Calle Principal #123<br />Ciudad, País</p>
                </div>
                <div className="col-md-4">
                  <h5>Teléfono</h5>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="col-md-4">
                  <h5>Email</h5>
                  <p>contacto@empresa.com</p>
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