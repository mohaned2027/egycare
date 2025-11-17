// Appointment Card Component - مكون بطاقة الموعد
import React from 'react';

const AppointmentCard = ({ appointment }) => {
  // تحديد اللون والنص حسب الحالة
  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <span className="badge bg-success">مؤكد</span>;
      case 'pending':
        return <span className="badge bg-warning text-dark">قيد الانتظار</span>;
      case 'cancelled':
        return <span className="badge bg-danger">ملغي</span>;
      default:
        return <span className="badge bg-secondary">غير محدد</span>;
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* صورة الطبيب */}
          <div className="col-md-2 text-center mb-3 mb-md-0">
            <img 
              src={appointment.doctorImage} 
              alt={appointment.doctorName}
              className="rounded-circle"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          </div>

          {/* معلومات الموعد */}
          <div className="col-md-7">
            <h5 className="mb-1">{appointment.doctorName}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-award me-1"></i>
              {appointment.specialty}
            </p>
            <p className="text-muted mb-1">
              <i className="bi bi-building me-1"></i>
              {appointment.medicalCenter}
            </p>
            <p className="text-muted mb-0">
              <i className="bi bi-calendar-event me-1"></i>
              {appointment.date} - {appointment.time}
            </p>
          </div>

          {/* حالة الموعد */}
          <div className="col-md-3 text-md-end">
            {getStatusBadge(appointment.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
