const Stock = require('../models/stock');
const { getStockData } = require('../services/stockService');

exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addStock = async (req, res) => {
  const { symbol } = req.body;
  try {
    const stockData = await getStockData(symbol);

    if (!stockData) return res.status(404).json({ msg: 'Stock not found' });

    const stock = new Stock({
      symbol: symbol,
      companyName: stockData['Meta Data']['2. Symbol'],
      price: stockData['Time Series (5min)'] ? stockData['Time Series (5min)'][Object.keys(stockData['Time Series (5min)'])[0]]['1. open'] : 0
    });

    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateStock = async (req, res) => {
  const { id } = req.params;
  const { symbol, companyName, price } = req.body;
  try {
    const stock = await Stock.findByIdAndUpdate(id, { symbol, companyName, price }, { new: true });
    res.json(stock);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
