import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AuthPage.css';

export default function Login() {
  const [email, setEmail] = useState('rusdih@trackin.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: email.split('@')[0] || 'Rusdih Operations',
      email: email,
      role: 'Fleet Manager'
    });
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Navbar />

      <div className="auth-page" style={{ flex: 1 }}>
        <div className="auth-card">
          <div className="auth-header">
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>Log In to Trackin.ID</h2>
            <p className="auth-subtitle">Enter your credentials to manage your fleet operations</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingRight: '40px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '8px' }}>
              Log In
            </button>
          </form>

          <div className="auth-footer-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}