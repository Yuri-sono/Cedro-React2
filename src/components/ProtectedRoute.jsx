import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Verificar se é psicólogo logado
  const psicologoLogado = localStorage.getItem('psicologoLogado');
  const isPsicologoAuthenticated = !!psicologoLogado;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Se requer tipo psicólogo, verificar autenticação específica
  if (requiredUserType === 'psicologo') {
    if (!isPsicologoAuthenticated) {
      return <Navigate to="/login-psicologo" replace />;
    }
    return children;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && user?.tipo_usuario !== requiredUserType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;