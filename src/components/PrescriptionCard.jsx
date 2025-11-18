// Prescription Card Component - Prescription card component
import React from 'react';

const PrescriptionCard = ({ prescription }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Prescription Icon */}
          <div className="col-md-1 text-center mb-3 mb-md-0">
            <i className="bi bi-capsule text-success" style={{ fontSize: '2rem' }}></i>
          </div>

          {/* Prescription Information */}
          <div className="col-md-8">
            <h5 className="mb-1">Prescription #{prescription.id}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-person-badge me-1"></i>
              Doctor: {prescription.doctorName}
            </p>
            <p className="text-muted mb-0">
              <i className="bi bi-calendar3 me-1"></i>
              Date: {prescription.date}
            </p>
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

export default PrescriptionCard;
