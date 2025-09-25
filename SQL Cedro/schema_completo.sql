-- =====================================================
-- CEDRO - ESQUEMA DE BANCO DE DADOS COMPLETO
-- Sistema de Apoio Psicológico
-- =====================================================

-- Tabela de Usuários (Pacientes e Terapeutas)
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    senha_hash NVARCHAR(255) NOT NULL,
    data_nascimento DATE,
    genero NVARCHAR(20) CHECK (genero IN ('masculino', 'feminino', 'outro', 'nao-informar')),
    telefone NVARCHAR(20),
    endereco NVARCHAR(200),
    bio NVARCHAR(500),
    foto_perfil NVARCHAR(255),
    tipo_usuario NVARCHAR(10) NOT NULL CHECK (tipo_usuario IN ('paciente', 'terapeuta')),
    ativo BIT DEFAULT 1,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    data_atualizacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela específica para dados de Terapeutas
CREATE TABLE terapeutas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    numero_licenca NVARCHAR(50) NOT NULL UNIQUE,
    especialidades NVARCHAR(300),
    valor_sessao DECIMAL(10,2) NOT NULL,
    anos_experiencia INT,
    formacao NVARCHAR(300),
    abordagem_terapeutica NVARCHAR(200),
    disponivel BIT DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Sessões de Terapia
CREATE TABLE sessoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    paciente_id INT NOT NULL,
    terapeuta_id INT NOT NULL,
    data_sessao DATETIME2 NOT NULL,
    duracao_minutos INT DEFAULT 50,
    status_sessao NVARCHAR(20) DEFAULT 'agendada' CHECK (status_sessao IN ('agendada', 'confirmada', 'cancelada', 'concluida')),
    observacoes NVARCHAR(500),
    valor DECIMAL(10,2) NOT NULL,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (paciente_id) REFERENCES usuarios(id),
    FOREIGN KEY (terapeuta_id) REFERENCES usuarios(id)
);

-- Tabela de Avaliações e Comentários
CREATE TABLE avaliacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    paciente_id INT NOT NULL,
    terapeuta_id INT NOT NULL,
    sessao_id INT,
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario NVARCHAR(1000),
    data_avaliacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (paciente_id) REFERENCES usuarios(id),
    FOREIGN KEY (terapeuta_id) REFERENCES usuarios(id),
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id)
);

-- Tabela de Pagamentos
CREATE TABLE pagamentos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    sessao_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    metodo_pagamento NVARCHAR(30) NOT NULL CHECK (metodo_pagamento IN ('cartao_credito', 'cartao_debito', 'pix', 'boleto', 'transferencia')),
    status_pagamento NVARCHAR(20) DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'processando', 'aprovado', 'rejeitado', 'estornado')),
    id_transacao_externa NVARCHAR(100),
    data_pagamento DATETIME2,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id)
);

-- Tabela de Artigos do Blog
CREATE TABLE artigos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    conteudo NTEXT NOT NULL,
    autor_id INT NOT NULL,
    resumo NVARCHAR(300),
    imagem_capa NVARCHAR(255),
    publicado BIT DEFAULT 0,
    data_publicacao DATETIME2,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    data_atualizacao DATETIME2 DEFAULT GETDATE(),
    visualizacoes INT DEFAULT 0,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);

-- Tabela de Tags para Artigos
CREATE TABLE tags (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL UNIQUE,
    cor NVARCHAR(7) DEFAULT '#007bff'
);

-- Tabela de relacionamento Artigos-Tags (muitos para muitos)
CREATE TABLE artigo_tags (
    artigo_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (artigo_id, tag_id),
    FOREIGN KEY (artigo_id) REFERENCES artigos(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Tabela de Mensagens
CREATE TABLE mensagens (
    id INT IDENTITY(1,1) PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    conteudo NVARCHAR(2000) NOT NULL,
    lida BIT DEFAULT 0,
    data_envio DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id),
    FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
);

-- Tabela de Conversas (para agrupar mensagens)
CREATE TABLE conversas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario1_id INT NOT NULL,
    usuario2_id INT NOT NULL,
    ultima_mensagem_id INT,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    data_ultima_atividade DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (usuario1_id) REFERENCES usuarios(id),
    FOREIGN KEY (usuario2_id) REFERENCES usuarios(id),
    FOREIGN KEY (ultima_mensagem_id) REFERENCES mensagens(id),
    UNIQUE (usuario1_id, usuario2_id)
);

