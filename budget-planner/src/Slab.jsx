import React, { useState } from 'react';
import './Slab.css';

// Define tax slabs
const taxSlabs = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400001, max: 800000, rate: 0.05 },
  { min: 800001, max: 1200000, rate: 0.10 },
  { min: 1200001, max: 1600000, rate: 0.15 },
  { min: 1600001, max: 2000000, rate: 0.20 },
  { min: 2000001, max: 2400000, rate: 0.25 },
  { min: 2400001, max: Infinity, rate: 0.30 },
];

// Constants for tax calculation
const STANDARD_DEDUCTION = 75000; // ₹75,000 standard deduction
const CESS_RATE = 0.04; // 4% cess
const SURCHARGE_THRESHOLDS = [
  { limit: 5000000, rate: 0.1 },
  { limit: 10000000, rate: 0.15 },
  { limit: 20000000, rate: 0.25 },
  { limit: 50000000, rate: 0.25 },
];
const REBATE_LIMIT = 1200000; // ₹12,00,000 limit for rebate under section 87A

// Helper function to format numbers in Indian style (e.g., 12,34,567)
const formatIndianNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Function to calculate tax, surcharge, and cess
const calculateTax = (income) => {
  let taxableIncome = Math.max(0, income - STANDARD_DEDUCTION);
  let tax = 0;

  // Calculate tax based on slabs
  taxSlabs.forEach(({ min, max, rate }) => {
    if (taxableIncome > min) {
      const taxableAmount = Math.min(taxableIncome, max) - min;
      tax += taxableAmount * rate;
    }
  });

  // Apply rebate under section 87A
  if (taxableIncome <= REBATE_LIMIT) {
    tax = 0; // Full rebate applied
  }

  // Initialize surcharge
  let surcharge = 0;
  const threshold = 5000000; // ₹50,00,000 threshold for surcharge

  // Apply surcharge if income exceeds threshold
  if (taxableIncome > threshold) {
    let surchargeRate = 0;
    if (taxableIncome > 50000000) {
      surchargeRate = 0.25;
    } else if (taxableIncome > 20000000) {
      surchargeRate = 0.25;
    } else if (taxableIncome > 10000000) {
      surchargeRate = 0.15;
    } else if (taxableIncome > threshold) {
      surchargeRate = 0.10;
    }

    const normalSurcharge = tax * surchargeRate;

    // Marginal Relief Calculation
    let taxAtThreshold = 0;
    taxSlabs.forEach(({ min, max, rate }) => {
      if (threshold > min) {
        const taxableAmount = Math.min(threshold, max) - min;
        taxAtThreshold += taxableAmount * rate;
      }
    });

    const extraIncome = taxableIncome - threshold;
    const taxOnExtraIncome = tax - taxAtThreshold;
    const marginalReliefSurcharge = extraIncome - taxOnExtraIncome;

    surcharge = Math.min(normalSurcharge, marginalReliefSurcharge);
    if (surcharge < 0) surcharge = 0;
  }

  // Apply 4% cess on (tax + surcharge)
  const cess = (tax + surcharge) * CESS_RATE;

  return { tax, surcharge, cess, taxableIncome };
};

const Slab = () => {
  const [income, setIncome] = useState('');
  const [taxDetails, setTaxDetails] = useState(null);
  const [error, setError] = useState('');

  // Handle input change with validation
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setIncome('');
      setError('');
      setTaxDetails(null);
    } else if (/[^0-9]/.test(value)) {
      setError('Please enter a valid number');
    } else if (Number(value) < 0) {
      setError('Income cannot be negative');
    } else {
      setIncome(value);
      setError('');
    }
  };

  // Handle tax calculation
  const handleCalculate = () => {
    if (!income || error) {
      setTaxDetails(null);
      return;
    }
    const result = calculateTax(Number(income));
    setTaxDetails(result);
  };

  // Handle clearing the form
  const handleClear = () => {
    setIncome('');
    setTaxDetails(null);
    setError('');
  };

  return (
    <div className="container">
      <h1 className="title">Income Tax Calculator (2025-26)</h1>

      {/* Display tax slabs */}
      <div className="tax-grid">
        {taxSlabs.map((slab, index) => (
          <div key={index} className="slab-card">
            <h2 className="slab-title">
              {slab.min === 0
                ? "Up to ₹4,00,000"
                : `₹${formatIndianNumber(slab.min)} - ₹${slab.max === Infinity ? "Above" : formatIndianNumber(slab.max)}`}
            </h2>
            <p className="slab-rate">
              Tax Rate: <span>{(slab.rate * 100).toFixed(0)}%</span>
            </p>
          </div>
        ))}
      </div>

      {/* Tax calculator */}
      <div className="calculator-card">
        <h2 className="calculator-title">Tax Calculator</h2>
        <input
          type="text"
          value={income}
          onChange={handleInputChange}
          className={`calculator-input ${error ? 'input-error' : ''}`}
          placeholder="Enter your income"
        />
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button onClick={handleCalculate} className="calculator-button" disabled={!income || error}>
            Calculate Tax
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>

        {/* Display tax details */}
        {taxDetails && (
          <div className="estimated-tax">
            <p>
              Income After Deduction: <span>₹{formatIndianNumber(taxDetails.taxableIncome)}</span>
            </p>
            <p>
              Income Tax: <span>₹{formatIndianNumber(Math.round(taxDetails.tax))}</span>
            </p>
            <p>
              Surcharge:{' '}
              <span>₹{formatIndianNumber(Math.round(taxDetails.surcharge))}</span></p>
            <p>Cess: <span>₹{formatIndianNumber(Math.round(taxDetails.cess))}</span>  </p>
            <p>
              Estimated Total Tax:{' '}
              <span>₹{formatIndianNumber(Math.round(taxDetails.tax + taxDetails.surcharge + taxDetails.cess))}</span>
            </p>
            {taxDetails.taxableIncome <= REBATE_LIMIT && (
              <p className="rebate-message">
                You are eligible for a rebate under section 87A .
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slab;