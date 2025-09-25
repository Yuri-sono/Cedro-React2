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
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  Meu Perfil
                </h3>
              </div>
              <div className="card-body">
                {/* Foto do Perfil */}
                <div className="text-center mb-4">
                  <div className="profile-photo-container">
                    <i className="bi bi-person-circle display-1 text-muted"></i>
                    <button className="btn btn-sm btn-outline-primary mt-2">
                      <i className="bi bi-camera me-1"></i>
                      Alterar Foto
                    </button>
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
                <hr />
                <h5 className="mb-3">
                  <i className="bi bi-graph-up me-2"></i>
                  Minha Jornada
                </h5>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h4 className="text-primary">12</h4>
                        <small>Sessões Realizadas</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h4 className="text-success">8</h4>
                        <small>Meditações Concluídas</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h4 className="text-info">5</h4>
                        <small>E-books Lidos</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h4 className="text-warning">3</h4>
                        <small>Webinars Assistidos</small>
                      </div>
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