const Transaction = require("../models/Transaction");

// GET /api/transactions?month=YYYY-MM
const getTransactions = async (req, res) => {
  const { month, type, category } = req.query;
  const filter = { user: req.user._id };

  if (month) {
    // Match all dates that start with "YYYY-MM"
    filter.date = { $regex: `^${month}` };
  }
  if (type) filter.type = type;
  if (category) filter.category = category;

  const transactions = await Transaction.find(filter).sort({ date: -1 });
  res.json(transactions);
};

// POST /api/transactions
const createTransaction = async (req, res) => {
  const { type, amount, category, note, date, recurring, freq } = req.body;

  if (!type || !amount || !category || !date)
    return res.status(400).json({ message: "Required fields missing" });

  const tx = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    category,
    note,
    date,
    recurring,
    freq,
  });

  res.status(201).json(tx);
};

// PUT /api/transactions/:id
const updateTransaction = async (req, res) => {
  const tx = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
  if (!tx) return res.status(404).json({ message: "Transaction not found" });

  Object.assign(tx, req.body);
  const updated = await tx.save();
  res.json(updated);
};

// DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  const tx = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!tx) return res.status(404).json({ message: "Transaction not found" });
  res.json({ message: "Deleted successfully" });
};

// GET /api/transactions/summary?month=YYYY-MM
// Returns totalIncome, totalExpense, net, and expByCat
const getSummary = async (req, res) => {
  const { month } = req.query;
  const filter = { user: req.user._id };
  if (month) filter.date = { $regex: `^${month}` };

  const transactions = await Transaction.find(filter);

  let totalIncome = 0;
  let totalExpense = 0;
  const expByCat = {};

  transactions.forEach((t) => {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
      expByCat[t.category] = (expByCat[t.category] || 0) + t.amount;
    }
  });

  res.json({
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    expByCat,
  });
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
};