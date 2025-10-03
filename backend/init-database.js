const { connectDB, sql } = require('./db');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
    try {
        console.log('Conectando ao SQL Server...');
        await connectDB();
        
        console.log('Lendo schema SQL...');
        const schemaPath = path.join(__dirname, '..', 'SQL Cedro', 'schema_completo.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Dividir o schema em comandos individuais
        const commands = schema.split('GO').filter(cmd => cmd.trim());
        
        console.log('Executando comandos SQL...');
        for (const command of commands) {
            if (command.trim()) {
                try {
                    await sql.query(command);
                } catch (err) {
                    console.log('Comando ignorado (pode ser normal):', err.message);
                }
            }
        }
        
        console.log('Banco de dados inicializado com sucesso!');
        process.exit(0);
    } catch (err) {
        console.error('Erro ao inicializar banco:', err);
        process.exit(1);
    }
}

initDatabase();