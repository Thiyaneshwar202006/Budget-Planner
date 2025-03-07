const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  // Reference to the associated user
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // For convenience, we also store the username
  username: { type: String, required: true },
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  remaining: { type: Number, default: 0 },
  investment: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
