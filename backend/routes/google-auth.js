const express = require('express');
const jwt = require('jsonwebtoken');
const { sql } = require('../db');
const router = express.Router();

router.post('/google', async (req, res) => {
    try {
        const { email, nome, foto_url } = req.body;
        
        if (!email || !nome) {
            return res.status(400).json({ error: 'Dados incompletos' });
        }

        let result = await sql.query`
            SELECT id, nome, email, tipo_usuario 
            FROM usuarios 
            WHERE email = ${email} AND ativo = 1
        `;

        let usuario;
        
        if (result.recordset.length === 0) {
            await sql.query`
                INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, foto_url, ativo)
                VALUES (${nome}, ${email}, 'google_oauth', 'paciente', ${foto_url}, 1)
            `;
            
            result = await sql.query`
                SELECT id, nome, email, tipo_usuario 
                FROM usuarios 
                WHERE email = ${email}
            `;
        }
        
        usuario = result.recordset[0];
        
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
        console.error('Erro no login Google:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
