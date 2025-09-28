const express = require('express');
const { sql } = require('../db');
const router = express.Router();

// Agendar sessão
router.post('/', async (req, res) => {
    try {
        const { paciente_id, terapeuta_id, data_sessao, valor } = req.body;
        
        const request = new sql.Request();
        await request
            .input('paciente_id', sql.Int, paciente_id)
            .input('terapeuta_id', sql.Int, terapeuta_id)
            .input('data_sessao', sql.DateTime2, data_sessao)
            .input('valor', sql.Decimal, valor)
            .query(`
                INSERT INTO sessoes (paciente_id, terapeuta_id, data_sessao, valor)
                VALUES (@paciente_id, @terapeuta_id, @data_sessao, @valor)
            `);
        
        res.status(201).json({ message: 'Sessão agendada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar sessões do usuário
router.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const request = new sql.Request();
        const result = await request
            .input('id', sql.Int, id)
            .query(`
                SELECT s.id, s.data_sessao, s.status_sessao, s.valor,
                       up.nome as paciente_nome, ut.nome as terapeuta_nome
                FROM sessoes s
                INNER JOIN usuarios up ON s.paciente_id = up.id
                INNER JOIN usuarios ut ON s.terapeuta_id = ut.id
                WHERE s.paciente_id = @id OR s.terapeuta_id = @id
                ORDER BY s.data_sessao DESC
            `);
        
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;