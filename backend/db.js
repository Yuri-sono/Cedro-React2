// Conexão com SQL Server usando mssql e variáveis do .env
require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: false, // true para Azure
        trustServerCertificate: true // necessário para dev/local
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Conectado ao banco de dados SQL Server!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

module.exports = { sql, connectDB };
