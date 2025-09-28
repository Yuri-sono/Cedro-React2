import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:3001${endpoint}`, formData);
      
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        window.location.href = '/';
      } else {
        alert('Cadastro realizado com sucesso!');
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Erro na operação');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>{isLogin ? 'Login' : 'Cadastro'}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={formData.nome || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">Tipo de Usuário</label>
                    <select
                      className="form-control"
                      name="tipo_usuario"
                      value={formData.tipo_usuario || 'paciente'}
                      onChange={handleChange}
                      required
                    >
                      <option value="paciente">Paciente</option>
                      <option value="terapeuta">Terapeuta</option>
                    </select>
                  </div>
                )}
                
                <button type="submit" className="btn btn-primary w-100">
                  {isLogin ? 'Entrar' : 'Cadastrar'}
                </button>
              </form>
              
              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;