const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB, sql } = require('../db');
const router = express.Router();

// Cadastro
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, data_nascimento, genero, telefone, tipo_usuario = 'paciente' } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }
        
        const hashedPassword = await bcrypt.hash(senha, 10);
        
        const result = await sql.query`
            INSERT INTO usuarios (nome, email, senha_hash, data_nascimento, genero, telefone, tipo_usuario, ativo)
            VALUES (${nome}, ${email}, ${hashedPassword}, ${data_nascimento}, ${genero}, ${telefone}, ${tipo_usuario}, 1)
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

// Atualizar perfil
router.put('/perfil', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token requerido' });
        }
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado', expired: true });
            }
            return res.status(401).json({ error: 'Token inválido' });
        }
        
        const { nome, telefone, data_nascimento, genero, endereco, bio } = req.body;
        
        console.log('Dados recebidos:', { nome, telefone, data_nascimento, genero, endereco, bio });
        console.log('User ID:', decoded.id);
        
        const result = await sql.query`
            UPDATE usuarios 
            SET nome = ${nome || null}, 
                telefone = ${telefone || null}, 
                data_nascimento = ${data_nascimento || null}, 
                genero = ${genero || null}, 
                endereco = ${endereco || null}, 
                bio = ${bio || null}
            WHERE id = ${decoded.id}
        `;
        
        console.log('Linhas afetadas:', result.rowsAffected);
        res.json({ message: 'Perfil atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro detalhado ao atualizar perfil:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Alterar senha
router.put('/alterar-senha', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token requerido' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { senhaAtual, novaSenha } = req.body;
        
        const result = await sql.query`
            SELECT senha_hash FROM usuarios WHERE id = ${decoded.id}
        `;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        const senhaValida = await bcrypt.compare(senhaAtual, result.recordset[0].senha_hash);
        if (!senhaValida) {
            return res.status(400).json({ error: 'Senha atual incorreta' });
        }
        
        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
        
        await sql.query`
            UPDATE usuarios SET senha_hash = ${novaSenhaHash} WHERE id = ${decoded.id}
        `;
        
        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
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