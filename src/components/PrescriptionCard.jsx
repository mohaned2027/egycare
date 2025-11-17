// Prescription Card Component - مكون بطاقة الروشتة
import React from 'react';

const PrescriptionCard = ({ prescription }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* أيقونة الدواء */}
          <div className="col-md-1 text-center mb-3 mb-md-0">
            <i className="bi bi-capsule text-success" style={{ fontSize: '2rem' }}></i>
          </div>

          {/* معلومات الروشتة */}
          <div className="col-md-8">
            <h5 className="mb-1">{prescription.medicationName}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-person-badge me-1"></i>
              الطبيب: {prescription.doctorName}
            </p>
            <p className="text-muted mb-1">
              <i className="bi bi-calendar3 me-1"></i>
              التاريخ: {prescription.date}
            </p>
            <p className="text-muted mb-0">
              <i className="bi bi-clock me-1"></i>
              الجرعة: {prescription.dosage} - المدة: {prescription.duration}
            </p>
          </div>

          {/* أزرار العرض والتحميل */}
          <div className="col-md-3 text-md-end">
            <button className="btn btn-sm btn-outline-primary me-2">
              <i className="bi bi-eye"></i> عرض
            </button>
            <button className="btn btn-sm btn-outline-success">
              <i className="bi bi-download"></i> تحميل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
