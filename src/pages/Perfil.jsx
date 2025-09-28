import React, { useState } from 'react';

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    dataNascimento: '1990-05-15',
    genero: 'masculino',
    endereco: 'São Paulo, SP',
    bio: 'Buscando bem-estar mental e equilíbrio na vida.'
  });

  const [editando, setEditando] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvar = () => {
    setEditando(false);
    // Aqui você adicionaria a lógica para salvar no backend
    alert('Perfil atualizado com sucesso!');
  };

  const handleAlterarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    // Aqui você adicionaria a lógica para alterar senha no backend
    alert('Senha alterada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
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
                  <span className="badge bg-primary">Paciente Ativo</span>
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
                      onChange={(e) => setNovaSenha(e.target.value)}
                    />
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
    </div>
  );
};

export default Perfil;