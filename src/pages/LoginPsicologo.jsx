import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPsicologo = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    // Login de teste
    if (formData.email === 'psicologo@teste.com' && formData.senha === '123456') {
      const psicologoTeste = {
        id: 1,
        nome: 'Dr. João Silva',
        email: 'psicologo@teste.com',
        tipo_usuario: 'psicologo',
        numero_licenca: 'CRP 06/123456',
        especialidades: 'Ansiedade, Depressão, Terapia Cognitivo-Comportamental',
        valor_sessao: 150.00
      };

      localStorage.setItem('psicologoLogado', JSON.stringify(psicologoTeste));
      localStorage.setItem('token', 'token_teste_psicologo');
      navigate('/psicologo/dashboard');
    } else {
      setError('Email ou senha incorretos. Use: psicologo@teste.com / 123456');
    }
    
    setLoading(false);
  };

  const preencherTeste = () => {
    setFormData({
      email: 'psicologo@teste.com',
      senha: '123456'
    });
  };

  return (
    <div className="login-section py-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-badge text-primary" style={{ fontSize: '3rem' }}></i>
                  <h2 className="fw-bold mt-3">Login Psicólogo</h2>
                  <p className="text-muted">Acesse sua área profissional</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
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

                  <div className="d-grid gap-2 mb-3">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-outline-success"
                      onClick={preencherTeste}
                    >
                      Preencher dados de teste
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="mb-2">
                    <Link to="/esqueci-senha" className="text-decoration-none">
                      Esqueci minha senha
                    </Link>
                  </p>
                  <p className="text-muted">
                    Não tem conta? 
                    <Link to="/cadastro-psicologo" className="text-decoration-none ms-1">
                      Cadastre-se aqui
                    </Link>
                  </p>
                  <p className="text-muted">
                    <Link to="/login" className="text-decoration-none">
                      Sou paciente
                    </Link>
                  </p>
                </div>

                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="fw-bold">Dados de teste:</h6>
                  <p className="mb-1"><strong>Email:</strong> psicologo@teste.com</p>
                  <p className="mb-0"><strong>Senha:</strong> 123456</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPsicologo;