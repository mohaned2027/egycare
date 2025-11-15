// Specialties Page - صفحة جميع التخصصات
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب جميع التخصصات
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

  const getSpecialtyIcon = (icon) => {
    const icons = {
      heart: 'bi-heart-pulse',
      droplet: 'bi-droplet',
      baby: 'bi-emoji-smile',
      bone: 'bi-award',
      brain: 'bi-lightning',
      eye: 'bi-eye'
    };
    return icons[icon] || 'bi-hospital';
  };

  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <section className="hero-section">
        <div className="container">
          <h1>جميع التخصصات الطبية</h1>
          <p>اختر التخصص المناسب لك</p>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-5">
        <div className="container">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {specialties.map(specialty => (
                <div key={specialty.id} className="col-md-4 col-lg-3">
                  <Link 
                    to={`/specialty/${specialty.id}`} 
                    className="text-decoration-none"
                  >
                    <div className="card specialty-card">
                      <div className="card-body">
                        <i className={`bi ${getSpecialtyIcon(specialty.icon)} specialty-icon`}></i>
                        <h5 className="card-title">{specialty.nameAr}</h5>
                        <p className="card-text text-muted small">
                          {specialty.descriptionAr}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Specialties;
