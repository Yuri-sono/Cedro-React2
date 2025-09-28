import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CadastroTerapeuta = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    crp: '',
    especialidades: [],
    experiencia: '',
    formacao: '',
    curriculo: null,
    disponibilidade: {
      segunda: { manha: false, tarde: false, noite: false },
      terca: { manha: false, tarde: false, noite: false },
      quarta: { manha: false, tarde: false, noite: false },
      quinta: { manha: false, tarde: false, noite: false },
      sexta: { manha: false, tarde: false, noite: false },
      sabado: { manha: false, tarde: false, noite: false },
      domingo: { manha: false, tarde: false, noite: false }
    },
    valorConsulta: '',
    modalidades: [],
    biografia: ''
  });

  const especialidadesOptions = [
    'Ansiedade', 'Depressão', 'Terapia de Casal', 'Terapia Familiar',
    'Transtornos Alimentares', 'Dependência Química', 'Luto',
    'Trauma', 'Terapia Infantil', 'Terapia de Adolescentes'
  ];

  const modalidadesOptions = ['Presencial', 'Online', 'Ambas'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleDisponibilidadeChange = (dia, periodo) => {
    setFormData(prev => ({
      ...prev,
      disponibilidade: {
        ...prev.disponibilidade,
        [dia]: {
          ...prev.disponibilidade[dia],
          [periodo]: !prev.disponibilidade[dia][periodo]
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cadastro enviado com sucesso! Entraremos em contato em até 48 horas.');
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="fw-bold">Cadastro de Terapeuta</h1>
              <p className="lead">Junte-se à nossa equipe e ajude pessoas a cuidarem da saúde mental</p>
            </div>

            <div className="card border-0 shadow">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Dados Pessoais */}
                    <div className="col-12">
                      <h3 className="h4 fw-bold mb-3 text-primary">Dados Pessoais</h3>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Nome Completo *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Telefone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">CRP *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="crp"
                        value={formData.crp}
                        onChange={handleInputChange}
                        placeholder="Ex: 06/123456"
                        required
                      />
                    </div>

                    {/* Formação */}
                    <div className="col-12">
                      <h3 className="h4 fw-bold mb-3 text-primary">Formação Profissional</h3>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Formação Acadêmica *</label>
                      <textarea
                        className="form-control"
                        name="formacao"
                        value={formData.formacao}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Descreva sua formação acadêmica, especializações e cursos relevantes"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Anos de Experiência *</label>
                      <select
                        className="form-select"
                        name="experiencia"
                        value={formData.experiencia}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="0-2">0-2 anos</option>
                        <option value="3-5">3-5 anos</option>
                        <option value="6-10">6-10 anos</option>
                        <option value="10+">Mais de 10 anos</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Currículo (PDF)</label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".pdf"
                        onChange={(e) => setFormData(prev => ({ ...prev, curriculo: e.target.files[0] }))}
                      />
                    </div>

                    {/* Especialidades */}
                    <div className="col-12">
                      <h3 className="h4 fw-bold mb-3 text-primary">Especialidades</h3>
                      <div className="row">
                        {especialidadesOptions.map(esp => (
                          <div key={esp} className="col-md-4 col-sm-6 mb-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={formData.especialidades.includes(esp)}
                                onChange={() => handleCheckboxChange('especialidades', esp)}
                              />
                              <label className="form-check-label">{esp}</label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Modalidades */}
                    <div className="col-12">
                      <h3 className="h4 fw-bold mb-3 text-primary">Modalidades de Atendimento</h3>
                      <div className="row">
                        {modalidadesOptions.map(mod => (
                          <div key={mod} className="col-md-4 mb-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={formData.modalidades.includes(mod)}
                                onChange={() => handleCheckboxChange('modalidades', mod)}
                              />
                              <label className="form-check-label">{mod}</label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Disponibilidade */}
                    <div className="col-12">
                      <h3 className="h4 fw-bold mb-3 text-primary">Disponibilidade</h3>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Dia</th>
                              <th>Manhã (8h-12h)</th>
                              <th>Tarde (13h-17h)</th>
                              <th>Noite (18h-22h)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(formData.disponibilidade).map(dia => (
                              <tr key={dia}>
                                <td className="fw-bold">{dia.charAt(0).toUpperCase() + dia.slice(1)}</td>
                                {['manha', 'tarde', 'noite'].map(periodo => (
                                  <td key={periodo} className="text-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      checked={formData.disponibilidade[dia][periodo]}
                                      onChange={() => handleDisponibilidadeChange(dia, periodo)}
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Valor */}
                    <div className="col-md-6">
                      <label className="form-label">Valor da Consulta (R$) *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="valorConsulta"
                        value={formData.valorConsulta}
                        onChange={handleInputChange}
                        min="50"
                        max="500"
                        required
                      />
                    </div>

                    {/* Biografia */}
                    <div className="col-12">
                      <label className="form-label">Biografia Profissional *</label>
                      <textarea
                        className="form-control"
                        name="biografia"
                        value={formData.biografia}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Conte um pouco sobre sua abordagem terapêutica e experiência"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" required />
                        <label className="form-check-label">
                          Concordo com os <a href="#">termos de uso</a> e <a href="#">política de privacidade</a>
                        </label>
                      </div>
                    </div>

                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary btn-lg px-5">
                        Enviar Cadastro
                      </button>
                      <div className="mt-3">
                        <Link to="/" className="text-muted">Voltar ao início</Link>
                      </div>
                    </div>
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

export default CadastroTerapeuta;