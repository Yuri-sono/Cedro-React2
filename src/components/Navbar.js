import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-tree me-2 fs-3"></i>
          <span className="fw-bold fs-4">CEDRO</span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Início</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#sobre">Sobre Nós</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#servicos">Serviços</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#recursos">Recursos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contato">Contato</a>
            </li>
          </ul>
          <a href="/#ajuda" className="btn btn-light ms-3">Preciso de Ajuda</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;