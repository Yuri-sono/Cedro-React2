import React from 'react';

const AtendimentoOnline = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="fw-bold mb-4">Atendimento Online</h1>
            <p className="lead">Consultas virtuais para quem prefere ou necessita de atendimento à distância, com a mesma qualidade.</p>
            
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h3 className="h4 fw-bold mb-3">Como funciona</h3>
                <p>Nosso atendimento online oferece a mesma qualidade do atendimento presencial, com a conveniência de poder ser realizado de qualquer lugar.</p>
                
                <h4 className="h5 fw-bold mt-4 mb-3">Vantagens:</h4>
                <ul>
                  <li>Comodidade de atendimento em casa</li>
                  <li>Economia de tempo e deslocamento</li>
                  <li>Maior flexibilidade de horários</li>
                  <li>Ideal para pessoas com mobilidade reduzida</li>
                  <li>Mesma eficácia do atendimento presencial</li>
                </ul>
                
                <h4 className="h5 fw-bold mt-4 mb-3">Requisitos técnicos:</h4>
                <ul>
                  <li>Conexão estável com a internet</li>
                  <li>Computador, tablet ou smartphone</li>
                  <li>Câmera e microfone funcionando</li>
                  <li>Ambiente privado e silencioso</li>
                </ul>
                
                <h4 className="h5 fw-bold mt-4 mb-3">Plataformas utilizadas:</h4>
                <ul>
                  <li>Zoom (criptografado)</li>
                  <li>Google Meet</li>
                  <li>Microsoft Teams</li>
                  <li>Plataforma própria segura</li>
                </ul>
                
                <div className="text-center mt-4">
                  <a href="/#contato" className="btn btn-primary btn-lg">Agendar Consulta Online</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoOnline;