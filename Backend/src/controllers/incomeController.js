const Income = require("../models/Income");

const getIncomeByDate = async (req, res) => {
  const { date } = req.params;
  if (!/^\d{4}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: "Invalid date format (use YYYY-MM)" });
  }
  try {
    const record = await Income.findOne({ date, userId: req.userId });
    if (!record) {
      return res.status(404).json({ 
        message: "No record found", 
        totalIncome: 0, 
        expenses: [], 
        totalExpenses: 0, 
        remainingAmount: 0 
      });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching record", error: error.message });
  }
};

const createOrUpdateIncome = async (req, res) => {
  const { date } = req.params;
  const { totalIncome } = req.body;
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }
  if (typeof totalIncome !== "number" || totalIncome < 0) {
    return res.status(400).json({ message: "Total income must be a non-negative number" });
  }
  if (!/^\d{4}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: "Invalid date format (use YYYY-MM)" });
  }
  try {
    let record = await Income.findOne({ date, userId: req.userId });
    if (record) {
      record.totalIncome = totalIncome;
      await record.save();
      return res.json(record);
    }
    record = new Income({
      userId: req.userId,
      totalIncome: totalIncome || 0,
      date,
      remainingAmount: totalIncome || 0,
      expenses: [],
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error saving record", error: error.message });
  }
};

const addExpense = async (req, res) => {
  const { date } = req.params;
  const { id, source, amount, category, isRecurring } = req.body;
  if (!/^\d{4}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: "Invalid date format (use YYYY-MM)" });
  }
  if (!id || !source || !amount || !category) {
    return res.status(400).json({ message: "All expense fields are required" });
  }
  try {
    let record = await Income.findOne({ date, userId: req.userId });
    if (!record) {
      record = new Income({
        userId: req.userId,
        totalIncome: 0,
        date,
        remainingAmount: 0,
        expenses: [],
      });
    }
    const newExpense = { id, source, amount, category, isRecurring, date };
    record.expenses.push(newExpense);
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { date, id } = req.params;
  if (!/^\d{4}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: "Invalid date format (use YYYY-MM)" });
  }
  try {
    const record = await Income.findOne({ date, userId: req.userId });
    if (!record) return res.status(404).json({ message: "Record not found" });
    record.expenses = record.expenses.filter(exp => exp.id !== id);
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
};

const deleteIncome = async (req, res) => {
  const { date } = req.params;
  if (!/^\d{4}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: "Invalid date format (use YYYY-MM)" });
  }
  try {
    await Income.deleteOne({ date, userId: req.userId });
    res.json({ message: "Record deleted", totalIncome: 0, expenses: [], totalExpenses: 0, remainingAmount: 0 });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error: error.message });
  }
};

module.exports = { getIncomeByDate, createOrUpdateIncome, addExpense, deleteExpense, deleteIncome };
