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

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate remaining balance
  const remainingBalance = income ? parseFloat(income) - totalExpenses : 0;

  // Calculate totals per category for the chart
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
      },
    ],
  };

  const downloadTableAsPDF = () => {
    const doc = new jsPDF();
  
    doc.text("Budget Report", 14, 10); // Title at the top
  
    const table = document.getElementById("table");
    const headers = [];
    const data = [];
  
    // Get table headers
    table.querySelectorAll("thead th").forEach((header) => {
      headers.push(header.innerText);
    });
  
    // Get table rows
    table.querySelectorAll("tbody tr").forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td").forEach((cell) => {
        rowData.push(cell.innerText);
      });
      data.push(rowData);
    });
  
    // Add the table to the PDF
    doc.autoTable({
      head: [headers], // Table headers
      body: data, // Table rows
      startY: 20, // Position below title
    });
  
    doc.save("expense_report.pdf"); // Download the PDF
  };
  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <div className="summary-panel">
        <h2>Budget Overview</h2>

        <input
          type="number"
          placeholder="Enter Total Income"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value) || "")}
          className="input"
        />
        <h3>Total Income: ₹{income ? parseFloat(income).toFixed(2) : "0.00"}</h3>
        <h3>Total Expenses: ₹{totalExpenses.toFixed(2)}</h3>
        <h3>Remaining Balance: ₹{remainingBalance.toFixed(2)}</h3>

        <button
          className="toggle-dark-mode"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light" : "Dark"} Mode
        </button>

        <h2>Budget Distribution</h2>
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      </div>

      <div className="main-content">
        <h1 className="header">Budgeting</h1>
        <form onSubmit={addExpense} className="form">
          <input
            type="text"
            placeholder="Expense Source"
            value={expenseSource}
            onChange={(e) => setExpenseSource(e.target.value)}
            required
            className="input"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input"
          >
            <option value="Necessary">Necessary</option>
            <option value="Luxury">Luxury</option>
            <option value="Investment">Investment</option>
          </select>
          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            />
            Recurring Expense
          </label>
          <button type="submit" className="button" disabled={!income || parseFloat(income) <= 0}>
            Add Budget
          </button>
        </form>
          <div className="expenseList">
  <h2>Budget List</h2>
  <table id="table" className="table">
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
              className="deleteButton"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Download Button */}
  <button onClick={downloadTableAsPDF} className="button">
  Download Table as PDF
</button>

</div>

   
        
      </div>
    </div>
  );
};

export default Expense;
Expense