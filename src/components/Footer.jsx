// Footer Component - Page footer
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* EgyCare Information */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>
              <i className="bi bi-hospital me-2"></i>
              EgyCare
            </h5>
            <p className="mt-3">
              Egypt's first medical appointment booking platform. We connect you with the best doctors in all specialties.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/specialties">Specialties</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">About EgyCare</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
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
                Cairo, Egypt
              </li>
            </ul>
            {/* Social Media Icons */}
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

        {/* Copyright */}
        <div className="row mt-4">
          <div className="col text-center">
            <hr className="bg-white" />
            <p className="mb-0">
              © {new Date().getFullYear()} EgyCare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
