import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginTerapeuta = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular login
    localStorage.setItem('terapeutaLogado', JSON.stringify({
      id: 1,
      nome: 'Dr. João Silva',
      email: formData.email,
      crp: '06/123456'
    }));
    navigate('/terapeuta/dashboard');
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold">Login Terapeuta</h1>
                  <p className="text-muted">Acesse sua área profissional</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Entrar
                  </button>

                  <div className="text-center">
                    <Link to="/recuperar-senha-terapeuta" className="text-muted small">
                      Esqueceu sua senha?
                    </Link>
                  </div>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p className="mb-2">Ainda não é cadastrado?</p>
                    <Link to="/cadastro-terapeuta" className="btn btn-outline-primary">
                      Cadastre-se como Terapeuta
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginTerapeuta;