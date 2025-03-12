require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const LoginRoutes = require("./routes/LoginRoutes");
const incomeRoutes = require("./routes/IncomeRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5174",
  credentials: true,
}));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Budget Planner Backend" });
});
app.use("/api/login", LoginRoutes);
app.use("/api/income", incomeRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

startServer(); 