// Profile Page - Personal profile page
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { getPatientData } from '../services/patientService';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatientData = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const patientData = await getPatientData(currentUser.id);
        setPatient(patientData);
      }
      setLoading(false);
    };

    loadPatientData();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!patient) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger">
            Patient data not found
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Profile Picture and Name */}
              <div className="card shadow-sm mb-4">
                <div className="card-body text-center py-4">
                  <img
                    src={patient.profileImage}
                    alt={patient.name}
                    className="rounded-circle mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                  <h3 className="mb-1">{patient.name}</h3>
                  <p className="text-muted mb-0">
                    <i className="bi bi-envelope me-2"></i>
                    {patient.email}
                  </p>
                  <p className="text-muted">
                    <i className="bi bi-telephone me-2"></i>
                    {patient.phone}
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="card shadow-sm mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Personal Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="text-muted small">Age</label>
                      <p className="fw-bold">{patient.age} years</p>
                    </div>
                    <div className="col-md-6">
                      <label className="text-muted small">Gender</label>
                      <p className="fw-bold">
                        {patient.gender === 'male' ? 'Male' : 'Female'}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="text-muted small">Blood Type</label>
                      <p className="fw-bold">{patient.bloodType}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="text-muted small">National ID</label>
                      <p className="fw-bold">{patient.nationalId}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-muted small">Address</label>
                    <p className="fw-bold">{patient.address}</p>
                  </div>

                  <div className="mb-0">
                    <label className="text-muted small">Chronic Disease</label>
                    {patient.hasChronicDisease ? (
                      <div className="alert alert-warning d-flex align-items-center mb-0">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <span className="fw-bold">{patient.chronicDisease}</span>
                      </div>
                    ) : (
                      <div className="alert alert-success d-flex align-items-center mb-0">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <span className="fw-bold">No chronic disease</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
