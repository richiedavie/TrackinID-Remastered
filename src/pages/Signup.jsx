import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { findUserByEmail } from '../lib/mockDb';
import './AuthPage.css';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Call findUserByEmail - if a match exists, show the inline "account already exists" error and stop.
    const existing = findUserByEmail(email);
    if (existing) {
      setError('An account with this email already exists');
      return;
    }

    try {
      // Otherwise call signup() from AuthContext, which internally calls createUser(...) then immediately setSession(newUser.id).
      await signup({
        name: fullName,
        email,
        password,
        companyName: company,
      });

      // Navigate to /onboarding after that completes
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'An error occurred during sign up.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Navbar />

      <div className="auth-page" style={{ flex: 1 }}>
        <div className="auth-card">
          <div className="auth-header">
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>Create Your Account</h2>
            <p className="auth-subtitle">Get started with real-time fleet management</p>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgb(239, 68, 68)',
              color: 'rgb(239, 68, 68)',
              padding: '10px 12px',
              borderRadius: '6px',
              fontSize: '0.875rem',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
              Continue to Selection →
            </button>
          </form>

          <div className="auth-footer-text">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}