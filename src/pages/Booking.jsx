// Booking Page - Appointment booking page
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpecialtyProgress from '../components/SpecialtyProgress';

const Booking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(3);

  // Fetch doctor information
  useEffect(() => {
    fetch('/data/doctors.json')
      .then(response => response.json())
      .then(data => {
        const foundDoctor = data.find(d => d.id === parseInt(doctorId));
        setDoctor(foundDoctor);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctor information:', error);
        setLoading(false);
      });
  }, [doctorId]);

  // Booking function
  const handleBooking = (e) => {
    e.preventDefault();

    // Validate data
    if (!selectedDay || !selectedTime || !patientName || !patientPhone) {
      alert('Please fill in all required fields');
      return;
    }

    // Create appointment object
    const appointment = {
      id: Date.now(), // Use timestamp as ID
      doctorId: doctor.id,
      doctorName: doctor.nameAr,
      specialty: doctor.specialtyAr,
      patientName,
      patientPhone,
      patientEmail,
      day: selectedDay,
      time: selectedTime,
      notes,
      price: doctor.price,
      status: 'pending', // Pending
      createdAt: new Date().toISOString()
    };

    // Save appointment to localStorage (instead of real database)
    const existingAppointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    );
    existingAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    // Navigate to confirmation page
    navigate('/confirm', { state: { appointment } });
  };

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

  if (!doctor) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger">
            Doctor not found
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
         <SpecialtyProgress step={step} />

      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Doctor Information */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={doctor.image}
                    alt={doctor.nameAr}
                    className="rounded-circle mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="mb-2">{doctor.nameAr}</h5>
                  <p className="text-muted mb-2">{doctor.specialtyAr}</p>
                  <div className="d-flex justify-content-center align-items-center mb-2">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <span>{doctor.rating}</span>
                  </div>
                  <p className="text-primary fw-bold fs-5 mb-0">{doctor.price} EGP</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h3 className="mb-4">Book Appointment</h3>
                  <form onSubmit={handleBooking}>
                    {/* Patient Information */}
                    <h5 className="mb-3">Patient Information</h5>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Email (Optional)</label>
                      <input
                        type="email"
                        className="form-control"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                      />
                    </div>

                    {/* Appointment Details */}
                    <h5 className="mb-3">Appointment Details</h5>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">Day *</label>
                        <select
                          className="form-select"
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(e.target.value)}
                          required
                        >
                          <option value="">Select day</option>
                          {doctor.availableDays.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Time *</label>
                        <select
                          className="form-select"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          required
                        >
                          <option value="">Select time</option>
                          {doctor.availableTimes.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <label className="form-label">Additional Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any additional information you would like to share..."
                      ></textarea>
                    </div>

                    {/* Booking Button */}
                    <button type="submit" className="btn btn-primary btn-lg w-100">
                      <i className="bi bi-check-circle me-2"></i>
                      Confirm Booking
                    </button>
                  </form>
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

export default Booking;
