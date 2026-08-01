import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, subscriptionTier, logout, darkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', href: isHome ? '#home' : '/#home' },
    { name: 'Features', href: isHome ? '#features' : '/#features' },
    { name: 'Pricing', href: isHome ? '#pricing' : '/#pricing' },
    { name: 'FAQ', href: isHome ? '#faq' : '/#faq' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          Trackin.ID
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* Navbar Right Actions (Dark/Light Switch + Auth Buttons) */}
        <div className="navbar-actions desktop-only">
          {/* Dark / Light Toggle Switch */}
          <button
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
            title="Toggle Dark / Light Theme"
            aria-label="Toggle Dark or Light Theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <div className="navbar-auth">
              <Link to="/dashboard" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Dashboard
              </Link>
              <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Start Free Trial
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="container">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="mobile-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={toggleDarkMode}
                className="btn btn-outline w-full"
              >
                {darkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
              </button>

              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button className="btn btn-outline w-full" onClick={handleLogout}>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline w-full" onClick={() => setMobileMenuOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/signup" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                    Start Free Trial
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}