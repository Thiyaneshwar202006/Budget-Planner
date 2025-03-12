const express = require("express");
const router = express.Router();
const { getIncomeByDate, createOrUpdateIncome, addExpense, deleteExpense, deleteIncome } = require("../controllers/incomeController");
const LoginMiddleware = require("../middleware/LoginMiddleware");

router.get("/:date", LoginMiddleware, getIncomeByDate);
router.post("/:date", LoginMiddleware, createOrUpdateIncome);
router.post("/:date/expense", LoginMiddleware, addExpense);
router.delete("/:date/expense/:id", LoginMiddleware, deleteExpense);
router.delete("/:date", LoginMiddleware, deleteIncome);

module.exports = router;