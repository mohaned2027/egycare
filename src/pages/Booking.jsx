// Booking Page - صفحة حجز الموعد
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  // جلب معلومات الدكتور
  useEffect(() => {
    fetch('/data/doctors.json')
      .then(response => response.json())
      .then(data => {
        const foundDoctor = data.find(d => d.id === parseInt(doctorId));
        setDoctor(foundDoctor);
        setLoading(false);
      })
      .catch(error => {
        console.error('خطأ في جلب معلومات الدكتور:', error);
        setLoading(false);
      });
  }, [doctorId]);

  // دالة الحجز
  const handleBooking = (e) => {
    e.preventDefault();

    // التحقق من البيانات
    if (!selectedDay || !selectedTime || !patientName || !patientPhone) {
      alert('برجاء ملء جميع البيانات المطلوبة');
      return;
    }

    // إنشاء كائن الحجز
    const appointment = {
      id: Date.now(), // استخدام timestamp كـ ID
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
      status: 'pending', // قيد الانتظار
      createdAt: new Date().toISOString()
    };

    // حفظ الحجز في localStorage (بدلاً من database حقيقي)
    const existingAppointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    );
    existingAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    // رسالة نجاح
    alert('تم الحجز بنجاح! سيتم التواصل معك قريباً');
    
    // الانتقال للصفحة الرئيسية
    navigate('/');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger">
            لم يتم العثور على معلومات الطبيب
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">حجز موعد</h2>
          
          <div className="row">
            {/* معلومات الدكتور */}
            <div className="col-lg-4 mb-4">
              <div className="card">
                <img 
                  src={doctor.image} 
                  className="card-img-top" 
                  alt={doctor.nameAr}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.nameAr}</h5>
                  <p className="text-muted">{doctor.specialtyAr}</p>
                  <div className="mb-2">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    {doctor.rating}
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-briefcase me-1"></i>
                    {doctor.experience} سنة خبرة
                  </div>
                  <div className="fs-4 fw-bold text-primary">
                    {doctor.price} جنيه
                  </div>
                </div>
              </div>
            </div>

            {/* نموذج الحجز */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleBooking}>
                    {/* بيانات المريض */}
                    <h5 className="mb-3">بيانات المريض</h5>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">الاسم *</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">رقم الهاتف *</label>
                        <input 
                          type="tel" 
                          className="form-control"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                      />
                    </div>

                    {/* اختيار اليوم والوقت */}
                    <h5 className="mb-3 mt-4">اختر الموعد</h5>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">اليوم *</label>
                        <select 
                          className="form-select"
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(e.target.value)}
                          required
                        >
                          <option value="">اختر اليوم</option>
                          {doctor.availableDays.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">الوقت *</label>
                        <select 
                          className="form-select"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          required
                        >
                          <option value="">اختر الوقت</option>
                          {doctor.availableTimes.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* ملاحظات */}
                    <div className="mb-4">
                      <label className="form-label">ملاحظات إضافية</label>
                      <textarea 
                        className="form-control" 
                        rows="3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="أي معلومات إضافية تود إخبارنا بها..."
                      ></textarea>
                    </div>

                    {/* زر الحجز */}
                    <button type="submit" className="btn btn-primary btn-lg w-100">
                      <i className="bi bi-check-circle me-2"></i>
                      تأكيد الحجز
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
