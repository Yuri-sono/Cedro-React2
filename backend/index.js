require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const authRoutes = require('./routes/auth');
const terapeutasRoutes = require('./routes/terapeutas');
const sessoesRoutes = require('./routes/sessoes');

const app = express();
app.use(express.json());
app.use(cors());

// Teste de rota
app.get('/', (req, res) => {
  res.send('API Cedro rodando!');
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/terapeutas', terapeutasRoutes);
app.use('/api/sessoes', sessoesRoutes);

// Conectar ao banco ao iniciar o servidor
connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API Cedro rodando na porta ${PORT}`));
