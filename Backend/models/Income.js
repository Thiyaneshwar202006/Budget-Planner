const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: ["Necessary", "Luxury", "Investment"] },
  isRecurring: { type: Boolean, default: false },
  date: { type: String, required: true },
});

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalIncome: { type: Number, required: true, min: 0, default: 0 },
  date: { 
    type: String, 
    required: true, 
    match: [/^\d{4}-\d{2}$/, "Date must be in YYYY-MM format"] 
  },
  remainingAmount: { type: Number, required: true, default: 0 },
  expenses: [expenseSchema],
  totalExpenses: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

incomeSchema.pre("save", function (next) {
  this.totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  this.remainingAmount = this.totalIncome - this.totalExpenses;
  next();
});

module.exports = mongoose.model("Income", incomeSchema);