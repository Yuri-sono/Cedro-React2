import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CadastroPsicologo = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    numeroLicenca: '',
    especialidades: '',
    valorSessao: '',
    anosExperiencia: '',
    formacao: '',
    abordagemTerapeutica: ''
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

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    // Simulação de cadastro
    setTimeout(() => {
      alert('Cadastro realizado com sucesso! Aguarde aprovação.');
      navigate('/login-psicologo');
    }, 1000);
  };

  return (
    <div className="cadastro-section py-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-badge text-primary" style={{ fontSize: '3rem' }}></i>
                  <h2 className="fw-bold mt-3">Cadastro de Psicólogo</h2>
                  <p className="text-muted">Junte-se à nossa equipe de profissionais</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nome" className="form-label">Nome Completo *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Email *</label>
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
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="senha" className="form-label">Senha *</label>
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
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha *</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="telefone" className="form-label">Telefone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="numeroLicenca" className="form-label">Número CRP *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="numeroLicenca"
                        name="numeroLicenca"
                        placeholder="Ex: CRP 06/123456"
                        value={formData.numeroLicenca}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="especialidades" className="form-label">Especialidades</label>
                    <input
                      type="text"
                      className="form-control"
                      id="especialidades"
                      name="especialidades"
                      placeholder="Ex: Ansiedade, Depressão, Terapia Cognitivo-Comportamental"
                      value={formData.especialidades}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="valorSessao" className="form-label">Valor da Sessão (R$)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="valorSessao"
                        name="valorSessao"
                        min="0"
                        step="0.01"
                        value={formData.valorSessao}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="anosExperiencia" className="form-label">Anos de Experiência</label>
                      <input
                        type="number"
                        className="form-control"
                        id="anosExperiencia"
                        name="anosExperiencia"
                        min="0"
                        value={formData.anosExperiencia}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="formacao" className="form-label">Formação</label>
                    <textarea
                      className="form-control"
                      id="formacao"
                      name="formacao"
                      rows="2"
                      placeholder="Descreva sua formação acadêmica"
                      value={formData.formacao}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="abordagemTerapeutica" className="form-label">Abordagem Terapêutica</label>
                    <textarea
                      className="form-control"
                      id="abordagemTerapeutica"
                      name="abordagemTerapeutica"
                      rows="2"
                      placeholder="Descreva sua abordagem terapêutica"
                      value={formData.abordagemTerapeutica}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="d-grid mb-3">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="text-muted">
                    Já tem conta? 
                    <Link to="/login-psicologo" className="text-decoration-none ms-1">
                      Faça login aqui
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroPsicologo;