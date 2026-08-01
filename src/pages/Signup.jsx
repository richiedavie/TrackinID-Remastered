import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPage.css';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">Trackin.ID</Link>
          <p className="auth-subtitle">Create your fleet management account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Rusdih Operations"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Work Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rusdih@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company / Fleet Name</label>
            <input
              id="company"
              type="text"
              className="form-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="PT Bandung Transport"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '8px' }}>
            Continue to Onboarding
          </button>
        </form>

        <div className="auth-footer-text">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}