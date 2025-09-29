const express = require('express');
const router = express.Router();

// Agendar sessão
router.post('/', (req, res) => {
    try {
        const { paciente_id, terapeuta_id, data_sessao, valor } = req.body;
        
        // Simular agendamento
        console.log('Sessão agendada:', { paciente_id, terapeuta_id, data_sessao, valor });
        
        res.status(201).json({ message: 'Sessão agendada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar sessões do usuário
router.get('/usuario/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // Retornar sessões mock
        const sessoesMock = [
            {
                id: 1,
                data_sessao: new Date().toISOString(),
                status_sessao: 'agendada',
                valor: 150.00,
                paciente_nome: 'João Silva',
                terapeuta_nome: 'Dr. Ana Silva'
            }
        ];
        
        res.json(sessoesMock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;