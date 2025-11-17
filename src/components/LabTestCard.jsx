// Lab Test Card Component - مكون بطاقة التحليل
import React from 'react';

const LabTestCard = ({ test }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* أيقونة التحليل */}
          <div className="col-md-1 text-center mb-3 mb-md-0">
            <i className="bi bi-clipboard2-data text-info" style={{ fontSize: '2rem' }}></i>
          </div>

          {/* معلومات التحليل */}
          <div className="col-md-8">
            <h5 className="mb-1">{test.testName}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-building me-1"></i>
              المعمل12: {test.labName}
            </p>
            <p className="text-muted mb-0">
              <i className="bi bi-calendar3 me-1"></i>
              التاريخ: {test.date}
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

export default LabTestCard;
