// Footer Component - تذييل الصفحة
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* معلومات EgyCare */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>
              <i className="bi bi-hospital me-2"></i>
              EgyCare
            </h5>
            <p className="mt-3">
              منصة حجز المواعيد الطبية الأولى في مصر. نربطك بأفضل الأطباء في جميع التخصصات.
            </p>
          </div>
          
          {/* روابط سريعة */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>روابط سريعة</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <Link to="/">الرئيسية</Link>
              </li>
              <li className="mb-2">
                <Link to="/specialties">التخصصات</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">عن EgyCare</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">تواصل معنا</Link>
              </li>
            </ul>
          </div>
          
          {/* معلومات التواصل */}
          <div className="col-md-4">
            <h5>تواصل معنا</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                19888
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                info@egycare.com
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                القاهرة، مصر
              </li>
            </ul>
            {/* أيقونات وسائل التواصل */}
            <div className="mt-3">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram fs-4"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* حقوق النشر */}
        <div className="row mt-4">
          <div className="col text-center">
            <hr className="bg-white" />
            <p className="mb-0">
              © {new Date().getFullYear()} EgyCare. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
