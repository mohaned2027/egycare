// Header Component - New Professional Design
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, logout } from '../services/authService';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  const isLoggedIn = isAuthenticated();
  const currentUser = getCurrentUser();

  useEffect(() => {
    fetch('/data/settings.json')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error loading settings:', err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Logo & Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div
            style={{
              width: '40px',
              height: '40px',
              background: `linear-gradient(135deg, ${settings?.logo?.primaryColor || '#0B5FA5'} 0%, ${settings?.logo?.secondaryColor || '#0E74C7'} 100%)`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '10px'
            }}
          >
            <i className={`bi ${settings?.logo?.iconClass || 'bi-heart-pulse-fill'}`} style={{ color: 'white', fontSize: '1.25rem' }}></i>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: settings?.logo?.primaryColor || '#0B5FA5' }}>
              {settings?.siteName || 'EgyCare'}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#6B7280', marginTop: '-5px' }}>
              {settings?.siteSlogan || 'Healthcare Platform'}
            </div>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname.includes('/specialties') ? 'active' : ''}`}
                to="/specialties"
              >
                Medical Specialties
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
              >
              About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
        
          </ul>

          {/* User Actions */}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                {/* User Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-link text-decoration-none dropdown-toggle d-flex align-items-center p-0"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: '#1F2937' }}
                  >
                    <img
                      src={currentUser?.profileImage || '/placeholder.svg'}
                      alt={currentUser?.name}
                      className="rounded-circle me-2"
                      style={{
                        width: '35px',
                        height: '35px',
                        objectFit: 'cover',
                        border: '2px solid #0B5FA5'
                      }}
                    />
                    <span className="d-none d-md-inline">{currentUser?.name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        <i className="bi bi-speedometer2 me-2 text-primary"></i>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person-circle me-2 text-primary"></i>
                        Profile
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/specialties" className="btn btn-primary btn-sm d-none d-lg-inline-flex me-2">
                  Book Now
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-sm">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