-- Tabela de Horários Disponíveis dos Terapeutas
CREATE TABLE horarios_disponiveis (
    id INT IDENTITY(1,1) PRIMARY KEY,
    terapeuta_id INT NOT NULL,
    dia_semana INT NOT NULL CHECK (dia_semana BETWEEN 0 AND 6), -- 0=Domingo, 6=Sábado
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    ativo BIT DEFAULT 1,
    FOREIGN KEY (terapeuta_id) REFERENCES usuarios(id)
);

-- =====================================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- =====================================================

-- Índices para consultas frequentes
CREATE INDEX IX_usuarios_email ON usuarios(email);
CREATE INDEX IX_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX IX_sessoes_data ON sessoes(data_sessao);
CREATE INDEX IX_sessoes_paciente ON sessoes(paciente_id);
CREATE INDEX IX_sessoes_terapeuta ON sessoes(terapeuta_id);
CREATE INDEX IX_mensagens_conversa ON mensagens(remetente_id, destinatario_id);
CREATE INDEX IX_avaliacoes_terapeuta ON avaliacoes(terapeuta_id);
CREATE INDEX IX_artigos_publicado ON artigos(publicado, data_publicacao);

-- =====================================================
-- TRIGGERS PARA AUDITORIA E AUTOMAÇÃO
-- =====================================================

GO
-- Trigger para atualizar data_atualizacao em usuarios
CREATE TRIGGER tr_usuarios_update
ON usuarios
AFTER UPDATE
AS
BEGIN
    UPDATE usuarios 
    SET data_atualizacao = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;

GO
-- Trigger para atualizar data_atualizacao em artigos
CREATE TRIGGER tr_artigos_update
ON artigos
AFTER UPDATE
AS
BEGIN
    UPDATE artigos 
    SET data_atualizacao = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

GO
-- View para listar terapeutas com suas informações completas
CREATE VIEW vw_terapeutas_completo AS
SELECT 
    u.id,
    u.nome,
    u.email,
    u.foto_perfil,
    u.bio,
    t.especialidades,
    t.valor_sessao,
    t.anos_experiencia,
    t.formacao,
    t.abordagem_terapeutica,
    t.disponivel,
    AVG(CAST(a.nota AS FLOAT)) as media_avaliacoes,
    COUNT(a.id) as total_avaliacoes
FROM usuarios u
INNER JOIN terapeutas t ON u.id = t.usuario_id
LEFT JOIN avaliacoes a ON u.id = a.terapeuta_id
WHERE u.tipo_usuario = 'terapeuta' AND u.ativo = 1
GROUP BY u.id, u.nome, u.email, u.foto_perfil, u.bio, 
         t.especialidades, t.valor_sessao, t.anos_experiencia, 
         t.formacao, t.abordagem_terapeutica, t.disponivel;

GO
-- View para histórico de sessões
CREATE VIEW vw_historico_sessoes AS
SELECT 
    s.id,
    s.data_sessao,
    s.duracao_minutos,
    s.status_sessao,
    s.valor,
    p.nome as paciente_nome,
    t.nome as terapeuta_nome,
    pag.status_pagamento
FROM sessoes s
INNER JOIN usuarios p ON s.paciente_id = p.id
INNER JOIN usuarios t ON s.terapeuta_id = t.id
LEFT JOIN pagamentos pag ON s.id = pag.sessao_id;

GO
-- =====================================================
-- DADOS INICIAIS (SEEDS)
-- =====================================================

-- Inserir tags padrão
INSERT INTO tags (nome, cor) VALUES 
('Ansiedade', '#dc3545'),
('Depressão', '#6f42c1'),
('Relacionamentos', '#e83e8c'),
('Autoestima', '#fd7e14'),
('Estresse', '#ffc107'),
('Terapia Cognitiva', '#20c997'),
('Mindfulness', '#17a2b8'),
('Psicologia Positiva', '#28a745');

-- =====================================================
-- COMENTÁRIOS FINAIS
-- =====================================================

/*
ESTRUTURA DO BANCO:
- 11 tabelas principais
- Relacionamentos bem definidos com chaves estrangeiras
- Índices para otimização de consultas
- Triggers para auditoria automática
- Views para consultas complexas frequentes
- Constraints para garantir integridade dos dados
- Suporte completo para todas as funcionalidades solicitadas

FUNCIONALIDADES SUPORTADAS:
✓ Gestão de usuários (pacientes e terapeutas)
✓ Agendamento e controle de sessões
✓ Sistema de avaliações e comentários
✓ Controle de pagamentos
✓ Blog com artigos e tags
✓ Sistema de mensagens
✓ Horários disponíveis dos terapeutas
*/