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
          </ul>
          
          {/* Login/Logout buttons */}
          <div className="d-flex align-items-center ms-3">
            {isLoggedIn ? (
              <div className="dropdown">
                <button 
                  className="btn btn-link text-white text-decoration-none dropdown-toggle d-flex align-items-center p-0"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img 
                    src={currentUser?.profileImage || '/placeholder.svg'} 
                    alt={currentUser?.name}
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                  <span className="text-white">{currentUser?.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      <i className="bi bi-speedometer2 me-2"></i>
                      لوحة التحكم
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="bi bi-person-circle me-2"></i>
                      الملف الشخصي
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
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
