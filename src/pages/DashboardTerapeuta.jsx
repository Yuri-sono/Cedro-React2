import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarTerapeuta from '../components/NavbarTerapeuta.jsx';
import SidebarTerapeuta from '../components/SidebarTerapeuta.jsx';

const DashboardTerapeuta = () => {
  const [terapeuta, setTerapeuta] = useState(null);
  const [stats, setStats] = useState({
    consultasHoje: 5,
    consultasSemana: 23,
    pacientesAtivos: 45,
    faturamentoMes: 8500
  });
  const navigate = useNavigate();

  useEffect(() => {
    const terapeutaLogado = localStorage.getItem('terapeutaLogado');
    if (!terapeutaLogado) {
      navigate('/login-terapeuta');
      return;
    }
    setTerapeuta(JSON.parse(terapeutaLogado));
  }, [navigate]);



  if (!terapeuta) return <div>Carregando...</div>;

  return (
    <div className="dashboard-terapeuta">
      <NavbarTerapeuta terapeuta={terapeuta} />

      <div className="container-fluid py-4 terapeuta-bg">
        <style>{`
          .terapeuta-bg {
            background-color: #f8f9fa;
            min-height: calc(100vh - 56px);
          }
          [data-theme="dark"] .terapeuta-bg {
            background-color: #1a1a1a;
          }
          [data-theme="dark"] .card {
            background-color: #2d2d2d;
            color: #ffffff;
          }
          [data-theme="dark"] .text-muted {
            color: #aaaaaa !important;
          }
          [data-theme="dark"] .list-group-item {
            background-color: transparent;
            border-color: #444;
          }
        `}</style>
        <div className="row">
          <SidebarTerapeuta />

          {/* Main Content */}
          <div className="col-md-9 col-lg-10">
            {/* Welcome */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h3 fw-bold">Bem-vindo, {terapeuta.nome}</h1>
                <p className="text-muted">Aqui está um resumo das suas atividades hoje</p>
              </div>
              <div>
                <span className="badge bg-success fs-6">Online</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-calendar-check text-primary fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">{stats.consultasHoje}</h3>
                        <p className="text-muted mb-0">Consultas Hoje</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-success bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-calendar-week text-success fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">{stats.consultasSemana}</h3>
                        <p className="text-muted mb-0">Esta Semana</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-info bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-people text-info fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">{stats.pacientesAtivos}</h3>
                        <p className="text-muted mb-0">Pacientes Ativos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-currency-dollar text-warning fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">R$ {stats.faturamentoMes.toLocaleString()}</h3>
                        <p className="text-muted mb-0">Faturamento Mês</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-transparent">
                    <h5 className="fw-bold mb-0">Ações Rápidas</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <Link to="/terapeuta/nova-consulta" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i>Nova Consulta
                      </Link>
                      <Link to="/terapeuta/agenda" className="btn btn-outline-primary">
                        <i className="bi bi-calendar-plus me-2"></i>Agendar Horário
                      </Link>
                      <Link to="/terapeuta/pacientes/novo" className="btn btn-outline-success">
                        <i className="bi bi-person-plus me-2"></i>Novo Paciente
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-transparent">
                    <h5 className="fw-bold mb-0">Próximas Consultas</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item px-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Maria Silva</h6>
                            <small className="text-muted">14:00 - Terapia Individual</small>
                          </div>
                          <span className="badge bg-primary">Hoje</span>
                        </div>
                      </div>
                      <div className="list-group-item px-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">João Santos</h6>
                            <small className="text-muted">16:00 - Terapia de Casal</small>
                          </div>
                          <span className="badge bg-primary">Hoje</span>
                        </div>
                      </div>
                      <div className="list-group-item px-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Ana Costa</h6>
                            <small className="text-muted">09:00 - Terapia Individual</small>
                          </div>
                          <span className="badge bg-secondary">Amanhã</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <Link to="/terapeuta/agenda" className="btn btn-sm btn-outline-primary">
                        Ver Agenda Completa
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-transparent">
                <h5 className="fw-bold mb-0">Atividades Recentes</h5>
              </div>
              <div className="card-body">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker bg-success"></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">Consulta finalizada</h6>
                      <p className="text-muted mb-1">Sessão com Maria Silva concluída</p>
                      <small className="text-muted">Há 2 horas</small>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker bg-primary"></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">Novo agendamento</h6>
                      <p className="text-muted mb-1">Carlos Oliveira agendou consulta para amanhã</p>
                      <small className="text-muted">Há 4 horas</small>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker bg-info"></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">Relatório gerado</h6>
                      <p className="text-muted mb-1">Relatório mensal de atividades criado</p>
                      <small className="text-muted">Ontem</small>
                    </div>
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

export default DashboardTerapeuta;