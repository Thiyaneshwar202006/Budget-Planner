import React, { useState } from 'react';
import './Tax.css';
import Slab from './Slab';

export default function Tax() {
  const [selectedSlab, setSelectedSlab] = useState(null);

  const slabs = [
    {
      title: 'Income Tax Slabs',
      description: 'The rebate under Section 87A has been enhanced, making income up to ₹12,00,000 tax-free.',
      showSlab: true
    },
    {
      title: 'Standard Deduction',
      description: 'The standard deduction for salaried individuals has been raised from ₹50,000 to ₹75,000 during the financial year 2025-2026.',
      showSlab: true
    },
    {
      title: 'Marginal Relief',
      description: 'Taxpayers can claim marginal relief under section 115BAC only until their taxable income reaches ₹12,75,000.',
      showSlab: true
    },
    {
      title: 'TDS',
      description: 'This is a description of the card. It can contain details about the content.',
      showSlab: false
    },
    {
      title: 'TCS',
      description: 'This is a description of the card. It can contain details about the content.',
      showSlab: false
    },
    {
      title: 'Surcharge and Cess Charge',
      description: 'It is calculated from tax amount as per the tax slab.',
      showSlab: true
    }
  ];

  if (selectedSlab) {
    return <Slab title={selectedSlab.title} description={selectedSlab.description} onBack={() => setSelectedSlab(null)} />;
  }

  return (
    <div className='body'>
      {slabs.map((slab, index) => (
        <div 
          className='card' 
          key={index} 
          onClick={() => slab.showSlab && setSelectedSlab(slab)}
        >
          <img
            src='https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg='
            alt='Card Image'
            className='card-image'
          />
          <div className='card-content'>
            <h3 className='card-title'>{slab.title}</h3>
            <p className='card-description'>{slab.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
