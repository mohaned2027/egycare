// Home Page - Main landing page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/data/specialties.json').then(res => res.json()),
      fetch('/data/doctors.json').then(res => res.json())
    ])
      .then(([specialtiesData, doctorsData]) => {
        setSpecialties(specialtiesData.slice(0, 6)); // First 6 specialties
        setDoctors(doctorsData);
        setLoading(false);
        setFilteredDoctors(doctorsData); // Show all doctors initially
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const getDoctorCount = (specialtyId) => {
    return doctors.filter(doc => doc.specialtyId === specialtyId).length;
  };

  const getSpecialtyIcon = (icon) => {
    const icons = {
      heart: { icon: 'bi-heart-pulse', color: 'icon-red' },
      droplet: { icon: 'bi-droplet', color: 'icon-blue' },
      baby: { icon: 'bi-emoji-smile', color: 'icon-yellow' },
      bone: { icon: 'bi-award', color: 'icon-orange' },
      brain: { icon: 'bi-lightning', color: 'icon-purple' },
      eye: { icon: 'bi-eye', color: 'icon-green' }
    };
    return icons[icon] || { icon: 'bi-hospital', color: 'icon-blue' };
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    setSelectedSpecialty(value);

    if (value === "") {
      setFilteredDoctors(doctors); // لو لم يتم اختيار تخصص → كل الدكاترة
    } else {
      const filtered = doctors.filter(doc => doc.specialtyId === Number(value));
      setFilteredDoctors(filtered);
    }
  };

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-lg-start text-center">
              <h1 className="mb-4">
                Advanced and Safe <br/>
                <span style={{ color: '#00D4FF' }}>Healthcare</span>
              </h1>
              <p className="mb-4">
                Book medical appointments and manage your medical history quickly, safely, and efficiently with the best certified doctors in Egypt
              </p>
              <div className="d-flex gap-3 justify-content-lg-start justify-content-center">
                <Link to="/specialties" className="btn btn-light btn-lg">
                  Book  Now
                </Link>
                <Link to="/dashboard" className="btn btn-outline-primary btn-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'white', color: 'white' }}>
                  Dashboard
                </Link>
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              {/* Quick Search Card */}
              <div className="quick-search-card">
                <h3>Quick Search</h3>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Choose Specialty</label>
                    <select className="form-select" onChange={handleSpecialtyChange}>
                      <option value="">Choose Specialty</option>
                      {specialties.map((specialty) => (
                      <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Choose Doctor</label>
                    <select className="form-select">
                      <option value="">Choose Doctor</option>
                      {filteredDoctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Choose Governorate</label>
                    <select className="form-select">
                      <option value="">Choose Governorate</option>
                      <option value="cairo">Cairo</option>
                      <option value="giza">Giza</option>
                      <option value="alex">Alexandria</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Choose Date</label>
                    <input type="date" className="form-control" />
                  </div>

                  <Link to="/specialties" className="btn btn-primary w-100">
                    <i className="bi bi-search me-2"></i>
                    Search for Doctor
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why EgyCare Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title">Why EgyCare?</h2>
          <p className="section-subtitle">
            We provide you with a comprehensive medical experience using the latest technologies and highest quality standards
          </p>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <h4>Available 24/7</h4>
                <p>Service available around the clock for your convenience</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <h4>Quick & Easy Booking</h4>
                <p>Book your appointment in simple steps</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h4>Secure Medical History</h4>
                <p>Safe management of medical records and history</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-patch-check"></i>
                </div>
                <h4>Certified Doctors</h4>
                <p>Network of the best qualified doctors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Specialties Section */}
      <section className="py-5 bg-light-egycare">
        <div className="container">
          <h2 className="section-title">Medical Specialties</h2>
          <p className="section-subtitle">Book with the best doctors in all specialties</p>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {specialties.map(specialty => {
                const iconInfo = getSpecialtyIcon(specialty.icon);
                const doctorCount = getDoctorCount(specialty.id);

                return (
                  <div key={specialty.id} className="col-md-4 col-lg-2 col-6">
                    <Link to={`/specialty/${specialty.id}`} className="specialty-card">
                      <div className={`specialty-card-icon ${iconInfo.color}`}>
                        <i className={`bi ${iconInfo.icon}`}></i>
                      </div>
                      <h5>{specialty.name}</h5>
                      <p className="small mb-0">{specialty.description}</p>
                      <span className="badge bg-light text-dark mt-2">
                        {doctorCount} doctor
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/specialties" className="btn btn-outline-primary btn-lg">
              View All Specialties
            </Link>
          </div>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title">Our Patients' Reviews</h2>
          <p className="section-subtitle">What our patients say about their experience with us</p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="review-card">
                <div className="review-header">
                  <div className="review-avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div>
                    <h5 className="mb-0">Ahmed Mohamed</h5>
                    <div className="review-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                </div>
                <p className="review-text">
                  "EgyCare made booking my appointment so easy. The doctor was excellent and the platform is very user-friendly. Highly recommended!"
                </p>
                <small className="text-muted">2 weeks ago</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="review-card">
                <div className="review-header">
                  <div className="review-avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div>
                    <h5 className="mb-0">Fatima Hassan</h5>
                    <div className="review-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                  </div>
                </div>
                <p className="review-text">
                  "Great service! I was able to find a specialist quickly and the booking process was smooth. The medical history feature is very helpful."
                </p>
                <small className="text-muted">1 month ago</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="review-card">
                <div className="review-header">
                  <div className="review-avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div>
                    <h5 className="mb-0">Omar Ali</h5>
                    <div className="review-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                  </div>
                </div>
                <p className="review-text">
                  "Excellent platform for healthcare management. The doctors are certified and the service is available 24/7. Very satisfied with my experience."
                </p>
                <small className="text-muted">3 weeks ago</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light-egycare">
        <div className="container text-center">
          <h2 className="section-title">Start Your Health Journey Today</h2>
          <p className="section-subtitle">
            Join thousands of patients who trust EgyCare for their healthcare
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/specialties" className="btn btn-primary btn-lg">Book Your First Appointment</Link>
            <Link to="/contact" className="btn btn-outline-primary btn-lg">Find Emergency Care</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
