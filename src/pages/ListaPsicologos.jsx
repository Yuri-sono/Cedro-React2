import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaPsicologos() {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPsicologos();
  }, []);

  const fetchPsicologos = async () => {
    try {
      console.log('Buscando psicólogos...');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/psicologos`);
      console.log('Resposta da API:', response.data);
      setPsicologos(response.data);
    } catch (error) {
      console.error('Erro ao buscar psicólogos:', error);
      alert('Erro ao conectar com o servidor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const agendarSessao = async (psicologoId, valor) => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuario.id) {
      alert('Faça login para agendar uma sessão');
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/sessoes`, {
        paciente_id: usuario.id,
        psicologo_id: psicologoId,
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
      <h1 className="mb-4">Nossos Psicólogos</h1>
      <p className="lead mb-5">Encontre o profissional ideal para você</p>
      
      <div className="row">
        {psicologos.map(psicologo => (
          <div key={psicologo.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                       style={{width: '60px', height: '60px'}}>
                    <i className="bi bi-person-fill text-white fs-4"></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-1">{psicologo.nome}</h5>
                    <small className="text-muted">CRP: {psicologo.crp}</small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <strong>Especialidade:</strong>
                  <p className="mb-2">{psicologo.especialidade}</p>
                </div>
                
                {psicologo.bio && (
                  <div className="mb-3">
                    <strong>Sobre:</strong>
                    <p className="mb-2 text-muted">{psicologo.bio}</p>
                  </div>
                )}
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 text-primary mb-0">
                    R$ {parseFloat(psicologo.preco_sessao || 0).toFixed(2)}
                  </span>
                  <small className="text-muted">por sessão</small>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => agendarSessao(psicologo.id, psicologo.preco_sessao)}
                >
                  <i className="bi bi-calendar-plus me-2"></i>
                  Agendar Sessão
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {psicologos.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-person-x fs-1 text-muted mb-3"></i>
          <h3>Nenhum psicólogo disponível</h3>
          <p className="text-muted">Tente novamente mais tarde.</p>
        </div>
      )}
    </div>
  );
}

export default ListaPsicologos;