const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res) => {
  const { userId, stockId, quantity, type } = req.body;
  try {
    const transaction = new Transaction({ userId, stockId, quantity, type });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId').populate('stockId');
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
