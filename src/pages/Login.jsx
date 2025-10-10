import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import API_BASE_URL from '../config.js';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '243940514947-0sqfkpbe7njhdp5kuuslc8m6g9rp43i1.apps.googleusercontent.com',
          callback: handleGoogleLogin
        });
        
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { theme: 'outline', size: 'large', width: '100%', text: 'continue_with' }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      
      const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        email: decoded.email,
        nome: decoded.name,
        foto_url: decoded.picture
      });
      
      login(res.data.usuario, res.data.token);
      navigate('/');
    } catch (error) {
      console.error('Erro no login Google:', error);
      alert('Erro ao fazer login com Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData);
      
      if (isLogin) {
        login(response.data.usuario, response.data.token);
        navigate('/');
      } else {
        alert('Cadastro realizado com sucesso!');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Erro:', error);
      const errorMessage = error.response?.data?.error || 'Erro na operação';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <i className="bi bi-heart-pulse text-primary" style={{ fontSize: '3rem' }}></i>
                  <h2 className="fw-bold mt-3">{isLogin ? 'Bem-vindo de volta' : 'Criar conta'}</h2>
                  <p className="text-muted">{isLogin ? 'Acesse sua conta' : 'Junte-se à nossa comunidade'}</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
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
                      <div className="mb-3">
                        <label className="form-label">Data de Nascimento</label>
                        <input
                          type="date"
                          className="form-control"
                          name="data_nascimento"
                          value={formData.data_nascimento || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Gênero</label>
                        <select
                          className="form-control"
                          name="genero"
                          value={formData.genero || ''}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="masculino">Masculino</option>
                          <option value="feminino">Feminino</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Telefone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="telefone"
                          value={formData.telefone || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </>
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
                    <label className="form-label">Senha {!isLogin && '(mínimo 4 caracteres)'}</label>
                    <input
                      type="password"
                      className="form-control"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      minLength={isLogin ? "1" : "4"}
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
                  
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
                    </button>
                  </div>
                </form>
                
                {isLogin && (
                  <>
                    <div className="position-relative my-4">
                      <hr className="my-0" />
                      <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">ou continue com</span>
                    </div>
                    <div className="google-btn-wrapper mb-3">
                      <div id="googleSignInButton" className="d-flex justify-content-center"></div>
                    </div>
                  </>
                )}
                
                <style>{`
                  .google-btn-wrapper {
                    padding: 0;
                  }
                  .google-btn-wrapper > div {
                    width: 100% !important;
                  }
                  .google-btn-wrapper iframe {
                    width: 100% !important;
                    height: 44px !important;
                  }
                `}</style>
                
                <div className="text-center">
                  {isLogin && (
                    <button className="btn btn-outline-secondary mb-2" type="button">
                      Alterar Senha
                    </button>
                  )}
                  <div>
                    <button
                      className="btn btn-link text-decoration-none"
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
      </div>
    </div>
  );
}

export default Login;