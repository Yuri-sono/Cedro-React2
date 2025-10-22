-- ============================================
-- Script de Migração: Terapeuta -> Psicólogo
-- Renomeia todas as colunas e atualiza valores
-- ============================================

-- 1. Renomear coluna terapeuta_id para psicologo_id na tabela sessoes
IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('sessoes') AND name = 'terapeuta_id')
BEGIN
    EXEC sp_rename 'sessoes.terapeuta_id', 'psicologo_id', 'COLUMN';
    PRINT 'Coluna terapeuta_id renomeada para psicologo_id na tabela sessoes';
END

-- 2. Renomear coluna terapeuta_id para psicologo_id na tabela avaliacoes
IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('avaliacoes') AND name = 'terapeuta_id')
BEGIN
    EXEC sp_rename 'avaliacoes.terapeuta_id', 'psicologo_id', 'COLUMN';
    PRINT 'Coluna terapeuta_id renomeada para psicologo_id na tabela avaliacoes';
END

-- 3. Renomear coluna terapeuta_id para psicologo_id na tabela grupos_terapia
IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('grupos_terapia') AND name = 'terapeuta_id')
BEGIN
    EXEC sp_rename 'grupos_terapia.terapeuta_id', 'psicologo_id', 'COLUMN';
    PRINT 'Coluna terapeuta_id renomeada para psicologo_id na tabela grupos_terapia';
END

-- 4. Atualizar valores de tipo_usuario de 'terapeuta' para 'psicologo'
UPDATE usuarios 
SET tipo_usuario = 'psicologo' 
WHERE tipo_usuario = 'terapeuta';
PRINT 'Valores de tipo_usuario atualizados de terapeuta para psicologo';

-- 5. Renomear índices
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_sessoes_terapeuta')
BEGIN
    EXEC sp_rename 'sessoes.idx_sessoes_terapeuta', 'idx_sessoes_psicologo', 'INDEX';
    PRINT 'Índice idx_sessoes_terapeuta renomeado para idx_sessoes_psicologo';
END

IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_grupos_terapeuta')
BEGIN
    EXEC sp_rename 'grupos_terapia.idx_grupos_terapeuta', 'idx_grupos_psicologo', 'INDEX';
    PRINT 'Índice idx_grupos_terapeuta renomeado para idx_grupos_psicologo';
END

PRINT '============================================';
PRINT 'Migração concluída com sucesso!';
PRINT 'Todas as referências de terapeuta foram alteradas para psicologo';
PRINT '============================================';
