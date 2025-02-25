import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
// import "./Dashboard.css";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [incomeData, setIncomeData] = useState([5000, 7000, 6000, 8000, 9000]);
  const [expenseData, setExpenseData] = useState([3000, 4000, 3500, 5000, 5500]);
  const [labels] = useState(["Jan", "Feb", "Mar", "Apr", "May"]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <h1>Dashboard<br/></h1>
      {/* <button className="toggle-dark-mode" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light" : "Dark"} Mode
      </button> */}

      <div className="cards-container">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{incomeData.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>₹{expenseData.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="card">
          <h3>Remaining Balance</h3>
          <p>₹{incomeData.reduce((a, b) => a + b, 0) - expenseData.reduce((a, b) => a + b, 0)}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Income vs. Expenses</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
