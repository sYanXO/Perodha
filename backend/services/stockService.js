const axios = require('axios');

const API_KEY = process.env.STOCK_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query'; 

const getStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '5min',
        apikey: API_KEY
      }
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching stock data:', err);
    throw err;
  }
};

module.exports = { getStockData };
