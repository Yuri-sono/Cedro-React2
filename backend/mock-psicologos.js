const mockPsicologos = [
  {
    id: 'mock_1',
    nome: 'Dr. Ana Silva',
    email: 'ana.silva@mock.com',
    crp: '06/123456',
    especialidades: ['Ansiedade', 'Depressão', 'Terapia Cognitiva'],
    foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300',
    avaliacao: 4.8,
    preco: 120,
    disponivel: true,
    bio: 'Especialista em terapia cognitivo-comportamental com 10 anos de experiência.'
  },
  {
    id: 'mock_2',
    nome: 'Dr. Carlos Santos',
    email: 'carlos.santos@mock.com',
    crp: '06/789012',
    especialidades: ['Relacionamentos', 'Autoestima', 'Terapia Familiar'],
    foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300',
    avaliacao: 4.9,
    preco: 150,
    disponivel: true,
    bio: 'Psicólogo clínico focado em relacionamentos e dinâmicas familiares.'
  },
  {
    id: 'mock_3',
    nome: 'Dra. Maria Oliveira',
    email: 'maria.oliveira@mock.com',
    crp: '06/345678',
    especialidades: ['Trauma', 'EMDR', 'Terapia Humanística'],
    foto: 'https://images.unsplash.com/photo-1594824804732-ca8db7536543?w=300',
    avaliacao: 4.7,
    preco: 130,
    disponivel: false,
    bio: 'Especialista em tratamento de traumas e técnicas de EMDR.'
  },
  {
    id: 'mock_4',
    nome: 'Dr. João Ferreira',
    email: 'joao.ferreira@mock.com',
    crp: '06/901234',
    especialidades: ['Adolescentes', 'Transtornos Alimentares', 'Terapia Comportamental'],
    foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300',
    avaliacao: 4.6,
    preco: 110,
    disponivel: true,
    bio: 'Psicólogo especializado no atendimento de adolescentes e jovens adultos.'
  },
  {
    id: 'mock_5',
    nome: 'Dra. Lucia Costa',
    email: 'lucia.costa@mock.com',
    crp: '06/567890',
    especialidades: ['Mindfulness', 'Estresse', 'Terapia Integrativa'],
    foto: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300',
    avaliacao: 4.9,
    preco: 140,
    disponivel: true,
    bio: 'Praticante de mindfulness e terapias integrativas para redução do estresse.'
  },
  {
    id: 'mock_6',
    nome: 'Dr. Paulo Minoso',
    email: 'paulo.minoso@mock.com',
    crp: '06/111222',
    especialidades: ['Terapia Comportamental', 'Fobias', 'Transtornos de Ansiedade'],
    foto: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300',
    avaliacao: 4.5,
    preco: 100,
    disponivel: true,
    bio: 'Especialista em terapia comportamental e tratamento de fobias específicas.'
  },
  {
    id: 'mock_7',
    nome: 'Dr. Joseph Cadura',
    email: 'joseph.cadura@mock.com',
    crp: '06/333444',
    especialidades: ['Psicologia Clínica', 'Depressão', 'Terapia Psicodinâmica'],
    foto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300',
    avaliacao: 4.8,
    preco: 135,
    disponivel: true,
    bio: 'Psicólogo clínico com abordagem psicodinâmica e experiência em depressão.'
  }
];

module.exports = { mockPsicologos };