import React from 'react'
import './Tax.css'
export default function Tax() {
  return (
    <div className='body'>
      <div class="card">
        <img
          src="https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg="
          alt="Card Image"
          class="card-image"
        />
        <div class="card-content">
          <h3 class="card-title"> Income Tax Slabs</h3>
          <p class="card-description">
          The rebate under Section 87A has been enhanced, making income up to ₹12,00,000 tax-free. 
          </p>
          <div class="overlay">
            <div class ="text">
              <p class="mar">Example if a person's Income is ₹10,00,000<br/>
                            ✅ Tax Calculation<br/>
                            1️⃣ ₹0 – ₹4,00,000 → 0% tax → ₹0<br/>
                            2️⃣ ₹4,00,001 – ₹8,00,000 → 5% tax → ₹20,000<br/>
                            3️⃣ ₹8,00,001 – ₹10,00,000 → 10% tax → 10% of ₹2,00,000 = ₹20,000<br/>
                            ➡ Total tax = ₹20,000 + ₹20,000 = ₹40,000<br/>
                            ✅ Apply Rebate Under Section 87A<br/>
                            Since income is within ₹12 lakh, the rebate = ₹40,000, so
                            ➡ Final Tax Payable = ₹0
                            <br/><br/>
                            </p></div>
          </div>
        </div>
      </div>

<div class="card">
<img
  src="https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg="
  alt="Card Image"
  class="card-image"
/>

<div class="card-content">
  <h3 class="card-title">Standard Deduction</h3>
  <p class="card-description">
  The standard deduction for salaried individuals has been raised from ₹50,000 to ₹75,000 
  during the financial year 2025-2026
  </p>
  <div class="overlay">
    <div class ="text">
    <p class="mar">
    Gross Income: ₹12,50,000<br/>
    Standard Deduction: ₹75,500<br/>
    Taxable Income = ₹12,50,000 - ₹75,000 = ₹11,75,000<br/>
    Thus the payable tax amount become 11,75,000 

    </p></div>
  </div>
</div>
</div>

<div class="card">

<img
  src="https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg="
  alt="Card Image"
  class="card-image"
/>

<div class="card-content">
  <h3 class="card-title"> Marginal Relief</h3>
  <p class="card-description">
  Taxpayers can claim marginal relief under section 115BAC only until their taxable income reaches
         ₹12,75,000. Beyond this point, marginal relief no longer applies, 
        and taxes are calculated based on standard slab rates.
  </p>
  <div class="overlay">
    <div class ="text">
      <p class="mar"></p>
    </div>
  </div>
</div>
</div>

<div class="card">

<img
  src="https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg="
  alt="Card Image"
  class="card-image"
/>

<div class="card-content">
  <h3 class="card-title">TDS</h3>
  <p class="card-description">
    This is a description of the card. It can contain details about the content.
  </p>
</div>
<div class="overlay">
    <div class ="text">Hello</div>
  </div>
</div>
<div class="card">

<img
  src="https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg="
  alt="Card Image"
  class="card-image"
/>

<div class="card-content">
  <h3 class="card-title">TCS</h3>
  <p class="card-description">
    This is a description of the card. It can contain details about the content.
  </p>
</div>
<div class="overlay">
    <div class ="text">Hello</div>
  </div>
</div>
<div class="card">

<img
  src="https://media.istockphoto.com/id/1329345098/photo/tax-deadline.jpg?s=1024x1024&w=is&k=20&c=2YfhnpwuZY7pPNOtnLlG-_A8JEYG5FEXVzMirJtBIDg="
  alt="Card Image"
  class="card-image"
/>

<div class="card-content">
  <h3 class="card-title">Surcharge and cess charge</h3>
  <p class="card-description">
    It is calculated from tax amount as per the tax slab <br/>(₹50 lakh – ₹1 crore	10%)	<br/>
(₹1 crore – ₹2 crore	15%)	<br/>
(₹2 crore – ₹5 crore	25%)
  </p>
</div>
<div class="overlay">
    <div class ="text">
      <p class="mar">Income ₹1 crore<br/>
      Basic Tax Calculation: ₹26,80,000<br/>
          Surcharge (Capped at 25%) = ₹26,80,000 × 10% = ₹2,68,000<br/>
          Total Tax Before Cess = ₹26,80,000+ ₹2,68,000= ₹29,48,000<br/>
          Cess (4%) =  ₹29,48,000× 4% = ₹1,17,920<br/>
         Total Tax Payable = ₹30,65,920<br/>
         Cess is Always 4% on (Tax + Surcharge)
      </p>
    </div>
  </div>
</div>
<br />



    </div>
  )
}

