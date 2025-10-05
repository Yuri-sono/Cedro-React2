-- Script de criação do banco CEDRO
-- Limpa banco existente e recria estrutura completa

-- Criar banco se não existir
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'CEDRO_banco')
BEGIN
    CREATE DATABASE CEDRO_banco;
END
GO

USE CEDRO_banco;
GO

-- Remover todas as constraints primeiro
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql = @sql + 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id)) + '.' + QUOTENAME(OBJECT_NAME(parent_object_id)) + ' DROP CONSTRAINT ' + QUOTENAME(name) + ';' + CHAR(13)
FROM sys.foreign_keys;
EXEC sp_executesql @sql;
GO

-- Remover tabelas na ordem correta
IF OBJECT_ID('horarios_disponiveis', 'U') IS NOT NULL DROP TABLE horarios_disponiveis;
IF OBJECT_ID('conversas', 'U') IS NOT NULL DROP TABLE conversas;
IF OBJECT_ID('mensagens', 'U') IS NOT NULL DROP TABLE mensagens;
IF OBJECT_ID('artigo_tags', 'U') IS NOT NULL DROP TABLE artigo_tags;
IF OBJECT_ID('tags', 'U') IS NOT NULL DROP TABLE tags;
IF OBJECT_ID('artigos', 'U') IS NOT NULL DROP TABLE artigos;
IF OBJECT_ID('pagamentos', 'U') IS NOT NULL DROP TABLE pagamentos;
IF OBJECT_ID('avaliacoes', 'U') IS NOT NULL DROP TABLE avaliacoes;
IF OBJECT_ID('sessoes', 'U') IS NOT NULL DROP TABLE sessoes;
IF OBJECT_ID('terapeutas', 'U') IS NOT NULL DROP TABLE terapeutas;
IF OBJECT_ID('usuarios', 'U') IS NOT NULL DROP TABLE usuarios;
GO

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    senha_hash NVARCHAR(255) NOT NULL,
    data_nascimento DATE NULL,
    genero NVARCHAR(20) NULL,
    telefone NVARCHAR(20) NULL,
    endereco NVARCHAR(200) NULL,
    bio NVARCHAR(500) NULL,
    foto_perfil NVARCHAR(255) NULL,
    tipo_usuario NVARCHAR(10) NOT NULL,
    ativo BIT NOT NULL DEFAULT 1,
    data_criacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    data_atualizacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT CK_genero CHECK (genero IN ('masculino', 'feminino', 'outro', 'nao-informar')),
    CONSTRAINT CK_tipo_usuario CHECK (tipo_usuario IN ('paciente', 'terapeuta'))
);
GO

-- Tabela de Terapeutas
CREATE TABLE terapeutas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    numero_licenca NVARCHAR(50) NOT NULL UNIQUE,
    especialidades NVARCHAR(300) NULL,
    valor_sessao DECIMAL(10,2) NOT NULL,
    anos_experiencia INT NULL,
    formacao NVARCHAR(300) NULL,
    abordagem_terapeutica NVARCHAR(200) NULL,
    disponivel BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_terapeuta_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
GO

-- Tabela de Sessões
CREATE TABLE sessoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    paciente_id INT NOT NULL,
    terapeuta_id INT NOT NULL,
    data_sessao DATETIME2 NOT NULL,
    duracao_minutos INT NOT NULL DEFAULT 50,
    status_sessao NVARCHAR(20) NOT NULL DEFAULT 'agendada',
    observacoes NVARCHAR(500) NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_criacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_sessoes_paciente FOREIGN KEY (paciente_id) REFERENCES usuarios(id),
    CONSTRAINT FK_sessoes_terapeuta FOREIGN KEY (terapeuta_id) REFERENCES usuarios(id),
    CONSTRAINT CK_status_sessao CHECK (status_sessao IN ('agendada', 'confirmada', 'cancelada', 'concluida'))
);
GO

-- Tabela de Avaliações
CREATE TABLE avaliacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    paciente_id INT NOT NULL,
    terapeuta_id INT NOT NULL,
    sessao_id INT NULL,
    nota INT NOT NULL,
    comentario NVARCHAR(1000) NULL,
    data_avaliacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_avaliacoes_paciente FOREIGN KEY (paciente_id) REFERENCES usuarios(id),
    CONSTRAINT FK_avaliacoes_terapeuta FOREIGN KEY (terapeuta_id) REFERENCES usuarios(id),
    CONSTRAINT FK_avaliacoes_sessao FOREIGN KEY (sessao_id) REFERENCES sessoes(id),
    CONSTRAINT CK_nota CHECK (nota BETWEEN 1 AND 5)
);
GO

