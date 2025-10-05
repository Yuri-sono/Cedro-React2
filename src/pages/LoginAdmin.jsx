import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const adminEmails = ['pazyuri84@gmail.com', 'ainutil87@gmail.com'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Verificar se email está autorizado
    if (!adminEmails.includes(formData.email)) {
      setError('Email não autorizado para acesso administrativo');
      setLoading(false);
      return;
    }

    // Login de teste para admins
    if (formData.senha === 'admin123') {
      const adminData = {
        id: 'admin_1',
        nome: 'Administrador',
        email: formData.email,
        tipo_usuario: 'admin'
      };

      localStorage.setItem('adminLogado', JSON.stringify(adminData));
      localStorage.setItem('token', 'token_admin');
      navigate('/admin/dashboard');
    } else {
      setError('Senha incorreta. Use: admin123');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="admin-icon-wrapper mb-3">
                    <i className="bi bi-shield-check text-white" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h2 className="fw-bold mt-3">Painel Administrativo</h2>
                  <p className="text-muted">Acesso exclusivo para administradores</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Administrativo</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      id="senha"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button 
                      type="submit" 
                      className="btn btn-success btn-lg"
                      disabled={loading}
                    >
                      {loading ? 'Verificando...' : 'Acessar Painel'}
                    </button>
                  </div>
                </form>

                <div className="mt-4 p-3 bg-success bg-opacity-10 border border-success border-opacity-25 rounded">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-info-circle text-success me-2"></i>
                    <h6 className="fw-bold text-success mb-0">Credenciais de Acesso</h6>
                  </div>
                  <div className="small text-muted">
                    <p className="mb-1"><strong>Emails autorizados:</strong></p>
                    {adminEmails.map(email => (
                      <p key={email} className="mb-1 ms-3">• {email}</p>
                    ))}
                    <p className="mb-0 mt-2"><strong>Senha:</strong> admin123</p>
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

export default LoginAdmin;