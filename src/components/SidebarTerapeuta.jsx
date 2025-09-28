import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarTerapeuta = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/terapeuta/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/terapeuta/agenda', icon: 'bi-calendar3', label: 'Agenda' },
    { path: '/terapeuta/pacientes', icon: 'bi-people', label: 'Pacientes' },
    { path: '/terapeuta/consultas', icon: 'bi-clipboard-pulse', label: 'Consultas' },
    { path: '/terapeuta/financeiro', icon: 'bi-graph-up', label: 'Financeiro' }
  ];

  return (
    <div className="col-md-3 col-lg-2">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="list-group list-group-flush">
            {menuItems.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`list-group-item list-group-item-action ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                <i className={`bi ${item.icon} me-2`}></i>{item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarTerapeuta;