const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'CEDRO_banco',
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let pool;

async function connectDB() {
    try {
        if (pool) {
            return pool;
        }
        
        pool = await sql.connect(config);
        console.log('✅ Conectado ao SQL Server!');
        
        pool.on('error', err => {
            console.error('❌ Erro no pool de conexão:', err);
        });
        
        return pool;
    } catch (err) {
        console.error('❌ Erro ao conectar ao SQL Server:', err.message);
        pool = null;
        throw err;
    }
}

function getDB() {
    if (!pool) {
        throw new Error('Banco de dados não conectado. Chame connectDB() primeiro.');
    }
    return pool;
}

async function closeDB() {
    if (pool) {
        await pool.close();
        pool = null;
        console.log('Conexão com banco fechada');
    }
}

module.exports = { connectDB, getDB, closeDB, sql };