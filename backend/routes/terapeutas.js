const express = require('express');
const { getDB, sql } = require('../db');
const { mockPsicologos } = require('../mock-psicologos');
const router = express.Router();

// Listar terapeutas disponíveis (reais + fictícios)
router.get('/', async (req, res) => {
    try {
        let terapeutas = [];
        
        // Tentar buscar dados reais do banco
        try {
            const pool = getDB();
            const result = await pool.request().query(`
                SELECT id, nome, especialidade, preco_sessao as preco, avaliacao, foto_url as foto, bio
                FROM usuarios 
                WHERE tipo_usuario = 'terapeuta' AND ativo = 1
            `);
            terapeutas = result.recordset || [];
        } catch (dbError) {
            console.log('Tabela usuarios não existe ou sem dados, usando fictícios');
        }
        
        // Adicionar psicólogos fictícios
        const todosTerapeutas = [...terapeutas, ...mockPsicologos];
        
        res.json(todosTerapeutas);
    } catch (error) {
        console.error('Erro ao buscar terapeutas:', error);
        // Em caso de erro, retornar apenas os fictícios
        res.json(mockPsicologos);
    }
});

// Buscar terapeuta por ID (real ou fictício)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verificar se é um ID fictício
        if (id.startsWith('mock_')) {
            const mockTerapeuta = mockPsicologos.find(p => p.id === id);
            if (mockTerapeuta) {
                return res.json(mockTerapeuta);
            }
        }
        
        // Buscar no banco de dados real
        const pool = getDB();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT id, nome, especialidade, preco_sessao as preco, avaliacao, foto_url as foto, bio
                FROM usuarios 
                WHERE id = @id AND tipo_usuario = 'terapeuta' AND ativo = 1
            `);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Terapeuta não encontrado' });
        }
        
        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Erro ao buscar terapeuta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;