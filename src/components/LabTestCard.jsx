// Lab Test Card Component - Lab test card component
import React from 'react';

const LabTestCard = ({ test }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Test Icon */}
          <div className="col-md-1 text-center mb-3 mb-md-0">
            <i className="bi bi-clipboard2-data text-info" style={{ fontSize: '2rem' }}></i>
          </div>

          {/* Test Information */}
          <div className="col-md-8">
            <h5 className="mb-1">{test.testName}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-building me-1"></i>

                Lab: {test.labName}
            cde799b52842a66568b1f3818d27af5328632d46
            </p>
            <p className="text-muted mb-0">
              <i className="bi bi-calendar3 me-1"></i>
              Date: {test.date}
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

export default LabTestCard;
