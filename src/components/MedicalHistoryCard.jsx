// Medical History Card Component - مكون بطاقة التاريخ المرضي
import React from 'react';

const MedicalHistoryCard = ({ record }) => {
  // تحديد اللون والأيقونة حسب نوع التقرير
  const getTypeInfo = (type) => {
    switch(type) {
      case 'Diagnosis':
        return { icon: 'bi-heart-pulse', color: 'text-danger', label: 'تشخيص' };
      case 'Test':
        return { icon: 'bi-clipboard2-pulse', color: 'text-primary', label: 'فحص' };
      case 'Prescription':
        return { icon: 'bi-prescription2', color: 'text-success', label: 'روشتة' };
      default:
        return { icon: 'bi-file-medical', color: 'text-secondary', label: 'تقرير' };
    }
  };

  const typeInfo = getTypeInfo(record.type);

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* أيقونة النوع */}
          <div className="col-md-1 text-center mb-3 mb-md-0">
            <i className={`bi ${typeInfo.icon} ${typeInfo.color}`} style={{ fontSize: '2rem' }}></i>
          </div>

          {/* معلومات السجل */}
          <div className="col-md-8">
            <h5 className="mb-1">{record.title}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-person-badge me-1"></i>
              الطبيب: {record.doctorName}
            </p>
            <p className="text-muted mb-1">
              <i className="bi bi-calendar3 me-1"></i>
              التاريخ: {record.date}
            </p>
            <span className={`badge ${typeInfo.color.replace('text', 'bg')}`}>
              {typeInfo.label}
            </span>
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

export default MedicalHistoryCard;
