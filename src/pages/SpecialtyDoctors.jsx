// Specialty Doctors Page - Doctors of a specific specialty
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SpecialtyDoctors = () => {
  const { id } = useParams(); // Get id from URL
  const [specialty, setSpecialty] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch specialty information
    fetch('/data/specialties.json')
      .then(response => response.json())
      .then(data => {
        const foundSpecialty = data.find(s => s.id === parseInt(id));
        setSpecialty(foundSpecialty);
      });

    // Fetch doctors for this specialty
    fetch('/data/doctors.json')
      .then(response => response.json())
      .then(data => {
        // Filter doctors by specialty
        const specialtyDoctors = data.filter(
          doctor => doctor.specialtyId === parseInt(id)
        );
        setDoctors(specialtyDoctors);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Header />

      {/* Page Header */}
      <section className="hero-section">
        <div className="container">
          <h1>{specialty?.nameAr || 'Specialty'}</h1>
          <p>{specialty?.descriptionAr}</p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Available Doctors</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : doctors.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              No doctors are currently available in this specialty
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
                          {doctor.experience} years experience
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-primary fs-5">
                          {doctor.price} EGP
                        </span>
                        <Link
                          to={`/booking/${doctor.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Book Now
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
