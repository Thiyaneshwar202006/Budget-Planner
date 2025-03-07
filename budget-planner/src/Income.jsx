import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Income.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Expense = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseSource, setExpenseSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Necessary");
  const [isRecurring, setIsRecurring] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const addExpense = (e) => {
    e.preventDefault();
    if (!income || parseFloat(income) <= 0) {
      alert("Please add income before adding expenses.");
      return;
    }
    const newExpense = {
      id: Date.now(),
      date,
      source: expenseSource,
      amount: parseFloat(amount),
      category,
      isRecurring,
    };
    setExpenses([...expenses, newExpense]);
    setExpenseSource("");
    setAmount("");
    setDate("");
    setCategory("Necessary");
    setIsRecurring(false);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBalance = income ? parseFloat(income) - totalExpenses : 0;

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#e74c3c", "#f39c12", "#8e44ad"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: darkMode ? "#ecf0f1" : "#2c3e50" },
      },
    },
  };

  const downloadTableAsPDF = () => {
    const doc = new jsPDF();
    doc.text("Budget Report", 14, 10);
    const table = document.getElementById("income-table");
    const headers = [];
    const data = [];

    table.querySelectorAll("thead th").forEach((header) => {
      headers.push(header.innerText);
    });

    table.querySelectorAll("tbody tr").forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td").forEach((cell) => {
        rowData.push(cell.innerText);
      });
      data.push(rowData);
    });

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20,
    });
    doc.save("expense_report.pdf");
  };

  return (
    <div className={`income-app-container ${darkMode ? "dark" : "light"}`}>
      <div className="income-dashboard-container">
        <div className="income-summary-panel">
          <h2>Budget Overview</h2>
          <input
            type="number"
            placeholder="Enter Total Income"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value) || "")}
            className="income-input"
          />
          <div className="income-summary-stats">
            <h3>Total Income: <span>₹{income ? parseFloat(income).toFixed(2) : "0.00"}</span></h3>
            <h3>Total Expenses: <span>₹{totalExpenses.toFixed(2)}</span></h3>
            <h3>Remaining Balance: <span>₹{remainingBalance.toFixed(2)}</span></h3>
          </div>
          <button
            className="income-toggle-dark-mode"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"} Mode
          </button>
          <h2>Budget Distribution</h2>
          <div className="income-chart-container">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="income-main-content">
          <h1 className="income-header">Expense Manager</h1>
          <form onSubmit={addExpense} className="income-form">
            <div className="income-form-grid">
              <input
                type="text"
                placeholder="Expense Source"
                value={expenseSource}
                onChange={(e) => setExpenseSource(e.target.value)}
                required
                className="income-input"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="income-input"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="income-input"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="income-input income-select"
              >
                <option value="Necessary">Necessary</option>
                <option value="Luxury">Luxury</option>
                <option value="Investment">Investment</option>
              </select>
              <label className="income-checkbox-label">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                />
                <span>Recurring</span>
              </label>
              <button
                type="submit"
                className="income-button income-add-button"
                disabled={!income || parseFloat(income) <= 0}
              >
                Add Expense
              </button>
            </div>
          </form>

          <div className="income-expenseList">
            <h2>Expense History</h2>
            <table id="income-table" className="income-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>% of Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.source}</td>
                    <td>₹{expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>
                      {totalExpenses > 0
                        ? ((expense.amount / totalExpenses) * 100).toFixed(2) + "%"
                        : "0%"}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="income-deleteButton"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadTableAsPDF} className="income-button income-download-button">
              📥 Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;