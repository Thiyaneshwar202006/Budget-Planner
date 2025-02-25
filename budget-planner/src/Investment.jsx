import React from 'react';
import './Tax.css';

export default function Investment() {
  return (
    <div className='body'>
      {[
        { title: "Public Provident Fund (PPF)", description: "Tax-free under 80C, Lock-in: 15 yrs, Returns: 7.1%, Risk: Low." },
        { title: "Employees’ Provident Fund (EPF)", description: "Tax-free under 80C, EEE status, Returns: 8.15%, Risk: Low." },
        { title: "National Pension System (NPS)", description: "80C + 80CCD(1B), Lock-in: Until 60 yrs, Returns: 8-10%, Risk: Moderate." },
        { title: "Equity Linked Savings Scheme (ELSS)", description: "80C, Lock-in: 3 yrs, Returns: 12-15%, Risk: High." },
        { title: "Fixed Deposit (Tax Saver)", description: "80C, Lock-in: 5 yrs, Returns: 6-7%, Risk: Low." },
        { title: "Sukanya Samriddhi Yojana (SSY)", description: "80C, Lock-in: 21 yrs, Returns: 8.2%, Risk: Low." },
        { title: "Senior Citizens Saving Scheme (SCSS)", description: "80C, Lock-in: 5 yrs, Returns: 8.2%, Risk: Low." },
        { title: "Unit Linked Insurance Plan (ULIP)", description: "80C, Lock-in: 5 yrs, Returns: 8-12%, Risk: Moderate-High." },
        { title: "Gold ETFs / Sovereign Gold Bonds (SGBs)", description: "No 80C, Lock-in: 8 yrs, Returns: 6-8%, Risk: Moderate." },
        { title: "Real Estate Investment", description: "No direct tax benefits, No lock-in, Returns: 5-10%, Risk: Moderate." },
        { title: "Mutual Funds (Non-ELSS)", description: "No 80C, Returns: 10-15%, Risk: Moderate-High." },
        { title: "Direct Equity (Stocks)", description: "No 80C, Returns: 12-18%, Risk: High." }
      ].map((investment, index) => (
        <div class="card" key={index}>
          <img
            src="https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg="
            alt="Card Image"
            class="card-image"
          />
          <div class="card-content">
            <h3 class="card-title">{investment.title}</h3>
            <p class="card-description">{investment.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
