const express = require('express');
const router = express.Router();
const { getStocks, addStock, updateStock } = require('../controllers/stockController');

router.get('/', getStocks);
router.post('/', addStock);
router.put('/:id', updateStock);

module.exports = router;
