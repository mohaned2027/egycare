// Medical History Card Component - Medical history card component
import React from 'react';

const MedicalHistoryCard = ({ record }) => {
  // Determine color and icon based on record type
  const getTypeInfo = (type) => {
    switch(type) {
      case 'Diagnosis':
        return { icon: 'bi-heart-pulse', color: 'text-danger', label: 'Diagnosis' };
      case 'Test':
        return { icon: 'bi-clipboard2-pulse', color: 'text-primary', label: 'Test' };
      case 'Prescription':
        return { icon: 'bi-prescription2', color: 'text-success', label: 'Prescription' };
      default:
        return { icon: 'bi-file-medical', color: 'text-secondary', label: 'Report' };
    }
  };

  const typeInfo = getTypeInfo(record.type);

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Type Icon */}
          <div className="col-md-1 text-center mb-3 mb-md-0">
            <i className={`bi ${typeInfo.icon} ${typeInfo.color}`} style={{ fontSize: '2rem' }}></i>
          </div>

          {/* Record Information */}
          <div className="col-md-8">
            <h5 className="mb-1">{record.title}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-person-badge me-1"></i>
              Doctor: {record.doctorName}
            </p>
            <p className="text-muted mb-1">
              <i className="bi bi-calendar3 me-1"></i>
              Date: {record.date}
            </p>
            <span className={`badge ${typeInfo.color.replace('text', 'bg')}`}>
              {typeInfo.label}
            </span>
          </div>

          {/* View and Download Buttons */}
          <div className="col-md-3 text-md-end">
            <button className="btn btn-sm btn-outline-primary me-2">
              <i className="bi bi-eye"></i> View
            </button>
            <button className="btn btn-sm btn-outline-success">
              <i className="bi bi-download"></i> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryCard;
