import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center py-5" style={{ minHeight: '70vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '5rem' }}></i>
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Página não encontrada</h2>
          <p className="text-muted mb-4">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            <i className="bi bi-house me-2"></i>Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
