// Contact Page - Professional contact page matching the design
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/data/settings.json')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error loading settings:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will respond to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We are here to answer your questions</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {/* Contact Form with Map */}
          <div className="row g-0 shadow-lg rounded-4 overflow-hidden mb-5">
            {/* Contact Form */}
            <div className="col-lg-6 bg-white p-5">
              <h2 className="fw-bold mb-4">
                Get in <span style={{ color: '#0B5FA5' }}>touch</span>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ 
                      border: 'none',
                      borderBottom: '2px solid #e0e0e0',
                      borderRadius: '0',
                      paddingLeft: '0'
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ 
                      border: 'none',
                      borderBottom: '2px solid #e0e0e0',
                      borderRadius: '0',
                      paddingLeft: '0'
                    }}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    className="form-control form-control-lg"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ 
                      border: 'none',
                      borderBottom: '2px solid #e0e0e0',
                      borderRadius: '0',
                      paddingLeft: '0'
                    }}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-lg px-5"
                  style={{ 
                    backgroundColor: '#0B5FA5',
                    color: 'white',
                    borderRadius: '8px'
                  }}
                >
                  Send now
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="col-lg-6 p-4" style={{ backgroundColor: '#0B5FA5' }}>
              <div className="rounded-4 overflow-hidden h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221550.14076792547!2d31.224894!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Medical Helpline */}
          <div 
            className="rounded-4 p-4 mb-5 d-flex align-items-center justify-content-between flex-wrap"
            style={{ backgroundColor: '#E3F2FD' }}
          >
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#0B5FA5',
                  color: 'white'
                }}
              >
                <i className="bi bi-telephone-fill fs-4"></i>
              </div>
              <div>
                <h5 className="mb-1 fw-bold">Medical Helpline?</h5>
                <p className="mb-0 text-muted">Call our 24/7 help hotline for immediate assistance</p>
              </div>
            </div>
            <a 
              href={`tel:${settings?.contact?.phone || '19888'}`}
              className="btn btn-lg"
              style={{ 
                backgroundColor: '#0B5FA5',
                color: 'white',
                borderRadius: '50px',
                padding: '12px 32px'
              }}
            >
              <i className="bi bi-telephone-fill me-2"></i>
              Call {settings?.contact?.phone || '(555) 123-4567'}
            </a>
          </div>

          {/* Emergency Care Section */}
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: '#0B5FA5' }}>
              When to Seek Emergency Care
            </h2>
          </div>

          <div 
            className="rounded-4 p-5 mb-5"
            style={{ backgroundColor: '#F5F5F5', border: '2px solid #E0E0E0' }}
          >
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>Chest pain or difficulty breathing</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>Severe burns or bleeding</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>Severe allergic reactions</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>Loss of consciousness</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>Major trauma or injuries</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>Severe abdominal pain</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>Signs of stroke or heart attack</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-3 fs-5 mt-1"></i>
                  <span>High fever with confusion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Alert */}
          <div 
            className="rounded-4 p-4 d-flex align-items-center justify-content-between flex-wrap"
            style={{ backgroundColor: '#FFEBEE' }}
          >
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#D32F2F',
                  color: 'white'
                }}
              >
                <i className="bi bi-exclamation-triangle-fill fs-4"></i>
              </div>
              <div>
                <h5 className="mb-1 fw-bold">Medical Emergency?</h5>
                <p className="mb-0 text-muted">Call our 24/7 emergency hotline for immediate assistance</p>
              </div>
            </div>
            <a 
              href="tel:911"
              className="btn btn-lg"
              style={{ 
                backgroundColor: '#D32F2F',
                color: 'white',
                borderRadius: '50px',
                padding: '12px 32px'
              }}
            >
              <i className="bi bi-telephone-fill me-2"></i>
              Call 911
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
