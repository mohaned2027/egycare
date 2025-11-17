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

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </h2>

          {/* Statistics */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Total Appointments</h6>
                      <h2 className="mb-0">{appointments.length}</h2>
                    </div>
                    <i className="bi bi-calendar-event fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Medical Records</h6>
                      <h2 className="mb-0">{medicalHistory.length}</h2>
                    </div>
                    <i className="bi bi-file-medical fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Lab Tests</h6>
                      <h2 className="mb-0">{labTests.length}</h2>
                    </div>
                    <i className="bi bi-clipboard2-data fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Prescriptions</h6>
                      <h2 className="mb-0">{prescriptions.length}</h2>
                    </div>
                    <i className="bi bi-capsule fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`}
                onClick={() => setActiveTab('appointments')}
              >
                <i className="bi bi-calendar-event me-2"></i>
                Appointments
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <i className="bi bi-file-medical me-2"></i>
                Medical History
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
                onClick={() => setActiveTab('tests')}
              >
                <i className="bi bi-clipboard2-data me-2"></i>
                Lab Tests
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'prescriptions' ? 'active' : ''}`}
                onClick={() => setActiveTab('prescriptions')}
              >
                <i className="bi bi-capsule me-2"></i>
                Prescriptions
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content mt-4">
            {/* Appointments Content */}
            {activeTab === 'appointments' && (
              <div>
                {appointments.length > 0 ? (
                  appointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    No appointments currently
                  </div>
                )}
              </div>
            )}

            {/* Medical History Content */}
            {activeTab === 'history' && (
              <div>
                {medicalHistory.length > 0 ? (
                  medicalHistory.map(record => (
                    <MedicalHistoryCard key={record.id} record={record} />
                  ))
                ) : (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    No medical history currently
                  </div>
                )}
              </div>
            )}

            {/* Lab Tests Content */}
            {activeTab === 'tests' && (
              <div>
                {labTests.length > 0 ? (
                  labTests.map(test => (
                    <LabTestCard key={test.id} test={test} />
                  ))
                ) : (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    No lab tests currently
                  </div>
                )}
              </div>
            )}

            {/* Prescriptions Content */}
            {activeTab === 'prescriptions' && (
              <div>
                {prescriptions.length > 0 ? (
                  prescriptions.map(prescription => (
                    <PrescriptionCard key={prescription.id} prescription={prescription} />
                  ))
                ) : (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    No prescriptions currently
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
