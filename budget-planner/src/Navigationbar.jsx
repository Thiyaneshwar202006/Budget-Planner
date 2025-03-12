import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material"; // Removed Typography import
import Home from './Home';
import Income from './Income';
import Investment from './Investment';
import Tax from './Tax';
import Dashboard from './Dashboard';
import ErrorBoundary from './ErrorBoundary';
import Login from "./Login";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          {children} {/* Removed Typography wrapper */}
        </Box>
      )}
    </div>
  );
}

export default function Navigationbar() {
  const [income, setIncome] = useState(() => {
    try {
      const savedIncome = localStorage.getItem("expenseIncome");
      return savedIncome ? parseFloat(savedIncome) : "";
    } catch (e) {
      console.error("Failed to load income from localStorage:", e);
      return "";
    }
  });
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("expenseExpenses");
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    } catch (e) {
      console.error("Failed to load expenses from localStorage:", e);
      return [];
    }
  });

  const totalIncome = income;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBalance = income ? parseFloat(income) - totalExpenses : 0;

  useEffect(() => {
    localStorage.setItem("expenseIncome", income);
  }, [income]);

  useEffect(() => {
    localStorage.setItem("expenseExpenses", JSON.stringify(expenses));
  }, [expenses]);

  const location = useLocation();

  const getValueFromPath = (path) => {
    switch (path) {
      case "/":
        return 1;
      case "/income":
        return 2;
      case "/tax":
        return 3;
      case "/investment":
        return 4;
      case "/login":
        return 5;
      case "/dashboard":
        return 6;
      default:
        return 1;
    }
  };

  const value = getValueFromPath(location.pathname);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="new.PNG" />
      <Box>
        <Tabs value={value} aria-label="basic tabs example">
          <Tab
            icon={<img src="B.png" alt="Logo" style={{ width: 30, height: 30 }} />}
            {...a11yProps(0)}
            disabled
          />
          <Tab label="HOME" component={Link} to="/" {...a11yProps(1)} />
          <Tab label="INCOME" component={Link} to="/income" {...a11yProps(2)} />
          <Tab label="Taxation and Deductions" component={Link} to="/tax" {...a11yProps(3)} />
          <Tab label="INVESTMENT" component={Link} to="/investment" {...a11yProps(4)} />
          <Tab label="login / signup" component={Link} to="/login" {...a11yProps(5)} />
          <Tab label="Dashboard" component={Link} to="/dashboard" {...a11yProps(6)} />
        </Tabs>
        <CustomTabPanel value={value} index={1}>
          <Home />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ErrorBoundary>
            <Income
              income={income}
              setIncome={setIncome}
              expenses={expenses}
              setExpenses={setExpenses}
              totalExpenses={totalExpenses}
              remainingBalance={remainingBalance}
            />
          </ErrorBoundary>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Tax />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Investment />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <Login/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <Dashboard
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            remainingBalance={remainingBalance}
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
}