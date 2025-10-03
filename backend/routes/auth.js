const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB, sql } = require('../db');
const router = express.Router();

// Cadastro
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario = 'paciente' } = req.body;
        
        if (!nome || !email || senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }
        
        const hashedPassword = await bcrypt.hash(senha, 10);
        
        const result = await sql.query`
            INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario)
            VALUES (${nome}, ${email}, ${hashedPassword}, ${tipo_usuario})
        `;
        
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        if (error.number === 2627) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        console.error('Erro no cadastro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        const result = await sql.query`
            SELECT id, nome, email, senha_hash, tipo_usuario 
            FROM usuarios 
            WHERE email = ${email} AND ativo = 1
        `;
        
        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const usuario = result.recordset[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        
        if (!senhaValida) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, tipo: usuario.tipo_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;