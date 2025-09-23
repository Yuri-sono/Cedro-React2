require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const { connectDB } = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// Teste de rota
app.get('/', (req, res) => {
  res.send('API Cedro rodando!');
});

// Exemplo: Listar usuários
app.get('/api/usuarios', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Usuario');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exemplo: Criar usuário
app.post('/api/usuarios', async (req, res) => {
  const { nome, email, senha, tipo_usuario } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO Usuario (nome, email, senha, tipo_usuario)
      VALUES (${nome}, ${email}, ${senha}, ${tipo_usuario});
      SELECT SCOPE_IDENTITY() AS id_usuario;`;
    res.status(201).json({ id_usuario: result.recordset[0].id_usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Conectar ao banco ao iniciar o servidor
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Cedro rodando na porta ${PORT}`));