-- Tabela de Pagamentos
CREATE TABLE pagamentos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    sessao_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    metodo_pagamento NVARCHAR(30) NOT NULL,
    status_pagamento NVARCHAR(20) NOT NULL DEFAULT 'pendente',
    id_transacao_externa NVARCHAR(100) NULL,
    data_pagamento DATETIME2 NULL,
    data_criacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_pagamentos_sessao FOREIGN KEY (sessao_id) REFERENCES sessoes(id),
    CONSTRAINT CK_metodo_pagamento CHECK (metodo_pagamento IN ('cartao_credito', 'cartao_debito', 'pix', 'boleto', 'transferencia')),
    CONSTRAINT CK_status_pagamento CHECK (status_pagamento IN ('pendente', 'processando', 'aprovado', 'rejeitado', 'estornado'))
);
GO

-- Tabela de Artigos
CREATE TABLE artigos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    conteudo NTEXT NOT NULL,
    autor_id INT NOT NULL,
    resumo NVARCHAR(300) NULL,
    imagem_capa NVARCHAR(255) NULL,
    publicado BIT NOT NULL DEFAULT 0,
    data_publicacao DATETIME2 NULL,
    data_criacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    data_atualizacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    visualizacoes INT NOT NULL DEFAULT 0,
    CONSTRAINT FK_artigos_autor FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);
GO

-- Tabela de Tags
CREATE TABLE tags (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL UNIQUE,
    cor NVARCHAR(7) NOT NULL DEFAULT '#007bff'
);
GO

-- Tabela de relacionamento Artigos-Tags
CREATE TABLE artigo_tags (
    artigo_id INT NOT NULL,
    tag_id INT NOT NULL,
    CONSTRAINT PK_artigo_tags PRIMARY KEY (artigo_id, tag_id),
    CONSTRAINT FK_artigo_tags_artigo FOREIGN KEY (artigo_id) REFERENCES artigos(id) ON DELETE CASCADE,
    CONSTRAINT FK_artigo_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
GO

-- Tabela de Mensagens
CREATE TABLE mensagens (
    id INT IDENTITY(1,1) PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    conteudo NVARCHAR(2000) NOT NULL,
    lida BIT NOT NULL DEFAULT 0,
    data_envio DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_mensagens_remetente FOREIGN KEY (remetente_id) REFERENCES usuarios(id),
    CONSTRAINT FK_mensagens_destinatario FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
);
GO

-- Tabela de Conversas
CREATE TABLE conversas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario1_id INT NOT NULL,
    usuario2_id INT NOT NULL,
    ultima_mensagem_id INT NULL,
    data_criacao DATETIME2 NOT NULL DEFAULT GETDATE(),
    data_ultima_atividade DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_conversas_usuario1 FOREIGN KEY (usuario1_id) REFERENCES usuarios(id),
    CONSTRAINT FK_conversas_usuario2 FOREIGN KEY (usuario2_id) REFERENCES usuarios(id),
    CONSTRAINT FK_conversas_mensagem FOREIGN KEY (ultima_mensagem_id) REFERENCES mensagens(id),
    CONSTRAINT UQ_conversa_usuarios UNIQUE (usuario1_id, usuario2_id)
);
GO

-- Tabela de Horários Disponíveis
CREATE TABLE horarios_disponiveis (
    id INT IDENTITY(1,1) PRIMARY KEY,
    terapeuta_id INT NOT NULL,
    dia_semana INT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    ativo BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_horarios_terapeuta FOREIGN KEY (terapeuta_id) REFERENCES usuarios(id),
    CONSTRAINT CK_dia_semana CHECK (dia_semana BETWEEN 0 AND 6)
);
GO

-- Índices para performance
CREATE INDEX IX_usuarios_email ON usuarios(email);
CREATE INDEX IX_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX IX_sessoes_data ON sessoes(data_sessao);
CREATE INDEX IX_sessoes_paciente ON sessoes(paciente_id);
CREATE INDEX IX_sessoes_terapeuta ON sessoes(terapeuta_id);
CREATE INDEX IX_mensagens_conversa ON mensagens(remetente_id, destinatario_id);
CREATE INDEX IX_avaliacoes_terapeuta ON avaliacoes(terapeuta_id);
CREATE INDEX IX_artigos_publicado ON artigos(publicado, data_publicacao);
GO

