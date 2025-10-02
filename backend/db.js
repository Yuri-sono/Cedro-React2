const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'CEDRO_banco',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

async function connectDB() {
    try {
        pool = await sql.connect(config);
        console.log('Conectado ao SQL Server!');
        return pool;
    } catch (err) {
        console.error('Erro ao conectar ao SQL Server:', err);
        throw err;
    }
}

function getDB() {
    return pool;
}

module.exports = { connectDB, getDB, sql };