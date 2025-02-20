import { useState } from "react";
import "./Home.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ name: "", amount: "" });
    }
  };
  //footer news letter
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <h1>Budget Planner</h1>
      </header>
      
      {/* Hero Section */}
      <section className="hero-section">
        <h2>Simple Money Manager</h2>
        <p>See money coming in and going out — manage easily</p>
        <p className="time-indicator">⏳ 5 MINUTES</p>
      </section>
      
      {/* Budget and Expense Input */}
      <div className="budget-section">
        {/* <input
          type="number"
          placeholder="Enter total budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        /> */}
        
        <div className="expense-inputs">
        <i>Budget planning is not just about restricting spending
            —it’s about empowering yourself to take control of your financial future.
             Whether you’re an individual, a family, or a business, a well-structured budget is 
             the foundation for achieving financial stability, reducing stress, 
            and reaching your goals. Start budgeting today</i>
          {/* <input
            type="text"
            placeholder="Expense Name"
            value={newExpense.name}
            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
          />
          
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          /> */}
        </div>


      </div>
      
      {/* Expense Cards */}
      <div className="expense-list">
        {expenses.map((expense, index) => (
          <div key={index} className="expense-card">
            <p className="expense-name">{expense.name}</p>
            <p className="expense-amount">Amount: ${expense.amount}</p>
          </div>
        ))}
      </div>
      
      {/* Reviews Section */}
      <div className="reviews-section">
  <h2>User Reviews</h2>
  <div className="reviews-container">
    <div className="review-card">
      <img className="review-img " src="https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600"/>
      <div className="stars">★★★★★</div>
      <h4>John Doe</h4>
      <p>"This budget planner has transformed my savings! Highly recommended."</p>
    </div>
    <div className="review-card">
      <img className="review-img "src="https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=600"/>
      <div className="stars">★★★★★</div>
      <h4>Jane Smith</h4>
      <p>"Very user-friendly and effective. Helped me control my expenses easily."</p>
    </div>
    <div className="review-card">
    <img className="review-img "src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"/>
      <div className="stars">★★★★★</div>
      <h4>Michael Lee</h4>
      <p>"The best tool for managing finances! It keeps me on track every month."</p>
    </div>
  </div>
</div>

      
      {/* Footer */}
      <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h2>About Us</h2>
          <p>We help you manage your budget efficiently with easy-to-use tools.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-section">
          <h2>Subscribe to Our Newsletter Financial updates</h2>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© 2025 BudgetPlanner. All Rights Reserved.</p>
      </div>
    </footer>
    </div>
  );
}

  