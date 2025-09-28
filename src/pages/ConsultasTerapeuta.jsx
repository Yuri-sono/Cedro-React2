import React, { useState } from 'react';
import NavbarTerapeuta from '../components/NavbarTerapeuta.jsx';
import SidebarTerapeuta from '../components/SidebarTerapeuta.jsx';

const ConsultasTerapeuta = () => {
  const [activeTab, setActiveTab] = useState('hoje');

  const consultas = {
    hoje: [
      { id: 1, paciente: 'Maria Silva', horario: '09:00', tipo: 'Individual', status: 'confirmada', valor: 150 },
      { id: 2, paciente: 'João Santos', horario: '14:00', tipo: 'Casal', status: 'confirmada', valor: 200 },
      { id: 3, paciente: 'Ana Costa', horario: '16:00', tipo: 'Individual', status: 'pendente', valor: 150 }
    ],
    semana: [
      { id: 4, paciente: 'Carlos Lima', horario: '10:00', tipo: 'Individual', status: 'confirmada', valor: 150, data: '2024-01-23' },
      { id: 5, paciente: 'Lucia Ferreira', horario: '15:00', tipo: 'Individual', status: 'confirmada', valor: 150, data: '2024-01-24' }
    ],
    historico: [
      { id: 6, paciente: 'Pedro Oliveira', horario: '11:00', tipo: 'Individual', status: 'realizada', valor: 150, data: '2024-01-15' },
      { id: 7, paciente: 'Fernanda Costa', horario: '17:00', tipo: 'Casal', status: 'realizada', valor: 200, data: '2024-01-14' }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada': return 'success';
      case 'pendente': return 'warning';
      case 'realizada': return 'primary';
      case 'cancelada': return 'danger';
      default: return 'secondary';
    }
  };

  const iniciarConsulta = (consultaId) => {
    alert(`Iniciando consulta ${consultaId}`);
  };

  const finalizarConsulta = (consultaId) => {
    alert(`Finalizando consulta ${consultaId}`);
  };

  return (
    <div className="dashboard-terapeuta">
      <NavbarTerapeuta />

      <div className="container-fluid py-4">
        <div className="row">
          <SidebarTerapeuta />

          <div className="col-md-9 col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 fw-bold">Consultas</h1>
              <button className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Nova Consulta
              </button>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-header bg-transparent">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'hoje' ? 'active' : ''}`}
                      onClick={() => setActiveTab('hoje')}
                    >
                      Hoje ({consultas.hoje.length})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'semana' ? 'active' : ''}`}
                      onClick={() => setActiveTab('semana')}
                    >
                      Esta Semana ({consultas.semana.length})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'historico' ? 'active' : ''}`}
                      onClick={() => setActiveTab('historico')}
                    >
                      Histórico
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                {consultas[activeTab].map(consulta => (
                  <div key={consulta.id} className="card mb-3 border">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <h6 className="mb-1">{consulta.paciente}</h6>
                          <small className="text-muted">{consulta.tipo}</small>
                        </div>
                        <div className="col-md-2">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-clock me-2 text-muted"></i>
                            <span>{consulta.horario}</span>
                          </div>
                          {consulta.data && (
                            <small className="text-muted">{new Date(consulta.data).toLocaleDateString('pt-BR')}</small>
                          )}
                        </div>
                        <div className="col-md-2">
                          <span className={`badge bg-${getStatusColor(consulta.status)}`}>
                            {consulta.status}
                          </span>
                        </div>
                        <div className="col-md-2">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-currency-dollar me-2 text-success"></i>
                            <span className="fw-bold">R$ {consulta.valor}</span>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="d-flex gap-2">
                            {consulta.status === 'confirmada' && activeTab === 'hoje' && (
                              <>
                                <button 
                                  className="btn btn-success btn-sm"
                                  onClick={() => iniciarConsulta(consulta.id)}
                                >
                                  <i className="bi bi-play-fill me-1"></i>Iniciar
                                </button>
                                <button 
                                  className="btn btn-primary btn-sm"
                                  onClick={() => finalizarConsulta(consulta.id)}
                                >
                                  <i className="bi bi-check-circle me-1"></i>Finalizar
                                </button>
                              </>
                            )}
                            <div className="dropdown">
                              <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="dropdown">
                                <i className="bi bi-three-dots-vertical"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Ver Detalhes</a></li>
                                <li><a className="dropdown-item" href="#">Editar</a></li>
                                <li><a className="dropdown-item" href="#">Remarcar</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item text-danger" href="#">Cancelar</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {consultas[activeTab].length === 0 && (
                  <div className="text-center py-5">
                    <i className="bi bi-calendar-x text-muted" style={{fontSize: '3rem'}}></i>
                    <h5 className="mt-3 text-muted">Nenhuma consulta encontrada</h5>
                    <p className="text-muted">Não há consultas para este período.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="row g-4 mt-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body">
                    <h3 className="h2 fw-bold text-primary">{consultas.hoje.length}</h3>
                    <p className="text-muted mb-0">Hoje</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body">
                    <h3 className="h2 fw-bold text-success">{consultas.semana.length}</h3>
                    <p className="text-muted mb-0">Esta Semana</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body">
                    <h3 className="h2 fw-bold text-info">
                      {consultas.hoje.filter(c => c.status === 'confirmada').length}
                    </h3>
                    <p className="text-muted mb-0">Confirmadas</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body">
                    <h3 className="h2 fw-bold text-warning">
                      R$ {consultas.hoje.reduce((acc, c) => acc + c.valor, 0)}
                    </h3>
                    <p className="text-muted mb-0">Faturamento Hoje</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultasTerapeuta;