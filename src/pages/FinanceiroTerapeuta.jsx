import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FinanceiroTerapeuta = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const financeiro = {
    resumo: {
      faturamentoMes: 12500,
      consultasRealizadas: 85,
      ticketMedio: 147,
      crescimento: 15.5
    },
    recebimentos: [
      { id: 1, paciente: 'Maria Silva', valor: 150, data: '2024-01-20', status: 'recebido', metodo: 'PIX' },
      { id: 2, paciente: 'João Santos', valor: 200, data: '2024-01-19', status: 'recebido', metodo: 'Cartão' },
      { id: 3, paciente: 'Ana Costa', valor: 150, data: '2024-01-18', status: 'pendente', metodo: 'PIX' },
      { id: 4, paciente: 'Carlos Lima', valor: 150, data: '2024-01-17', status: 'recebido', metodo: 'Dinheiro' }
    ],
    grafico: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      valores: [8500, 9200, 10100, 11300, 11800, 12500]
    }
  };

  const getStatusColor = (status) => {
    return status === 'recebido' ? 'success' : 'warning';
  };

  const exportarRelatorio = () => {
    alert('Relatório financeiro exportado com sucesso!');
  };

  return (
    <div className="dashboard-terapeuta">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/terapeuta/dashboard">
            <i className="bi bi-tree me-2"></i>Cedro - Área do Terapeuta
          </Link>
        </div>
      </nav>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  <Link to="/terapeuta/dashboard" className="list-group-item list-group-item-action">
                    <i className="bi bi-speedometer2 me-2"></i>Dashboard
                  </Link>
                  <Link to="/terapeuta/agenda" className="list-group-item list-group-item-action">
                    <i className="bi bi-calendar3 me-2"></i>Agenda
                  </Link>
                  <Link to="/terapeuta/pacientes" className="list-group-item list-group-item-action">
                    <i className="bi bi-people me-2"></i>Pacientes
                  </Link>
                  <Link to="/terapeuta/consultas" className="list-group-item list-group-item-action">
                    <i className="bi bi-clipboard-pulse me-2"></i>Consultas
                  </Link>
                  <Link to="/terapeuta/financeiro" className="list-group-item list-group-item-action active">
                    <i className="bi bi-graph-up me-2"></i>Financeiro
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9 col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 fw-bold">Financeiro</h1>
              <div className="d-flex gap-2">
                <select 
                  className="form-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="semana">Esta Semana</option>
                  <option value="mes">Este Mês</option>
                  <option value="trimestre">Trimestre</option>
                  <option value="ano">Ano</option>
                </select>
                <button className="btn btn-outline-primary" onClick={exportarRelatorio}>
                  <i className="bi bi-download me-2"></i>Exportar
                </button>
              </div>
            </div>

            {/* Cards de Resumo */}
            <div className="row g-4 mb-4">
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-success bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-currency-dollar text-success fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">R$ {financeiro.resumo.faturamentoMes.toLocaleString()}</h3>
                        <p className="text-muted mb-0">Faturamento</p>
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
                        <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-clipboard-check text-primary fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">{financeiro.resumo.consultasRealizadas}</h3>
                        <p className="text-muted mb-0">Consultas</p>
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
                          <i className="bi bi-graph-up text-info fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">R$ {financeiro.resumo.ticketMedio}</h3>
                        <p className="text-muted mb-0">Ticket Médio</p>
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
                          <i className="bi bi-trending-up text-warning fs-4"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">+{financeiro.resumo.crescimento}%</h3>
                        <p className="text-muted mb-0">Crescimento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {/* Gráfico */}
              <div className="col-md-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-transparent">
                    <h5 className="fw-bold mb-0">Evolução do Faturamento</h5>
                  </div>
                  <div className="card-body">
                    <div className="chart-container" style={{height: '300px'}}>
                      <div className="d-flex align-items-end justify-content-between h-100 px-3">
                        {financeiro.grafico.valores.map((valor, index) => (
                          <div key={index} className="d-flex flex-column align-items-center">
                            <div 
                              className="bg-primary rounded-top"
                              style={{
                                width: '40px',
                                height: `${(valor / Math.max(...financeiro.grafico.valores)) * 250}px`,
                                marginBottom: '10px'
                              }}
                            ></div>
                            <small className="text-muted">{financeiro.grafico.labels[index]}</small>
                            <small className="fw-bold">R$ {(valor/1000).toFixed(1)}k</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo de Pagamentos */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-transparent">
                    <h5 className="fw-bold mb-0">Métodos de Pagamento</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>PIX</span>
                        <span className="fw-bold">45%</span>
                      </div>
                      <div className="progress" style={{height: '8px'}}>
                        <div className="progress-bar bg-success" style={{width: '45%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Cartão</span>
                        <span className="fw-bold">35%</span>
                      </div>
                      <div className="progress" style={{height: '8px'}}>
                        <div className="progress-bar bg-primary" style={{width: '35%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Dinheiro</span>
                        <span className="fw-bold">20%</span>
                      </div>
                      <div className="progress" style={{height: '8px'}}>
                        <div className="progress-bar bg-warning" style={{width: '20%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recebimentos Recentes */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-header bg-transparent">
                <h5 className="fw-bold mb-0">Recebimentos Recentes</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Paciente</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Método</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financeiro.recebimentos.map(recebimento => (
                        <tr key={recebimento.id}>
                          <td>{recebimento.paciente}</td>
                          <td className="fw-bold text-success">R$ {recebimento.valor}</td>
                          <td>{new Date(recebimento.data).toLocaleDateString('pt-BR')}</td>
                          <td>
                            <span className="badge bg-light text-dark">{recebimento.metodo}</span>
                          </td>
                          <td>
                            <span className={`badge bg-${getStatusColor(recebimento.status)}`}>
                              {recebimento.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-outline-secondary btn-sm">
                              <i className="bi bi-receipt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroTerapeuta;