import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAtivo = async (id, ativo) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}/ativar`, { ativo: !ativo });
      carregarUsuarios();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  const deletarUsuario = async (id) => {
    if (!confirm('Deseja realmente deletar este usuário?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`);
      carregarUsuarios();
    } catch (error) {
      alert('Erro ao deletar usuário');
    }
  };

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border"></div></div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gerenciar Usuários</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td><span className="badge bg-primary">{user.tipoUsuario}</span></td>
                <td>
                  <span className={`badge ${user.ativo ? 'bg-success' : 'bg-danger'}`}>
                    {user.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => toggleAtivo(user.id, user.ativo)}>
                    {user.ativo ? 'Desativar' : 'Ativar'}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deletarUsuario(user.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsuarios;
