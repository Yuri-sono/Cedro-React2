const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sql } = require('../db');
const router = express.Router();

// Cadastro
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario, data_nascimento, genero, telefone } = req.body;
        
        // Hash da senha
        const senha_hash = await bcrypt.hash(senha, 10);
        
        const request = new sql.Request();
        await request
            .input('nome', sql.NVarChar, nome)
            .input('email', sql.NVarChar, email)
            .input('senha_hash', sql.NVarChar, senha_hash)
            .input('tipo_usuario', sql.NVarChar, tipo_usuario)
            .input('data_nascimento', sql.Date, data_nascimento)
            .input('genero', sql.NVarChar, genero)
            .input('telefone', sql.NVarChar, telefone)
            .query(`
                INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, data_nascimento, genero, telefone)
                VALUES (@nome, @email, @senha_hash, @tipo_usuario, @data_nascimento, @genero, @telefone)
            `);
        
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        const request = new sql.Request();
        const result = await request
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM usuarios WHERE email = @email AND ativo = 1');
        
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
            process.env.JWT_SECRET || 'cedro_secret',
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
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;