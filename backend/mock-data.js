// Dados mockados para testar sem banco
const usuarios = [
  { id: 1, nome: 'Dr. Ana Silva', email: 'ana@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 2, nome: 'Dr. Carlos Santos', email: 'carlos@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 3, nome: 'Dra. Maria Oliveira', email: 'maria@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 4, nome: 'Dr. João Pereira', email: 'joao@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 5, nome: 'Dra. Fernanda Costa', email: 'fernanda@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 6, nome: 'Dr. Roberto Lima', email: 'roberto@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 7, nome: 'Dra. Juliana Mendes', email: 'juliana@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 8, nome: 'Dr. Pedro Alves', email: 'pedro@cedro.com', tipo_usuario: 'terapeuta' },
  { id: 9, nome: 'Dr. Joseph Cadura', email: 'joseph@cedro.com', tipo_usuario: 'terapeuta' }
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
  },
  {
    id: 4,
    nome: 'Dr. João Pereira',
    especialidades: 'Burnout, Estresse, Mindfulness',
    valor_sessao: 140.00,
    anos_experiencia: 12,
    formacao: 'Psicologia - UNESP',
    abordagem_terapeutica: 'Terapia Humanística',
    bio: 'Especialista em burnout e técnicas de mindfulness para redução do estresse.',
    numero_licenca: 'CRP 06/456789'
  },
  {
    id: 5,
    nome: 'Dra. Fernanda Costa',
    especialidades: 'Adolescentes, Autoestima, Bullying',
    valor_sessao: 130.00,
    anos_experiencia: 7,
    formacao: 'Psicologia - UNICAMP',
    abordagem_terapeutica: 'Terapia Gestalt',
    bio: 'Psicóloga especializada no atendimento de adolescentes e questões de autoestima.',
    numero_licenca: 'CRP 06/567890'
  },
  {
    id: 6,
    nome: 'Dr. Roberto Lima',
    especialidades: 'Vícios, Dependência Química, Grupos',
    valor_sessao: 170.00,
    anos_experiencia: 18,
    formacao: 'Psicologia - UFMG',
    abordagem_terapeutica: 'Terapia Comportamental',
    bio: 'Especialista em dependência química e coordenador de grupos terapêuticos.',
    numero_licenca: 'CRP 06/678901'
  },
  {
    id: 7,
    nome: 'Dra. Juliana Mendes',
    especialidades: 'Luto, Perdas, Terapia Breve',
    valor_sessao: 160.00,
    anos_experiencia: 9,
    formacao: 'Psicologia - PUC-RJ',
    abordagem_terapeutica: 'Terapia Breve Focal',
    bio: 'Especialista em processos de luto e perdas, com abordagem terapêutica breve.',
    numero_licenca: 'CRP 06/789123'
  },
  {
    id: 8,
    nome: 'Dr. Pedro Alves',
    especialidades: 'TDAH, Autismo, Neuropsicologia',
    valor_sessao: 190.00,
    anos_experiencia: 14,
    formacao: 'Psicologia - UFRJ',
    abordagem_terapeutica: 'Neuropsicologia',
    bio: 'Neuropsicólogo especializado em TDAH, autismo e avaliações neuropsicológicas.',
    numero_licenca: 'CRP 06/890123'
  },
  {
    id: 9,
    nome: 'Dr. Joseph Cadura',
    especialidades: 'Fobias, Pânico, Terapia Comportamental',
    valor_sessao: 165.00,
    anos_experiencia: 11,
    formacao: 'Psicologia - UFPR',
    abordagem_terapeutica: 'Terapia Comportamental',
    bio: 'Especialista em transtornos de ansiedade, fobias e síndrome do pânico.',
    numero_licenca: 'CRP 06/901234'
  }
];

module.exports = { usuarios, terapeutas };