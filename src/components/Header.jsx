// Header Component - شريط التنقل العلوي
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, logout } from '../services/authService';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLoggedIn = isAuthenticated();
  const currentUser = getCurrentUser();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        {/* Logo والاسم */}
        <Link className="navbar-brand" to="/">
          <i className="bi bi-hospital me-2"></i>
          EgyCare
        </Link>
        
        {/* زرار القائمة للموبايل */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* روابط القائمة */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/specialties' ? 'active' : ''}`} to="/specialties">التخصصات</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">عن EgyCare</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">تواصل معنا</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">
                <i className="bi bi-gear me-1"></i>
                لوحة التحكم
              </Link>
            </li>
          </ul>
          
          {/* Login/Logout buttons */}
          <div className="d-flex align-items-center ms-3">
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <span className="text-white me-3">
                  <i className="bi bi-person-circle me-1"></i>
                  {currentUser?.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-light btn-sm">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
