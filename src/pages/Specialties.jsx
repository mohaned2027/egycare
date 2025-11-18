// Specialties Page - New Professional Design
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    Promise.all([
      fetch('/data/specialties.json').then(res => res.json()),
      fetch('/data/doctors.json').then(res => res.json())
    ])
    .then(([specialtiesData, doctorsData]) => {
      setSpecialties(specialtiesData);
      setDoctors(doctorsData);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error loading data:', error);
      setLoading(false);
    });
  }, []);

  const getDoctorCount = (specialtyId) => {
    return doctors.filter(doc => doc.specialtyId === specialtyId).length;
  };

  const getSpecialtyIcon = (icon, id) => {
    const iconMap = {
      heart: { icon: 'bi-heart-pulse', color: 'icon-red' },
      droplet: { icon: 'bi-droplet', color: 'icon-blue' },
      baby: { icon: 'bi-emoji-smile', color: 'icon-yellow' },
      bone: { icon: 'bi-award', color: 'icon-orange' },
      brain: { icon: 'bi-lightning', color: 'icon-purple' },
      eye: { icon: 'bi-eye', color: 'icon-green' }
    };

    const colors = ['icon-blue', 'icon-red', 'icon-purple', 'icon-green', 'icon-yellow', 'icon-orange', 'icon-pink', 'icon-teal', 'icon-indigo', 'icon-cyan'];
    const colorIndex = id % colors.length;

    return iconMap[icon] || { icon: 'bi-hospital', color: colors[colorIndex] };
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSpecialties = specialties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(specialties.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Header />

      <section className="hero-section" style={{ padding: '3rem 0', minHeight: 'auto' }}>
        <div className="container">
          <h1>Choose Medical Specialty</h1>
          <p className="mb-4">Book a New Appointment</p>

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
              <span className="progress-label d-none d-md-inline">Choose Doctor</span>
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

      <section className="py-5 bg-light-egycare">
        <div className="container">
          <h2 className="section-title mb-5">All Medical Specialties</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {currentSpecialties.map(specialty => {
                  const iconInfo = getSpecialtyIcon(specialty.icon, specialty.id);
                  const doctorCount = getDoctorCount(specialty.id);

                  return (
                    <div key={specialty.id} className="col-md-4 col-lg-3 col-6">
                      <Link to={`/specialty/${specialty.id}`} className="specialty-card">

                        <div className={`specialty-card-icon ${iconInfo.color}`}>
                          <i className={`bi ${iconInfo.icon}`}></i>
                        </div>

                        <h5>{specialty.name}</h5>
                        <p className="text-muted small">{specialty.nameAr}</p>

                        <span className="badge bg-light text-dark">
                          {doctorCount} Doctors Available
                        </span>

                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Specialties pagination" className="mt-5">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              )}

              <div className="d-flex justify-content-between mt-4">
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Home
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
