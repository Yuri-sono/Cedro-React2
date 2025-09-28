const express = require('express');
const { terapeutas } = require('../mock-data');
const router = express.Router();

// Listar terapeutas disponíveis
router.get('/', (req, res) => {
    res.json(terapeutas);
});

// Buscar terapeuta por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const terapeuta = terapeutas.find(t => t.id === parseInt(id));
    if (!terapeuta) {
        return res.status(404).json({ error: 'Terapeuta não encontrado' });
    }
    res.json(terapeuta);
});

module.exports = router;