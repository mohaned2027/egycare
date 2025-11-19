// Footer Component - Page footer
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/data/settings.json')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error loading settings:', err));
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* EgyCare Information */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>
             <i className={`bi ${settings?.logo?.iconClass || 'bi-heart-pulse-fill'}`} style={{ color: 'white', fontSize: '1.25rem' , padding: 5 , }}></i>
              {settings?.siteName || 'EgyCare'}
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
                {settings?.contact?.phone || '19888'}
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                {settings?.contact?.email || 'info@egycare.com'}
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                {settings?.contact?.address || 'Cairo, Egypt'}
              </li>
            </ul>
            {/* Social Media Icons */}
            <div className="mt-3">
              <a href={settings?.social?.facebook || '#'} className="text-white me-3">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href={settings?.social?.twitter || '#'} className="text-white me-3">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href={settings?.social?.instagram || '#'} className="text-white me-3">
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
              © {new Date().getFullYear()} {settings?.siteName || 'EgyCare'}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
