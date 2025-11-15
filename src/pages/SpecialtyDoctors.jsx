// Specialty Doctors Page - صفحة أطباء تخصص معين
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SpecialtyDoctors = () => {
  const { id } = useParams(); // جلب id من URL
  const [specialty, setSpecialty] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب معلومات التخصص
    fetch('/data/specialties.json')
      .then(response => response.json())
      .then(data => {
        const foundSpecialty = data.find(s => s.id === parseInt(id));
        setSpecialty(foundSpecialty);
      });

    // جلب الأطباء الخاصين بهذا التخصص
    fetch('/data/doctors.json')
      .then(response => response.json())
      .then(data => {
        // تصفية الأطباء حسب التخصص
        const specialtyDoctors = data.filter(
          doctor => doctor.specialtyId === parseInt(id)
        );
        setDoctors(specialtyDoctors);
        setLoading(false);
      })
      .catch(error => {
        console.error('خطأ في جلب الأطباء:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <section className="hero-section">
        <div className="container">
          <h1>{specialty?.nameAr || 'التخصص'}</h1>
          <p>{specialty?.descriptionAr}</p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">الأطباء المتاحين</h2>
          
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          ) : doctors.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              لا توجد أطباء متاحين في هذا التخصص حالياً
            </div>
          ) : (
            <div className="row g-4">
              {doctors.map(doctor => (
                <div key={doctor.id} className="col-md-6 col-lg-4">
                  <div className="card doctor-card">
                    <img 
                      src={doctor.image} 
                      className="doctor-image" 
                      alt={doctor.nameAr}
                    />
                    <div className="doctor-info">
                      <h5 className="mb-2">{doctor.nameAr}</h5>
                      <p className="text-muted mb-2">
                        <i className="bi bi-hospital me-1"></i>
                        {doctor.specialtyAr}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="doctor-rating">
                          <i className="bi bi-star-fill"></i>
                          {doctor.rating}
                        </span>
                        <span className="text-muted">
                          <i className="bi bi-briefcase me-1"></i>
                          {doctor.experience} سنة خبرة
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-primary fs-5">
                          {doctor.price} جنيه
                        </span>
                        <Link 
                          to={`/booking/${doctor.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          احجز الآن
                        </Link>
                      </div>
                    </div>
                  </div>
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

export default SpecialtyDoctors;
