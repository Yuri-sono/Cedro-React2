import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PacientesTerapeuta = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const pacientes = [
    {
      id: 1,
      nome: 'Maria Silva',
      email: 'maria@email.com',
      telefone: '(11) 99999-9999',
      idade: 32,
      status: 'ativo',
      ultimaConsulta: '2024-01-15',
      proximaConsulta: '2024-01-22',
      sessoes: 12
    },
    {
      id: 2,
      nome: 'João Santos',
      email: 'joao@email.com',
      telefone: '(11) 88888-8888',
      idade: 28,
      status: 'ativo',
      ultimaConsulta: '2024-01-14',
      proximaConsulta: '2024-01-21',
      sessoes: 8
    },
    {
      id: 3,
      nome: 'Ana Costa',
      email: 'ana@email.com',
      telefone: '(11) 77777-7777',
      idade: 45,
      status: 'inativo',
      ultimaConsulta: '2023-12-20',
      proximaConsulta: null,
      sessoes: 24
    }
  ];

  const filteredPacientes = pacientes.filter(paciente => {
    const matchesSearch = paciente.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || paciente.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
                  <Link to="/terapeuta/pacientes" className="list-group-item list-group-item-action active">
                    <i className="bi bi-people me-2"></i>Pacientes
                  </Link>
                  <Link to="/terapeuta/consultas" className="list-group-item list-group-item-action">
                    <i className="bi bi-clipboard-pulse me-2"></i>Consultas
                  </Link>
                  <Link to="/terapeuta/financeiro" className="list-group-item list-group-item-action">
                    <i className="bi bi-graph-up me-2"></i>Financeiro
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9 col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 fw-bold">Pacientes</h1>
              <button className="btn btn-primary">
                <i className="bi bi-person-plus me-2"></i>Novo Paciente
              </button>
            </div>

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar paciente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="todos">Todos</option>
                      <option value="ativo">Ativos</option>
                      <option value="inativo">Inativos</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Paciente</th>
                        <th>Contato</th>
                        <th>Status</th>
                        <th>Sessões</th>
                        <th>Última Consulta</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPacientes.map(paciente => (
                        <tr key={paciente.id}>
                          <td>
                            <div>
                              <h6 className="mb-0">{paciente.nome}</h6>
                              <small className="text-muted">{paciente.idade} anos</small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div>{paciente.email}</div>
                              <small className="text-muted">{paciente.telefone}</small>
                            </div>
                          </td>
                          <td>
                            <span className={`badge bg-${paciente.status === 'ativo' ? 'success' : 'secondary'}`}>
                              {paciente.status}
                            </span>
                          </td>
                          <td>{paciente.sessoes}</td>
                          <td>{new Date(paciente.ultimaConsulta).toLocaleDateString('pt-BR')}</td>
                          <td>
                            <div className="dropdown">
                              <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="dropdown">
                                <i className="bi bi-three-dots-vertical"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Ver Perfil</a></li>
                                <li><a className="dropdown-item" href="#">Agendar</a></li>
                                <li><a className="dropdown-item" href="#">Editar</a></li>
                              </ul>
                            </div>
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

export default PacientesTerapeuta;