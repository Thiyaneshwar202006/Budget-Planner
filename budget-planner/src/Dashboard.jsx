import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.css";
import jsPDF from "jspdf";

const Dashboard = ({ totalIncome, totalExpenses, remainingBalance }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [newIncome, setNewIncome] = useState("");
  const [newExpense, setNewExpense] = useState("");
  const [newLabel, setNewLabel] = useState("");

  // Chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#2ecc71",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#2ecc71",
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#e74c3c",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#e74c3c",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: darkMode ? "#ecf0f1" : "#2c3e50", font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: darkMode ? "#34495e" : "#fff",
        titleColor: darkMode ? "#ecf0f1" : "#2c3e50",
        bodyColor: darkMode ? "#ecf0f1" : "#2c3e50",
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#ecf0f1" : "#2c3e50" },
        grid: { color: darkMode ? "#34495e" : "#e0e0e0" },
      },
      y: {
        ticks: { color: darkMode ? "#ecf0f1" : "#2c3e50" },
        grid: { color: darkMode ? "#34495e" : "#e0e0e0" },
      },
    },
  };

  // Add new data point
  const addDataPoint = (e) => {
    e.preventDefault();
    if (newLabel && newIncome && newExpense) {
      setLabels([...labels, newLabel]);
      setIncomeData([...incomeData, parseFloat(newIncome)]);
      setExpenseData([...expenseData, parseFloat(newExpense)]);
      setNewLabel("");
      setNewIncome("");
      setNewExpense("");
    }
  };

  // Export chart data as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Financial Dashboard Report", 10, 10);
    doc.autoTable({
      head: [["Month", "Income (₹)", "Expenses (₹)"]],
      body: labels.map((label, index) => [
        label,
        incomeData[index].toLocaleString(),
        expenseData[index].toLocaleString(),
      ]),
      startY: 20,
    });
    // Include summary stats in the PDF
    doc.text(`Total Income: ₹${totalIncome ? parseFloat(totalIncome).toLocaleString() : "0"}`, 10, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Expenses: ₹${totalExpenses.toLocaleString()}`, 10, doc.lastAutoTable.finalY + 20);
    doc.text(`Remaining Balance: ₹${remainingBalance.toLocaleString()}`, 10, doc.lastAutoTable.finalY + 30);
    doc.save("dashboard_report.pdf");
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <div className="dashboard-controls">
          <button
            className="toggle-dark-mode"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"} Mode
          </button>
          <button className="dashboard-export-btn" onClick={exportToPDF}>
            Export PDF
          </button>
        </div>
      </div>
      <div className="dashboard-cards-container">
        <div className="dashboard-card dashboard-income-card">
          <h3>Total Income :<span>₹{totalIncome ? parseFloat(totalIncome).toFixed(2) : "0.00"}</span></h3>
          <p className="dashboard-amount">
            ₹{incomeData.reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
        </div>
        <div className="dashboard-card dashboard-expense-card">
          <h3>Total Expenses: <span>₹{totalExpenses.toFixed(2)}</span> </h3>
          <p className="dashboard-amount">
            ₹{expenseData.reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
        </div>
        <div className="dashboard-card dashboard-balance-card">
          <h3>Remaining Balance: <span>₹{remainingBalance.toFixed(2)}</span></h3>
          <p className="dashboard-amount">
            ₹{(incomeData.reduce((a, b) => a + b, 0) - expenseData.reduce((a, b) => a + b, 0)).toLocaleString()}
          </p>
        </div>
      </div>

      <form className="dashboard-data-form" onSubmit={addDataPoint}>
        <input
          type="text"
          placeholder="Month (e.g., Jun)"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="dashboard-input"
        />
        <input
          type="number"
          placeholder="Income"
          value={newIncome}
          onChange={(e) => setNewIncome(e.target.value)}
          className="dashboard-input"
        />
        <input
          type="number"
          placeholder="Expense"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          className="dashboard-input"
        />
        <button type="submit" className="dashboard-add-btn">Add Data</button>
      </form>

      <div className="dashboard-chart-container">
        <h2>Income vs. Expenses Trend</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;