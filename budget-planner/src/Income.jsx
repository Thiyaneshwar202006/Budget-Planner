import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Income.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const Expense = ({ income: initialIncome, setIncome, expenses: initialExpenses, setExpenses, totalExpenses: initialTotalExpenses, remainingBalance: initialRemainingBalance }) => {
  const navigate = useNavigate();

  const [expenseSource, setExpenseSource] = useState("");
  const [amount, setAmount] = useState("");
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [date, setDate] = useState(() => {
    try {
      return localStorage.getItem("expenseDate") || `${currentYear}-${currentMonth}`;
    } catch (e) {
      console.error("Failed to load date from localStorage:", e);
      return `${currentYear}-${currentMonth}`;
    }
  });
  const [category, setCategory] = useState(() => {
    try {
      return localStorage.getItem("expenseCategory") || "Necessary";
    } catch (e) {
      console.error("Failed to load category from localStorage:", e);
      return "Necessary";
    }
  });
  const [isRecurring, setIsRecurring] = useState(() => {
    try {
      const savedIsRecurring = localStorage.getItem("expenseIsRecurring");
      return savedIsRecurring ? JSON.parse(savedIsRecurring) : false;
    } catch (e) {
      console.error("Failed to load isRecurring from localStorage:", e);
      return false;
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedDarkMode = localStorage.getItem("expenseDarkMode");
      return savedDarkMode ? JSON.parse(savedDarkMode) : true;
    } catch (e) {
      console.error("Failed to load darkMode from localStorage:", e);
      return true;
    }
  });

  const [totalExpenses, setTotalExpenses] = useState(initialTotalExpenses);
  const [remainingBalance, setRemainingBalance] = useState(initialRemainingBalance);

  useEffect(() => {
    localStorage.setItem("expenseDate", date);
  }, [date]);
  useEffect(() => {
    localStorage.setItem("expenseCategory", category);
  }, [category]);
  useEffect(() => {
    localStorage.setItem("expenseIsRecurring", JSON.stringify(isRecurring));
  }, [isRecurring]);
  useEffect(() => {
    localStorage.setItem("expenseDarkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await fetch(`http://localhost:5000/api/income/${date}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIncome(data.totalIncome || 0); // Default to 0 if no income
          setExpenses(data.expenses || []);
          setTotalExpenses(data.totalExpenses || 0);
          setRemainingBalance(data.remainingAmount || 0);
        } else if (response.status === 404) {
          setIncome(initialIncome || 0);
          setExpenses(initialExpenses || []);
          setTotalExpenses(initialTotalExpenses || 0);
          setRemainingBalance(initialRemainingBalance || 0);
        } else if (response.status === 401) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIncome(initialIncome || 0);
        setExpenses(initialExpenses || []);
        setTotalExpenses(initialTotalExpenses || 0);
        setRemainingBalance(initialRemainingBalance || 0);
      }
    };
    fetchData();
  }, [date, initialIncome, initialExpenses, initialTotalExpenses, initialRemainingBalance, setIncome, setExpenses, navigate]);

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (inputDate) {
      const [year, month] = inputDate.split("-");
      let formattedYear = year;
      if (!year.startsWith("20")) {
        formattedYear = "20" + year.slice(-2);
      }
      const formattedDate = `${formattedYear}-${month.padStart(2, "0")}`;
      setDate(formattedDate);
    }
  };

  const updateIncome = async (newIncome) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await fetch(`http://localhost:5000/api/income/${date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ totalIncome: newIncome || 0 }),
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      const data = await response.json();
      setIncome(data.totalIncome);
      setExpenses(data.expenses);
      setTotalExpenses(data.totalExpenses);
      setRemainingBalance(data.remainingAmount);
    } catch (error) {
      console.error("Failed to update income:", error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!initialIncome || parseFloat(initialIncome) <= 0) {
      alert("Please add income before adding expenses.");
      return;
    }
    const trimmedSource = expenseSource.trim();
    const parsedAmount = parseFloat(amount);
    if (!trimmedSource) {
      alert("Expense source cannot be empty.");
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }
    const newExpense = {
      id: crypto.randomUUID(),
      date,
      source: trimmedSource,
      amount: parsedAmount,
      category,
      isRecurring,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/income/${date}/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newExpense),
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      const data = await response.json();
      setExpenses(data.expenses);
      setTotalExpenses(data.totalExpenses);
      setRemainingBalance(data.remainingAmount);
    } catch (error) {
      console.error("Failed to add expense to server:", error);
      setExpenses([...initialExpenses, newExpense]);
      const newTotalExpenses = initialTotalExpenses + parsedAmount;
      setTotalExpenses(newTotalExpenses);
      setRemainingBalance(parseFloat(initialIncome) - newTotalExpenses);
    }
    setExpenseSource("");
    setAmount("");
    setCategory("Necessary");
    setIsRecurring(false);
  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/income/${date}/expense/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      const data = await response.json();
      setExpenses(data.expenses);
      setTotalExpenses(data.totalExpenses);
      setRemainingBalance(data.remainingAmount);
    } catch (error) {
      console.error("Failed to delete expense from server:", error);
      const updatedExpenses = initialExpenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      const newTotalExpenses = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      setTotalExpenses(newTotalExpenses);
      setRemainingBalance(parseFloat(initialIncome) - newTotalExpenses);
    }
  };

  const clearAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/income/${date}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setIncome("");
      setExpenses([]);
      setTotalExpenses(0);
      setRemainingBalance(0);
      setExpenseSource("");
      setAmount("");
      setDate(`${currentYear}-${currentMonth}`);
      setCategory("Necessary");
      setIsRecurring(false);
      setDarkMode(true);

      localStorage.removeItem("expenseIncome");
      localStorage.removeItem("expenseExpenses");
      localStorage.removeItem("expenseDate");
      localStorage.removeItem("expenseCategory");
      localStorage.removeItem("expenseIsRecurring");
      localStorage.removeItem("expenseDarkMode");

      alert("All data has been cleared!");
    } catch (error) {
      console.error("Failed to clear server data:", error);
      setIncome("");
      setExpenses([]);
      setTotalExpenses(0);
      setRemainingBalance(0);
      setExpenseSource("");
      setAmount("");
      setDate(`${currentYear}-${currentMonth}`);
      setCategory("Necessary");
      setIsRecurring(false);
      setDarkMode(true);

      localStorage.removeItem("expenseIncome");
      localStorage.removeItem("expenseExpenses");
      localStorage.removeItem("expenseDate");
      localStorage.removeItem("expenseCategory");
      localStorage.removeItem("expenseIsRecurring");
      localStorage.removeItem("expenseDarkMode");

      alert("All local data has been cleared (server clear failed)!");
    }
  };

  const categoryTotals = initialExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: generateColors(Object.keys(categoryTotals).length),
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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const doc = new jsPDF();
    doc.text("Budget Report", 14, 10);
    const headers = ["Year-Month", "Source", "Amount", "Category", "% of Total"];
    const data = initialExpenses.map((expense) => [
      expense.date,
      expense.source,
      `₹${expense.amount.toFixed(2)}`,
      expense.category,
      totalExpenses > 0 ? `${((expense.amount / totalExpenses) * 100).toFixed(2)}%` : "0%",
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20,
      columnStyles: { 2: { font: "times" } },
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
            value={initialIncome || ""}
            onChange={(e) => {
              const newIncome = parseFloat(e.target.value) || 0;
              setIncome(newIncome);
              updateIncome(newIncome);
            }}
            className="income-input"
          />
          <div className="income-summary-stats">
            <h3>
              Total Income: <span>₹{initialIncome ? parseFloat(initialIncome).toFixed(2) : "0.00"}</span>
            </h3>
            <h3>
              Total Expenses: <span>₹{totalExpenses.toFixed(2)}</span>
            </h3>
            <h3>
              Remaining Balance: <span>₹{remainingBalance.toFixed(2)}</span>
            </h3>
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
                type="month"
                value={date}
                onChange={handleDateChange}
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
                disabled={!initialIncome || parseFloat(initialIncome) <= 0}
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
                  <th>Year-Month</th>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>% of Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialExpenses.map((expense) => (
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
            <div className="button-group">
              <button onClick={downloadTableAsPDF} className="income-button income-download-button">
                📥 Download PDF
              </button>
              <button onClick={clearAllData} className="income-button income-download-button">
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;