// Patient Dashboard - Patient control panel
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import {
  getPatientAppointments,
  getMedicalHistory,
  getLabTests,
  getPrescriptions
} from '../services/patientService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppointmentCard from '../components/AppointmentCard';
import MedicalHistoryCard from '../components/MedicalHistoryCard';
import LabTestCard from '../components/LabTestCard';
import PrescriptionCard from '../components/PrescriptionCard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const [appts, history, tests, presc] = await Promise.all([
          getPatientAppointments(currentUser.id),
          getMedicalHistory(currentUser.id),
          getLabTests(currentUser.id),
          getPrescriptions(currentUser.id)
        ]);

        setAppointments(appts);
        setMedicalHistory(history);
        setLabTests(tests);
        setPrescriptions(presc);
      }
      setLoading(false);
    };

    loadData();
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

  return (
    <div>
      <Header />

      <section className="py-4 py-md-5 bg-light">
        <div className="container">
          {/* Page Title */}
          <h2 className="mb-4 fs-3 fs-md-2">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </h2>

          {/* Statistics Cards */}
          <div className="row g-3 g-md-4 mb-4">
            {/* Total Appointments */}
            <div className="col-6 col-lg-3">
              <div className="card shadow-sm border-0 bg-primary text-white h-100">
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div className="mb-2 mb-md-0">
                      <h6 className="mb-1 mb-md-2 fs-6 fs-md-5">Total Appointments</h6>
                      <h2 className="mb-0 fs-2 fs-md-1 fw-bold">{appointments.length}</h2>
                    </div>
                    <i className="bi bi-calendar-event fs-1 fs-md-1 opacity-75 d-none d-md-block"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Records */}
            <div className="col-6 col-lg-3">
              <div className="card shadow-sm border-0 bg-success text-white h-100">
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div className="mb-2 mb-md-0">
                      <h6 className="mb-1 mb-md-2 fs-6 fs-md-5">Medical Records</h6>
                      <h2 className="mb-0 fs-2 fs-md-1 fw-bold">{medicalHistory.length}</h2>
                    </div>
                    <i className="bi bi-file-medical fs-1 fs-md-1 opacity-75 d-none d-md-block"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Tests */}
            <div className="col-6 col-lg-3">
              <div className="card shadow-sm border-0 bg-info text-white h-100">
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div className="mb-2 mb-md-0">
                      <h6 className="mb-1 mb-md-2 fs-6 fs-md-5">Lab Tests</h6>
                      <h2 className="mb-0 fs-2 fs-md-1 fw-bold">{labTests.length}</h2>
                    </div>
                    <i className="bi bi-clipboard2-data fs-1 fs-md-1 opacity-75 d-none d-md-block"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="col-6 col-lg-3">
              <div className="card shadow-sm border-0 bg-warning text-white h-100">
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div className="mb-2 mb-md-0">
                      <h6 className="mb-1 mb-md-2 fs-6 fs-md-5">Prescriptions</h6>
                      <h2 className="mb-0 fs-2 fs-md-1 fw-bold">{prescriptions.length}</h2>
                    </div>
                    <i className="bi bi-capsule fs-1 fs-md-1 opacity-75 d-none d-md-block"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation - Responsive */}
          <div className="mb-4">
            <ul className="nav nav-fill flex-column flex-md-row gap-2 gap-md-3" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link d-flex align-items-center justify-content-center py-3 rounded-3 ${
                    activeTab === 'appointments' 
                      ? 'border border-2 border-primary text-primary bg-white fw-semibold' 
                      : 'border border-1 text-muted bg-white'
                  }`}
                  onClick={() => setActiveTab('appointments')}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <i className="bi bi-calendar-event me-2 fs-5"></i>
                  <span className="d-none d-sm-inline">Appointments</span>
                  <span className="d-sm-none">Appts</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link d-flex align-items-center justify-content-center py-3 rounded-3 ${
                    activeTab === 'history' 
                      ? 'border border-2 border-primary text-primary bg-white fw-semibold' 
                      : 'border border-1 text-muted bg-white'
                  }`}
                  onClick={() => setActiveTab('history')}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <i className="bi bi-file-medical me-2 fs-5"></i>
                  <span className="d-none d-sm-inline">Medical History</span>
                  <span className="d-sm-none">History</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link d-flex align-items-center justify-content-center py-3 rounded-3 ${
                    activeTab === 'tests' 
                      ? 'border border-2 border-primary text-primary bg-white fw-semibold' 
                      : 'border border-1 text-muted bg-white'
                  }`}
                  onClick={() => setActiveTab('tests')}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <i className="bi bi-clipboard2-data me-2 fs-5"></i>
                  <span className="d-none d-sm-inline">Lab Tests</span>
                  <span className="d-sm-none">Tests</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link d-flex align-items-center justify-content-center py-3 rounded-3 ${
                    activeTab === 'prescriptions' 
                      ? 'border border-2 border-primary text-primary bg-white fw-semibold' 
                      : 'border border-1 text-muted bg-white'
                  }`}
                  onClick={() => setActiveTab('prescriptions')}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <i className="bi bi-capsule me-2 fs-5"></i>
                  <span className="d-none d-sm-inline">Prescriptions</span>
                  <span className="d-sm-none">Rx</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Appointments Content */}
            {activeTab === 'appointments' && (
              <div>
                {appointments.length > 0 ? (
                  <div className="row g-3">
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="col-12">
                        <AppointmentCard appointment={appointment} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info d-flex align-items-center">
                    <i className="bi bi-info-circle me-2 fs-5"></i>
                    <span>No appointments currently</span>
                  </div>
                )}
              </div>
            )}

            {/* Medical History Content */}
            {activeTab === 'history' && (
              <div>
                {medicalHistory.length > 0 ? (
                  <div className="row g-3">
                    {medicalHistory.map(record => (
                      <div key={record.id} className="col-12">
                        <MedicalHistoryCard record={record} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info d-flex align-items-center">
                    <i className="bi bi-info-circle me-2 fs-5"></i>
                    <span>No medical history currently</span>
                  </div>
                )}
              </div>
            )}

            {/* Lab Tests Content */}
            {activeTab === 'tests' && (
              <div>
                {labTests.length > 0 ? (
                  <div className="row g-3">
                    {labTests.map(test => (
                      <div key={test.id} className="col-12">
                        <LabTestCard test={test} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info d-flex align-items-center">
                    <i className="bi bi-info-circle me-2 fs-5"></i>
                    <span>No lab tests currently</span>
                  </div>
                )}
              </div>
            )}

            {/* Prescriptions Content */}
            {activeTab === 'prescriptions' && (
              <div>
                {prescriptions.length > 0 ? (
                  <div className="row g-3">
                    {prescriptions.map(prescription => (
                      <div key={prescription.id} className="col-12">
                        <PrescriptionCard prescription={prescription} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info d-flex align-items-center">
                    <i className="bi bi-info-circle me-2 fs-5"></i>
                    <span>No prescriptions currently</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;