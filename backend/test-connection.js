require('dotenv').config();
const { connectDB } = require('./db');

async function testConnection() {
    try {
        await connectDB();
        console.log('✅ Conexão com banco funcionando!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro na conexão:', error.message);
        process.exit(1);
    }
}

testConnection();