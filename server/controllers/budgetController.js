const Budget = require("../models/Budget");

// GET /api/budgets?month=YYYY-MM
const getBudgets = async (req, res) => {
  const { month } = req.query;
  const filter = { user: req.user._id };
  if (month) filter.month = month;

  const budgets = await Budget.find(filter);
  res.json(budgets);
};

// POST /api/budgets  (upsert: one per category+month)
const upsertBudget = async (req, res) => {
  const { category, limit, month } = req.body;

  if (!category || !limit || !month)
    return res.status(400).json({ message: "category, limit, and month are required" });

  const budget = await Budget.findOneAndUpdate(
    { user: req.user._id, category, month },
    { limit },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(200).json(budget);
};

// DELETE /api/budgets/:id
const deleteBudget = async (req, res) => {
  const budget = await Budget.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!budget) return res.status(404).json({ message: "Budget not found" });
  res.json({ message: "Budget removed" });
};

module.exports = { getBudgets, upsertBudget, deleteBudget };