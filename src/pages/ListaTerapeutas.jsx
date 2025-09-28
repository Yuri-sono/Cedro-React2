import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaTerapeutas() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerapeutas();
  }, []);

  const fetchTerapeutas = async () => {
    try {
      console.log('Buscando terapeutas...');
      const response = await axios.get('http://localhost:3001/api/terapeutas');
      console.log('Resposta da API:', response.data);
      setTerapeutas(response.data);
    } catch (error) {
      console.error('Erro ao buscar terapeutas:', error);
      alert('Erro ao conectar com o servidor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const agendarSessao = async (terapeutaId, valor) => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuario.id) {
      alert('Faça login para agendar uma sessão');
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/sessoes', {
        paciente_id: usuario.id,
        terapeuta_id: terapeutaId,
        data_sessao: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        valor: valor
      });
      alert('Sessão agendada com sucesso!');
    } catch (error) {
      alert('Erro ao agendar sessão');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Nossos Terapeutas</h1>
      <p className="lead mb-5">Encontre o profissional ideal para você</p>
      
      <div className="row">
        {terapeutas.map(terapeuta => (
          <div key={terapeuta.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                       style={{width: '60px', height: '60px'}}>
                    <i className="bi bi-person-fill text-white fs-4"></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-1">{terapeuta.nome}</h5>
                    <small className="text-muted">CRP: {terapeuta.numero_licenca}</small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <strong>Especialidades:</strong>
                  <p className="mb-2">{terapeuta.especialidades}</p>
                </div>
                
                <div className="mb-3">
                  <strong>Abordagem:</strong>
                  <p className="mb-2">{terapeuta.abordagem_terapeutica}</p>
                </div>
                
                <div className="mb-3">
                  <strong>Experiência:</strong>
                  <p className="mb-2">{terapeuta.anos_experiencia} anos</p>
                </div>
                
                {terapeuta.bio && (
                  <div className="mb-3">
                    <strong>Sobre:</strong>
                    <p className="mb-2 text-muted">{terapeuta.bio}</p>
                  </div>
                )}
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 text-primary mb-0">
                    R$ {parseFloat(terapeuta.valor_sessao).toFixed(2)}
                  </span>
                  <small className="text-muted">por sessão</small>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => agendarSessao(terapeuta.id, terapeuta.valor_sessao)}
                >
                  <i className="bi bi-calendar-plus me-2"></i>
                  Agendar Sessão
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {terapeutas.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-person-x fs-1 text-muted mb-3"></i>
          <h3>Nenhum terapeuta disponível</h3>
          <p className="text-muted">Tente novamente mais tarde.</p>
        </div>
      )}
    </div>
  );
}

export default ListaTerapeutas;