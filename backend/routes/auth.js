const express = require('express');
const router = express.Router();

// Cadastro
router.post('/register', (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }
        
        console.log('Cadastro simulado:', { nome, email });
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Login
router.post('/login', (req, res) => {
    try {
        const { email, senha } = req.body;
        
        console.log('Login simulado:', { email });
        
        // Simular login
        res.json({
            token: 'mock_token_123',
            usuario: {
                id: 1,
                nome: 'Usuário Teste',
                email: email,
                tipo_usuario: 'paciente'
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;