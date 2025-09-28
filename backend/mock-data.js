// Dados mockados para testar sem banco
const usuarios = [
  { id: 1, nome: 'Dr. Ana Silva', email: 'ana@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 2, nome: 'Dr. Carlos Santos', email: 'carlos@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 3, nome: 'Dra. Maria Oliveira', email: 'maria@cedro.com', tipo_usuario: 'terapeuta' }
];

const terapeutas = [
  {
    id: 1,
    nome: 'Dr. Ana Silva',
    especialidades: 'Ansiedade, Depressão, TCC',
    valor_sessao: 150.00,
    anos_experiencia: 10,
    formacao: 'Psicologia - USP',
    abordagem_terapeutica: 'Terapia Cognitivo-Comportamental',
    bio: 'Especialista em terapia cognitivo-comportamental com 10 anos de experiência.',
    numero_licenca: 'CRP 06/123456'
  },
  {
    id: 2,
    nome: 'Dr. Carlos Santos',
    especialidades: 'Traumas, Psicanálise, Relacionamentos',
    valor_sessao: 180.00,
    anos_experiencia: 15,
    formacao: 'Psicologia - PUC-SP',
    abordagem_terapeutica: 'Psicanálise',
    bio: 'Psicanalista com foco em traumas e relacionamentos.',
    numero_licenca: 'CRP 06/789012'
  },
  {
    id: 3,
    nome: 'Dra. Maria Oliveira',
    especialidades: 'Terapia Familiar, Terapia de Casal',
    valor_sessao: 200.00,
    anos_experiencia: 8,
    formacao: 'Psicologia - UNIFESP',
    abordagem_terapeutica: 'Terapia Sistêmica',
    bio: 'Especialista em terapia familiar e de casal.',
    numero_licenca: 'CRP 06/345678'
  }
];

module.exports = { usuarios, terapeutas };