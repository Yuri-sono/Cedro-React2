-- Criação do banco de dados
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'CEDRO')
BEGIN
    CREATE DATABASE CEDRO;
END
GO

USE CEDRO;
GO

CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(45) NOT NULL UNIQUE, -- O email deve ser único
    senha NVARCHAR(255) NOT NULL,
    tipo_usuario NVARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('paciente', 'psicologo', 'admin')),
    data_cadastro DATETIME2 DEFAULT SYSDATETIME()
);

CREATE TABLE Psicologo (
    id_psicologo INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    crp NVARCHAR(20) NOT NULL UNIQUE,
    especialidade NVARCHAR(100),
    bio NVARCHAR(MAX),
    CONSTRAINT FK_Psicologo_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Paciente (
    id_paciente INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    data_nascimento DATE,
    telefone NVARCHAR(20),
    CONSTRAINT FK_Paciente_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Sessao (
    id_sessao INT PRIMARY KEY IDENTITY(1,1),
    id_psicologo INT NOT NULL,
    id_paciente INT NOT NULL,
    data_hora DATETIME2 NOT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'agendada' CHECK (status IN ('agendada', 'realizada', 'cancelada')),
    observacoes NVARCHAR(MAX),
    CONSTRAINT FK_Sessao_Psicologo FOREIGN KEY (id_psicologo) REFERENCES Psicologo(id_psicologo),
    CONSTRAINT FK_Sessao_Paciente FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
);

CREATE TABLE Agendamento (
    id_agendamento INT PRIMARY KEY IDENTITY(1,1),
    id_psicologo INT NOT NULL,
    id_paciente INT NOT NULL,
    data_hora DATETIME2 NOT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado')),
    CONSTRAINT FK_Agendamento_Psicologo FOREIGN KEY (id_psicologo) REFERENCES Psicologo(id_psicologo),
    CONSTRAINT FK_Agendamento_Paciente FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
);

CREATE TABLE Mensagem (
    id_mensagem INT PRIMARY KEY IDENTITY(1,1),
    id_remetente INT NOT NULL,
    id_destinatario INT NOT NULL,
    conteudo NVARCHAR(MAX) NOT NULL,
    data_envio DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT FK_Mensagem_Remetente FOREIGN KEY (id_remetente) REFERENCES Usuario(id_usuario),
    CONSTRAINT FK_Mensagem_Destinatario FOREIGN KEY (id_destinatario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Pagamento (
    id_pagamento INT PRIMARY KEY IDENTITY(1,1),
    id_paciente INT NOT NULL,
    id_psicologo INT NOT NULL,
    id_sessao INT,
    valor DECIMAL(10,2) NOT NULL,
    data_pagamento DATETIME2 NOT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'cancelado')),
    metodo_pagamento NVARCHAR(50),
    CONSTRAINT FK_Pagamento_Paciente FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    CONSTRAINT FK_Pagamento_Psicologo FOREIGN KEY (id_psicologo) REFERENCES Psicologo(id_psicologo),
    CONSTRAINT FK_Pagamento_Sessao FOREIGN KEY (id_sessao) REFERENCES Sessao(id_sessao)
);

CREATE TABLE Avaliacao (
    id_avaliacao INT PRIMARY KEY IDENTITY(1,1),
    id_sessao INT NOT NULL,
    id_paciente INT NOT NULL,
    id_psicologo INT NOT NULL,
    nota INT CHECK (nota >= 1 AND nota <= 5),
    comentario NVARCHAR(MAX),
    data_avaliacao DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT FK_Avaliacao_Sessao FOREIGN KEY (id_sessao) REFERENCES Sessao(id_sessao),
    CONSTRAINT FK_Avaliacao_Paciente FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    CONSTRAINT FK_Avaliacao_Psicologo FOREIGN KEY (id_psicologo) REFERENCES Psicologo(id_psicologo)
);

-- TABELAS DE SEGURANÇA

CREATE TABLE AccessLog (
    id_log INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    acao NVARCHAR(100) NOT NULL,
    ip_address NVARCHAR(45),
    user_agent NVARCHAR(255),
    data_hora DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT FK_AccessLog_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE LoginAttempt (
    id_attempt INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    email NVARCHAR(45),
    sucesso BIT NOT NULL,
    ip_address NVARCHAR(45),
    data_hora DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT FK_LoginAttempt_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE UserSession (
    id_session INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    token NVARCHAR(255) NOT NULL UNIQUE,
    data_criacao DATETIME2 DEFAULT SYSDATETIME(),
    data_expiracao DATETIME2,
    ip_address NVARCHAR(45),
    user_agent NVARCHAR(255),
    ativo BIT DEFAULT 1,
    CONSTRAINT FK_UserSession_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);


