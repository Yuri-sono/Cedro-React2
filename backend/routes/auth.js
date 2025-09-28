const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../db');
const router = express.Router();

// Middleware para verificar token
const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cedro_secret');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

// Cadastro
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario, data_nascimento, genero, telefone } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }
        
        if (senha.length < 4) {
            return res.status(400).json({ error: 'Senha deve ter pelo menos 4 caracteres' });
        }
        
        const db = getDB();
        
        // Verificar se email existe
        const existingUser = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM usuarios WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        const senha_hash = await bcrypt.hash(senha, 10);
        
        // Inserir usuário
        await new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, data_nascimento, genero, telefone, ativo)
                VALUES (?, ?, ?, ?, ?, ?, ?, 1)
            `, [nome, email, senha_hash, tipo_usuario || 'paciente', data_nascimento, genero, telefone], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
        
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        const db = getDB();
        
        const usuario = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM usuarios WHERE email = ? AND ativo = 1', [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
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
                tipo_usuario: usuario.tipo_usuario,
                data_nascimento: usuario.data_nascimento,
                genero: usuario.genero,
                telefone: usuario.telefone,
                endereco: usuario.endereco,
                bio: usuario.bio
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Atualizar perfil
router.put('/perfil', verificarToken, async (req, res) => {
    try {
        const { nome, telefone, data_nascimento, genero, endereco, bio } = req.body;
        const userId = req.usuario.id;
        
        const db = getDB();
        
        await new Promise((resolve, reject) => {
            db.run(`
                UPDATE usuarios 
                SET nome = ?, telefone = ?, data_nascimento = ?, genero = ?, endereco = ?, bio = ?
                WHERE id = ?
            `, [nome, telefone, data_nascimento, genero, endereco, bio, userId], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
        
        res.json({ message: 'Perfil atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Alterar senha
router.put('/alterar-senha', verificarToken, async (req, res) => {
    try {
        const { senhaAtual, novaSenha } = req.body;
        const userId = req.usuario.id;
        
        const db = getDB();
        
        // Buscar senha atual do usuário
        const usuario = await new Promise((resolve, reject) => {
            db.get('SELECT senha_hash FROM usuarios WHERE id = ?', [userId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        // Verificar senha atual
        const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha_hash);
        
        if (!senhaValida) {
            return res.status(400).json({ error: 'Senha atual incorreta' });
        }
        
        // Hash da nova senha
        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
        
        // Atualizar senha
        await new Promise((resolve, reject) => {
            db.run('UPDATE usuarios SET senha_hash = ? WHERE id = ?', [novaSenhaHash, userId], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
        
        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;