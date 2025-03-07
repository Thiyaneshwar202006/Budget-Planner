import React, { useState } from 'react';
import './Slab.css';

const taxSlabs = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400001, max: 800000, rate: 0.05 },
  { min: 800001, max: 1200000, rate: 0.10 },
  { min: 1200001, max: 1600000, rate: 0.15 },
  { min: 1600001, max: 2000000, rate: 0.20 },
  { min: 2000001, max: 2400000, rate: 0.25 },
  { min: 2400000, max: Infinity, rate: 0.30 },
];

const calculateTax = (income) => {
  let tax = 0;
  taxSlabs.forEach(({ min, max, rate }) => {
    if (income > min) {
      const taxableAmount = Math.min(income, max) - min;
      tax += taxableAmount * rate;
    }
  });
  return tax;
};

const Slab = () => {
  const [income, setIncome] = useState(0);
  const [tax, setTax] = useState(0);

  const handleCalculate = () => {
    setTax(calculateTax(Number(income)));
  };

  return (
    <div className="container">
      <h1 className="title">Income Tax Slabs (2025-26)</h1>
      <div className="tax-grid">
        {taxSlabs.map((slab, index) => (
          <div key={index} className="slab-card">
            <h2 className="slab-title">
              {slab.min === 0
                ? "Up to ₹4,00,000"
                : `₹${slab.min.toLocaleString()} - ₹${slab.max === Infinity ? "Above" : slab.max.toLocaleString()}`}
            </h2>
            <p className="slab-rate">
              Tax Rate: <span>{(slab.rate * 100).toFixed(0)}%</span>
            </p>
          </div>
        ))}
      </div>
      <div className="calculator-card">
        <h2 className="calculator-title">Tax Calculator</h2>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="calculator-input"
          placeholder="Enter your income"
        />
        <button onClick={handleCalculate} className="calculator-button">
          Calculate Tax
        </button>
        {tax > 0 && (
          <p className="estimated-tax">
            Estimated Tax: <span>₹{tax.toLocaleString()}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Slab;
