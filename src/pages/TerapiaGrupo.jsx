import React from 'react';

const TerapiaGrupo = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="fw-bold mb-4">Terapia em Grupo</h1>
            <p className="lead">Encontros terapêuticos em grupo que proporcionam apoio mútuo e compartilhamento de experiências.</p>
            
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h3 className="h4 fw-bold mb-3">Como funciona</h3>
                <p>A terapia em grupo oferece um ambiente de apoio onde você pode compartilhar experiências com outras pessoas que enfrentam desafios similares.</p>
                
                <h4 className="h5 fw-bold mt-4 mb-3">Benefícios:</h4>
                <ul>
                  <li>Apoio mútuo entre participantes</li>
                  <li>Redução do sentimento de isolamento</li>
                  <li>Aprendizado através das experiências dos outros</li>
                  <li>Desenvolvimento de habilidades sociais</li>
                  <li>Custo mais acessível</li>
                </ul>
                
                <h4 className="h5 fw-bold mt-4 mb-3">Grupos disponíveis:</h4>
                <ul>
                  <li>Grupo de apoio para ansiedade</li>
                  <li>Grupo de apoio para depressão</li>
                  <li>Grupo de apoio ao luto</li>
                  <li>Grupo de habilidades sociais</li>
                  <li>Grupo de mindfulness</li>
                </ul>
                
                <div className="text-center mt-4">
                  <a href="/#contato" className="btn btn-primary btn-lg">Participar de um Grupo</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerapiaGrupo;