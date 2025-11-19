import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  if (!appointment) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger">
            No appointment data found. Please go back and try again.
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go to Home
          </button>
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
              <div className="card shadow">
                <div className="card-header bg-success text-white text-center">
                  <h3 className="mb-0">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Booking Confirmed!
                  </h3>
                </div>
                <div className="card-body">
                  <div className="text-center mb-4">
                    <i className="bi bi-receipt fs-1 text-success mb-3"></i>
                    <h4>Appointment Invoice</h4>
                    <p className="text-muted">Your booking has been successfully confirmed</p>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <h5>Appointment Details</h5>
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><strong>Appointment ID:</strong></td>
                            <td>{appointment.id}</td>
                          </tr>
                          <tr>
                            <td><strong>Doctor:</strong></td>
                            <td>{appointment.doctorName}</td>
                          </tr>
                          <tr>
                            <td><strong>Specialty:</strong></td>
                            <td>{appointment.specialty}</td>
                          </tr>
                          <tr>
                            <td><strong>Date:</strong></td>
                            <td>{appointment.day}</td>
                          </tr>
                          <tr>
                            <td><strong>Time:</strong></td>
                            <td>{appointment.time}</td>
                          </tr>
                          <tr>
                            <td><strong>Status:</strong></td>
                            <td>
                              <span className="badge bg-warning">{appointment.status}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <h5>Patient Information</h5>
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><strong>Name:</strong></td>
                            <td>{appointment.patientName}</td>
                          </tr>
                          <tr>
                            <td><strong>Phone:</strong></td>
                            <td>{appointment.patientPhone}</td>
                          </tr>
                          <tr>
                            <td><strong>Email:</strong></td>
                            <td>{appointment.patientEmail || 'N/A'}</td>
                          </tr>
                          <tr>
                            <td><strong>Notes:</strong></td>
                            <td>{appointment.notes || 'None'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-md-6">
                      <h5>Payment Summary</h5>
                      <div className="d-flex justify-content-between">
                        <span>Consultation Fee:</span>
                        <span className="fw-bold">{appointment.price} EGP</span>
                      </div>
                    </div>
                    <div className="col-md-6 text-end">
                      <h5>Total Amount</h5>
                      <p className="fs-4 fw-bold text-primary mb-0">{appointment.price} EGP</p>
                    </div>
                  </div>

                  <hr />

                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Important:</strong> Please arrive 15 minutes before your appointment time.
                    You will receive a confirmation SMS and email shortly.
                  </div>

                  <div className="text-center">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => navigate('/dashboard')}
                    >
                      <i className="bi bi-calendar-check me-1"></i>
                      View My Appointments
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/')}
                    >
                      <i className="bi bi-house me-1"></i>
                      Back to Home
                    </button>
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

export default Confirm;
