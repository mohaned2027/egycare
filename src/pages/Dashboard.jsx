// Patient Dashboard - لوحة تحكم المريض
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
            <span className="visually-hidden">جاري التحميل...</span>
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
            لوحة التحكم
          </h2>

          {/* الإحصائيات */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-white-50 mb-1">الروشتات</h6>
                      <h3 className="mb-0">{prescriptions.length}</h3>
                    </div>
                    <i className="bi bi-prescription2" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-white-50 mb-1">التحاليل</h6>
                      <h3 className="mb-0">{labTests.length}</h3>
                    </div>
                    <i className="bi bi-clipboard2-data" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-white-50 mb-1">التاريخ المرضي</h6>
                      <h3 className="mb-0">{medicalHistory.length}</h3>
                    </div>
                    <i className="bi bi-file-medical" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-white-50 mb-1">المواعيد القادمة</h6>
                      <h3 className="mb-0">
                        {appointments.filter(a => a.status === 'confirmed').length}
                      </h3>
                    </div>
                    <i className="bi bi-calendar-check" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('appointments')}
                  >
                    <i className="bi bi-calendar-event me-2"></i>
                    المواعيد
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                  >
                    <i className="bi bi-file-medical me-2"></i>
                    التاريخ المرضي
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tests')}
                  >
                    <i className="bi bi-clipboard2-data me-2"></i>
                    التحاليل
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'prescriptions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('prescriptions')}
                  >
                    <i className="bi bi-prescription2 me-2"></i>
                    الروشتات
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {/* محتوى Appointments */}
              {activeTab === 'appointments' && (
                <div>
                  {appointments.length > 0 ? (
                    appointments.map(appointment => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  ) : (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      لا توجد مواعيد حالياً
                    </div>
                  )}
                </div>
              )}

              {/* محتوى Medical History */}
              {activeTab === 'history' && (
                <div>
                  {medicalHistory.length > 0 ? (
                    medicalHistory.map(record => (
                      <MedicalHistoryCard key={record.id} record={record} />
                    ))
                  ) : (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      لا يوجد تاريخ مرضي حالياً
                    </div>
                  )}
                </div>
              )}

              {/* محتوى Lab Tests */}
              {activeTab === 'tests' && (
                <div>
                  {labTests.length > 0 ? (
                    labTests.map(test => (
                      <LabTestCard key={test.id} test={test} />
                    ))
                  ) : (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      لا توجد تحاليل حالياً
                    </div>
                  )}
                </div>
              )}

              {/* محتوى Prescriptions */}
              {activeTab === 'prescriptions' && (
                <div>
                  {prescriptions.length > 0 ? (
                    prescriptions.map(prescription => (
                      <PrescriptionCard key={prescription.id} prescription={prescription} />
                    ))
                  ) : (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      لا توجد روشتات حالياً
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
