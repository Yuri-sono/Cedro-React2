import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import CustomModal from '../components/CustomModal.jsx';
import { useModal } from '../hooks/useModal.jsx';

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { modal, showAlert, showConfirm, closeModal } = useModal();
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
    endereco: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      const dataNasc = user.data_nascimento ? user.data_nascimento.split('T')[0] : '';
      setUsuario({
        nome: user.nome || '',
        email: user.email || '',
        telefone: user.telefone || '',
        dataNascimento: dataNasc,
        genero: user.genero || '',
        endereco: user.endereco || '',
        bio: user.bio || 'Buscando bem-estar mental e equilíbrio na vida.'
      });
    }
  }, [user]);

  const [editando, setEditando] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaValidacao, setSenhaValidacao] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvar = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/auth/perfil', {
        nome: usuario.nome,
        telefone: usuario.telefone,
        data_nascimento: usuario.dataNascimento,
        genero: usuario.genero,
        endereco: usuario.endereco,
        bio: usuario.bio
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setEditando(false);
      await showAlert('Perfil atualizado com sucesso!', 'Sucesso', 'success');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      if (error.response?.data?.expired) {
        await showAlert('Sessão expirada. Faça login novamente.', 'Erro', 'error');
        logout();
        navigate('/login');
      } else {
        await showAlert('Erro ao salvar perfil. Tente novamente.', 'Erro', 'error');
      }
    }
  };

  const handleExcluirConta = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:3001/api/auth/conta', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await showAlert('Conta excluída com sucesso.', 'Sucesso', 'success');
      logout();
      navigate('/');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      await showAlert('Erro ao excluir conta. Tente novamente.', 'Erro', 'error');
    }
  };

  const handleAlterarSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      await showAlert('As senhas não coincidem!', 'Erro', 'error');
      return;
    }
    
    if (!senhaValidacao.minLength || !senhaValidacao.hasNumber || !senhaValidacao.hasSpecial) {
      await showAlert('A nova senha não atende aos requisitos mínimos de segurança.', 'Erro', 'error');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/auth/alterar-senha', {
        senhaAtual,
        novaSenha
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await showAlert('Senha alterada com sucesso!', 'Sucesso', 'success');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      await showAlert('Erro ao alterar senha. Verifique a senha atual.', 'Erro', 'error');
    }
  };

  return (
    <div className="perfil-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="profile-card">
              <div className="text-center mb-4">
                <div className="profile-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>
                <h2 className="fw-bold mb-1">{usuario.nome}</h2>
                <p className="text-muted mb-3">{usuario.email}</p>
                <div className="d-flex justify-content-center gap-2 mb-4">
                  <span className="badge bg-primary">
                    {user?.tipo_usuario === 'terapeuta' ? 'Terapeuta' : 'Paciente'} Ativo
                  </span>
                  <span className="badge bg-success">Verificado</span>
                </div>
              </div>

                {/* Informações Pessoais */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={usuario.nome}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={usuario.email}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="telefone"
                      value={usuario.telefone}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Data de Nascimento</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dataNascimento"
                      value={usuario.dataNascimento}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gênero</label>
                    <select
                      className="form-select"
                      name="genero"
                      value={usuario.genero}
                      onChange={handleInputChange}
                      disabled={!editando}
                    >
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                      <option value="nao-informar">Prefiro não informar</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Localização</label>
                    <input
                      type="text"
                      className="form-control"
                      name="endereco"
                      value={usuario.endereco}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Sobre mim</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="bio"
                    value={usuario.bio}
                    onChange={handleInputChange}
                    disabled={!editando}
                  ></textarea>
                </div>

                {/* Botões de Ação */}
                <div className="d-flex gap-2 mb-4">
                  {!editando ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditando(true)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Editar Perfil
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-success" onClick={handleSalvar}>
                        <i className="bi bi-check-lg me-1"></i>
                        Salvar
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditando(false)}
                      >
                        <i className="bi bi-x-lg me-1"></i>
                        Cancelar
                      </button>
                    </>
                  )}
                </div>

                {/* Seção de Alterar Senha */}
                <hr />
                <h5 className="mb-3">
                  <i className="bi bi-shield-lock me-2"></i>
                  Alterar Senha
                </h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Senha Atual</label>
                    <input
                      type="password"
                      className="form-control"
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Nova Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      value={novaSenha}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNovaSenha(value);
                        setSenhaValidacao({
                          minLength: value.length >= 5,
                          hasNumber: /\d/.test(value),
                          hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value)
                        });
                      }}
                    />
                    {novaSenha && (
                      <div className="mt-1">
                        <small className={senhaValidacao.minLength ? 'text-success' : 'text-danger'}>
                          <i className={`bi bi-${senhaValidacao.minLength ? 'check-circle-fill' : 'x-circle-fill'}`}></i> 5+ caracteres
                        </small>{' '}
                        <small className={senhaValidacao.hasNumber ? 'text-success' : 'text-danger'}>
                          <i className={`bi bi-${senhaValidacao.hasNumber ? 'check-circle-fill' : 'x-circle-fill'}`}></i> 1 número
                        </small>{' '}
                        <small className={senhaValidacao.hasSpecial ? 'text-success' : 'text-danger'}>
                          <i className={`bi bi-${senhaValidacao.hasSpecial ? 'check-circle-fill' : 'x-circle-fill'}`}></i> 1 especial
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-warning"
                  onClick={handleAlterarSenha}
                  disabled={!senhaAtual || !novaSenha || !confirmarSenha}
                >
                  <i className="bi bi-key me-1"></i>
                  Alterar Senha
                </button>

                {/* Excluir Conta */}
                <hr className="mt-4" />
                <h5 className="mb-3 text-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Zona de Perigo
                </h5>
                <p className="text-muted">Ao excluir sua conta, todos os seus dados serão permanentemente removidos.</p>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    const confirmed = await showConfirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!', 'Excluir Conta');
                    if (confirmed) {
                      handleExcluirConta();
                    }
                  }}
                >
                  <i className="bi bi-trash me-1"></i>
                  Excluir Conta
                </button>

                {/* Estatísticas do Usuário */}
                <div className="stats-section mt-4">
                  <h5 className="mb-4 text-center">
                    <i className="bi bi-graph-up me-2"></i>
                    Minha Jornada
                  </h5>
                  <div className="row g-3">
                    <div className="col-6 col-md-3">
                      <div className="stat-card">
                        <div className="stat-icon bg-primary">
                          <i className="bi bi-calendar-check"></i>
                        </div>
                        <h4>12</h4>
                        <small>Sessões</small>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="stat-card">
                        <div className="stat-icon bg-success">
                          <i className="bi bi-headphones"></i>
                        </div>
                        <h4>8</h4>
                        <small>Meditações</small>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="stat-card">
                        <div className="stat-icon bg-info">
                          <i className="bi bi-book"></i>
                        </div>
                        <h4>5</h4>
                        <small>E-books</small>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="stat-card">
                        <div className="stat-icon bg-warning">
                          <i className="bi bi-camera-video"></i>
                        </div>
                        <h4>3</h4>
                        <small>Webinars</small>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
      />
    </div>
  );
};

export default Perfil;