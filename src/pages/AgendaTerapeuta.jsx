import React, { useState } from 'react';
import NavbarTerapeuta from '../components/NavbarTerapeuta.jsx';
import SidebarTerapeuta from '../components/SidebarTerapeuta.jsx';

const AgendaTerapeuta = () => {
  const [viewMode, setViewMode] = useState('semana');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const consultas = [
    { id: 1, paciente: 'Maria Silva', horario: '09:00', duracao: 60, tipo: 'Individual', status: 'confirmada' },
    { id: 2, paciente: 'João Santos', horario: '10:30', duracao: 60, tipo: 'Casal', status: 'confirmada' },
    { id: 3, paciente: 'Ana Costa', horario: '14:00', duracao: 60, tipo: 'Individual', status: 'pendente' },
    { id: 4, paciente: 'Carlos Oliveira', horario: '15:30', duracao: 60, tipo: 'Individual', status: 'confirmada' },
    { id: 5, paciente: 'Lucia Ferreira', horario: '17:00', duracao: 60, tipo: 'Individual', status: 'cancelada' }
  ];

  const horarios = Array.from({ length: 14 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada': return 'success';
      case 'pendente': return 'warning';
      case 'cancelada': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="dashboard-terapeuta">
      <NavbarTerapeuta />

      <div className="container-fluid py-4">
        <div className="row">
          <SidebarTerapeuta />

          {/* Main Content */}
          <div className="col-md-9 col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 fw-bold">Agenda</h1>
              <div className="d-flex gap-2">
                <button 
                  className={`btn ${viewMode === 'dia' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('dia')}
                >
                  Dia
                </button>
                <button 
                  className={`btn ${viewMode === 'semana' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('semana')}
                >
                  Semana
                </button>
                <button 
                  className={`btn ${viewMode === 'mes' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('mes')}
                >
                  Mês
                </button>
              </div>
            </div>

            {/* Calendar Controls */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <h4 className="mb-0">Janeiro 2024</h4>
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success">
                      <i className="bi bi-plus-circle me-2"></i>Novo Agendamento
                    </button>
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-calendar-plus me-2"></i>Bloquear Horário
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Agenda View */}
            {viewMode === 'semana' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-bordered mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th style={{width: '100px'}}>Horário</th>
                          {diasSemana.map(dia => (
                            <th key={dia} className="text-center">{dia}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {horarios.map(horario => (
                          <tr key={horario}>
                            <td className="fw-bold text-center bg-light">{horario}</td>
                            {diasSemana.map((dia, index) => (
                              <td key={`${dia}-${horario}`} className="position-relative" style={{height: '60px'}}>
                                {/* Consultas do dia */}
                                {consultas
                                  .filter(consulta => consulta.horario === horario && index === 1) // Simular segunda-feira
                                  .map(consulta => (
                                    <div 
                                      key={consulta.id}
                                      className={`position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-${getStatusColor(consulta.status)} bg-opacity-25 border border-${getStatusColor(consulta.status)} rounded`}
                                      style={{top: 0, left: 0}}
                                    >
                                      <small className="fw-bold text-center">
                                        {consulta.paciente}<br />
                                        <span className="text-muted">{consulta.tipo}</span>
                                      </small>
                                    </div>
                                  ))
                                }
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'dia' && (
              <div className="row g-4">
                <div className="col-md-8">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-transparent">
                      <h5 className="fw-bold mb-0">Consultas de Hoje</h5>
                    </div>
                    <div className="card-body">
                      {consultas.map(consulta => (
                        <div key={consulta.id} className="d-flex align-items-center p-3 border rounded mb-3">
                          <div className="flex-shrink-0">
                            <div className={`bg-${getStatusColor(consulta.status)} bg-opacity-25 rounded-circle p-2`}>
                              <i className={`bi bi-person text-${getStatusColor(consulta.status)} fs-5`}></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">{consulta.paciente}</h6>
                            <p className="text-muted mb-1">{consulta.horario} - {consulta.tipo}</p>
                            <span className={`badge bg-${getStatusColor(consulta.status)}`}>
                              {consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="dropdown">
                              <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="dropdown">
                                <i className="bi bi-three-dots-vertical"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Editar</a></li>
                                <li><a className="dropdown-item" href="#">Cancelar</a></li>
                                <li><a className="dropdown-item" href="#">Remarcar</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-transparent">
                      <h5 className="fw-bold mb-0">Resumo do Dia</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Total de Consultas:</span>
                        <span className="fw-bold">{consultas.length}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Confirmadas:</span>
                        <span className="text-success fw-bold">
                          {consultas.filter(c => c.status === 'confirmada').length}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Pendentes:</span>
                        <span className="text-warning fw-bold">
                          {consultas.filter(c => c.status === 'pendente').length}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Canceladas:</span>
                        <span className="text-danger fw-bold">
                          {consultas.filter(c => c.status === 'cancelada').length}
                        </span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Faturamento Previsto:</span>
                        <span className="fw-bold text-success">R$ 450,00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaTerapeuta;