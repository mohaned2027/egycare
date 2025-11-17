// Specialties Page - New Professional Design
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/specialties.json')
      .then(response => response.json())
      .then(data => {
        setSpecialties(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('خطأ في جلب التخصصات:', error);
        setLoading(false);
      });
  }, []);

  const getSpecialtyIcon = (icon, id) => {
    const iconMap = {
      heart: { icon: 'bi-heart-pulse', color: 'icon-red' },
      droplet: { icon: 'bi-droplet', color: 'icon-blue' },
      baby: { icon: 'bi-emoji-smile', color: 'icon-yellow' },
      bone: { icon: 'bi-award', color: 'icon-orange' },
      brain: { icon: 'bi-lightning', color: 'icon-purple' },
      eye: { icon: 'bi-eye', color: 'icon-green' }
    };

    // Fallback color rotation if no match
    const colors = ['icon-blue', 'icon-red', 'icon-purple', 'icon-green', 'icon-yellow', 'icon-orange', 'icon-pink', 'icon-teal', 'icon-indigo', 'icon-cyan'];
    const colorIndex = id % colors.length;

    return iconMap[icon] || { icon: 'bi-hospital', color: colors[colorIndex] };
  };

  return (
    <div>
      <Header />

      {/* Page Header with Progress Indicator */}
      <section className="hero-section" style={{ padding: '3rem 0', minHeight: 'auto' }}>
        <div className="container">
          <h1 className="mb-3">Choose Medical Specialty</h1>
          <p className="mb-4">Book a New Appointment</p>

          {/* Progress Steps */}
          <div className="booking-progress">
            <div className="progress-step active">
              <div className="progress-circle">
                <i className="bi bi-check"></i>
              </div>
              <span className="progress-label d-none d-md-inline">Select specialty</span>
            </div>
            <div style={{ width: '60px', height: '2px', background: '#E5E7EB' }}></div>
            <div className="progress-step">
              <div className="progress-circle">2</div>
              <span className="progress-label d-none d-md-inline">Select a Doctor</span>
            </div>
            <div style={{ width: '60px', height: '2px', background: '#E5E7EB' }}></div>
            <div className="progress-step">
              <div className="progress-circle">3</div>
              <span className="progress-label d-none d-md-inline">Choose Date/Time</span>
            </div>
            <div style={{ width: '60px', height: '2px', background: '#E5E7EB' }}></div>
            <div className="progress-step">
              <div className="progress-circle">4</div>
              <span className="progress-label d-none d-md-inline">Confirm Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* All Medical Specialties Title */}
      <section className="py-5 bg-light-egycare">
        <div className="container">
          <h2 className="section-title mb-5">All Medical Specialties</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {specialties.map(specialty => {
                  const iconInfo = getSpecialtyIcon(specialty.icon, specialty.id);
                  return (
                    <div key={specialty.id} className="col-md-4 col-lg-3 col-6">
                      <Link
                        to={`/specialty/${specialty.id}`}
                        className="specialty-card"
                      >
                        <div className={`specialty-card-icon ${iconInfo.color}`}>
                          <i className={`bi ${iconInfo.icon}`}></i>
                        </div>
                        <h5>{specialty.name}</h5>
                        <p className="text-muted small">{specialty.nameAr}</p>
                        <span className="badge bg-light text-dark">
                          {specialty.doctorCount || Math.floor(Math.random() * 20) + 1} Doctors Available
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-5">
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-right me-2"></i>
                  Previous
                </Link>
                <Link to="/specialties" className="btn btn-primary">
                  Next
                  <i className="bi bi-arrow-left ms-2"></i>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Specialties;
