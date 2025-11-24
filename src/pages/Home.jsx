// Home Page - Main landing page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [features, setFeatures] = useState([]);
  const [aboutData, setAboutData] = useState(null);

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch('/data/specialties.json').then(res => res.json()),
      fetch('/data/doctors.json').then(res => res.json()),
      fetch('/data/reviews.json').then(res => res.json()),
      fetch('/data/settings.json').then(res => res.json()),
      fetch('/data/about.json').then(res => res.json())
    ])
      .then(([specialtiesData, doctorsData, reviewsData, settingsData, aboutDataFetched]) => {
        setSpecialties(specialtiesData.slice(0, 6));
        setDoctors(doctorsData);
        setReviews(reviewsData);
        setFeatures(settingsData.features || []);
        setAboutData(aboutDataFetched);
        setLoading(false);
        setFilteredDoctors(doctorsData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Auto-slide reviews
  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [reviews]);

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
    setSelectedDoctor("");

    if (value === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doc => doc.specialtyId === Number(value));
      setFilteredDoctors(filtered);
    }
  };

  const handleSearch = () => {
    if (selectedDoctor) {
      window.location.href = `/booking/${selectedDoctor}`;
    } else if (selectedSpecialty) {
      window.location.href = `/specialty/${selectedSpecialty}`;
    } else {
      window.location.href = '/specialties';
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
              <span className='egp'>The leading healthcare platform in Egypt</span>
              <h1 className="mb-4">
                Advanced and Safe <br/>
                <span style={{ color: '#00D4FF' }}>Healthcare</span>
              </h1>
              <p className="mb-4 hero-text">
                Book medical appointments and manage your medical history quickly, safely, and efficiently with the best certified doctors in Egypt
              </p>
              <div className="d-flex gap-3 justify-content-lg-start justify-content-center">
                <Link to="/specialties" className="btn btn-light btn-lg change-btn">
                  Book Your Appointment Now
                </Link>
                <Link to="/dashboard" className="btn btn-outline-primary btn-lg change-btn btn-k" style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'white', color: 'white' }}>
                 Patient Dashboard
                </Link>
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              {/* Quick Search Card */}
              <div className="quick-search-card">
                <h3>Quick Search</h3>
                <form>
                  <div className="mb-1">
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

                  <div className="mb-5">
                    <label className="form-label">Choose Doctor</label>
                    <select
                      className="form-select"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                      <option value="">Choose Doctor</option>
                      {filteredDoctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                  </div>
{/* 
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
                  </div> */}

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="btn btn-primary w-100"
                  >
                    <i className="bi bi-search me-2"></i>
                    Search
                  </button>
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
            {features.map((feature, index) => (
              <div key={index} className="col-md-3 col-12">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
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
            <div className="CARD">
            <div className="row g-4 ">
              {specialties.map(specialty => {
                const iconInfo = getSpecialtyIcon(specialty.icon);
                const doctorCount = getDoctorCount(specialty.id);

                return (
                  <div key={specialty.id} className="col-md-4 col-lg-2 col-12">
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
          <div className="reviews-carousel">
            {reviews.map((review, index) => {
              const fullStars = Math.floor(review.rating);
              const hasHalfStar = review.rating % 1 !== 0;
              const isCenter = index === currentReviewIndex;
              const isLeft = index === (currentReviewIndex - 1 + reviews.length) % reviews.length;
              const isRight = index === (currentReviewIndex + 1) % reviews.length;

              let transformStyle = {};
              let opacity = 0.5;
              let scale = 0.8;

              if (isCenter) {
                transformStyle = { transform: 'translateX(0) scale(1)', zIndex: 10 };
                opacity = 1;
                scale = 1;
              } else if (isLeft) {
                transformStyle = { transform: 'translateX(-70%) scale(0.8)', zIndex: 5 };
                opacity = 0.7;
                scale = 0.8;
              } else if (isRight) {
                transformStyle = { transform: 'translateX(70%) scale(0.8)', zIndex: 5 };
                opacity = 0.7;
                scale = 0.8;
              } else {
                transformStyle = { transform: 'translateX(0) scale(0.6)', zIndex: 1 };
                opacity = 0.3;
                scale = 0.6;
              }

              return (
                <div
                  key={review.id}
                  className="review-card-carousel"
                  style={{
                    ...transformStyle,
                    opacity,
                    transition: 'all 0.5s ease-in-out',
                  }}
                >
                  <div className="review-card">
                    <div className="review-header">
                      <div className="review-avatar">
                        <i className="bi bi-person-circle"></i>
                      </div>
                      <div>
                        <h5 className="mb-0">{review.name}</h5>
                        <div className="review-stars">
                          {[...Array(fullStars)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                          {hasHalfStar && <i className="bi bi-star-half"></i>}
                          {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
                            <i key={i} className="bi bi-star"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="review-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: scale < 1 ? 'nowrap' : 'normal' }}>
                      "{review.text}"
                    </p>
                    <small className="text-muted">{review.time}</small>
                  </div>
                </div>
              );
            })}
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
