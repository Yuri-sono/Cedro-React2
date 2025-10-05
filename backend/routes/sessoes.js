const express = require('express');
const jwt = require('jsonwebtoken');
const { getDB, sql } = require('../db');
const router = express.Router();

// Agendar sessão
router.post('/', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token requerido' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { terapeuta_id, data_sessao, valor } = req.body;
        
        await sql.query`
            INSERT INTO sessoes (paciente_id, terapeuta_id, data_sessao, valor, status_sessao)
            VALUES (${decoded.id}, ${terapeuta_id}, ${data_sessao}, ${valor}, 'agendada')
        `;
        
        res.status(201).json({ message: 'Sessão agendada com sucesso!' });
    } catch (error) {
        console.error('Erro ao agendar sessão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar sessões do usuário
router.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await sql.query`
            SELECT s.*, 
                   p.nome as paciente_nome,
                   t.nome as terapeuta_nome
            FROM sessoes s
            LEFT JOIN usuarios p ON s.paciente_id = p.id
            LEFT JOIN usuarios t ON s.terapeuta_id = t.id
            WHERE s.paciente_id = ${id} OR s.terapeuta_id = ${id}
            ORDER BY s.data_sessao DESC
        `;
        
        res.json(result.recordset);
    } catch (error) {
        console.error('Erro ao buscar sessões:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;