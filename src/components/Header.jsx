// Header Component - شريط التنقل العلوي
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
              <Link className="nav-link" to="/">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/specialties">التخصصات</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">عن EgyCare</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">تواصل معنا</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <i className="bi bi-gear me-1"></i>
                لوحة التحكم
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
