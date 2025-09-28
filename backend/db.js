const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'cedro.db');
let db;

function connectDB() {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Erro ao conectar ao SQLite:', err);
                reject(err);
            } else {
                console.log('Conectado ao banco SQLite!');
                createTables();
                resolve();
            }
        });
    });
}

function createTables() {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha_hash TEXT NOT NULL,
            tipo_usuario TEXT DEFAULT 'paciente',
            data_nascimento DATE,
            genero TEXT,
            telefone TEXT,
            endereco TEXT,
            bio TEXT,
            ativo INTEGER DEFAULT 1,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    db.run(createUsersTable, (err) => {
        if (err) {
            console.error('Erro ao criar tabela usuarios:', err);
        } else {
            console.log('Tabela usuarios criada!');
            // Adicionar colunas se não existirem
            db.run('ALTER TABLE usuarios ADD COLUMN endereco TEXT', () => {});
            db.run('ALTER TABLE usuarios ADD COLUMN bio TEXT', () => {});
        }
    });
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };