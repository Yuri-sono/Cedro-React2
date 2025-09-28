const express = require('express');
const { sql } = require('../db');
const router = express.Router();

// Listar terapeutas disponíveis
router.get('/', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query(`
            SELECT u.id, u.nome, u.bio, u.foto_perfil, 
                   t.especialidades, t.valor_sessao, t.anos_experiencia, 
                   t.formacao, t.abordagem_terapeutica
            FROM usuarios u
            INNER JOIN terapeutas t ON u.id = t.usuario_id
            WHERE u.ativo = 1 AND t.disponivel = 1
        `);
        
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar terapeuta por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const request = new sql.Request();
        const result = await request
            .input('id', sql.Int, id)
            .query(`
                SELECT u.id, u.nome, u.bio, u.foto_perfil, u.telefone,
                       t.especialidades, t.valor_sessao, t.anos_experiencia, 
                       t.formacao, t.abordagem_terapeutica, t.numero_licenca
                FROM usuarios u
                INNER JOIN terapeutas t ON u.id = t.usuario_id
                WHERE u.id = @id AND u.ativo = 1
            `);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Terapeuta não encontrado' });
        }
        
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;